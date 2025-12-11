"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Heart } from "lucide-react"

interface PhotoPageProps {
  images: {
    src: string
    caption: string
  }[]
  pageNumber: number
  totalPages: number
}

function FloatingHeart({ x, y, onComplete }: { x: number; y: number; onComplete: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 1, scale: 0, x, y }}
      animate={{
        opacity: 0,
        scale: 1.5,
        y: y - 100,
        x: x + (Math.random() - 0.5) * 50,
      }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      onAnimationComplete={onComplete}
      className="pointer-events-none fixed z-[200]"
      style={{ left: 0, top: 0 }}
    >
      <Heart className="h-6 w-6 fill-rose-pink text-rose-pink" />
    </motion.div>
  )
}

export function PhotoPage({ images, pageNumber, totalPages }: PhotoPageProps) {
  const [floatingHearts, setFloatingHearts] = useState<{ id: number; x: number; y: number }[]>([])

  const handleImageClick = (e: React.MouseEvent) => {
    const x = e.clientX
    const y = e.clientY

    // Add multiple hearts
    const newHearts = Array.from({ length: 3 }, (_, i) => ({
      id: Date.now() + i,
      x: x + (Math.random() - 0.5) * 30,
      y: y + (Math.random() - 0.5) * 30,
    }))

    setFloatingHearts((prev) => [...prev, ...newHearts])
  }

  const removeHeart = (id: number) => {
    setFloatingHearts((prev) => prev.filter((h) => h.id !== id))
  }

  return (
    // Menggunakan 'flex-col flex-1' agar konten menempati seluruh ruang dan 'space-y-4' untuk jarak antar foto/caption.
    // Menghapus 'gap-3' dan menggantinya dengan 'space-y-4' pada kontainer utama untuk kontrol jarak yang lebih baik.
    <div className="flex h-full flex-col p-2 md:p-4">
        <h4 className="mb-3 font-[family-name:var(--font-dancing)] text-xl text-rose-pink/80 text-center">
            Our Beautiful Memories
        </h4>
        
        {/* Kontainer Utama untuk Foto & Caption, menggunakan flex-1 agar memenuhi ruang. */}
        <div className="flex flex-col flex-1 space-y-4 overflow-y-auto">
            {images.map((image, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                    
                    // !!! PERBAIKAN UTAMA: Hapus 'flex-1' dari sini agar kedua foto tidak berebut tinggi
                    // Gunakan tinggi yang relatif terhadap kontainer induk yang sudah fleksibel.
                    className="group relative flex flex-col" 
                >
                    {/* Photo Frame Container */}
                    <div
                        // Atur tinggi yang eksplisit agar kedua foto memiliki tinggi yang cukup dan seragam
                        // Misalnya, berikan tinggi 40-50% dari ruang yang tersedia pada kontainer yang menggunakan flex-1 di atas.
                        // Kita gunakan 'aspect-video' dan membiarkan flexbox mengatur tingginya, atau menetapkan tinggi:
                        // Saya gunakan aspect-video agar proporsi foto tetap bagus
                        className="relative w-full aspect-video overflow-hidden rounded-lg bg-white p-2 shadow-md transition-transform cursor-pointer group-hover:scale-[1.02]"
                        onClick={handleImageClick}
                    >
                        {/* Decorative tape */}
                        <div className="absolute -left-1 -top-1 h-5 w-8 rotate-[-20deg] bg-gold/40" />
                        <div className="absolute -right-1 -top-1 h-5 w-8 rotate-[20deg] bg-rose-pink/40" />

                        {/* Image */}
                        <div className="relative h-full w-full overflow-hidden rounded bg-soft-pink">
                            <Image
                                src={image.src || "/placeholder.svg"}
                                alt={image.caption}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            {/* Heart icon overlay on hover */}
                            <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all group-hover:bg-black/10">
                                <Heart className="h-8 w-8 text-white opacity-0 transition-opacity group-hover:opacity-70" />
                            </div>
                        </div>
                    </div>

                    {/* Caption - Pastikan caption berada di luar kontainer foto tetapi di dalam motion.div ini */}
                    <p className="mt-2 text-center font-[family-name:var(--font-dancing)] text-sm text-rose-pink/90">
                        "{image.caption}"
                    </p>
                </motion.div>
            ))}
        </div>
        
        {/* Nomor Halaman di bagian bawah (di luar kontainer foto/caption) */}
        <div className="mt-4 border-t border-rose-pink/10 pt-2 text-center">
            <span className="font-[family-name:var(--font-dancing)] text-sm text-rose-pink/60">
                Page {pageNumber} / {totalPages}
            </span>
        </div>
      
        {/* Floating hearts */}
        <AnimatePresence>
            {floatingHearts.map((heart) => (
              <FloatingHeart key={heart.id} x={heart.x} y={heart.y} onComplete={() => removeHeart(heart.id)} />
            ))}
        </AnimatePresence>
    </div>
  )
}