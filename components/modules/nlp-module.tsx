"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2 } from "lucide-react"
import { analyzeTextAction } from "@/app/actions/ai-actions"
import Image from "next/image"

interface AnalysisResult {
  word: string
  type: string
  confidence: number
}

export default function NLPModule() {
  const [inputText, setInputText] = useState("Magandang araw! Kumusta ka? Masaya ako ngayong araw.")
  const [processedText, setProcessedText] = useState<AnalysisResult[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("demo")

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value)
  }

  const analyzeText = async () => {
    if (!inputText.trim()) return

    setIsAnalyzing(true)
    setError(null)

    try {
      const result = await analyzeTextAction(inputText, "part-of-speech")

      if (result.success && result.data) {
        setProcessedText(result.data)
      } else {
        setError("Failed to analyze text. Please try again.")
        setProcessedText([])
      }
    } catch (err) {
      console.error("Error during text analysis:", err)
      setError("An unexpected error occurred. Please try again.")
      setProcessedText([])
    } finally {
      setIsAnalyzing(false)
    }
  }

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      noun: "#ec4899",
      verb: "#8b5cf6",
      adjective: "#3b82f6",
      adverb: "#10b981",
      pronoun: "#f59e0b",
      greeting: "#ef4444",
      question: "#06b6d4",
      conjunction: "#14b8a6",
      preposition: "#8b5cf6",
      interjection: "#f43f5e",
    }
    return colors[type.toLowerCase()] || "#a3a3a3"
  }

  return (
    <div className="py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-white mb-4">Natural Language Processing</h1>
        <p className="text-xl text-white/80 max-w-3xl mx-auto">
          Explore how AI understands and processes human language, including Filipino languages like Tagalog.
        </p>
      </motion.div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Left Column - Information */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-1"
        >
          <Card className="bg-slate-800/50 border-slate-700 h-full">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-white mb-4">Natural Language Processing</h2>

              <div className="space-y-4 text-white/80">
                <p>NLP enables computers to understand, interpret, and generate human language in useful ways.</p>

                <h3 className="text-lg font-semibold text-white mt-6">Key Applications:</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <span className="font-medium text-pink-400">Text Classification</span>: Categorizing text into
                    predefined categories.
                  </li>
                  <li>
                    <span className="font-medium text-pink-400">Sentiment Analysis</span>: Determining the emotional
                    tone behind text.
                  </li>
                  <li>
                    <span className="font-medium text-pink-400">Named Entity Recognition</span>: Identifying entities
                    like people, places, and organizations.
                  </li>
                  <li>
                    <span className="font-medium text-pink-400">Machine Translation</span>: Translating text between
                    languages.
                  </li>
                </ul>

                <div className="mt-6 p-4 bg-pink-900/30 rounded-lg border border-pink-800">
                  <h4 className="font-semibold text-white">Philippine Application</h4>
                  <p className="text-sm mt-1">
                    NLP is being used to develop Filipino language processing tools that can analyze social media
                    content in Tagalog and other Philippine languages for public sentiment analysis.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Right Column - Interactive Demo */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="lg:col-span-2"
        >
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-white mb-4">Interactive NLP Demo</h2>

              <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
                <TabsList className="bg-slate-700">
                  <TabsTrigger value="demo">Demo</TabsTrigger>
                  <TabsTrigger value="visualization">Visualization</TabsTrigger>
                  <TabsTrigger value="explanation">Explanation</TabsTrigger>
                </TabsList>

                <TabsContent value="demo" className="pt-4">
                  <div className="space-y-4 p-4 bg-slate-900 rounded-lg">
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        Enter Text (Filipino or English):
                      </label>
                      <textarea
                        className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-white h-32"
                        value={inputText}
                        onChange={handleTextChange}
                        placeholder="Enter text to analyze..."
                      />
                    </div>

                    <div className="flex justify-end">
                      <Button
                        onClick={analyzeText}
                        disabled={isAnalyzing || !inputText.trim()}
                        className="bg-pink-600 hover:bg-pink-700"
                      >
                        {isAnalyzing ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Analyzing...
                          </>
                        ) : (
                          "Analyze Text"
                        )}
                      </Button>
                    </div>

                    {error && (
                      <div className="bg-red-900/20 border border-red-800 rounded-md p-3 text-white">{error}</div>
                    )}

                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Analysis Results:</h3>
                      <div className="bg-slate-800 rounded-md p-4 max-h-60 overflow-y-auto">
                        {isAnalyzing ? (
                          <div className="flex items-center justify-center h-32">
                            <Loader2 className="h-8 w-8 animate-spin text-pink-500" />
                          </div>
                        ) : processedText.length > 0 ? (
                          processedText.map((item, i) => (
                            <div key={i} className="mb-2 flex items-center justify-between">
                              <div className="flex items-center">
                                <div
                                  className="w-3 h-3 rounded-full mr-2"
                                  style={{ backgroundColor: getTypeColor(item.type) }}
                                ></div>
                                <span className="text-white font-medium">{item.word}</span>
                              </div>
                              <div className="text-sm">
                                <span className="text-slate-400">{item.type}</span>
                                <span className="ml-2 text-white/70">{(item.confidence * 100).toFixed(0)}%</span>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-slate-400 text-center py-8">
                            Enter text and click "Analyze Text" to see results
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="visualization" className="pt-4">
                  <div className="bg-slate-900 rounded-lg p-4 h-80 relative overflow-hidden">
                    <svg width="100%" height="100%" viewBox="0 0 800 300">
                      {/* Word cloud visualization */}
                      {processedText.map((item, i) => {
                        const angle = (i / processedText.length) * Math.PI * 2
                        const radius = 100 + item.confidence * 50
                        const x = 400 + Math.cos(angle) * radius
                        const y = 150 + Math.sin(angle) * radius
                        const fontSize = 12 + item.confidence * 16

                        return (
                          <motion.text
                            key={i}
                            x={x}
                            y={y}
                            textAnchor="middle"
                            fill={getTypeColor(item.type)}
                            fontSize={fontSize}
                            fontWeight={item.confidence > 0.85 ? "bold" : "normal"}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                          >
                            {item.word}
                          </motion.text>
                        )
                      })}

                      {/* Central node */}
                      <circle cx="400" cy="150" r="20" fill="#ec4899" opacity="0.7" />

                      {/* Connection lines */}
                      {processedText.map((item, i) => {
                        const angle = (i / processedText.length) * Math.PI * 2
                        const radius = 100 + item.confidence * 50
                        const x = 400 + Math.cos(angle) * radius
                        const y = 150 + Math.sin(angle) * radius

                        return (
                          <motion.line
                            key={`line-${i}`}
                            x1="400"
                            y1="150"
                            x2={x}
                            y2={y}
                            stroke={getTypeColor(item.type)}
                            strokeWidth="1"
                            strokeOpacity="0.5"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                          />
                        )
                      })}

                      {isAnalyzing && (
                        <text x="400" y="150" textAnchor="middle" fill="#ffffff" fontSize="16">
                          Analyzing...
                        </text>
                      )}

                      {!isAnalyzing && processedText.length === 0 && (
                        <text x="400" y="150" textAnchor="middle" fill="#94a3b8" fontSize="16">
                          No data to visualize yet
                        </text>
                      )}
                    </svg>
                  </div>
                </TabsContent>

                <TabsContent value="explanation" className="pt-4">
                  <div className="p-4 bg-slate-900 rounded-lg">
                    <h3 className="text-lg font-semibold text-white mb-2">How NLP Works</h3>
                    <p className="text-white/80 mb-4">
                      This demonstration uses the Groq AI API to perform real-time natural language processing:
                    </p>

                    <ol className="space-y-3 text-white/80 list-decimal pl-5">
                      <li>
                        <strong>Tokenization</strong>: Breaking text into words, phrases, or other meaningful elements.
                      </li>
                      <li>
                        <strong>Part-of-speech tagging</strong>: Identifying whether each word is a noun, verb,
                        adjective, etc.
                      </li>
                      <li>
                        <strong>Named entity recognition</strong>: Identifying names of people, places, organizations,
                        etc.
                      </li>
                      <li>
                        <strong>Sentiment analysis</strong>: Determining the emotional tone of the text.
                      </li>
                    </ol>

                    <div className="mt-4 p-3 bg-pink-900/20 rounded">
                      <p className="text-white/90 text-sm">
                        <strong>Note:</strong> This demo uses the Llama-3 model through Groq's API to provide real
                        natural language processing capabilities. Try entering text in Filipino languages like Tagalog
                        to see how the model processes it!
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Filipino Language Processing */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mb-12"
      >
        <h2 className="text-2xl font-bold text-white mb-6">Filipino Language Processing</h2>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-white mb-4">Challenges in Filipino NLP</h3>
                <ul className="space-y-3 text-white/80">
                  <li className="flex gap-2">
                    <div className="w-4 h-4 rounded-full bg-pink-500 mt-1 flex-shrink-0"></div>
                    <div>
                      <strong>Language Diversity</strong>: The Philippines has over 180 languages and dialects.
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <div className="w-4 h-4 rounded-full bg-pink-500 mt-1 flex-shrink-0"></div>
                    <div>
                      <strong>Code-switching</strong>: Mixing of English and Filipino in everyday communication.
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <div className="w-4 h-4 rounded-full bg-pink-500 mt-1 flex-shrink-0"></div>
                    <div>
                      <strong>Limited Resources</strong>: Fewer datasets and pre-trained models compared to English.
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <div className="w-4 h-4 rounded-full bg-pink-500 mt-1 flex-shrink-0"></div>
                    <div>
                      <strong>Morphological Complexity</strong>: Filipino has complex word formation rules.
                    </div>
                  </li>
                </ul>
              </div>

              <div>
                <div className="bg-slate-700/30 rounded-lg overflow-hidden mb-4">
                  <div className="relative aspect-[4/3]">
                    <Image
                      src="/images/filipino-sentiment-analysis.png"
                      alt="Filipino Social Media Sentiment Analysis"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-4">Recent Advances</h3>
                <div className="space-y-4">
                  <div className="bg-slate-700/50 p-4 rounded-lg">
                    <h4 className="font-semibold text-white mb-1">Filipino Word Embeddings</h4>
                    <p className="text-sm text-white/80">
                      Researchers at UP Diliman have developed word embeddings specifically for Filipino text, improving
                      performance on various NLP tasks.
                    </p>
                  </div>

                  <div className="bg-slate-700/50 p-4 rounded-lg">
                    <h4 className="font-semibold text-white mb-1">Batangas State University Research</h4>
                    <p className="text-sm text-white/80">
                      BSU researchers are developing NLP tools for analyzing local dialects and improving educational
                      applications.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Case Study */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <h2 className="text-2xl font-bold text-white mb-6">Case Study: Disaster Response</h2>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <div className="rounded-lg overflow-hidden relative aspect-square">
                  <Image
                    src="/images/ph-disaster-response.png"
                    alt="Typhoon Response System"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <h3 className="text-xl font-bold text-white mb-2">Typhoon Response Text Analysis</h3>
                <p className="text-white/80 mb-4">
                  During typhoons, government agencies use NLP to analyze social media posts in Filipino languages to
                  identify areas needing immediate assistance. The system processes thousands of messages per minute to
                  extract location information and severity of situations.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div className="bg-slate-700/50 p-3 rounded">
                    <h4 className="font-semibold text-white mb-1">Impact</h4>
                    <p className="text-sm text-white/80">
                      30% faster response time to critical situations during Typhoon Odette in 2021
                    </p>
                  </div>
                  <div className="bg-slate-700/50 p-3 rounded">
                    <h4 className="font-semibold text-white mb-1">Technology</h4>
                    <p className="text-sm text-white/80">
                      BERT-based model fine-tuned on Filipino emergency communications
                    </p>
                  </div>
                </div>

                <Button variant="outline" className="mt-2">
                  Read Full Case Study
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
