"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Loader2, Upload } from "lucide-react"
import { describeImageAction } from "@/app/actions/ai-actions"
import Image from "next/image"

interface Detection {
  id: number
  label: string
  confidence: number
  boundingBox: {
    x: number
    y: number
    width: number
    height: number
  }
}

export default function ComputerVisionModule() {
  const [detectionMode, setDetectionMode] = useState<string>("traffic")
  const [confidenceThreshold, setConfidenceThreshold] = useState<number>(70)
  const [isProcessing, setIsProcessing] = useState<boolean>(false)
  const [detections, setDetections] = useState<Detection[]>([])
  const [sceneDescription, setSceneDescription] = useState<string>("")
  const [tags, setTags] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)

  // Image context scenarios for AI processing
  const imageContexts = {
    traffic: "A busy Manila intersection with jeepneys, cars, and pedestrians during rush hour traffic",
    rural: "A rural Philippine village with traditional nipa huts, coconut trees, and farmers working in rice fields",
    market: "A vibrant Filipino public market (palengke) with various local produce, seafood, and vendors",
    city: "Manila skyline showing modern skyscrapers alongside historic buildings and parks",
    disaster: "Aftermath of a typhoon in the Philippines with flooding and emergency responders helping residents",
  }

  const processImage = async () => {
    setIsProcessing(true)
    setError(null)

    try {
      // Using AI to generate realistic computer vision analysis based on context
      const selectedContext = imageContexts[detectionMode as keyof typeof imageContexts]
      const result = await describeImageAction(selectedContext)

      if (result.success && result.data) {
        // Filter objects based on confidence threshold
        const filteredObjects = result.data.objects
          .filter((obj: any) => obj.confidence * 100 >= confidenceThreshold)
          .map((obj: any, idx: number) => ({
            id: idx,
            label: obj.label,
            confidence: obj.confidence,
            boundingBox: obj.boundingBox,
          }))

        setDetections(filteredObjects)
        setSceneDescription(result.data.scene || "")
        setTags(result.data.tags || [])
      } else {
        setError("Failed to analyze image. Please try again.")
        setDetections([])
        setSceneDescription("")
        setTags([])
      }
    } catch (err) {
      console.error("Error during image analysis:", err)
      setError("An unexpected error occurred")
      setDetections([])
    } finally {
      setIsProcessing(false)
    }
  }

  const getDetectionColor = (label: string) => {
    const colors: Record<string, string> = {
      person: "#ef4444",
      vehicle: "#f59e0b",
      building: "#3b82f6",
      road: "#10b981",
      jeepney: "#8b5cf6",
      bicycle: "#ec4899",
      motorcycle: "#f97316",
      tree: "#22c55e",
      sign: "#06b6d4",
      animal: "#eab308",
    }

    // Check if label contains any of the keys
    for (const key of Object.keys(colors)) {
      if (label.toLowerCase().includes(key.toLowerCase())) {
        return colors[key]
      }
    }

    return "#64748b" // default color
  }

  return (
    <div className="py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-white mb-4">Computer Vision</h1>
        <p className="text-xl text-white/80 max-w-3xl mx-auto">
          Explore how machines interpret and understand visual information from the world.
        </p>
      </motion.div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Left Column - Information */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-1"
        >
          <Card className="bg-slate-800/50 border-slate-700 h-full">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-white mb-4">Computer Vision</h2>

              <div className="space-y-4 text-white/80">
                <p>
                  Computer Vision enables machines to interpret and understand visual information from the world,
                  mimicking human visual perception.
                </p>

                <h3 className="text-lg font-semibold text-white mt-6">Key Applications:</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <span className="font-medium text-red-400">Object Detection</span>: Identifying and locating objects
                    within images.
                  </li>
                  <li>
                    <span className="font-medium text-red-400">Facial Recognition</span>: Identifying and verifying
                    people based on facial features.
                  </li>
                  <li>
                    <span className="font-medium text-red-400">Image Segmentation</span>: Dividing images into
                    meaningful segments.
                  </li>
                  <li>
                    <span className="font-medium text-red-400">Optical Character Recognition</span>: Converting images
                    of text into machine-readable text.
                  </li>
                </ul>

                <div className="mt-6 p-4 bg-red-900/30 rounded-lg border border-red-800">
                  <h4 className="font-semibold text-white">Philippine Application</h4>
                  <p className="text-sm mt-1">
                    Computer vision is being used in traffic management systems in Metro Manila to monitor congestion
                    and automatically detect traffic violations.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Right Column - Interactive Demo */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="lg:col-span-2"
        >
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-white mb-4">Computer Vision Simulator</h2>

              <Tabs defaultValue="demo" className="mb-6">
                <TabsList className="bg-slate-700">
                  <TabsTrigger value="demo">Demo</TabsTrigger>
                  <TabsTrigger value="controls">Controls</TabsTrigger>
                  <TabsTrigger value="explanation">Explanation</TabsTrigger>
                </TabsList>

                <TabsContent value="demo" className="pt-4">
                  <div className="bg-slate-900 rounded-lg p-4 h-80 relative overflow-hidden">
                    {/* Sample image with detections */}
                    <div className="relative w-full h-full">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Image
                          src={`/images/ph-cv-${detectionMode}.jpg`}
                          alt={`Philippine ${detectionMode} scene`}
                          fill
                          className="object-cover rounded"
                          onError={(e) => {
                            // Fallback if the specific image doesn't exist
                            const target = e.target as HTMLImageElement
                            target.src = "/images/ph-cv-traffic.jpg"
                          }}
                        />
                      </div>

                      {/* Detection boxes */}
                      {detections.map((detection) => (
                        <motion.div
                          key={detection.id}
                          className="absolute border-2 rounded-md"
                          style={{
                            left: `${detection.boundingBox.x}px`,
                            top: `${detection.boundingBox.y}px`,
                            width: `${detection.boundingBox.width}px`,
                            height: `${detection.boundingBox.height}px`,
                            borderColor: getDetectionColor(detection.label),
                          }}
                          initial={{ opacity: 0, scale: 1.2 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div
                            className="absolute -top-6 left-0 px-2 py-1 text-xs text-white rounded"
                            style={{ backgroundColor: getDetectionColor(detection.label) }}
                          >
                            {detection.label} ({(detection.confidence * 100).toFixed(0)}%)
                          </div>
                        </motion.div>
                      ))}

                      {/* Processing overlay */}
                      {isProcessing && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <div className="bg-slate-800/90 backdrop-blur-sm px-4 py-2 rounded-lg">
                            <div className="flex items-center space-x-2">
                              <Loader2 className="w-5 h-5 text-white animate-spin" />
                              <span className="text-white">Processing image with AI...</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-4">
                    {error && (
                      <div className="mb-4 p-3 bg-red-900/30 border border-red-800 rounded-lg text-white">{error}</div>
                    )}

                    {sceneDescription && !isProcessing && (
                      <div className="mb-4 p-3 bg-slate-800 rounded-lg">
                        <h4 className="font-semibold text-white mb-1">Scene Analysis:</h4>
                        <p className="text-white/80 text-sm">{sceneDescription}</p>

                        {tags.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-1">
                            {tags.map((tag, idx) => (
                              <span key={idx} className="bg-slate-700 text-xs text-white/70 px-2 py-0.5 rounded">
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    <div className="flex justify-center">
                      <Button onClick={processImage} disabled={isProcessing} className="bg-red-600 hover:bg-red-700">
                        {isProcessing ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          "Analyze Image"
                        )}
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="controls" className="pt-4">
                  <div className="space-y-6 p-4 bg-slate-900 rounded-lg">
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">Scene Type:</label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        <Button
                          variant={detectionMode === "traffic" ? "default" : "outline"}
                          onClick={() => setDetectionMode("traffic")}
                          className={detectionMode === "traffic" ? "bg-red-600" : ""}
                        >
                          Manila Traffic
                        </Button>
                        <Button
                          variant={detectionMode === "rural" ? "default" : "outline"}
                          onClick={() => setDetectionMode("rural")}
                          className={detectionMode === "rural" ? "bg-red-600" : ""}
                        >
                          Rural Village
                        </Button>
                        <Button
                          variant={detectionMode === "market" ? "default" : "outline"}
                          onClick={() => setDetectionMode("market")}
                          className={detectionMode === "market" ? "bg-red-600" : ""}
                        >
                          Public Market
                        </Button>
                        <Button
                          variant={detectionMode === "city" ? "default" : "outline"}
                          onClick={() => setDetectionMode("city")}
                          className={detectionMode === "city" ? "bg-red-600" : ""}
                        >
                          City Skyline
                        </Button>
                        <Button
                          variant={detectionMode === "disaster" ? "default" : "outline"}
                          onClick={() => setDetectionMode("disaster")}
                          className={detectionMode === "disaster" ? "bg-red-600" : ""}
                        >
                          Typhoon Scene
                        </Button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        Confidence Threshold: {confidenceThreshold}%
                      </label>
                      <Slider
                        value={[confidenceThreshold]}
                        min={50}
                        max={95}
                        step={5}
                        onValueChange={(value) => setConfidenceThreshold(value[0])}
                        className="py-4"
                      />
                      <p className="text-xs text-white/60 mt-1">
                        Higher threshold means fewer but more accurate detections
                      </p>
                    </div>

                    <div className="p-3 border border-dashed border-slate-600 rounded-lg">
                      <div className="flex items-center justify-center gap-2">
                        <Upload className="h-5 w-5 text-slate-400" />
                        <span className="text-slate-400 text-sm">Upload your own image (coming soon)</span>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="explanation" className="pt-4">
                  <div className="p-4 bg-slate-900 rounded-lg">
                    <h3 className="text-lg font-semibold text-white mb-2">How This Demo Works</h3>
                    <p className="text-white/80 mb-4">
                      This demonstration uses AI to simulate computer vision analysis on Philippine scenes:
                    </p>

                    <ol className="space-y-3 text-white/80 list-decimal pl-5">
                      <li>
                        <strong>Scene Selection</strong>: Choose from different Philippine contexts like Manila traffic
                        or rural villages
                      </li>
                      <li>
                        <strong>AI Analysis</strong>: The Groq LLM analyzes the context and generates realistic computer
                        vision results
                      </li>
                      <li>
                        <strong>Object Detection</strong>: The system identifies and locates objects in the scene
                      </li>
                      <li>
                        <strong>Scene Understanding</strong>: The AI also provides overall scene analysis and relevant
                        tags
                      </li>
                    </ol>

                    <div className="mt-4 p-3 bg-red-900/20 rounded">
                      <p className="text-white/90 text-sm">
                        <strong>Note:</strong> This demo uses the Groq LLM to simulate how computer vision AI would
                        analyze Philippine scenes. In a production system, specialized computer vision models like YOLO,
                        Faster R-CNN, or SSD would be used for actual image processing.
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Applications Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mb-12"
      >
        <h2 className="text-2xl font-bold text-white mb-6">Applications in the Philippines</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Traffic Management",
              description:
                "AI cameras monitor traffic flow and detect violations in Metro Manila and other urban centers.",
              icon: "🚦",
              color: "from-red-500 to-orange-700",
              image: "/images/ph-cv-traffic.jpg",
            },
            {
              title: "Agricultural Monitoring",
              description: "Drones with computer vision assess crop health and detect pests in Philippine farms.",
              icon: "🌾",
              color: "from-green-500 to-emerald-700",
              image: "/images/batangas-smart-farming.jpg",
            },
            {
              title: "Disaster Assessment",
              description: "Satellite imagery analysis to assess typhoon damage and plan recovery efforts.",
              icon: "🛰️",
              color: "from-blue-500 to-cyan-700",
              image: "/images/ph-disaster-response.jpg",
            },
          ].map((app, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
            >
              <Card className="bg-slate-800/50 border-slate-700 h-full overflow-hidden">
                <div className={`h-2 bg-gradient-to-r ${app.color}`}></div>
                <div className="relative h-40">
                  <Image src={app.image || "/placeholder.svg"} alt={app.title} fill className="object-cover" />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="text-2xl">{app.icon}</div>
                    <h3 className="text-xl font-bold text-white">{app.title}</h3>
                  </div>
                  <p className="text-white/70">{app.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Case Study */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <h2 className="text-2xl font-bold text-white mb-6">Case Study: Smart Traffic System</h2>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <div className="rounded-lg overflow-hidden relative aspect-square">
                  <Image
                    src="/images/ph-cv-traffic.jpg"
                    alt="Traffic Management System"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <h3 className="text-xl font-bold text-white mb-2">MMDA Smart Traffic Management</h3>
                <p className="text-white/80 mb-4">
                  The Metropolitan Manila Development Authority (MMDA) has implemented a computer vision system that
                  monitors traffic flow in real-time across major intersections. The system can detect vehicles,
                  estimate congestion levels, and automatically adjust traffic light timing.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div className="bg-slate-700/50 p-3 rounded">
                    <h4 className="font-semibold text-white mb-1">Impact</h4>
                    <p className="text-sm text-white/80">12-18% reduction in average commute times during peak hours</p>
                  </div>
                  <div className="bg-slate-700/50 p-3 rounded">
                    <h4 className="font-semibold text-white mb-1">Technology</h4>
                    <p className="text-sm text-white/80">
                      YOLOv5 object detection with custom traffic analysis algorithms
                    </p>
                  </div>
                </div>

                <Button variant="outline" className="mt-2">
                  Read Full Case Study
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
