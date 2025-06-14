import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function GET() {
  try {
    // Create table if it doesn't exist
    await sql`
      CREATE TABLE IF NOT EXISTS portfolio_excel (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        file_url TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    const result = await sql`SELECT * FROM portfolio_excel ORDER BY created_at DESC`
    return NextResponse.json(result)
  } catch (error) {
    console.error("Error fetching Excel projects:", error)
    return NextResponse.json({ error: "Failed to fetch Excel projects" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title, description, file_url } = await request.json()

    if (!title || !file_url) {
      return NextResponse.json({ error: "Title and file URL are required" }, { status: 400 })
    }

    const result = await sql`
      INSERT INTO portfolio_excel (title, description, file_url)
      VALUES (${title}, ${description || ""}, ${file_url})
      RETURNING *
    `

    return NextResponse.json({ success: true, data: result[0] })
  } catch (error) {
    console.error("Save Excel project error:", error)
    return NextResponse.json({ error: `Save failed: ${error.message}` }, { status: 500 })
  }
}
