import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const availabilityId = params.id

    const result = await sql`
      DELETE FROM availability WHERE id = ${availabilityId}
      RETURNING *
    `

    if (result.length === 0) {
      return NextResponse.json({ error: "Availability slot not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Availability slot deleted successfully" })
  } catch (error) {
    console.error("Error deleting availability:", error)
    return NextResponse.json({ error: "Failed to delete availability" }, { status: 500 })
  }
}
