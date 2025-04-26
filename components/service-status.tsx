"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, CheckCircle, AlertCircle, AlertTriangle } from "lucide-react"
import { checkAIServicesAvailability } from "@/utils/ai-utils"

export default function ServiceStatus() {
  const [status, setStatus] = useState<"checking" | "operational" | "degraded" | "offline">("checking")
  const [lastChecked, setLastChecked] = useState<Date | null>(null)

  useEffect(() => {
    const checkStatus = async () => {
      try {
        setStatus("checking")
        const isAvailable = await checkAIServicesAvailability()
        setStatus(isAvailable ? "operational" : "degraded")
      } catch (error) {
        console.error("Error checking service status:", error)
        setStatus("offline")
      } finally {
        setLastChecked(new Date())
      }
    }

    checkStatus()

    // Check status every 5 minutes
    const interval = setInterval(checkStatus, 5 * 60 * 1000)

    return () => clearInterval(interval)
  }, [])

  const getStatusIcon = () => {
    switch (status) {
      case "checking":
        return <Loader2 className="h-5 w-5 animate-spin text-blue-400" />
      case "operational":
        return <CheckCircle className="h-5 w-5 text-green-400" />
      case "degraded":
        return <AlertTriangle className="h-5 w-5 text-yellow-400" />
      case "offline":
        return <AlertCircle className="h-5 w-5 text-red-400" />
    }
  }

  const getStatusText = () => {
    switch (status) {
      case "checking":
        return "Checking services..."
      case "operational":
        return "All systems operational"
      case "degraded":
        return "Services experiencing delays"
      case "offline":
        return "Services unavailable"
    }
  }

  const getStatusColor = () => {
    switch (status) {
      case "checking":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "operational":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "degraded":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "offline":
        return "bg-red-500/20 text-red-400 border-red-500/30"
    }
  }

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {getStatusIcon()}
            <span className="text-white font-medium">AI Services</span>
          </div>
          <Badge className={`${getStatusColor()} font-normal`}>{getStatusText()}</Badge>
        </div>
        {lastChecked && <p className="text-xs text-white/50 mt-2">Last checked: {lastChecked.toLocaleTimeString()}</p>}
      </CardContent>
    </Card>
  )
}
