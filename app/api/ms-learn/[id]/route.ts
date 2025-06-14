import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id
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
      UPDATE ms_learn_progress 
      SET 
        course_name = ${course_name},
        description = ${description || ""},
        progress_percentage = ${progress_percentage || 0},
        status = ${status || "not_started"},
        modules_completed = ${modules_completed || 0},
        total_modules = ${total_modules || null},
        estimated_completion = ${estimated_completion || null},
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING *
    `

    if (result.length === 0) {
      return NextResponse.json({ error: "Progress entry not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: result[0] })
  } catch (error) {
    console.error("Error updating MS Learn progress:", error)
    return NextResponse.json({ error: "Failed to update progress" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const result = await sql`DELETE FROM ms_learn_progress WHERE id = ${id} RETURNING *`

    if (result.length === 0) {
      return NextResponse.json({ error: "Progress entry not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting MS Learn progress:", error)
    return NextResponse.json({ error: "Failed to delete progress" }, { status: 500 })
  }
}
