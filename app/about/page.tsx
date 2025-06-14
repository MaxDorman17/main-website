import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { User, MapPin, Briefcase, GraduationCap, Star } from "lucide-react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { neon } from "@neondatabase/serverless"

export const dynamic = "force-dynamic"

const sql = neon(process.env.DATABASE_URL!)

async function getAboutData() {
  try {
    const [aboutMe, profilePic] = await Promise.all([
      sql`SELECT * FROM about_me ORDER BY updated_at DESC LIMIT 1`,
      sql`SELECT * FROM profile_picture ORDER BY updated_at DESC LIMIT 1`,
    ])
    return { aboutMe: aboutMe[0], profilePic: profilePic[0] }
  } catch (error) {
    console.error("Error fetching about data:", error)
    return { aboutMe: null, profilePic: null }
  }
}

export default async function AboutPage() {
  const { aboutMe, profilePic } = await getAboutData()

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4 hero-title">About Max Dorman</h1>
          <p className="text-xl text-muted-foreground">
            Get to know the person behind the <span className="text-neon-pink">technology</span>
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Profile Section */}
          <div className="md:col-span-1">
            <Card className="cyber-card">
              <CardContent className="text-center p-6">
                {profilePic?.image_url ? (
                  <img
                    src={profilePic.image_url || "/placeholder.svg"}
                    alt="Max Dorman"
                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-primary/50 shadow-[0_0_20px_rgba(0,212,255,0.4)]"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full mx-auto mb-4 bg-gradient-to-br from-primary/20 to-neon-pink/20 flex items-center justify-center border-4 border-primary/50">
                    <User className="w-16 h-16 text-primary" />
                  </div>
                )}
                <h2 className="text-2xl font-bold text-foreground mb-2">Max Dorman</h2>
                <p className="text-neon-pink mb-4">Microsoft Fundamentals Student</p>

                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center justify-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    Fife, Scotland
                  </div>
                  <div className="flex items-center justify-center">
                    <Briefcase className="w-4 h-4 mr-2" />
                    Technology Enthusiast
                  </div>
                  <div className="flex items-center justify-center">
                    <GraduationCap className="w-4 h-4 mr-2" />
                    Continuous Learner
                  </div>
                </div>

                <div className="mt-6">
                  <Link href="/contact">
                    <Button className="w-full">
                      Get In Touch
                      <Star className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* About Content */}
          <div className="md:col-span-2">
            <Card className="cyber-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="w-6 h-6 mr-2 text-primary" />
                  My Story
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none dark:prose-invert prose-headings:text-primary prose-links:text-neon-pink">
                  {aboutMe?.content ? (
                    <div dangerouslySetInnerHTML={{ __html: aboutMe.content }} />
                  ) : (
                    <div className="space-y-4">
                      <p>
                        I'm <span className="text-neon-pink font-semibold">Max Dorman</span>, a passionate technology
                        enthusiast currently diving deep into Microsoft fundamentals and expanding my technical
                        expertise. Based in the beautiful region of{" "}
                        <span className="text-neon-cyan">Fife, Scotland</span>, I'm on an exciting journey of continuous
                        learning and professional development.
                      </p>
                      <p>
                        My passion lies in helping others through technology, whether it's creating efficient Excel
                        solutions, designing memorable logos, or providing technology consulting. I believe in the power
                        of <span className="text-neon-pink">continuous learning</span> and staying current with the
                        latest Microsoft technologies.
                      </p>
                      <p>
                        When I'm not immersed in learning new technologies, I enjoy working on creative projects and
                        finding innovative solutions to everyday challenges. I'm always ready for the next{" "}
                        <span className="text-neon-cyan">opportunity</span> to grow and make a positive impact.
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Skills & Interests */}
            <Card className="cyber-card mt-6">
              <CardHeader>
                <CardTitle>Skills & Interests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-neon-pink mb-2">Technical Skills</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Microsoft Office Suite</li>
                      <li>• Excel Advanced Functions</li>
                      <li>• Logo Design</li>
                      <li>• Technology Consulting</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-neon-cyan mb-2">Learning Focus</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Microsoft Azure</li>
                      <li>• Microsoft 365</li>
                      <li>• PowerShell</li>
                      <li>• Cloud Technologies</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
