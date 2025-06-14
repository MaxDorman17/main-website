import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, Star, Mail, ExternalLink } from "lucide-react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { neon } from "@neondatabase/serverless"
import type { Metadata } from "next"
import { FileSpreadsheet, Palette, Settings, Lightbulb, Users, Clock, Award, Zap } from "lucide-react"

export const dynamic = "force-dynamic"
export const revalidate = 0
export const fetchCache = "force-no-store"

export const metadata: Metadata = {
  title: "Services - Professional Microsoft Solutions & Design",
  description:
    "Excel development, logo design, Microsoft Office consulting, and technology solutions. Professional services from Max Dorman in Fife, Scotland.",
  keywords: [
    "Excel development",
    "Logo design",
    "Microsoft Office consulting",
    "Technology consulting",
    "Business automation",
    "Scotland",
    "Fife",
  ],
  openGraph: {
    title: "Professional Services - Max Dorman",
    description: "Excel development, logo design, and Microsoft consulting services from Scotland.",
    type: "website",
  },
}

const sql = neon(process.env.DATABASE_URL!)

// Icon mapping
const iconMap = {
  FileSpreadsheet,
  Palette,
  Settings,
  Lightbulb,
  Users,
  Clock,
  Award,
  Zap,
}

async function getServices() {
  try {
    const result = await sql`
      SELECT * FROM services 
      ORDER BY display_order ASC, created_at ASC
    `
    return result
  } catch (error) {
    console.error("Error fetching services:", error)
    // Return default services if database fails
    return [
      {
        id: 1,
        title: "Excel Development & Automation",
        description: "Custom Excel solutions to streamline your business processes and boost productivity.",
        features: [
          "Custom formulas and functions",
          "Data analysis and reporting",
          "Automated workflows",
          "Dashboard creation",
          "VBA programming",
          "Data validation and cleanup",
        ],
        price_from: 50.0,
        price_type: "from",
        currency: "GBP",
        is_featured: true,
        icon_name: "FileSpreadsheet",
      },
      {
        id: 2,
        title: "Logo Design & Branding",
        description: "Professional logo design that captures your brand identity and makes a lasting impression.",
        features: [
          "Custom logo design",
          "Multiple concept variations",
          "High-resolution files",
          "Vector formats (SVG, AI)",
          "Brand color palette",
          "Usage guidelines",
        ],
        price_from: 75.0,
        price_type: "from",
        currency: "GBP",
        is_featured: true,
        icon_name: "Palette",
      },
    ]
  }
}

function formatPrice(price: number, priceType: string, currency: string) {
  const formatter = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: currency || "GBP",
  })

  switch (priceType) {
    case "from":
      return `From ${formatter.format(price)}`
    case "fixed":
      return formatter.format(price)
    case "hourly":
      return `${formatter.format(price)}/hour`
    case "contact":
      return "Contact for pricing"
    default:
      return `From ${formatter.format(price)}`
  }
}

export default async function ServicesPage() {
  const services = await getServices()
  const featuredServices = services.filter((service) => service.is_featured)

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-foreground mb-4 hero-title">Professional Services</h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Delivering <span className="text-neon-pink">expert solutions</span> in Microsoft technologies, Excel
            development, and creative design to help your business <span className="text-neon-cyan">thrive</span>
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-neon-pink">50+</div>
              <div className="text-sm text-muted-foreground">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-neon-cyan">5.0</div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-neon-pink">24h</div>
              <div className="text-sm text-muted-foreground">Response Time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-neon-cyan">100%</div>
              <div className="text-sm text-muted-foreground">Satisfaction</div>
            </div>
          </div>
        </div>

        {/* Featured Services */}
        {featuredServices.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              <Star className="w-8 h-8 inline mr-2 text-neon-pink" />
              Featured Services
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredServices.map((service) => {
                const IconComponent = iconMap[service.icon_name] || FileSpreadsheet
                return (
                  <Card
                    key={service.id}
                    className="cyber-card hover:scale-105 transition-all duration-300 hover:pink-glow relative"
                  >
                    <div className="absolute top-4 right-4">
                      <Star className="w-6 h-6 text-neon-pink fill-current" />
                    </div>
                    <CardHeader>
                      <CardTitle className="flex items-center text-2xl">
                        <div className="p-3 rounded-lg bg-primary/20 border border-primary/30 mr-4">
                          <IconComponent className="w-8 h-8 text-primary" />
                        </div>
                        {service.title}
                      </CardTitle>
                      <CardDescription className="text-lg">{service.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-6">
                        <h4 className="font-semibold text-foreground mb-3">What's included:</h4>
                        <ul className="space-y-2">
                          {service.features?.map((feature, index) => (
                            <li key={index} className="flex items-start">
                              <Check className="w-5 h-5 text-neon-pink mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-muted-foreground">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-3xl font-bold text-neon-pink">
                            {service.price_from
                              ? formatPrice(service.price_from, service.price_type, service.currency)
                              : "Contact for pricing"}
                          </div>
                          {service.price_type === "from" && (
                            <div className="text-sm text-muted-foreground">Starting price</div>
                          )}
                        </div>
                        <Link href="/contact">
                          <Button size="lg">
                            Get Started
                            <Mail className="w-4 h-4 ml-2" />
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        )}

        {/* All Services */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">All Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => {
              const IconComponent = iconMap[service.icon_name] || FileSpreadsheet
              return (
                <Card key={service.id} className="cyber-card hover:scale-105 transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <div className="p-2 rounded-lg bg-primary/20 border border-primary/30 mr-3">
                        <IconComponent className="w-6 h-6 text-primary" />
                      </div>
                      {service.title}
                      {service.is_featured && <Star className="w-5 h-5 text-neon-pink ml-2" />}
                    </CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <div className="text-xl font-bold text-neon-cyan">
                        {service.price_from
                          ? formatPrice(service.price_from, service.price_type, service.currency)
                          : "Contact for pricing"}
                      </div>
                    </div>

                    {service.features && service.features.length > 0 && (
                      <div className="mb-4">
                        <ul className="space-y-1">
                          {service.features.slice(0, 3).map((feature, index) => (
                            <li key={index} className="flex items-start text-sm">
                              <Check className="w-4 h-4 text-neon-pink mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-muted-foreground">{feature}</span>
                            </li>
                          ))}
                          {service.features.length > 3 && (
                            <li className="text-sm text-muted-foreground ml-6">
                              +{service.features.length - 3} more features
                            </li>
                          )}
                        </ul>
                      </div>
                    )}

                    <Link href="/contact">
                      <Button variant="outline" className="w-full">
                        Learn More
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Process Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                step: "1",
                title: "Initial Consultation",
                description: "We discuss your needs and requirements in detail",
                icon: <Users className="w-8 h-8" />,
              },
              {
                step: "2",
                title: "Proposal & Quote",
                description: "Receive a detailed proposal with timeline and pricing",
                icon: <FileSpreadsheet className="w-8 h-8" />,
              },
              {
                step: "3",
                title: "Development",
                description: "I create your solution with regular progress updates",
                icon: <Settings className="w-8 h-8" />,
              },
              {
                step: "4",
                title: "Delivery & Support",
                description: "Final delivery with training and ongoing support",
                icon: <Award className="w-8 h-8" />,
              },
            ].map((item, index) => (
              <Card key={index} className="cyber-card text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 rounded-full bg-primary/20 border-2 border-primary/50 flex items-center justify-center mx-auto mb-4">
                    <div className="text-primary">{item.icon}</div>
                  </div>
                  <div className="text-2xl font-bold text-neon-pink mb-2">Step {item.step}</div>
                  <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <Card className="cyber-card bg-gradient-to-r from-primary/10 via-neon-pink/10 to-neon-cyan/10 border-2 border-primary/30">
          <CardContent className="text-center p-12">
            <h2 className="text-4xl font-bold text-foreground mb-4 hero-title">Ready to Get Started?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's discuss your project and create a solution that{" "}
              <span className="text-neon-pink">exceeds your expectations</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="min-w-[200px]">
                  <Mail className="w-5 h-5 mr-2" />
                  Get Free Quote
                </Button>
              </Link>
              <Link href="/portfolio">
                <Button variant="outline" size="lg" className="min-w-[200px]">
                  <ExternalLink className="w-5 h-5 mr-2" />
                  View Portfolio
                </Button>
              </Link>
            </div>
            <p className="text-sm text-muted-foreground mt-6">
              Free consultation • No obligation • Quick response within 24 hours
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
