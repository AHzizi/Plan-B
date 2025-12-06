"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface HeartParticle {
  id: number
  x: number
  y: number
}

export function HeartCursor() {
  const [hearts, setHearts] = useState<HeartParticle[]>([])

  useEffect(() => {
    let heartId = 0
    let lastTime = 0
    const throttleMs = 50

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now()
      if (now - lastTime < throttleMs) return
      lastTime = now

      const newHeart: HeartParticle = {
        id: heartId++,
        x: e.clientX,
        y: e.clientY,
      }

      setHearts((prev) => [...prev.slice(-15), newHeart])

      // Remove heart after animation
      setTimeout(() => {
        setHearts((prev) => prev.filter((h) => h.id !== newHeart.id))
      }, 1000)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-[60]">
      <AnimatePresence>
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            initial={{
              opacity: 1,
              scale: 0.5,
              x: heart.x - 8,
              y: heart.y - 8,
            }}
            animate={{
              opacity: 0,
              scale: 1.5,
              y: heart.y - 50,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute text-rose-pink"
          >
            ♥
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
