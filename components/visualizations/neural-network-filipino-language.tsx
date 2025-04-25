"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export default function NeuralNetworkFilipinoLanguage() {
  const [activeNeuron, setActiveNeuron] = useState<number | null>(null)
  const [activePath, setActivePath] = useState<number | null>(null)
  const [showOutput, setShowOutput] = useState(false)

  // Filipino words and their English translations
  const inputWords = ["Magandang", "umaga", "po", "kumusta", "kayo"]
  const outputTranslation = "Good morning sir, how are you?"

  useEffect(() => {
    // Animation sequence
    const sequence = async () => {
      // Reset
      setActiveNeuron(null)
      setActivePath(null)
      setShowOutput(false)

      // Animate through neurons
      for (let i = 0; i < inputWords.length; i++) {
        setActiveNeuron(i)
        await new Promise((r) => setTimeout(r, 800))
        setActivePath(i)
        await new Promise((r) => setTimeout(r, 600))
      }

      // Show output
      setShowOutput(true)
    }

    // Start sequence and repeat
    sequence()
    const interval = setInterval(sequence, 8000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-full h-[500px] bg-slate-900 rounded-xl p-6 overflow-hidden">
      <h3 className="text-xl font-bold text-white mb-6 text-center">Neural Network for Filipino Language Processing</h3>

      <div className="relative w-full h-[400px]">
        {/* Input Layer - Filipino Words */}
        <div className="absolute left-0 top-0 bottom-0 w-1/4 flex flex-col justify-center items-center">
          <div className="text-white/70 mb-4 text-sm">Input Layer</div>
          {inputWords.map((word, index) => (
            <motion.div
              key={`input-${index}`}
              className={`w-24 h-24 rounded-full flex items-center justify-center mb-4 text-center transition-colors ${
                activeNeuron === index ? "bg-blue-600 text-white" : "bg-slate-800 text-white/70"
              }`}
              initial={{ scale: 0.8, opacity: 0.5 }}
              animate={{
                scale: activeNeuron === index ? 1.1 : 1,
                opacity: activeNeuron === index ? 1 : 0.7,
              }}
              transition={{ duration: 0.3 }}
            >
              <div>
                <div className="font-bold">{word}</div>
                <div className="text-xs mt-1 opacity-70">Filipino</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Hidden Layers */}
        <div className="absolute left-1/4 right-1/4 top-0 bottom-0 flex justify-center items-center">
          <div className="relative w-full h-full">
            {/* Connection paths */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
              {inputWords.map((_, index) => (
                <motion.path
                  key={`path-${index}`}
                  d={`M 20,${70 + index * 70} C 100,${70 + index * 70} 300,${200 + (index - 2) * 30} 380,200`}
                  fill="none"
                  stroke={activePath === index ? "#3b82f6" : "#475569"}
                  strokeWidth={activePath === index ? 3 : 1}
                  initial={{ pathLength: 0 }}
                  animate={{
                    pathLength: activePath === index ? 1 : 0,
                    opacity: activePath === index ? 1 : 0.3,
                  }}
                  transition={{ duration: 0.6 }}
                />
              ))}
            </svg>

            {/* Hidden layer neurons */}
            <div className="absolute left-1/4 top-0 bottom-0 flex flex-col justify-center items-center">
              {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                <motion.div
                  key={`hidden1-${i}`}
                  className="w-12 h-12 rounded-full bg-slate-800 mb-4"
                  initial={{ scale: 0.8 }}
                  animate={{
                    scale: activeNeuron !== null ? 1 : 0.8,
                    backgroundColor: activeNeuron !== null ? "#4f46e5" : "#1e293b",
                  }}
                  transition={{ duration: 0.2, delay: i * 0.05 }}
                />
              ))}
            </div>

            <div className="absolute right-1/4 top-0 bottom-0 flex flex-col justify-center items-center">
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.div
                  key={`hidden2-${i}`}
                  className="w-12 h-12 rounded-full bg-slate-800 mb-4"
                  initial={{ scale: 0.8 }}
                  animate={{
                    scale: activePath !== null ? 1 : 0.8,
                    backgroundColor: activePath !== null ? "#8b5cf6" : "#1e293b",
                  }}
                  transition={{ duration: 0.2, delay: i * 0.05 + 0.3 }}
                />
              ))}
            </div>

            <div className="absolute inset-0 flex justify-center items-center">
              <div className="text-white/50 text-sm -mt-40">Hidden Layers</div>
              <div className="text-xs text-white/40 mt-40">Processing Filipino language patterns</div>
            </div>
          </div>
        </div>

        {/* Output Layer - English Translation */}
        <div className="absolute right-0 top-0 bottom-0 w-1/4 flex flex-col justify-center items-center">
          <div className="text-white/70 mb-4 text-sm">Output Layer</div>
          <motion.div
            className="w-48 h-32 rounded-xl bg-slate-800 flex items-center justify-center p-4 text-center"
            initial={{ opacity: 0 }}
            animate={{
              opacity: showOutput ? 1 : 0.3,
              backgroundColor: showOutput ? "#059669" : "#1e293b",
            }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <div className="font-bold text-white">{outputTranslation}</div>
              <div className="text-xs mt-2 text-white/70">English Translation</div>
            </div>
          </motion.div>
        </div>

        {/* Filipino cultural elements */}
        <div className="absolute bottom-2 left-2">
          <div className="flex items-center">
            <div className="w-6 h-6 rounded-full bg-red-600 mr-1"></div>
            <div className="w-6 h-6 rounded-full bg-blue-600 mr-1"></div>
            <div className="w-6 h-6 rounded-full bg-yellow-500"></div>
          </div>
          <div className="text-xs text-white/50 mt-1">Philippine Flag Colors</div>
        </div>
      </div>
    </div>
  )
}
