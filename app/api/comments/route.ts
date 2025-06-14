import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function POST(request: NextRequest) {
  try {
    const { blog_post_id, author_name, author_email, content } = await request.json()

    console.log("Received comment data:", { blog_post_id, author_name, author_email, content })

    if (!blog_post_id || !author_name || !author_email || !content) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(author_email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 })
    }

    // First, let's check if the table exists and create it if it doesn't
    try {
      await sql`
        CREATE TABLE IF NOT EXISTS blog_comments (
          id SERIAL PRIMARY KEY,
          blog_post_id INTEGER REFERENCES blog_posts(id) ON DELETE CASCADE,
          author_name VARCHAR(100) NOT NULL,
          author_email VARCHAR(255) NOT NULL,
          content TEXT NOT NULL,
          is_approved BOOLEAN DEFAULT false,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `
      console.log("Comments table ensured")
    } catch (tableError) {
      console.log("Table creation error (might already exist):", tableError)
    }

    const result = await sql`
      INSERT INTO blog_comments (blog_post_id, author_name, author_email, content)
      VALUES (${blog_post_id}, ${author_name}, ${author_email}, ${content})
      RETURNING *
    `

    console.log("Comment saved successfully:", result[0])

    return NextResponse.json({
      success: true,
      message: "Comment submitted successfully! It will be visible after approval.",
      data: result[0],
    })
  } catch (error) {
    console.error("Error saving comment:", error)
    return NextResponse.json(
      {
        error: `Failed to save comment: ${error.message}`,
        details: error.toString(),
      },
      { status: 500 },
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const blogPostId = searchParams.get("blog_post_id")

    console.log("Fetching comments for blog post:", blogPostId)

    if (!blogPostId) {
      return NextResponse.json({ error: "Blog post ID is required" }, { status: 400 })
    }

    // Ensure table exists
    try {
      await sql`
        CREATE TABLE IF NOT EXISTS blog_comments (
          id SERIAL PRIMARY KEY,
          blog_post_id INTEGER REFERENCES blog_posts(id) ON DELETE CASCADE,
          author_name VARCHAR(100) NOT NULL,
          author_email VARCHAR(255) NOT NULL,
          content TEXT NOT NULL,
          is_approved BOOLEAN DEFAULT false,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `
    } catch (tableError) {
      console.log("Table creation error (might already exist):", tableError)
    }

    const comments = await sql`
      SELECT id, blog_post_id, author_name, content, created_at
      FROM blog_comments 
      WHERE blog_post_id = ${blogPostId} AND is_approved = true
      ORDER BY created_at ASC
    `

    console.log("Comments fetched:", comments.length)

    return NextResponse.json(comments)
  } catch (error) {
    console.error("Error fetching comments:", error)
    return NextResponse.json(
      {
        error: `Failed to fetch comments: ${error.message}`,
        details: error.toString(),
      },
      { status: 500 },
    )
  }
}
