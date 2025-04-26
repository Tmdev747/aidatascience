"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface AnalyticsContextType {
  trackEvent: (eventName: string, eventData?: any) => void
  moduleVisits: Record<string, number>
  quizAttempts: number
  quizScores: number[]
}

const AnalyticsContext = createContext<AnalyticsContextType>({
  trackEvent: () => {},
  moduleVisits: {},
  quizAttempts: 0,
  quizScores: [],
})

export const useAnalytics = () => useContext(AnalyticsContext)

interface AnalyticsProviderProps {
  children: ReactNode
}

export default function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  const [moduleVisits, setModuleVisits] = useState<Record<string, number>>({})
  const [quizAttempts, setQuizAttempts] = useState(0)
  const [quizScores, setQuizScores] = useState<number[]>([])

  const trackEvent = (eventName: string, eventData?: any) => {
    // In a real implementation, this would send data to a backend
    console.log(`Analytics Event: ${eventName}`, eventData)

    // Track module visits
    if (eventName === "module_visit") {
      setModuleVisits((prev) => ({
        ...prev,
        [eventData.moduleId]: (prev[eventData.moduleId] || 0) + 1,
      }))
    }

    // Track quiz attempts
    if (eventName === "quiz_attempt") {
      setQuizAttempts((prev) => prev + 1)
    }

    // Track quiz scores
    if (eventName === "quiz_completed") {
      setQuizScores((prev) => [...prev, eventData.score])
    }

    // In a production environment, we would send this data to a server
    // fetch('/api/analytics', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ eventName, eventData, timestamp: new Date().toISOString() })
    // })
  }

  return (
    <AnalyticsContext.Provider
      value={{
        trackEvent,
        moduleVisits,
        quizAttempts,
        quizScores,
      }}
    >
      {children}
    </AnalyticsContext.Provider>
  )
}
