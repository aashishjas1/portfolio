"use client"

import { useEffect, useRef, useState } from "react"

const skills = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Node.js",
  "Python",
  "PostgreSQL",
  "MongoDB",
  "GraphQL",
  "Docker",
  "AWS",
  "Git",
  "Figma",
  "Vercel",
]

export function TechSkills() {
  const [isVisible, setIsVisible] = useState(false)
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

  return (
    <section ref={sectionRef} className="bg-about-bg py-12 px-4 sm:py-16 md:py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-8 text-center font-bold text-foreground text-3xl sm:text-4xl md:text-5xl lg:text-6xl sm:mb-12 md:mb-16">
          Tech Stack
        </h2>

        <div className="relative">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4">
            {skills.map((skill, index) => (
              <div
                key={skill}
                className={`group relative cursor-default rounded-full border-2 border-accent-green/20 bg-card px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 transition-all duration-500 hover:scale-120 hover:border-accent-green hover:bg-accent-green/10 hover:shadow-lg ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
                style={{
                  transitionDelay: `${index * 0.05}s`,
                }}
              >
                <span className="text-sm sm:text-base md:text-lg font-medium text-foreground transition-colors group-hover:text-accent-green">
                  {skill}
                </span>
                <div className="absolute inset-0 rounded-full bg-accent-green opacity-0 blur-xl transition-opacity group-hover:opacity-20" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
