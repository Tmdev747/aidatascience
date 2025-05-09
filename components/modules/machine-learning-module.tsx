"use client"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

export default function MachineLearningModule() {
  return (
    <div className="space-y-8 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <h1 className="text-4xl font-bold text-center text-white mb-4">
          Machine Learning
          <span className="text-blue-400"> Fundamentals</span>
        </h1>
        <p className="text-xl text-center text-white/80 mb-8">
          Understanding the core concepts of Machine Learning with Philippine applications
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-white mb-2">Supervised Learning</h3>
            <p className="text-white/80 mb-4">
              Supervised learning algorithms build a mathematical model from labeled training data. In the Philippines,
              these are used for:
            </p>
            <ul className="space-y-2 text-white/80">
              <li>• Predicting typhoon paths and intensity</li>
              <li>• Agricultural yield prediction for rice farming</li>
              <li>• Credit scoring for local financial institutions</li>
              <li>• Disease outbreak prediction in rural areas</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-white mb-2">Unsupervised Learning</h3>
            <p className="text-white/80 mb-4">
              Unsupervised learning works with unlabeled data to find patterns and relationships. Philippine
              applications include:
            </p>
            <ul className="space-y-2 text-white/80">
              <li>• Customer segmentation for local businesses</li>
              <li>• Anomaly detection in financial transactions</li>
              <li>• Traffic pattern analysis in Metro Manila</li>
              <li>• Social media trend clustering for Filipino users</li>
            </ul>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-white mb-2">Reinforcement Learning</h3>
            <p className="text-white/80 mb-4">
              Reinforcement learning focuses on how agents take actions to maximize rewards. In the Philippines, it's
              applied to:
            </p>
            <ul className="space-y-2 text-white/80">
              <li>• Optimizing jeepney and bus routes in urban areas</li>
              <li>• Smart grid management for energy distribution</li>
              <li>• Automated irrigation systems for local farms</li>
              <li>• Robotics for manufacturing in special economic zones</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-white mb-2">Deep Learning</h3>
            <p className="text-white/80 mb-4">
              Deep learning uses neural networks with many layers to learn complex patterns. Philippine applications
              include:
            </p>
            <ul className="space-y-2 text-white/80">
              <li>• Filipino speech recognition systems</li>
              <li>• Medical image analysis for rural healthcare</li>
              <li>• Sentiment analysis of Filipino social media</li>
              <li>• Natural disaster damage assessment from satellite imagery</li>
            </ul>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
