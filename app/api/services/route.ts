import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function GET() {
  try {
    // Create table if it doesn't exist
    await sql`
      CREATE TABLE IF NOT EXISTS services (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        features TEXT[],
        price_from DECIMAL(10,2),
        price_type VARCHAR(50) DEFAULT 'from',
        currency VARCHAR(3) DEFAULT 'GBP',
        is_featured BOOLEAN DEFAULT false,
        display_order INTEGER DEFAULT 0,
        icon_name VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    const result = await sql`
      SELECT * FROM services 
      ORDER BY display_order ASC, created_at ASC
    `

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error fetching services:", error)
    return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title, description, features, price_from, price_type, currency, is_featured, display_order, icon_name } =
      await request.json()

    if (!title || !description) {
      return NextResponse.json({ error: "Title and description are required" }, { status: 400 })
    }

    const result = await sql`
      INSERT INTO services (title, description, features, price_from, price_type, currency, is_featured, display_order, icon_name)
      VALUES (${title}, ${description}, ${features || []}, ${price_from || null}, ${price_type || "from"}, ${currency || "GBP"}, ${is_featured || false}, ${display_order || 0}, ${icon_name || null})
      RETURNING *
    `

    return NextResponse.json({ success: true, data: result[0] })
  } catch (error) {
    console.error("Save service error:", error)
    return NextResponse.json({ error: `Save failed: ${error.message}` }, { status: 500 })
  }
}
