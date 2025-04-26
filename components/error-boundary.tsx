"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export default function ErrorBoundary({ children, fallback }: ErrorBoundaryProps) {
  const [hasError, setHasError] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const errorHandler = (error: ErrorEvent) => {
      console.error("Error caught by error boundary:", error)
      setError(error.error)
      setHasError(true)

      // Log to monitoring service in production
      // logErrorToService(error.error);
    }

    window.addEventListener("error", errorHandler)

    return () => {
      window.removeEventListener("error", errorHandler)
    }
  }, [])

  if (hasError) {
    return (
      fallback || (
        <div className="flex flex-col items-center justify-center min-h-[200px] p-6 bg-slate-800/50 border border-slate-700 rounded-lg text-white">
          <AlertTriangle className="h-12 w-12 text-yellow-500 mb-4" />
          <h2 className="text-xl font-bold mb-2">Something went wrong</h2>
          <p className="text-white/70 mb-4 text-center">We encountered an error while processing your request.</p>
          <Button
            onClick={() => {
              setHasError(false)
              setError(null)
            }}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Try Again
          </Button>
          <p className="mt-4 text-xs text-white/50">Error: {error?.message || "Unknown error"}</p>
        </div>
      )
    )
  }

  return <>{children}</>
}
