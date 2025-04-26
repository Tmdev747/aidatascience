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
    const { data } = await req.json()

    // Get the selected model provider
    const selectedProvider = getSelectedModel()

    // Prepare the system message
    const system = `You are an expert data scientist specializing in data analysis and visualization.
    Your task is to analyze the provided dataset and provide insights.
    Focus on patterns, trends, outliers, and correlations in the data.
    Suggest appropriate visualizations for the data.
    If the data is related to the Philippines, provide context-specific insights.`

    const prompt = `Analyze this dataset:
    
    ${data}
    
    Provide a comprehensive analysis including:
    1. Summary of the dataset structure and content
    2. Key statistics and insights
    3. Patterns, trends, and outliers
    4. Correlations between variables
    5. Recommendations for further analysis
    6. Suggested visualizations
    
    Format your response in a clear, structured way with headings and bullet points where appropriate.`

    // Create the stream based on the selected provider
    let stream

    if (selectedProvider === "anthropic") {
      const response = await anthropic("claude-3-opus-20240229").messages.stream({
        messages: [{ role: "user", content: prompt }],
        system,
        max_tokens: 2000,
      })

      stream = response.toReadableStream()
    } else {
      const response = await openai("gpt-4o").chat.completions.stream({
        messages: [
          { role: "system", content: system },
          { role: "user", content: prompt },
        ],
        max_tokens: 2000,
      })

      stream = response.toReadableStream()
    }

    // Return the streaming response
    return new StreamingTextResponse(stream)
  } catch (error) {
    console.error("Error analyzing data:", error)
    return new Response(JSON.stringify({ error: "Failed to analyze data" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
