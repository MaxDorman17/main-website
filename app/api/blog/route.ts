import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function POST(request: NextRequest) {
  try {
    const { title, content, attachments } = await request.json()
    console.log("Creating blog post:", { title, content, attachments })

    if (!title || !content) {
      return NextResponse.json({ error: "Title and content are required" }, { status: 400 })
    }

    // Insert blog post
    const [post] = await sql`
      INSERT INTO blog_posts (title, content) 
      VALUES (${title}, ${content})
      RETURNING id
    `

    console.log("Blog post created with ID:", post.id)

    // Insert attachments if any
    if (attachments && attachments.length > 0) {
      for (const attachment of attachments) {
        await sql`
          INSERT INTO blog_attachments (blog_post_id, file_name, file_url, file_type)
          VALUES (${post.id}, ${attachment.name}, ${attachment.url}, ${attachment.type})
        `
      }
      console.log("Attachments saved:", attachments.length)
    }

    return NextResponse.json({ success: true, postId: post.id })
  } catch (error) {
    console.error("Save blog post error:", error)
    return NextResponse.json({ error: `Save failed: ${error.message}` }, { status: 500 })
  }
}
