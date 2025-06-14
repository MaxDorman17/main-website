import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { FileText, Award, BookOpen, MessageCircle, Briefcase, User, ExternalLink } from "lucide-react"
import { neon } from "@neondatabase/serverless"
import { Navigation } from "@/components/navigation"
import type { Metadata } from "next"

// Force this page to be dynamic and never cached
export const dynamic = "force-dynamic"
export const revalidate = 0
export const fetchCache = "force-no-store"

export const metadata: Metadata = {
  title: "Home",
  description:
    "Welcome to Max Dorman's personal website. Explore my Microsoft learning journey, portfolio projects, and professional development.",
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
    const result = await sql`
      SELECT * FROM profile_picture ORDER BY updated_at DESC LIMIT 1
    `
    return result[0] || null
  } catch (error) {
    console.error("Profile picture fetch error:", error)
    return null
  }
}

export default async function HomePage() {
  // Fetch directly from database to bypass any caching
  const aboutMe = await getAboutMeDirect()
  const profilePic = await getProfilePicture()

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <Navigation />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          {/* Profile Picture */}
          <div className="mb-8">
            {profilePic && profilePic.image_url ? (
              <img
                src={profilePic.image_url || "/placeholder.svg"}
                alt="Max Dorman"
                className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-primary/20 shadow-lg"
              />
            ) : (
              <div className="w-32 h-32 rounded-full mx-auto bg-muted flex items-center justify-center border-4 border-primary/20 shadow-lg">
                <User className="w-16 h-16 text-muted-foreground" />
              </div>
            )}
          </div>

          <h2 className="text-5xl font-bold text-foreground mb-6">Welcome to My Digital Space</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Exploring Microsoft technologies and building digital solutions from the heart of Scotland
          </p>
        </div>

        {/* About Me Section */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl">About Me</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none dark:prose-invert">
              {aboutMe && aboutMe.content ? (
                <div dangerouslySetInnerHTML={{ __html: aboutMe.content }} />
              ) : (
                <div className="text-muted-foreground">
                  <p>
                    I'm Max Dorman, currently diving deep into Microsoft fundamentals and expanding my technical
                    expertise. Based in beautiful Fife, Scotland, I'm passionate about technology and helping others
                    through my skills. Whether it's learning new Microsoft technologies or working on exciting projects,
                    I'm always ready for the next challenge.
                  </p>
                </div>
              )}
            </div>
            {/* Debug info */}
            <div className="mt-4 text-xs text-muted-foreground">
              Last updated: {aboutMe?.updated_at ? new Date(aboutMe.updated_at).toLocaleString() : "Never"}
            </div>
          </CardContent>
        </Card>

        {/* Quick Links Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link href="/blog">
            <Card className="hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-blue-600" />
                  Blog
                </CardTitle>
                <CardDescription>Read my latest thoughts on technology, learning, and development</CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/portfolio">
            <Card className="hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Briefcase className="w-5 h-5 mr-2 text-green-600" />
                  Portfolio
                </CardTitle>
                <CardDescription>Explore my work including Excel projects and logo designs</CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/certificates">
            <Card className="hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="w-5 h-5 mr-2 text-yellow-600" />
                  Certificates
                </CardTitle>
                <CardDescription>View my professional certifications and achievements</CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/ms-learn">
            <Card className="hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="w-5 h-5 mr-2 text-purple-600" />
                  MS Learn Progress
                </CardTitle>
                <CardDescription>Track my Microsoft learning journey and progress</CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/resources">
            <Card className="hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ExternalLink className="w-5 h-5 mr-2 text-indigo-600" />
                  Resources
                </CardTitle>
                <CardDescription>Useful tools, learning materials, and Microsoft resources</CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/contact">
            <Card className="hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageCircle className="w-5 h-5 mr-2 text-red-600" />
                  Contact Me
                </CardTitle>
                <CardDescription>Get in touch for collaborations or inquiries</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-muted/50 text-muted-foreground py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="mb-4">© 2024 Max Dorman. All rights reserved.</p>
          <p>
            Contact:{" "}
            <a href="mailto:maxd@ittechs.io" className="text-primary hover:underline">
              maxd@ittechs.io
            </a>
          </p>
        </div>
      </footer>
    </div>
  )
}
