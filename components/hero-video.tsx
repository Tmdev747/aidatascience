"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import VideoBackground from "@/components/video-background"

export default function HeroVideo() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative h-[60vh] min-h-[400px] max-h-[600px] w-full overflow-hidden">
      {/* Video Background */}
      <VideoBackground />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/60 to-slate-900"></div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            AI & Data Science
            <span className="block text-blue-400">in the Philippines</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <p className="text-xl md:text-2xl text-white/80 max-w-2xl">
            Exploring applications, innovations, and opportunities
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-8"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse mr-2"></span>
            <span className="text-white/90">Interactive Presentation</span>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.8, delay: 1.4 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex flex-col items-center">
          <span className="text-white/60 text-sm mb-2">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center">
            <motion.div
              animate={{
                y: [0, 12, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
              }}
              className="w-1.5 h-1.5 bg-white rounded-full mt-2"
            />
          </div>
        </div>
      </motion.div>
    </div>
  )
}
