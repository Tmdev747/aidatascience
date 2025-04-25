"use client"

import { useEffect, useRef } from "react"

interface VideoBackgroundProps {
  videoId: string
  overlayOpacity?: number
}

export default function VideoBackground({ videoId, overlayOpacity = 0.5 }: VideoBackgroundProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    // Add event listener for messages from the Vimeo iframe
    const handleMessage = (event: MessageEvent) => {
      // Check if the message is from Vimeo
      if (!event.origin.includes("vimeo.com")) return

      try {
        const data = JSON.parse(event.data)

        // If the video ended, restart it for continuous loop
        if (data.event === "ended" && iframeRef.current) {
          // Get the iframe's contentWindow
          const contentWindow = iframeRef.current.contentWindow
          if (contentWindow) {
            // Post message to play the video again
            contentWindow.postMessage(JSON.stringify({ method: "play" }), "https://player.vimeo.com")
          }
        }
      } catch (e) {
        // Ignore parsing errors
      }
    }

    window.addEventListener("message", handleMessage)
    return () => window.removeEventListener("message", handleMessage)
  }, [])

  return (
    <div className="fixed inset-0 w-full h-full z-0 overflow-hidden">
      <div className="absolute inset-0 bg-black" style={{ opacity: overlayOpacity }} />
      <div className="absolute inset-0 w-full h-full">
        <iframe
          ref={iframeRef}
          src={`https://player.vimeo.com/video/${videoId}?background=1&autoplay=1&loop=1&byline=0&title=0&muted=0`}
          allow="autoplay; fullscreen; picture-in-picture"
          className="w-full h-full"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "100vw",
            height: "100vh",
            minHeight: "100vh",
            minWidth: "100vw",
          }}
        ></iframe>
      </div>
    </div>
  )
}
