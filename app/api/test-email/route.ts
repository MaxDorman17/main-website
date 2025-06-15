import { type NextRequest, NextResponse } from "next/server"
import { sendBookingStatusEmail } from "@/lib/email"

export async function POST(request: NextRequest) {
  try {
    const { booking, type } = await request.json()

    console.log("Testing email with:", { booking, type })

    const result = await sendBookingStatusEmail(booking, type)

    console.log("Email result:", result)

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error testing email:", error)
    return NextResponse.json({ error: "Failed to send test email", details: error.message }, { status: 500 })
  }
}
