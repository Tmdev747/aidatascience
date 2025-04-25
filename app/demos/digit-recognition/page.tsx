"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, RefreshCw } from "lucide-react"

export default function DigitRecognitionDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [prediction, setPrediction] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null)

  // Initialize canvas
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current
      const context = canvas.getContext("2d")

      if (context) {
        context.lineWidth = 15
        context.lineCap = "round"
        context.lineJoin = "round"
        context.strokeStyle = "#ffffff"
        setCtx(context)
        clearCanvas()
      }
    }
  }, [])

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true)
    if (!ctx) return

    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()

    let clientX, clientY

    if ("touches" in e) {
      // Touch event
      clientX = e.touches[0].clientX
      clientY = e.touches[0].clientY
    } else {
      // Mouse event
      clientX = e.clientX
      clientY = e.clientY
    }

    ctx.beginPath()
    ctx.moveTo(clientX - rect.left, clientY - rect.top)
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !ctx) return

    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()

    let clientX, clientY

    if ("touches" in e) {
      // Touch event
      clientX = e.touches[0].clientX
      clientY = e.touches[0].clientY

      // Prevent scrolling while drawing
      e.preventDefault()
    } else {
      // Mouse event
      clientX = e.clientX
      clientY = e.clientY
    }

    ctx.lineTo(clientX - rect.left, clientY - rect.top)
    ctx.stroke()
  }

  const endDrawing = () => {
    setIsDrawing(false)
    if (ctx) {
      ctx.closePath()
    }
  }

  const clearCanvas = () => {
    if (!ctx || !canvasRef.current) return
    ctx.fillStyle = "#1e293b"
    ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height)
    setPrediction(null)
  }

  const recognizeDigit = () => {
    setIsProcessing(true)

    // Simulate neural network processing
    setTimeout(() => {
      // Generate a random digit as prediction (in a real app, this would use a neural network)
      const randomDigit = Math.floor(Math.random() * 10).toString()
      setPrediction(randomDigit)
      setIsProcessing(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md bg-slate-800/50 border-slate-700">
        <CardContent className="p-6">
          <h1 className="text-2xl font-bold text-white text-center mb-6">Neural Network Digit Recognition</h1>

          <div className="text-center mb-4">
            <p className="text-white/80 mb-4">Draw a digit (0-9) in the box below</p>
          </div>

          <div className="flex flex-col items-center">
            <canvas
              ref={canvasRef}
              width={200}
              height={200}
              className="border-2 border-dashed border-purple-500 rounded-lg mb-4 touch-none"
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={endDrawing}
              onMouseLeave={endDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={endDrawing}
            />

            <div className="text-white font-bold text-lg mb-4">
              Prediction: <span className="text-purple-400">{isProcessing ? "..." : prediction || "-"}</span>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={clearCanvas} className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4" />
                Clear
              </Button>

              <Button onClick={recognizeDigit} disabled={isProcessing} className="bg-purple-600 hover:bg-purple-700">
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Recognize"
                )}
              </Button>
            </div>
          </div>

          <div className="mt-6 p-3 bg-purple-900/20 rounded text-sm text-white/80">
            <p className="text-center">
              This demo simulates how a neural network processes handwritten digits. In a real application, a trained
              model would analyze the pixel data to make predictions.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 text-center text-white/60 text-sm">
        <p>Batangas State University - AI in Data Science</p>
      </div>
    </div>
  )
}
