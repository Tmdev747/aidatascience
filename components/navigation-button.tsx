"use client"

import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { useMobile } from "@/hooks/use-mobile"

interface NavigationButtonProps {
  nextModule: string
  label?: string
}

export default function NavigationButton({ nextModule, label = "Next Module" }: NavigationButtonProps) {
  const router = useRouter()
  const isMobile = useMobile()

  const handleNavigation = () => {
    // If we're using the same page with different states
    if (typeof window !== "undefined") {
      // Scroll to top when changing modules
      window.scrollTo(0, 0)

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
      className={`fixed z-50 bg-blue-600 hover:bg-blue-700 text-white shadow-lg flex items-center gap-1 animate-pulse hover:animate-none ${
        isMobile
          ? "bottom-16 right-4 px-3 py-2 text-sm rounded-lg"
          : "bottom-16 right-6 px-5 py-5 text-base rounded-full"
      }`}
    >
      {isMobile ? "Next" : label} <ChevronRight className={isMobile ? "h-4 w-4" : "h-5 w-5"} />
    </Button>
  )
}
