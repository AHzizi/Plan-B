"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import { SakuraPetals } from "@/components/sakura-petals"
import { Book3D } from "@/components/book-3d"
import { HeartCursor } from "@/components/heart-cursor"
import { FloatingSparkles } from "@/components/floating-sparkles"
import { GithubBadge } from "@/components/github-badge"
import { MusicPlayer } from "@/components/music-player" // Asumsi file sudah dipindah ke components/
import { motion, AnimatePresence } from "framer-motion"
import JSConfetti from 'js-confetti'

// --- 1. KOMPONEN HUJAN LOVE (Dibuat di sini agar dapat diakses oleh page.tsx) ---

interface RainParticle {
    id: number
    x: number
    delay: number
}

function HeartRain({ isVisible }: { isVisible: boolean }) {
    const [particles, setParticles] = useState<RainParticle[]>([])

    // Konfigurasi hujan love yang tidak terlalu ramai
    useEffect(() => {
        if (!isVisible) {
            setParticles([]);
            return;
        }

        const interval = setInterval(() => {
            const newParticle: RainParticle = {
                id: Date.now() + Math.random(),
                // Posisi X acak di seluruh lebar layar
                x: Math.random() * window.innerWidth,
                // Delay acak agar tidak serempak
                delay: Math.random() * 1.5,
            };

            setParticles((prev) => {
                // Batasi jumlah partikel yang terlihat agar tidak terlalu ramai
                const maxParticles = 10; 
                return [...prev, newParticle].slice(-maxParticles * 2); 
            });

            // Hapus partikel setelah animasi selesai
            setTimeout(() => {
                setParticles((prev) => prev.filter((p) => p.id !== newParticle.id));
            }, 5000); // 5 detik, sesuai durasi animasi
        }, 500); // Munculkan love setiap 0.5 detik

        return () => clearInterval(interval);
    }, [isVisible]);

    return (
        <div className="pointer-events-none fixed inset-0 z-[55]"> 
            <AnimatePresence>
                {particles.map((particle) => (
                    <motion.div
                        key={particle.id}
                        initial={{
                            opacity: 0,
                            scale: 0.5,
                            x: particle.x,
                            y: window.innerHeight, // Mulai dari bawah layar
                        }}
                        animate={{
                            opacity: [0, 1, 1, 0], // Muncul, tetap, lalu hilang
                            scale: [0.5, 1.2, 1], // Animasi membesar
                            y: window.innerHeight * 0.2, // Bergerak ke atas
                        }}
                        exit={{ opacity: 0 }}
                        transition={{ 
                            duration: 4, 
                            ease: "easeOut", 
                            delay: particle.delay 
                        }}
                        className="absolute text-rose-pink text-3xl"
                    >
                        ♥
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}

// --- 2. KOMPONEN SVG KUE DENGAN ANIMASI API LILIN ---

// Definisikan keyframes lilin (asumsi sudah ada di globals.css atau tambahkan di sini)
// Tambahkan class kustom untuk flicker lilin dan bounce kue di Tailwind config
const BirthdayCake23 = () => (
    <svg
        className="w-full h-full text-rose-pink animate-bounce-soft-svg" // <--- Animasi Bounce Halus
        viewBox="0 0 300 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        {/* Lilin Besar (Pink) */}
        <rect x="135" y="50" width="30" height="40" rx="5" fill="#FF7F7F" />
        
        {/* Api Lilin (Kuning) - Dengan Animasi Flicker */}
        <motion.path 
            initial={{ opacity: 1, scale: 1 }}
            animate={{ 
                opacity: [1, 0.9, 1.1, 0.95, 1], // Fluktuasi Opacity
                scale: [1, 0.98, 1.02, 1], // Fluktuasi Skala
            }}
            transition={{
                duration: 0.2,
                repeat: Infinity,
                ease: "easeInOut",
                repeatType: "reverse"
            }}
            d="M140 50 L155 30 L170 50 H140 Z" 
            fill="#FFD700" 
        />

        {/* Angka 23 (di lilin/kue, pakai text) */}
        <text x="132" y="80" fontFamily="sans-serif" fontSize="35" fontWeight="bold" fill="white">23</text>

        {/* Lapisan Kue */}
        <rect x="50" y="90" width="200" height="40" rx="10" fill="#F8B4C4" />
        <rect x="40" y="130" width="220" height="60" rx="10" fill="#FF7F7F" />
        <rect x="30" y="190" width="240" height="70" rx="10" fill="#F8B4C4" />
        
        {/* Hiasan Icing Drip (Putih) */}
        <path d="M50 130 C70 140, 90 120, 110 130 C130 140, 150 120, 170 130 C190 140, 210 120, 230 130 L250 130 L250 90 L50 90 Z" fill="white" />
    </svg>
);


const CAKE_SIZE_CLASS = "w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [showCake, setShowCake] = useState(true)
  const [isConfettiActive, setIsConfettiActive] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const confettiRef = useRef<JSConfetti | null>(null)

  useEffect(() => {
    setIsLoaded(true)
    confettiRef.current = new JSConfetti()
  }, [])

  useEffect(() => {
    const audioEl = document.querySelector('audio#bday-music-player') as HTMLAudioElement;
    if (audioEl) {
        audioRef.current = audioEl;
        audioEl.volume = 0.3;
        audioEl.loop = true;
    }
  }, [isLoaded]);


  const handleCakeClick = async () => {
    if (isConfettiActive) return

    setShowCake(false)
    setIsConfettiActive(true)

    if (document.documentElement.requestFullscreen) {
      await document.documentElement.requestFullscreen()
    }

    if (audioRef.current) {
        audioRef.current.play().catch(e => console.error("Gagal memutar musik:", e));
    }

    if (confettiRef.current) {
      // Confetti (Kertas)
      confettiRef.current.addConfetti({
        confettiRadius: 8,
        confettiNumber: 600,
        confettiColors: [
          '#FF7F7F',
          '#F8B4C4',
          '#FFFFFF',
          '#FFD700',
        ],
      });

      // Confetti (Sparkles/Bintang)
      confettiRef.current.addConfetti({
        confettiNumber: 100,
        confettiColors: ['#FFD700', '#FFFFFF', '#FFB6C1'],
        emojis: ['✨', '⭐'],
        emojiSize: 30,
      });
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-soft-pink via-background to-cream">
      <SakuraPetals />

      {/* Heart Cursor Trail */}
      <HeartCursor />

      {/* Floating Sparkles */}
      <FloatingSparkles />

      {/* MusicPlayer */}
      <MusicPlayer musicId="bday-music-player" isConfettiActive={isConfettiActive} />

      {/* KUE ULANG TAHUN di tengah layar, dengan gradient background */}
      {showCake && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm transition-opacity duration-500">
            {/* Hujan Love dari Bawah, hanya aktif saat kue terlihat */}
            <HeartRain isVisible={showCake} /> 
            
            {/* GRADIENT BACKGROUND DIBELAKANG KUE */}
            <motion.div
                className="absolute w-[20rem] h-[20rem] md:w-[25rem] md:h-[25rem] lg:w-[30rem] lg:h-[30rem] rounded-full 
                           bg-gradient-to-bl from-rose-pink/90 to-soft-pink/90 blur-2xl animate-spin-slow opacity-80"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 50 }}
            />
          <motion.div
            className={`relative z-10 cursor-pointer ${CAKE_SIZE_CLASS}`} // <-- Hapus animate-bounce-soft di sini
            onClick={handleCakeClick}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 10 }}
            whileHover={{ scale: 1.1 }}
          >
            <BirthdayCake23 /> {/* Bounce halus ditambahkan di dalam SVG */}
          </motion.div>
          <div className="font-[family-name:var(--font-dancing)] absolute top-[65%] text-lg md:text-xl text-rose-pink font-bold animate-pulse">
            Click Me 💌
          </div>
        </div>
      )}

      {/* Main Content */}
      <div
        className={`relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-8 transition-opacity duration-1000 ${
          isLoaded && !showCake ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="mb-8 text-center">
          <h1 className="mb-2 font-[family-name:var(--font-dancing)] text-4xl text-rose-pink drop-shadow-lg md:text-6xl">
            Happy Birthday
          </h1>
          <h2 className="font-sans text-2xl font-semibold text-foreground md:text-4xl">Ainul Ma'rifah</h2>
          <p className="mt-2 text-sm text-muted-foreground">A celebration of love</p>
        </div>

        <div className="relative">
          <div className="absolute -inset-8 rounded-full bg-rose-pink/20 blur-3xl animate-glow" />
          <Book3D />
        </div>

        <p className="mt-8 max-w-md text-center font-[family-name:var(--font-dancing)] text-xl text-muted-foreground">
          Click the book to open your birthday memories
        </p>
      </div>

      <GithubBadge />
    </main>
  )
}