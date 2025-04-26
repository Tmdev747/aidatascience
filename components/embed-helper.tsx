"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, Check } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default function EmbedHelper() {
  const [copied, setCopied] = useState(false)
  const [embedSize, setEmbedSize] = useState("medium")
  const [selectedDemo, setSelectedDemo] = useState("default")
  const [compactMode, setCompactMode] = useState(false)

  const baseUrl = typeof window !== "undefined" ? window.location.origin : ""

  // Build URL with parameters
  let embedUrl = `${baseUrl}/embed`
  const params = new URLSearchParams()

  if (selectedDemo && selectedDemo !== "default") {
    params.append("demo", selectedDemo)
  }

  if (compactMode) {
    params.append("compact", "true")
  }

  const queryString = params.toString()
  if (queryString) {
    embedUrl += `?${queryString}`
  }

  const embedSizes = {
    small: { width: 400, height: 500 },
    medium: { width: 600, height: 700 },
    large: { width: 800, height: 900 },
    responsive: { width: "100%", height: 700 },
    compact: { width: 300, height: 400 },
  }

  // If compact mode is selected, use the compact size
  const sizeKey = compactMode && embedSize !== "responsive" ? "compact" : embedSize
  const currentSize = embedSizes[sizeKey as keyof typeof embedSizes]

  const demoOptions = [
    { value: "default", label: "Default (Smart Farming)" },
    { value: "smart-farming", label: "Smart Farming AI" },
    { value: "neural-network", label: "Neural Network Visualization" },
    { value: "nlp", label: "Filipino NLP Analysis" },
    { value: "disaster-response", label: "Disaster Response AI" },
    { value: "agriculture-ai", label: "Agriculture AI Visualization" },
  ]

  const iframeCode = `<iframe 
  src="${embedUrl}" 
  width="${currentSize.width}" 
  height="${currentSize.height}" 
  frameborder="0" 
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
  allowfullscreen
  title="InnovateHub AI Demos">
</iframe>`

  const copyToClipboard = () => {
    navigator.clipboard.writeText(iframeCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white">Embed InnovateHub AI Demos</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-white/80 mb-4">
          Copy the code below to embed the AI demos in your website or application. The embedded view includes a
          navigation system that allows users to switch between all available demos.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Size:</label>
            <Tabs value={embedSize} onValueChange={setEmbedSize}>
              <TabsList className="bg-slate-700">
                <TabsTrigger value="small">Small</TabsTrigger>
                <TabsTrigger value="medium">Medium</TabsTrigger>
                <TabsTrigger value="large">Large</TabsTrigger>
                <TabsTrigger value="responsive">Responsive</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Initial Demo:</label>
            <Select value={selectedDemo} onValueChange={setSelectedDemo}>
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                <SelectValue placeholder="Choose initial demo" />
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
        </div>

        <div className="flex items-center space-x-2 mb-4">
          <Switch id="compact-mode" checked={compactMode} onCheckedChange={setCompactMode} />
          <Label htmlFor="compact-mode" className="text-white">
            Compact Mode (for very limited spaces)
          </Label>
        </div>

        {compactMode && (
          <div className="bg-amber-900/20 border border-amber-800/30 rounded-md p-3 mb-4">
            <p className="text-amber-200 text-sm">
              Compact mode provides a minimal interface optimized for small spaces. It uses simplified controls, reduced
              padding, and a dropdown selector for navigation between demos.
            </p>
          </div>
        )}

        <div className="bg-slate-900 p-4 rounded-md mb-4">
          <pre className="text-white/80 text-sm overflow-x-auto whitespace-pre-wrap">{iframeCode}</pre>
        </div>

        <div className="flex justify-between items-center">
          <div className="text-white/60 text-sm">
            Size: {currentSize.width} × {currentSize.height}
          </div>
          <Button onClick={copyToClipboard} className="bg-blue-600 hover:bg-blue-700">
            {copied ? (
              <>
                <Check className="mr-2 h-4 w-4" /> Copied
              </>
            ) : (
              <>
                <Copy className="mr-2 h-4 w-4" /> Copy Code
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
