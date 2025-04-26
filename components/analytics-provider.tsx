"use client"

import type React from "react"

import { useEffect, createContext, useContext, useState } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { reportMeasurements } from "@/utils/performance"
import { logger } from "@/utils/logging"

// Define analytics context type
type AnalyticsContextType = {
  trackEvent: (eventName: string, eventData?: Record<string, any>) => void
  isEnabled: boolean
  setEnabled: (enabled: boolean) => void
}

// Create context with default values
const AnalyticsContext = createContext<AnalyticsContextType>({
  trackEvent: () => {},
  isEnabled: true,
  setEnabled: () => {},
})

// Hook to use analytics
export const useAnalytics = () => useContext(AnalyticsContext)

// Debounce function to limit analytics calls
function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

export default function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isEnabled, setEnabled] = useState(true)

  // Track page views
  useEffect(() => {
    if (!isEnabled) return

    // Don't track page views in development
    if (process.env.NODE_ENV === "development") return

    const handlePageView = () => {
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "")

      // Only send analytics if endpoint is configured
      if (process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT) {
        try {
          fetch(process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              type: "pageview",
              url,
              timestamp: new Date().toISOString(),
              referrer: document.referrer || null,
              userAgent: navigator.userAgent,
              language: navigator.language,
              screenWidth: window.innerWidth,
              screenHeight: window.innerHeight,
            }),
            keepalive: true,
          }).catch((error) => {
            logger.error("Failed to send page view analytics", error)
          })
        } catch (error) {
          logger.error("Error in analytics", error)
        }
      }
    }

    // Debounce page view tracking to avoid excessive calls during navigation
    const debouncedPageView = debounce(handlePageView, 500)
    debouncedPageView()

    // Report performance measurements on page change
    reportMeasurements()

    // Clean up
    return () => {
      // Any cleanup if needed
    }
  }, [pathname, searchParams, isEnabled])

  // Track custom events
  const trackEvent = (eventName: string, eventData?: Record<string, any>) => {
    if (!isEnabled) return
    if (process.env.NODE_ENV === "development") {
      console.log(`[Analytics] Event: ${eventName}`, eventData)
      return
    }

    // Only send analytics if endpoint is configured
    if (process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT) {
      try {
        fetch(process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "event",
            event: eventName,
            data: eventData,
            url: window.location.href,
            timestamp: new Date().toISOString(),
          }),
          keepalive: true,
        }).catch((error) => {
          logger.error(`Failed to send event analytics for ${eventName}`, error)
        })
      } catch (error) {
        logger.error(`Error tracking event ${eventName}`, error)
      }
    }
  }

  // Check for user opt-out preference in localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedPreference = localStorage.getItem("analytics-opt-out")
      if (storedPreference !== null) {
        setEnabled(storedPreference !== "true")
      }
    }
  }, [])

  // Update localStorage when preference changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("analytics-opt-out", isEnabled ? "false" : "true")
    }
  }, [isEnabled])

  return <AnalyticsContext.Provider value={{ trackEvent, isEnabled, setEnabled }}>{children}</AnalyticsContext.Provider>
}
