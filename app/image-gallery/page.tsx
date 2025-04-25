"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ImagePlaceholders from "@/components/image-placeholders"

export default function ImageGalleryPage() {
  const [activeTab, setActiveTab] = useState("all")

  return (
    <div className="container mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-white mb-4">Philippine AI Image Gallery</h1>
        <p className="text-xl text-white/80 max-w-3xl mx-auto">
          A collection of image descriptions tailored specifically for the Philippine context of your AI in Data Science
          presentation.
        </p>
      </motion.div>

      <Card className="bg-slate-800/50 border-slate-700 mb-8">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold text-white mb-4">Image Generation Instructions</h2>
          <p className="text-white/80 mb-4">
            These image descriptions are designed to be used with AI image generation tools or as references for graphic
            designers. Each description contains specific Philippine elements to ensure cultural relevance for your
            Batangas State University audience.
          </p>

          <div className="bg-slate-700/50 p-4 rounded-lg">
            <h3 className="font-semibold text-white mb-2">Tips for Best Results:</h3>
            <ul className="list-disc pl-5 space-y-1 text-white/80">
              <li>Include "Philippines" or "Filipino" in your generation prompts</li>
              <li>Specify Batangas State University elements where appropriate</li>
              <li>Request authentic Filipino features, clothing, and environments</li>
              <li>Include Filipino text elements where relevant</li>
              <li>Request images that show the integration of traditional Filipino elements with modern technology</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="bg-slate-800 w-full justify-start overflow-x-auto">
          <TabsTrigger value="all">All Images</TabsTrigger>
          <TabsTrigger value="intro">Introduction</TabsTrigger>
          <TabsTrigger value="machine-learning">Machine Learning</TabsTrigger>
          <TabsTrigger value="neural-networks">Neural Networks</TabsTrigger>
          <TabsTrigger value="nlp">NLP</TabsTrigger>
          <TabsTrigger value="computer-vision">Computer Vision</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
        </TabsList>
      </Tabs>

      <ImagePlaceholders />

      <div className="mt-12 text-center">
        <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
          Download All Image Descriptions
        </Button>
      </div>
    </div>
  )
}
