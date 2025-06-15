import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"
import { Resend } from "resend"

const sql = neon(process.env.DATABASE_URL!)
const resend = new Resend(process.env.RESEND_API_KEY)

async function sendBookingStatusEmail(booking: any, status: "accepted" | "rejected") {
  try {
    const subject =
      status === "accepted"
        ? `🎉 Booking Confirmed - ${booking.service_type}`
        : `📅 Booking Update - ${booking.service_type}`

    const html =
      status === "accepted"
        ? `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #1a1a1a; color: #ffffff; padding: 20px; border-radius: 10px;">
        <h1 style="color: #00ffff; text-align: center;">Max Dorman</h1>
        <h2 style="color: #00ffff;">🎉 Booking Confirmed!</h2>
        <p>Hi ${booking.client_name},</p>
        <p>Great news! Your booking has been confirmed. I'm excited to work with you!</p>
        
        <div style="background: #2a2a2a; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <h3 style="color: #00ffff;">📅 Booking Details:</h3>
          <p><strong>Service:</strong> ${booking.service_type}</p>
          <p><strong>Date:</strong> ${new Date(booking.booking_date).toLocaleDateString("en-GB", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}</p>
          <p><strong>Time:</strong> ${booking.booking_time}</p>
          ${booking.message ? `<p><strong>Your Message:</strong> ${booking.message}</p>` : ""}
        </div>
        
        <h3 style="color: #00ffff;">🚀 What's Next?</h3>
        <p>I'll be in touch soon with:</p>
        <ul style="color: #ccc;">
          <li>Meeting details and access information</li>
          <li>Any preparation materials you might need</li>
          <li>My contact information for any questions</li>
        </ul>
        
        <p>If you have any questions before our session, feel free to reach out!</p>
        
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #444;">
          <p style="color: #888; margin: 0;">Best regards,</p>
          <p style="color: #00ffff; font-weight: bold; margin: 5px 0;">Max Dorman</p>
          <p style="color: #888; font-size: 12px;">Technology Consultant & Microsoft Specialist</p>
          <p style="color: #888; font-size: 12px;">Fife, Scotland</p>
        </div>
      </div>
    `
        : `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #1a1a1a; color: #ffffff; padding: 20px; border-radius: 10px;">
        <h1 style="color: #00ffff; text-align: center;">Max Dorman</h1>
        <h2 style="color: #ff6b6b;">📅 Booking Update</h2>
        <p>Hi ${booking.client_name},</p>
        <p>Thank you for your interest in my services. Unfortunately, I'm not available for your requested time slot.</p>
        
        <div style="background: #2a2a2a; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <h3 style="color: #00ffff;">📋 Your Request:</h3>
          <p><strong>Service:</strong> ${booking.service_type}</p>
          <p><strong>Requested Date:</strong> ${new Date(booking.booking_date).toLocaleDateString("en-GB", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}</p>
          <p><strong>Requested Time:</strong> ${booking.booking_time}</p>
        </div>
        
        <h3 style="color: #00ffff;">🔄 Let's Find Another Time!</h3>
        <p>I'd love to work with you on this project. Please:</p>
        <ul style="color: #ccc;">
          <li>Check my booking page for other available slots</li>
          <li>Consider alternative dates or times</li>
          <li>Contact me directly if you need flexible scheduling</li>
        </ul>
        
        <div style="text-align: center; margin: 20px 0;">
          <a href="https://maxdorman.co.uk/book" 
             style="background: #00ffff; color: #000; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">
            View Available Times
          </a>
        </div>
        
        <p>I appreciate your understanding and look forward to working with you soon!</p>
        
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #444;">
          <p style="color: #888; margin: 0;">Best regards,</p>
          <p style="color: #00ffff; font-weight: bold; margin: 5px 0;">Max Dorman</p>
          <p style="color: #888; font-size: 12px;">Technology Consultant & Microsoft Specialist</p>
          <p style="color: #888; font-size: 12px;">Fife, Scotland</p>
        </div>
      </div>
    `

    const result = await resend.emails.send({
      from: "Max Dorman <onboarding@resend.dev>",
      to: [booking.client_email],
      subject: subject,
      html: html,
    })

    console.log("Customer email sent successfully:", result)
    return { success: true, result }
  } catch (error) {
    console.error("Error sending customer email:", error)
    return { success: false, error: error.message }
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const { status } = body
    const bookingId = params.id

    if (!status) {
      return NextResponse.json({ error: "Status is required" }, { status: 400 })
    }

    // Update booking status
    const result = await sql`
      UPDATE bookings 
      SET status = ${status}, updated_at = CURRENT_TIMESTAMP
      WHERE id = ${bookingId}
      RETURNING *
    `

    if (result.length === 0) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 })
    }

    const booking = result[0]

    // Send email notification to customer
    if (status === "accepted" || status === "rejected") {
      const emailResult = await sendBookingStatusEmail(booking, status)
      console.log("Email notification result:", emailResult)
    }

    return NextResponse.json({
      success: true,
      booking: booking,
      message: `Booking ${status} successfully`,
    })
  } catch (error) {
    console.error("Error updating booking:", error)
    return NextResponse.json({ error: "Failed to update booking" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const bookingId = params.id

    const result = await sql`
      DELETE FROM bookings WHERE id = ${bookingId}
      RETURNING *
    `

    if (result.length === 0) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Booking deleted successfully" })
  } catch (error) {
    console.error("Error deleting booking:", error)
    return NextResponse.json({ error: "Failed to delete booking" }, { status: 500 })
  }
}
