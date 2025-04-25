import { groq } from "@ai-sdk/groq"
import { generateText } from "ai"

// Groq client configuration
export const groqLlama3 = groq("llama3-70b-8192")
export const groqMixtral = groq("mixtral-8x7b-32768")

// Text generation with streaming capability
export async function generateAIResponse(prompt: string, system?: string) {
  try {
    const response = await generateText({
      model: groqLlama3,
      prompt,
      system,
      maxTokens: 1000,
    })

    return { text: response.text, success: true }
  } catch (error) {
    console.error("Error generating AI response:", error)
    return {
      text: "Sorry, there was an error processing your request. Please try again later.",
      success: false,
    }
  }
}

// Language analysis using LLM
export async function analyzeText(text: string, analysisType: string) {
  const system = `You are an expert linguistic analyst specializing in Philippine languages including Tagalog, Cebuano, and other Filipino dialects. 
  Analyze the provided text and provide detailed ${analysisType} in JSON format only.`

  const prompt = `Analyze the following text: "${text}". 
  ${
    analysisType === "part-of-speech"
      ? "Return a JSON array where each object has 'word', 'type' (noun, verb, adjective, etc.), and 'confidence' (0.0-1.0) properties."
      : analysisType === "sentiment"
        ? "Return a JSON object with 'sentiment' (positive, negative, neutral), 'score' (0.0-1.0), and 'explanation' properties."
        : "Return a detailed analysis as JSON."
  }
  IMPORTANT: Respond ONLY with the JSON data and nothing else.`

  try {
    const response = await generateText({
      model: groqLlama3,
      prompt,
      system,
      maxTokens: 1000,
    })

    try {
      // Parse the JSON response
      return { data: JSON.parse(response.text), success: true }
    } catch (jsonError) {
      console.error("Error parsing JSON from AI response:", jsonError)
      console.log("Raw response:", response.text)
      return {
        data: null,
        success: false,
        error: "Failed to parse AI response",
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
  const system = `You are a computer vision AI expert. Provide detailed analysis of images in JSON format.`

  const prompt = `Based on this context: "${imageContext}", generate a detailed computer vision analysis.
  Return a JSON object with:
  1. "objects": array of detected objects, each with "label", "confidence", "boundingBox" properties
  2. "scene": overall scene description
  3. "tags": array of relevant tags
  IMPORTANT: Respond ONLY with the JSON data and nothing else.`

  try {
    const response = await generateText({
      model: groqLlama3,
      prompt,
      system,
      maxTokens: 1000,
    })

    try {
      // Parse the JSON response
      return { data: JSON.parse(response.text), success: true }
    } catch (jsonError) {
      console.error("Error parsing JSON from AI response:", jsonError)
      console.log("Raw response:", response.text)
      return {
        data: null,
        success: false,
        error: "Failed to parse AI response",
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
  const system = `You are an expert data scientist specializing in machine learning algorithms.`

  const prompt = `Based on the ${algorithm} algorithm and these data points: ${JSON.stringify(dataPoints)},
  explain how the algorithm would process this data and make predictions.
  Provide your explanation in JSON format with:
  1. "steps": array of steps the algorithm follows
  2. "insights": key insights from the data
  3. "prediction": simulated prediction results
  IMPORTANT: Respond ONLY with the JSON data and nothing else.`

  try {
    const response = await generateText({
      model: groqLlama3,
      prompt,
      system,
      maxTokens: 1000,
    })

    try {
      // Parse the JSON response
      return { data: JSON.parse(response.text), success: true }
    } catch (jsonError) {
      console.error("Error parsing JSON from AI response:", jsonError)
      console.log("Raw response:", response.text)
      return {
        data: null,
        success: false,
        error: "Failed to parse AI response",
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
    const response = await generateText({
      model: groqLlama3,
      prompt,
      system,
      maxTokens: 1000,
    })

    try {
      // Parse the JSON response
      return { data: JSON.parse(response.text), success: true }
    } catch (jsonError) {
      console.error("Error parsing JSON from AI response:", jsonError)
      console.log("Raw response:", response.text)
      return {
        data: null,
        success: false,
        error: "Failed to parse AI response",
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
