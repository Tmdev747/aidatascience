"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { CloudRain, Sun, Droplets, Sprout, LineChart } from "lucide-react"

export default function SmartAgricultureAI() {
  const [activeStage, setActiveStage] = useState(0)
  const [weatherData, setWeatherData] = useState<number[]>([])
  const [soilData, setSoilData] = useState<number[]>([])
  const [predictionData, setPredictionData] = useState<number[]>([])

  // Generate random data for visualization
  useEffect(() => {
    const generateData = () => {
      const weather = Array.from({ length: 10 }, () => Math.random() * 30 + 20)
      const soil = Array.from({ length: 10 }, () => Math.random() * 40 + 30)
      const prediction = Array.from({ length: 10 }, () => Math.random() * 20 + 60)

      setWeatherData(weather)
      setSoilData(soil)
      setPredictionData(prediction)
    }

    generateData()

    // Cycle through stages
    const interval = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % 4)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const stages = [
    {
      title: "Data Collection",
      description: "Sensors collect weather and soil data from rice fields in Batangas",
      icon: <Droplets className="h-8 w-8 text-blue-500" />,
      color: "from-blue-500 to-cyan-600",
    },
    {
      title: "AI Analysis",
      description: "Machine learning algorithms analyze patterns and historical crop data",
      icon: <LineChart className="h-8 w-8 text-purple-500" />,
      color: "from-purple-500 to-indigo-600",
    },
    {
      title: "Prediction",
      description: "AI predicts optimal planting times and water requirements",
      icon: <Sprout className="h-8 w-8 text-green-500" />,
      color: "from-green-500 to-emerald-600",
    },
    {
      title: "Implementation",
      description: "Farmers receive recommendations via mobile app in Filipino language",
      icon: <Sun className="h-8 w-8 text-yellow-500" />,
      color: "from-yellow-500 to-amber-600",
    },
  ]

  return (
    <div className="w-full bg-slate-900 rounded-xl p-6 overflow-hidden">
      <h3 className="text-xl font-bold text-white mb-6 text-center">
        Smart Agriculture AI for Philippine Rice Farming
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left side - Process visualization */}
        <div className="space-y-4">
          {stages.map((stage, index) => (
            <motion.div
              key={`stage-${index}`}
              className={`p-4 rounded-lg border ${
                activeStage === index
                  ? `bg-gradient-to-r ${stage.color} border-transparent`
                  : "bg-slate-800/50 border-slate-700"
              }`}
              animate={{
                scale: activeStage === index ? 1.03 : 1,
                opacity: activeStage === index ? 1 : 0.7,
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                    activeStage === index ? "bg-white/20" : "bg-slate-700"
                  }`}
                >
                  {stage.icon}
                </div>
                <div>
                  <h4 className="font-bold text-white">{stage.title}</h4>
                  <p className="text-sm text-white/80">{stage.description}</p>
                </div>
              </div>
            </motion.div>
          ))}

          <div className="p-4 bg-slate-800/30 rounded-lg border border-slate-700 mt-6">
            <h4 className="font-semibold text-white mb-2">Philippine Context</h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                <span>Adapted for tropical monsoon climate</span>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                <span>Supports local rice varieties (e.g., Dinorado, Milagrosa)</span>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                <span>Interface available in Tagalog and regional dialects</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right side - Data visualization */}
        <div className="bg-slate-800 rounded-lg p-4 relative min-h-[350px]">
          <div className="absolute inset-0 flex items-center justify-center">
            {activeStage === 0 && (
              <motion.div
                className="w-full h-full p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <h4 className="text-white font-medium mb-3">Weather & Soil Sensors</h4>
                <div className="flex space-x-4 mb-6">
                  <div className="flex items-center">
                    <Sun className="h-5 w-5 text-yellow-500 mr-1" />
                    <span className="text-white/80 text-sm">32°C</span>
                  </div>
                  <div className="flex items-center">
                    <CloudRain className="h-5 w-5 text-blue-500 mr-1" />
                    <span className="text-white/80 text-sm">68% Humidity</span>
                  </div>
                  <div className="flex items-center">
                    <Droplets className="h-5 w-5 text-cyan-500 mr-1" />
                    <span className="text-white/80 text-sm">42% Soil Moisture</span>
                  </div>
                </div>

                <div className="h-40 flex items-end space-x-1">
                  {weatherData.map((value, i) => (
                    <motion.div
                      key={`weather-${i}`}
                      className="bg-gradient-to-t from-blue-600 to-cyan-400 rounded-t w-full"
                      style={{ height: `${value}%` }}
                      initial={{ height: 0 }}
                      animate={{ height: `${value}%` }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                    />
                  ))}
                </div>
                <div className="text-xs text-white/50 mt-2">Weather data from Batangas rice fields</div>
              </motion.div>
            )}

            {activeStage === 1 && (
              <motion.div
                className="w-full h-full p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <h4 className="text-white font-medium mb-3">AI Pattern Analysis</h4>

                <svg className="w-full h-48" viewBox="0 0 300 100">
                  {/* Weather data line */}
                  <motion.path
                    d={`M 0,${100 - weatherData[0]} ${weatherData.map((value, i) => `L ${i * 30},${100 - value}`).join(" ")}`}
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5 }}
                  />

                  {/* Soil data line */}
                  <motion.path
                    d={`M 0,${100 - soilData[0]} ${soilData.map((value, i) => `L ${i * 30},${100 - value}`).join(" ")}`}
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                  />
                </svg>

                <div className="flex justify-center space-x-6 mt-4">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 mr-2"></div>
                    <span className="text-white/80 text-sm">Weather Patterns</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 mr-2"></div>
                    <span className="text-white/80 text-sm">Soil Conditions</span>
                  </div>
                </div>

                <div className="text-xs text-white/50 mt-4 text-center">
                  Machine learning model trained on 10+ years of Philippine agricultural data
                </div>
              </motion.div>
            )}

            {activeStage === 2 && (
              <motion.div
                className="w-full h-full p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <h4 className="text-white font-medium mb-3">Yield Prediction</h4>

                <div className="h-48 flex items-end space-x-2">
                  {predictionData.map((value, i) => (
                    <motion.div
                      key={`prediction-${i}`}
                      className="relative"
                      initial={{ height: 0 }}
                      animate={{ height: `${value}%` }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                    >
                      <div
                        className="bg-gradient-to-t from-green-600 to-emerald-400 rounded-t w-full absolute bottom-0"
                        style={{ height: `${value}%` }}
                      />
                      <div className="text-xs text-white/70 absolute -top-5 left-1/2 transform -translate-x-1/2">
                        {Math.round(value * 0.1)}t
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="text-xs text-white/50 mt-8 text-center">
                  Predicted rice yield (tons per hectare) with AI-optimized farming
                </div>
              </motion.div>
            )}

            {activeStage === 3 && (
              <motion.div
                className="w-full h-full p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <h4 className="text-white font-medium mb-3">Farmer Recommendations</h4>

                <div className="bg-slate-700/50 rounded-lg p-4 mb-4 border border-slate-600">
                  <div className="flex items-center mb-2">
                    <Sprout className="h-5 w-5 text-green-500 mr-2" />
                    <h5 className="text-white font-medium">Rekomendasyon sa Pagtatanim</h5>
                  </div>
                  <p className="text-white/80 text-sm">
                    Pinakamainam na panahon ng pagtatanim:{" "}
                    <span className="text-green-400 font-medium">Hunyo 15-30</span>
                  </p>
                  <p className="text-white/80 text-sm mt-1">
                    Uri ng palay na angkop: <span className="text-green-400 font-medium">NSIC Rc 222</span>
                  </p>
                </div>

                <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                  <div className="flex items-center mb-2">
                    <Droplets className="h-5 w-5 text-blue-500 mr-2" />
                    <h5 className="text-white font-medium">Rekomendasyon sa Patubig</h5>
                  </div>
                  <p className="text-white/80 text-sm">
                    Dalas ng patubig: <span className="text-blue-400 font-medium">2-3 beses sa isang linggo</span>
                  </p>
                  <p className="text-white/80 text-sm mt-1">
                    Dami ng tubig: <span className="text-blue-400 font-medium">3-5 cm ang lalim</span>
                  </p>
                </div>

                <div className="flex justify-center mt-4">
                  <div className="px-3 py-1 bg-green-600/20 border border-green-600 rounded text-xs text-green-400">
                    Inaasahang pagtaas ng ani: 23%
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
