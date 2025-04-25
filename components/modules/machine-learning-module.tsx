"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Play } from "lucide-react"
import Image from "next/image"

export default function MachineLearningModule() {
  const [algorithm, setAlgorithm] = useState("kmeans")
  const [complexity, setComplexity] = useState(50)
  const [dataPoints, setDataPoints] = useState<{ x: number; y: number; cluster: number }[]>([])
  const [isAnimating, setIsAnimating] = useState(false)

  // Generate random data points
  useEffect(() => {
    generateDataPoints()
  }, [complexity])

  const generateDataPoints = () => {
    const points = []
    const numPoints = Math.floor(complexity / 10) + 5

    // Generate clusters
    const clusters = [
      { x: 100 + Math.random() * 50, y: 100 + Math.random() * 50 },
      { x: 300 + Math.random() * 50, y: 150 + Math.random() * 50 },
      { x: 200 + Math.random() * 50, y: 300 + Math.random() * 50 },
    ]

    for (let i = 0; i < numPoints; i++) {
      const clusterIndex = Math.floor(Math.random() * 3)
      const cluster = clusters[clusterIndex]
      const variance = 40 - complexity / 5

      points.push({
        x: cluster.x + (Math.random() - 0.5) * variance * 2,
        y: cluster.y + (Math.random() - 0.5) * variance * 2,
        cluster: clusterIndex,
      })
    }

    setDataPoints(points)
  }

  const runAlgorithm = () => {
    setIsAnimating(true)
    setTimeout(() => setIsAnimating(false), 2000)
  }

  const getClusterColor = (cluster: number) => {
    const colors = ["#3b82f6", "#10b981", "#f59e0b"]
    return colors[cluster % colors.length]
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
        <h1 className="text-4xl font-bold text-white mb-4">Machine Learning Algorithms</h1>
        <p className="text-xl text-white/80 max-w-3xl mx-auto">
          Explore how machines learn patterns from data and make predictions using various algorithms.
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
              <h2 className="text-2xl font-bold text-white mb-4">Machine Learning Fundamentals</h2>

              <div className="space-y-4 text-white/80">
                <p>
                  Machine Learning enables computers to learn from data and make predictions without explicit
                  programming.
                </p>

                <h3 className="text-lg font-semibold text-white mt-6">Key Algorithm Types:</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <span className="font-medium text-blue-400">Supervised Learning</span>: Algorithms learn from
                    labeled training data to make predictions.
                  </li>
                  <li>
                    <span className="font-medium text-blue-400">Unsupervised Learning</span>: Algorithms find patterns
                    in unlabeled data.
                  </li>
                  <li>
                    <span className="font-medium text-blue-400">Reinforcement Learning</span>: Algorithms learn through
                    trial and error with rewards and penalties.
                  </li>
                </ul>

                <div className="mt-6 p-4 bg-blue-900/30 rounded-lg border border-blue-800">
                  <h4 className="font-semibold text-white">Philippine Application</h4>
                  <p className="text-sm mt-1">
                    Machine learning is used in predicting crop yields in Philippine agriculture, helping farmers
                    optimize planting schedules based on weather patterns in regions like Batangas.
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
              <h2 className="text-2xl font-bold text-white mb-4">Interactive Demonstration</h2>

              <Tabs defaultValue="visualization" className="mb-6">
                <TabsList className="bg-slate-700">
                  <TabsTrigger value="visualization">Visualization</TabsTrigger>
                  <TabsTrigger value="controls">Controls</TabsTrigger>
                  <TabsTrigger value="explanation">Explanation</TabsTrigger>
                </TabsList>

                <TabsContent value="visualization" className="pt-4">
                  <div className="bg-slate-900 rounded-lg p-4 h-80 relative overflow-hidden">
                    {/* SVG Visualization */}
                    <svg width="100%" height="100%" viewBox="0 0 400 400">
                      {/* Grid lines */}
                      {Array.from({ length: 10 }).map((_, i) => (
                        <line
                          key={`grid-h-${i}`}
                          x1="0"
                          y1={i * 40}
                          x2="400"
                          y2={i * 40}
                          stroke="#1e293b"
                          strokeWidth="1"
                        />
                      ))}
                      {Array.from({ length: 10 }).map((_, i) => (
                        <line
                          key={`grid-v-${i}`}
                          x1={i * 40}
                          y1="0"
                          x2={i * 40}
                          y2="400"
                          stroke="#1e293b"
                          strokeWidth="1"
                        />
                      ))}

                      {/* Data points */}
                      {dataPoints.map((point, i) => (
                        <motion.circle
                          key={i}
                          cx={point.x}
                          cy={point.y}
                          r={isAnimating ? 6 : 5}
                          fill={getClusterColor(point.cluster)}
                          opacity={isAnimating ? 0.8 : 0.6}
                          initial={{ scale: 0 }}
                          animate={{
                            scale: 1,
                            x: isAnimating ? (Math.random() - 0.5) * 20 : 0,
                            y: isAnimating ? (Math.random() - 0.5) * 20 : 0,
                          }}
                          transition={{ duration: 0.5 }}
                        />
                      ))}

                      {/* Cluster centers for K-means */}
                      {algorithm === "kmeans" && isAnimating && (
                        <>
                          <motion.circle
                            cx={150}
                            cy={120}
                            r={10}
                            fill="#3b82f6"
                            opacity={0.8}
                            stroke="#fff"
                            strokeWidth={2}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.3 }}
                          />
                          <motion.circle
                            cx={300}
                            cy={180}
                            r={10}
                            fill="#10b981"
                            opacity={0.8}
                            stroke="#fff"
                            strokeWidth={2}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                          />
                          <motion.circle
                            cx={200}
                            cy={300}
                            r={10}
                            fill="#f59e0b"
                            opacity={0.8}
                            stroke="#fff"
                            strokeWidth={2}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.3, delay: 0.2 }}
                          />
                        </>
                      )}
                    </svg>

                    {/* Animation overlay */}
                    {isAnimating && (
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 flex items-center justify-center">
                        <div className="bg-slate-800/80 backdrop-blur-sm px-4 py-2 rounded-full">
                          <span className="text-white">Processing data...</span>
                        </div>
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="controls" className="pt-4">
                  <div className="space-y-6 p-4 bg-slate-900 rounded-lg">
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">Select Algorithm:</label>
                      <div className="grid grid-cols-3 gap-2">
                        <Button
                          variant={algorithm === "kmeans" ? "default" : "outline"}
                          onClick={() => setAlgorithm("kmeans")}
                          className={algorithm === "kmeans" ? "bg-blue-600" : ""}
                        >
                          K-Means
                        </Button>
                        <Button
                          variant={algorithm === "regression" ? "default" : "outline"}
                          onClick={() => setAlgorithm("regression")}
                          className={algorithm === "regression" ? "bg-blue-600" : ""}
                        >
                          Regression
                        </Button>
                        <Button
                          variant={algorithm === "classification" ? "default" : "outline"}
                          onClick={() => setAlgorithm("classification")}
                          className={algorithm === "classification" ? "bg-blue-600" : ""}
                        >
                          Classification
                        </Button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        Data Complexity: {complexity}%
                      </label>
                      <Slider
                        value={[complexity]}
                        min={10}
                        max={100}
                        step={10}
                        onValueChange={(value) => setComplexity(value[0])}
                        className="py-4"
                      />
                    </div>

                    <div className="flex justify-between">
                      <Button variant="outline" onClick={generateDataPoints}>
                        Generate New Data
                      </Button>
                      <Button onClick={runAlgorithm} disabled={isAnimating}>
                        Run Algorithm
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="explanation" className="pt-4">
                  <div className="p-4 bg-slate-900 rounded-lg">
                    <h3 className="text-lg font-semibold text-white mb-2">How It Works</h3>
                    <p className="text-white/80 mb-4">
                      This visualization demonstrates how different machine learning algorithms organize and interpret
                      data:
                    </p>

                    <ul className="space-y-3 text-white/80">
                      <li className="flex gap-2">
                        <div className="w-4 h-4 rounded-full bg-blue-500 mt-1 flex-shrink-0"></div>
                        <div>
                          <strong>K-Means Clustering</strong>: Groups similar data points together by finding cluster
                          centers.
                        </div>
                      </li>
                      <li className="flex gap-2">
                        <div className="w-4 h-4 rounded-full bg-green-500 mt-1 flex-shrink-0"></div>
                        <div>
                          <strong>Linear Regression</strong>: Finds the best-fitting line through data points to predict
                          values.
                        </div>
                      </li>
                      <li className="flex gap-2">
                        <div className="w-4 h-4 rounded-full bg-yellow-500 mt-1 flex-shrink-0"></div>
                        <div>
                          <strong>Classification</strong>: Categorizes data points into predefined classes or
                          categories.
                        </div>
                      </li>
                    </ul>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Video Tutorial Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mb-12"
      >
        <Card className="bg-slate-800/50 border-slate-700 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="aspect-video bg-slate-900 relative">
              <div className="w-full h-full flex items-center justify-center relative">
                <Image
                  src="/images/ph-ml-agriculture.jpg"
                  alt="Machine Learning in Philippine Agriculture"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <Button size="lg" className="rounded-full w-16 h-16 bg-blue-600/90 hover:bg-blue-600">
                    <Play className="h-8 w-8" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="p-6">
              <h2 className="text-2xl font-bold text-white mb-2">Video Tutorial</h2>
              <p className="text-white/80 mb-4">
                Watch this comprehensive tutorial on machine learning algorithms and their applications in the
                Philippine context.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center text-white/80">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                  Introduction to ML concepts
                </li>
                <li className="flex items-center text-white/80">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                  Practical examples from Batangas
                </li>
                <li className="flex items-center text-white/80">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                  Step-by-step algorithm walkthrough
                </li>
              </ul>
              <Button>Watch Full Tutorial</Button>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Case Study */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <h2 className="text-2xl font-bold text-white mb-6">Philippine Case Study</h2>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <div className="rounded-lg overflow-hidden relative aspect-square">
                  <Image
                    src="/images/batangas-smart-farming.jpg"
                    alt="Rice Field in Batangas"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <h3 className="text-xl font-bold text-white mb-2">Smart Agriculture in Batangas</h3>
                <p className="text-white/80 mb-4">
                  Researchers at Batangas State University have developed a machine learning system that predicts
                  optimal planting times for rice farmers based on historical weather data, soil conditions, and crop
                  yield information.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div className="bg-slate-700/50 p-3 rounded">
                    <h4 className="font-semibold text-white mb-1">Results</h4>
                    <p className="text-sm text-white/80">15-20% increase in crop yields for participating farmers</p>
                  </div>
                  <div className="bg-slate-700/50 p-3 rounded">
                    <h4 className="font-semibold text-white mb-1">Technology</h4>
                    <p className="text-sm text-white/80">Random Forest algorithm with weather pattern analysis</p>
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
