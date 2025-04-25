"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"

interface FallbackContentProps {
  currentModule: string
  error: string | null
}

export default function FallbackContent({ currentModule, error }: FallbackContentProps) {
  const [showDebugInfo, setShowDebugInfo] = useState(false)

  const moduleContent = {
    intro: {
      title: "Introduction to AI in Data Science",
      content:
        "This interactive presentation explores the fascinating world of Artificial Intelligence and its applications in Data Science, with special focus on the Philippine context.",
      image: "/placeholder.svg?height=300&width=500",
    },
    "machine-learning": {
      title: "Machine Learning Algorithms",
      content:
        "Machine Learning enables computers to learn from data and make predictions without explicit programming. Key algorithms include supervised learning, unsupervised learning, and reinforcement learning.",
      image: "/placeholder.svg?height=300&width=500",
    },
    "neural-networks": {
      title: "Neural Networks",
      content:
        "Neural networks are computing systems inspired by the human brain's biological neural networks. They form the foundation of deep learning and can solve complex pattern recognition problems.",
      image: "/placeholder.svg?height=300&width=500",
    },
    nlp: {
      title: "Natural Language Processing",
      content:
        "NLP enables computers to understand, interpret, and generate human language. Applications include text classification, sentiment analysis, and machine translation for Filipino languages.",
      image: "/placeholder.svg?height=300&width=500",
    },
    "computer-vision": {
      title: "Computer Vision",
      content:
        "Computer Vision enables machines to interpret and understand visual information from the world. In the Philippines, it's used for traffic management, agricultural monitoring, and more.",
      image: "/placeholder.svg?height=300&width=500",
    },
    applications: {
      title: "Philippine AI Applications",
      content:
        "AI is being applied across various sectors in the Philippines, including smart agriculture, healthcare diagnostics, traffic management, language processing, and disaster response.",
      image: "/placeholder.svg?height=300&width=500",
    },
    quiz: {
      title: "Assessment",
      content:
        "Test your knowledge of AI in Data Science with this interactive quiz covering key concepts and Philippine applications.",
      image: "/placeholder.svg?height=300&width=500",
    },
  }

  const currentContent = moduleContent[currentModule as keyof typeof moduleContent]

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 overflow-auto">
      {error && (
        <div className="mb-8 p-4 bg-red-900/50 border border-red-700 rounded-lg max-w-2xl w-full">
          <div className="flex items-start">
            <AlertCircle className="text-red-400 mr-3 mt-0.5" />
            <div>
              <h3 className="text-lg font-bold text-white mb-2">3D Rendering Error</h3>
              <p className="text-white/80">{error}</p>
              <p className="text-white/60 mt-2 text-sm">
                We're displaying a simplified 2D version of the content instead.
              </p>
              <Button variant="outline" className="mt-3 text-xs" onClick={() => setShowDebugInfo(!showDebugInfo)}>
                {showDebugInfo ? "Hide" : "Show"} Debug Info
              </Button>

              {showDebugInfo && (
                <div className="mt-3 p-3 bg-black/50 rounded text-xs font-mono text-white/70 overflow-x-auto">
                  <p>Browser: {navigator.userAgent}</p>
                  <p>
                    Screen: {window.screen.width}x{window.screen.height}
                  </p>
                  <p>
                    Window: {window.innerWidth}x{window.innerHeight}
                  </p>
                  <p>Device Pixel Ratio: {window.devicePixelRatio}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="bg-slate-800 rounded-xl shadow-2xl overflow-hidden max-w-4xl w-full">
        <div className="p-6 bg-gradient-to-r from-blue-600 to-purple-600">
          <h1 className="text-3xl font-bold text-white">{currentContent.title}</h1>
          <p className="text-white/80 mt-2">AI in Data Science - Batangas State University</p>
        </div>

        <div className="p-6">
          <img
            src={currentContent.image || "/placeholder.svg"}
            alt={currentContent.title}
            className="w-full h-64 object-cover rounded-lg mb-6 bg-slate-700"
          />

          <div className="prose prose-invert max-w-none">
            <p className="text-lg text-white/90">{currentContent.content}</p>

            <div className="mt-6 p-4 bg-slate-700/50 rounded-lg">
              <h3 className="text-lg font-medium text-white mb-2">Philippine Context</h3>
              <p className="text-white/80">
                This module explores applications relevant to the Philippines, including examples from Batangas State
                University and local industry partners.
              </p>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-700/30 p-4 rounded-lg">
                <h4 className="font-medium text-white mb-2">Key Concepts</h4>
                <ul className="list-disc pl-5 text-white/80">
                  <li>Fundamental principles</li>
                  <li>Technical implementation</li>
                  <li>Practical applications</li>
                </ul>
              </div>

              <div className="bg-slate-700/30 p-4 rounded-lg">
                <h4 className="font-medium text-white mb-2">Learning Objectives</h4>
                <ul className="list-disc pl-5 text-white/80">
                  <li>Understand core concepts</li>
                  <li>Apply knowledge to real problems</li>
                  <li>Analyze Philippine case studies</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
