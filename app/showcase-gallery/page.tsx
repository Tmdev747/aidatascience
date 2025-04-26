"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function ShowcaseGalleryPage() {
  const [selectedDemo, setSelectedDemo] = useState("smart-farming")
  const [selectedTheme, setSelectedTheme] = useState("dark")
  const [selectedView, setSelectedView] = useState("tabs")
  const [isCompact, setIsCompact] = useState(false)

  const baseUrl = typeof window !== "undefined" ? window.location.origin : ""

  const buildUrl = (demo: string, theme: string, view: string, compact: boolean) => {
    let url = `${baseUrl}/showcase?demo=${demo}`
    if (theme !== "dark") url += `&theme=${theme}`
    if (view !== "tabs") url += `&view=${view}`
    if (compact) url += "&compact=true"
    return url
  }

  const demoOptions = [
    { value: "smart-farming", label: "Smart Farming AI" },
    { value: "neural-network", label: "Neural Network Visualization" },
    { value: "nlp", label: "Filipino NLP Analysis" },
    { value: "disaster-response", label: "Disaster Response AI" },
    { value: "agriculture-ai", label: "Agriculture AI Visualization" },
  ]

  const themeOptions = [
    { value: "dark", label: "Dark Theme" },
    { value: "light", label: "Light Theme" },
    { value: "blue", label: "Blue Theme" },
  ]

  const viewOptions = [
    { value: "tabs", label: "Tabs View" },
    { value: "grid", label: "Grid View" },
  ]

  const presets = [
    { name: "Standard Dark", demo: "smart-farming", theme: "dark", view: "tabs", compact: false },
    { name: "Light Theme", demo: "neural-network", theme: "light", view: "tabs", compact: false },
    { name: "Blue Theme", demo: "nlp", theme: "blue", view: "tabs", compact: false },
    { name: "Grid Gallery", demo: "smart-farming", theme: "dark", view: "grid", compact: false },
    { name: "Compact Mode", demo: "disaster-response", theme: "dark", view: "tabs", compact: true },
    { name: "Light Compact", demo: "agriculture-ai", theme: "light", view: "tabs", compact: true },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      <div className="container mx-auto">
        <div className="flex items-center mb-8">
          <Link href="/embed-help">
            <Button variant="outline" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Embed Help
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-white ml-4">Showcase Gallery</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Configuration</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">Demo:</label>
                    <Select value={selectedDemo} onValueChange={setSelectedDemo}>
                      <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                        <SelectValue placeholder="Choose demo" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-700 border-slate-600">
                        {demoOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value} className="text-white">
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">Theme:</label>
                    <Select value={selectedTheme} onValueChange={setSelectedTheme}>
                      <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                        <SelectValue placeholder="Choose theme" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-700 border-slate-600">
                        {themeOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value} className="text-white">
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">View Mode:</label>
                    <Select value={selectedView} onValueChange={setSelectedView}>
                      <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                        <SelectValue placeholder="Choose view" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-700 border-slate-600">
                        {viewOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value} className="text-white">
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="compact-mode"
                      checked={isCompact}
                      onChange={(e) => setIsCompact(e.target.checked)}
                      className="rounded bg-slate-700 border-slate-600 text-blue-600"
                    />
                    <label htmlFor="compact-mode" className="text-white">
                      Compact Mode
                    </label>
                  </div>

                  <div className="pt-4">
                    <Link
                      href={buildUrl(selectedDemo, selectedTheme, selectedView, isCompact)}
                      target="_blank"
                      className="block w-full"
                    >
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">Preview Configuration</Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 mt-6">
              <CardHeader>
                <CardTitle className="text-white">Presets</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-2">
                  {presets.map((preset, index) => (
                    <Link
                      key={index}
                      href={buildUrl(preset.demo, preset.theme, preset.view, preset.compact)}
                      target="_blank"
                    >
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left bg-slate-700 hover:bg-slate-600 border-slate-600"
                      >
                        {preset.name}
                      </Button>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card className="bg-slate-800/50 border-slate-700 h-full">
              <CardHeader>
                <CardTitle className="text-white">Preview</CardTitle>
              </CardHeader>
              <CardContent className="p-0 h-[600px]">
                <iframe
                  src={buildUrl(selectedDemo, selectedTheme, selectedView, isCompact)}
                  className="w-full h-full"
                  frameBorder="0"
                  title="InnovateHub AI Demos Preview"
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
