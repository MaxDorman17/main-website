import { NextResponse } from "next/server"
import { sql } from "@vercel/postgres"
import { z } from "zod"
import { sendBookingNotificationToAdmin } from "@/lib/email"

const schema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  phone: z.string().min(10),
  date: z.string(),
  time: z.string(),
  guests: z.number().min(1),
  message: z.string().optional(),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const result = schema.safeParse(body)

    if (!result.success) {
      console.log(result.error)
      return NextResponse.json({ message: "Invalid input data", error: result.error.issues }, { status: 400 })
    }

    const { name, email, phone, date, time, guests, message } = result.data

    const data = await sql`
      INSERT INTO bookings (name, email, phone, date, time, guests, message)
      VALUES (${name}, ${email}, ${phone}, ${date}, ${time}, ${guests}, ${message})
      RETURNING *;
    `

    // Send notification to admin
    await sendBookingNotificationToAdmin(data.rows[0])

    return NextResponse.json({ message: "Booking created", booking: data.rows }, { status: 201 })
  } catch (error: any) {
    console.error(error)
    return NextResponse.json({ message: "Error creating booking", error: error.message }, { status: 500 })
  }
}
