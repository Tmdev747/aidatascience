"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import SmartFarmingDemo from "@/components/smart-farming-demo"
import Image from "next/image"
import { useMobile } from "@/hooks/use-mobile"

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
        "Natural language processing systems that work with Tagalog, Cebuano, and other Philippine languages.",
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

      {/* Smart Farming AI Demo */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mb-12"
      >
        <h2 className="text-2xl font-bold text-white mb-6">AI-Powered Smart Farming</h2>
        <SmartFarmingDemo />
      </motion.div>

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
