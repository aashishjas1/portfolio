"use client"

import { useState, useRef, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { FileText } from "lucide-react"

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "Modern shopping experience with seamless checkout",
    image: "/modern-ecommerce-interface.png",
    goal: "Create a user-friendly e-commerce platform with intuitive navigation",
    approach: "Built with Next.js, integrated Stripe payments, and optimized for performance",
    result: "Increased conversion rate by 40% and reduced cart abandonment",
    tags: ["Next.js", "Stripe", "TypeScript"],
    files: ["checkout.tsx", "products.tsx", "cart.tsx"],
  },
  {
    id: 2,
    title: "AI Dashboard",
    description: "Analytics platform powered by machine learning",
    image: "/ai-analytics-dashboard.png",
    goal: "Provide actionable insights through AI-powered analytics",
    approach: "Implemented ML models with real-time data visualization",
    result: "Helped clients make data-driven decisions 3x faster",
    tags: ["React", "Python", "TensorFlow"],
    files: ["analytics.tsx", "models.py", "dashboard.tsx"],
  },
  {
    id: 3,
    title: "Design System",
    description: "Comprehensive component library for enterprise",
    image: "/design-system-components.png",
    goal: "Standardize UI components across multiple products",
    approach: "Created reusable components with accessibility in mind",
    result: "Reduced development time by 60% across teams",
    tags: ["React", "Storybook", "Figma"],
    files: ["button.tsx", "input.tsx", "card.tsx"],
  },
  {
    id: 4,
    title: "Mobile App",
    description: "Cross-platform fitness tracking application",
    image: "/fitness-mobile-app-interface.png",
    goal: "Build an engaging fitness tracking experience",
    approach: "Developed with React Native and integrated health APIs",
    result: "Achieved 100k+ downloads in first 3 months",
    tags: ["React Native", "Node.js", "MongoDB"],
    files: ["tracker.tsx", "profile.tsx", "stats.tsx"],
  },
]

export function ProjectsShowcase() {
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null)
  const [isPaused, setIsPaused] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container || isPaused) return

    let scrollPosition = 0
    const scrollSpeed = 2

    const scroll = () => {
      if (!isPaused) {
        scrollPosition += scrollSpeed
        if (scrollPosition >= container.scrollWidth / 2) {
          scrollPosition = 0
        }
        container.scrollLeft = scrollPosition
      }
    }

    const intervalId = setInterval(scroll, 20)
    return () => clearInterval(intervalId)
  }, [isPaused])

  return (
    <section id="projects" className="py-12 px-4 sm:py-16 md:py-20 lg:px-8 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-8 text-center font-bold text-foreground text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
          Featured Projects
        </h2>

        <div
          ref={scrollContainerRef}
          className="flex gap-4 sm:gap-6 md:gap-8 overflow-x-auto pb-8 scrollbar-hide"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {[...projects, ...projects].map((project, index) => (
            <FolderCard key={`${project.id}-${index}`} project={project} onClick={() => setSelectedProject(project)} />
          ))}
        </div>
      </div>

      {/* Project Modal */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">{selectedProject?.title}</DialogTitle>
            <DialogDescription>{selectedProject?.description}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <img
              src={selectedProject?.image || "/placeholder.svg"}
              alt={selectedProject?.title}
              className="w-full rounded-lg"
            />
            <div>
              <h4 className="mb-2 font-semibold text-accent-green">Goal</h4>
              <p className="text-muted-foreground">{selectedProject?.goal}</p>
            </div>
            <div>
              <h4 className="mb-2 font-semibold text-accent-green">Approach</h4>
              <p className="text-muted-foreground">{selectedProject?.approach}</p>
            </div>
            <div>
              <h4 className="mb-2 font-semibold text-accent-green">Result</h4>
              <p className="text-muted-foreground">{selectedProject?.result}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}

function FolderCard({ project, onClick }: { project: (typeof projects)[0]; onClick: () => void }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="relative flex-shrink-0 w-64 sm:w-72 md:w-80 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className="relative">
        <div className="absolute -top-2 left-4 w-16 h-6 sm:-top-3 sm:left-6 sm:w-24 sm:h-8 bg-gradient-to-r from-accent-green to-accent-green/80 rounded-t-3xl shadow-lg transition-all duration-300" />

        <div className="relative bg-gradient-to-br from-card to-card/80 rounded-3xl shadow-xl overflow-hidden border border-ui-element/50 transition-all duration-500 hover:shadow-2xl hover:scale-[1.02]">
          <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
            <img
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-700"
              style={{ transform: isHovered ? "scale(1.1)" : "scale(1)" }}
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-300"
              style={{ opacity: isHovered ? 1 : 0.5 }}
            />
          </div>

          <div className="relative bg-gradient-to-r from-accent-green to-accent-green/90 px-4 py-3 sm:px-6 sm:py-4">
            <h3 className="text-lg sm:text-xl font-bold text-white">{project.title}</h3>
            <p className="text-xs sm:text-sm text-white/80 mt-1">{project.description}</p>
          </div>

          <div className="px-4 py-3 sm:px-6 sm:py-4 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs font-medium bg-accent-green/10 text-accent-green rounded-full border border-accent-green/20"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div
          className="hidden md:block absolute -top-8 right-4 space-y-2 transition-all duration-500"
          style={{
            transform: isHovered ? "translateY(-20px) rotate(-5deg)" : "translateY(0) rotate(0deg)",
            opacity: isHovered ? 1 : 0,
            pointerEvents: isHovered ? "auto" : "none",
          }}
        >
          {project.files.map((file, index) => (
            <div
              key={file}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl px-4 py-3 flex items-center gap-3 border border-gray-200 dark:border-gray-700 min-w-[200px] transition-all duration-300"
              style={{
                transform: isHovered ? `translateX(${index * -10}px) rotate(${index * 2}deg)` : "translateX(0)",
                transitionDelay: `${index * 50}ms`,
              }}
            >
              <FileText className="w-4 h-4 text-accent-green flex-shrink-0" />
              <span className="text-sm font-medium text-foreground truncate">{file}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
