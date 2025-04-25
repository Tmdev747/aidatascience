"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

export default function IntroModule() {
  const [showVideo, setShowVideo] = useState(false)

  return (
    <div className="py-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative rounded-2xl overflow-hidden mb-12"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-purple-600/90 z-10" />
        <div className="absolute inset-0 bg-[url('/images/ph-ai-hero.jpg')] bg-cover bg-center" />

        <div className="relative z-20 py-20 px-6 md:px-12 max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            AI in Data Science
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl text-white/90 mb-8"
          >
            An interactive journey exploring artificial intelligence and its applications in data science, with special
            focus on the Philippine context.
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Button size="lg" className="bg-white text-blue-600 hover:bg-white/90" onClick={() => setShowVideo(true)}>
              <Play className="mr-2 h-4 w-4" /> Watch Introduction
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Video Modal */}
      {showVideo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setShowVideo(false)}
        >
          <div className="relative w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <Button
              variant="ghost"
              size="icon"
              className="absolute -top-12 right-0 text-white"
              onClick={() => setShowVideo(false)}
            >
              ✕
            </Button>
            <div className="aspect-video bg-black rounded-lg overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Introduction to AI in Data Science"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </motion.div>
      )}

      {/* Content Section */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
            <h2 className="text-3xl font-bold text-white mb-4">Welcome to the Future</h2>
            <p className="text-white/80 mb-4">
              This interactive presentation explores the fascinating world of Artificial Intelligence and its
              applications in Data Science, with special focus on the Philippine context.
            </p>
            <p className="text-white/80 mb-4">
              Navigate through different modules using the menu above. Each section contains interactive demonstrations
              and information relevant to both undergraduate and postgraduate students at Batangas State University.
            </p>
            <p className="text-white/80">
              Commissioned by InnovateHub, this presentation serves as an educational resource that transforms complex
              AI and data science concepts into an engaging, immersive learning experience.
            </p>
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-video rounded-lg overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 p-1">
              <div className="w-full h-full relative rounded">
                <Image
                  src="/images/bsu-ai-lab.jpg"
                  alt="Batangas State University AI Laboratory"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-yellow-500 rounded-full flex items-center justify-center text-slate-900 font-bold text-lg">
              NEW
            </div>
          </motion.div>
        </div>

        {/* Features */}
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-2xl font-bold text-white mb-6 text-center"
        >
          What You'll Explore
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {[
            {
              title: "Machine Learning",
              description: "Discover how algorithms learn from data to make predictions and decisions.",
              icon: "🤖",
              color: "from-green-500 to-emerald-700",
            },
            {
              title: "Neural Networks",
              description: "Explore the brain-inspired computing systems that power deep learning.",
              icon: "🧠",
              color: "from-purple-500 to-indigo-700",
            },
            {
              title: "Natural Language",
              description: "See how AI understands and generates human language, including Filipino.",
              icon: "💬",
              color: "from-pink-500 to-rose-700",
            },
            {
              title: "Computer Vision",
              description: "Learn how machines interpret and understand visual information.",
              icon: "👁️",
              color: "from-red-500 to-orange-700",
            },
            {
              title: "Philippine Applications",
              description: "Discover AI applications in agriculture, healthcare, and more across the Philippines.",
              icon: "🇵🇭",
              color: "from-blue-500 to-cyan-700",
            },
            {
              title: "Interactive Assessment",
              description: "Test your knowledge with quizzes and interactive challenges.",
              icon: "📝",
              color: "from-amber-500 to-yellow-700",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <Card className="bg-slate-800/50 border-slate-700 overflow-hidden">
                <div className={`h-2 bg-gradient-to-r ${feature.color}`}></div>
                <CardContent className="pt-6">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-white/70">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold text-white mb-4">Ready to Begin?</h2>
          <p className="text-white/80 mb-6 max-w-2xl mx-auto">
            Start your journey through AI in Data Science by exploring the different modules. Each section offers
            interactive elements and real-world applications.
          </p>
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
            Start with Machine Learning <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
