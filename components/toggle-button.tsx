"use client"

import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export function ToggleButton() {
  const pathname = usePathname()
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100)
  }, [])

  const isAboutPage = pathname === "/about"

  const handleClick = () => {
    if (isAboutPage) {
      router.push("/")
    } else {
      router.push("/about")
    }
  }

  return (
    <Button
      onClick={handleClick}
      variant="outline"
      className={`fixed right-4 top-4 z-50 rounded-full border-2 border-accent-green px-4 py-2 text-sm text-foreground transition-all duration-300 hover:bg-accent-green hover:text-black bg-card shadow-md hover:scale-115 sm:right-8 sm:top-8 sm:px-6 sm:text-base ${
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
      }`}
    >
      {isAboutPage ? "Work" : "About"}
    </Button>
  )
}
