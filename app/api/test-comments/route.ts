import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function GET() {
  try {
    // Check if comments table exists
    const tableCheck = await sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'blog_comments'
      )
    `

    // Get all comments (for testing)
    let comments = []
    try {
      comments = await sql`SELECT * FROM blog_comments ORDER BY created_at DESC LIMIT 10`
    } catch (error) {
      console.log("Error fetching comments:", error)
    }

    // Get blog posts for reference
    const blogPosts = await sql`SELECT id, title FROM blog_posts ORDER BY created_at DESC LIMIT 5`

    return NextResponse.json({
      tableExists: tableCheck[0].exists,
      commentsCount: comments.length,
      comments: comments,
      blogPosts: blogPosts,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Test error:", error)
    return NextResponse.json(
      {
        error: error.message,
        details: error.toString(),
      },
      { status: 500 },
    )
  }
}
