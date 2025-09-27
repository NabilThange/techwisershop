"use client"

import { useState } from "react"
import { Play, Youtube } from "lucide-react"
import { Button } from "@/components/ui/button"

interface YouTubeEmbedProps {
  videoId: string
  title: string
  thumbnail?: string
  className?: string
  autoplay?: boolean
}

export function YouTubeEmbed({ videoId, title, thumbnail, className = "", autoplay = false }: YouTubeEmbedProps) {
  const [isLoaded, setIsLoaded] = useState(autoplay)

  const thumbnailUrl = thumbnail || `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`

  if (!isLoaded) {
    return (
      <div className={`relative aspect-video overflow-hidden rounded-lg bg-muted ${className}`}>
        <img
          src={thumbnailUrl || "/placeholder.svg"}
          alt={title}
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <Button size="lg" className="bg-red-600 hover:bg-red-700" onClick={() => setIsLoaded(true)}>
            <Play className="mr-2 h-6 w-6" />
            Watch Review
          </Button>
        </div>
        <div className="absolute bottom-4 right-4">
          <Youtube className="h-8 w-8 text-red-600" />
        </div>
      </div>
    )
  }

  return (
    <div className={`aspect-video overflow-hidden rounded-lg ${className}`}>
      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=${autoplay ? 1 : 0}&rel=0&modestbranding=1`}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="h-full w-full"
        loading="lazy"
      />
    </div>
  )
}
