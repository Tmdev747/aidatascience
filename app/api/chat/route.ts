import { StreamingTextResponse, type Message as VercelChatMessage } from "ai"
import { anthropic } from "@ai-sdk/anthropic"
import { openai } from "@ai-sdk/openai"

// Types
interface RequestBody {
  messages: VercelChatMessage[]
  context?: string
}

// Constants
const MAX_CONTEXT_LENGTH = 1000
const MAX_MESSAGE_LENGTH = 2000
const REQUEST_TIMEOUT = 30000 // 30 seconds

// Helper function to get the selected model
function getSelectedModel() {
  return "anthropic" // Default to Claude for server-side
}

// Helper function to implement timeout for promises
function withTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error(`Request timed out after ${timeoutMs}ms`)), timeoutMs),
    ),
  ])
}

// Helper function to sanitize input
function sanitizeInput(input: string, maxLength: number): string {
  if (!input) return ""

  // Remove any potentially harmful characters and trim
  const sanitized = input.trim().replace(/<[^>]*>/g, "") // Remove HTML tags

  // Limit length
  return sanitized.slice(0, maxLength)
}

export async function POST(req: Request) {
  try {
    // Parse request body
    const body = await req.json()

    // Validate request body
    if (!body || !body.messages || !Array.isArray(body.messages) || body.messages.length === 0) {
      return new Response(JSON.stringify({ error: "Invalid request body" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    const { messages, context = "" } = body as RequestBody

    // Sanitize inputs
    const sanitizedContext = sanitizeInput(context, MAX_CONTEXT_LENGTH)
    const sanitizedMessages = messages.map((msg) => ({
      ...msg,
      content: sanitizeInput(msg.content, MAX_MESSAGE_LENGTH),
    }))

    // Get the selected model provider
    const selectedProvider = getSelectedModel()

    // Prepare the system message
    const systemMessage = `You are InnovateHub AI, an educational assistant specializing in artificial intelligence applications in the Philippines.
    You provide helpful, informative responses about how AI is being used in the Philippines, particularly in:
    - Agriculture and farming
    - Natural language processing for Filipino languages
    - Computer vision applications
    - Disaster response and management
    - Healthcare in rural areas
    
    Your responses should be educational, accurate, and highlight real-world applications in the Philippine context.
    Keep responses concise (2-3 paragraphs maximum) but informative.
    
    Additional context: ${sanitizedContext}`

    // Create the stream based on the selected provider
    let stream

    try {
      if (selectedProvider === "anthropic") {
        const anthropicMessages = sanitizedMessages.map(({ content, role }) => ({
          role: role === "user" ? "user" : "assistant",
          content,
        }))

        const response = await withTimeout(
          anthropic("claude-3-opus-20240229").messages.stream({
            messages: anthropicMessages,
            system: systemMessage,
            max_tokens: 1000,
          }),
          REQUEST_TIMEOUT,
        )

        stream = response.toReadableStream()
      } else {
        const openaiMessages = [
          { role: "system", content: systemMessage },
          ...sanitizedMessages.map(({ content, role }) => ({
            role: role === "user" ? "user" : "assistant",
            content,
          })),
        ]

        const response = await withTimeout(
          openai("gpt-4o").chat.completions.stream({
            messages: openaiMessages,
            max_tokens: 1000,
          }),
          REQUEST_TIMEOUT,
        )

        stream = response.toReadableStream()
      }

      // Return the streaming response
      return new StreamingTextResponse(stream)
    } catch (streamError) {
      console.error("Error creating AI stream:", streamError)

      // Provide a fallback response if streaming fails
      return new Response(
        JSON.stringify({
          error: "Unable to stream response",
          message: "I'm having trouble connecting to the AI service right now. Please try again in a moment.",
        }),
        {
          status: 503,
          headers: { "Content-Type": "application/json" },
        },
      )
    }
  } catch (error) {
    console.error("Error in chat API:", error)
    return new Response(
      JSON.stringify({
        error: "Failed to process chat request",
        message: "Something went wrong. Please try again later.",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    )
  }
}
