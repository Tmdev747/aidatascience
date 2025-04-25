"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function EmbedDemoPage() {
  const [module, setModule] = useState("intro")
  const [theme, setTheme] = useState("replitLight")

  // Base URL should be updated to your deployed Vercel app
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  const embedUrl = `${baseUrl}/embed/${module}?theme=${theme}`

  const modules = [
    { id: "intro", name: "Introduction" },
    { id: "machine-learning", name: "Machine Learning" },
    { id: "neural-networks", name: "Neural Networks" },
    { id: "nlp", name: "Natural Language Processing" },
    { id: "computer-vision", name: "Computer Vision" },
    { id: "applications", name: "Philippine Applications" },
    { id: "quiz", name: "Assessment" },
  ]

  const themes = [
    { id: "default", name: "Default (Dark)" },
    { id: "replitLight", name: "Replit Light" },
    { id: "replitDark", name: "Replit Dark" },
  ]

  const copyEmbedCode = () => {
    const code = `<iframe 
  src="${embedUrl}" 
  width="100%" 
  height="600px" 
  style="border: none; border-radius: 8px;" 
  scrolling="no"
  title="${modules.find((m) => m.id === module)?.name} Module"
></iframe>

<script>
  window.addEventListener('message', (event) => {
    // In production, verify the origin
    // if (event.origin !== '${baseUrl}') return;
    
    if (event.data.type === 'resize') {
      const iframe = document.querySelector('iframe[src*="/embed/"]');
      if (iframe) {
        iframe.style.height = \`\${event.data.height}px\`;
      }
    }
  });
</script>`

    navigator.clipboard.writeText(code)
    alert("Embed code copied to clipboard!")
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Embed Demo</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4">Module</h2>
            <Select value={module} onValueChange={setModule}>
              <SelectTrigger>
                <SelectValue placeholder="Select module" />
              </SelectTrigger>
              <SelectContent>
                {modules.map((m) => (
                  <SelectItem key={m.id} value={m.id}>
                    {m.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4">Theme</h2>
            <Select value={theme} onValueChange={setTheme}>
              <SelectTrigger>
                <SelectValue placeholder="Select theme" />
              </SelectTrigger>
              <SelectContent>
                {themes.map((t) => (
                  <SelectItem key={t.id} value={t.id}>
                    {t.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4">Embed Code</h2>
            <Button onClick={copyEmbedCode} className="w-full">
              Copy Embed Code
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Preview</h2>
        <div className="border rounded-lg overflow-hidden">
          <iframe
            src={embedUrl}
            width="100%"
            height="600px"
            style={{ border: "none" }}
            scrolling="no"
            title={`${modules.find((m) => m.id === module)?.name} Module`}
          />
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Integration Instructions</h2>
          <ol className="list-decimal pl-5 space-y-4">
            <li>
              <p className="mb-2">
                <strong>Copy the embed code</strong> using the button above.
              </p>
              <p>This code includes the iframe and a script to handle responsive height adjustments.</p>
            </li>
            <li>
              <p className="mb-2">
                <strong>Paste the code</strong> into your Replit application where you want the module to appear.
              </p>
              <p>The iframe will automatically resize to fit the content.</p>
            </li>
            <li>
              <p className="mb-2">
                <strong>Customize the appearance</strong> by changing the theme parameter in the URL.
              </p>
              <p>Available themes: default, replitLight, replitDark</p>
            </li>
            <li>
              <p className="mb-2">
                <strong>Add navigation</strong> between modules by updating the iframe src attribute.
              </p>
              <p>
                Example: <code>iframe.src = '${baseUrl}/embed/neural-networks?theme=replitLight';</code>
              </p>
            </li>
          </ol>
        </CardContent>
      </Card>
    </div>
  )
}
