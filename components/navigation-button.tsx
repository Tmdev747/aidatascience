"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

interface NavigationButtonProps {
  nextModule: string
}

export default function NavigationButton({ nextModule }: NavigationButtonProps) {
  const handleClick = () => {
    // Create a custom event to notify parent components about module change
    const event = new CustomEvent("changeModule", {
      detail: { module: nextModule },
    })
    window.dispatchEvent(event)

    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="fixed bottom-20 right-8 z-30">
      <Button onClick={handleClick} size="lg" className="bg-blue-600 hover:bg-blue-700 shadow-lg rounded-full px-6">
        Next Module
        <ArrowRight className="ml-2 h-5 w-5" />
      </Button>
    </div>
  )
}
