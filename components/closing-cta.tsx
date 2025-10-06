"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { useEffect, useRef, useState } from "react"
import { ArrowRight, Mail, MessageSquare } from "lucide-react"

export function ClosingCTA() {
  const [isVisible, setIsVisible] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!sectionRef.current) return
    const rect = sectionRef.current.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative overflow-hidden py-16 px-4 sm:py-20 md:py-24 lg:py-32 lg:px-8"
      onMouseMove={handleMouseMove}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40 transition-opacity duration-500"
        style={{
          background: `radial-gradient(1000px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(50, 168, 82, 0.5), transparent 20%)`,
        }}
      />

      <div className="relative mx-auto max-w-4xl text-center">
        <div
          className={`mb-6 sm:mb-8 inline-flex items-center gap-2 rounded-full border border-accent-green/30 bg-accent-green/5 px-4 py-2 text-xs sm:text-sm font-medium text-accent-green backdrop-blur-sm transition-all duration-800 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <MessageSquare className="h-3 w-3 sm:h-4 sm:w-4" />
          Available for new projects
        </div>

        <h2
          className={`mb-6 sm:mb-8 text-balance text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-tight text-foreground transition-all duration-800 ${
            isVisible ? "translate-y-0 scale-100 opacity-100" : "translate-y-8 scale-95 opacity-0"
          }`}
          style={{ transitionDelay: "0.1s" }}
        >
          Have an idea?
          <br />
          <span className="bg-gradient-to-r from-accent-green to-accent-green/70 bg-clip-text text-transparent">
            Let's make it happen.
          </span>
        </h2>

        <p
          className={`mb-8 sm:mb-12 text-balance text-base sm:text-lg md:text-xl leading-relaxed text-muted-foreground transition-all duration-800 px-4 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
          style={{ transitionDelay: "0.2s" }}
        >
          Whether you need a full product built or just want to chat about your next big thing, I'm here to help turn
          your vision into reality.
        </p>

        <div
          className={`flex flex-col items-center justify-center gap-4 sm:gap-5 sm:flex-row transition-all duration-800 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
          style={{ transitionDelay: "0.3s" }}
        >
          <Button
            size="lg"
            className="w-full sm:w-auto group rounded-full bg-foreground px-6 py-5 sm:px-8 sm:py-6 text-sm sm:text-base font-medium text-background transition-all duration-300 hover:scale-105 hover:bg-accent-green hover:shadow-2xl hover:shadow-accent-green/20"
            asChild
          >
            <a href="mailto:hello@aashish.dev" className="flex items-center gap-2">
              <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
              Get in Touch
              <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="w-full sm:w-auto rounded-full border-2 border-foreground/20 bg-transparent px-6 py-5 sm:px-8 sm:py-6 text-sm sm:text-base font-medium transition-all duration-300 hover:scale-105 hover:border-accent-green hover:bg-accent-green hover:text-white hover:shadow-xl"
            asChild
          >
            <a href="#projects">View My Work</a>
          </Button>
        </div>

        <div className="mt-12 sm:mt-16 md:mt-20 flex items-center justify-center gap-8 text-xs sm:text-sm text-muted-foreground">
          <div className="flex items-center gap-2 sm:gap-3 rounded-full border border-accent-green/20 bg-accent-green/5 px-3 py-1.5 sm:px-4 sm:py-2 backdrop-blur-sm">
            <div className="relative h-2 w-2 sm:h-2.5 sm:w-2.5">
              <div className="absolute inset-0 animate-ping rounded-full bg-accent-green opacity-75" />
              <div className="relative h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-accent-green" />
            </div>
            <span className="font-medium">Usually responds in 24h</span>
          </div>
        </div>
      </div>
    </section>
  )
}
