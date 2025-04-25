"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Home, Brain, Network, MessageSquare, Eye, BarChart3, HelpCircle, Menu, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useMobile } from "@/hooks/use-mobile"
import Image from "next/image"

interface NavigationBarProps {
  currentModule: string
  setCurrentModule: (module: string) => void
}

export default function NavigationBar({ currentModule, setCurrentModule }: NavigationBarProps) {
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
    <header className="fixed top-0 w-full z-50">
      <div className="bg-slate-900/90 backdrop-blur-sm shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="flex items-center"
              >
                <div className="w-10 h-10 mr-3 relative">
                  <Image
                    src="/images/innovate-hub-logo.png"
                    alt="Innovate Hub Logo"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                </div>
                <div>
                  <h1 className="text-white font-bold text-lg">AI in Data Science</h1>
                  <p className="text-blue-300 text-xs">Batangas State University</p>
                </div>
              </motion.div>
            </div>

            {/* Desktop Navigation */}
            {!isMobile && (
              <nav className="hidden md:flex space-x-1">
                {modules.map((module) => (
                  <Button
                    key={module.id}
                    variant={currentModule === module.id ? "default" : "ghost"}
                    size="sm"
                    className={`${
                      currentModule === module.id ? "bg-blue-600 hover:bg-blue-700" : "text-white hover:bg-slate-800"
                    }`}
                    onClick={() => handleModuleChange(module.id)}
                  >
                    {module.icon}
                    <span className="hidden lg:inline">{module.name}</span>
                  </Button>
                ))}
              </nav>
            )}

            {/* Mobile menu button */}
            {isMobile && (
              <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? <X className="h-6 w-6 text-white" /> : <Menu className="h-6 w-6 text-white" />}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobile && (
        <motion.div
          initial={false}
          animate={menuOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-slate-800 overflow-hidden"
        >
          <div className="container mx-auto px-4 py-2">
            <nav className="flex flex-col space-y-1">
              {modules.map((module) => (
                <Button
                  key={module.id}
                  variant={currentModule === module.id ? "default" : "ghost"}
                  className={`justify-start ${
                    currentModule === module.id ? "bg-blue-600 hover:bg-blue-700" : "text-white"
                  }`}
                  onClick={() => handleModuleChange(module.id)}
                >
                  {module.icon}
                  {module.name}
                </Button>
              ))}
            </nav>
          </div>
        </motion.div>
      )}
    </header>
  )
}
