"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2 } from "lucide-react"

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

  // Predefined recommendations based on selections
  const recommendationData = {
    rice: {
      batangas: {
        clay: {
          plantingSchedule:
            "Best planting time is from May to June for wet season and November to December for dry season.",
          wateringRecommendations:
            "Maintain 2-3 cm water depth during vegetative stage, increasing to 5-7 cm during reproductive stage.",
          fertilizers: "Apply complete fertilizer (14-14-14) at planting and urea 30-35 days after transplanting.",
          pestManagement: "Monitor for rice black bugs and stem borers. Use integrated pest management techniques.",
          harvestTiming: "Harvest 30 days after 80-85% of grains have turned golden yellow.",
          localConsiderations:
            "Batangas clay soil retains water well. Consider drainage systems during heavy monsoon rains to prevent flooding.",
        },
        loam: {
          plantingSchedule: "Optimal planting from June to July for wet season and December to January for dry season.",
          wateringRecommendations:
            "Maintain 3-5 cm water depth throughout growing season with more frequent irrigation.",
          fertilizers: "Apply balanced NPK fertilizer (16-20-0) at planting and urea 25-30 days after transplanting.",
          pestManagement: "Watch for rice hispa and leafhoppers. Use yellow sticky traps and resistant varieties.",
          harvestTiming:
            "Harvest when 80-85% of grains have turned golden yellow, typically 115-120 days after planting.",
          localConsiderations:
            "Batangas loam soil has good drainage. Implement water conservation practices during dry spells.",
        },
      },
      "central-luzon": {
        clay: {
          plantingSchedule:
            "Plant from May 15 to June 15 for wet season and November 15 to December 15 for dry season.",
          wateringRecommendations: "Maintain 3-5 cm water depth with careful monitoring during flowering stage.",
          fertilizers:
            "Apply complete fertilizer (14-14-14) at planting and ammonium sulfate 40 days after transplanting.",
          pestManagement:
            "Monitor for rice blast and bacterial leaf blight. Use resistant varieties and proper spacing.",
          harvestTiming: "Harvest 28-30 days after flowering when 80% of grains are mature.",
          localConsiderations:
            "Central Luzon clay soils are prone to cracking during dry periods. Maintain consistent moisture.",
        },
      },
    },
    corn: {
      batangas: {
        clay: {
          plantingSchedule: "Plant from April to May for wet season and October to November for dry season.",
          wateringRecommendations: "Irrigate every 7-10 days, ensuring soil is moist but not waterlogged.",
          fertilizers: "Apply complete fertilizer (14-14-14) at planting and urea when plants are knee-high.",
          pestManagement: "Monitor for corn borers and armyworms. Use Trichogramma cards for biological control.",
          harvestTiming: "Harvest 85-95 days after planting when kernels are firm and milky.",
          localConsiderations:
            "Batangas clay soil requires careful water management for corn. Consider raised beds for better drainage.",
        },
      },
    },
  }

  const getRecommendations = async () => {
    setIsLoading(true)
    setError(null)

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

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
          plantingSchedule: `Optimal planting season for ${cropLabel} in ${regionLabel} is typically during the rainy season (June-August) or early dry season (November-December).`,
          wateringRecommendations: `For ${cropLabel} in ${soilLabel} soil, maintain consistent moisture without waterlogging. Irrigate every 5-7 days depending on weather conditions.`,
          fertilizers: `Apply balanced NPK fertilizer at planting and nitrogen-rich fertilizer during vegetative growth phase. Consider organic compost for ${soilLabel} soil improvement.`,
          pestManagement: `Implement integrated pest management with regular monitoring. Use resistant varieties and biological controls when possible.`,
          harvestTiming: `Harvest ${cropLabel} when fully mature, typically 90-120 days after planting depending on variety.`,
          localConsiderations: `${regionLabel} has specific climate patterns that affect ${cropLabel} growth. Consider local weather forecasts and traditional farming knowledge for best results.`,
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
