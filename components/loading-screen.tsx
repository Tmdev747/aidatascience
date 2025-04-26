"use client"

import { motion } from "framer-motion"

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-slate-900 flex flex-col items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <img src="/images/innovate-hub-logo.png" alt="InnovateHub Logo" className="h-24 w-auto mx-auto mb-8" />

        <h1 className="text-3xl font-bold text-white mb-4">AI & Data Science in the Philippines</h1>

        <p className="text-lg text-white/70 mb-8">Loading interactive presentation...</p>

        <div className="flex justify-center items-center space-x-2">
          {[0, 1, 2, 3].map((index) => (
            <motion.div
              key={index}
              className="w-3 h-3 bg-blue-500 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 1,
                repeat: Number.POSITIVE_INFINITY,
                delay: index * 0.2,
              }}
            />
          ))}
        </div>
      </motion.div>

      <div className="absolute bottom-8 text-white/50 text-sm">Powered by InnovateHub AI</div>
    </div>
  )
}
