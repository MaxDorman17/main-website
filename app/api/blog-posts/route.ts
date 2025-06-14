import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function GET() {
  try {
    const posts = await sql`
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
      GROUP BY bp.id
      ORDER BY bp.created_at DESC
    `

    return NextResponse.json(posts)
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 })
  }
}
