"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ShowcaseEmbedHelper() {
  const [copied, setCopied] = useState(false)
  const [selectedDemo, setSelectedDemo] = useState("smart-farming")
  const [compactMode, setCompactMode] = useState(false)
  const [viewMode, setViewMode] = useState<"tabs" | "grid">("tabs")
  const [theme, setTheme] = useState<"dark" | "light" | "blue">("dark")
  const [embedSize, setEmbedSize] = useState<{ width: string | number; height: string | number }>({
    width: 800,
    height: 600,
  })

  const baseUrl = typeof window !== "undefined" ? window.location.origin : ""

  // Build URL with parameters
  let embedUrl = `${baseUrl}/showcase`
  const params = new URLSearchParams()

  if (selectedDemo) {
    params.append("demo", selectedDemo)
  }

  if (compactMode) {
    params.append("compact", "true")
  }

  if (viewMode !== "tabs") {
    params.append("view", viewMode)
  }

  if (theme !== "dark") {
    params.append("theme", theme)
  }

  const queryString = params.toString()
  if (queryString) {
    embedUrl += `?${queryString}`
  }

  const demoOptions = [
    { value: "smart-farming", label: "Smart Farming AI" },
    { value: "neural-network", label: "Neural Network Visualization" },
    { value: "nlp", label: "Filipino NLP Analysis" },
    { value: "disaster-response", label: "Disaster Response AI" },
    { value: "agriculture-ai", label: "Agriculture AI Visualization" },
  ]

  const sizeOptions = [
    { value: "small", label: "Small (600×450)", width: 600, height: 450 },
    { value: "medium", label: "Medium (800×600)", width: 800, height: 600 },
    { value: "large", label: "Large (1000×750)", width: 1000, height: 750 },
    { value: "responsive", label: "Responsive (100%)", width: "100%", height: 600 },
  ]

  const handleSizeChange = (value: string) => {
    const selectedSize = sizeOptions.find((size) => size.value === value)
    if (selectedSize) {
      setEmbedSize({ width: selectedSize.width, height: selectedSize.height })
    }
  }

  const iframeCode = `<iframe 
  src="${embedUrl}" 
  width="${embedSize.width}" 
  height="${embedSize.height}" 
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
        <CardTitle className="text-white">Embed AI Demo Showcase</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-white/80 mb-4">
          This showcase page displays all demos with a responsive interface and no navigation bar, perfect for
          embedding.
        </p>

        <Tabs defaultValue="basic" className="mb-6">
          <TabsList className="mb-4">
            <TabsTrigger value="basic">Basic Options</TabsTrigger>
            <TabsTrigger value="advanced">Advanced Options</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>

          <TabsContent value="basic">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">Size:</label>
                <Select onValueChange={handleSizeChange} defaultValue="medium">
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                    <SelectValue placeholder="Choose size" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-700 border-slate-600">
                    {sizeOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value} className="text-white">
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
                Compact Mode (for limited spaces)
              </Label>
            </div>
          </TabsContent>

          <TabsContent value="advanced">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">Theme:</label>
                <Select value={theme} onValueChange={(value: "dark" | "light" | "blue") => setTheme(value)}>
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                    <SelectValue placeholder="Choose theme" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-700 border-slate-600">
                    <SelectItem value="dark" className="text-white">
                      Dark Theme
                    </SelectItem>
                    <SelectItem value="light" className="text-white">
                      Light Theme
                    </SelectItem>
                    <SelectItem value="blue" className="text-white">
                      Blue Theme
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">Initial View:</label>
                <Select value={viewMode} onValueChange={(value: "tabs" | "grid") => setViewMode(value)}>
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                    <SelectValue placeholder="Choose view mode" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-700 border-slate-600">
                    <SelectItem value="tabs" className="text-white">
                      Tabs View
                    </SelectItem>
                    <SelectItem value="grid" className="text-white">
                      Grid View
                    </SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-white/60 text-xs mt-1">
                  Grid view shows all demos as cards. Tabs view shows one demo at a time with navigation.
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="preview">
            <div className="bg-slate-900 rounded-md overflow-hidden mb-4">
              <div className="p-2 bg-slate-800 text-white/80 text-xs">Preview</div>
              <div className="p-4 flex justify-center">
                <div
                  className="border border-slate-700 rounded overflow-hidden"
                  style={{
                    width: Math.min(embedSize.width as number, 600),
                    height: Math.min(embedSize.height as number, 400),
                  }}
                >
                  <iframe
                    src={embedUrl}
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    title="InnovateHub AI Demos Preview"
                  />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="bg-slate-900 p-4 rounded-md mb-4">
          <pre className="text-white/80 text-sm overflow-x-auto whitespace-pre-wrap">{iframeCode}</pre>
        </div>

        <div className="flex justify-between items-center">
          <div className="text-white/60 text-sm">
            Size: {embedSize.width} × {embedSize.height}
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
