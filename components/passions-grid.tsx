"use client";

import { useEffect, useRef, useState } from "react";
import { Dumbbell, BookOpen, Sparkles, Code, Coffee, Music } from "lucide-react";

const hobbies = [
  { id: "fitness", icon: Dumbbell, title: "Fitness", description: "Staying active and healthy through regular exercise", illustration: "/hobbies/fitness.png" },
  { id: "reading", icon: BookOpen, title: "Reading", description: "Exploring new ideas through books and articles", illustration: "/hobbies/reading-chair.png" },
  { id: "meditation", icon: Sparkles, title: "Meditation", description: "Finding balance and inner peace through mindfulness", illustration: "/hobbies/meditation.png" },
  { id: "coding", icon: Code, title: "Coding", description: "Building creative solutions and learning new technologies", illustration: "/hobbies/coding.png" },
  { id: "coffee", icon: Coffee, title: "Coffee", description: "Appreciating the art and science of great coffee", illustration: "/hobbies/reading.png" },
  { id: "music", icon: Music, title: "Music", description: "Finding inspiration through diverse sounds and rhythms", illustration: "/hobbies/reading.png" },
];

type Bubble = {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
};

export function PassionsGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [hoveredHobby, setHoveredHobby] = useState<string | null>(null);
  const [currentIllustration, setCurrentIllustration] = useState<number>(0);
  const autoRotateRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize bubbles
  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    const initialBubbles = hobbies.map((hobby) => {
      const size = 80 + Math.random() * 40;
      return {
        id: hobby.id,
        x: Math.random() * (width - size),
        y: Math.random() * (height - size),
        vx: (Math.random() - 0.5) * 4, // increase speed (previous 2)
        vy: (Math.random() - 0.5) * 4, // increase speed
        size,
      };
    });

    setBubbles(initialBubbles);
  }, []);

  // Animate bubbles with perfect bounce
  useEffect(() => {
    let animationFrame: number;

    const animate = () => {
      setBubbles((prev) =>
        prev.map((b) => {
          if (hoveredHobby === b.id) return b; // pause on hover
          const containerWidth = containerRef.current?.clientWidth || 0;
          const containerHeight = containerRef.current?.clientHeight || 0;
          let { x, y, vx, vy, size } = b;

          x += vx;
          y += vy;

          const effectiveSize = size; 

          // Horizontal bounce
          if (x <= 0) { x = 0; vx = Math.abs(vx); }
          if (x >= containerWidth - effectiveSize) { x = containerWidth - effectiveSize; vx = -Math.abs(vx); }

          // Vertical bounce (adjusted slightly up to align with bottom edge)
          if (y <= 0) { y = 0; vy = Math.abs(vy); }
          if (y >= containerHeight - effectiveSize - 2) { // subtract 2px to align visually
            y = containerHeight - effectiveSize - 2;
            vy = -Math.abs(vy);
          }

          return { ...b, x, y, vx, vy };
        })
      );

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationFrame);
  }, [hoveredHobby]);

  // Auto cycle central illustration faster
  useEffect(() => {
    if (!hoveredHobby) {
      autoRotateRef.current = setInterval(() => {
        setCurrentIllustration((prev) => (prev + 1) % hobbies.length);
      }, 1500); // reduced from 3000ms to 1500ms
    } else {
      if (autoRotateRef.current) clearInterval(autoRotateRef.current);
    }

    return () => {
      if (autoRotateRef.current) clearInterval(autoRotateRef.current);
    };
  }, [hoveredHobby]);

  return (
    <div ref={containerRef} className="relative min-h-screen bg-about-bg py-12 px-4 sm:py-16 md:py-20 lg:px-8 overflow-hidden">
      <div className="mx-auto max-w-7xl text-center">
        <h2 className="mb-3 sm:mb-4 font-bold text-foreground text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
          Beyond Work
        </h2>
        <p className="mb-8 sm:mb-12 md:mb-16 text-sm sm:text-base md:text-lg text-muted-foreground px-4">
          What keeps me inspired and balanced outside of code
        </p>

        {/* Central Illustration */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {hobbies.map((hobby, index) => {
            const isActive = hoveredHobby ? hoveredHobby === hobby.id : index === currentIllustration;
            return (
              <div
                key={hobby.id}
                className={`absolute transition-all duration-500 ${isActive ? "scale-100 opacity-100" : "scale-90 opacity-0"}`}
              >
                <img
                  src={hobby.illustration}
                  alt={hobby.title}
                  className="h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px] w-auto object-contain drop-shadow-2xl"
                />
              </div>
            );
          })}
        </div>

        {/* Bubbles */}
        {bubbles.map((b) => {
          const hobby = hobbies.find((h) => h.id === b.id);
          if (!hobby) return null;

          return (
            <div
              key={b.id}
              style={{
                width: b.size,
                height: b.size,
                transform: `translate(${b.x}px, ${b.y}px)`,
              }}
              className="absolute cursor-pointer"
              onMouseEnter={() => setHoveredHobby(b.id)}
              onMouseLeave={() => setHoveredHobby(null)}
            >
              <div
                className={`group relative flex h-full w-full items-center justify-center rounded-full border-2 border-accent-green/20 bg-white/80 backdrop-blur-sm transition-all duration-500 hover:scale-110 hover:border-accent-green hover:bg-white hover:shadow-2xl hover:shadow-accent-green/20 ${
                  hoveredHobby === b.id ? "scale-110 border-accent-green bg-white shadow-2xl" : ""
                }`}
              >
                <hobby.icon className="h-6 w-6 sm:h-8 sm:w-8 md:h-9 md:w-9 lg:h-10 lg:w-10 text-accent-green transition-transform duration-500 group-hover:scale-110" />

                <div
                  className={`absolute top-full left-1/2 z-10 mt-3 sm:mt-4 w-40 sm:w-44 md:w-48 -translate-x-1/2 rounded-xl border border-accent-green/20 bg-white p-3 sm:p-4 shadow-xl transition-all duration-300 ${
                    hoveredHobby === b.id
                      ? "pointer-events-auto translate-y-0 opacity-100"
                      : "pointer-events-none -translate-y-2 opacity-0"
                  }`}
                >
                  <h3 className="mb-1 sm:mb-2 font-bold text-foreground text-base sm:text-lg">{hobby.title}</h3>
                  <p className="text-muted-foreground text-xs sm:text-sm">{hobby.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
