"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, Info } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ImageDescription {
  id: string
  module: string
  title: string
  description: string
  size: string
  path: string
}

export default function ImagePlaceholders() {
  const { toast } = useToast()
  const [showDetails, setShowDetails] = useState<string | null>(null)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied to clipboard",
      description: "Image description copied successfully",
      duration: 3000,
    })
  }

  const imageDescriptions: ImageDescription[] = [
    {
      id: "intro-hero",
      module: "intro",
      title: "AI in Philippine Context - Hero Image",
      description:
        "A panoramic view of Manila's skyline with digital neural network overlays connecting key buildings. " +
        "In the foreground, Filipino students from Batangas State University are working with tablets and laptops " +
        "displaying data visualizations. The image should include iconic Philippine elements like the jeepney " +
        "reimagined with AI sensors and the Philippine flag colors (blue, red, yellow) integrated into the digital elements. " +
        "The overall mood should be forward-looking and optimistic, representing the fusion of Filipino culture with advanced technology.",
      size: "1200x600",
      path: "/images/ph-ai-hero.jpg",
    },
    {
      id: "ml-agriculture",
      module: "machine-learning",
      title: "Machine Learning in Philippine Agriculture",
      description:
        "Aerial view of rice terraces in the Philippines (similar to Banaue but could be from Batangas region) " +
        "with digital overlay showing crop analysis patterns. Filipino farmers are seen using tablets to analyze soil data. " +
        "Visual elements should include: weather prediction models, crop yield forecasts using charts with Tagalog labels, " +
        "and local crops like rice, coconut, and mangoes being analyzed. Include BSU students working alongside farmers " +
        "implementing the technology. The color palette should include greens of the terraces and blues of technology interfaces.",
      size: "600x400",
      path: "/images/ph-ml-agriculture.jpg",
    },
    {
      id: "neural-networks",
      module: "neural-networks",
      title: "Neural Networks and Filipino Innovation",
      description:
        "A stylized brain composed of interconnected nodes with Filipino innovation symbols flowing through the neural pathways. " +
        "The nodes should include small icons representing Philippine industries (tourism, agriculture, manufacturing, BPO). " +
        "Filipino tech professionals and students in BSU uniforms are shown collaborating around a holographic display of the neural network. " +
        "The background should include subtle elements of Filipino textiles like the Inabel or T'nalak patterns integrated into the network design. " +
        "Use purple and blue gradient for the neural connections with gold highlights representing Filipino creativity.",
      size: "800x600",
      path: "/images/ph-neural-networks.jpg",
    },
    {
      id: "nlp-filipino",
      module: "nlp",
      title: "Natural Language Processing for Filipino Languages",
      description:
        "A visual representation of NLP processing Filipino languages. The image should show text in Tagalog, Cebuano, Ilocano, and other " +
        "Philippine languages flowing into a central AI processor. Speech bubbles with Filipino phrases should be shown being analyzed with " +
        "sentiment markers and translation outputs. Include Filipino linguists and computer scientists (with diverse Filipino features) " +
        "working on language models. The background should feature a map of the Philippines with different language regions highlighted. " +
        "Include visual elements of Baybayin (ancient Filipino script) being digitally processed alongside modern text.",
      size: "800x600",
      path: "/images/ph-nlp-languages.jpg",
    },
    {
      id: "cv-traffic",
      module: "computer-vision",
      title: "Computer Vision for Manila Traffic Management",
      description:
        "An overhead view of a busy Manila intersection (like EDSA) with computer vision elements analyzing traffic patterns. " +
        "The image should show Filipino-style vehicles (jeepneys, tricycles, buses) being detected and tracked by AI. " +
        "Include visual overlays showing vehicle classification, density heat maps, and predicted traffic flow. " +
        "A control center with Filipino traffic engineers should be visible monitoring the system. " +
        "The scene should capture the unique chaos of Manila traffic while showing how AI brings order through analysis. " +
        "Include BSU engineering students participating in a traffic management project with MMDA personnel.",
      size: "800x600",
      path: "/images/ph-cv-traffic.jpg",
    },
    {
      id: "disaster-response",
      module: "applications",
      title: "AI for Typhoon Disaster Response",
      description:
        "A split-screen image showing before and during a typhoon scenario in the Philippines. AI systems are analyzing " +
        "satellite imagery and social media data to coordinate disaster response. Filipino rescue workers with tablets " +
        "are shown receiving AI-generated maps of priority areas. Include visual elements of Filipino resilience with " +
        "community members working alongside technology. The image should show flooding typical of Philippine typhoons " +
        "with AI overlays identifying stranded people, safe routes, and resource distribution points. " +
        "Use actual Philippine geography (like a recognizable coastline) and include Filipino emergency response vehicles.",
      size: "800x600",
      path: "/images/ph-disaster-response.jpg",
    },
    {
      id: "healthcare-rural",
      module: "applications",
      title: "AI Healthcare Solutions for Rural Philippines",
      description:
        "A scene in a rural Philippine health center (bamboo and concrete structure with Filipino architectural elements) " +
        "where healthcare workers are using AI diagnostic tools on tablets to analyze patient symptoms. " +
        "The image should show Filipino healthcare workers in traditional white uniforms using mobile devices to scan " +
        "patients. Include visual elements of telemedicine connecting to doctors in Manila hospitals. " +
        "The background should show the typical Philippine rural landscape with nipa huts and palm trees. " +
        "Medical data visualizations should be visible on screens with Tagalog labels. " +
        "Include BSU medical and engineering students participating in the rural healthcare initiative.",
      size: "800x600",
      path: "/images/ph-healthcare-rural.jpg",
    },
    {
      id: "bsu-ai-lab",
      module: "intro",
      title: "Batangas State University AI Laboratory",
      description:
        "A modern computer laboratory at Batangas State University with Filipino students working on AI projects. " +
        "The lab should feature the BSU logo prominently and school colors. Students of diverse Filipino ethnicities " +
        "should be shown collaborating on data science projects with visualizations on large screens. " +
        "Include professors guiding students with AI models. The room should have a distinctly Philippine academic " +
        "environment with local elements like capiz shell window designs modernized in the architecture. " +
        "Show both male and female Filipino students actively engaged in coding and analysis, wearing BSU uniforms or IDs.",
      size: "800x600",
      path: "/images/bsu-ai-lab.jpg",
    },
    {
      id: "filipino-nlp-sentiment",
      module: "nlp",
      title: "Filipino Social Media Sentiment Analysis",
      description:
        "A visualization of Filipino social media posts being analyzed for sentiment. The image should show " +
        "actual Filipino social media interfaces (similar to Facebook, Twitter) with Taglish (Tagalog-English) " +
        "posts flowing into an analysis engine. Emojis and Filipino expressions should be highlighted with " +
        "sentiment scores. Include a map of the Philippines showing regional sentiment differences on a topic " +
        "(like transportation or education). Filipino data scientists should be shown monitoring the analysis " +
        "dashboard. Use authentic Filipino social media conventions and slang terms in the visible posts.",
      size: "800x600",
      path: "/images/filipino-sentiment-analysis.jpg",
    },
    {
      id: "smart-farming",
      module: "applications",
      title: "Smart Farming in Batangas",
      description:
        "An aerial view of Batangas farmland with smart farming technology in action. Show Filipino farmers " +
        "using smartphones to control irrigation systems and monitor crop health. Include drone imagery " +
        "analyzing crops with computer vision highlighting different crop health statuses. The landscape " +
        "should be authentically Batangas with its characteristic rolling terrain and mix of crops. " +
        "Include visual elements of traditional Filipino farming tools alongside modern technology. " +
        "BSU agricultural students should be visible conducting field research with sensors and tablets. " +
        "Use warm lighting suggesting early morning or late afternoon Filipino farm work.",
      size: "800x600",
      path: "/images/batangas-smart-farming.jpg",
    },
  ]

  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold text-white mb-6">Philippine-Specific AI Images</h2>
      <p className="text-white/80 mb-8">
        The following image descriptions are tailored specifically for the Philippine context of your AI in Data Science
        presentation. Use these descriptions to generate or source appropriate images that will resonate with your
        Batangas State University audience.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {imageDescriptions.map((image) => (
          <Card key={image.id} className="bg-slate-800/50 border-slate-700 overflow-hidden">
            <div className="aspect-video bg-slate-700 relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-4">
                  <p className="text-white/60 text-sm">Placeholder for</p>
                  <h3 className="text-white font-bold">{image.title}</h3>
                  <p className="text-white/60 text-xs mt-1">{image.size}</p>
                </div>
              </div>
              <div className="absolute bottom-2 right-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-slate-800/80 text-white rounded-full h-8 w-8"
                  onClick={() => setShowDetails(showDetails === image.id ? null : image.id)}
                >
                  <Info className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/60">Module: {image.module}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs"
                  onClick={() => copyToClipboard(image.description)}
                >
                  <Copy className="h-3 w-3 mr-1" /> Copy
                </Button>
              </div>

              {showDetails === image.id && (
                <div className="mt-3 p-3 bg-slate-700/50 rounded-md text-sm text-white/80">
                  <p>{image.description}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
