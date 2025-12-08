"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface Sparkle {
  id: number
  x: number
  y: number
  size: number
  delay: number
}

export function FloatingSparkles() {
  const [sparkles, setSparkles] = useState<Sparkle[]>([])

  useEffect(() => {
    const generateSparkles = () => {
      const newSparkles: Sparkle[] = []
      for (let i = 0; i < 20; i++) {
        newSparkles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 8 + 4,
          delay: Math.random() * 5,
        })
      }
      setSparkles(newSparkles)
    }

    generateSparkles()
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="absolute rounded-full bg-pink-300"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            width: sparkle.size,
            height: sparkle.size,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 7,
            delay: sparkle.delay,
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: Math.random() * 3 + 2,
          }}
        />
      ))}
    </div>
  )
}
