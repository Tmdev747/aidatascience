"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, BookOpen, Code, Lightbulb, Map } from "lucide-react"
import Link from "next/link"

export default function IntroModule() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-white mb-4">AI & Data Science in the Philippines</h1>
        <p className="text-xl text-white/80 max-w-3xl mx-auto">
          Exploring the growing landscape of artificial intelligence and data science applications in the Philippine
          context
        </p>
      </motion.div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Left Column - Information */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-2"
        >
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-4 mb-8">
                  <TabsTrigger value="overview" className="data-[state=active]:bg-blue-600">
                    Overview
                  </TabsTrigger>
                  <TabsTrigger value="objectives" className="data-[state=active]:bg-blue-600">
                    Objectives
                  </TabsTrigger>
                  <TabsTrigger value="context" className="data-[state=active]:bg-blue-600">
                    Philippine Context
                  </TabsTrigger>
                  <TabsTrigger value="journey" className="data-[state=active]:bg-blue-600">
                    Learning Journey
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4 text-white/80">
                  <h2 className="text-2xl font-bold text-white">Introduction to AI & Data Science</h2>
                  <p>
                    Artificial Intelligence (AI) and Data Science are transforming industries worldwide, and the
                    Philippines is increasingly adopting these technologies to address local challenges and
                    opportunities.
                  </p>
                  <p>
                    This interactive presentation explores the fundamentals of AI and Data Science, with a special focus
                    on applications relevant to the Philippine context - from agriculture and disaster response to
                    language processing for Filipino languages.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    {[
                      {
                        icon: <Lightbulb className="h-8 w-8 text-yellow-400" />,
                        title: "AI Fundamentals",
                        description: "Core concepts and technologies powering artificial intelligence",
                      },
                      {
                        icon: <Code className="h-8 w-8 text-blue-400" />,
                        title: "Data Science",
                        description: "Extracting insights and knowledge from structured and unstructured data",
                      },
                      {
                        icon: <Map className="h-8 w-8 text-green-400" />,
                        title: "Local Applications",
                        description: "How these technologies are being applied to solve Philippine challenges",
                      },
                    ].map((item, index) => (
                      <div key={index} className="bg-slate-700/50 p-4 rounded-lg">
                        <div className="mb-2">{item.icon}</div>
                        <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                        <p className="text-sm text-white/70">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="objectives" className="space-y-4 text-white/80">
                  <h2 className="text-2xl font-bold text-white">Learning Objectives</h2>
                  <p>By the end of this presentation, you will be able to:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Understand the fundamental concepts of AI, machine learning, and data science</li>
                    <li>Recognize the different types of AI systems and their applications</li>
                    <li>Appreciate how neural networks and deep learning are revolutionizing AI capabilities</li>
                    <li>Identify applications of natural language processing for Filipino languages</li>
                    <li>Explore computer vision applications in Philippine urban and rural settings</li>
                    <li>
                      Discover how AI is being applied to address local challenges in agriculture, healthcare, and
                      disaster response
                    </li>
                    <li>Consider ethical implications and future directions of AI in the Philippine context</li>
                  </ul>
                </TabsContent>

                <TabsContent value="context" className="space-y-4 text-white/80">
                  <h2 className="text-2xl font-bold text-white">The Philippine AI Landscape</h2>
                  <p>
                    The Philippines is at an exciting juncture in its AI and data science journey. With a young,
                    tech-savvy population and a growing startup ecosystem, the country is well-positioned to leverage
                    these technologies for economic and social development.
                  </p>
                  <div className="bg-blue-900/30 border border-blue-800/50 rounded-lg p-4 my-4">
                    <h3 className="text-lg font-semibold text-white mb-2">Key Statistics</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>The Philippine AI market is projected to grow at a CAGR of 48.7% (2023-2028)</li>
                      <li>Over 200 startups in the Philippines are utilizing AI and data science</li>
                      <li>The government launched the National AI Strategy in 2021</li>
                      <li>Universities across the country have established dedicated AI research centers</li>
                    </ul>
                  </div>
                  <p>
                    Despite this progress, challenges remain in terms of infrastructure, talent development, and
                    equitable access to AI technologies. This presentation will explore both the opportunities and
                    challenges in the Philippine context.
                  </p>
                </TabsContent>

                <TabsContent value="journey" className="space-y-4 text-white/80">
                  <h2 className="text-2xl font-bold text-white">Your Learning Journey</h2>
                  <p>
                    This interactive presentation is designed to take you through a comprehensive journey of AI and data
                    science concepts, with a focus on Philippine applications.
                  </p>
                  <div className="relative mt-8">
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-blue-600"></div>
                    {[
                      {
                        title: "Machine Learning Fundamentals",
                        description: "Core concepts, algorithms, and applications",
                      },
                      {
                        title: "Neural Networks",
                        description: "How artificial neural networks mimic human brain function",
                      },
                      {
                        title: "Natural Language Processing",
                        description: "Processing and analyzing Filipino languages",
                      },
                      {
                        title: "Computer Vision",
                        description: "Applications in Philippine urban and rural settings",
                      },
                      {
                        title: "Real-world Applications",
                        description: "Case studies from agriculture, healthcare, and disaster response",
                      },
                      {
                        title: "Knowledge Check",
                        description: "Test your understanding with an interactive quiz",
                      },
                    ].map((step, index) => (
                      <div key={index} className="relative pl-12 pb-8">
                        <div className="absolute left-2 -translate-x-1/2 w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
                          {index + 1}
                        </div>
                        <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                        <p className="text-white/70">{step.description}</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>

        {/* Right Column - Resources */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="lg:col-span-1"
        >
          <Card className="bg-slate-800/50 border-slate-700 h-full">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-white mb-4">Resources</h2>
              <div className="space-y-4">
                <div className="bg-slate-700/50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-white mb-2 flex items-center">
                    <BookOpen className="h-5 w-5 mr-2 text-blue-400" />
                    Interactive Demos
                  </h3>
                  <p className="text-white/70 mb-3 text-sm">
                    Explore hands-on demonstrations of AI concepts and applications.
                  </p>
                  <Link href="/demos/digit-recognition">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      Try Digit Recognition Demo
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>

                <div className="bg-slate-700/50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-white mb-2 flex items-center">
                    <BookOpen className="h-5 w-5 mr-2 text-purple-400" />
                    AI Visualizations
                  </h3>
                  <p className="text-white/70 mb-3 text-sm">
                    See how AI technologies work through interactive visualizations.
                  </p>
                  <Link href="/visualizations">
                    <Button className="w-full bg-purple-600 hover:bg-purple-700">
                      View Visualizations
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>

                <div className="bg-slate-700/50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-white mb-2 flex items-center">
                    <BookOpen className="h-5 w-5 mr-2 text-green-400" />
                    Image Gallery
                  </h3>
                  <p className="text-white/70 mb-3 text-sm">
                    Browse images showcasing AI applications in the Philippines.
                  </p>
                  <Link href="/image-gallery">
                    <Button className="w-full bg-green-600 hover:bg-green-700">
                      Explore Gallery
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 border-none overflow-hidden">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Ready to explore AI & Data Science?</h2>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Navigate through the modules using the tabs above or the navigation controls at the bottom of the page.
            </p>
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-white/90"
              onClick={() =>
                document.querySelector('[value="machine-learning"]')?.dispatchEvent(new MouseEvent("click"))
              }
            >
              Start Learning
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
