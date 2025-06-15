import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Code, Palette, Users, Star, Mail, Phone } from "lucide-react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { neon } from "@neondatabase/serverless"

export const dynamic = "force-dynamic"

const sql = neon(process.env.DATABASE_URL!)

async function getHomeData() {
  try {
    const [heroContent, profilePic, services, recentPosts] = await Promise.all([
      sql`SELECT * FROM hero_content ORDER BY updated_at DESC LIMIT 1`,
      sql`SELECT * FROM profile_picture ORDER BY updated_at DESC LIMIT 1`,
      sql`SELECT * FROM services ORDER BY created_at ASC LIMIT 3`,
      sql`SELECT * FROM blog_posts ORDER BY created_at DESC LIMIT 3`,
    ])
    return {
      heroContent: heroContent[0],
      profilePic: profilePic[0],
      services,
      recentPosts,
    }
  } catch (error) {
    console.error("Error fetching home data:", error)
    return { heroContent: null, profilePic: null, services: [], recentPosts: [] }
  }
}

export default async function HomePage() {
  const { heroContent, profilePic, services, recentPosts } = await getHomeData()

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold text-foreground hero-title">
                  {heroContent?.title || (
                    <>
                      Hi, I'm <span className="text-neon-pink">Max Dorman</span>
                    </>
                  )}
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  {heroContent?.subtitle ||
                    "Microsoft Fundamentals Student & Technology Enthusiast based in Fife, Scotland"}
                </p>
                <p className="text-lg text-muted-foreground">
                  {heroContent?.description ||
                    "Passionate about helping others through technology, creating efficient solutions, and continuous learning."}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact">
                  <Button size="lg" className="w-full sm:w-auto">
                    Get In Touch
                    <Mail className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link href="/services">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    View Services
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>

              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  Available for projects
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Based in Fife, Scotland
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10">
                {profilePic?.image_url ? (
                  <img
                    src={profilePic.image_url || "/placeholder.svg"}
                    alt="Max Dorman"
                    className="w-80 h-80 rounded-full object-cover mx-auto shadow-2xl border-4 border-primary/20"
                  />
                ) : (
                  <div className="w-80 h-80 rounded-full bg-gradient-to-br from-primary/20 to-neon-pink/20 mx-auto shadow-2xl border-4 border-primary/20 flex items-center justify-center">
                    <Users className="w-32 h-32 text-primary/50" />
                  </div>
                )}
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-neon-pink/20 to-neon-cyan/20 rounded-2xl blur-3xl transform rotate-6"></div>
            </div>
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-3xl lg:text-4xl font-bold text-foreground">About Me</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  I'm a passionate Microsoft Fundamentals student based in Fife, Scotland, with a deep love for
                  technology and helping others succeed through innovative solutions.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  My journey in technology is driven by curiosity and a commitment to continuous learning. I specialize
                  in creating efficient, user-friendly solutions that make a real difference in people's lives and
                  businesses.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  When I'm not coding or designing, you'll find me exploring the latest tech trends, working on personal
                  projects, or helping others navigate their technology challenges.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h3 className="font-semibold text-foreground">Location</h3>
                  <p className="text-muted-foreground">Fife, Scotland</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-foreground">Focus</h3>
                  <p className="text-muted-foreground">Microsoft Fundamentals</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-foreground">Specialties</h3>
                  <p className="text-muted-foreground">Excel, Design, Consulting</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-foreground">Experience</h3>
                  <p className="text-muted-foreground">Technology Solutions</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/about">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Learn More About Me
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link href="/certificates">
                  <Button variant="ghost" size="lg" className="w-full sm:w-auto">
                    View Certificates
                    <Star className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative">
              <Card className="cyber-card p-8">
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-foreground mb-4">My Mission</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      "To bridge the gap between complex technology and practical solutions, making digital tools
                      accessible and beneficial for everyone."
                    </p>
                  </div>

                  <div className="section-divider"></div>

                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="space-y-2">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                        <Code className="w-6 h-6 text-primary" />
                      </div>
                      <h4 className="font-semibold text-sm">Innovation</h4>
                    </div>
                    <div className="space-y-2">
                      <div className="w-12 h-12 bg-neon-pink/10 rounded-full flex items-center justify-center mx-auto">
                        <Users className="w-6 h-6 text-neon-pink" />
                      </div>
                      <h4 className="font-semibold text-sm">Collaboration</h4>
                    </div>
                    <div className="space-y-2">
                      <div className="w-12 h-12 bg-neon-cyan/10 rounded-full flex items-center justify-center mx-auto">
                        <Star className="w-6 h-6 text-neon-cyan" />
                      </div>
                      <h4 className="font-semibold text-sm">Excellence</h4>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">What I Can Help You With</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Specialized services to help you succeed with technology
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.length > 0 ? (
              services.map((service) => (
                <Card key={service.id} className="cyber-card group hover:scale-105 transition-transform">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <Code className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{service.description}</p>
                    <p className="text-2xl font-bold text-neon-pink">£{service.price}</p>
                  </CardContent>
                </Card>
              ))
            ) : (
              // Default services if none in database
              <>
                <Card className="cyber-card group hover:scale-105 transition-transform">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <Code className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">Excel Solutions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">Custom Excel spreadsheets and automation</p>
                    <p className="text-2xl font-bold text-neon-pink">From £25</p>
                  </CardContent>
                </Card>

                <Card className="cyber-card group hover:scale-105 transition-transform">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <Palette className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">Logo Design</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">Professional logo design and branding</p>
                    <p className="text-2xl font-bold text-neon-pink">From £50</p>
                  </CardContent>
                </Card>

                <Card className="cyber-card group hover:scale-105 transition-transform">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">Tech Consulting</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">Technology advice and guidance</p>
                    <p className="text-2xl font-bold text-neon-pink">From £30/hr</p>
                  </CardContent>
                </Card>
              </>
            )}
          </div>

          <div className="text-center mt-12">
            <Link href="/services">
              <Button size="lg" variant="outline">
                View All Services
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Recent Blog Posts */}
      {recentPosts.length > 0 && (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Latest Insights</h2>
              <p className="text-xl text-muted-foreground">Recent thoughts and updates from my journey</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {recentPosts.map((post) => (
                <Card key={post.id} className="cyber-card group hover:scale-105 transition-transform">
                  <CardHeader>
                    <CardTitle className="text-lg line-clamp-2">{post.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground line-clamp-3 mb-4">
                      {post.content.replace(/<[^>]*>/g, "").substring(0, 120)}...
                    </p>
                    <Link href={`/blog/${post.id}`}>
                      <Button variant="ghost" size="sm">
                        Read More
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/blog">
                <Button size="lg" variant="outline">
                  View All Posts
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 via-neon-pink/10 to-neon-cyan/10">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">Ready to Start Your Project?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let's work together to bring your ideas to life with technology that makes a difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="w-full sm:w-auto">
                Get Started Today
                <Star className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/book">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Book a Consultation
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
