"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import SmartFarmingDemo from "@/components/smart-farming-demo"
import NeuralNetworkFilipinoLanguage from "@/components/visualizations/neural-network-filipino-language"
import FilipinoNLPVisualization from "@/components/visualizations/filipino-nlp-visualization"
import DisasterResponseAI from "@/components/visualizations/disaster-response-ai"
import SmartAgricultureAI from "@/components/visualizations/smart-agriculture-ai"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Maximize2, Minimize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Define all the available demos
const demos = [
  {
    id: "smart-farming",
    name: "Smart Farming AI",
    description: "Get AI-powered recommendations for Philippine farming based on crop, region, and soil conditions.",
    component: <SmartFarmingDemo />,
    color: "from-green-500 to-emerald-600",
    icon: "🌾",
    category: "agriculture",
    previewImage: "/images/batangas-smart-farming.png",
  },
  {
    id: "neural-network",
    name: "Neural Network Visualization",
    description: "Visualize how neural networks process Filipino language data.",
    component: <NeuralNetworkFilipinoLanguage />,
    color: "from-blue-500 to-indigo-600",
    icon: "🧠",
    category: "visualization",
    previewImage: "/images/ph-neural-networks.png",
  },
  {
    id: "nlp",
    name: "Filipino NLP Analysis",
    description: "Analyze sentiment and intent in Filipino text using natural language processing.",
    component: <FilipinoNLPVisualization />,
    color: "from-purple-500 to-pink-600",
    icon: "💬",
    category: "language",
    previewImage: "/images/filipino-sentiment-analysis.png",
  },
  {
    id: "disaster-response",
    name: "Disaster Response AI",
    description: "See how AI helps with typhoon disaster response in the Philippines.",
    component: <DisasterResponseAI />,
    color: "from-red-500 to-orange-600",
    icon: "🌪️",
    category: "emergency",
    previewImage: "/images/ph-disaster-response.png",
  },
  {
    id: "agriculture-ai",
    name: "Agriculture AI Visualization",
    description: "Visualize how AI is transforming Philippine agriculture with smart farming technology.",
    component: <SmartAgricultureAI />,
    color: "from-amber-500 to-yellow-600",
    icon: "🚜",
    category: "agriculture",
    previewImage: "/images/ph-ml-agriculture.png",
  },
]

// Group demos by category
const categories = {
  agriculture: { name: "Agriculture", icon: "🌱" },
  visualization: { name: "Visualizations", icon: "📊" },
  language: { name: "Language", icon: "🗣️" },
  emergency: { name: "Emergency Response", icon: "🚨" },
}

export default function ShowcasePage() {
  const searchParams = useSearchParams()
  const [activeDemo, setActiveDemo] = useState("smart-farming")
  const [isCompact, setIsCompact] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [viewMode, setViewMode] = useState<"tabs" | "grid">("tabs")
  const [theme, setTheme] = useState<"dark" | "light" | "blue">("dark")

  // Effect to handle URL parameters and screen size
  useEffect(() => {
    // Handle demo parameter
    const demoParam = searchParams.get("demo")
    if (demoParam) {
      const validDemo = demos.find((demo) => demo.id === demoParam)
      if (validDemo) {
        setActiveDemo(demoParam)
      }
    }

    // Handle compact parameter
    setIsCompact(searchParams.get("compact") === "true")

    // Handle view mode parameter
    const viewParam = searchParams.get("view")
    if (viewParam === "grid" || viewParam === "tabs") {
      setViewMode(viewParam)
    }

    // Handle theme parameter
    const themeParam = searchParams.get("theme")
    if (themeParam === "light" || themeParam === "dark" || themeParam === "blue") {
      setTheme(themeParam)
    }

    // Handle responsive design
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [searchParams])

  // Find the current active demo
  const currentDemo = demos.find((demo) => demo.id === activeDemo) || demos[0]

  // Get theme classes
  const getThemeClasses = () => {
    switch (theme) {
      case "light":
        return "bg-gradient-to-br from-gray-100 via-gray-50 to-white text-gray-900"
      case "blue":
        return "bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white"
      case "dark":
      default:
        return "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white"
    }
  }

  const getBorderClasses = () => {
    switch (theme) {
      case "light":
        return "border-gray-300"
      case "blue":
        return "border-blue-700"
      case "dark":
      default:
        return "border-slate-700"
    }
  }

  const getCardClasses = () => {
    switch (theme) {
      case "light":
        return "bg-white border-gray-200 shadow-sm"
      case "blue":
        return "bg-blue-800/50 border-blue-700"
      case "dark":
      default:
        return "bg-slate-800/50 border-slate-700"
    }
  }

  const getTabClasses = (isActive: boolean) => {
    switch (theme) {
      case "light":
        return isActive
          ? "bg-white text-blue-600 shadow-sm"
          : "bg-transparent text-gray-600 hover:text-blue-600 hover:bg-gray-100/50"
      case "blue":
        return isActive
          ? "bg-blue-700 text-white"
          : "bg-transparent text-blue-200 hover:text-white hover:bg-blue-700/50"
      case "dark":
      default:
        return isActive
          ? "bg-slate-800 text-white"
          : "bg-transparent text-slate-400 hover:text-white hover:bg-slate-800/50"
    }
  }

  // Toggle between grid and tabs view
  const toggleViewMode = () => {
    setViewMode(viewMode === "tabs" ? "grid" : "tabs")
  }

  return (
    <div className={`min-h-screen ${getThemeClasses()} p-0`}>
      <div className="max-w-full mx-auto">
        {viewMode === "tabs" ? (
          <Tabs
            value={activeDemo}
            onValueChange={setActiveDemo}
            className="w-full"
            orientation={isMobile || isCompact ? "horizontal" : "vertical"}
          >
            <div className={`flex ${isMobile || isCompact ? "flex-col" : "flex-row h-screen"} w-full overflow-hidden`}>
              {/* Sidebar with tabs */}
              <div
                className={`${
                  isMobile || isCompact
                    ? `w-full h-auto border-b ${getBorderClasses()}`
                    : `w-64 h-full border-r ${getBorderClasses()}`
                } ${theme === "light" ? "bg-gray-50" : theme === "blue" ? "bg-blue-900" : "bg-slate-900"} shrink-0`}
              >
                <div className={`p-4 border-b ${getBorderClasses()} flex justify-between items-center`}>
                  <div>
                    <h1 className={`text-xl font-bold ${theme === "light" ? "text-gray-900" : "text-white"}`}>
                      InnovateHub AI
                    </h1>
                    <p
                      className={`text-sm ${theme === "light" ? "text-gray-600" : theme === "blue" ? "text-blue-200" : "text-slate-400"}`}
                    >
                      Philippine AI Applications
                    </p>
                  </div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={toggleViewMode}
                          className={theme === "light" ? "text-gray-600" : "text-white/70"}
                        >
                          <Maximize2 className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Switch to grid view</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                {/* Category headers and tabs */}
                <div className="p-2">
                  <TabsList
                    className={`${
                      isMobile || isCompact
                        ? "flex flex-row overflow-x-auto w-full p-2 justify-start"
                        : "flex flex-col w-full h-auto p-2 space-y-2"
                    } bg-transparent`}
                  >
                    {demos.map((demo) => (
                      <TabsTrigger
                        key={demo.id}
                        value={demo.id}
                        className={`${
                          isMobile || isCompact
                            ? "flex-shrink-0 text-sm py-1 px-3"
                            : "w-full justify-start text-left px-3 py-2"
                        } ${getTabClasses(activeDemo === demo.id)} rounded-md transition-all`}
                      >
                        <span className="mr-2">{demo.icon}</span>
                        <span className={isCompact ? "hidden sm:inline" : ""}>{demo.name}</span>
                        {!isCompact && demo.category && (
                          <Badge
                            variant="outline"
                            className={`ml-auto ${
                              theme === "light"
                                ? "bg-gray-100 text-gray-600"
                                : theme === "blue"
                                  ? "bg-blue-800 text-blue-200"
                                  : "bg-slate-800 text-slate-300"
                            } text-xs`}
                          >
                            {demo.category}
                          </Badge>
                        )}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>
              </div>

              {/* Main content area */}
              <div className="flex-1 overflow-auto">
                {demos.map((demo) => (
                  <TabsContent
                    key={demo.id}
                    value={demo.id}
                    className="p-0 m-0 h-full data-[state=active]:flex data-[state=active]:flex-col"
                  >
                    <div className={`h-2 bg-gradient-to-r ${demo.color}`}></div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <span className="text-2xl mr-2">{demo.icon}</span>
                          <h2 className={`text-xl font-bold ${theme === "light" ? "text-gray-900" : "text-white"}`}>
                            {demo.name}
                          </h2>
                        </div>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={toggleViewMode}
                                className={theme === "light" ? "text-gray-600" : "text-white/70"}
                              >
                                <Maximize2 className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Switch to grid view</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <p
                        className={`${
                          theme === "light" ? "text-gray-600" : theme === "blue" ? "text-blue-200" : "text-slate-400"
                        } mb-4`}
                      >
                        {demo.description}
                      </p>
                      <Card className={`${getCardClasses()} overflow-hidden`}>
                        <CardContent className="p-4">{demo.component}</CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                ))}
              </div>
            </div>
          </Tabs>
        ) : (
          // Grid view
          <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className={`text-2xl font-bold ${theme === "light" ? "text-gray-900" : "text-white"}`}>
                  InnovateHub AI Demos
                </h1>
                <p
                  className={`${theme === "light" ? "text-gray-600" : theme === "blue" ? "text-blue-200" : "text-slate-400"}`}
                >
                  Explore AI applications for the Philippines
                </p>
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={toggleViewMode}
                      className={theme === "light" ? "text-gray-600" : "text-white/70"}
                    >
                      <Minimize2 className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Switch to tabs view</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {demos.map((demo) => (
                <motion.div
                  key={demo.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`${getCardClasses()} border rounded-lg overflow-hidden cursor-pointer`}
                  onClick={() => {
                    setActiveDemo(demo.id)
                    setViewMode("tabs")
                  }}
                >
                  <div className={`h-2 bg-gradient-to-r ${demo.color}`}></div>
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={demo.previewImage || "/placeholder.svg"}
                      alt={demo.name}
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge
                        className={`${
                          theme === "light"
                            ? "bg-white text-gray-800"
                            : theme === "blue"
                              ? "bg-blue-700 text-white"
                              : "bg-slate-800 text-white"
                        }`}
                      >
                        {categories[demo.category as keyof typeof categories]?.name || demo.category}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center mb-2">
                      <span className="text-xl mr-2">{demo.icon}</span>
                      <h3 className={`font-bold ${theme === "light" ? "text-gray-900" : "text-white"}`}>{demo.name}</h3>
                    </div>
                    <p
                      className={`text-sm ${
                        theme === "light" ? "text-gray-600" : theme === "blue" ? "text-blue-200" : "text-slate-400"
                      } line-clamp-2`}
                    >
                      {demo.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
