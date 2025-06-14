import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

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
