"use client"

import { useEffect, useRef } from "react"

interface EmbedHelperProps {
  module: string
  theme?: string
  height?: number
  className?: string
}

export default function EmbedHelper({
  module = "intro",
  theme = "replitLight",
  height = 600,
  className = "",
}: EmbedHelperProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // In production, verify the origin
      // if (event.origin !== 'https://your-deployed-app.vercel.app') return;

      if (event.data.type === "resize" && iframeRef.current) {
        iframeRef.current.style.height = `${event.data.height}px`
      }
    }

    window.addEventListener("message", handleMessage)
    return () => {
      window.removeEventListener("message", handleMessage)
    }
  }, [])

  // Base URL should be updated to your deployed Vercel app
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://your-deployed-app.vercel.app"
  const embedUrl = `${baseUrl}/embed/${module}?theme=${theme}`

  return (
    <div className={`presentation-container ${className}`}>
      <iframe
        ref={iframeRef}
        src={embedUrl}
        width="100%"
        height={`${height}px`}
        style={{ border: "none", borderRadius: "8px", overflow: "hidden", transition: "height 0.3s ease" }}
        scrolling="no"
        title={`${module} Module`}
      />
    </div>
  )
}
