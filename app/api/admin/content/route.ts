import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function GET() {
  try {
    const [blogPosts, excelProjects, logoDesigns, certificates, msLearnProgress] = await Promise.all([
      sql`
        SELECT bp.id, bp.title, bp.created_at, bp.updated_at,
               COUNT(ba.id) as attachment_count
        FROM blog_posts bp
        LEFT JOIN blog_attachments ba ON bp.id = ba.blog_post_id
        GROUP BY bp.id
        ORDER BY bp.created_at DESC
      `,
      sql`SELECT id, title, description, created_at FROM portfolio_excel ORDER BY created_at DESC`,
      sql`SELECT id, title, description, created_at FROM portfolio_logos ORDER BY created_at DESC`,
      sql`SELECT id, title, issuer, date_earned, created_at FROM certificates ORDER BY date_earned DESC, created_at DESC`,
      sql`SELECT id, course_name, progress_percentage, status, updated_at FROM ms_learn_progress ORDER BY updated_at DESC`,
    ])

    return NextResponse.json({
      blogPosts,
      excelProjects,
      logoDesigns,
      certificates,
      msLearnProgress,
    })
  } catch (error) {
    console.error("Error fetching admin content:", error)
    return NextResponse.json({ error: "Failed to fetch content" }, { status: 500 })
  }
}
