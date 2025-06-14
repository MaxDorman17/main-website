import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function GET() {
  try {
    const availability = await sql`
      SELECT * FROM availability 
      WHERE is_active = true
      ORDER BY day_of_week, start_time
    `
    return NextResponse.json(availability)
  } catch (error) {
    console.error("Error fetching availability:", error)
    return NextResponse.json({ error: "Failed to fetch availability" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { day_of_week, start_time, end_time } = body

    if (day_of_week === undefined || !start_time || !end_time) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const result = await sql`
      INSERT INTO availability (day_of_week, start_time, end_time)
      VALUES (${day_of_week}, ${start_time}, ${end_time})
      RETURNING *
    `

    return NextResponse.json(result[0], { status: 201 })
  } catch (error) {
    console.error("Error creating availability:", error)
    return NextResponse.json({ error: "Failed to create availability" }, { status: 500 })
  }
}
