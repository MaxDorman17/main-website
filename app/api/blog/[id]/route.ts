import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const [post] = await sql`
      SELECT bp.*, 
             COALESCE(
               json_agg(
                 json_build_object(
                   'id', ba.id,
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

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

    return NextResponse.json(post)
  } catch (error) {
    console.error("Error fetching blog post:", error)
    return NextResponse.json({ error: "Failed to fetch post" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const { title, content } = await request.json()

    if (!title || !content) {
      return NextResponse.json({ error: "Title and content are required" }, { status: 400 })
    }

    const result = await sql`
      UPDATE blog_posts 
      SET title = ${title}, content = ${content}, updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING *
    `

    if (result.length === 0) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: result[0] })
  } catch (error) {
    console.error("Error updating blog post:", error)
    return NextResponse.json({ error: "Failed to update post" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    // Delete attachments first (cascade should handle this, but being explicit)
    await sql`DELETE FROM blog_attachments WHERE blog_post_id = ${id}`

    // Delete the blog post
    const result = await sql`DELETE FROM blog_posts WHERE id = ${id} RETURNING *`

    if (result.length === 0) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting blog post:", error)
    return NextResponse.json({ error: "Failed to delete post" }, { status: 500 })
  }
}
