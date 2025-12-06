"use client"

import { useState, useEffect } from "react"
import { SakuraPetals } from "@/components/sakura-petals"
import { Book3D } from "@/components/book-3d"
import { HeartCursor } from "@/components/heart-cursor"
import { FloatingSparkles } from "@/components/floating-sparkles"
import { GithubBadge } from "@/components/github-badge"
import { MusicPlayer } from "@/components/music-player"

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-soft-pink via-background to-cream">
      <SakuraPetals />

      {/* Heart Cursor Trail */}
      <HeartCursor />

      {/* Floating Sparkles */}
      <FloatingSparkles />

      <MusicPlayer />

      {/* Main Content */}
      <div
        className={`relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-8 transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}
      >
        {/* Title */}
        <div className="mb-8 text-center">
          <h1 className="mb-2 font-[family-name:var(--font-dancing)] text-4xl text-rose-pink drop-shadow-lg md:text-6xl">
            Happy Birthday
          </h1>
          <h2 className="font-sans text-2xl font-semibold text-foreground md:text-4xl">Ainul Ma'rifah</h2>
          <p className="mt-2 text-sm text-muted-foreground">A celebration of love</p>
        </div>

        {/* 3D Book */}
        <div className="relative">
          <div className="absolute -inset-8 rounded-full bg-rose-pink/20 blur-3xl animate-glow" />
          <Book3D />
        </div>

        {/* Subtitle */}
        <p className="mt-8 max-w-md text-center font-[family-name:var(--font-dancing)] text-xl text-muted-foreground">
          Click the book to open your birthday memories
        </p>
      </div>

      {/* GitHub Badge */}
      <GithubBadge />
    </main>
  )
}
