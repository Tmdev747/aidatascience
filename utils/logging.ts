// Logging levels
type LogLevel = "debug" | "info" | "warn" | "error"

// Log entry structure
interface LogEntry {
  timestamp: string
  level: LogLevel
  message: string
  data?: any
  source?: string
}

// Environment detection
const isProduction = process.env.NODE_ENV === "production"
const isClient = typeof window !== "undefined"

// Configure which log levels to display based on environment
const enabledLevels: Record<LogLevel, boolean> = {
  debug: !isProduction,
  info: true,
  warn: true,
  error: true,
}

// Maximum number of logs to keep in memory
const MAX_LOGS = 100

// In-memory log storage for client-side
let inMemoryLogs: LogEntry[] = []

/**
 * Format a log message with timestamp and level
 */
function formatLogEntry(level: LogLevel, message: string, data?: any, source?: string): LogEntry {
  return {
    timestamp: new Date().toISOString(),
    level,
    message,
    data,
    source: source || (isClient ? "client" : "server"),
  }
}

/**
 * Log a message at the specified level
 */
function log(level: LogLevel, message: string, data?: any, source?: string) {
  // Skip if this level is disabled
  if (!enabledLevels[level]) return

  const entry = formatLogEntry(level, message, data, source)

  // Store logs in memory on client
  if (isClient) {
    inMemoryLogs.push(entry)

    // Trim logs if they exceed the maximum
    if (inMemoryLogs.length > MAX_LOGS) {
      inMemoryLogs = inMemoryLogs.slice(-MAX_LOGS)
    }
  }

  // Console output with appropriate styling
  const consoleMethod = level === "debug" ? "log" : level

  if (data) {
    console[consoleMethod as keyof Console](`[${entry.timestamp}] [${level.toUpperCase()}] ${message}`, data)
  } else {
    console[consoleMethod as keyof Console](`[${entry.timestamp}] [${level.toUpperCase()}] ${message}`)
  }

  // In production, we would send logs to a service
  if (isProduction && (level === "error" || level === "warn")) {
    // sendToLogService(entry);
  }
}

/**
 * Get all logs stored in memory (client-side only)
 */
function getLogs(): LogEntry[] {
  return [...inMemoryLogs]
}

/**
 * Clear all logs from memory
 */
function clearLogs(): void {
  inMemoryLogs = []
}

// Export individual log level functions
const debug = (message: string, data?: any, source?: string) => log("debug", message, data, source)
const info = (message: string, data?: any, source?: string) => log("info", message, data, source)
const warn = (message: string, data?: any, source?: string) => log("warn", message, data, source)
const error = (message: string, data?: any, source?: string) => log("error", message, data, source)

// Mock function for sending logs to a service in production
// function sendToLogService(entry: LogEntry) {
//   fetch('/api/logs', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(entry),
//     // Use keepalive to ensure the request completes even if the page is unloading
//     keepalive: true
//   }).catch(err => console.error('Failed to send log to service:', err));
// }

export const logger = {
  debug,
  info,
  warn,
  error,
  getLogs,
  clearLogs,
}
