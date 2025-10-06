import type React from "react"
import type { Metadata } from "next"
import { Inter, IBM_Plex_Sans } from "next/font/google"
import "./globals.css"
import { Suspense } from "react"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const ibmPlex = IBM_Plex_Sans({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-ibm-plex",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Aashish - Portfolio",
  description: "Crafting simple, powerful digital solutions.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable} ${ibmPlex.variable} antialiased`}>
        <Suspense fallback={<div>Loading...</div>}>
          {children}
          {/* Analytics component temporarily removed to fix preview error */}
          {/* <Analytics /> */}
        </Suspense>
      </body>
    </html>
  )
}
