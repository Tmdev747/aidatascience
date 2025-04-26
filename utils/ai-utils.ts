// Import the AI SDK packages directly
import { anthropic } from "@ai-sdk/anthropic"
import { openai } from "@ai-sdk/openai"

// Constants for configuration
const MAX_RETRIES = 2
const REQUEST_TIMEOUT = 30000 // 30 seconds
const DEFAULT_MAX_TOKENS = 1000

// InnovateHub AI client configuration
const anthropicClient = anthropic("claude-3-opus-20240229")
const openaiClient = openai("gpt-4o")

// Helper function to get the selected model from localStorage or default to Claude
function getSelectedModel() {
  if (typeof window !== "undefined") {
    try {
      const savedModel = localStorage.getItem("innovatehub-ai-model")
      return savedModel === "gpt4o" ? "openai" : "anthropic"
    } catch (error) {
      console.error("Error accessing localStorage:", error)
      return "anthropic" // Default if localStorage fails
    }
  }
  return "anthropic" // Default to Claude on server-side
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

// Helper function to implement retries with exponential backoff
async function withRetry<T>(fn: () => Promise<T>, maxRetries: number = MAX_RETRIES): Promise<T> {
  let lastError: Error | null = null

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error as Error

      // Don't wait on the last attempt
      if (attempt < maxRetries) {
        // Exponential backoff: 500ms, 1000ms, 2000ms, etc.
        const delay = Math.min(500 * Math.pow(2, attempt), 8000)
        await new Promise((resolve) => setTimeout(resolve, delay))
      }
    }
  }

  throw lastError || new Error("Operation failed after multiple retries")
}

// Text generation with direct API calls
export async function generateAIResponse(prompt: string, system?: string) {
  try {
    // Get the selected model provider
    const selectedProvider = typeof window !== "undefined" ? getSelectedModel() : "anthropic"

    const generateResponse = async () => {
      let response

      if (selectedProvider === "anthropic") {
        response = await withTimeout(
          anthropicClient.messages.create({
            model: "claude-3-opus-20240229",
            max_tokens: DEFAULT_MAX_TOKENS,
            messages: [{ role: "user", content: prompt }],
            system: system || undefined,
          }),
          REQUEST_TIMEOUT,
        )
      } else {
        response = await withTimeout(
          openaiClient.chat.completions.create({
            model: "gpt-4o",
            max_tokens: DEFAULT_MAX_TOKENS,
            messages: [...(system ? [{ role: "system", content: system }] : []), { role: "user", content: prompt }],
          }),
          REQUEST_TIMEOUT,
        )
      }

      // Extract text from response based on provider
      const responseText =
        selectedProvider === "anthropic" ? response.content[0].text : response.choices[0].message.content

      return { text: responseText, success: true }
    }

    return await withRetry(generateResponse)
  } catch (error) {
    console.error("Error generating AI response:", error)
    return {
      text: "Sorry, there was an error processing your request. Please try again later.",
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}

// Stream AI responses for interactive experiences
export async function streamAIResponse(prompt: string, system?: string) {
  try {
    // Get the selected model
    const selectedProvider = typeof window !== "undefined" ? getSelectedModel() : "anthropic"

    const streamResponse = async () => {
      if (selectedProvider === "anthropic") {
        return await anthropicClient.messages.stream({
          model: "claude-3-opus-20240229",
          max_tokens: DEFAULT_MAX_TOKENS,
          messages: [{ role: "user", content: prompt }],
          system: system || undefined,
        })
      } else {
        return await openaiClient.chat.completions.stream({
          model: "gpt-4o",
          max_tokens: DEFAULT_MAX_TOKENS,
          messages: [...(system ? [{ role: "system", content: system }] : []), { role: "user", content: prompt }],
        })
      }
    }

    return await withRetry(streamResponse)
  } catch (error) {
    console.error("Error streaming AI response:", error)
    throw error
  }
}

// Language analysis using LLM
export async function analyzeText(text: string, analysisType: string) {
  // Input validation
  if (!text || text.trim().length === 0) {
    return {
      data: null,
      success: false,
      error: "Text input is required",
    }
  }

  // Sanitize input
  const sanitizedText = text.trim().slice(0, 5000) // Limit text length
  const sanitizedAnalysisType = analysisType || "general"

  const system = `You are an expert linguistic analyst specializing in Philippine languages including Tagalog, Cebuano, and other Filipino dialects. 
  Analyze the provided text and provide detailed ${sanitizedAnalysisType} in JSON format only.`

  const prompt = `Analyze the following text: "${sanitizedText}". 
  ${
    sanitizedAnalysisType === "part-of-speech"
      ? "Return a JSON array where each object has 'word', 'type' (noun, verb, adjective, etc.), and 'confidence' (0.0-1.0) properties."
      : sanitizedAnalysisType === "sentiment"
        ? "Return a JSON object with 'sentiment' (positive, negative, neutral), 'score' (0.0-1.0), and 'explanation' properties."
        : "Return a detailed analysis as JSON."
  }
  IMPORTANT: Respond ONLY with the JSON data and nothing else.`

  try {
    const result = await generateAIResponse(prompt, system)

    if (result.success) {
      try {
        // Parse the JSON response
        return { data: JSON.parse(result.text), success: true }
      } catch (jsonError) {
        console.error("Error parsing JSON from AI response:", jsonError)
        console.log("Raw response:", result.text)
        return {
          data: null,
          success: false,
          error: "Failed to parse AI response",
        }
      }
    } else {
      return {
        data: null,
        success: false,
        error: result.text,
      }
    }
  } catch (error) {
    console.error("Error analyzing text:", error)
    return {
      data: null,
      success: false,
      error: "AI service unavailable",
    }
  }
}

// Image description for computer vision simulation
export async function describeImage(imageContext: string) {
  // Input validation
  if (!imageContext || imageContext.trim().length === 0) {
    return {
      data: null,
      success: false,
      error: "Image context is required",
    }
  }

  // Sanitize input
  const sanitizedContext = imageContext.trim().slice(0, 2000) // Limit context length

  const system = `You are a computer vision AI expert. Provide detailed analysis of images in JSON format.`

  const prompt = `Based on this context: "${sanitizedContext}", generate a detailed computer vision analysis.
  Return a JSON object with:
  1. "objects": array of detected objects, each with "label", "confidence", "boundingBox" properties
  2. "scene": overall scene description
  3. "tags": array of relevant tags
  IMPORTANT: Respond ONLY with the JSON data and nothing else.`

  try {
    const result = await generateAIResponse(prompt, system)

    if (result.success) {
      try {
        // Parse the JSON response
        return { data: JSON.parse(result.text), success: true }
      } catch (jsonError) {
        console.error("Error parsing JSON from AI response:", jsonError)
        console.log("Raw response:", result.text)
        return {
          data: null,
          success: false,
          error: "Failed to parse AI response",
        }
      }
    } else {
      return {
        data: null,
        success: false,
        error: result.text,
      }
    }
  } catch (error) {
    console.error("Error analyzing image:", error)
    return {
      data: null,
      success: false,
      error: "AI service unavailable",
    }
  }
}

// Machine learning prediction simulator with real AI explanation
export async function explainPrediction(algorithm: string, dataPoints: any) {
  // Input validation
  if (!algorithm || !dataPoints) {
    return {
      data: null,
      success: false,
      error: "Algorithm and data points are required",
    }
  }

  const system = `You are an expert data scientist specializing in machine learning algorithms.`

  const prompt = `Based on the ${algorithm} algorithm and these data points: ${JSON.stringify(dataPoints)},
  explain how the algorithm would process this data and make predictions.
  Provide your explanation in JSON format with:
  1. "steps": array of steps the algorithm follows
  2. "insights": key insights from the data
  3. "prediction": simulated prediction results
  IMPORTANT: Respond ONLY with the JSON data and nothing else.`

  try {
    const result = await generateAIResponse(prompt, system)

    if (result.success) {
      try {
        // Parse the JSON response
        return { data: JSON.parse(result.text), success: true }
      } catch (jsonError) {
        console.error("Error parsing JSON from AI response:", jsonError)
        console.log("Raw response:", result.text)
        return {
          data: null,
          success: false,
          error: "Failed to parse AI response",
        }
      }
    } else {
      return {
        data: null,
        success: false,
        error: result.text,
      }
    }
  } catch (error) {
    console.error("Error explaining prediction:", error)
    return {
      data: null,
      success: false,
      error: "AI service unavailable",
    }
  }
}

// Agricultural recommendation system for Philippine farming
export async function getAgricultureRecommendation(cropType: string, region: string, soilType: string) {
  // Input validation
  if (!cropType || !region || !soilType) {
    return {
      data: null,
      success: false,
      error: "Crop type, region, and soil type are required",
    }
  }

  const system = `You are an agricultural AI assistant with expertise in Philippine farming conditions, crops, and agricultural practices.`

  const prompt = `Provide farming recommendations for:
  - Crop: ${cropType}
  - Region: ${region}, Philippines
  - Soil type: ${soilType}
  
  Return a JSON object with:
  1. "plantingSchedule": best planting time windows
  2. "wateringRecommendations": detailed watering guidance
  3. "fertilizers": recommended fertilizers for this crop and soil
  4. "pestManagement": sustainable pest management approaches
  5. "harvestTiming": indicators for optimal harvest
  6. "localConsiderations": specific considerations for this Philippine region
  
  IMPORTANT: Respond ONLY with the JSON data and nothing else.`

  try {
    const result = await generateAIResponse(prompt, system)

    if (result.success) {
      try {
        // Parse the JSON response
        return { data: JSON.parse(result.text), success: true }
      } catch (jsonError) {
        console.error("Error parsing JSON from AI response:", jsonError)
        console.log("Raw response:", result.text)
        return {
          data: null,
          success: false,
          error: "Failed to parse AI response",
        }
      }
    } else {
      return {
        data: null,
        success: false,
        error: result.text,
      }
    }
  } catch (error) {
    console.error("Error getting agriculture recommendations:", error)
    return {
      data: null,
      success: false,
      error: "AI service unavailable",
    }
  }
}

// New function for interactive AI chat about Philippine AI applications
export async function chatWithAI(message: string, context: string) {
  // Input validation
  if (!message || message.trim().length === 0) {
    throw new Error("Message is required")
  }

  // Sanitize input
  const sanitizedMessage = message.trim().slice(0, 2000) // Limit message length
  const sanitizedContext = context ? context.trim().slice(0, 1000) : "" // Limit context length

  const system = `You are InnovateHub AI, an educational assistant specializing in artificial intelligence applications in the Philippines.
  You provide helpful, informative responses about how AI is being used in the Philippines, particularly in:
  - Agriculture and farming
  - Natural language processing for Filipino languages
  - Computer vision applications
  - Disaster response and management
  - Healthcare in rural areas
  
  Your responses should be educational, accurate, and highlight real-world applications in the Philippine context.
  Keep responses concise (2-3 paragraphs maximum) but informative.
  
  Additional context: ${sanitizedContext}`

  try {
    return streamAIResponse(sanitizedMessage, system)
  } catch (error) {
    console.error("Error in AI chat:", error)
    throw error
  }
}

// New function for image analysis with detailed explanation
export async function analyzeImageWithAI(imageDescription: string, analysisType: string) {
  // Input validation
  if (!imageDescription || imageDescription.trim().length === 0) {
    throw new Error("Image description is required")
  }

  // Sanitize input
  const sanitizedDescription = imageDescription.trim().slice(0, 2000) // Limit description length
  const sanitizedAnalysisType = analysisType || "general"

  const system = `You are a computer vision expert explaining how AI analyzes images in the Philippine context.
  Provide detailed but educational explanations about how computer vision would process the described image.`

  const prompt = `Analyze this image description: "${sanitizedDescription}"
  
  Provide a detailed ${sanitizedAnalysisType} analysis as if you were a computer vision system processing this image.
  Explain what features you would identify, how you would classify objects, and what conclusions you would draw.
  
  Focus on educational aspects - help the user understand how computer vision AI works with this specific example.
  Include references to how this type of analysis is being used in the Philippines when relevant.`

  try {
    return streamAIResponse(prompt, system)
  } catch (error) {
    console.error("Error in image analysis:", error)
    throw error
  }
}

// New function for agricultural advice with AI
export async function getDetailedFarmingAdvice(crop: string, region: string, problem: string) {
  // Input validation
  if (!crop || !region || !problem) {
    throw new Error("Crop, region, and problem are required")
  }

  // Sanitize input
  const sanitizedCrop = crop.trim()
  const sanitizedRegion = region.trim()
  const sanitizedProblem = problem.trim().slice(0, 1000) // Limit problem length

  const system = `You are an agricultural AI assistant with expertise in Philippine farming conditions, crops, and agricultural practices.
  Provide detailed, practical advice for farmers in the Philippines.`

  const prompt = `A farmer in ${sanitizedRegion}, Philippines growing ${sanitizedCrop} has the following issue:
  "${sanitizedProblem}"
  
  Provide detailed, practical advice addressing:
  1. Potential causes of the problem
  2. Immediate actions to take
  3. Long-term solutions
  4. Sustainable and traditional Philippine farming practices that might help
  5. Modern techniques that could be applied
  
  Your advice should be practical for a Filipino farmer, considering local conditions, available resources, and cultural context.`

  try {
    return streamAIResponse(prompt, system)
  } catch (error) {
    console.error("Error getting farming advice:", error)
    throw error
  }
}

// New function for Filipino language learning with AI
export async function learnFilipinoWithAI(phrase: string, request: string) {
  // Input validation
  if (!phrase || phrase.trim().length === 0) {
    throw new Error("Phrase is required")
  }

  // Sanitize input
  const sanitizedPhrase = phrase.trim().slice(0, 500) // Limit phrase length
  const sanitizedRequest = request ? request.trim().slice(0, 1000) : "Explain this phrase" // Limit request length

  const system = `You are a Filipino language expert helping people learn Tagalog and other Philippine languages.
  Provide helpful, educational responses about Filipino languages.`

  const prompt = `Regarding this Filipino phrase or word: "${sanitizedPhrase}"
  
  ${sanitizedRequest}
  
  Include information about:
  - Proper pronunciation (written phonetically)
  - Cultural context and usage
  - Regional variations if relevant
  - Example sentences showing proper usage
  
  Make your response educational and helpful for someone learning Filipino languages.`

  try {
    return streamAIResponse(prompt, system)
  } catch (error) {
    console.error("Error in Filipino language learning:", error)
    throw error
  }
}

// New function for disaster response scenarios with AI
export async function simulateDisasterResponse(scenario: string, location: string) {
  // Input validation
  if (!scenario || !location) {
    throw new Error("Scenario and location are required")
  }

  // Sanitize input
  const sanitizedScenario = scenario.trim().slice(0, 1000) // Limit scenario length
  const sanitizedLocation = location.trim()

  const system = `You are a disaster management expert explaining how AI is used in Philippine disaster response.
  Provide educational explanations about how AI systems help in disaster scenarios.`

  const prompt = `Scenario: ${sanitizedScenario} in ${sanitizedLocation}, Philippines
  
  Explain how AI systems would help in this disaster scenario, including:
  1. How AI would analyze the situation
  2. What data sources would be used
  3. What recommendations the AI would make
  4. How this would help emergency responders
  
  Focus on realistic applications currently being developed or used in the Philippines.
  Make your response educational and informative about the role of AI in disaster management.`

  try {
    return streamAIResponse(prompt, system)
  } catch (error) {
    console.error("Error in disaster response simulation:", error)
    throw error
  }
}

// Helper function to check if AI services are available
export async function checkAIServicesAvailability(): Promise<boolean> {
  try {
    // Simple prompt to test if the AI service is responding
    const result = await generateAIResponse("Hello", "Respond with 'OK' if you can receive this message.")
    return result.success && result.text.includes("OK")
  } catch (error) {
    console.error("AI services availability check failed:", error)
    return false
  }
}

// Helper function to sanitize user input
export function sanitizeInput(input: string, maxLength = 1000): string {
  if (!input) return ""

  // Remove any potentially harmful characters and trim
  const sanitized = input.trim().replace(/<[^>]*>/g, "") // Remove HTML tags

  // Limit length
  return sanitized.slice(0, maxLength)
}
