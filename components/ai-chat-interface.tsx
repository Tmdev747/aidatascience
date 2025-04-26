"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Loader2, Send, AlertCircle } from "lucide-react"
import { useChat } from "ai/react"
import { motion } from "framer-motion"
import { useAnalytics } from "@/components/analytics-provider"
import { startMeasure, endMeasure } from "@/utils/performance"
import { logger } from "@/utils/logging"

interface AIChatInterfaceProps {
  title: string
  placeholder?: string
  context?: string
  initialMessage?: string
}

export default function AIChatInterface({
  title,
  placeholder = "Type your message...",
  context = "",
  initialMessage,
}: AIChatInterfaceProps) {
  const { trackEvent } = useAnalytics()
  const [error, setError] = useState<string | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    setMessages,
    error: chatError,
  } = useChat({
    api: "/api/chat",
    body: {
      context,
    },
    onResponse: () => {
      // Track when a response starts
      startMeasure("ai-response-time")
    },
    onFinish: () => {
      // Track when a response finishes and measure the time
      const measurement = endMeasure("ai-response-time")
      if (measurement) {
        trackEvent("ai_response_complete", {
          responseTime: measurement.duration,
          messageCount: messages.length + 1,
        })
      }
    },
    onError: (error) => {
      logger.error("Error in AI chat", error)
      setError("Sorry, there was an error processing your request. Please try again.")
    },
  })

  // Initialize with welcome message if provided
  useEffect(() => {
    if (!isInitialized && initialMessage) {
      setMessages([
        {
          id: "welcome",
          role: "assistant",
          content: initialMessage,
        },
      ])
      setIsInitialized(true)
    }
  }, [initialMessage, isInitialized, setMessages])

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  // Focus input on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  // Handle form submission with analytics
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!input.trim()) return

    // Track the user message
    trackEvent("ai_message_sent", {
      messageLength: input.length,
    })

    // Start measuring response time
    startMeasure("ai-request-time")

    // Clear any previous errors
    setError(null)

    // Submit the form
    handleSubmit(e)
  }

  // Display chat error from the hook
  useEffect(() => {
    if (chatError) {
      setError(chatError.message || "An error occurred during the conversation.")
      logger.error("Chat error", chatError)
    }
  }, [chatError])

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg text-white">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col h-[350px]">
          <div className="flex-1 overflow-y-auto mb-4 space-y-4 pr-1">
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div
                  className={`rounded-lg p-3 max-w-[85%] ${
                    message.role === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-slate-700 text-white border border-slate-600"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                </div>
              </motion.div>
            ))}

            {isLoading && (
              <motion.div
                className="flex justify-start"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-slate-700 text-white border border-slate-600 rounded-lg p-3">
                  <Loader2 className="h-5 w-5 animate-spin" />
                </div>
              </motion.div>
            )}

            {error && (
              <motion.div
                className="flex justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-red-900/30 border border-red-800 rounded-lg p-3 flex items-center gap-2 max-w-[85%]">
                  <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
                  <p className="text-white/90 text-sm">{error}</p>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleFormSubmit} className="flex gap-2">
            <Input
              id="chat-input"
              ref={inputRef}
              value={input}
              onChange={handleInputChange}
              placeholder={placeholder}
              disabled={isLoading}
              className="bg-slate-700 border-slate-600 text-white"
              aria-label="Type your message"
            />
            <Button
              type="submit"
              disabled={isLoading || !input.trim()}
              className={`${isLoading ? "bg-slate-600" : "bg-blue-600 hover:bg-blue-700"}`}
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              <span className="sr-only">Send message</span>
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  )
}
