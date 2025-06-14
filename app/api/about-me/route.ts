import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function GET() {
  try {
    const result = await sql`SELECT * FROM about_me ORDER BY updated_at DESC LIMIT 1`
    console.log("GET about-me result:", result[0])
    return NextResponse.json(result[0] || { content: "" })
  } catch (error) {
    console.error("Get error:", error)
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { content } = await request.json()
    console.log("Received content to save:", content)

    if (!content) {
      return NextResponse.json({ error: "Content is required" }, { status: 400 })
    }

    // Update the existing record
    const result = await sql`
      UPDATE about_me 
      SET content = ${content}, updated_at = CURRENT_TIMESTAMP 
      WHERE id = (SELECT id FROM about_me ORDER BY updated_at DESC LIMIT 1)
      RETURNING *
    `

    console.log("Update result:", result)

    if (result.length > 0) {
      return NextResponse.json({ success: true, data: result[0] })
    } else {
      // If no existing record, insert new one
      const insertResult = await sql`
        INSERT INTO about_me (content) 
        VALUES (${content}) 
        RETURNING *
      `
      console.log("Insert result:", insertResult)
      return NextResponse.json({ success: true, data: insertResult[0] })
    }
  } catch (error) {
    console.error("Save error:", error)
    return NextResponse.json({ error: `Save failed: ${error.message}` }, { status: 500 })
  }
}
