"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, CheckCircle, AlertTriangle, AlertCircle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { checkAIServicesAvailability } from "@/utils/ai-utils"
import { startMeasure, endMeasure } from "@/utils/performance"

interface ServiceStatus {
  name: string
  status: "checking" | "operational" | "degraded" | "offline"
  lastChecked: Date | null
  responseTime?: number
}

export default function AppHealthMonitor() {
  const [services, setServices] = useState<ServiceStatus[]>([
    {
      name: "AI Services",
      status: "checking",
      lastChecked: null,
    },
    {
      name: "Analytics",
      status: "checking",
      lastChecked: null,
    },
  ])
  const [isRefreshing, setIsRefreshing] = useState(false)

  const checkServices = async () => {
    setIsRefreshing(true)

    // Check AI services
    try {
      startMeasure("ai-services-check")
      const isAiAvailable = await checkAIServicesAvailability()
      const measurement = endMeasure("ai-services-check")

      setServices((prev) =>
        prev.map((service) =>
          service.name === "AI Services"
            ? {
                ...service,
                status: isAiAvailable ? "operational" : "degraded",
                lastChecked: new Date(),
                responseTime: measurement?.duration,
              }
            : service,
        ),
      )
    } catch (error) {
      setServices((prev) =>
        prev.map((service) =>
          service.name === "AI Services"
            ? {
                ...service,
                status: "offline",
                lastChecked: new Date(),
              }
            : service,
        ),
      )
    }

    // Check analytics endpoint
    try {
      startMeasure("analytics-check")
      const analyticsEndpoint = process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT

      if (analyticsEndpoint) {
        const response = await fetch(analyticsEndpoint, {
          method: "HEAD",
          cache: "no-store",
        })
        const measurement = endMeasure("analytics-check")

        setServices((prev) =>
          prev.map((service) =>
            service.name === "Analytics"
              ? {
                  ...service,
                  status: response.ok ? "operational" : "degraded",
                  lastChecked: new Date(),
                  responseTime: measurement?.duration,
                }
              : service,
          ),
        )
      } else {
        setServices((prev) =>
          prev.map((service) =>
            service.name === "Analytics"
              ? {
                  ...service,
                  status: "offline",
                  lastChecked: new Date(),
                }
              : service,
          ),
        )
      }
    } catch (error) {
      setServices((prev) =>
        prev.map((service) =>
          service.name === "Analytics"
            ? {
                ...service,
                status: "offline",
                lastChecked: new Date(),
              }
            : service,
        ),
      )
    }

    setIsRefreshing(false)
  }

  useEffect(() => {
    checkServices()
    // Check services every 5 minutes
    const interval = setInterval(checkServices, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "checking":
        return <Loader2 className="h-5 w-5 animate-spin text-blue-400" />
      case "operational":
        return <CheckCircle className="h-5 w-5 text-green-400" />
      case "degraded":
        return <AlertTriangle className="h-5 w-5 text-yellow-400" />
      case "offline":
        return <AlertCircle className="h-5 w-5 text-red-400" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "checking":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "operational":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "degraded":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "offline":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return ""
    }
  }

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg text-white">System Status</CardTitle>
          <Button variant="outline" size="sm" onClick={checkServices} disabled={isRefreshing} className="h-8 px-2">
            {isRefreshing ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
            <span className="ml-1">Refresh</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {services.map((service) => (
            <div key={service.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {getStatusIcon(service.status)}
                <span className="text-white font-medium">{service.name}</span>
              </div>
              <div className="flex items-center gap-2">
                {service.responseTime && service.status === "operational" && (
                  <span className="text-xs text-white/50">{Math.round(service.responseTime)}ms</span>
                )}
                <Badge className={`${getStatusColor(service.status)} font-normal`}>
                  {service.status === "checking"
                    ? "Checking..."
                    : service.status === "operational"
                      ? "Operational"
                      : service.status === "degraded"
                        ? "Degraded"
                        : "Offline"}
                </Badge>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 text-xs text-white/50">
          Last checked: {services[0].lastChecked ? services[0].lastChecked.toLocaleTimeString() : "Never"}
        </div>
      </CardContent>
    </Card>
  )
}
