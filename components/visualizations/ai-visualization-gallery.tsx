"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import NeuralNetworkFilipinoLanguage from "./neural-network-filipino-language"
import SmartAgricultureAI from "./smart-agriculture-ai"
import DisasterResponseAI from "./disaster-response-ai"
import FilipinoNLPVisualization from "./filipino-nlp-visualization"

export default function AIVisualizationGallery() {
  const [activeTab, setActiveTab] = useState("neural-network")

  return (
    <div className="w-full">
      <h2 className="text-3xl font-bold text-white mb-6 text-center">
        AI Concept Visualizations for Philippine Context
      </h2>

      <Tabs defaultValue="neural-network" value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="bg-slate-800 w-full justify-start overflow-x-auto">
          <TabsTrigger value="neural-network">Neural Networks</TabsTrigger>
          <TabsTrigger value="smart-agriculture">Smart Agriculture</TabsTrigger>
          <TabsTrigger value="disaster-response">Disaster Response</TabsTrigger>
          <TabsTrigger value="filipino-nlp">Filipino NLP</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="mb-8">
        {activeTab === "neural-network" && <NeuralNetworkFilipinoLanguage />}
        {activeTab === "smart-agriculture" && <SmartAgricultureAI />}
        {activeTab === "disaster-response" && <DisasterResponseAI />}
        {activeTab === "filipino-nlp" && <FilipinoNLPVisualization />}
      </div>

      <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
        <h3 className="text-xl font-bold text-white mb-4">How to Use These Visualizations</h3>
        <p className="text-white/80 mb-4">
          These interactive visualizations are designed to explain complex AI concepts within a Philippine context. They
          can be integrated into your presentation or video to help students understand how AI technologies are being
          applied to solve local challenges.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <h4 className="font-semibold text-white">Integration Tips:</h4>
            <ul className="space-y-1 text-sm text-white/80">
              <li className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 mr-2"></div>
                <span>Use these visualizations as interactive elements in your presentation</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 mr-2"></div>
                <span>Record screen captures for inclusion in video content</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 mr-2"></div>
                <span>Customize colors and content to match your specific needs</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 mr-2"></div>
                <span>Add voice-over explanations to enhance understanding</span>
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold text-white">Customization Options:</h4>
            <ul className="space-y-1 text-sm text-white/80">
              <li className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5 mr-2"></div>
                <span>Modify examples to focus on specific regions in the Philippines</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5 mr-2"></div>
                <span>Add Batangas State University branding elements</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5 mr-2"></div>
                <span>Include additional Filipino language examples</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5 mr-2"></div>
                <span>Adjust animation speeds for different presentation formats</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
