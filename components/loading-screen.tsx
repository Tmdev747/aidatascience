"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0)
  const [showTips, setShowTips] = useState(0)
  const [loadingText, setLoadingText] = useState("Initializing presentation...")

  const tips = [
    "Did you know? The Philippines has over 30 AI startups focusing on healthcare and finance.",
    "Batangas State University offers specialized courses in data science and AI.",
    "Machine learning algorithms can predict typhoon patterns in the Philippine Sea.",
    "Filipino developers are creating AI solutions for local agriculture challenges.",
    "Data science is helping improve traffic management in Metro Manila.",
  ]

  useEffect(() => {
    // Simulate loading progress
    let currentProgress = 0
    const interval = setInterval(() => {
      currentProgress += Math.random() * 10
      if (currentProgress > 100) currentProgress = 100
      setProgress(Math.min(Math.round(currentProgress), 100))

      if (currentProgress < 30) {
        setLoadingText("Loading modules...")
      } else if (currentProgress < 60) {
        setLoadingText("Preparing interactive elements...")
      } else if (currentProgress < 90) {
        setLoadingText("Finalizing presentation...")
      } else {
        setLoadingText("Almost ready...")
      }

      if (currentProgress >= 100) {
        clearInterval(interval)
      }
    }, 200)

    // Rotate tips
    const tipsInterval = setInterval(() => {
      setShowTips((prev) => (prev + 1) % tips.length)
    }, 5000)

    return () => {
      clearInterval(interval)
      clearInterval(tipsInterval)
    }
  }, [])

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 z-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <Image
          src="/images/innovate-hub-logo.png"
          alt="Innovate Hub Logo"
          width={120}
          height={120}
          className="rounded-full"
        />
      </motion.div>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative"
      >
        <div className="w-64 h-64 flex items-center justify-center">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="#1e293b" strokeWidth="8" />
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="8"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: progress / 100 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              style={{
                strokeDasharray: "283",
                strokeDashoffset: "283",
                transformOrigin: "center",
              }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-4xl font-bold text-white">{progress}%</div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h1 className="text-3xl font-bold text-white mt-8 mb-2">AI in Data Science</h1>
        <h2 className="text-xl text-blue-400 mb-4 text-center">Interactive Presentation</h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="text-white/70 mb-8"
      >
        {loadingText}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="max-w-md text-center text-white/80 px-4 h-16"
      >
        {tips[showTips]}
      </motion.div>
    </div>
  )
}
