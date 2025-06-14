import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, service_interest, message, phone, company, budget_range, timeline } =
      await request.json()

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required" }, { status: 400 })
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 })
    }

    // Create table if it doesn't exist
    await sql`
      CREATE TABLE IF NOT EXISTS contact_submissions (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        subject VARCHAR(255),
        service_interest VARCHAR(255),
        message TEXT NOT NULL,
        phone VARCHAR(50),
        company VARCHAR(255),
        budget_range VARCHAR(100),
        timeline VARCHAR(100),
        is_read BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    // Insert the submission
    const result = await sql`
      INSERT INTO contact_submissions (name, email, subject, service_interest, message, phone, company, budget_range, timeline)
      VALUES (${name}, ${email}, ${subject || null}, ${service_interest || null}, ${message}, ${phone || null}, ${company || null}, ${budget_range || null}, ${timeline || null})
      RETURNING *
    `

    return NextResponse.json({
      success: true,
      message: "Thank you for your message! I'll get back to you within 24 hours.",
      data: result[0],
    })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json({ error: `Failed to submit contact form: ${error.message}` }, { status: 500 })
  }
}

export async function GET() {
  try {
    // Create table if it doesn't exist
    await sql`
      CREATE TABLE IF NOT EXISTS contact_submissions (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        subject VARCHAR(255),
        service_interest VARCHAR(255),
        message TEXT NOT NULL,
        phone VARCHAR(50),
        company VARCHAR(255),
        budget_range VARCHAR(100),
        timeline VARCHAR(100),
        is_read BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    const result = await sql`
      SELECT * FROM contact_submissions 
      ORDER BY created_at DESC
    `

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error fetching contact submissions:", error)
    return NextResponse.json({ error: "Failed to fetch submissions" }, { status: 500 })
  }
}
