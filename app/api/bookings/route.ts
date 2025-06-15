import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function GET() {
  try {
    const bookings = await sql`
      SELECT * FROM bookings 
      ORDER BY created_at DESC
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
    console.log("Received booking data:", body)

    // Handle different possible field names
    const clientName = body.client_name || body.name || body.clientName
    const clientEmail = body.client_email || body.email || body.clientEmail
    const clientPhone = body.client_phone || body.phone || body.clientPhone
    const bookingDate = body.booking_date || body.date || body.bookingDate
    const bookingTime = body.booking_time || body.time || body.bookingTime
    const serviceType = body.service_type || body.service || body.serviceType
    const message = body.message || ""

    // Validation
    if (!clientName || !clientEmail || !bookingDate || !bookingTime || !serviceType) {
      console.error("Missing required fields:", {
        clientName: !!clientName,
        clientEmail: !!clientEmail,
        bookingDate: !!bookingDate,
        bookingTime: !!bookingTime,
        serviceType: !!serviceType,
      })
      return NextResponse.json(
        {
          error: "Missing required fields",
          required: ["client_name", "client_email", "booking_date", "booking_time", "service_type"],
          received: Object.keys(body),
        },
        { status: 400 },
      )
    }

    // Check if the time slot is already booked
    const existingBooking = await sql`
      SELECT id FROM bookings 
      WHERE booking_date = ${bookingDate} 
      AND booking_time = ${bookingTime} 
      AND status IN ('pending', 'confirmed')
    `

    if (existingBooking.length > 0) {
      return NextResponse.json({ error: "This time slot is already booked" }, { status: 400 })
    }

    // Insert the booking
    const result = await sql`
      INSERT INTO bookings (client_name, client_email, client_phone, booking_date, booking_time, service_type, message, status)
      VALUES (${clientName}, ${clientEmail}, ${clientPhone}, ${bookingDate}, ${bookingTime}, ${serviceType}, ${message}, 'pending')
      RETURNING *
    `

    console.log("Booking created successfully:", result[0])
    return NextResponse.json(
      {
        success: true,
        booking: result[0],
        message: "Booking created successfully",
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating booking:", error)
    return NextResponse.json(
      {
        error: "Failed to create booking",
        details: error.message,
      },
      { status: 500 },
    )
  }
}
