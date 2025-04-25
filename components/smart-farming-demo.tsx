"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2 } from "lucide-react"
import { getAgricultureRecommendationAction } from "@/app/actions/ai-actions"

export default function SmartFarmingDemo() {
  const [crop, setCrop] = useState("rice")
  const [region, setRegion] = useState("batangas")
  const [soil, setSoil] = useState("clay")
  const [isLoading, setIsLoading] = useState(false)
  const [recommendations, setRecommendations] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const crops = [
    { value: "rice", label: "Rice (Palay)" },
    { value: "corn", label: "Corn (Mais)" },
    { value: "coconut", label: "Coconut (Niyog)" },
    { value: "banana", label: "Banana (Saging)" },
    { value: "mango", label: "Mango (Mangga)" },
    { value: "coffee", label: "Coffee (Kape)" },
  ]

  const regions = [
    { value: "batangas", label: "Batangas" },
    { value: "laguna", label: "Laguna" },
    { value: "central-luzon", label: "Central Luzon" },
    { value: "western-visayas", label: "Western Visayas" },
    { value: "mindanao", label: "Mindanao" },
  ]

  const soilTypes = [
    { value: "clay", label: "Clay" },
    { value: "silt", label: "Silt" },
    { value: "sandy", label: "Sandy" },
    { value: "loam", label: "Loam" },
    { value: "volcanic", label: "Volcanic" },
  ]

  const getRecommendations = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await getAgricultureRecommendationAction(
        crops.find((c) => c.value === crop)?.label || crop,
        regions.find((r) => r.value === region)?.label || region,
        soilTypes.find((s) => s.value === soil)?.label || soil,
      )

      if (result.success && result.data) {
        setRecommendations(result.data)
      } else {
        setError("Failed to get recommendations. Please try again.")
        setRecommendations(null)
      }
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
      <CardContent className="p-6">
        <h2 className="text-xl font-bold text-white mb-4">Smart Farming Recommendations</h2>
        <p className="text-white/80 mb-6">
          Get AI-powered recommendations for Philippine farming based on crop, region, and soil conditions.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-white mb-2">Crop</label>
            <Select value={crop} onValueChange={setCrop}>
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                <SelectValue placeholder="Select crop" />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                {crops.map((crop) => (
                  <SelectItem key={crop.value} value={crop.value} className="text-white">
                    {crop.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">Region</label>
            <Select value={region} onValueChange={setRegion}>
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                <SelectValue placeholder="Select region" />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                {regions.map((region) => (
                  <SelectItem key={region.value} value={region.value} className="text-white">
                    {region.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">Soil Type</label>
            <Select value={soil} onValueChange={setSoil}>
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                <SelectValue placeholder="Select soil type" />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                {soilTypes.map((soil) => (
                  <SelectItem key={soil.value} value={soil.value} className="text-white">
                    {soil.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-center mb-6">
          <Button onClick={getRecommendations} disabled={isLoading} className="bg-green-600 hover:bg-green-700">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Recommendations...
              </>
            ) : (
              "Get Farming Recommendations"
            )}
          </Button>
        </div>

        {error && <div className="mb-4 p-3 bg-red-900/30 border border-red-800 rounded-lg text-white">{error}</div>}

        {recommendations && !isLoading && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <div className="p-4 bg-slate-700/50 rounded-lg mb-4">
              <h3 className="text-lg font-bold text-white mb-2">Planting Schedule</h3>
              <p className="text-white/80">{recommendations.plantingSchedule}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="p-4 bg-slate-700/50 rounded-lg">
                <h4 className="font-semibold text-white mb-1">Watering Recommendations</h4>
                <p className="text-sm text-white/80">{recommendations.wateringRecommendations}</p>
              </div>

              <div className="p-4 bg-slate-700/50 rounded-lg">
                <h4 className="font-semibold text-white mb-1">Fertilizers</h4>
                <p className="text-sm text-white/80">{recommendations.fertilizers}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="p-4 bg-slate-700/50 rounded-lg">
                <h4 className="font-semibold text-white mb-1">Pest Management</h4>
                <p className="text-sm text-white/80">{recommendations.pestManagement}</p>
              </div>

              <div className="p-4 bg-slate-700/50 rounded-lg">
                <h4 className="font-semibold text-white mb-1">Harvest Timing</h4>
                <p className="text-sm text-white/80">{recommendations.harvestTiming}</p>
              </div>
            </div>

            <div className="p-4 bg-green-900/30 border border-green-800 rounded-lg">
              <h4 className="font-semibold text-white mb-1">
                Local Considerations for {regions.find((r) => r.value === region)?.label}
              </h4>
              <p className="text-white/80">{recommendations.localConsiderations}</p>
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  )
}
