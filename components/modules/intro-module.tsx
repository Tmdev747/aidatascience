"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import HeroVideo from "@/components/hero-video"
import type { ThemeColors } from "@/lib/themes"

interface IntroModuleProps {
  theme?: ThemeColors
}

export default function IntroModule({ theme }: IntroModuleProps) {
  // Use default theme if not provided
  const {
    text = "text-white",
    textMuted = "text-white/80",
    accent = "text-blue-400",
    primary = "bg-blue-600",
    primaryHover = "hover:bg-blue-700",
    cardBg = "bg-slate-800/50",
    cardBorder = "border-slate-700",
    buttonText = "text-white",
  } = theme || {}

  return (
    <div className="space-y-8 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <h1 className={`text-4xl md:text-5xl font-bold text-center ${text} mb-4`}>
          AI in Data Science
          <span className={accent}> Philippines</span>
        </h1>
        <p className={`text-xl text-center ${textMuted} mb-8`}>
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
        <Card className={`${cardBg} ${cardBorder}`}>
          <CardContent className="p-6">
            <h3 className={`text-xl font-bold ${text} mb-2`}>What You'll Learn</h3>
            <ul className={`space-y-2 ${textMuted}`}>
              <li>• Understanding AI fundamentals in Philippine context</li>
              <li>• Machine Learning applications for local industries</li>
              <li>• Neural Networks for Filipino language processing</li>
              <li>• Natural Language Processing for Tagalog and other dialects</li>
              <li>• Computer Vision for Philippine-specific challenges</li>
            </ul>
          </CardContent>
        </Card>

        <Card className={`${cardBg} ${cardBorder}`}>
          <CardContent className="p-6">
            <h3 className={`text-xl font-bold ${text} mb-2`}>Why It Matters</h3>
            <p className={`${textMuted} mb-4`}>
              The Philippines is rapidly adopting AI technologies across various sectors. Understanding how these
              technologies work and their applications is crucial for students and professionals in the Philippine tech
              industry.
            </p>
            <Button className={`${primary} ${primaryHover} ${buttonText}`}>Explore Modules</Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
