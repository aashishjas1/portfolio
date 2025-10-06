"use client"

import { useEffect, useRef, useState } from "react"
import { Sparkles, Heart, Zap } from "lucide-react"

export function PhilosophySection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

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

  const principles = [
    {
      icon: Sparkles,
      title: "Simplicity First",
      description: "Technology should simplify life, not complicate it. Every line of code serves a purpose.",
    },
    {
      icon: Heart,
      title: "Human-Centered",
      description: "Building products that people love to use, with empathy and attention to detail.",
    },
    {
      icon: Zap,
      title: "Impact Driven",
      description: "Creating solutions that empower people and make a meaningful difference.",
    },
  ]

  return (
    <div ref={sectionRef} className="py-12 px-4 sm:py-16 md:py-20 lg:py-24 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <h2
          className={`mb-3 sm:mb-4 text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground transition-all duration-800 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          My{" "}
          <span className="bg-gradient-to-r from-accent-green to-accent-green/70 bg-clip-text text-black">
            Philosophy
          </span>
        </h2>

        <p
          className={`mb-8 sm:mb-12 md:mb-16 text-center text-sm sm:text-base md:text-lg text-muted-foreground transition-all duration-800 px-4 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
          style={{ transitionDelay: "0.1s" }}
        >
          The principles that guide my work
        </p>

        <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {principles.map((principle, index) => {
            const Icon = principle.icon
            return (
              <div
                key={index}
                className={`group relative overflow-hidden border-foreground/10 bg-background p-6 sm:p-8 transition-all duration-800 hover:scale-105 hover:border-accent-green/30 hover:shadow-2xl hover:shadow-accent-green/5 border-2 rounded-4xl shadow-xs ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
                }`}
                style={{ transitionDelay: `${0.2 + index * 0.1}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent-green/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-full" />

                <div className="relative">
                  <div className="mb-4 sm:mb-6 inline-flex rounded-2xl bg-accent-green/10 p-3 sm:p-4 transition-all duration-300 group-hover:scale-110 group-hover:bg-accent-green/20">
                    <Icon className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-accent-green" />
                  </div>

                  <h3 className="mb-2 sm:mb-3 text-xl sm:text-2xl font-bold text-foreground">{principle.title}</h3>

                  <p className="leading-relaxed text-sm sm:text-base text-muted-foreground">{principle.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
