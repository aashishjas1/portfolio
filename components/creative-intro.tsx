"use client"

import { useEffect, useState } from "react"

export function CreativeIntro() {
  const [showText, setShowText] = useState(false)
  const words = ["Hi,", "I'm", "Aashish."]

  useEffect(() => {
    setShowText(true)
  }, [])

  return (
    <section className="flex min-h-screen items-center justify-center px-4 py-20 sm:px-6 lg:px-8">
      <div className="max-w-4xl text-center">
        <div className="mb-6 sm:mb-8 flex justify-center">
          <div className="animate-float h-100 w-24 sm:h-58 sm:w-28 md:h-80 md:w-32 overflow-hidden rounded-full bg-accent-green/10">
            <img src="\Gemini_Generated_Image_4zvjmh4zvjmh4zvj-removebg-preview.png" alt="Aashish" className="h-full w-full object-cover" />
          </div>
        </div>

        <h1 className="mb-4 sm:mb-6 text-4xl sm:text-5xl md:text-6xl font-bold text-foreground">
          {showText && (
            <span>
              {words.map((word, index) => (
                <span
                  key={index}
                  className="inline-block animate-slide-up opacity-0 tracking-normal text-5xl sm:text-6xl md:text-7xl lg:text-8xl"
                  style={{
                    animationDelay: `${index * 0.3}s`,
                    animationFillMode: "forwards",
                  }}
                >
                  {word}{" "}
                </span>
              ))}
            </span>
          )}
        </h1>

        <p
          className="animate-fade-in text-base sm:text-lg md:text-xl text-muted-foreground px-4"
          style={{ animationDelay: "1s" }}
        >
          A developer, designer, and problem solver passionate about creating digital experiences that matter.
        </p>
      </div>
    </section>
  )
}
