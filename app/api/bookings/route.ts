import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"
import { Resend } from "resend"

const sql = neon(process.env.DATABASE_URL!)
const resend = new Resend(process.env.RESEND_API_KEY)

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

    const booking = result[0]

    // Send admin notification email
    try {
      await resend.emails.send({
        from: "Website <onboarding@resend.dev>",
        to: ["maxdorman17@outlook.com"], // Your email
        subject: `🔔 New Booking Request - ${serviceType}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #1a1a1a; color: #ffffff; padding: 20px; border-radius: 10px;">
            <h1 style="color: #00ffff; text-align: center;">New Booking Request!</h1>
            
            <div style="background: #2a2a2a; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h2 style="color: #00ffff; margin-top: 0;">📋 Booking Details:</h2>
              <p><strong>Client:</strong> ${clientName}</p>
              <p><strong>Email:</strong> ${clientEmail}</p>
              <p><strong>Phone:</strong> ${clientPhone || "Not provided"}</p>
              <p><strong>Service:</strong> ${serviceType}</p>
              <p><strong>Date:</strong> ${new Date(bookingDate).toLocaleDateString("en-GB", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}</p>
              <p><strong>Time:</strong> ${bookingTime}</p>
              ${message ? `<p><strong>Message:</strong> ${message}</p>` : ""}
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://maxdorman.co.uk/admin" 
                 style="background: #00ffff; color: #000; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">
                Go to Admin Panel
              </a>
            </div>
            
            <p style="color: #888; text-align: center; font-size: 12px;">
              Visit your admin panel to accept or reject this booking.
            </p>
          </div>
        `,
      })
      console.log("Admin notification sent successfully")
    } catch (emailError) {
      console.error("Failed to send admin notification:", emailError)
      // Don't fail the booking if email fails
    }

    console.log("Booking created successfully:", booking)
    return NextResponse.json(
      {
        success: true,
        booking: booking,
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
