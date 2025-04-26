"use client"

import { motion } from "framer-motion"
import AIConfig from "@/components/ai-config"

export default function SettingsPage() {
  return (
    <div className="container mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-white mb-4">Settings</h1>
        <p className="text-xl text-white/80 max-w-3xl mx-auto">Configure your InnovateHub AI experience</p>
      </motion.div>

      <div className="max-w-2xl mx-auto">
        <AIConfig />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 bg-slate-800/50 border border-slate-700 rounded-lg p-6"
        >
          <h2 className="text-2xl font-bold text-white mb-4">Environment Status</h2>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-white/80">Anthropic API Key</span>
              <span className="text-green-500">✓ Connected</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/80">OpenAI API Key</span>
              <span className="text-green-500">✓ Connected</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
