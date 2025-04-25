"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2 } from "lucide-react"
import { generateAIResponseAction } from "@/app/actions/ai-actions"
import QRCode from "@/components/qr-code"

export default function NeuralNetworksModule() {
  const [networkType, setNetworkType] = useState("feedforward")
  const [activationLevel, setActivationLevel] = useState(50)
  const [isAnimating, setIsAnimating] = useState(false)
  const [layers, setLayers] = useState<{ neurons: number; active: boolean[] }[]>([])
  const [explanation, setExplanation] = useState<string>("")
  const [isLoadingExplanation, setIsLoadingExplanation] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [demoUrl, setDemoUrl] = useState("")

  // Generate neural network structure
  useEffect(() => {
    generateNetwork()
  }, [networkType])

  // Set the demo URL based on the current hostname
  useEffect(() => {
    if (typeof window !== "undefined") {
      const baseUrl = window.location.origin
      setDemoUrl(`${baseUrl}/demos/digit-recognition`)
    }
  }, [])

  const generateNetwork = () => {
    let networkLayers: { neurons: number; active: boolean[] }[] = []

    if (networkType === "feedforward") {
      networkLayers = [
        { neurons: 4, active: Array(4).fill(false) },
        { neurons: 6, active: Array(6).fill(false) },
        { neurons: 6, active: Array(6).fill(false) },
        { neurons: 4, active: Array(4).fill(false) },
      ]
    } else if (networkType === "cnn") {
      networkLayers = [
        { neurons: 4, active: Array(4).fill(false) },
        { neurons: 8, active: Array(8).fill(false) },
        { neurons: 12, active: Array(12).fill(false) },
        { neurons: 8, active: Array(8).fill(false) },
        { neurons: 4, active: Array(4).fill(false) },
      ]
    } else if (networkType === "rnn") {
      networkLayers = [
        { neurons: 4, active: Array(4).fill(false) },
        { neurons: 8, active: Array(8).fill(false) },
        { neurons: 4, active: Array(4).fill(false) },
      ]
    }

    setLayers(networkLayers)
  }

  const activateNetwork = async () => {
    setIsAnimating(true)
    setError(null)

    // Simulate signal propagation through the network
    const newLayers = [...layers]

    // Activate input layer
    newLayers[0].active = newLayers[0].active.map(() => Math.random() < activationLevel / 100)
    setLayers(newLayers)

    // Propagate through hidden layers with delays
    const propagateSignal = (layerIndex: number) => {
      if (layerIndex >= newLayers.length) {
        setTimeout(() => setIsAnimating(false), 500)
        return
      }

      setTimeout(() => {
        const updatedLayers = [...newLayers]
        updatedLayers[layerIndex].active = updatedLayers[layerIndex].active.map(
          () => Math.random() < activationLevel / 100,
        )
        setLayers(updatedLayers)
        propagateSignal(layerIndex + 1)
      }, 300)
    }

    propagateSignal(1)

    // Get AI explanation of the network behavior
    try {
      setIsLoadingExplanation(true)
      const result = await generateAIResponseAction(
        `Explain how a ${networkType} neural network processes information through its layers. 
        Focus on the activation patterns and how information flows through the network. 
        This network has ${layers.length} layers with the following neuron counts: ${layers.map((l) => l.neurons).join(", ")}.
        The activation level is set to ${activationLevel}%.
        Provide a concise, educational explanation suitable for university students.`,
        "You are an AI expert specializing in neural networks. Provide clear, accurate explanations of neural network concepts.",
      )

      if (result.success) {
        setExplanation(result.text)
      } else {
        setError("Failed to generate explanation")
      }
    } catch (err) {
      console.error("Error generating explanation:", err)
      setError("An unexpected error occurred")
    } finally {
      setIsLoadingExplanation(false)
    }
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
        <h1 className="text-4xl font-bold text-white mb-4">Neural Networks</h1>
        <p className="text-xl text-white/80 max-w-3xl mx-auto">
          Explore how neural networks mimic the human brain to solve complex problems through interconnected layers of
          neurons.
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
              <h2 className="text-2xl font-bold text-white mb-4">Neural Network Architecture</h2>

              <div className="space-y-4 text-white/80">
                <p>
                  Neural networks are computing systems inspired by the human brain's biological neural networks. They
                  form the foundation of deep learning and can solve complex pattern recognition problems.
                </p>

                <h3 className="text-lg font-semibold text-white mt-6">Key Concepts:</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <span className="font-medium text-purple-400">Neurons</span>: Basic computational units that process
                    inputs and produce outputs.
                  </li>
                  <li>
                    <span className="font-medium text-purple-400">Weights & Biases</span>: Parameters that determine the
                    strength of connections between neurons.
                  </li>
                  <li>
                    <span className="font-medium text-purple-400">Activation Functions</span>: Determine when neurons
                    "fire" based on input values.
                  </li>
                  <li>
                    <span className="font-medium text-purple-400">Backpropagation</span>: Algorithm for training
                    networks by adjusting weights based on error.
                  </li>
                </ul>

                <div className="mt-6 p-4 bg-purple-900/30 rounded-lg border border-purple-800">
                  <h4 className="font-semibold text-white">Philippine Application</h4>
                  <p className="text-sm mt-1">
                    Researchers at the University of the Philippines are using neural networks to analyze Tagalog text
                    for sentiment analysis in social media monitoring and public opinion research.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Right Column - Interactive Visualization */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="lg:col-span-2"
        >
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-white mb-4">Interactive Neural Network</h2>

              <Tabs defaultValue="visualization" className="mb-6">
                <TabsList className="bg-slate-700">
                  <TabsTrigger value="visualization">Visualization</TabsTrigger>
                  <TabsTrigger value="controls">Controls</TabsTrigger>
                  <TabsTrigger value="explanation">AI Explanation</TabsTrigger>
                </TabsList>

                <TabsContent value="visualization" className="pt-4">
                  <div className="bg-slate-900 rounded-lg p-4 h-80 relative overflow-hidden">
                    {/* SVG Neural Network Visualization */}
                    <svg width="100%" height="100%" viewBox="0 0 800 300">
                      {/* Draw connections between neurons */}
                      {layers.map((layer, layerIndex) => {
                        if (layerIndex === 0) return null

                        const prevLayer = layers[layerIndex - 1]
                        const connections = []

                        for (let i = 0; i < layer.neurons; i++) {
                          for (let j = 0; j < prevLayer.neurons; j++) {
                            const isActive = prevLayer.active[j] && layer.active[i]

                            connections.push(
                              <line
                                key={`${layerIndex}-${i}-${j}`}
                                x1={100 + (layerIndex - 1) * 150}
                                y1={50 + j * (200 / (prevLayer.neurons - 1))}
                                x2={100 + layerIndex * 150}
                                y2={50 + i * (200 / (layer.neurons - 1))}
                                stroke={isActive ? "#8b5cf6" : "#475569"}
                                strokeWidth={isActive ? 2 : 1}
                                strokeOpacity={isActive ? 0.8 : 0.3}
                              />,
                            )
                          }
                        }

                        return connections
                      })}

                      {/* Draw neurons */}
                      {layers.map((layer, layerIndex) => (
                        <g key={`layer-${layerIndex}`}>
                          {Array.from({ length: layer.neurons }).map((_, i) => (
                            <motion.circle
                              key={`neuron-${layerIndex}-${i}`}
                              cx={100 + layerIndex * 150}
                              cy={50 + i * (200 / (layer.neurons - 1))}
                              r={12}
                              fill={layer.active[i] ? "#8b5cf6" : "#1e293b"}
                              stroke={layer.active[i] ? "#a78bfa" : "#475569"}
                              strokeWidth={2}
                              initial={{ scale: 0.8 }}
                              animate={{
                                scale: layer.active[i] ? [1, 1.2, 1] : 1,
                                fillOpacity: layer.active[i] ? 1 : 0.5,
                              }}
                              transition={{ duration: 0.3 }}
                            />
                          ))}

                          {/* Layer labels */}
                          <text x={100 + layerIndex * 150} y={280} textAnchor="middle" fill="#94a3b8" fontSize="12">
                            {layerIndex === 0
                              ? "Input Layer"
                              : layerIndex === layers.length - 1
                                ? "Output Layer"
                                : `Hidden Layer ${layerIndex}`}
                          </text>
                        </g>
                      ))}

                      {/* Recurrent connections for RNN */}
                      {networkType === "rnn" && (
                        <path
                          d="M400,50 C450,0 500,0 550,50"
                          fill="none"
                          stroke="#8b5cf6"
                          strokeWidth="2"
                          strokeOpacity="0.5"
                          strokeDasharray="5,5"
                          markerEnd="url(#arrowhead)"
                        />
                      )}

                      {/* Arrow marker definition */}
                      <defs>
                        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                          <polygon points="0 0, 10 3.5, 0 7" fill="#8b5cf6" />
                        </marker>
                      </defs>
                    </svg>

                    {/* Animation overlay */}
                    {isAnimating && (
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 flex items-center justify-center">
                        <div className="bg-slate-800/80 backdrop-blur-sm px-4 py-2 rounded-full">
                          <span className="text-white">Signal propagating...</span>
                        </div>
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="controls" className="pt-4">
                  <div className="space-y-6 p-4 bg-slate-900 rounded-lg">
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">Network Architecture:</label>
                      <div className="grid grid-cols-3 gap-2">
                        <Button
                          variant={networkType === "feedforward" ? "default" : "outline"}
                          onClick={() => setNetworkType("feedforward")}
                          className={networkType === "feedforward" ? "bg-purple-600" : ""}
                        >
                          Feedforward
                        </Button>
                        <Button
                          variant={networkType === "cnn" ? "default" : "outline"}
                          onClick={() => setNetworkType("cnn")}
                          className={networkType === "cnn" ? "bg-purple-600" : ""}
                        >
                          CNN
                        </Button>
                        <Button
                          variant={networkType === "rnn" ? "default" : "outline"}
                          onClick={() => setNetworkType("rnn")}
                          className={networkType === "rnn" ? "bg-purple-600" : ""}
                        >
                          RNN
                        </Button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        Activation Level: {activationLevel}%
                      </label>
                      <Slider
                        value={[activationLevel]}
                        min={10}
                        max={90}
                        step={10}
                        onValueChange={(value) => setActivationLevel(value[0])}
                        className="py-4"
                      />
                    </div>

                    <div className="flex justify-between">
                      <Button variant="outline" onClick={generateNetwork}>
                        Reset Network
                      </Button>
                      <Button
                        onClick={activateNetwork}
                        disabled={isAnimating || isLoadingExplanation}
                        className="bg-purple-600 hover:bg-purple-700"
                      >
                        {isAnimating || isLoadingExplanation ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          "Activate Network"
                        )}
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="explanation" className="pt-4">
                  <div className="p-4 bg-slate-900 rounded-lg">
                    <h3 className="text-lg font-semibold text-white mb-2">AI-Generated Explanation</h3>

                    {isLoadingExplanation ? (
                      <div className="flex items-center justify-center py-8">
                        <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
                      </div>
                    ) : error ? (
                      <div className="bg-red-900/20 border border-red-800 rounded-md p-3 text-white">{error}</div>
                    ) : explanation ? (
                      <div className="text-white/80 space-y-2">
                        {explanation.split("\n").map((paragraph, idx) => (
                          <p key={idx}>{paragraph}</p>
                        ))}
                      </div>
                    ) : (
                      <div className="text-white/60 text-center py-8">
                        Activate the network to get an AI-generated explanation of how it works
                      </div>
                    )}

                    <div className="mt-4 p-3 bg-purple-900/20 rounded">
                      <p className="text-white/90 text-sm">
                        <strong>Note:</strong> This explanation is generated in real-time by the Groq AI API based on
                        the specific neural network architecture and settings you've selected.
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
        <h2 className="text-2xl font-bold text-white mb-6">Applications of Neural Networks</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Image Recognition",
              description: "Neural networks can identify objects, people, and scenes in images with high accuracy.",
              icon: "🖼️",
              color: "from-purple-500 to-indigo-700",
            },
            {
              title: "Natural Language Processing",
              description: "Process and understand human language, including Tagalog and other Filipino languages.",
              icon: "💬",
              color: "from-blue-500 to-cyan-700",
            },
            {
              title: "Predictive Analytics",
              description: "Forecast trends and make predictions based on historical data patterns.",
              icon: "📈",
              color: "from-pink-500 to-rose-700",
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
                <CardContent className="p-6">
                  <div className="text-4xl mb-4">{app.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-2">{app.title}</h3>
                  <p className="text-white/70">{app.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Interactive Demo */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <Card className="bg-slate-800/50 border-slate-700 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-white mb-2">Try It Yourself</h2>
              <p className="text-white/80 mb-4">
                Experience how a neural network recognizes handwritten digits. Scan the QR code to access the
                interactive demo on your mobile device.
              </p>
              <div className="space-y-4 mb-6">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                  <span className="text-white/80">Draw a digit from 0-9</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                  <span className="text-white/80">Watch the neural network process it</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                  <span className="text-white/80">See the prediction result</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 p-6 flex items-center justify-center">
              <QRCode url={demoUrl} size={180} title="Neural Network Demo" />
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}
