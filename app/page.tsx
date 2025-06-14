import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import {
  FileText,
  Award,
  BookOpen,
  MessageCircle,
  Briefcase,
  User,
  ExternalLink,
  Zap,
  Star,
  Sparkles,
} from "lucide-react"
import { neon } from "@neondatabase/serverless"
import { Navigation } from "@/components/navigation"
import { Testimonials } from "@/components/testimonials"
import { Stats } from "@/components/stats"
import { CTASection } from "@/components/cta-section"
import type { Metadata } from "next"

// Force this page to be dynamic and never cached
export const dynamic = "force-dynamic"
export const revalidate = 0
export const fetchCache = "force-no-store"

export const metadata: Metadata = {
  title: "Max Dorman - Microsoft Fundamentals Student & Technology Consultant",
  description:
    "Professional Microsoft Office solutions, Excel development, and logo design services from Fife, Scotland. Specializing in technology consulting and digital solutions.",
  keywords: [
    "Max Dorman",
    "Microsoft Office",
    "Excel Development",
    "Logo Design",
    "Technology Consulting",
    "Scotland",
    "Fife",
    "Microsoft Fundamentals",
    "Digital Solutions",
  ],
  openGraph: {
    title: "Max Dorman - Technology Consultant & Microsoft Specialist",
    description: "Professional Microsoft Office solutions, Excel development, and logo design services from Scotland.",
    type: "website",
    locale: "en_GB",
  },
}

const sql = neon(process.env.DATABASE_URL!)

async function getAboutMeDirect() {
  try {
    const result = await sql`SELECT * FROM about_me ORDER BY updated_at DESC LIMIT 1`
    console.log("Direct fetch result:", result[0])
    return result[0] || null
  } catch (error) {
    console.error("Direct fetch error:", error)
    return null
  }
}

async function getProfilePicture() {
  try {
    // First try to create the table if it doesn't exist
    await sql`
      CREATE TABLE IF NOT EXISTS profile_picture (
        id SERIAL PRIMARY KEY,
        image_url TEXT NOT NULL,
        alt_text VARCHAR(255) DEFAULT 'Profile Picture',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    const result = await sql`
      SELECT * FROM profile_picture ORDER BY updated_at DESC LIMIT 1
    `
    return result[0] || null
  } catch (error) {
    console.error("Profile picture fetch error:", error)
    return null
  }
}

async function getHeroContent() {
  try {
    // Create table if it doesn't exist
    await sql`
      CREATE TABLE IF NOT EXISTS hero_content (
        id SERIAL PRIMARY KEY,
        tagline VARCHAR(255) DEFAULT 'Technology Consultant & Microsoft Specialist',
        subtitle TEXT DEFAULT 'Delivering professional Microsoft solutions and digital services from Fife, Scotland',
        description TEXT DEFAULT 'Specializing in Excel development, logo design, and Microsoft Office consulting to help businesses streamline their operations and achieve their goals.',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    let result = await sql`SELECT * FROM hero_content ORDER BY updated_at DESC LIMIT 1`

    if (result.length === 0) {
      // Insert default content if none exists
      result = await sql`
        INSERT INTO hero_content (tagline, subtitle, description) 
        VALUES (
          'Technology Consultant & Microsoft Specialist',
          'Delivering professional Microsoft solutions and digital services from Fife, Scotland',
          'Specializing in Excel development, logo design, and Microsoft Office consulting to help businesses streamline their operations and achieve their goals.'
        )
        RETURNING *
      `
    }

    return result[0]
  } catch (error) {
    console.error("Hero content fetch error:", error)
    // Return default content if database fails
    return {
      tagline: "Technology Consultant & Microsoft Specialist",
      subtitle: "Delivering professional Microsoft solutions and digital services from Fife, Scotland",
      description:
        "Specializing in Excel development, logo design, and Microsoft Office consulting to help businesses streamline their operations and achieve their goals.",
    }
  }
}

export default async function HomePage() {
  // Fetch directly from database to bypass any caching
  const aboutMe = await getAboutMeDirect()
  const profilePic = await getProfilePicture()
  const heroContent = await getHeroContent()

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section with Enhanced Cyber Grid Background */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-cyber-grid bg-grid opacity-20"></div>
        <div className="absolute inset-0 bg-pink-cyber-grid bg-grid opacity-10"></div>
        <div className="relative">
          {/* Main Content */}
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Hero Section */}
            <div className="text-center mb-16 relative">
              {/* Enhanced Floating Elements with Stars */}
              <div className="absolute top-10 left-10 w-20 h-20 border border-neon-purple/30 rounded-full animate-float"></div>
              <div
                className="absolute top-20 right-20 w-16 h-16 border border-neon-pink/40 rounded-lg rotate-45 animate-float animate-pink-pulse"
                style={{ animationDelay: "1s" }}
              ></div>
              <div
                className="absolute bottom-20 left-1/4 w-12 h-12 border border-neon-cyan/30 rounded-full animate-float"
                style={{ animationDelay: "2s" }}
              ></div>
              <Star
                className="absolute top-32 right-1/4 w-8 h-8 text-neon-pink animate-pulse"
                style={{ animationDelay: "0.5s" }}
              />
              <Sparkles
                className="absolute bottom-32 right-10 w-6 h-6 text-neon-magenta animate-pulse"
                style={{ animationDelay: "1.5s" }}
              />
              <Star
                className="absolute top-40 left-16 w-5 h-5 text-neon-cyan animate-pulse"
                style={{ animationDelay: "2.5s" }}
              />

              {/* Profile Picture with Enhanced Neon Glow */}
              <div className="mb-8 relative">
                {profilePic && profilePic.image_url ? (
                  <div className="relative inline-block">
                    <img
                      src={profilePic.image_url || "/placeholder.svg"}
                      alt="Max Dorman - Technology Consultant"
                      className="w-40 h-40 rounded-full mx-auto object-cover border-4 border-primary/50 shadow-[0_0_30px_rgba(0,212,255,0.4),0_0_50px_rgba(255,20,147,0.3)] animate-rainbow-border"
                    />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 via-neon-pink/20 to-neon-cyan/20 animate-pulse"></div>
                  </div>
                ) : (
                  <div className="w-40 h-40 rounded-full mx-auto bg-gradient-to-br from-primary/20 via-neon-pink/20 to-neon-purple/20 flex items-center justify-center border-4 border-primary/50 shadow-[0_0_30px_rgba(0,212,255,0.4),0_0_50px_rgba(255,20,147,0.3)] animate-rainbow-border">
                    <User className="w-20 h-20 text-primary" />
                  </div>
                )}
              </div>

              <h1 className="text-6xl font-bold mb-6 hero-title">Max Dorman</h1>
              <h2 className="text-2xl font-semibold mb-4 text-neon-pink">{heroContent.tagline}</h2>
              <div className="flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-primary mr-2 animate-pulse" />
                <p className="text-xl text-muted-foreground">{heroContent.subtitle}</p>
                <Star className="w-6 h-6 text-neon-pink ml-2 animate-pulse" />
              </div>

              {/* Professional Tagline */}
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">{heroContent.description}</p>
            </div>

            <div className="section-divider"></div>

            {/* About Me Section with Enhanced Cyber Styling */}
            <Card className="mb-12 cyber-card">
              <CardHeader>
                <CardTitle className="text-3xl text-glow flex items-center">
                  <User className="w-8 h-8 mr-3 text-primary" />
                  About Me
                  <Star className="w-6 h-6 ml-3 text-neon-pink animate-pulse" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none dark:prose-invert prose-headings:text-primary prose-links:text-neon-pink">
                  {aboutMe && aboutMe.content ? (
                    <div dangerouslySetInnerHTML={{ __html: aboutMe.content }} />
                  ) : (
                    <div className="text-muted-foreground">
                      <p>
                        I'm <span className="text-neon-pink font-semibold">Max Dorman</span>, a dedicated technology
                        consultant currently advancing my expertise in Microsoft fundamentals. Based in beautiful{" "}
                        <span className="text-neon-cyan">Fife, Scotland</span>, I'm passionate about helping businesses
                        and individuals leverage technology to achieve their goals.
                      </p>
                      <p className="mt-4">
                        With a focus on <span className="text-neon-pink">practical solutions</span> and{" "}
                        <span className="text-neon-cyan">professional service</span>, I specialize in creating custom
                        Excel applications, designing memorable logos, and providing comprehensive Microsoft Office
                        consulting. Whether you're a small business looking to streamline operations or an individual
                        seeking to enhance your digital presence, I'm here to help you succeed.
                      </p>
                    </div>
                  )}
                </div>
                {/* Debug info with enhanced cyber styling */}
                <div className="mt-4 text-xs text-primary/60 border-t border-gradient-to-r from-primary/20 via-neon-pink/20 to-primary/20 pt-2">
                  <span className="text-neon-cyan">SYSTEM:</span> Last updated:{" "}
                  {aboutMe?.updated_at ? new Date(aboutMe.updated_at).toLocaleString() : "Never"} |{" "}
                  <span className="text-neon-pink">PROFILE:</span> {profilePic ? "Loaded" : "Default"} |{" "}
                  <span className="text-neon-cyan">HERO:</span>{" "}
                  {heroContent?.updated_at ? new Date(heroContent.updated_at).toLocaleString() : "Default"}
                </div>
              </CardContent>
            </Card>

            <div className="section-divider"></div>

            {/* Quick Links Grid with Star Accents */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              <Link href="/blog" className="group">
                <Card className="cyber-card hover:scale-105 transition-all duration-300 group-hover:pink-glow">
                  <CardHeader>
                    <CardTitle className="flex items-center text-xl">
                      <div className="p-2 rounded-lg bg-blue-500/20 border border-blue-500/30 mr-3 group-hover:bg-neon-pink/20 group-hover:border-neon-pink/50 transition-colors">
                        <FileText className="w-6 h-6 text-blue-400 group-hover:text-neon-pink transition-colors" />
                      </div>
                      Blog
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                      Read my latest insights on <span className="text-neon-pink">technology</span>, learning, and
                      professional development
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>

              <Link href="/portfolio" className="group">
                <Card className="cyber-card hover:scale-105 transition-all duration-300 group-hover:pink-glow">
                  <CardHeader>
                    <CardTitle className="flex items-center text-xl">
                      <div className="p-2 rounded-lg bg-green-500/20 border border-green-500/30 mr-3 group-hover:bg-neon-pink/20 group-hover:border-neon-pink/50 transition-colors">
                        <Briefcase className="w-6 h-6 text-green-400 group-hover:text-neon-pink transition-colors" />
                      </div>
                      Portfolio
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                      Explore my professional work including <span className="text-neon-pink">Excel solutions</span> and
                      creative designs
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>

              <Link href="/certificates" className="group">
                <Card className="cyber-card hover:scale-105 transition-all duration-300 group-hover:pink-glow">
                  <CardHeader>
                    <CardTitle className="flex items-center text-xl">
                      <div className="p-2 rounded-lg bg-yellow-500/20 border border-yellow-500/30 mr-3 group-hover:bg-neon-pink/20 group-hover:border-neon-pink/50 transition-colors">
                        <Award className="w-6 h-6 text-yellow-400 group-hover:text-neon-pink transition-colors" />
                      </div>
                      Certificates
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                      View my <span className="text-neon-pink">professional certifications</span> and continuous
                      learning achievements
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>

              <Link href="/ms-learn" className="group">
                <Card className="cyber-card hover:scale-105 transition-all duration-300 group-hover:pink-glow">
                  <CardHeader>
                    <CardTitle className="flex items-center text-xl">
                      <div className="p-2 rounded-lg bg-purple-500/20 border border-purple-500/30 mr-3 group-hover:bg-neon-pink/20 group-hover:border-neon-pink/50 transition-colors">
                        <BookOpen className="w-6 h-6 text-purple-400 group-hover:text-neon-pink transition-colors" />
                      </div>
                      MS Learn Progress
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                      Track my <span className="text-neon-pink">Microsoft learning</span> journey and skill development
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>

              <Link href="/resources" className="group">
                <Card className="cyber-card hover:scale-105 transition-all duration-300 group-hover:pink-glow">
                  <CardHeader>
                    <CardTitle className="flex items-center text-xl">
                      <div className="p-2 rounded-lg bg-indigo-500/20 border border-indigo-500/30 mr-3 group-hover:bg-neon-pink/20 group-hover:border-neon-pink/50 transition-colors">
                        <ExternalLink className="w-6 h-6 text-indigo-400 group-hover:text-neon-pink transition-colors" />
                      </div>
                      Resources
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                      Useful <span className="text-neon-pink">tools</span>, learning materials, and Microsoft resources
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>

              <Link href="/contact" className="group">
                <Card className="cyber-card hover:scale-105 transition-all duration-300 group-hover:pink-glow">
                  <CardHeader>
                    <CardTitle className="flex items-center text-xl">
                      <div className="p-2 rounded-lg bg-red-500/20 border border-red-500/30 mr-3 group-hover:bg-neon-pink/20 group-hover:border-neon-pink/50 transition-colors">
                        <MessageCircle className="w-6 h-6 text-red-400 group-hover:text-neon-pink transition-colors" />
                      </div>
                      Contact Me
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                      Get in touch for <span className="text-neon-pink">professional consultations</span> and project
                      inquiries
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            </div>

            {/* Stats Section - Hidden by default, can be shown later */}
            <Stats showStats={false} />

            {/* Testimonials Section - Hidden by default, can be shown later */}
            <Testimonials showTestimonials={false} />

            {/* Call to Action Section */}
            <CTASection />
          </main>
        </div>
      </div>

      {/* Enhanced Footer */}
      <footer className="bg-background/80 backdrop-blur-sm border-t border-primary/20 text-muted-foreground py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="section-divider mb-8"></div>

          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                <Zap className="w-5 h-5 mr-2 text-primary" />
                Max Dorman
              </h3>
              <p className="text-sm text-muted-foreground">
                Professional Microsoft solutions and technology consulting from Scotland.
              </p>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-foreground mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Excel Development</li>
                <li>• Logo Design</li>
                <li>• Microsoft Office Consulting</li>
                <li>• Technology Solutions</li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-foreground mb-4">Connect</h4>
              <div className="space-y-2 text-sm">
                <p>
                  <a href="mailto:maxd@ittechs.io" className="text-neon-pink hover:text-primary transition-colors">
                    maxd@ittechs.io
                  </a>
                </p>
                <p className="text-muted-foreground">Fife, Scotland</p>
              </div>
            </div>
          </div>

          <div className="text-center pt-8 border-t border-primary/20">
            <p className="text-primary/80 flex items-center justify-center">
              © 2024 <span className="text-neon-pink mx-2">Max Dorman</span>. All rights reserved.
              <Star className="w-4 h-4 text-neon-pink ml-2 animate-pulse" />
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
