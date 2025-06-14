import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function GET() {
  try {
    // Create table if it doesn't exist
    await sql`
      CREATE TABLE IF NOT EXISTS hero_content (
        id SERIAL PRIMARY KEY,
        tagline VARCHAR(255) DEFAULT 'Technology Consultant & Microsoft Specialist',
        subtitle TEXT DEFAULT 'Delivering professional Microsoft solutions and digital services from Fife, Scotland',
        description TEXT DEFAULT 'Specializing in Excel development, logo design, and Microsoft Office consulting to help businesses streamline their operations and achieve their goals.',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    // Get existing content or insert default
    let result = await sql`SELECT * FROM hero_content ORDER BY updated_at DESC LIMIT 1`

    if (result.length === 0) {
      // Insert default content if none exists
      result = await sql`
        INSERT INTO hero_content (tagline, subtitle, description) 
        VALUES (
          'Technology Consultant & Microsoft Specialist',
          'Delivering professional Microsoft solutions and digital services from Fife, Scotland',
          'Specializing in Excel development, logo design, and Microsoft Office consulting to help businesses streamline their operations and achieve their goals.'
        )
        RETURNING *
      `
    }

    return NextResponse.json(result[0])
  } catch (error) {
    console.error("Get hero content error:", error)
    return NextResponse.json({ error: "Failed to fetch hero content" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { tagline, subtitle, description } = await request.json()

    if (!tagline || !subtitle || !description) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // Create table if it doesn't exist
    await sql`
      CREATE TABLE IF NOT EXISTS hero_content (
        id SERIAL PRIMARY KEY,
        tagline VARCHAR(255) DEFAULT 'Technology Consultant & Microsoft Specialist',
        subtitle TEXT DEFAULT 'Delivering professional Microsoft solutions and digital services from Fife, Scotland',
        description TEXT DEFAULT 'Specializing in Excel development, logo design, and Microsoft Office consulting to help businesses streamline their operations and achieve their goals.',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    // Update existing record or insert new one
    const existing = await sql`SELECT id FROM hero_content LIMIT 1`

    let result
    if (existing.length > 0) {
      result = await sql`
        UPDATE hero_content 
        SET tagline = ${tagline}, subtitle = ${subtitle}, description = ${description}, updated_at = CURRENT_TIMESTAMP 
        WHERE id = ${existing[0].id}
        RETURNING *
      `
    } else {
      result = await sql`
        INSERT INTO hero_content (tagline, subtitle, description) 
        VALUES (${tagline}, ${subtitle}, ${description})
        RETURNING *
      `
    }

    return NextResponse.json({ success: true, data: result[0] })
  } catch (error) {
    console.error("Save hero content error:", error)
    return NextResponse.json({ error: `Save failed: ${error.message}` }, { status: 500 })
  }
}
