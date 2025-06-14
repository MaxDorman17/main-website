import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, Linkedin, ExternalLink, MapPin, Star } from "lucide-react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4 hero-title">Contact Me</h1>
          <p className="text-xl text-muted-foreground">
            Let's connect and discuss <span className="text-neon-pink">opportunities</span>
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <Card className="cyber-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                Get In Touch
                <Star className="w-5 h-5 ml-2 text-neon-pink animate-pulse" />
              </CardTitle>
              <CardDescription>
                I'm always open to discussing new <span className="text-neon-cyan">opportunities</span> and
                collaborations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-3 text-muted-foreground" />
                <span>
                  <span className="text-neon-pink">Fife</span>, Scotland
                </span>
              </div>

              <Link href="mailto:maxd@ittechs.io">
                <Button variant="outline" className="w-full justify-start">
                  <Mail className="w-4 h-4 mr-2" />
                  maxd@ittechs.io
                </Button>
              </Link>

              <Link href="https://www.linkedin.com/in/max-dorman-1ba69814b" target="_blank">
                <Button variant="outline" className="w-full justify-start">
                  <Linkedin className="w-4 h-4 mr-2" />
                  LinkedIn Profile
                </Button>
              </Link>

              <Link href="https://www.fiverr.com/maxittech?public_mode=true" target="_blank">
                <Button variant="outline" className="w-full justify-start">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Fiverr Profile
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Services */}
          <Card className="cyber-card">
            <CardHeader>
              <CardTitle>Services Available</CardTitle>
              <CardDescription>What I can help you with</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-neon-pink rounded-full mt-2 mr-3 flex-shrink-0 animate-pulse"></div>
                  <span>
                    <span className="text-neon-cyan">Microsoft Office</span> solutions and automation
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-neon-cyan rounded-full mt-2 mr-3 flex-shrink-0 animate-pulse"></div>
                  <span>
                    <span className="text-neon-pink">Excel spreadsheet</span> development and analysis
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-neon-purple rounded-full mt-2 mr-3 flex-shrink-0 animate-pulse"></div>
                  <span>
                    <span className="text-neon-pink">Logo design</span> and branding
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-neon-cyan rounded-full mt-2 mr-3 flex-shrink-0 animate-pulse"></div>
                  <span>
                    <span className="text-neon-pink">Technology consulting</span> and support
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-neon-pink rounded-full mt-2 mr-3 flex-shrink-0 animate-pulse"></div>
                  <span>
                    <span className="text-neon-cyan">Learning and development</span> guidance
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <Card className="mt-8 cyber-card">
          <CardContent className="text-center py-8">
            <h3 className="text-2xl font-bold text-foreground mb-4">Ready to Work Together?</h3>
            <p className="text-muted-foreground mb-6">
              Whether you need help with <span className="text-neon-pink">Microsoft technologies</span>,{" "}
              <span className="text-neon-cyan">Excel projects</span>, or{" "}
              <span className="text-neon-pink">logo design</span>, I'm here to help bring your ideas to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="mailto:maxd@ittechs.io">
                <Button size="lg">
                  <Mail className="w-4 h-4 mr-2" />
                  Send Email
                </Button>
              </Link>
              <Link href="https://www.fiverr.com/maxittech?public_mode=true" target="_blank">
                <Button variant="outline" size="lg">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Fiverr Services
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
