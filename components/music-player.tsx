// File: components/music-player.tsx

"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"

export function MusicPlayer({ musicId, isConfettiActive }: { musicId: string; isConfettiActive: boolean }) {
  const [isMuted, setIsMuted] = useState(true)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3
      audioRef.current.loop = true
    }
  }, [])
  
  useEffect(() => {
    if (isConfettiActive) {
        setIsMuted(false); 
    }
  }, [isConfettiActive]);


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

  if (!isConfettiActive) {
    return (
        <>
            <audio id={musicId} ref={audioRef} src="https://res.cloudinary.com/dntbcmcc3/video/upload/v1765022310/leehi-only-official-mv-eng-chn_kSEqvxrI_uxhlwg.mp3" preload="auto" />
        </>
    )
  }

  const buttonColor = '#ffdceb';

  return (
    <>
      <audio id={musicId} ref={audioRef} src="https://res.cloudinary.com/dntbcmcc3/video/upload/v1765022310/leehi-only-official-mv-eng-chn_kSEqvxrI_uxhlwg.mp3" preload="auto" />
      
      {/* Tombol Mute/Unmute dengan Emoji dan Warna Kustom */}
      <motion.button
        onClick={toggleMute}
        className="fixed right-4 top-4 z-50 flex h-12 w-12 items-center justify-center rounded-full text-white text-2xl shadow-md backdrop-blur-sm transition-all hover:shadow-xl animate-slow-bounce"
        style={{ 
            backgroundColor: isMuted ? buttonColor : buttonColor, // Warna dasar #e97eb3
            color: 'black', // Pastikan emoji/teks di dalamnya terlihat jelas
        }}
        whileHover={{ scale: 1.1, backgroundColor: '#f096c4' }} // Efek hover sedikit lebih cerah/gelap
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {isMuted ? "🔊" : "🤫"}
      </motion.button>
    </>
  )
}