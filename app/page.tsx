import type { Metadata } from "next"
import { getAllPosts } from "@/lib/mdx"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Github, Mail } from "lucide-react"
import { getAboutMe } from "@/lib/get-about-me"
import { getImage } from "@/lib/get-image"

export const metadata: Metadata = {
  title: "Home",
  description: "My personal website",
}

async function getPosts() {
  const posts = await getAllPosts()
  return posts
}

export default async function IndexPage() {
  const posts = await getPosts()
  const aboutMe = await getAboutMe()
  const profilePic = await getImage("profile")

  return (
    <div className="container grid items-start gap-8 pt-20 md:pt-40">
      <section className="flex flex-col gap-6">
        <div className="flex flex-col items-start gap-2">
          <Avatar className="h-32 w-32">
            <AvatarImage src={profilePic?.url || ""} alt={aboutMe?.name || "Profile Picture"} />
            <AvatarFallback>{aboutMe?.name?.substring(0, 2) || "PV"}</AvatarFallback>
          </Avatar>
          <h1 className="font-heading text-3xl">{aboutMe?.name || "Pawan Varma"}</h1>
          <p className="text-muted-foreground">{aboutMe?.designation || "Software Engineer"}</p>
          <div className="flex gap-2 mt-2">
            <a href={aboutMe?.github || ""} target="_blank" rel="noreferrer">
              <Button variant="ghost" size="icon">
                <Github className="h-4 w-4" />
              </Button>
            </a>
            <a href={`mailto:${aboutMe?.email || ""}`} target="_blank" rel="noreferrer">
              <Button variant="ghost" size="icon">
                <Mail className="h-4 w-4" />
              </Button>
            </a>
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>About Me</CardTitle>
            <CardDescription>A little bit about me</CardDescription>
          </CardHeader>
          <CardContent>{aboutMe?.about}</CardContent>
        </Card>
      </section>

      <section className="flex flex-col gap-4">
        <div className="flex justify-between">
          <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">Posts</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Card key={post.slug}>
              <CardHeader>
                <CardTitle>{post.frontmatter.title}</CardTitle>
                <CardDescription>{post.frontmatter.description}</CardDescription>
              </CardHeader>
              <CardFooter className="flex justify-between">
                <Badge>{post.frontmatter.category}</Badge>
                <Link href={`/blog/${post.slug}`}>
                  <Button>
                    Read More <Icons.arrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
