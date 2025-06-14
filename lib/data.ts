import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function getAboutMe() {
  try {
    const result = await sql`SELECT * FROM about_me ORDER BY id DESC LIMIT 1`
    return result[0] || null
  } catch (error) {
    console.error("Error fetching about me:", error)
    // Return default content if database fails
    return {
      id: 1,
      content: `<p>I'm Max Dorman, currently diving deep into Microsoft fundamentals and expanding my technical expertise. Based in beautiful Fife, Scotland, I'm passionate about technology and helping others through my skills.</p><p>Whether it's learning new Microsoft technologies or working on exciting projects, I'm always ready for the next challenge.</p>`,
    }
  }
}

export async function getBlogPosts() {
  try {
    const posts = await sql`
      SELECT bp.*, 
             COALESCE(
               json_agg(
                 json_build_object(
                   'name', ba.file_name,
                   'url', ba.file_url,
                   'type', ba.file_type
                 )
               ) FILTER (WHERE ba.id IS NOT NULL), 
               '[]'
             ) as attachments
      FROM blog_posts bp
      LEFT JOIN blog_attachments ba ON bp.id = ba.blog_post_id
      GROUP BY bp.id
      ORDER BY bp.created_at DESC
    `
    return posts
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    return []
  }
}

export async function getPortfolioItems() {
  try {
    const [excel, logos] = await Promise.all([
      sql`SELECT * FROM portfolio_excel ORDER BY created_at DESC`,
      sql`SELECT * FROM portfolio_logos ORDER BY created_at DESC`,
    ])
    return { excel, logos }
  } catch (error) {
    console.error("Error fetching portfolio items:", error)
    return { excel: [], logos: [] }
  }
}

export async function getCertificates() {
  try {
    const result = await sql`SELECT * FROM certificates ORDER BY date_earned DESC, created_at DESC`
    return result
  } catch (error) {
    console.error("Error fetching certificates:", error)
    return []
  }
}

export async function getMSLearnProgress() {
  try {
    const result = await sql`SELECT * FROM ms_learn_progress ORDER BY updated_at DESC`
    return result
  } catch (error) {
    console.error("Error fetching MS Learn progress:", error)
    return []
  }
}

export async function saveAboutMe(content: string) {
  try {
    // First try to update existing record
    const existing = await sql`SELECT id FROM about_me LIMIT 1`

    if (existing.length > 0) {
      await sql`UPDATE about_me SET content = ${content}, updated_at = CURRENT_TIMESTAMP WHERE id = ${existing[0].id}`
    } else {
      await sql`INSERT INTO about_me (content) VALUES (${content})`
    }

    return { success: true }
  } catch (error) {
    console.error("Error saving about me:", error)
    return { success: false, error }
  }
}

export async function saveBlogPost(title: string, content: string, attachments: any[] = []) {
  try {
    const [post] = await sql`
      INSERT INTO blog_posts (title, content) 
      VALUES (${title}, ${content})
      RETURNING id
    `

    if (attachments.length > 0) {
      for (const attachment of attachments) {
        await sql`
          INSERT INTO blog_attachments (blog_post_id, file_name, file_url, file_type)
          VALUES (${post.id}, ${attachment.name}, ${attachment.url}, ${attachment.type})
        `
      }
    }

    return { success: true }
  } catch (error) {
    console.error("Error saving blog post:", error)
    return { success: false, error }
  }
}
