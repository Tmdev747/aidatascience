"use client"

import { useParams, useSearchParams } from "next/navigation"
import { useEffect } from "react"
import IntroModule from "@/components/modules/intro-module"
import MachineLearningModule from "@/components/modules/machine-learning-module"
import NeuralNetworksModule from "@/components/modules/neural-networks-module"
import NLPModule from "@/components/modules/nlp-module"
import ComputerVisionModule from "@/components/modules/computer-vision-module"
import ApplicationsModule from "@/components/modules/applications-module"
import QuizModule from "@/components/modules/quiz-module"
import { themes, type ThemeColors } from "@/lib/themes"

export default function EmbedPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const module = params.module as string

  // Get theme parameter - default to replitLight as requested
  const themeParam = searchParams.get("theme") || "replitLight"
  const currentTheme: ThemeColors = themes[themeParam] || themes.replitLight

  // Handle responsive height
  useEffect(() => {
    function sendHeight() {
      const height = document.body.scrollHeight
      window.parent.postMessage(
        {
          type: "resize",
          height,
        },
        "*",
      ) // Use '*' for development, restrict to specific origin in production
    }

    // Send initial height after content loads
    setTimeout(sendHeight, 100)

    // Send height on resize
    window.addEventListener("resize", sendHeight)

    // Send height when images load
    const images = document.querySelectorAll("img")
    images.forEach((img) => {
      if (img.complete) {
        sendHeight()
      } else {
        img.addEventListener("load", sendHeight)
      }
    })

    // Notify parent when module is ready
    window.parent.postMessage({ type: "moduleReady", module }, "*")

    return () => {
      window.removeEventListener("resize", sendHeight)
      images.forEach((img) => {
        img.removeEventListener("load", sendHeight)
      })
    }
  }, [module])

  return (
    <div className={`min-h-screen bg-gradient-to-br ${currentTheme.background} p-4`}>
      {module === "intro" && <IntroModule theme={currentTheme} />}
      {module === "machine-learning" && <MachineLearningModule theme={currentTheme} />}
      {module === "neural-networks" && <NeuralNetworksModule theme={currentTheme} />}
      {module === "nlp" && <NLPModule theme={currentTheme} />}
      {module === "computer-vision" && <ComputerVisionModule theme={currentTheme} />}
      {module === "applications" && <ApplicationsModule theme={currentTheme} />}
      {module === "quiz" && <QuizModule theme={currentTheme} />}
    </div>
  )
}
