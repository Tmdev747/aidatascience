"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, Check } from "lucide-react"

export default function EmbedHelper() {
  const [copied, setCopied] = useState(false)
  const [embedSize, setEmbedSize] = useState("medium")

  const baseUrl = typeof window !== "undefined" ? window.location.origin : ""
  const embedUrl = `${baseUrl}/embed`

  const embedSizes = {
    small: { width: 400, height: 500 },
    medium: { width: 600, height: 700 },
    large: { width: 800, height: 900 },
    responsive: { width: "100%", height: 700 },
  }

  const currentSize = embedSizes[embedSize as keyof typeof embedSizes]

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
        <p className="text-white/80 mb-4">Copy the code below to embed the AI demos in your website or application.</p>

        <Tabs value={embedSize} onValueChange={setEmbedSize} className="mb-4">
          <TabsList className="bg-slate-700">
            <TabsTrigger value="small">Small</TabsTrigger>
            <TabsTrigger value="medium">Medium</TabsTrigger>
            <TabsTrigger value="large">Large</TabsTrigger>
            <TabsTrigger value="responsive">Responsive</TabsTrigger>
          </TabsList>
        </Tabs>

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
