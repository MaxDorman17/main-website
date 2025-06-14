"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Small Business Owner",
    content:
      "Max created an incredible Excel solution that automated our inventory tracking. His attention to detail and professional approach made the entire process seamless.",
    rating: 5,
  },
  {
    name: "David Chen",
    role: "Marketing Manager",
    content:
      "The logo design Max created perfectly captured our brand identity. His creativity and technical skills are outstanding.",
    rating: 5,
  },
  {
    name: "Emma Wilson",
    role: "Operations Director",
    content:
      "Max's Microsoft Office consulting helped streamline our workflows significantly. Highly recommend his services!",
    rating: 5,
  },
]

interface TestimonialsProps {
  showTestimonials?: boolean
}

export function Testimonials({ showTestimonials = false }: TestimonialsProps) {
  // Don't render anything if showTestimonials is false
  if (!showTestimonials) {
    return null
  }

  return (
    <div className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-foreground mb-4 hero-title">What Clients Say</h2>
        <p className="text-xl text-muted-foreground">
          Real feedback from <span className="text-neon-pink">satisfied clients</span>
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="cyber-card hover:scale-105 transition-all duration-300 hover:pink-glow">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Quote className="w-8 h-8 text-neon-pink mr-2" />
                <div className="flex">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-muted-foreground mb-4 italic">"{testimonial.content}"</p>
              <div className="border-t border-primary/20 pt-4">
                <p className="font-semibold text-foreground">{testimonial.name}</p>
                <p className="text-sm text-neon-cyan">{testimonial.role}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

// Export the testimonials data for use in admin
export { testimonials }
