"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Github, Linkedin, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)
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

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="ghost"
        size="icon"
        className="fixed left-4 top-4 z-50 lg:hidden rounded-full bg-card border-2 border-accent-green/20 hover:border-accent-green hover:bg-accent-green/10"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Menu Drawer */}
      <aside
        className={`fixed left-0 top-0 z-40 h-screen w-64 transform border-r border-ui-element bg-background transition-transform duration-300 lg:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col justify-between p-6 pt-20">
          {/* Logo */}
          <div>
            <Link
              href="/"
              className="mb-8 block text-4xl font-bold font-mono text-foreground hover:text-accent-green transition-colors"
              onClick={() => setIsOpen(false)}
            >
              A
            </Link>

            {/* Navigation Links */}
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-lg font-medium text-foreground transition-colors hover:text-accent-green"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social Links */}
          <div className="flex gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground transition-all hover:text-accent-green hover:scale-110"
                aria-label={social.label}
              >
                <social.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </aside>
    </>
  )
}
