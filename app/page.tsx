import { SidebarNav } from "@/components/sidebar-nav"
import { MobileNav } from "@/components/mobile-nav"
import { ToggleButton } from "@/components/toggle-button"
import { HeroSection } from "@/components/hero-section"
import { ProjectsShowcase } from "@/components/projects-showcase"
import { TechSkills } from "@/components/tech-skills"
import { ClosingCTA } from "@/components/closing-cta"

export default function HomePage() {
  return (
    <div className="relative min-h-screen">
      <SidebarNav />
      <MobileNav />
      <ToggleButton />

      <main className="lg:ml-20">
        <HeroSection />
        <ProjectsShowcase />
        <TechSkills />
        <ClosingCTA />
      </main>
    </div>
  )
}
