"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { CloudRain, AlertTriangle, MapPin, Smartphone, Satellite, Users } from "lucide-react"

export default function DisasterResponseAI() {
  const [activePhase, setActivePhase] = useState(0)
  const [alertLevel, setAlertLevel] = useState(1)
  const [showOverlay, setShowOverlay] = useState(false)

  // Cycle through phases
  useEffect(() => {
    const interval = setInterval(() => {
      setActivePhase((prev) => {
        const next = (prev + 1) % 4
        // Increase alert level as we progress
        if (next > prev) {
          setAlertLevel(Math.min(3, next + 1))
        }
        return next
      })
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  // Toggle overlay effect
  useEffect(() => {
    const interval = setInterval(() => {
      setShowOverlay((prev) => !prev)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const phases = [
    {
      title: "Data Collection",
      description: "Satellite imagery and ground sensors monitor typhoon formation",
      icon: <Satellite className="h-6 w-6" />,
      color: "text-blue-400",
    },
    {
      title: "Risk Analysis",
      description: "AI predicts typhoon path and identifies vulnerable areas",
      icon: <AlertTriangle className="h-6 w-6" />,
      color: "text-yellow-400",
    },
    {
      title: "Resource Allocation",
      description: "System recommends optimal distribution of emergency resources",
      icon: <Users className="h-6 w-6" />,
      color: "text-green-400",
    },
    {
      title: "Public Alerts",
      description: "Automated alerts sent in Filipino and local dialects",
      icon: <Smartphone className="h-6 w-6" />,
      color: "text-red-400",
    },
  ]

  return (
    <div className="w-full bg-slate-900 rounded-xl p-6 overflow-hidden">
      <h3 className="text-xl font-bold text-white mb-6 text-center">
        AI for Typhoon Disaster Response in the Philippines
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left side - Map visualization */}
        <div className="relative h-[400px] bg-slate-800 rounded-lg overflow-hidden">
          {/* Philippine map outline */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 500">
            {/* Simplified Philippines outline */}
            <path
              d="M120,200 C150,150 200,120 250,130 C300,140 350,160 380,200 C410,240 420,280 410,320 C400,360 370,390 330,400 C290,410 250,400 210,380 C170,360 140,330 120,290 C100,250 100,230 120,200 Z"
              fill="#0c4a6e"
              stroke="#0369a1"
              strokeWidth="2"
            />

            {/* Major islands */}
            <circle cx="150" cy="180" r="8" fill="#0284c7" />
            <text x="150" y="165" textAnchor="middle" fill="#94a3b8" fontSize="10">
              Luzon
            </text>

            <circle cx="250" cy="250" r="6" fill="#0284c7" />
            <text x="250" y="235" textAnchor="middle" fill="#94a3b8" fontSize="10">
              Visayas
            </text>

            <circle cx="320" cy="320" r="7" fill="#0284c7" />
            <text x="320" y="305" textAnchor="middle" fill="#94a3b8" fontSize="10">
              Mindanao
            </text>

            {/* Typhoon visualization */}
            <motion.g
              initial={{ x: -100, y: -100 }}
              animate={{
                x: activePhase * 50,
                y: activePhase * 40,
              }}
              transition={{ duration: 1 }}
            >
              <motion.circle
                cx="150"
                cy="150"
                r="40"
                fill="url(#typhoon-gradient)"
                opacity="0.7"
                animate={{
                  r: showOverlay ? 40 : 35,
                }}
                transition={{ duration: 0.5 }}
              />
              <motion.circle
                cx="150"
                cy="150"
                r="25"
                fill="url(#typhoon-gradient-inner)"
                opacity="0.9"
                animate={{
                  r: showOverlay ? 25 : 20,
                }}
                transition={{ duration: 0.5 }}
              />
              <motion.circle
                cx="150"
                cy="150"
                r="10"
                fill="#f43f5e"
                animate={{
                  r: showOverlay ? 10 : 8,
                }}
                transition={{ duration: 0.5 }}
              />
            </motion.g>

            {/* Typhoon path prediction */}
            {activePhase >= 1 && (
              <motion.path
                d="M 150,150 Q 200,180 250,220 T 350,300"
                fill="none"
                stroke="#f43f5e"
                strokeWidth="2"
                strokeDasharray="5,5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2 }}
              />
            )}

            {/* Risk areas */}
            {activePhase >= 1 && (
              <>
                <motion.circle
                  cx="250"
                  cy="220"
                  r="15"
                  fill="#f59e0b"
                  opacity="0.3"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 1 }}
                />
                <motion.circle
                  cx="300"
                  cy="260"
                  r="20"
                  fill="#ef4444"
                  opacity="0.3"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.5 }}
                />
              </>
            )}

            {/* Resource allocation */}
            {activePhase >= 2 && (
              <>
                <motion.circle
                  cx="230"
                  cy="200"
                  r="5"
                  fill="#22c55e"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: 2 }}
                />
                <motion.circle
                  cx="270"
                  cy="240"
                  r="5"
                  fill="#22c55e"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: 2.2 }}
                />
                <motion.circle
                  cx="310"
                  cy="270"
                  r="5"
                  fill="#22c55e"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: 2.4 }}
                />
              </>
            )}

            {/* Alert notifications */}
            {activePhase >= 3 && (
              <>
                <motion.g
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 3 }}
                >
                  <rect x="220" y="190" width="20" height="20" fill="#ef4444" rx="3" />
                  <text x="230" y="205" textAnchor="middle" fill="white" fontSize="14">
                    !
                  </text>
                  <text x="230" y="205" textAnchor="middle" fill="white" fontSize="14">
                    !
                  </text>
                </motion.g>
                <motion.g
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 3.2 }}
                >
                  <rect x="260" y="230" width="20" height="20" fill="#ef4444" rx="3" />
                  <text x="270" y="245" textAnchor="middle" fill="white" fontSize="14">
                    !
                  </text>
                </motion.g>
                <motion.g
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 3.4 }}
                >
                  <rect x="300" y="260" width="20" height="20" fill="#ef4444" rx="3" />
                  <text x="310" y="275" textAnchor="middle" fill="white" fontSize="14">
                    !
                  </text>
                </motion.g>
              </>
            )}

            {/* Gradients */}
            <defs>
              <radialGradient id="typhoon-gradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.7" />
              </radialGradient>
              <radialGradient id="typhoon-gradient-inner" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" stopColor="#0284c7" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#0284c7" stopOpacity="0.9" />
              </radialGradient>
            </defs>
          </svg>

          {/* Alert level indicator */}
          <div className="absolute top-4 right-4 p-3 bg-slate-900/80 backdrop-blur-sm rounded-lg">
            <div className="text-white text-sm font-medium mb-1">Alert Level</div>
            <div className="flex space-x-1">
              <div className={`w-4 h-4 rounded-full ${alertLevel >= 1 ? "bg-yellow-500" : "bg-slate-600"}`}></div>
              <div className={`w-4 h-4 rounded-full ${alertLevel >= 2 ? "bg-orange-500" : "bg-slate-600"}`}></div>
              <div className={`w-4 h-4 rounded-full ${alertLevel >= 3 ? "bg-red-500" : "bg-slate-600"}`}></div>
            </div>
          </div>

          {/* Legend */}
          <div className="absolute bottom-4 left-4 p-3 bg-slate-900/80 backdrop-blur-sm rounded-lg">
            <div className="text-white text-xs font-medium mb-2">Legend</div>
            <div className="space-y-1">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                <span className="text-white/80 text-xs">Typhoon Path</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                <span className="text-white/80 text-xs">High Risk Areas</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                <span className="text-white/80 text-xs">Resource Centers</span>
              </div>
            </div>
          </div>

          {/* Philippine flag colors */}
          <div className="absolute top-4 left-4">
            <div className="flex">
              <div className="w-6 h-3 bg-blue-600"></div>
              <div className="w-6 h-3 bg-red-600"></div>
            </div>
            <div className="w-12 h-3 bg-white"></div>
          </div>
        </div>

        {/* Right side - Process visualization */}
        <div className="space-y-4">
          <div className="p-4 bg-slate-800 rounded-lg border border-slate-700 mb-6">
            <div className="flex items-center mb-3">
              <CloudRain className="h-6 w-6 text-blue-500 mr-2" />
              <h4 className="text-lg font-bold text-white">Bagyong Resilience System</h4>
            </div>
            <p className="text-sm text-white/80">
              AI-powered disaster response system designed specifically for Philippine typhoons, integrating local
              knowledge and infrastructure data.
            </p>
          </div>

          {phases.map((phase, index) => (
            <motion.div
              key={`phase-${index}`}
              className={`p-4 rounded-lg border ${
                activePhase === index
                  ? `bg-slate-800 border-blue-500`
                  : activePhase > index
                    ? "bg-slate-800/50 border-green-800"
                    : "bg-slate-800/30 border-slate-700"
              }`}
              animate={{
                scale: activePhase === index ? 1.03 : 1,
                opacity: activePhase >= index ? 1 : 0.6,
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                    activePhase === index ? "bg-blue-900/50" : activePhase > index ? "bg-green-900/50" : "bg-slate-700"
                  }`}
                >
                  <div className={activePhase >= index ? phase.color : "text-slate-500"}>{phase.icon}</div>
                </div>
                <div>
                  <h4 className="font-bold text-white flex items-center">
                    {phase.title}
                    {activePhase > index && (
                      <svg
                        className="ml-2 h-4 w-4 text-green-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </h4>
                  <p className="text-sm text-white/80">{phase.description}</p>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Alert message example */}
          {activePhase === 3 && (
            <motion.div
              className="mt-6 p-4 bg-red-900/30 border border-red-800 rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center mb-2">
                <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
                <h5 className="text-white font-medium">Sample Alert Message</h5>
              </div>
              <div className="bg-slate-800/50 p-3 rounded text-sm">
                <p className="text-white/90 mb-1">
                  <span className="font-bold">BABALA:</span> Malakas na bagyo papalapit sa inyong lugar.
                </p>
                <p className="text-white/80">
                  Maghanda para sa posibleng pagbaha at malakas na hangin. Lumikas sa pinakamalapit na evacuation center
                  kung kinakailangan.
                </p>
                <div className="flex items-center mt-2 text-xs text-white/60">
                  <MapPin className="h-3 w-3 mr-1" />
                  <span>Tacloban City, Leyte</span>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
