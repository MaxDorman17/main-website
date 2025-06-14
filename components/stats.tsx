"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Award, Users, Clock, Star } from "lucide-react"

const stats = [
  {
    icon: <Users className="w-8 h-8 text-neon-pink" />,
    value: "50+",
    label: "Happy Clients",
  },
  {
    icon: <Award className="w-8 h-8 text-neon-cyan" />,
    value: "100+",
    label: "Projects Completed",
  },
  {
    icon: <Clock className="w-8 h-8 text-neon-purple" />,
    value: "2+",
    label: "Years Experience",
  },
  {
    icon: <Star className="w-8 h-8 text-yellow-400" />,
    value: "5.0",
    label: "Average Rating",
  },
]

interface StatsProps {
  showStats?: boolean
}

export function Stats({ showStats = false }: StatsProps) {
  // Don't render anything if showStats is false
  if (!showStats) {
    return null
  }

  return (
    <div className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-foreground mb-4 hero-title">By the Numbers</h2>
        <p className="text-xl text-muted-foreground">
          Delivering <span className="text-neon-pink">quality results</span> consistently
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="cyber-card text-center hover:scale-105 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex justify-center mb-4">{stat.icon}</div>
              <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

// Export the stats data for use in admin
export { stats }
