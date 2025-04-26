"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2 } from "lucide-react"

export default function SmartFarmingDemoCompact() {
  const [crop, setCrop] = useState("rice")
  const [region, setRegion] = useState("batangas")
  const [soil, setSoil] = useState("clay")
  const [isLoading, setIsLoading] = useState(false)
  const [recommendations, setRecommendations] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const crops = [
    { value: "rice", label: "Rice" },
    { value: "corn", label: "Corn" },
    { value: "coconut", label: "Coconut" },
    { value: "banana", label: "Banana" },
    { value: "mango", label: "Mango" },
  ]

  const regions = [
    { value: "batangas", label: "Batangas" },
    { value: "laguna", label: "Laguna" },
    { value: "central-luzon", label: "C. Luzon" },
    { value: "western-visayas", label: "W. Visayas" },
    { value: "mindanao", label: "Mindanao" },
  ]

  const soilTypes = [
    { value: "clay", label: "Clay" },
    { value: "silt", label: "Silt" },
    { value: "sandy", label: "Sandy" },
    { value: "loam", label: "Loam" },
    { value: "volcanic", label: "Volcanic" },
  ]

  // Predefined recommendations based on selections
  const recommendationData = {
    rice: {
      batangas: {
        clay: {
          plantingSchedule: "Best planting: May-June (wet) and Nov-Dec (dry)",
          wateringRecommendations: "2-3 cm water depth during vegetative stage",
          fertilizers: "Complete fertilizer (14-14-14) at planting",
          pestManagement: "Monitor for rice black bugs and stem borers",
          harvestTiming: "Harvest 30 days after 80-85% grains turn golden",
          localConsiderations: "Consider drainage systems during monsoon rains",
        },
      },
    },
  }

  const getRecommendations = async () => {
    setIsLoading(true)
    setError(null)

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Get recommendations from our predefined data or generate fallback
      let result: any = null

      try {
        // Try to get specific recommendation
        result =
          recommendationData[crop as keyof typeof recommendationData]?.[
            region as keyof (typeof recommendationData)[keyof typeof recommendationData]
          ]?.[
            soil as keyof (typeof recommendationData)[keyof typeof recommendationData][keyof (typeof recommendationData)[keyof typeof recommendationData]]
          ]
      } catch (e) {
        // If path doesn't exist, result will remain null
      }

      // If no specific recommendation, generate a generic one
      if (!result) {
        const cropLabel = crops.find((c) => c.value === crop)?.label || crop
        const regionLabel = regions.find((r) => r.value === region)?.label || region
        const soilLabel = soilTypes.find((s) => s.value === soil)?.label || soil

        result = {
          plantingSchedule: `Optimal planting: rainy season (Jun-Aug) or early dry season (Nov-Dec)`,
          wateringRecommendations: `Maintain consistent moisture without waterlogging`,
          fertilizers: `Apply balanced NPK fertilizer at planting`,
          pestManagement: `Implement integrated pest management`,
          harvestTiming: `Harvest when fully mature (90-120 days)`,
          localConsiderations: `Consider local weather patterns`,
        }
      }

      setRecommendations(result)
    } catch (err) {
      console.error("Error getting recommendations:", err)
      setError("An unexpected error occurred")
      setRecommendations(null)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardContent className="p-2">
        <h2 className="text-sm font-bold text-white mb-2">Smart Farming Recommendations</h2>

        <div className="grid grid-cols-3 gap-1 mb-2">
          <div>
            <Select value={crop} onValueChange={setCrop}>
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white h-7 text-xs">
                <SelectValue placeholder="Crop" />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                {crops.map((crop) => (
                  <SelectItem key={crop.value} value={crop.value} className="text-white text-xs">
                    {crop.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Select value={region} onValueChange={setRegion}>
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white h-7 text-xs">
                <SelectValue placeholder="Region" />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                {regions.map((region) => (
                  <SelectItem key={region.value} value={region.value} className="text-white text-xs">
                    {region.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Select value={soil} onValueChange={setSoil}>
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white h-7 text-xs">
                <SelectValue placeholder="Soil" />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                {soilTypes.map((soil) => (
                  <SelectItem key={soil.value} value={soil.value} className="text-white text-xs">
                    {soil.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-center mb-2">
          <Button
            onClick={getRecommendations}
            disabled={isLoading}
            className="bg-green-600 hover:bg-green-700 h-7 text-xs py-0 px-2 w-full"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                Processing...
              </>
            ) : (
              "Get Recommendations"
            )}
          </Button>
        </div>

        {error && (
          <div className="mb-2 p-1 bg-red-900/30 border border-red-800 rounded-lg text-white text-xs">{error}</div>
        )}

        {recommendations && !isLoading && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <div className="p-2 bg-slate-700/50 rounded-lg mb-2 text-xs">
              <h3 className="font-bold text-white">Planting Schedule</h3>
              <p className="text-white/80">{recommendations.plantingSchedule}</p>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-2">
              <div className="p-2 bg-slate-700/50 rounded-lg text-xs">
                <h4 className="font-semibold text-white">Watering</h4>
                <p className="text-white/80">{recommendations.wateringRecommendations}</p>
              </div>

              <div className="p-2 bg-slate-700/50 rounded-lg text-xs">
                <h4 className="font-semibold text-white">Fertilizers</h4>
                <p className="text-white/80">{recommendations.fertilizers}</p>
              </div>
            </div>

            <div className="p-2 bg-green-900/30 border border-green-800 rounded-lg text-xs">
              <h4 className="font-semibold text-white">Local Considerations</h4>
              <p className="text-white/80">{recommendations.localConsiderations}</p>
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  )
}
