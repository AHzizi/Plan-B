"use client"

import { motion } from "framer-motion"
import { Github } from "lucide-react"

export function GithubBadge() {
  return (
    <motion.a
      href="https://github.com/AHzizi"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 left-4 z-[70] flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 shadow-lg backdrop-blur-sm transition-all hover:bg-rose-pink hover:text-white"
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
    >
      <Github className="h-5 w-5" />
      <span className="text-sm font-medium">AHzizi</span>
    </motion.a>
  )
}
