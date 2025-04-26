"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"
import { analyzeTextAction } from "@/app/actions/ai-actions"
import AIChatInterface from "@/components/ai-chat-interface"

export default function InteractiveFilipinoNLP() {
  const [inputText, setInputText] = useState("Magandang araw! Kumusta ka? Masaya ako ngayong araw.")
  const [processedText, setProcessedText] = useState<any[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("demo")

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  // Example Filipino phrases for the user to try
  const examplePhrases = [
    "Magandang araw! Kumusta ka?",
    "Masarap ang pagkain sa Pilipinas.",
    "Gusto kong matuto ng Tagalog.",
    "Mahal ko ang aking pamilya.",
    "Maganda ang panahon ngayon.",
  ]

  const handleExampleClick = (phrase: string) => {
    setInputText(phrase)
    // Process the example phrase immediately
    setTimeout(() => {
      analyzeText()
    }, 100)
  }

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardContent className="p-6">
        <h2 className="text-xl font-bold text-white mb-4">Interactive Filipino NLP</h2>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="bg-slate-700">
            <TabsTrigger value="demo">Text Analysis</TabsTrigger>
            <TabsTrigger value="chat">Language Learning</TabsTrigger>
          </TabsList>

          <TabsContent value="demo" className="pt-4">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">Enter Filipino Text:</label>
                <div className="flex gap-2">
                  <Input
                    value={inputText}
                    onChange={handleTextChange}
                    placeholder="Type in Filipino (Tagalog)..."
                    className="bg-slate-700 border-slate-600 text-white"
                  />
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
                      "Analyze"
                    )}
                  </Button>
                </div>
              </div>

              <div className="bg-slate-700/50 p-4 rounded-lg">
                <h4 className="font-semibold text-white mb-2">Try these examples:</h4>
                <div className="flex flex-wrap gap-2">
                  {examplePhrases.map((phrase, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleExampleClick(phrase)}
                      className="text-xs bg-slate-600 border-slate-500 text-white"
                    >
                      {phrase}
                    </Button>
                  ))}
                </div>
              </div>

              {error && <div className="bg-red-900/20 border border-red-800 rounded-md p-3 text-white">{error}</div>}

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Analysis Results:</h3>
                <div className="bg-slate-700/50 rounded-md p-4 max-h-60 overflow-y-auto">
                  {isAnalyzing ? (
                    <div className="flex items-center justify-center h-32">
                      <Loader2 className="h-8 w-8 animate-spin text-pink-500" />
                    </div>
                  ) : processedText.length > 0 ? (
                    <div className="space-y-2">
                      {processedText.map((item, i) => (
                        <motion.div
                          key={i}
                          className="flex items-center justify-between p-2 rounded bg-slate-800/50"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.2, delay: i * 0.05 }}
                        >
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
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-slate-400 text-center py-8">Enter text and click "Analyze" to see results</div>
                  )}
                </div>
              </div>

              <div className="bg-slate-700/50 p-4 rounded-lg">
                <h4 className="font-semibold text-white mb-2">How It Works</h4>
                <p className="text-sm text-white/80">
                  This demo uses AI to analyze Filipino text and identify parts of speech. The AI model has been trained
                  to understand Tagalog and other Filipino languages, recognizing nouns, verbs, adjectives, and other
                  grammatical elements. This technology helps in building applications like machine translation, content
                  analysis, and language learning tools.
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="chat" className="pt-4">
            <AIChatInterface
              title="Filipino Language Assistant"
              placeholder="Ask about Filipino words, phrases, or grammar..."
              context="The user is learning about Filipino languages and wants to understand words, phrases, grammar, and cultural context."
              initialMessage={`Magandang araw! (Good day!) I'm your Filipino language assistant. I can help you learn Tagalog and other 
              Philippine languages. You can ask me about words, phrases, grammar, pronunciation, or cultural context. 
              What would you like to learn today?`}
            />

            <div className="mt-4 p-3 bg-slate-700/50 rounded-lg">
              <h4 className="font-semibold text-white mb-1">Suggested Questions</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="justify-start text-left h-auto py-1 text-xs"
                  onClick={() => document.getElementById("chat-input")?.focus()}
                >
                  What's the difference between "po" and "ho" in Tagalog?
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="justify-start text-left h-auto py-1 text-xs"
                  onClick={() => document.getElementById("chat-input")?.focus()}
                >
                  How do I say "I love you" in different Philippine languages?
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="justify-start text-left h-auto py-1 text-xs"
                  onClick={() => document.getElementById("chat-input")?.focus()}
                >
                  Explain the basic grammar structure of Tagalog sentences.
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="justify-start text-left h-auto py-1 text-xs"
                  onClick={() => document.getElementById("chat-input")?.focus()}
                >
                  What are some common Filipino expressions I should know?
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
