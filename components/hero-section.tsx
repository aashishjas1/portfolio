"use client"

import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export function HeroSection() {
  const [displayedText, setDisplayedText] = useState("")
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  const words = ["Code.", "Design.", "Interfaces.", "Systems.", "Strategy.", "UX."]

  useEffect(() => {
    const currentWord = words[currentWordIndex]
    const typingSpeed = isDeleting ? 50 : 100 // Faster when deleting
    const pauseAfterWord = 500 // Pause after completing a word

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          // Typing forward
          if (displayedText.length < currentWord.length) {
            setDisplayedText(currentWord.slice(0, displayedText.length + 1))
          } else {
            // Word complete, pause then start deleting
            setTimeout(() => setIsDeleting(true), pauseAfterWord)
          }
        } else {
          // Deleting backward
          if (displayedText.length > 0) {
            setDisplayedText(displayedText.slice(0, -1))
          } else {
            // Finished deleting, move to next word
            setIsDeleting(false)
            setCurrentWordIndex((prev) => (prev + 1) % words.length)
          }
        }
      },
      isDeleting ? typingSpeed : displayedText.length === currentWord.length ? pauseAfterWord : typingSpeed,
    )

    return () => clearTimeout(timeout)
  }, [displayedText, currentWordIndex, isDeleting, words])

  const [showTagline, setShowTagline] = useState(false)
  const [showButtons, setShowButtons] = useState(false)

  useEffect(() => {
    setTimeout(() => setShowTagline(true), 500)
    setTimeout(() => setShowButtons(true), 1000)
  }, [])

  return (
    <section className="relative flex min-h-screen items-center justify-center px-4 py-20 sm:px-6 lg:px-8">
      <div className="max-w-5xl text-center">
        <h1 className="mb-6 text-4xl font-bold leading-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl min-h-[1.2em]">
          <span className="inline-block text-5xl sm:text-6xl md:text-7xl lg:text-9xl">
            {displayedText}
            <span className="inline-block w-1 h-[0.9em] bg-accent-green ml-1 animate-pulse" />
          </span>
        </h1>

        {showTagline && (
          <p className="mb-8 animate-slide-left text-base text-muted-foreground sm:text-lg md:text-xl lg:text-2xl px-4">
            Crafting simple, powerful digital solutions.
          </p>
        )}

        {showButtons && (
          <div className="flex flex-col items-center justify-center gap-3 animate-fade-in sm:flex-row sm:gap-4">
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-2 border-accent-green text-foreground transition-all hover:scale-105 hover:bg-accent-green hover:text-black hover:scale-120 bg-transparent rounded-full"
              asChild
            >
              <a href="#projects">View Projects</a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-2 border-accent-green text-foreground transition-all hover:scale-105 hover:bg-accent-green hover:text-black hover:scale-120 bg-transparent rounded-full"
              asChild
            >
              <a href="#contact">Get in Touch</a>
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
