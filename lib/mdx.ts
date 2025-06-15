export interface Post {
  id: string
  title: string
  content: string
  excerpt: string
  date: string
  author: string
  tags: string[]
  published: boolean
  created_at: string
  updated_at: string
}

export async function getAllPosts(): Promise<Post[]> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/blog-posts`)
    if (!response.ok) {
      throw new Error("Failed to fetch posts")
    }
    const data = await response.json()
    return data.posts || []
  } catch (error) {
    console.error("Error fetching posts:", error)
    return []
  }
}

export async function getPostById(id: string): Promise<Post | null> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/blog/${id}`)
    if (!response.ok) {
      return null
    }
    const data = await response.json()
    return data.post || null
  } catch (error) {
    console.error("Error fetching post:", error)
    return null
  }
}
