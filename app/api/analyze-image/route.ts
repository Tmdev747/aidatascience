import { StreamingTextResponse } from "ai"
import { anthropic } from "@ai-sdk/anthropic"
import { openai } from "@ai-sdk/openai"

// Constants
const MAX_DESCRIPTION_LENGTH = 2000
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
    if (!body || !body.imageDescription) {
      return new Response(JSON.stringify({ error: "Image description is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    const { imageDescription, analysisType = "general" } = body

    // Sanitize inputs
    const sanitizedDescription = sanitizeInput(imageDescription, MAX_DESCRIPTION_LENGTH)
    const sanitizedAnalysisType = sanitizeInput(analysisType, 100)

    // Get the selected model provider
    const selectedProvider = getSelectedModel()

    // Prepare the system message
    const system = `You are a computer vision expert explaining how AI analyzes images in the Philippine context.
    Provide detailed but educational explanations about how computer vision would process the described image.`

    const prompt = `Analyze this image description: "${sanitizedDescription}"
    
    Provide a detailed ${sanitizedAnalysisType} analysis as if you were a computer vision system processing this image.
    Explain what features you would identify, how you would classify objects, and what conclusions you would draw.
    
    Focus on educational aspects - help the user understand how computer vision AI works with this specific example.
    Include references to how this type of analysis is being used in the Philippines when relevant.`

    // Create the stream based on the selected provider
    let stream

    try {
      if (selectedProvider === "anthropic") {
        const response = await withTimeout(
          anthropic("claude-3-opus-20240229").messages.stream({
            messages: [{ role: "user", content: prompt }],
            system,
            max_tokens: 1000,
          }),
          REQUEST_TIMEOUT,
        )

        stream = response.toReadableStream()
      } else {
        const response = await withTimeout(
          openai("gpt-4o").chat.completions.stream({
            messages: [
              { role: "system", content: system },
              { role: "user", content: prompt },
            ],
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

      // Provide a fallback response
      return new Response(
        JSON.stringify({
          error: "Unable to stream response",
          message: "I'm having trouble analyzing the image right now. Please try again in a moment.",
        }),
        {
          status: 503,
          headers: { "Content-Type": "application/json" },
        },
      )
    }
  } catch (error) {
    console.error("Error in image analysis API:", error)
    return new Response(
      JSON.stringify({
        error: "Failed to process image analysis request",
        message: "Something went wrong. Please try again later.",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    )
  }
}
