import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const date = searchParams.get("date")

    if (!date) {
      return NextResponse.json({ error: "Date parameter is required" }, { status: 400 })
    }

    const selectedDate = new Date(date)
    const dayOfWeek = selectedDate.getDay()

    // Get availability for this day of week
    const availability = await sql`
      SELECT * FROM availability 
      WHERE day_of_week = ${dayOfWeek} AND is_active = true
      ORDER BY start_time
    `

    if (availability.length === 0) {
      return NextResponse.json([])
    }

    // Get existing bookings for this date
    const existingBookings = await sql`
      SELECT booking_time FROM bookings 
      WHERE booking_date = ${date} 
      AND status IN ('pending', 'confirmed')
    `

    const bookedTimes = existingBookings.map((booking) => booking.booking_time)

    // Generate available time slots
    const availableTimes = []

    for (const slot of availability) {
      const startTime = new Date(`2000-01-01T${slot.start_time}`)
      const endTime = new Date(`2000-01-01T${slot.end_time}`)

      // Generate 1-hour slots
      while (startTime < endTime) {
        const timeString = startTime.toTimeString().slice(0, 5)

        if (!bookedTimes.includes(timeString)) {
          availableTimes.push(timeString)
        }

        startTime.setHours(startTime.getHours() + 1)
      }
    }

    return NextResponse.json(availableTimes)
  } catch (error) {
    console.error("Error fetching available times:", error)
    return NextResponse.json({ error: "Failed to fetch available times" }, { status: 500 })
  }
}
