"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

export default function AIConfig() {
  const [selectedModel, setSelectedModel] = useState("claude")
  const { toast } = useToast()

  // Load the saved model preference when the component mounts
  useEffect(() => {
    const savedModel = localStorage.getItem("innovatehub-ai-model")
    if (savedModel) {
      setSelectedModel(savedModel)
    }
  }, [])

  const handleSave = () => {
    // Save the selected model to localStorage
    localStorage.setItem("innovatehub-ai-model", selectedModel)

    toast({
      title: "AI Model Updated",
      description: `InnovateHub AI will now use ${selectedModel === "claude" ? "Claude 3 Opus" : "GPT-4o"} for all operations.`,
      duration: 3000,
    })
  }

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white">InnovateHub AI Configuration</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label className="text-white mb-2 block">Select AI Model</Label>
            <RadioGroup value={selectedModel} onValueChange={setSelectedModel} className="space-y-2">
              <div className="flex items-center space-x-2 bg-slate-700/50 p-3 rounded-md">
                <RadioGroupItem value="claude" id="claude" />
                <Label htmlFor="claude" className="text-white cursor-pointer">
                  Claude 3 Opus (Anthropic)
                </Label>
                <span className="ml-auto text-xs text-white/60">Recommended for complex reasoning</span>
              </div>
              <div className="flex items-center space-x-2 bg-slate-700/50 p-3 rounded-md">
                <RadioGroupItem value="gpt4o" id="gpt4o" />
                <Label htmlFor="gpt4o" className="text-white cursor-pointer">
                  GPT-4o (OpenAI)
                </Label>
                <span className="ml-auto text-xs text-white/60">Recommended for visual tasks</span>
              </div>
            </RadioGroup>
          </div>

          <div className="pt-4">
            <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
              Save Configuration
            </Button>
          </div>

          <div className="bg-slate-700/30 p-3 rounded-md text-sm text-white/80">
            <p>
              InnovateHub AI integrates multiple state-of-the-art language models to provide the best experience for
              different tasks. Select your preferred model based on your specific needs.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
