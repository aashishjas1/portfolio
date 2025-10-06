"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Github, Linkedin, Twitter } from "lucide-react"

export function SidebarNav() {
  const pathname = usePathname()
  const isAboutPage = pathname === "/about"

  const navItems = isAboutPage
    ? [
        { name: "Story", href: "/about#intro" },
        { name: "Education", href: "/about#education" },
        { name: "Passions", href: "/about#passions" },
      ]
    : [
        { name: "Projects", href: "/#projects" },
        { name: "Skills", href: "/#skills" },
        { name: "Contact", href: "/#contact" },
      ]

  const socialLinks = [
    { icon: Github, href: "https://github.com", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  ]

  return (
    <aside className="fixed left-0 top-0 z-50 hidden h-screen w-20 flex-col items-center justify-between border-r border-ui-element bg-background py-8 lg:flex">
      {/* Logo/Initials */}
      <Link href="/" className="font-bold text-foreground hover:text-accent-green transition-colors text-6xl font-mono">
        A
      </Link>

      {/* Navigation Links */}
      <nav className="flex flex-col items-center gap-8">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="group relative text-sm font-medium text-foreground transition-colors hover:text-accent-green hover:scale-140"
          >
            <span className="[writing-mode:vertical-lr] rotate-180">{item.name}</span>
            <span className="absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 bg-accent-green transition-all group-hover:w-full" />
          </Link>
        ))}
      </nav>

      {/* Social Links */}
      <div className="flex flex-col items-center gap-6">
        {socialLinks.map((social) => (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground transition-all hover:text-accent-green hover:scale-140"
            aria-label={social.label}
          >
            <social.icon className="h-5 w-5" />
          </a>
        ))}
      </div>
    </aside>
  )
}
