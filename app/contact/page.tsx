import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, Linkedin, ExternalLink, MapPin, Star, Clock, Shield, Zap } from "lucide-react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { ContactForm } from "@/components/contact-form"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact - Get Professional Microsoft Solutions",
  description:
    "Contact Max Dorman for Excel development, logo design, and Microsoft consulting services. Based in Fife, Scotland. Quick response guaranteed.",
  keywords: [
    "contact Max Dorman",
    "Excel development quote",
    "logo design inquiry",
    "Microsoft consulting",
    "Scotland technology services",
    "Fife consultant",
  ],
  openGraph: {
    title: "Contact Max Dorman - Professional Services",
    description: "Get in touch for Excel development, logo design, and Microsoft consulting services from Scotland.",
    type: "website",
  },
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4 hero-title">Contact Me</h1>
          <p className="text-xl text-muted-foreground">
            Let's discuss your project and create <span className="text-neon-pink">amazing solutions</span> together
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Form - Takes up 2 columns */}
          <div className="lg:col-span-2">
            <ContactForm />
          </div>

          {/* Contact Information - Takes up 1 column */}
          <div className="space-y-6">
            {/* Contact Details */}
            <Card className="cyber-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-primary" />
                  Contact Information
                </CardTitle>
                <CardDescription>Multiple ways to reach me for your project needs</CardDescription>
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

            {/* Response Time */}
            <Card className="cyber-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-neon-cyan" />
                  Response Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-neon-pink mb-2">24 Hours</div>
                  <p className="text-sm text-muted-foreground">
                    I typically respond to all inquiries within 24 hours, often much sooner.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Services Overview */}
            <Card className="cyber-card">
              <CardHeader>
                <CardTitle>What I Offer</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-neon-pink rounded-full mt-2 mr-3 flex-shrink-0 animate-pulse"></div>
                    <span>
                      <span className="text-neon-cyan">Excel Development</span> & Automation
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-neon-cyan rounded-full mt-2 mr-3 flex-shrink-0 animate-pulse"></div>
                    <span>
                      <span className="text-neon-pink">Logo Design</span> & Branding
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-neon-purple rounded-full mt-2 mr-3 flex-shrink-0 animate-pulse"></div>
                    <span>
                      <span className="text-neon-pink">Microsoft Office</span> Consulting
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-neon-cyan rounded-full mt-2 mr-3 flex-shrink-0 animate-pulse"></div>
                    <span>
                      <span className="text-neon-pink">Technology</span> Solutions
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Trust Indicators */}
            <Card className="cyber-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-neon-pink" />
                  Why Choose Me?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <Star className="w-4 h-4 text-neon-pink mr-2" />
                    5.0 star average rating
                  </li>
                  <li className="flex items-center">
                    <Shield className="w-4 h-4 text-neon-cyan mr-2" />
                    100% confidential
                  </li>
                  <li className="flex items-center">
                    <Clock className="w-4 h-4 text-neon-pink mr-2" />
                    Quick turnaround times
                  </li>
                  <li className="flex items-center">
                    <Zap className="w-4 h-4 text-neon-cyan mr-2" />
                    Professional results
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                question: "How quickly can you start my project?",
                answer:
                  "Most projects can begin within 1-2 business days after we finalize the requirements and agreement.",
              },
              {
                question: "Do you offer revisions?",
                answer:
                  "Yes! I include reasonable revisions in all my projects to ensure you're completely satisfied with the final result.",
              },
              {
                question: "What's your payment process?",
                answer:
                  "I typically work with 50% upfront and 50% on completion for larger projects. Smaller projects may be paid in full upfront.",
              },
              {
                question: "Do you provide ongoing support?",
                answer:
                  "I offer post-project support and can provide training on how to use your new solutions effectively.",
              },
            ].map((faq, index) => (
              <Card key={index} className="cyber-card">
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
