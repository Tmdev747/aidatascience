"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Upload } from "lucide-react"
import AIChatInterface from "@/components/ai-chat-interface"
import Image from "next/image"

export default function InteractiveComputerVision() {
  const [activeTab, setActiveTab] = useState("demo")
  const [sceneType, setSceneType] = useState("traffic")
  const [analysisType, setAnalysisType] = useState("object-detection")
  const [imageDescription, setImageDescription] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<string>("")
  const [error, setError] = useState<string | null>(null)

  // Predefined scene descriptions
  const sceneDescriptions = {
    traffic:
      "A busy Manila intersection with jeepneys, cars, motorcycles, and pedestrians during rush hour traffic. Traffic lights are visible, and there are some street vendors on the sidewalk.",
    rural:
      "A rural Philippine village with traditional nipa huts, coconut trees, and farmers working in rice fields. There are carabaos (water buffalos) helping with farming, and children playing near a small stream.",
    market:
      "A vibrant Filipino public market (palengke) with various local produce, seafood, and vendors. The market is crowded with shoppers, and there are stalls selling fruits, vegetables, fish, and meat.",
    city: "Manila skyline showing modern skyscrapers alongside historic buildings and parks. There are people walking on the streets, cars on the roads, and the Manila Bay is visible in the background.",
    disaster:
      "Aftermath of a typhoon in the Philippines with flooding and emergency responders helping residents. There are damaged houses, fallen trees, and people being evacuated by rescue teams.",
  }

  // Analysis types
  const analysisTypes = [
    { value: "object-detection", label: "Object Detection" },
    { value: "scene-understanding", label: "Scene Understanding" },
    { value: "activity-recognition", label: "Activity Recognition" },
    { value: "safety-analysis", label: "Safety Analysis" },
  ]

  const handleSceneSelect = (scene: string) => {
    setSceneType(scene)
    setImageDescription(sceneDescriptions[scene as keyof typeof sceneDescriptions])
  }

  const analyzeImage = async () => {
    if (!imageDescription.trim()) return

    setIsAnalyzing(true)
    setError(null)
    setAnalysisResult("")

    try {
      const response = await fetch("/api/analyze-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageDescription,
          analysisType,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to analyze image")
      }

      const reader = response.body?.getReader()
      if (!reader) {
        throw new Error("Response body is not readable")
      }

      const decoder = new TextDecoder()
      let done = false

      while (!done) {
        const { value, done: doneReading } = await reader.read()
        done = doneReading
        if (value) {
          const chunkValue = decoder.decode(value)
          setAnalysisResult((prev) => prev + chunkValue)
        }
      }
    } catch (err) {
      console.error("Error analyzing image:", err)
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardContent className="p-6">
        <h2 className="text-xl font-bold text-white mb-4">Interactive Computer Vision</h2>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="bg-slate-700">
            <TabsTrigger value="demo">Image Analysis</TabsTrigger>
            <TabsTrigger value="chat">CV Expert Chat</TabsTrigger>
          </TabsList>

          <TabsContent value="demo" className="pt-4">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Select Scene Type:</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    <Button
                      variant={sceneType === "traffic" ? "default" : "outline"}
                      onClick={() => handleSceneSelect("traffic")}
                      className={sceneType === "traffic" ? "bg-red-600" : ""}
                      size="sm"
                    >
                      Manila Traffic
                    </Button>
                    <Button
                      variant={sceneType === "rural" ? "default" : "outline"}
                      onClick={() => handleSceneSelect("rural")}
                      className={sceneType === "rural" ? "bg-red-600" : ""}
                      size="sm"
                    >
                      Rural Village
                    </Button>
                    <Button
                      variant={sceneType === "market" ? "default" : "outline"}
                      onClick={() => handleSceneSelect("market")}
                      className={sceneType === "market" ? "bg-red-600" : ""}
                      size="sm"
                    >
                      Public Market
                    </Button>
                    <Button
                      variant={sceneType === "city" ? "default" : "outline"}
                      onClick={() => handleSceneSelect("city")}
                      className={sceneType === "city" ? "bg-red-600" : ""}
                      size="sm"
                    >
                      City Skyline
                    </Button>
                    <Button
                      variant={sceneType === "disaster" ? "default" : "outline"}
                      onClick={() => handleSceneSelect("disaster")}
                      className={sceneType === "disaster" ? "bg-red-600" : ""}
                      size="sm"
                    >
                      Typhoon Scene
                    </Button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">Analysis Type:</label>
                  <Select value={analysisType} onValueChange={setAnalysisType}>
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                      <SelectValue placeholder="Select analysis type" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      {analysisTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value} className="text-white">
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Image Description (or upload your own image):
                </label>
                <Textarea
                  value={imageDescription}
                  onChange={(e) => setImageDescription(e.target.value)}
                  placeholder="Describe the image you want to analyze..."
                  className="bg-slate-700 border-slate-600 text-white h-32"
                />
              </div>

              <div className="flex justify-between items-center">
                <Button
                  variant="outline"
                  className="flex items-center gap-2"
                  disabled={true} // Disabled for now as upload functionality would require backend storage
                >
                  <Upload className="h-4 w-4" />
                  Upload Image (Coming Soon)
                </Button>

                <Button
                  onClick={analyzeImage}
                  disabled={isAnalyzing || !imageDescription.trim()}
                  className="bg-red-600 hover:bg-red-700"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    "Analyze Image"
                  )}
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Image Preview</h3>
                  <div className="relative h-[200px] rounded-lg overflow-hidden bg-slate-700/50">
                    <Image
                      src={`/images/ph-cv-${sceneType}.png`}
                      alt={`Philippine ${sceneType} scene`}
                      fill
                      className="object-cover"
                      onError={(e) => {
                        // Fallback if the specific image doesn't exist
                        const target = e.target as HTMLImageElement
                        target.src = "/images/ph-cv-traffic.png"
                      }}
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Analysis Results</h3>
                  <div className="bg-slate-700/50 rounded-lg p-4 h-[200px] overflow-y-auto">
                    {isAnalyzing ? (
                      <div className="flex items-center justify-center h-full">
                        <Loader2 className="h-8 w-8 animate-spin text-red-500" />
                      </div>
                    ) : error ? (
                      <div className="text-red-400">{error}</div>
                    ) : analysisResult ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="text-white/90 text-sm"
                      >
                        {analysisResult}
                      </motion.div>
                    ) : (
                      <div className="text-slate-400 text-center flex items-center justify-center h-full">
                        Select a scene and click "Analyze Image" to see results
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-slate-700/50 p-4 rounded-lg">
                <h4 className="font-semibold text-white mb-2">How It Works</h4>
                <p className="text-sm text-white/80">
                  This demo uses AI to analyze images and provide detailed computer vision analysis. In a real-world
                  application, computer vision models would process actual images to detect objects, understand scenes,
                  recognize activities, and perform safety analysis. These technologies are being used in the
                  Philippines for traffic management, disaster response, agricultural monitoring, and urban planning.
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="chat" className="pt-4">
            <AIChatInterface
              title="Computer Vision Expert"
              placeholder="Ask about computer vision applications in the Philippines..."
              context="The user is learning about computer vision applications in the Philippines and wants to understand how these technologies work and are being applied."
              initialMessage={`Hello! I'm your Computer Vision AI expert. I can explain how computer vision technologies work and 
              how they're being applied in the Philippines for traffic management, disaster response, agriculture, healthcare, and more. 
              What would you like to know about computer vision?`}
            />

            <div className="mt-4 p-3 bg-slate-700/50 rounded-lg">
              <h4 className="font-semibold text-white mb-1">Suggested Questions</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="justify-start text-left h-auto py-1 text-xs"
                  onClick={() => document.getElementById("chat-input")?.focus()}
                >
                  How does object detection work in traffic management systems?
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="justify-start text-left h-auto py-1 text-xs"
                  onClick={() => document.getElementById("chat-input")?.focus()}
                >
                  What computer vision technologies are used in Philippine agriculture?
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="justify-start text-left h-auto py-1 text-xs"
                  onClick={() => document.getElementById("chat-input")?.focus()}
                >
                  How can computer vision help with disaster response after typhoons?
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="justify-start text-left h-auto py-1 text-xs"
                  onClick={() => document.getElementById("chat-input")?.focus()}
                >
                  Explain how facial recognition systems work and their applications.
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
