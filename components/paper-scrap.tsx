"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

export function PaperScrap() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <>
      {/* Paper Scrap Thumbnail */}
      <motion.div
        className="relative cursor-pointer"
        onClick={() => setIsExpanded(true)}
        whileHover={{ scale: 1.05, rotate: 2 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="relative h-40 w-32 rotate-3 rounded-sm bg-gradient-to-br from-cream to-soft-pink p-4 shadow-lg md:h-48 md:w-40">
          {/* Torn edge effect */}
          <div className="absolute -top-1 left-0 right-0 h-2 bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2020%204%22%3E%3Cpath%20fill%3D%22%23fef7f8%22%20d%3D%22M0%204L2%200L4%204L6%200L8%204L10%200L12%204L14%200L16%204L18%200L20%204V4H0Z%22/%3E%3C/svg%3E')]" />

          <p className="font-[family-name:var(--font-dancing)] text-sm text-rose-pink md:text-base">
            Pesan Spesial Menunggumu Saayang....
          </p>
          <p className="mt-2 text-xs text-muted-foreground">Baca Aku 💕</p>

          {/* Decorative tape */}
          <div className="absolute -right-2 -top-2 h-8 w-12 rotate-12 bg-gold/30" />
        </div>
      </motion.div>

      {/* Expanded Paper Modal */}
      <AnimatePresence>
        {isExpanded && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-foreground/50 backdrop-blur-sm"
              onClick={() => setIsExpanded(false)}
            />

            {/* Expanded Paper */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0, rotate: 5 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.5, opacity: 0, rotate: -5 }}
              className="fixed left-1/2 top-1/2 z-[101] -translate-x-1/2 -translate-y-1/2"
            >
              <div className="relative w-80 rounded-sm bg-gradient-to-br from-cream via-white to-soft-pink p-8 shadow-2xl md:w-96">
                {/* Close button */}
                <button
                  onClick={() => setIsExpanded(false)}
                  className="absolute -right-3 -top-3 rounded-full bg-rose-pink p-2 text-white shadow-lg transition-transform hover:scale-110"
                >
                  <X className="h-4 w-4" />
                </button>

                {/* Torn edge */}
                <div className="absolute -top-1 left-0 right-0 h-3 bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2020%204%22%3E%3Cpath%20fill%3D%22%23fef7f8%22%20d%3D%22M0%204L2%200L4%204L6%200L8%204L10%200L12%204L14%200L16%204L18%200L20%204V4H0Z%22/%3E%3C/svg%3E')]" />

                {/* Content */}
                <div className="text-center">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h3 className="mb-6 font-[family-name:var(--font-dancing)] text-3xl text-rose-pink md:text-4xl">
                      Selamat Ulang Tahun
                    </h3>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="space-y-4 font-[family-name:var(--font-dancing)] text-lg leading-relaxed text-foreground md:text-xl"
                  >
                    <p>Ainul Ma'rifah,</p>
                    <p>Terima Kasih Telah Mewarnai Duniaku Setap Hari 😘, Setap Hari Aku Semakin Menyayangimu🩷</p>
                    <p>Kamu adalah bagian terindah dalam kisah hidupku.</p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mt-6 text-2xl"
                  >
                    💕
                  </motion.div>
                </div>

                {/* Decorative tape */}
                <div className="absolute -left-3 top-6 h-10 w-6 -rotate-45 bg-gold/40" />
                <div className="absolute -right-3 bottom-6 h-10 w-6 rotate-45 bg-gold/40" />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
