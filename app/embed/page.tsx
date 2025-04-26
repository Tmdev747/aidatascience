"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import SmartFarmingDemo from "@/components/smart-farming-demo"
import NeuralNetworkFilipinoLanguage from "@/components/visualizations/neural-network-filipino-language"
import FilipinoNLPVisualization from "@/components/visualizations/filipino-nlp-visualization"
import DisasterResponseAI from "@/components/visualizations/disaster-response-ai"
import SmartAgricultureAI from "@/components/visualizations/smart-agriculture-ai"
import { useSearchParams } from "next/navigation"

export default function EmbedPage() {
  // Define all the available AI apps
  const aiApps = [
    {
      id: "smart-farming",
      name: "Smart Farming AI",
      description: "Get AI-powered recommendations for Philippine farming based on crop, region, and soil conditions.",
      component: <SmartFarmingDemo />,
      color: "from-green-500 to-emerald-600",
      icon: "🌾",
    },
    {
      id: "neural-network",
      name: "Neural Network Visualization",
      description: "Visualize how neural networks process Filipino language data.",
      component: <NeuralNetworkFilipinoLanguage />,
      color: "from-blue-500 to-indigo-600",
      icon: "🧠",
    },
    {
      id: "nlp",
      name: "Filipino NLP Analysis",
      description: "Analyze sentiment and intent in Filipino text using natural language processing.",
      component: <FilipinoNLPVisualization />,
      color: "from-purple-500 to-pink-600",
      icon: "💬",
    },
    {
      id: "disaster-response",
      name: "Disaster Response AI",
      description: "See how AI helps with typhoon disaster response in the Philippines.",
      component: <DisasterResponseAI />,
      color: "from-red-500 to-orange-600",
      icon: "🌪️",
    },
    {
      id: "agriculture-ai",
      name: "Agriculture AI Visualization",
      description: "Visualize how AI is transforming Philippine agriculture with smart farming technology.",
      component: <SmartAgricultureAI />,
      color: "from-amber-500 to-yellow-600",
      icon: "🚜",
    },
  ]

  // Get URL parameters
  const searchParams = useSearchParams()

  // Set initial state based on URL parameter or default to "smart-farming"
  const [activeApp, setActiveApp] = useState("smart-farming")

  // Effect to handle URL parameters when component mounts
  useEffect(() => {
    const demoParam = searchParams.get("demo")
    if (demoParam) {
      // Check if the requested demo exists in our aiApps array
      const validDemo = aiApps.find((app) => app.id === demoParam)
      if (validDemo) {
        setActiveApp(demoParam)
      }
    }
  }, [searchParams])

  // Find the current active app
  const currentApp = aiApps.find((app) => app.id === activeApp) || aiApps[0]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-2">
      <div className="max-w-full mx-auto">
        {/* App Selection Tabs */}
        <Tabs value={activeApp} onValueChange={setActiveApp} className="mb-3">
          <TabsList className="bg-slate-800 w-full justify-start overflow-x-auto">
            {aiApps.map((app) => (
              <TabsTrigger key={app.id} value={app.id} className="min-w-max">
                <span className="mr-2">{app.icon}</span> {app.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* App Display */}
        <motion.div key={activeApp} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <Card className="bg-slate-800/50 border-slate-700 overflow-hidden">
            <div className={`h-2 bg-gradient-to-r ${currentApp.color}`}></div>
            <CardContent className="p-3">
              <div className="mb-3">
                <div className="flex items-center mb-1">
                  <span className="text-xl mr-2">{currentApp.icon}</span>
                  <h2 className="text-lg font-bold text-white">{currentApp.name}</h2>
                </div>
                <p className="text-white/80 text-sm">{currentApp.description}</p>
              </div>

              <div className="bg-slate-900 rounded-lg p-3 overflow-hidden">{currentApp.component}</div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Footer */}
        <div className="mt-2 text-center text-white/50 text-xs">
          <p>© {new Date().getFullYear()} InnovateHub AI | BSU | Educational Use Only</p>
        </div>
      </div>
    </div>
  )
}
