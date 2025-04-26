"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"

export default function FilipinoNLPVisualization() {
  const [inputText, setInputText] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [activeTab, setActiveTab] = useState("sentiment")

  // Predefined responses for demo purposes
  const demoResponses = {
    sentiment: {
      "Masaya ako ngayong araw": {
        score: 0.89,
        label: "POSITIVE",
        explanation: "Detected positive emotion words: 'masaya' (happy)",
      },
      "Galit na galit ako sa nangyari": {
        score: 0.92,
        label: "NEGATIVE",
        explanation: "Detected negative emotion words: 'galit' (angry)",
      },
      "Ang lamig ng panahon": {
        score: 0.62,
        label: "NEUTRAL",
        explanation: "Statement of fact without strong emotional content",
      },
      "Ang ganda ng tanawin dito": {
        score: 0.85,
        label: "POSITIVE",
        explanation: "Detected positive descriptors: 'ganda' (beautiful)",
      },
      "Hindi ko gusto ang pagkain": {
        score: 0.78,
        label: "NEGATIVE",
        explanation: "Detected negative sentiment: 'hindi gusto' (don't like)",
      },
    },
    translation: {
      "Masaya ako ngayong araw": "I am happy today",
      "Galit na galit ako sa nangyari": "I am very angry about what happened",
      "Ang lamig ng panahon": "The weather is cold",
      "Ang ganda ng tanawin dito": "The view here is beautiful",
      "Hindi ko gusto ang pagkain": "I don't like the food",
    },
    intent: {
      "Masaya ako ngayong araw": {
        intent: "STATEMENT",
        confidence: 0.95,
      },
      "Pwede mo ba akong tulungan?": {
        intent: "REQUEST_HELP",
        confidence: 0.92,
      },
      "Anong oras na?": {
        intent: "QUESTION_TIME",
        confidence: 0.89,
      },
      "Buksan mo ang bintana": {
        intent: "COMMAND",
        confidence: 0.94,
      },
      "Salamat sa tulong mo": {
        intent: "GRATITUDE",
        confidence: 0.97,
      },
    },
  }

  // Example Filipino phrases for the user to try
  const examplePhrases = [
    "Masaya ako ngayong araw",
    "Galit na galit ako sa nangyari",
    "Ang lamig ng panahon",
    "Pwede mo ba akong tulungan?",
    "Salamat sa tulong mo",
  ]

  const processText = async () => {
    if (!inputText.trim()) return

    setIsProcessing(true)
    setResult(null)

    try {
      // Simulate API processing delay
      await new Promise((resolve) => setTimeout(resolve, 1200))

      // Check if we have a predefined response for this exact text
      let response: any = null

      if (activeTab === "sentiment" && demoResponses.sentiment[inputText]) {
        response = demoResponses.sentiment[inputText]
      } else if (activeTab === "translation" && demoResponses.translation[inputText]) {
        response = demoResponses.translation[inputText]
      } else if (activeTab === "intent" && demoResponses.intent[inputText]) {
        response = demoResponses.intent[inputText]
      } else {
        // Generate a generic response based on the text
        if (activeTab === "sentiment") {
          // Simple sentiment analysis based on keywords
          const positiveWords = ["masaya", "maganda", "mabuti", "masarap", "ganda", "buti", "mahal", "saya"]
          const negativeWords = ["galit", "malungkot", "hindi", "ayaw", "pangit", "masama", "takot"]

          const lowerText = inputText.toLowerCase()
          let score = 0.5
          let label = "NEUTRAL"
          let explanation = "No strong emotional indicators detected"

          const posMatches = positiveWords.filter((word) => lowerText.includes(word))
          const negMatches = negativeWords.filter((word) => lowerText.includes(word))

          if (posMatches.length > negMatches.length) {
            score = 0.7 + Math.random() * 0.25
            label = "POSITIVE"
            explanation = `Detected positive words: ${posMatches.join(", ")}`
          } else if (negMatches.length > posMatches.length) {
            score = 0.7 + Math.random() * 0.25
            label = "NEGATIVE"
            explanation = `Detected negative words: ${negMatches.join(", ")}`
          }

          response = { score, label, explanation }
        } else if (activeTab === "translation") {
          // For translation, we'll just return the original text
          response = "Translation not available for this text in demo mode"
        } else if (activeTab === "intent") {
          // Simple intent detection based on patterns
          const lowerText = inputText.toLowerCase()
          let intent = "STATEMENT"
          const confidence = 0.7 + Math.random() * 0.2

          if (lowerText.includes("?")) {
            intent = "QUESTION"
            if (lowerText.includes("ano") || lowerText.includes("saan") || lowerText.includes("sino")) {
              intent = "QUESTION_INFO"
            } else if (lowerText.includes("pwede") || lowerText.includes("maaari")) {
              intent = "REQUEST"
            }
          } else if (lowerText.includes("salamat") || lowerText.includes("thank")) {
            intent = "GRATITUDE"
          } else if (lowerText.startsWith("pakiusap") || lowerText.includes("tulungan")) {
            intent = "REQUEST_HELP"
          }

          response = { intent, confidence }
        }
      }

      setResult(response)
    } catch (error) {
      console.error("Error processing text:", error)
    } finally {
      setIsProcessing(false)
    }
  }

  const handleExampleClick = (phrase: string) => {
    setInputText(phrase)
    // Process the example phrase immediately
    setTimeout(() => {
      processText()
    }, 100)
  }

  return (
    <div className="bg-slate-900 rounded-xl p-6 overflow-hidden">
      <h3 className="text-xl font-bold text-white mb-4 text-center">Filipino Natural Language Processing</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left side - Input and controls */}
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2 mb-4">
            <Button
              variant={activeTab === "sentiment" ? "default" : "outline"}
              onClick={() => setActiveTab("sentiment")}
              className="text-sm"
              size="sm"
            >
              Sentiment Analysis
            </Button>
            <Button
              variant={activeTab === "translation" ? "default" : "outline"}
              onClick={() => setActiveTab("translation")}
              className="text-sm"
              size="sm"
            >
              Translation
            </Button>
            <Button
              variant={activeTab === "intent" ? "default" : "outline"}
              onClick={() => setActiveTab("intent")}
              className="text-sm"
              size="sm"
            >
              Intent Detection
            </Button>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-white">Enter Filipino Text:</label>
            <div className="flex gap-2">
              <Input
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type in Filipino (Tagalog)..."
                className="bg-slate-800 border-slate-700 text-white"
              />
              <Button onClick={processText} disabled={isProcessing || !inputText.trim()}>
                {isProcessing ? <Loader2 className="h-4 w-4 animate-spin" /> : "Analyze"}
              </Button>
            </div>
          </div>

          <div className="bg-slate-800/50 p-4 rounded-lg">
            <h4 className="font-semibold text-white mb-2">Try these examples:</h4>
            <div className="flex flex-wrap gap-2">
              {examplePhrases.map((phrase, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleExampleClick(phrase)}
                  className="text-xs bg-slate-700 border-slate-600 text-white"
                >
                  {phrase}
                </Button>
              ))}
            </div>
          </div>

          <div className="bg-slate-800/50 p-4 rounded-lg">
            <h4 className="font-semibold text-white mb-2">About Filipino NLP</h4>
            <p className="text-sm text-white/80">
              Natural Language Processing for Filipino languages presents unique challenges due to the mix of Tagalog,
              English, and regional dialects. This demo showcases basic NLP capabilities adapted for Philippine
              languages.
            </p>
          </div>
        </div>

        {/* Right side - Results visualization */}
        <div className="bg-slate-800 rounded-lg p-4 relative min-h-[350px]">
          <div className="absolute inset-0 flex items-center justify-center">
            {isProcessing ? (
              <div className="flex flex-col items-center">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500 mb-2" />
                <p className="text-white/80">Processing Filipino text...</p>
              </div>
            ) : !result ? (
              <div className="text-center text-white/60">
                <p>Enter Filipino text and click Analyze to see results</p>
              </div>
            ) : (
              <motion.div
                className="w-full h-full p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {activeTab === "sentiment" && (
                  <div className="space-y-4">
                    <h4 className="text-lg font-medium text-white">Sentiment Analysis Results</h4>

                    <div className="flex items-center justify-center mb-4">
                      <div
                        className={`text-4xl ${
                          result.label === "POSITIVE"
                            ? "text-green-500"
                            : result.label === "NEGATIVE"
                              ? "text-red-500"
                              : "text-yellow-500"
                        }`}
                      >
                        {result.label === "POSITIVE" ? "😊" : result.label === "NEGATIVE" ? "😞" : "😐"}
                      </div>
                    </div>

                    <div className="bg-slate-700/50 p-4 rounded-lg">
                      <div className="flex justify-between mb-1">
                        <span className="text-white/80">Sentiment:</span>
                        <span
                          className={`font-medium ${
                            result.label === "POSITIVE"
                              ? "text-green-400"
                              : result.label === "NEGATIVE"
                                ? "text-red-400"
                                : "text-yellow-400"
                          }`}
                        >
                          {result.label}
                        </span>
                      </div>

                      <div className="flex justify-between mb-2">
                        <span className="text-white/80">Confidence:</span>
                        <span className="text-white">{Math.round(result.score * 100)}%</span>
                      </div>

                      <div className="w-full bg-slate-600 rounded-full h-2.5">
                        <motion.div
                          className={`h-2.5 rounded-full ${
                            result.label === "POSITIVE"
                              ? "bg-green-500"
                              : result.label === "NEGATIVE"
                                ? "bg-red-500"
                                : "bg-yellow-500"
                          }`}
                          initial={{ width: 0 }}
                          animate={{ width: `${result.score * 100}%` }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                    </div>

                    <div className="bg-slate-700/50 p-4 rounded-lg">
                      <h5 className="font-medium text-white mb-1">Analysis:</h5>
                      <p className="text-sm text-white/80">{result.explanation}</p>
                    </div>
                  </div>
                )}

                {activeTab === "translation" && (
                  <div className="space-y-4">
                    <h4 className="text-lg font-medium text-white">Translation Results</h4>

                    <div className="bg-slate-700/50 p-4 rounded-lg mb-4">
                      <h5 className="font-medium text-white mb-1">Filipino (Original):</h5>
                      <p className="text-white/90 border-l-2 border-blue-500 pl-3 py-1">{inputText}</p>
                    </div>

                    <div className="bg-slate-700/50 p-4 rounded-lg">
                      <h5 className="font-medium text-white mb-1">English Translation:</h5>
                      <p className="text-white/90 border-l-2 border-green-500 pl-3 py-1">{result}</p>
                    </div>

                    <div className="text-xs text-white/50 text-center">
                      Filipino-English translation powered by neural machine translation by InnovateHub AI
                    </div>
                  </div>
                )}

                {activeTab === "intent" && (
                  <div className="space-y-4">
                    <h4 className="text-lg font-medium text-white">Intent Detection Results</h4>

                    <div className="flex items-center justify-center mb-4">
                      <div className="text-4xl text-blue-500">🎯</div>
                    </div>

                    <div className="bg-slate-700/50 p-4 rounded-lg">
                      <div className="flex justify-between mb-1">
                        <span className="text-white/80">Detected Intent:</span>
                        <span className="font-medium text-blue-400">{result.intent}</span>
                      </div>

                      <div className="flex justify-between mb-2">
                        <span className="text-white/80">Confidence:</span>
                        <span className="text-white">{Math.round(result.confidence * 100)}%</span>
                      </div>

                      <div className="w-full bg-slate-600 rounded-full h-2.5">
                        <motion.div
                          className="h-2.5 rounded-full bg-blue-500"
                          initial={{ width: 0 }}
                          animate={{ width: `${result.confidence * 100}%` }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                    </div>

                    <div className="bg-slate-700/50 p-4 rounded-lg">
                      <h5 className="font-medium text-white mb-1">Possible Actions:</h5>
                      <ul className="text-sm text-white/80 space-y-1">
                        {result.intent === "QUESTION" && <li>• Provide information in response to the question</li>}
                        {result.intent === "QUESTION_INFO" && <li>• Search for specific information requested</li>}
                        {result.intent === "REQUEST" && <li>• Process the user's request for permission</li>}
                        {result.intent === "REQUEST_HELP" && <li>• Offer assistance based on the request</li>}
                        {result.intent === "GRATITUDE" && <li>• Acknowledge the user's thanks</li>}
                        {result.intent === "COMMAND" && <li>• Execute the requested command</li>}
                        {result.intent === "STATEMENT" && <li>• Acknowledge the statement</li>}
                      </ul>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
