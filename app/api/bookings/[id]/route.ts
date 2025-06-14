import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const { status } = body
    const bookingId = params.id

    if (!status) {
      return NextResponse.json({ error: "Status is required" }, { status: 400 })
    }

    const result = await sql`
      UPDATE bookings 
      SET status = ${status}, updated_at = CURRENT_TIMESTAMP
      WHERE id = ${bookingId}
      RETURNING *
    `

    if (result.length === 0) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 })
    }

    return NextResponse.json(result[0])
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
