import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Dancing_Script } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

const dancing = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancing",
})

export const metadata: Metadata = {
  title: "Happy Birthday Ainul Ma'rifah 🌸",
  description: "A romantic birthday celebration for the love of my life",
  generator: "v0.app",
  
  // ===========================================
  // MODIFIKASI DIMULAI DI SINI
  // ===========================================
  
  // --- 0. KONFIGURASI ICON/FAVICON BARU ---
  icons: {
    // Ikon Utama (Favicon Standar/Universal)
    icon: [
      // SVG (Modern, Scalable)
      { url: '/icon.svg', type: 'image/svg+xml' }, 
      // PNG (Mode Terang, Ukuran Standar 32x32)
      { url: '/icon-light-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    // Tema Ikon (Untuk Dark/Light Mode Browser/OS)
    shortcut: [
        // Menggunakan dark mode icon sebagai ikon default shortcut (jika browser mendukung)
        { url: '/icon-dark-32x32.png', sizes: '32x32', media: '(prefers-color-scheme: dark)' },
        // Menggunakan light mode icon
        { url: '/icon-light-32x32.png', sizes: '32x32', media: '(prefers-color-scheme: light)' },
    ],
    // Apple Touch Icon (Untuk shortcut di Home Screen iOS)
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  
  // 1. OPEN GRAPH (OG) - Untuk Facebook, LinkedIn, dll.
  openGraph: {
    title: "🎊🎉🥳Selamat Ulang Tahun Ainul Ma'rifah💌🎉🎊",
    description: "Untuk My Calon Istri Ainul Ma'rifah Beloved💌",
    url: 'https://hbd-ainulmarifah.vercel.app/', // Ganti dengan URL domain Anda
    siteName: 'Happy Birthday Ainul Ma\'rifah',
    images: [
      {
        url: '/og.png', // Menggunakan file di public/og.png
        width: 1200,
        height: 630,
        alt: 'Ilustrasi Kejutan Ulang Tahun Romantis',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },

  // 2. TWITTER CARD - Untuk Twitter/X
  twitter: {
    card: 'summary_large_image', // Menampilkan gambar besar
    title: "Surprise! Ulang Tahun Spesial untuk Ainul Ma'rifah",
    description: "Buka tautan ini untuk kejutan ulang tahun yang romantis! 💖",
    images: ['/og.png'], // Harus mengarah ke gambar yang sama
  },
  // ===========================================
  // MODIFIKASI BERAKHIR DI SINI
  // ===========================================
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${dancing.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}