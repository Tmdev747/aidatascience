"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { MessageSquare, ThumbsUp, ThumbsDown, Search, ArrowRight } from "lucide-react"

export default function FilipinoNLPVisualization() {
  const [activeExample, setActiveExample] = useState(0)
  const [showAnalysis, setShowAnalysis] = useState(false)

  // Cycle through examples
  useEffect(() => {
    const interval = setInterval(() => {
      setShowAnalysis(false)

      setTimeout(() => {
        setActiveExample((prev) => (prev + 1) % examples.length)

        setTimeout(() => {
          setShowAnalysis(true)
        }, 1000)
      }, 1000)
    }, 6000)

    return () => clearInterval(interval)
  }, [])

  const examples = [
    {
      text: "Ang bagong teknolohiyang ito ay talagang nakakagulat at nakakatulong sa ating bansa.",
      translation: "This new technology is truly amazing and helpful for our country.",
      sentiment: "positive",
      entities: [
        { text: "teknolohiya", type: "TECHNOLOGY", confidence: 0.92 },
        { text: "bansa", type: "LOCATION", confidence: 0.87 },
      ],
      keywords: ["teknolohiya", "nakakagulat", "nakakatulong", "bansa"],
    },
    {
      text: "Hindi ko maintindihan kung bakit mabagal ang internet sa probinsya namin.",
      translation: "I don't understand why the internet is slow in our province.",
      sentiment: "negative",
      entities: [
        { text: "internet", type: "TECHNOLOGY", confidence: 0.95 },
        { text: "probinsya", type: "LOCATION", confidence: 0.89 },
      ],
      keywords: ["maintindihan", "mabagal", "internet", "probinsya"],
    },
    {
      text: "Pwede po bang malaman kung saan ang pinakamalapit na vaccination center?",
      translation: "May I know where the nearest vaccination center is?",
      sentiment: "neutral",
      entities: [{ text: "vaccination center", type: "FACILITY", confidence: 0.94 }],
      keywords: ["malaman", "pinakamalapit", "vaccination center"],
    },
  ]

  return (
    <div className="w-full bg-slate-900 rounded-xl p-6 overflow-hidden">
      <h3 className="text-xl font-bold text-white mb-6 text-center">Filipino Natural Language Processing</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left side - Input and Translation */}
        <div className="space-y-4">
          <div className="p-4 bg-slate-800 rounded-lg border border-slate-700">
            <div className="flex items-center mb-3">
              <MessageSquare className="h-5 w-5 text-purple-500 mr-2" />
              <h4 className="font-bold text-white">Filipino Text Input</h4>
            </div>

            <motion.div
              key={`input-${activeExample}`}
              className="p-3 bg-slate-700/50 rounded-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-white/90">{examples[activeExample].text}</p>
            </motion.div>

            <div className="flex justify-center my-4">
              <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: 1 }}>
                <ArrowRight className="h-6 w-6 text-purple-500" />
              </motion.div>
            </div>

            <div className="flex items-center mb-3">
              <Search className="h-5 w-5 text-blue-500 mr-2" />
              <h4 className="font-bold text-white">English Translation</h4>
            </div>

            <motion.div
              key={`translation-${activeExample}`}
              className="p-3 bg-slate-700/50 rounded-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: showAnalysis ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-white/90">{examples[activeExample].translation}</p>
            </motion.div>
          </div>

          <div className="p-4 bg-slate-800 rounded-lg border border-slate-700">
            <h4 className="font-bold text-white mb-3">Philippine Context</h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-purple-500 mt-1.5 mr-2"></div>
                <span>Supports Tagalog, Cebuano, Ilocano, and other Philippine languages</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-purple-500 mt-1.5 mr-2"></div>
                <span>Handles code-switching between English and Filipino languages</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-purple-500 mt-1.5 mr-2"></div>
                <span>Recognizes Filipino cultural references and local expressions</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-purple-500 mt-1.5 mr-2"></div>
                <span>Developed with data from Philippine social media and news sources</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right side - NLP Analysis */}
        <div className="space-y-4">
          <div className="p-4 bg-slate-800 rounded-lg border border-slate-700">
            <h4 className="font-bold text-white mb-3">NLP Analysis</h4>

            {/* Sentiment Analysis */}
            <div className="mb-4">
              <div className="text-sm text-white/70 mb-2">Sentiment Analysis:</div>
              <motion.div
                key={`sentiment-${activeExample}`}
                className="flex space-x-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: showAnalysis ? 1 : 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {examples[activeExample].sentiment === "positive" ? (
                  <div className="flex items-center px-3 py-1.5 bg-green-900/30 border border-green-800 rounded-lg">
                    <ThumbsUp className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-green-400 font-medium">Positive</span>
                  </div>
                ) : examples[activeExample].sentiment === "negative" ? (
                  <div className="flex items-center px-3 py-1.5 bg-red-900/30 border border-red-800 rounded-lg">
                    <ThumbsDown className="h-4 w-4 text-red-500 mr-2" />
                    <span className="text-red-400 font-medium">Negative</span>
                  </div>
                ) : (
                  <div className="flex items-center px-3 py-1.5 bg-blue-900/30 border border-blue-800 rounded-lg">
                    <span className="text-blue-400 font-medium">Neutral</span>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Named Entity Recognition */}
            <div className="mb-4">
              <div className="text-sm text-white/70 mb-2">Named Entity Recognition:</div>
              <motion.div
                key={`entities-${activeExample}`}
                className="p-3 bg-slate-700/50 rounded-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: showAnalysis ? 1 : 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {examples[activeExample].entities.length > 0 ? (
                  <div className="space-y-2">
                    {examples[activeExample].entities.map((entity, i) => (
                      <div key={i} className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="px-2 py-0.5 bg-purple-900/50 rounded text-xs text-purple-300 mr-2">
                            {entity.type}
                          </div>
                          <span className="text-white/90">{entity.text}</span>
                        </div>
                        <div className="text-xs text-white/60">{Math.round(entity.confidence * 100)}% confidence</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-white/60 text-sm">No entities detected</p>
                )}
              </motion.div>
            </div>

            {/* Keyword Extraction */}
            <div>
              <div className="text-sm text-white/70 mb-2">Keyword Extraction:</div>
              <motion.div
                key={`keywords-${activeExample}`}
                className="flex flex-wrap gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: showAnalysis ? 1 : 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {examples[activeExample].keywords.map((keyword, i) => (
                  <motion.div
                    key={i}
                    className="px-2 py-1 bg-slate-700 rounded-full text-sm text-white/80"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.3 + i * 0.1 }}
                  >
                    {keyword}
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Applications */}
          <div className="p-4 bg-slate-800 rounded-lg border border-slate-700">
            <h4 className="font-bold text-white mb-3">Applications in the Philippines</h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-purple-900/20 border border-purple-800 rounded-lg">
                <h5 className="font-medium text-white text-sm mb-1">Social Media Monitoring</h5>
                <p className="text-xs text-white/70">Analyzing public sentiment on government initiatives</p>
              </div>
              <div className="p-3 bg-blue-900/20 border border-blue-800 rounded-lg">
                <h5 className="font-medium text-white text-sm mb-1">Customer Service</h5>
                <p className="text-xs text-white/70">Chatbots that understand Filipino languages</p>
              </div>
              <div className="p-3 bg-green-900/20 border border-green-800 rounded-lg">
                <h5 className="font-medium text-white text-sm mb-1">Education</h5>
                <p className="text-xs text-white/70">Language learning tools for Philippine languages</p>
              </div>
              <div className="p-3 bg-amber-900/20 border border-amber-800 rounded-lg">
                <h5 className="font-medium text-white text-sm mb-1">Healthcare</h5>
                <p className="text-xs text-white/70">Medical information in local dialects</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
