"use client"

import { motion } from "framer-motion"
import EmbedHelper from "@/components/embed-helper"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ExternalLink } from "lucide-react"

export default function EmbedHelpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-4">Embed InnovateHub AI Demos</h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Add interactive AI demonstrations to your website or application.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <EmbedHelper />

          <div className="mt-8 flex flex-col md:flex-row gap-4 justify-center">
            <Link href="/">
              <Button variant="outline" className="flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Main Site
              </Button>
            </Link>
            <Link href="/embed" target="_blank">
              <Button className="bg-blue-600 hover:bg-blue-700 flex items-center">
                Preview Embed <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="mt-12 bg-slate-800/50 border border-slate-700 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-4">Usage Guidelines</h2>
            <ul className="space-y-2 text-white/80">
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                <span>
                  The embedded demos are designed to work in any modern web browser and are responsive to different
                  screen sizes.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                <span>When embedding, please include attribution to InnovateHub and Batangas State University.</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                <span>
                  These demos are for educational purposes only and simulate AI capabilities in Philippine contexts.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                <span>For questions or custom integration support, please contact the InnovateHub team.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
