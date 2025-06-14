import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function GET() {
  try {
    // Create table if it doesn't exist
    await sql`
      CREATE TABLE IF NOT EXISTS profile_picture (
        id SERIAL PRIMARY KEY,
        image_url TEXT NOT NULL,
        alt_text VARCHAR(255) DEFAULT 'Profile Picture',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    const result = await sql`SELECT * FROM profile_picture ORDER BY updated_at DESC LIMIT 1`
    return NextResponse.json(result[0] || null)
  } catch (error) {
    console.error("Get profile picture error:", error)
    return NextResponse.json({ error: "Failed to fetch profile picture" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { image_url, alt_text } = await request.json()

    if (!image_url) {
      return NextResponse.json({ error: "Image URL is required" }, { status: 400 })
    }

    // Create table if it doesn't exist
    await sql`
      CREATE TABLE IF NOT EXISTS profile_picture (
        id SERIAL PRIMARY KEY,
        image_url TEXT NOT NULL,
        alt_text VARCHAR(255) DEFAULT 'Profile Picture',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    // Delete existing profile picture and insert new one
    await sql`DELETE FROM profile_picture`

    const result = await sql`
      INSERT INTO profile_picture (image_url, alt_text) 
      VALUES (${image_url}, ${alt_text || "Profile Picture"})
      RETURNING *
    `

    return NextResponse.json({ success: true, data: result[0] })
  } catch (error) {
    console.error("Save profile picture error:", error)
    return NextResponse.json({ error: `Save failed: ${error.message}` }, { status: 500 })
  }
}
