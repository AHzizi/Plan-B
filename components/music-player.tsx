"use client"

import { useState, useRef, useEffect } from "react"
import { Volume2, VolumeX } from "lucide-react"
import { motion } from "framer-motion"

export function MusicPlayer() {
  const [isMuted, setIsMuted] = useState(true)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3
      audioRef.current.loop = true
    }
  }, [])

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.play()
        setIsMuted(false)
      } else {
        audioRef.current.pause()
        setIsMuted(true)
      }
    }
  }

  return (
    <>
      <audio ref={audioRef} src="https://res.cloudinary.com/dntbcmcc3/video/upload/v1765022310/leehi-only-official-mv-eng-chn_kSEqvxrI_uxhlwg.mp3" preload="auto" />
      <motion.button
        onClick={toggleMute}
        className="fixed right-4 top-4 z-50 flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 shadow-lg backdrop-blur-sm transition-all hover:bg-white hover:shadow-xl"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {isMuted ? <VolumeX className="h-5 w-5 text-rose-pink" /> : <Volume2 className="h-5 w-5 text-rose-pink" />}
        <span className="text-sm text-foreground">{isMuted ? "Play Music" : "Mute"}</span>
      </motion.button>
    </>
  )
}
