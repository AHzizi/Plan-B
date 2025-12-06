"use client"

import { motion } from "framer-motion"
import { Heart } from "lucide-react"

export function ClosingPage() {
  return (
    <div className="relative flex h-full flex-col items-center justify-center text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
      >
        <Heart className="mb-4 h-12 w-12 text-rose-pink animate-pulse" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-4"
      >
        <h3 className="font-[family-name:var(--font-dancing)] text-2xl text-rose-pink md:text-3xl">My Dearest Ainul</h3>

        <div className="max-w-xs space-y-3 font-[family-name:var(--font-dancing)] text-base leading-relaxed text-foreground md:text-lg">
          <p>Thank you for being the heart of my happiness.</p>
          <p>May your new age be filled with joy, blessings, and love.</p>
          <p>I'll cherish every chapter we write together.</p>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="pt-4">
          <p className="font-[family-name:var(--font-dancing)] text-lg text-gold">— With love, AHzizi</p>
        </motion.div>
      </motion.div>

      {/* Decorative animated hearts */}
      <motion.div
        className="absolute bottom-4 left-4 text-rose-pink/30"
        animate={{ y: [0, -5, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      >
        <Heart className="h-6 w-6" />
      </motion.div>
      <motion.div
        className="absolute right-4 top-4 text-gold/30"
        animate={{ y: [0, -8, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.5 }}
      >
        <Heart className="h-8 w-8" />
      </motion.div>
      <motion.div
        className="absolute bottom-8 right-8 text-rose-pink/20"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      >
        <Heart className="h-5 w-5" />
      </motion.div>
    </div>
  )
}
