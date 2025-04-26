"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function NeuralNetworksModule() {
  const [activeTab, setActiveTab] = useState("basics")

  // Neural network explanation text - using template literals to handle multiline text properly
  const explanationText = {
    basics: `Neural networks are computing systems inspired by the biological neural networks in human brains. They consist of interconnected nodes (neurons) organized in layers that process information.

Key components include:
- Input Layer: Receives initial data
- Hidden Layers: Process information through weighted connections
- Output Layer: Produces the final result
- Activation Functions: Determine neuron output based on inputs
- Weights & Biases: Parameters adjusted during training`,

    training: `Neural networks learn through a process called training:

1. Forward Propagation: Data passes through the network, generating predictions
2. Loss Calculation: The difference between predictions and actual values is measured
3. Backpropagation: Error is propagated backward to adjust weights
4. Optimization: Weights are updated using algorithms like gradient descent
5. Iteration: The process repeats until performance reaches desired levels`,

    applications: `Neural networks have numerous applications in the Philippine context:

- Agriculture: Crop disease detection, yield prediction
- Healthcare: Medical image analysis, patient diagnosis
- Transportation: Traffic prediction, route optimization
- Language: Filipino text analysis, dialect translation
- Finance: Fraud detection, credit scoring
- Disaster Response: Damage assessment from satellite imagery`,

    challenges: `Implementing neural networks in the Philippines faces several challenges:

- Computing Resources: Limited access to high-performance computing
- Data Availability: Insufficient local datasets for training
- Technical Expertise: Need for more AI specialists
- Infrastructure: Connectivity issues in remote areas
- Ethical Considerations: Privacy concerns and potential biases
- Sustainability: Energy requirements for training large models`,
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
          Understanding the architecture and applications of neural networks in the Philippine context
        </p>
      </motion.div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Left Column - Neural Network Visualization */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-1"
        >
          <Card className="bg-slate-800/50 border-slate-700 h-full">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-white mb-4">Interactive Visualization</h2>
              <div className="aspect-square relative bg-slate-700/50 rounded-lg overflow-hidden mb-4">
                <Image
                  src="/images/ph-neural-networks.png"
                  alt="Neural Network Visualization"
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-white/70 text-sm mb-4">
                Explore how neural networks process Filipino language data through this interactive visualization.
              </p>
              <Link href="/visualizations">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Open Interactive Demo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>

        {/* Right Column - Information */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="lg:col-span-2"
        >
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-4 mb-8">
                  <TabsTrigger value="basics" className="data-[state=active]:bg-blue-600">
                    Basics
                  </TabsTrigger>
                  <TabsTrigger value="training" className="data-[state=active]:bg-blue-600">
                    Training
                  </TabsTrigger>
                  <TabsTrigger value="applications" className="data-[state=active]:bg-blue-600">
                    Applications
                  </TabsTrigger>
                  <TabsTrigger value="challenges" className="data-[state=active]:bg-blue-600">
                    Challenges
                  </TabsTrigger>
                </TabsList>

                {Object.entries(explanationText).map(([key, text]) => (
                  <TabsContent key={key} value={key} className="space-y-4 text-white/80">
                    <div className="whitespace-pre-line">{text}</div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Filipino Language Processing Example */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Card className="bg-slate-800/50 border-slate-700 overflow-hidden">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold text-white mb-4">Filipino Language Processing</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Neural Networks for Filipino Text</h3>
                <p className="text-white/80 mb-4">
                  Neural networks are being used to process and understand Filipino languages, including regional
                  dialects. These models can perform tasks such as:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-white/80">
                  <li>Sentiment analysis of Filipino social media posts</li>
                  <li>Translation between Filipino dialects</li>
                  <li>Text classification for Filipino documents</li>
                  <li>Named entity recognition for Philippine-specific terms</li>
                  <li>Question answering systems in Filipino</li>
                </ul>
              </div>
              <div className="bg-slate-700/30 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-2">Example: Sentiment Analysis</h3>
                <div className="space-y-3">
                  <div className="bg-slate-800/50 p-3 rounded border border-green-500/30">
                    <p className="text-sm text-white/90 font-medium">Input Text:</p>
                    <p className="text-white">
                      "Ang ganda ng serbisyo ng kompanyang ito. Mabilis at magalang ang staff."
                    </p>
                    <p className="text-sm text-green-400 mt-2">Predicted Sentiment: Positive (0.94)</p>
                  </div>
                  <div className="bg-slate-800/50 p-3 rounded border border-red-500/30">
                    <p className="text-sm text-white/90 font-medium">Input Text:</p>
                    <p className="text-white">"Matagal ang delivery at sira pa ang produkto nang dumating."</p>
                    <p className="text-sm text-red-400 mt-2">Predicted Sentiment: Negative (0.87)</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
