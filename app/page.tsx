"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import NavigationBar from "@/components/navigation-bar"
import IntroModule from "@/components/modules/intro-module"
import MachineLearningModule from "@/components/modules/machine-learning-module"
import NeuralNetworksModule from "@/components/modules/neural-networks-module"
import NLPModule from "@/components/modules/nlp-module"
import ComputerVisionModule from "@/components/modules/computer-vision-module"
import ApplicationsModule from "@/components/modules/applications-module"
import QuizModule from "@/components/modules/quiz-module"
import LoadingScreen from "@/components/loading-screen"
import { useAnalytics } from "@/components/analytics-provider"
import Image from "next/image"
import NavigationButton from "@/components/navigation-button"

export default function Home() {
  const [currentModule, setCurrentModule] = useState("intro")
  const [isLoading, setIsLoading] = useState(true)
  const { trackEvent } = useAnalytics()

  useEffect(() => {
    // Simulate loading assets
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  // Track module visits only when currentModule changes
  useEffect(() => {
    // Only track if not loading and we have a valid module
    if (!isLoading && currentModule) {
      trackEvent("module_visit", { moduleId: currentModule })
    }
  }, [currentModule, trackEvent, isLoading]) // Include isLoading in the dependency array

  const renderCurrentModule = () => {
    switch (currentModule) {
      case "intro":
        return <IntroModule />
      case "machine-learning":
        return <MachineLearningModule />
      case "neural-networks":
        return <NeuralNetworksModule />
      case "nlp":
        return <NLPModule />
      case "computer-vision":
        return <ComputerVisionModule />
      case "applications":
        return <ApplicationsModule />
      case "quiz":
        return <QuizModule />
      case "settings":
        return (
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-white mb-8">Settings</h1>
            <div className="max-w-2xl mx-auto">
              {/* AI Configuration Component */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">AI Configuration</h2>
                {/* Import and use the AIConfig component here */}
                <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
                  <p className="text-white/80">Configure your AI settings here.</p>
                </div>
              </div>
            </div>
          </div>
        )
      default:
        return <IntroModule />
    }
  }

  const getNextModule = () => {
    switch (currentModule) {
      case "intro":
        return "machine-learning"
      case "machine-learning":
        return "neural-networks"
      case "neural-networks":
        return "nlp"
      case "nlp":
        return "computer-vision"
      case "computer-vision":
        return "applications"
      case "applications":
        return "quiz"
      case "quiz":
        return "intro"
      default:
        return "machine-learning"
    }
  }

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <NavigationBar currentModule={currentModule} setCurrentModule={setCurrentModule} />

      <main className="pt-16 pb-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentModule}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="container mx-auto px-4"
          >
            {renderCurrentModule()}
          </motion.div>
        </AnimatePresence>
      </main>

      <NavigationButton nextModule={getNextModule()} />

      <footer className="fixed bottom-0 w-full bg-slate-900/80 backdrop-blur-sm py-2 px-4 text-center text-white/70 text-sm">
        <div className="flex items-center justify-center gap-2">
          <span>Developed for Batangas State University</span>
          <span className="mx-1">|</span>
          <div className="flex items-center">
            <Image
              src="/images/innovate-hub-logo.png"
              alt="Innovate Hub Logo"
              width={16}
              height={16}
              className="mr-1"
            />
            <span>InnovateHub</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
