import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function GET() {
  try {
    // Create table if it doesn't exist - using proper syntax
    try {
      await sql`
        CREATE TABLE certificates (
          id SERIAL PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          issuer VARCHAR(255),
          description TEXT,
          file_url TEXT NOT NULL,
          date_earned DATE,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `
    } catch (error) {
      // Table already exists, ignore error
      if (!error.message.includes("already exists")) {
        throw error
      }
    }

    const result = await sql`SELECT * FROM certificates ORDER BY date_earned DESC, created_at DESC`
    return NextResponse.json(result)
  } catch (error) {
    console.error("Error fetching certificates:", error)
    return NextResponse.json({ error: "Failed to fetch certificates" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title, issuer, description, file_url, date_earned } = await request.json()

    if (!title || !file_url) {
      return NextResponse.json({ error: "Title and file URL are required" }, { status: 400 })
    }

    const result = await sql`
      INSERT INTO certificates (title, issuer, description, file_url, date_earned)
      VALUES (${title}, ${issuer || ""}, ${description || ""}, ${file_url}, ${date_earned || null})
      RETURNING *
    `

    return NextResponse.json({ success: true, data: result[0] })
  } catch (error) {
    console.error("Save certificate error:", error)
    return NextResponse.json({ error: `Save failed: ${error.message}` }, { status: 500 })
  }
}
