// Performance monitoring utility

// Interface for performance metrics
interface PerformanceMetric {
  name: string
  startTime: number
  endTime?: number
  duration?: number
  metadata?: Record<string, any>
}

// Store active measurements
const activeMeasurements: Record<string, PerformanceMetric> = {}

// Store completed measurements
const completedMeasurements: PerformanceMetric[] = []

// Maximum number of measurements to keep
const MAX_MEASUREMENTS = 100

/**
 * Start measuring performance for a named operation
 */
export function startMeasure(name: string, metadata?: Record<string, any>): void {
  if (typeof window === "undefined") return

  const startTime = performance.now()

  // Store the measurement
  activeMeasurements[name] = {
    name,
    startTime,
    metadata,
  }

  // Use the Performance API if available
  try {
    performance.mark(`${name}-start`)
  } catch (e) {
    console.error("Error creating performance mark:", e)
  }
}

/**
 * End measuring performance for a named operation
 */
export function endMeasure(name: string, additionalMetadata?: Record<string, any>): PerformanceMetric | undefined {
  if (typeof window === "undefined") return

  const measurement = activeMeasurements[name]

  if (!measurement) {
    console.warn(`No active measurement found for "${name}"`)
    return
  }

  const endTime = performance.now()
  const duration = endTime - measurement.startTime

  // Update the measurement
  measurement.endTime = endTime
  measurement.duration = duration

  if (additionalMetadata) {
    measurement.metadata = {
      ...measurement.metadata,
      ...additionalMetadata,
    }
  }

  // Use the Performance API if available
  try {
    performance.mark(`${name}-end`)
    performance.measure(name, `${name}-start`, `${name}-end`)
  } catch (e) {
    console.error("Error creating performance measure:", e)
  }

  // Remove from active and add to completed
  delete activeMeasurements[name]
  completedMeasurements.push(measurement)

  // Trim completed measurements if they exceed the maximum
  if (completedMeasurements.length > MAX_MEASUREMENTS) {
    completedMeasurements.splice(0, completedMeasurements.length - MAX_MEASUREMENTS)
  }

  // Automatically report significant performance issues
  if (duration > 1000) {
    // More than 1 second
    reportMeasurement(measurement)
  }

  return measurement
}

/**
 * Measure a function execution time
 */
export function measureFunction<T>(name: string, fn: () => T, metadata?: Record<string, any>): T {
  startMeasure(name, metadata)
  try {
    const result = fn()
    endMeasure(name)
    return result
  } catch (error) {
    endMeasure(name, { error: true })
    throw error
  }
}

/**
 * Measure an async function execution time
 */
export async function measureAsyncFunction<T>(
  name: string,
  fn: () => Promise<T>,
  metadata?: Record<string, any>,
): Promise<T> {
  startMeasure(name, metadata)
  try {
    const result = await fn()
    endMeasure(name)
    return result
  } catch (error) {
    endMeasure(name, { error: true })
    throw error
  }
}

/**
 * Get all completed measurements
 */
export function getCompletedMeasurements(): PerformanceMetric[] {
  return [...completedMeasurements]
}

/**
 * Clear all measurements
 */
export function clearMeasurements(): void {
  completedMeasurements.length = 0

  // Clear performance entries if available
  if (typeof window !== "undefined" && window.performance && window.performance.clearMarks) {
    try {
      performance.clearMarks()
      performance.clearMeasures()
    } catch (e) {
      console.error("Error clearing performance measures:", e)
    }
  }
}

/**
 * Report a single measurement to analytics
 */
export function reportMeasurement(measurement: PerformanceMetric): void {
  if (typeof window === "undefined") return

  // Send to analytics endpoint if available
  if (process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT) {
    try {
      // Use sendBeacon for non-blocking analytics reporting
      if (navigator.sendBeacon) {
        const blob = new Blob([JSON.stringify({ measurement })], { type: "application/json" })
        navigator.sendBeacon(process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT, blob)
      } else {
        // Fall back to fetch with keepalive
        fetch(process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ measurement }),
          keepalive: true,
        }).catch((e) => console.error("Error reporting measurement:", e))
      }
    } catch (e) {
      console.error("Failed to report measurement:", e)
    }
  }
}

/**
 * Report measurements to analytics or monitoring service
 */
export function reportMeasurements(onlyRecent = true): void {
  if (typeof window === "undefined") return

  const measurements = onlyRecent ? completedMeasurements.slice(-10) : completedMeasurements

  if (measurements.length === 0) {
    return
  }

  // Send to analytics endpoint if available
  if (process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT) {
    try {
      // Use sendBeacon for non-blocking analytics reporting
      if (navigator.sendBeacon) {
        const blob = new Blob([JSON.stringify({ measurements })], { type: "application/json" })
        navigator.sendBeacon(process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT, blob)
      } else {
        // Fall back to fetch with keepalive
        fetch(process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ measurements }),
          keepalive: true,
        }).catch((e) => console.error("Error reporting measurements:", e))
      }
    } catch (e) {
      console.error("Failed to report measurements:", e)
    }
  }
}
