"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useRef, useState } from "react"

const education = [
  {
    degree: "Bachelor of Computer Science",
    institution: "University of Technology",
    year: "2018 - 2022",
  },
  {
    degree: "Full Stack Development Bootcamp",
    institution: "Tech Academy",
    year: "2022",
  },
]

export function EducationSection() {
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

  return (
    <div ref={sectionRef} className="py-12 px-4 sm:py-16 md:py-20 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-8 sm:mb-10 md:mb-12 text-center font-bold text-foreground text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
          Education
        </h2>

        <div className="space-y-4 sm:space-y-6">
          {education.map((edu, index) => (
            <Card
              key={index}
              className={`border-l-4 border-accent-green transition-all duration-700 rounded-3xl ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{
                transitionDelay: `${index * 0.15}s`,
              }}
            >
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">{edu.degree}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm sm:text-base text-muted-foreground">{edu.institution}</p>
                <p className="text-xs sm:text-sm text-accent-green">{edu.year}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
