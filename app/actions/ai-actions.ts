"use server"

import {
  analyzeText,
  describeImage,
  explainPrediction,
  getAgricultureRecommendation,
  generateAIResponse,
  chatWithAI,
  analyzeImageWithAI,
  getDetailedFarmingAdvice,
  learnFilipinoWithAI,
  simulateDisasterResponse,
  streamAIResponse,
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

// New interactive AI actions
export async function chatWithAIAction(message: string, context: string) {
  return chatWithAI(message, context)
}

export async function analyzeImageWithAIAction(imageDescription: string, analysisType: string) {
  return analyzeImageWithAI(imageDescription, analysisType)
}

export async function getDetailedFarmingAdviceAction(crop: string, region: string, problem: string) {
  return getDetailedFarmingAdvice(crop, region, problem)
}

export async function learnFilipinoWithAIAction(phrase: string, request: string) {
  return learnFilipinoWithAI(phrase, request)
}

export async function simulateDisasterResponseAction(scenario: string, location: string) {
  return simulateDisasterResponse(scenario, location)
}

export async function streamAIResponseAction(prompt: string, system?: string) {
  return streamAIResponse(prompt, system)
}
