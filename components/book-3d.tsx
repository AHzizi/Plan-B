"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { BookOpen, Heart, ChevronLeft, ChevronRight } from "lucide-react"
import { PaperScrap } from "./paper-scrap"
import { PhotoPage } from "./photo-page"
import { ClosingPage } from "./closing-page"

const photos = [
  {
    images: [
      { src: "/romantic-couple-sunset-beach.jpg", caption: "Senyummu menerangi duniaku." },
      { src: "/couple-holding-hands-garden-flowers.jpg", caption: "Setiap momen bersamamu terasa begitu Sempurna." },
    ],
  },
  {
    images: [
      { src: "/couple-coffee-date-cozy-cafe.jpg", caption: "Kamu membuat hari-hari biasa menjadi indah." },
      { src: "/couple-laughing-together-happy.jpg", caption: "Perjalanan ini berarti segalanya bagiku." },
    ],
  },
  {
    images: [
      { src: "/couple-stargazing-romantic-night.jpg", caption: "Bersamamu, bahkan keheningan terasa lengkap." },
      { src: "/couple-dancing-romantic-evening.jpg", caption: "Pengen Sama Ainul Teruss." },
    ],
  },
  {
    images: [
      { 
        src: "/couple-walking-park-autumn.jpg", 
        caption: "Setiap jalan terasa indah bersamamu." 
      },
      { 
        src: "/couple-cooking-kitchen.png", 
        caption: "Kudu Ainul Ma'rifah" 
      },
    ],
  },
  {
    images: [
      { src: "/couple-watching-sunset-romantic.jpg", caption: "Selamanya saja tidak cukup bersamamu." },
      { src: "/couple-hugging-love-embrace.jpg", caption: "Kamulah rumahku." },
    ],
  },
  {
    images: [
      { src: "/couple-stargazing-night.png", caption: "Emuach Saayang🩷🩷" },
      { src: "/couple-coffee-date-cafe.jpg", caption: "Stay With me" },
    ],
  },
];


export function Book3D() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const pageFlipAudioRef = useRef<HTMLAudioElement>(null)
  const totalPages = photos.length + 2

  const playPageFlip = () => {
    if (pageFlipAudioRef.current) {
      pageFlipAudioRef.current.currentTime = 0
      pageFlipAudioRef.current.play().catch(() => {})
    }
  }

  const handleOpen = () => {
    if (!isOpen) {
      setIsOpen(true)
      setCurrentPage(0)
      playPageFlip()
    }
  }

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1)
      playPageFlip()
    }
  }

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
      playPageFlip()
    }
  }

  const closeBook = () => {
    setIsOpen(false)
    setCurrentPage(0)
    playPageFlip()
  }

  return (
    <div className="relative">
      {/* Page flip sound effect */}
      <audio
        ref={pageFlipAudioRef}
        src="#"
        preload="auto"
      />  

    <AnimatePresence mode="wait">
      {!isOpen ? (
        <motion.div
          key="closed-book"
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{
            scale: 1,
            opacity: 1,
            y: [0, -10, 0], // efek melayang naik turun
          }}
          exit={{ scale: 0.8, opacity: 0, rotateY: -90 }}
          transition={{
            duration: 0.5,
            y: {
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          className="cursor-pointer"
          onClick={handleOpen}
          whileHover={{ scale: 1.05, rotateY: 10 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Book Cover */}
          <div
            className="relative h-80 w-64 rounded-r-lg bg-gradient-to-br from-rose-pink to-primary shadow-2xl md:h-96 md:w-72"
            style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
          >
            {/* Book Spine */}
            <div className="absolute -left-4 top-0 h-full w-4 rounded-l-sm bg-gradient-to-r from-rose-pink/80 to-rose-pink" />

            {/* Gold Border */}
            <div className="absolute inset-2 rounded-r-lg border-2 border-gold/50" />

            {/* Book Title */}
            <div className="flex h-full flex-col items-center justify-center p-6 text-center">
              <Heart className="mb-4 h-12 w-12 text-gold animate-pulse" />
              <h3 className="mb-2 font-[family-name:var(--font-dancing)] text-2xl text-primary-foreground md:text-3xl">
                Sebuah Surat Untuk Ainul
              </h3>
              <p className="text-sm text-primary-foreground/80">Buku Kenangan</p>
              <BookOpen className="mt-6 h-8 w-8 text-gold/80" />
              <p className="mt-2 text-xs text-primary-foreground/60">Klik untuk Melihat</p>
            </div>

            {/* Decorative corners */}
            <div className="absolute left-4 top-4 h-8 w-8 border-l-2 border-t-2 border-gold/60 rounded-tl" />
            <div className="absolute right-4 top-4 h-8 w-8 border-r-2 border-t-2 border-gold/60 rounded-tr" />
            <div className="absolute bottom-4 left-4 h-8 w-8 border-b-2 border-l-2 border-gold/60 rounded-bl" />
            <div className="absolute bottom-4 right-4 h-8 w-8 border-b-2 border-r-2 border-gold/60 rounded-br" />
          </div>
        </motion.div>
      ) : (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/35"
            onClick={closeBook}
          />

          <motion.div
            key="open-book"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative z-50"
          >
            {/* Open Book Container */}
            <div className="relative flex h-[500px] w-[340px] flex-col rounded-lg bg-cream shadow-2xl md:h-[550px] md:w-[700px] md:flex-row">
              {/* Left Page */}
              <div className="hidden h-full w-1/2 rounded-l-lg border-r border-rose-pink/20 bg-gradient-to-r from-cream to-white p-6 md:block">
                <div className="flex h-full flex-col items-center justify-center">
                  <Heart className="mb-4 h-8 w-8 text-rose-pink/30" />
                  <p className="font-[family-name:var(--font-dancing)] text-lg text-muted-foreground">
                    {currentPage === 0
                      ? "Cerita Kita Mulai dari sini..."
                      : currentPage === totalPages - 1
                        ? "Pesanku Untukmu Saayang..."
                        : "Kenangan indah Kita Bersama"}
                  </p>
                  <p className="mt-4 text-sm text-muted-foreground/60">
                    Page {currentPage + 1}
                  </p>
                </div>
              </div>

              {/* Right Page / Main Content */}
              <div className="flex h-full w-full flex-col rounded-r-lg bg-white p-4 md:w-1/2 md:p-6">
                <AnimatePresence mode="wait">
                  {currentPage === 0 && (
                    <motion.div
                      key="paper-scrap"
                      initial={{ opacity: 0, rotateY: -90 }}
                      animate={{ opacity: 1, rotateY: 0 }}
                      exit={{ opacity: 0, rotateY: 90 }}
                      transition={{ duration: 0.4 }}
                      className="flex h-full items-center justify-center"
                    >
                      <PaperScrap />
                    </motion.div>
                  )}

                  {currentPage > 0 && currentPage <= photos.length && (
                    <motion.div
                      key={`photo-page-${currentPage}`}
                      initial={{ opacity: 0, rotateY: -90 }}
                      animate={{ opacity: 1, rotateY: 0 }}
                      exit={{ opacity: 0, rotateY: 90 }}
                      transition={{ duration: 0.4 }}
                      className="h-full"
                    >
                      <PhotoPage
                        images={photos[currentPage - 1].images}
                        pageNumber={currentPage + 1}
                        totalPages={totalPages}
                      />
                    </motion.div>
                  )}

                  {currentPage === totalPages - 1 && (
                    <motion.div
                      key="closing"
                      initial={{ opacity: 0, rotateY: -90 }}
                      animate={{ opacity: 1, rotateY: 0 }}
                      exit={{ opacity: 0, rotateY: 90 }}
                      transition={{ duration: 0.4 }}
                      className="h-full"
                    >
                      <ClosingPage />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Navigation */}
                <div className="mt-auto flex items-center justify-between border-t border-rose-pink/10 pt-4">
                  <button
                    onClick={prevPage}
                    disabled={currentPage === 0}
                    className="flex items-center gap-1 rounded-full bg-soft-pink px-3 py-1.5 text-sm text-rose-pink transition-all hover:bg-rose-pink hover:text-white disabled:opacity-30 disabled:hover:bg-soft-pink disabled:hover:text-rose-pink"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span className="hidden md:inline">Prev</span>
                  </button>

                  <span className="font-[family-name:var(--font-dancing)] text-sm text-muted-foreground">
                    {currentPage + 1} / {totalPages}
                  </span>

                  {currentPage < totalPages - 1 ? (
                    <button
                      onClick={nextPage}
                      className="flex items-center gap-1 rounded-full bg-soft-pink px-3 py-1.5 text-sm text-rose-pink transition-all hover:bg-rose-pink hover:text-white"
                    >
                      <span className="hidden md:inline">Next</span>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  ) : (
                    <button
                      onClick={closeBook}
                      className="flex items-center gap-1 rounded-full bg-gold px-3 py-1.5 text-sm text-white transition-all hover:bg-gold/80"
                    >
                      Close Book
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>

    </div>
  )
}
