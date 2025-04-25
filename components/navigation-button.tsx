"use client"

import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation"

interface NavigationButtonProps {
  nextModule: string
  label?: string
}

export default function NavigationButton({ nextModule, label = "Next Module" }: NavigationButtonProps) {
  const router = useRouter()

  const handleNavigation = () => {
    // If we're using the same page with different states
    if (typeof window !== "undefined") {
      // Dispatch a custom event that the parent component can listen for
      const event = new CustomEvent("changeModule", {
        detail: { module: nextModule },
      })
      window.dispatchEvent(event)
    }
  }

  return (
    <Button
      onClick={handleNavigation}
      className="fixed bottom-16 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white px-6 py-6 rounded-full shadow-lg flex items-center gap-2 text-lg animate-pulse hover:animate-none"
    >
      {label} <ChevronRight className="h-5 w-5" />
    </Button>
  )
}
