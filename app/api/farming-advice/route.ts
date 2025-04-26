import { StreamingTextResponse } from "ai"
import { anthropic } from "@ai-sdk/anthropic"
import { openai } from "@ai-sdk/openai"

// Helper function to get the selected model
function getSelectedModel() {
  return "anthropic" // Default to Claude for server-side
}

export async function POST(req: Request) {
  try {
    // Parse request body
    const { crop, region, problem } = await req.json()

    // Get the selected model provider
    const selectedProvider = getSelectedModel()

    // Prepare the system message
    const system = `You are an agricultural AI assistant with expertise in Philippine farming conditions, crops, and agricultural practices.
    Provide detailed, practical advice for farmers in the Philippines.`

    const prompt = `A farmer in ${region}, Philippines growing ${crop} has the following issue:
    "${problem}"
    
    Provide detailed, practical advice addressing:
    1. Potential causes of the problem
    2. Immediate actions to take
    3. Long-term solutions
    4. Sustainable and traditional Philippine farming practices that might help
    5. Modern techniques that could be applied
    
    Your advice should be practical for a Filipino farmer, considering local conditions, available resources, and cultural context.`

    // Create the stream based on the selected provider
    let stream

    if (selectedProvider === "anthropic") {
      const response = await anthropic("claude-3-opus-20240229").messages.stream({
        messages: [{ role: "user", content: prompt }],
        system,
        max_tokens: 1000,
      })

      stream = response.toReadableStream()
    } else {
      const response = await openai("gpt-4o").chat.completions.stream({
        messages: [
          { role: "system", content: system },
          { role: "user", content: prompt },
        ],
        max_tokens: 1000,
      })

      stream = response.toReadableStream()
    }

    // Return the streaming response
    return new StreamingTextResponse(stream)
  } catch (error) {
    console.error("Error in farming advice API:", error)
    return new Response(JSON.stringify({ error: "Failed to process farming advice request" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
