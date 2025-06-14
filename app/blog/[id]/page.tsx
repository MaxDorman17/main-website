import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Download, Calendar, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Comments } from "@/components/comments"
import { neon } from "@neondatabase/serverless"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

const sql = neon(process.env.DATABASE_URL!)

interface Props {
  params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const [post] = await sql`
      SELECT title, content FROM blog_posts WHERE id = ${params.id}
    `

    if (!post) {
      return {
        title: "Post Not Found",
      }
    }

    // Extract first 160 characters for description
    const description = post.content.replace(/<[^>]*>/g, "").substring(0, 160) + "..."

    return {
      title: post.title,
      description,
      openGraph: {
        title: post.title,
        description,
        type: "article",
      },
    }
  } catch (error) {
    return {
      title: "Blog Post",
    }
  }
}

async function getBlogPost(id: string) {
  try {
    const [post] = await sql`
      SELECT bp.*, 
             COALESCE(
               json_agg(
                 json_build_object(
                   'name', ba.file_name,
                   'url', ba.file_url,
                   'type', ba.file_type
                 )
               ) FILTER (WHERE ba.id IS NOT NULL), 
               '[]'
             ) as attachments
      FROM blog_posts bp
      LEFT JOIN blog_attachments ba ON bp.id = ba.blog_post_id
      WHERE bp.id = ${id}
      GROUP BY bp.id
    `

    return post
  } catch (error) {
    console.error("Error fetching blog post:", error)
    return null
  }
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getBlogPost(params.id)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-6">
          <Link href="/blog">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>

        <article>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-3xl">{post.title}</CardTitle>
              <CardDescription className="flex items-center text-sm text-muted-foreground">
                <Calendar className="w-4 h-4 mr-2" />
                {new Date(post.created_at).toLocaleDateString()}
                {post.updated_at !== post.created_at && (
                  <span className="ml-4">Updated: {new Date(post.updated_at).toLocaleDateString()}</span>
                )}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none mb-6 dark:prose-invert">
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              </div>

              {post.attachments && Array.isArray(post.attachments) && post.attachments.length > 0 && (
                <div className="border-t pt-6">
                  <h4 className="font-semibold mb-3">Attachments:</h4>
                  <div className="flex flex-wrap gap-2">
                    {post.attachments.map((attachment, index) => (
                      <Link key={index} href={attachment.url} target="_blank">
                        <Button variant="outline" size="sm">
                          {attachment.type === "image" ? (
                            <img src={attachment.url || "/placeholder.svg"} alt="attachment" className="w-4 h-4 mr-2" />
                          ) : (
                            <FileText className="w-4 h-4 mr-2" />
                          )}
                          {attachment.name}
                          <Download className="w-3 h-3 ml-2" />
                        </Button>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Comments Section */}
          <Comments blogPostId={post.id} />
        </article>
      </div>
    </div>
  )
}
