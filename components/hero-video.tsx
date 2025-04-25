"use client"

import { useRef } from "react"

interface HeroVideoProps {
  videoId: string
  title?: string
}

export default function HeroVideo({ videoId, title }: HeroVideoProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  return (
    <div className="w-full rounded-lg overflow-hidden shadow-xl mb-8">
      {title && <h2 className="text-2xl font-bold text-white mb-4 text-center">{title}</h2>}
      <div className="relative pb-[56.25%] h-0">
        <iframe
          ref={iframeRef}
          src={`https://player.vimeo.com/video/${videoId}?autoplay=1&loop=0&title=0&byline=0&portrait=0`}
          allow="autoplay; fullscreen; picture-in-picture"
          className="absolute top-0 left-0 w-full h-full rounded-lg"
          style={{ maxHeight: "70vh" }}
        ></iframe>
      </div>
    </div>
  )
}
