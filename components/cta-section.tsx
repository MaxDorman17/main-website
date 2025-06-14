"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, ExternalLink, Star, Sparkles } from "lucide-react"
import Link from "next/link"

export function CTASection() {
  return (
    <div className="py-16">
      <Card className="cyber-card bg-gradient-to-r from-primary/10 via-neon-pink/10 to-neon-cyan/10 border-2 border-primary/30">
        <CardContent className="text-center p-12">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Star className="w-12 h-12 text-neon-pink animate-pulse" />
              <Sparkles className="w-6 h-6 text-neon-cyan absolute -top-2 -right-2 animate-pulse" />
            </div>
          </div>

          <h2 className="text-4xl font-bold text-foreground mb-4 hero-title">Ready to Start Your Project?</h2>

          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let's work together to bring your ideas to life. Whether you need
            <span className="text-neon-pink"> Excel solutions</span>,
            <span className="text-neon-cyan"> logo design</span>, or
            <span className="text-neon-pink"> technology consulting</span>, I'm here to help you succeed.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="min-w-[200px]">
                <Mail className="w-5 h-5 mr-2" />
                Get Started Today
              </Button>
            </Link>
            <Link href="/portfolio">
              <Button variant="outline" size="lg" className="min-w-[200px]">
                <ExternalLink className="w-5 h-5 mr-2" />
                View My Work
              </Button>
            </Link>
          </div>

          <p className="text-sm text-muted-foreground mt-6">
            Free consultation • Quick response • Professional results
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
