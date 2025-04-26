"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import SmartFarmingDemo from "@/components/smart-farming-demo"
import Image from "next/image"
import { useMobile } from "@/hooks/use-mobile"

// Application-specific components
const AgricultureContent = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-12"
    >
      <h2 className="text-2xl font-bold text-white mb-6">AI-Powered Smart Farming</h2>
      <SmartFarmingDemo />

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-white mb-4">Key Benefits</h3>
            <ul className="space-y-2 text-white/80">
              <li className="flex items-start">
                <span className="text-green-400 mr-2">✓</span>
                <span>Increased crop yields by 15-30% in pilot programs</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2">✓</span>
                <span>Reduced water consumption by optimizing irrigation schedules</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2">✓</span>
                <span>Early pest and disease detection through image analysis</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2">✓</span>
                <span>Weather prediction tailored to microclimate conditions</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-white mb-4">Implementation</h3>
            <p className="text-white/80 mb-4">
              Batangas State University has partnered with local farming cooperatives to deploy low-cost sensor networks
              and mobile applications that bring AI-powered insights to small-scale farmers.
            </p>
            <div className="bg-slate-700/50 p-3 rounded-lg">
              <p className="text-sm text-white/80 italic">
                "The AI recommendations have helped us time our planting and harvesting better. We've seen our rice
                yield increase by almost 25% this season."
                <br />- Maria Santos, Rice Farmer, Batangas
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )
}

const HealthcareContent = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-12"
    >
      <h2 className="text-2xl font-bold text-white mb-6">AI in Rural Healthcare</h2>

      <Card className="bg-slate-800/50 border-slate-700 mb-6">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Diagnostic Assistance</h3>
              <p className="text-white/80 mb-4">
                AI-powered diagnostic tools are helping healthcare workers in remote areas of the Philippines identify
                common diseases from medical images and patient symptoms, even without specialist doctors present.
              </p>

              <div className="space-y-3 mt-6">
                <div className="bg-slate-700/50 p-3 rounded-lg">
                  <h4 className="font-semibold text-white">Tuberculosis Screening</h4>
                  <p className="text-sm text-white/80">
                    AI analysis of chest X-rays has improved TB detection rates by 32% in pilot programs.
                  </p>
                </div>

                <div className="bg-slate-700/50 p-3 rounded-lg">
                  <h4 className="font-semibold text-white">Skin Disease Identification</h4>
                  <p className="text-sm text-white/80">
                    Mobile app allows health workers to photograph skin conditions for AI analysis and treatment
                    recommendations.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative h-[300px] rounded-lg overflow-hidden">
              <Image
                src="/images/ph-healthcare-rural.png"
                alt="AI healthcare in rural Philippines"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-white mb-4">Impact Statistics</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-white/80">Patients served</span>
                <span className="text-amber-400 font-bold">5,000+</span>
              </div>
              <div className="w-full bg-slate-700 h-2 rounded-full">
                <div className="bg-amber-500 h-2 rounded-full" style={{ width: "50%" }}></div>
              </div>

              <div className="flex items-center justify-between mt-2">
                <span className="text-white/80">Rural clinics equipped</span>
                <span className="text-amber-400 font-bold">78</span>
              </div>
              <div className="w-full bg-slate-700 h-2 rounded-full">
                <div className="bg-amber-500 h-2 rounded-full" style={{ width: "30%" }}></div>
              </div>

              <div className="flex items-center justify-between mt-2">
                <span className="text-white/80">Diagnostic accuracy</span>
                <span className="text-amber-400 font-bold">87%</span>
              </div>
              <div className="w-full bg-slate-700 h-2 rounded-full">
                <div className="bg-amber-500 h-2 rounded-full" style={{ width: "87%" }}></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-white mb-4">Future Developments</h3>
            <ul className="space-y-2 text-white/80">
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">→</span>
                <span>Expanding to maternal health monitoring with wearable devices</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">→</span>
                <span>Integration with telemedicine platforms for specialist consultations</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">→</span>
                <span>Development of offline-capable AI models for areas with limited connectivity</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">→</span>
                <span>Training programs for local healthcare workers on AI tool usage</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )
}

const TrafficContent = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-12"
    >
      <h2 className="text-2xl font-bold text-white mb-6">AI Traffic Management Systems</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <Card className="bg-slate-800/50 border-slate-700 h-full">
            <CardContent className="p-6">
              <div className="relative h-[250px] rounded-lg overflow-hidden mb-6">
                <Image
                  src="/images/ph-cv-traffic.png"
                  alt="AI traffic management in Manila"
                  fill
                  className="object-cover"
                />
              </div>

              <h3 className="text-xl font-bold text-white mb-4">Computer Vision for Traffic Flow</h3>
              <p className="text-white/80">
                AI-powered cameras installed at key intersections in Metro Manila analyze traffic patterns in real-time,
                adjusting signal timing to optimize flow and reduce congestion. The system can identify vehicles,
                pedestrians, and unusual traffic events to make intelligent decisions.
              </p>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="bg-slate-700/50 p-3 rounded-lg">
                  <h4 className="font-semibold text-white">Vehicle Detection</h4>
                  <p className="text-sm text-white/80">98.7% accuracy in identifying different vehicle types</p>
                </div>

                <div className="bg-slate-700/50 p-3 rounded-lg">
                  <h4 className="font-semibold text-white">Congestion Prediction</h4>
                  <p className="text-sm text-white/80">Forecasts traffic buildup 15-30 minutes in advance</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-white mb-4">Impact Metrics</h3>

            <div className="space-y-6">
              <div className="text-center">
                <div className="inline-block rounded-full bg-amber-900/30 p-4">
                  <div className="rounded-full bg-amber-600 w-20 h-20 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">12%</span>
                  </div>
                </div>
                <p className="mt-2 text-white/80">Reduction in average commute time</p>
              </div>

              <div className="text-center">
                <div className="inline-block rounded-full bg-green-900/30 p-4">
                  <div className="rounded-full bg-green-600 w-20 h-20 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">18%</span>
                  </div>
                </div>
                <p className="mt-2 text-white/80">Decrease in traffic-related emissions</p>
              </div>

              <div className="text-center">
                <div className="inline-block rounded-full bg-blue-900/30 p-4">
                  <div className="rounded-full bg-blue-600 w-20 h-20 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">35</span>
                  </div>
                </div>
                <p className="mt-2 text-white/80">Intersections equipped with AI</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardContent className="p-6">
          <h3 className="text-xl font-bold text-white mb-4">Challenges & Solutions</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-white mb-2">Challenges</h4>
              <ul className="space-y-2 text-white/80">
                <li className="flex items-start">
                  <span className="text-red-400 mr-2">•</span>
                  <span>Camera maintenance during typhoon season</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-2">•</span>
                  <span>Power interruptions affecting system reliability</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-2">•</span>
                  <span>Integration with existing traffic infrastructure</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-2">•</span>
                  <span>High initial deployment costs</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-2">Solutions</h4>
              <ul className="space-y-2 text-white/80">
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">•</span>
                  <span>Weather-resistant camera housings with self-cleaning mechanisms</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">•</span>
                  <span>Solar power backup systems for critical intersections</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">•</span>
                  <span>Modular design for compatibility with existing traffic lights</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">•</span>
                  <span>Public-private partnership funding model</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

const LanguageContent = () => {
  const [inputText, setInputText] = useState("")
  const [sentiment, setSentiment] = useState<null | string>(null)

  const analyzeSentiment = () => {
    if (!inputText) return

    // Simple demo sentiment analysis
    const positiveWords = ["maganda", "masaya", "mabuti", "masarap", "magaling", "mahal", "galing"]
    const negativeWords = ["malungkot", "galit", "masama", "pangit", "mahirap", "hindi"]

    const words = inputText.toLowerCase().split(/\s+/)
    let positiveCount = 0
    let negativeCount = 0

    words.forEach((word) => {
      if (positiveWords.includes(word)) positiveCount++
      if (negativeWords.includes(word)) negativeCount++
    })

    if (positiveCount > negativeCount) {
      setSentiment("positive")
    } else if (negativeCount > positiveCount) {
      setSentiment("negative")
    } else {
      setSentiment("neutral")
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-12"
    >
      <h2 className="text-2xl font-bold text-white mb-6">Filipino Natural Language Processing</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-white mb-4">Sentiment Analysis Demo</h3>

            <div className="mb-4">
              <label htmlFor="filipino-text" className="block text-sm font-medium text-white/80 mb-2">
                Enter Filipino text to analyze sentiment:
              </label>
              <textarea
                id="filipino-text"
                rows={4}
                className="w-full rounded-md bg-slate-900 border border-slate-700 text-white p-3"
                placeholder="Example: Ang magandang araw na ito ay nagbibigay ng kasiyahan sa aking puso."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              ></textarea>
            </div>

            <Button onClick={analyzeSentiment} className="bg-amber-600 hover:bg-amber-700 mb-4" disabled={!inputText}>
              Analyze Sentiment
            </Button>

            {sentiment && (
              <div
                className={`p-4 rounded-md ${
                  sentiment === "positive"
                    ? "bg-green-900/30 border border-green-700"
                    : sentiment === "negative"
                      ? "bg-red-900/30 border border-red-700"
                      : "bg-blue-900/30 border border-blue-700"
                }`}
              >
                <p className="text-white font-medium">
                  Sentiment: <span className="font-bold">{sentiment.charAt(0).toUpperCase() + sentiment.slice(1)}</span>
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-white mb-4">Language Coverage</h3>

            <div className="relative h-[200px] rounded-lg overflow-hidden mb-6">
              <Image
                src="/images/filipino-sentiment-analysis.png"
                alt="Filipino language processing"
                fill
                className="object-cover"
              />
            </div>

            <p className="text-white/80 mb-4">
              The Philippines has over 100 languages and dialects. Current NLP research at Batangas State University
              focuses on the most widely spoken languages:
            </p>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-700/50 p-3 rounded-lg">
                <h4 className="font-semibold text-white">Tagalog</h4>
                <div className="w-full bg-slate-600 h-2 rounded-full mt-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: "95%" }}></div>
                </div>
              </div>

              <div className="bg-slate-700/50 p-3 rounded-lg">
                <h4 className="font-semibold text-white">Cebuano</h4>
                <div className="w-full bg-slate-600 h-2 rounded-full mt-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: "80%" }}></div>
                </div>
              </div>

              <div className="bg-slate-700/50 p-3 rounded-lg">
                <h4 className="font-semibold text-white">Ilocano</h4>
                <div className="w-full bg-slate-600 h-2 rounded-full mt-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: "65%" }}></div>
                </div>
              </div>

              <div className="bg-slate-700/50 p-3 rounded-lg">
                <h4 className="font-semibold text-white">Hiligaynon</h4>
                <div className="w-full bg-slate-600 h-2 rounded-full mt-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: "60%" }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardContent className="p-6">
          <h3 className="text-xl font-bold text-white mb-4">Applications of Filipino NLP</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-700/50 p-4 rounded-lg">
              <div className="text-3xl mb-2">🗣️</div>
              <h4 className="font-semibold text-white mb-2">Voice Assistants</h4>
              <p className="text-sm text-white/80">
                Voice assistants that understand and respond in Filipino languages, improving accessibility for
                non-English speakers.
              </p>
            </div>

            <div className="bg-slate-700/50 p-4 rounded-lg">
              <div className="text-3xl mb-2">🔍</div>
              <h4 className="font-semibold text-white mb-2">Content Moderation</h4>
              <p className="text-sm text-white/80">
                AI systems that can detect harmful content in Filipino social media posts and comments.
              </p>
            </div>

            <div className="bg-slate-700/50 p-4 rounded-lg">
              <div className="text-3xl mb-2">🔄</div>
              <h4 className="font-semibold text-white mb-2">Translation Services</h4>
              <p className="text-sm text-white/80">
                Improved translation between Filipino languages and dialects, preserving cultural nuances.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

const DisasterContent = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-12"
    >
      <h2 className="text-2xl font-bold text-white mb-6">AI for Disaster Response</h2>

      <Card className="bg-slate-800/50 border-slate-700 mb-8">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Typhoon Impact Assessment</h3>
              <p className="text-white/80 mb-4">
                The Philippines experiences an average of 20 typhoons per year, making rapid disaster response critical.
                AI systems developed at Batangas State University analyze satellite imagery before and after typhoons to
                quickly assess damage and prioritize emergency response.
              </p>

              <div className="space-y-4 mt-6">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-amber-600 flex items-center justify-center text-white mr-4">
                    1
                  </div>
                  <p className="text-white/80">Satellite imagery collection (pre and post-disaster)</p>
                </div>

                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-amber-600 flex items-center justify-center text-white mr-4">
                    2
                  </div>
                  <p className="text-white/80">AI analysis to detect structural damage and flooding</p>
                </div>

                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-amber-600 flex items-center justify-center text-white mr-4">
                    3
                  </div>
                  <p className="text-white/80">Generation of damage assessment maps</p>
                </div>

                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-amber-600 flex items-center justify-center text-white mr-4">
                    4
                  </div>
                  <p className="text-white/80">Prioritization of areas for emergency response</p>
                </div>
              </div>
            </div>

            <div className="relative h-[300px] rounded-lg overflow-hidden">
              <Image
                src="/images/ph-disaster-response.png"
                alt="AI for disaster response"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-white mb-4">Flood Prediction System</h3>

            <p className="text-white/80 mb-4">
              AI models combine historical flood data, real-time rainfall measurements, river levels, and topographical
              information to predict flooding patterns up to 72 hours in advance.
            </p>

            <div className="bg-slate-700/50 p-4 rounded-lg mb-4">
              <h4 className="font-semibold text-white mb-2">Key Features</h4>
              <ul className="space-y-2 text-white/80">
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>Real-time monitoring of 78 river systems</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>Integration with weather forecasting data</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>SMS alerts to local government units</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>85% accuracy in 24-hour flood predictions</span>
                </li>
              </ul>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-amber-400 font-medium">12 provinces covered</span>
              <Button variant="outline" size="sm">
                View Coverage Map
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-white mb-4">Case Study: Typhoon Odette (Rai)</h3>

            <div className="bg-slate-700/50 p-4 rounded-lg mb-4">
              <p className="text-white/80">
                In December 2021, Typhoon Odette devastated parts of Visayas and Mindanao. The AI disaster response
                system was deployed to:
              </p>
            </div>

            <div className="space-y-3 mt-4">
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white mr-3 flex-shrink-0">
                  ✓
                </div>
                <div>
                  <h4 className="font-semibold text-white">Damage Assessment</h4>
                  <p className="text-sm text-white/80">Analyzed 15,000+ sq km of affected areas within 48 hours</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white mr-3 flex-shrink-0">
                  ✓
                </div>
                <div>
                  <h4 className="font-semibold text-white">Resource Allocation</h4>
                  <p className="text-sm text-white/80">Helped direct relief goods to 32 isolated communities</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white mr-3 flex-shrink-0">
                  ✓
                </div>
                <div>
                  <h4 className="font-semibold text-white">Infrastructure Planning</h4>
                  <p className="text-sm text-white/80">
                    Identified priority areas for rebuilding critical infrastructure
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardContent className="p-6">
          <h3 className="text-xl font-bold text-white mb-4">Future Developments</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-700/50 p-4 rounded-lg">
              <div className="text-3xl mb-2">🛰️</div>
              <h4 className="font-semibold text-white mb-2">Drone Integration</h4>
              <p className="text-sm text-white/80">
                Autonomous drones with AI vision to assess hard-to-reach areas after disasters.
              </p>
            </div>

            <div className="bg-slate-700/50 p-4 rounded-lg">
              <div className="text-3xl mb-2">📱</div>
              <h4 className="font-semibold text-white mb-2">Mobile Reporting</h4>
              <p className="text-sm text-white/80">
                Crowdsourced disaster reporting app with AI verification of submitted photos.
              </p>
            </div>

            <div className="bg-slate-700/50 p-4 rounded-lg">
              <div className="text-3xl mb-2">🤖</div>
              <h4 className="font-semibold text-white mb-2">Rescue Robotics</h4>
              <p className="text-sm text-white/80">
                AI-powered robots for search and rescue in dangerous post-disaster environments.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default function ApplicationsModule() {
  const [selectedApplication, setSelectedApplication] = useState("agriculture")
  const isMobile = useMobile()

  const applications = {
    agriculture: {
      title: "Smart Agriculture",
      description:
        "AI systems analyze soil conditions, weather patterns, and crop health to optimize farming practices in the Philippines.",
      impact:
        "Helps Filipino farmers increase crop yields by 15-30% while reducing water usage and pesticide application.",
      challenges: "Limited internet connectivity in rural areas and high initial implementation costs.",
      location: "Central Luzon and Batangas province",
      color: "from-green-500 to-emerald-700",
      icon: "🌾",
      image: "/images/batangas-smart-farming.png",
    },
    healthcare: {
      title: "Healthcare Diagnostics",
      description:
        "AI-powered diagnostic tools help identify diseases from medical images in underserved areas of the Philippines.",
      impact: "Provides access to diagnostic capabilities in remote areas where specialist doctors are unavailable.",
      challenges: "Requires validation against diverse Filipino patient populations.",
      location: "Rural health units across the archipelago",
      color: "from-red-500 to-rose-700",
      icon: "🏥",
      image: "/images/ph-healthcare-rural.png",
    },
    traffic: {
      title: "Traffic Management",
      description:
        "Computer vision systems monitor traffic flow in Metro Manila and other urban centers to optimize signal timing.",
      impact: "Reduces average commute times by 12-18% during peak hours in implemented areas.",
      challenges: "Camera maintenance issues during typhoon season.",
      location: "Metro Manila, Cebu City, and Davao",
      color: "from-amber-500 to-orange-700",
      icon: "🚦",
      image: "/images/ph-cv-traffic.png",
    },
    language: {
      title: "Filipino NLP",
      description:
        "Natural language processing systems that work with Tagalog, Cebuano, and other Philippine languages. Powered by InnovateHub.",
      impact: "Enables voice assistants, translation services, and content moderation for local languages.",
      challenges: "Limited training data for many of the 100+ languages in the Philippines.",
      location: "Nationwide digital services",
      color: "from-purple-500 to-indigo-700",
      icon: "💬",
      image: "/images/filipino-sentiment-analysis.png",
    },
    disaster: {
      title: "Disaster Response",
      description:
        "AI systems analyze satellite imagery to assess damage after typhoons and predict flooding patterns.",
      impact: "Helps emergency responders prioritize areas for evacuation and relief efforts.",
      challenges: "Requires rapid deployment during emergency situations.",
      location: "Typhoon-prone regions including Eastern Visayas",
      color: "from-blue-500 to-cyan-700",
      icon: "🌪️",
      image: "/images/ph-disaster-response.png",
    },
  }

  // Render the appropriate content based on the selected application
  const renderApplicationContent = () => {
    switch (selectedApplication) {
      case "agriculture":
        return <AgricultureContent />
      case "healthcare":
        return <HealthcareContent />
      case "traffic":
        return <TrafficContent />
      case "language":
        return <LanguageContent />
      case "disaster":
        return <DisasterContent />
      default:
        return <AgricultureContent />
    }
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
        <h1 className="text-4xl font-bold text-white mb-4">Philippine AI Applications</h1>
        <p className="text-xl text-white/80 max-w-3xl mx-auto">
          Discover how artificial intelligence is solving real-world problems across the Philippines.
        </p>
      </motion.div>

      {/* Philippines Map Section */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} className="mb-12">
        <Card className="bg-slate-800/50 border-slate-700 overflow-hidden">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Map Visualization */}
              <div className="relative h-[400px] bg-slate-900 rounded-lg p-4">
                {/* Simplified Philippines map */}
                <svg viewBox="0 0 500 500" className="w-full h-full">
                  {/* Base map outline */}
                  <path
                    d="M120,200 C150,150 200,120 250,130 C300,140 350,160 380,200 C410,240 420,280 410,320 C400,360 370,390 330,400 C290,410 250,400 210,380 C170,360 140,330 120,290 C100,250 100,230 120,200 Z"
                    fill="#0c4a6e"
                    stroke="#0369a1"
                    strokeWidth="2"
                  />

                  {/* Application hotspots */}
                  {Object.entries(applications).map(([key, app], index) => {
                    // Position hotspots around the map
                    const positions = [
                      { x: 150, y: 180 }, // agriculture
                      { x: 350, y: 180 }, // healthcare
                      { x: 250, y: 250 }, // traffic
                      { x: 180, y: 320 }, // language
                      { x: 320, y: 320 }, // disaster
                    ]

                    return (
                      <motion.g
                        key={key}
                        onClick={() => setSelectedApplication(key)}
                        whileHover={{ scale: 1.1 }}
                        style={{ cursor: "pointer" }}
                      >
                        <circle
                          cx={positions[index].x}
                          cy={positions[index].y}
                          r={selectedApplication === key ? 18 : 15}
                          fill={selectedApplication === key ? "#f59e0b" : "#475569"}
                          stroke={selectedApplication === key ? "#ffffff" : "#64748b"}
                          strokeWidth="2"
                        />
                        <text
                          x={positions[index].x}
                          y={positions[index].y + 5}
                          textAnchor="middle"
                          fill="#ffffff"
                          fontSize="12"
                          fontWeight="bold"
                        >
                          {app.icon}
                        </text>

                        {selectedApplication === key && (
                          <motion.circle
                            cx={positions[index].x}
                            cy={positions[index].y}
                            r="25"
                            fill="transparent"
                            stroke="#f59e0b"
                            strokeWidth="2"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                          />
                        )}
                      </motion.g>
                    )
                  })}

                  {/* Map labels */}
                  <text x="250" y="80" textAnchor="middle" fill="#94a3b8" fontSize="14">
                    Philippine AI Applications
                  </text>
                  <text x="250" y="450" textAnchor="middle" fill="#94a3b8" fontSize="12">
                    Click on markers to explore applications
                  </text>
                </svg>
              </div>

              {/* Application Details */}
              <div>
                <motion.div
                  key={selectedApplication}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div
                    className={`h-2 bg-gradient-to-r ${applications[selectedApplication as keyof typeof applications].color} rounded-t-md`}
                  ></div>
                  <div className="p-6 bg-slate-900 rounded-b-lg">
                    <div className="flex items-center mb-4">
                      <div className="text-4xl mr-4">
                        {applications[selectedApplication as keyof typeof applications].icon}
                      </div>
                      <h2 className="text-2xl font-bold text-white">
                        {applications[selectedApplication as keyof typeof applications].title}
                      </h2>
                    </div>

                    <div className="relative h-40 mb-4 rounded-lg overflow-hidden">
                      <Image
                        src={applications[selectedApplication as keyof typeof applications].image || "/placeholder.svg"}
                        alt={applications[selectedApplication as keyof typeof applications].title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <p className="text-white/80 mb-6">
                      {applications[selectedApplication as keyof typeof applications].description}
                    </p>

                    <div className="grid grid-cols-1 gap-4 mb-6">
                      <div className="bg-slate-800/70 p-4 rounded-lg">
                        <h3 className="font-semibold text-white mb-1">Impact</h3>
                        <p className="text-white/80">
                          {applications[selectedApplication as keyof typeof applications].impact}
                        </p>
                      </div>

                      <div className="bg-slate-800/70 p-4 rounded-lg">
                        <h3 className="font-semibold text-white mb-1">Challenges</h3>
                        <p className="text-white/80">
                          {applications[selectedApplication as keyof typeof applications].challenges}
                        </p>
                      </div>

                      <div className="bg-slate-800/70 p-4 rounded-lg">
                        <h3 className="font-semibold text-white mb-1">Location</h3>
                        <p className="text-white/80">
                          {applications[selectedApplication as keyof typeof applications].location}
                        </p>
                      </div>
                    </div>

                    <Button className="bg-amber-600 hover:bg-amber-700" size={isMobile ? "sm" : "default"}>
                      Learn More
                    </Button>
                  </div>
                </motion.div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Application Selection Tabs */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-6">Explore Applications</h2>

        <Tabs defaultValue={selectedApplication} onValueChange={setSelectedApplication}>
          <TabsList className="bg-slate-800 w-full justify-start overflow-x-auto">
            {Object.entries(applications).map(([key, app]) => (
              <TabsTrigger key={key} value={key} className={`min-w-max ${isMobile ? "text-xs py-1 px-2" : ""}`}>
                <span className="mr-2">{app.icon}</span> {isMobile ? app.title.split(" ")[0] : app.title}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* Dynamic Application Content */}
      {renderApplicationContent()}

      {/* Success Stories */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mb-12"
      >
        <h2 className="text-2xl font-bold text-white mb-6">Success Stories</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center text-white text-xl mr-4">
                  🚜
                </div>
                <h3 className="text-xl font-bold text-white">Batangas Rice Farmers</h3>
              </div>

              <p className="text-white/80 mb-4">
                A group of rice farmers in Batangas increased their yield by 23% after adopting AI-powered soil analysis
                and weather prediction technology developed by local researchers.
              </p>

              <div className="flex justify-between items-center">
                <span className="text-amber-400 font-medium">20+ farms participating</span>
                <Button variant="outline" size={isMobile ? "sm" : "default"}>
                  Read Story
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white text-xl mr-4">
                  🏥
                </div>
                <h3 className="text-xl font-bold text-white">Rural Telehealth</h3>
              </div>

              <p className="text-white/80 mb-4">
                AI diagnostic tools have enabled healthcare workers in remote Visayan islands to screen for common
                diseases without requiring patients to travel to major cities.
              </p>

              <div className="flex justify-between items-center">
                <span className="text-amber-400 font-medium">5,000+ patients served</span>
                <Button variant="outline" size={isMobile ? "sm" : "default"}>
                  Read Story
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      {/* Future Directions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold text-white mb-4">Future Directions</h2>

            <p className="text-white/80 mb-6">
              Batangas State University is at the forefront of developing AI applications tailored to Philippine needs.
              Current research focuses on:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-700/50 p-4 rounded-lg">
                <h3 className="font-semibold text-white mb-2">Local Language AI</h3>
                <p className="text-sm text-white/80">
                  Developing models that better understand the nuances of Filipino languages and dialects.
                </p>
              </div>

              <div className="bg-slate-700/50 p-4 rounded-lg">
                <h3 className="font-semibold text-white mb-2">Climate Resilience</h3>
                <p className="text-sm text-white/80">
                  AI systems to predict and mitigate the impact of typhoons and other natural disasters.
                </p>
              </div>

              <div className="bg-slate-700/50 p-4 rounded-lg">
                <h3 className="font-semibold text-white mb-2">Accessible AI</h3>
                <p className="text-sm text-white/80">
                  Low-resource AI solutions that can run on basic hardware available in rural communities.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
