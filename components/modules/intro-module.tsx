"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import HeroVideo from "@/components/hero-video"

export default function IntroModule() {
  return (
    <div className="space-y-8 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <h1 className="text-4xl md:text-5xl font-bold text-center text-white mb-4">
          AI in Data Science
          <span className="text-blue-400"> Philippines</span>
        </h1>
        <p className="text-xl text-center text-white/80 mb-8">
          Exploring the intersection of Artificial Intelligence and Data Science in the Philippine context
        </p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <HeroVideo videoId="1078659413" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-white mb-2">What You'll Learn</h3>
            <ul className="space-y-2 text-white/80">
              <li>• Understanding AI fundamentals in Philippine context</li>
              <li>• Machine Learning applications for local industries</li>
              <li>• Neural Networks for Filipino language processing</li>
              <li>• Natural Language Processing for Tagalog and other dialects</li>
              <li>• Computer Vision for Philippine-specific challenges</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-white mb-2">Why It Matters</h3>
            <p className="text-white/80 mb-4">
              The Philippines is rapidly adopting AI technologies across various sectors. Understanding how these
              technologies work and their applications is crucial for students and professionals in the Philippine tech
              industry.
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">Explore Modules</Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
