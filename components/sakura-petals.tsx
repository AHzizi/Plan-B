"use client"

import { useEffect, useRef } from "react"

interface Petal {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  rotation: number
  rotationSpeed: number
  opacity: number
}

export function SakuraPetals() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const petals: Petal[] = []
    const petalCount = 60

    // Initialize petals
    for (let i = 0; i < petalCount; i++) {
      petals.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        size: Math.random() * 15 + 8,
        speedX: Math.random() * 2 - 1,
        speedY: Math.random() * 3 + 2,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: Math.random() * 0.05 - 0.025,
        opacity: Math.random() * 0.5 + 0.5,
      })
    }

    const drawPetal = (petal: Petal) => {
      ctx.save()
      ctx.translate(petal.x, petal.y)
      ctx.rotate(petal.rotation)
      ctx.globalAlpha = petal.opacity

      // Draw petal shape
      ctx.beginPath()
      ctx.fillStyle = `rgba(255, 182, 193, ${petal.opacity})`
      ctx.moveTo(0, 0)
      ctx.bezierCurveTo(petal.size / 2, -petal.size / 2, petal.size, -petal.size / 4, petal.size, 0)
      ctx.bezierCurveTo(petal.size, petal.size / 4, petal.size / 2, petal.size / 2, 0, 0)
      ctx.fill()

      // Add gradient overlay
      const gradient = ctx.createRadialGradient(petal.size / 2, 0, 0, petal.size / 2, 0, petal.size)
      gradient.addColorStop(0, "rgba(255, 220, 225, 0.8)")
      gradient.addColorStop(1, "rgba(255, 182, 193, 0)")
      ctx.fillStyle = gradient
      ctx.fill()

      ctx.restore()
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      petals.forEach((petal) => {
        petal.x += petal.speedX + Math.sin(petal.y * 0.01) * 0.5
        petal.y += petal.speedY
        petal.rotation += petal.rotationSpeed

        // Reset petal when it goes off screen
        if (petal.y > canvas.height + petal.size) {
          petal.y = -petal.size
          petal.x = Math.random() * canvas.width
        }
        if (petal.x > canvas.width + petal.size) {
          petal.x = -petal.size
        }
        if (petal.x < -petal.size) {
          petal.x = canvas.width + petal.size
        }

        drawPetal(petal)
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-0" />
}
