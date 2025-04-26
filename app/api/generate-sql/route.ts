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
    const { query } = await req.json()

    // Get the selected model provider
    const selectedProvider = getSelectedModel()

    // Prepare the system message
    const system = `You are an expert SQL developer. Your task is to convert natural language queries into correct SQL statements.
    Always provide the SQL query followed by a clear explanation of how the query works.
    Use standard SQL syntax that would work with most database systems.
    Include comments in the SQL to explain complex parts.`

    const prompt = `Convert this natural language query into SQL:
    "${query}"
    
    First provide the complete SQL query, then explain how it works line by line.
    If there's any ambiguity in the request, explain your assumptions.`

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
    console.error("Error generating SQL:", error)
    return new Response(JSON.stringify({ error: "Failed to generate SQL" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
