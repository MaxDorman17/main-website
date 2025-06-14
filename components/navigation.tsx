"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ThemeToggle } from "./theme-toggle"
import { Button } from "@/components/ui/button"
import { Linkedin, ExternalLink, Zap, Menu, X, Settings } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Blog", href: "/blog" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Certificates", href: "/certificates" },
  { name: "MS Learn", href: "/ms-learn" },
  { name: "Resources", href: "/resources" },
  { name: "Contact", href: "/contact" },
  { name: "Admin", href: "/admin", icon: <Settings className="w-4 h-4" /> },
]

export function Navigation() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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
                      <span className="text-neon-cyan">Technology Consultant</span> |
                      <span className="text-primary ml-1">Fife, Scotland</span>
                    </p>
                  </div>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
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

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              <ThemeToggle />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="cyber-button"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation with Neon Effects */}
      <nav className="bg-background/90 backdrop-blur-sm border-b border-primary/30 shadow-[0_0_15px_rgba(0,212,255,0.1)] sticky top-[88px] z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 py-4 overflow-x-auto">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "whitespace-nowrap font-medium transition-all duration-300 hover:text-primary relative group flex items-center",
                  pathname === item.href
                    ? "text-primary border-b-2 border-primary pb-1 text-glow"
                    : "text-muted-foreground hover:text-neon-cyan",
                  item.name === "Admin" && "text-neon-pink hover:text-neon-pink",
                )}
              >
                {item.icon && <span className="mr-1">{item.icon}</span>}
                {item.name}
                {/* Hover effect */}
                <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-primary to-neon-cyan scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </Link>
            ))}
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-primary/20">
              <div className="flex flex-col space-y-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "font-medium transition-all duration-300 hover:text-primary px-2 py-1 rounded flex items-center",
                      pathname === item.href
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-neon-cyan hover:bg-neon-cyan/10",
                      item.name === "Admin" && "text-neon-pink hover:text-neon-pink hover:bg-neon-pink/10",
                    )}
                  >
                    {item.icon && <span className="mr-2">{item.icon}</span>}
                    {item.name}
                  </Link>
                ))}

                <div className="flex flex-col space-y-2 pt-4 border-t border-primary/20">
                  <Link href="https://www.linkedin.com/in/max-dorman-1ba69814b" target="_blank">
                    <Button variant="outline" size="sm" className="w-full cyber-button">
                      <Linkedin className="w-4 h-4 mr-2" />
                      LinkedIn
                    </Button>
                  </Link>
                  <Link href="https://www.fiverr.com/maxittech?public_mode=true" target="_blank">
                    <Button variant="outline" size="sm" className="w-full cyber-button">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Fiverr
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  )
}
