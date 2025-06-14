import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function GET() {
  try {
    // Create table if it doesn't exist
    await sql`
      CREATE TABLE IF NOT EXISTS ms_learn_progress (
        id SERIAL PRIMARY KEY,
        course_name VARCHAR(255) NOT NULL,
        description TEXT,
        progress_percentage INTEGER DEFAULT 0 CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
        status VARCHAR(20) DEFAULT 'not_started' CHECK (status IN ('not_started', 'in_progress', 'completed')),
        modules_completed INTEGER DEFAULT 0,
        total_modules INTEGER,
        estimated_completion DATE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    const result = await sql`SELECT * FROM ms_learn_progress ORDER BY updated_at DESC`
    return NextResponse.json(result)
  } catch (error) {
    console.error("Error fetching MS Learn progress:", error)
    return NextResponse.json({ error: "Failed to fetch MS Learn progress" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const {
      course_name,
      description,
      progress_percentage,
      status,
      modules_completed,
      total_modules,
      estimated_completion,
    } = await request.json()

    if (!course_name) {
      return NextResponse.json({ error: "Course name is required" }, { status: 400 })
    }

    const result = await sql`
      INSERT INTO ms_learn_progress (
        course_name, 
        description, 
        progress_percentage, 
        status, 
        modules_completed, 
        total_modules, 
        estimated_completion
      )
      VALUES (
        ${course_name}, 
        ${description || ""}, 
        ${progress_percentage || 0}, 
        ${status || "not_started"}, 
        ${modules_completed || 0}, 
        ${total_modules || null}, 
        ${estimated_completion || null}
      )
      RETURNING *
    `

    return NextResponse.json({ success: true, data: result[0] })
  } catch (error) {
    console.error("Save MS Learn progress error:", error)
    return NextResponse.json({ error: `Save failed: ${error.message}` }, { status: 500 })
  }
}
