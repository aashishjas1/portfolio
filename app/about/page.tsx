import { SidebarNav } from "@/components/sidebar-nav"
import { MobileNav } from "@/components/mobile-nav"
import { ToggleButton } from "@/components/toggle-button"
import { CreativeIntro } from "@/components/creative-intro"
import { EducationSection } from "@/components/education-section"
import { PassionsGrid } from "@/components/passions-grid"
import { PhilosophySection } from "@/components/philosophy-section"

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-about-bg">
      <SidebarNav />
      <MobileNav />
      <ToggleButton />

      <main className="lg:ml-20">
        <CreativeIntro />
        <EducationSection />
        <PassionsGrid />
        <PhilosophySection />
      </main>
    </div>
  )
}
