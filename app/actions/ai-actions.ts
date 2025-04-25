"use server"

import {
  analyzeText,
  describeImage,
  explainPrediction,
  getAgricultureRecommendation,
  generateAIResponse,
} from "@/utils/ai-utils"

export async function analyzeTextAction(text: string, analysisType: string) {
  return analyzeText(text, analysisType)
}

export async function describeImageAction(imageContext: string) {
  return describeImage(imageContext)
}

export async function explainPredictionAction(algorithm: string, dataPoints: any) {
  return explainPrediction(algorithm, dataPoints)
}

export async function getAgricultureRecommendationAction(cropType: string, region: string, soilType: string) {
  return getAgricultureRecommendation(cropType, region, soilType)
}

export async function generateAIResponseAction(prompt: string, system?: string) {
  return generateAIResponse(prompt, system)
}
