import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

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
