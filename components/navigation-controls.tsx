"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface NavigationControlsProps {
  activeModule: string
  onModuleChange: (module: string) => void
  modules: string[]
}

export default function NavigationControls({ activeModule, onModuleChange, modules }: NavigationControlsProps) {
  const currentIndex = modules.indexOf(activeModule)
  const hasPrevious = currentIndex > 0
  const hasNext = currentIndex < modules.length - 1

  const handlePrevious = () => {
    if (hasPrevious) {
      onModuleChange(modules[currentIndex - 1])
    }
  }

  const handleNext = () => {
    if (hasNext) {
      onModuleChange(modules[currentIndex + 1])
    }
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-900/80 backdrop-blur-md border-t border-slate-800 py-4 z-40">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Button variant="outline" onClick={handlePrevious} disabled={!hasPrevious} className="flex items-center">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>

        <div className="flex space-x-1">
          {modules.map((module, index) => (
            <div
              key={module}
              className={`h-2 w-2 rounded-full ${index === currentIndex ? "bg-blue-500" : "bg-slate-600"}`}
            />
          ))}
        </div>

        <Button
          variant={hasNext ? "default" : "outline"}
          onClick={handleNext}
          disabled={!hasNext}
          className={`flex items-center ${hasNext ? "bg-blue-600 hover:bg-blue-700" : ""}`}
        >
          Next
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
