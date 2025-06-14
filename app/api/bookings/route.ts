import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function GET() {
  try {
    const bookings = await sql`
      SELECT * FROM bookings 
      ORDER BY booking_date DESC, booking_time DESC
    `
    return NextResponse.json(bookings)
  } catch (error) {
    console.error("Error fetching bookings:", error)
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { client_name, client_email, client_phone, booking_date, booking_time, service_type, message } = body

    if (!client_name || !client_email || !booking_date || !booking_time || !service_type) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Check if the time slot is already booked
    const existingBooking = await sql`
      SELECT id FROM bookings 
      WHERE booking_date = ${booking_date} 
      AND booking_time = ${booking_time} 
      AND status IN ('pending', 'confirmed')
    `

    if (existingBooking.length > 0) {
      return NextResponse.json({ error: "This time slot is already booked" }, { status: 400 })
    }

    const result = await sql`
      INSERT INTO bookings (client_name, client_email, client_phone, booking_date, booking_time, service_type, message)
      VALUES (${client_name}, ${client_email}, ${client_phone}, ${booking_date}, ${booking_time}, ${service_type}, ${message})
      RETURNING *
    `

    return NextResponse.json(result[0], { status: 201 })
  } catch (error) {
    console.error("Error creating booking:", error)
    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 })
  }
}
