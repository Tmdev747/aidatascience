"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Home, Brain, Network, MessageSquare, Eye, BarChart3, HelpCircle, Menu, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useMobile } from "@/hooks/use-mobile"

interface NavigationControlsProps {
  currentModule: string
  setCurrentModule: (module: string) => void
}

export default function NavigationControls({ currentModule, setCurrentModule }: NavigationControlsProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const { toast } = useToast()
  const isMobile = useMobile()

  const modules = [
    { id: "intro", name: "Introduction", icon: <Home className="mr-2" /> },
    { id: "machine-learning", name: "Machine Learning", icon: <Brain className="mr-2" /> },
    { id: "neural-networks", name: "Neural Networks", icon: <Network className="mr-2" /> },
    { id: "nlp", name: "Natural Language Processing", icon: <MessageSquare className="mr-2" /> },
    { id: "computer-vision", name: "Computer Vision", icon: <Eye className="mr-2" /> },
    { id: "applications", name: "Philippine Applications", icon: <BarChart3 className="mr-2" /> },
    { id: "quiz", name: "Assessment", icon: <HelpCircle className="mr-2" /> },
  ]

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  const handleModuleChange = (moduleId: string) => {
    setCurrentModule(moduleId)
    if (isMobile) {
      setMenuOpen(false)
    }

    toast({
      title: "Module Changed",
      description: `Navigating to ${modules.find((m) => m.id === moduleId)?.name}`,
      duration: 2000,
    })
  }

  return (
    <>
      {/* Mobile menu button */}
      {isMobile && (
        <Button
          variant="outline"
          size="icon"
          className="fixed top-4 right-4 z-50 bg-slate-800 text-white"
          onClick={toggleMenu}
        >
          {menuOpen ? <X /> : <Menu />}
        </Button>
      )}

      {/* Navigation menu */}
      <div
        className={`fixed left-0 top-0 h-full bg-slate-800/90 backdrop-blur-sm z-40 transition-all duration-300 ${
          isMobile ? (menuOpen ? "w-64" : "w-0 overflow-hidden") : "w-64"
        }`}
      >
        <div className="p-4">
          <h2 className="text-xl font-bold text-white mb-6 mt-4">AI in Data Science</h2>

          <div className="space-y-2">
            {modules.map((module) => (
              <Button
                key={module.id}
                variant={currentModule === module.id ? "default" : "ghost"}
                className={`w-full justify-start ${
                  currentModule === module.id ? "bg-blue-600 hover:bg-blue-700" : "text-white"
                }`}
                onClick={() => handleModuleChange(module.id)}
              >
                {module.icon}
                {module.name}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
