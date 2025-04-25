"use client"

import { useEffect, useRef } from "react"
import type QRCodeStyling from "qr-code-styling"
import { Card } from "@/components/ui/card"

interface QRCodeProps {
  url: string
  size?: number
  logoUrl?: string
  title?: string
  className?: string
}

export default function QRCode({ url, size = 200, logoUrl, title, className = "" }: QRCodeProps) {
  const qrRef = useRef<HTMLDivElement>(null)
  const qrCode = useRef<QRCodeStyling>()

  useEffect(() => {
    if (!qrRef.current) return

    // Dynamically import QR code styling library (client-side only)
    import("qr-code-styling").then((QRCodeStylingModule) => {
      const QRCodeStyling = QRCodeStylingModule.default

      // Create QR code instance
      qrCode.current = new QRCodeStyling({
        width: size,
        height: size,
        type: "svg",
        data: url,
        dotsOptions: {
          color: "#ffffff",
          type: "rounded",
        },
        backgroundOptions: {
          color: "rgba(0,0,0,0)",
        },
        cornersSquareOptions: {
          color: "#8b5cf6",
          type: "extra-rounded",
        },
        cornersDotOptions: {
          color: "#8b5cf6",
          type: "dot",
        },
        imageOptions: {
          crossOrigin: "anonymous",
          margin: 10,
        },
      })

      // Clear previous QR code if any
      if (qrRef.current) {
        qrRef.current.innerHTML = ""
        qrCode.current.append(qrRef.current)
      }
    })
  }, [url, size, logoUrl])

  return (
    <Card className={`bg-slate-800/50 border-slate-700 p-4 flex flex-col items-center ${className}`}>
      {title && <h3 className="text-white font-medium mb-3">{title}</h3>}
      <div ref={qrRef} className="flex justify-center items-center"></div>
      <p className="text-white/70 text-xs mt-2 text-center">Scan to try the interactive demo</p>
    </Card>
  )
}
