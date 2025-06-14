"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ThemeToggle } from "./theme-toggle"
import { Button } from "@/components/ui/button"
import { Linkedin, ExternalLink, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Home", href: "/" },
  { name: "Blog", href: "/blog" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Certificates", href: "/certificates" },
  { name: "MS Learn", href: "/ms-learn" },
  { name: "Resources", href: "/resources" },
  { name: "Contact", href: "/contact" },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <>
      {/* Header with Cyber Styling */}
      <header className="bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80 sticky top-0 z-50 w-full border-b border-primary/20 shadow-[0_0_20px_rgba(0,212,255,0.1)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="relative">
              <Link href="/" className="hover:opacity-80 transition-opacity group">
                <div className="flex items-center">
                  <Zap className="w-8 h-8 text-primary mr-3 animate-pulse" />
                  <div>
                    <h1 className="text-3xl font-bold hero-title">Max Dorman</h1>
                    <p className="text-muted-foreground text-sm">
                      <span className="text-neon-cyan">Microsoft Fundamentals Student</span> |
                      <span className="text-primary ml-1">Fife, Scotland</span>
                    </p>
                  </div>
                </div>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="https://www.linkedin.com/in/max-dorman-1ba69814b" target="_blank">
                <Button variant="outline" size="sm" className="cyber-button">
                  <Linkedin className="w-4 h-4 mr-2" />
                  LinkedIn
                </Button>
              </Link>
              <Link href="https://www.fiverr.com/maxittech?public_mode=true" target="_blank">
                <Button variant="outline" size="sm" className="cyber-button">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Fiverr
                </Button>
              </Link>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Navigation with Neon Effects */}
      <nav className="bg-background/90 backdrop-blur-sm border-b border-primary/30 shadow-[0_0_15px_rgba(0,212,255,0.1)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 py-4 overflow-x-auto">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "whitespace-nowrap font-medium transition-all duration-300 hover:text-primary relative group",
                  pathname === item.href
                    ? "text-primary border-b-2 border-primary pb-1 text-glow"
                    : "text-muted-foreground hover:text-neon-cyan",
                )}
              >
                {item.name}
                {/* Hover effect */}
                <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-primary to-neon-cyan scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </>
  )
}
