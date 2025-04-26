"use client"

import { useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Loader2, Send, Bot, User, RefreshCw } from "lucide-react"
import { useChat } from "ai/react"
import { motion } from "framer-motion"

interface Message {
  role: "user" | "assistant"
  content: string
}

interface AIChatInterfaceProps {
  title?: string
  placeholder?: string
  context?: string
  initialMessage?: string
  avatarSrc?: string
  className?: string
  compact?: boolean
}

export default function AIChatInterface({
  title = "Chat with InnovateHub AI",
  placeholder = "Ask about AI applications in the Philippines...",
  context = "The user is learning about AI applications in the Philippines.",
  initialMessage,
  avatarSrc = "/images/innovate-hub-logo.png",
  className = "",
  compact = false,
}: AIChatInterfaceProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  // Use the AI SDK's useChat hook
  const { messages, input, handleInputChange, handleSubmit, isLoading, error, reload, stop } = useChat({
    api: "/api/chat",
    initialMessages: initialMessage
      ? [
          {
            id: "initial",
            role: "assistant",
            content: initialMessage,
          },
        ]
      : [],
    body: {
      context,
    },
  })

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  // Focus input on mount
  useEffect(() => {
    if (inputRef.current && !initialMessage) {
      inputRef.current.focus()
    }
  }, [initialMessage])

  return (
    <Card className={`${className} bg-slate-800/50 border-slate-700 overflow-hidden flex flex-col`}>
      <CardHeader className={compact ? "py-2 px-3" : "py-4"}>
        <CardTitle className="flex items-center gap-2 text-white">
          <Avatar className="h-6 w-6">
            <AvatarImage src={avatarSrc || "/placeholder.svg"} alt="InnovateHub AI" />
            <AvatarFallback>
              <Bot size={16} />
            </AvatarFallback>
          </Avatar>
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent
        className={`${compact ? "px-3 pb-2" : "p-4"} flex-grow overflow-y-auto max-h-[400px] space-y-4 text-white/90`}
      >
        {messages.map((message, index) => (
          <motion.div
            key={index}
            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className={`flex gap-2 max-w-[85%] ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
              <Avatar className="h-8 w-8 mt-1">
                {message.role === "user" ? (
                  <AvatarFallback className="bg-purple-700">
                    <User size={16} />
                  </AvatarFallback>
                ) : (
                  <>
                    <AvatarImage src={avatarSrc || "/placeholder.svg"} alt="InnovateHub AI" />
                    <AvatarFallback className="bg-blue-700">
                      <Bot size={16} />
                    </AvatarFallback>
                  </>
                )}
              </Avatar>

              <div
                className={`rounded-lg p-3 text-sm ${
                  message.role === "user"
                    ? "bg-purple-600/40 border border-purple-500/30"
                    : "bg-blue-600/20 border border-blue-500/30"
                }`}
              >
                {message.content}
              </div>
            </div>
          </motion.div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="flex gap-2 max-w-[85%]">
              <Avatar className="h-8 w-8 mt-1">
                <AvatarImage src={avatarSrc || "/placeholder.svg"} alt="InnovateHub AI" />
                <AvatarFallback className="bg-blue-700">
                  <Bot size={16} />
                </AvatarFallback>
              </Avatar>

              <div className="rounded-lg p-3 text-sm bg-blue-600/20 border border-blue-500/30 flex items-center">
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Thinking...
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="p-3 rounded-lg bg-red-900/30 border border-red-800 text-white text-sm">
            Error: {error.message || "Something went wrong. Please try again."}
            <Button
              variant="outline"
              size="sm"
              onClick={reload}
              className="mt-2 bg-transparent border-red-800 text-white hover:bg-red-800/30"
            >
              <RefreshCw className="h-3 w-3 mr-1" /> Retry
            </Button>
          </div>
        )}

        <div ref={messagesEndRef} />
      </CardContent>

      <CardFooter className={`${compact ? "p-2" : "p-4"} border-t border-slate-700 bg-slate-800/80`}>
        <form onSubmit={handleSubmit} className="flex w-full gap-2">
          <Textarea
            ref={inputRef}
            value={input}
            onChange={handleInputChange}
            placeholder={placeholder}
            className="min-h-10 flex-grow bg-slate-700 border-slate-600 text-white resize-none"
            rows={1}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleSubmit(e as any)
              }
            }}
          />
          <Button
            type="submit"
            disabled={isLoading || !input.trim()}
            className={`${compact ? "px-2" : ""} bg-blue-600 hover:bg-blue-700`}
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            {!compact && <span className="ml-2">Send</span>}
          </Button>
        </form>
      </CardFooter>
    </Card>
  )
}
