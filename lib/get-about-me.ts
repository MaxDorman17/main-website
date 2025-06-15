export interface AboutMe {
  id: number
  content: string
  skills: string[]
  experience_years: number
  location: string
  availability: string
  created_at: string
  updated_at: string
}

export async function getAboutMe(): Promise<AboutMe | null> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/about-me`, {
      cache: "no-store",
    })

    if (!response.ok) {
      throw new Error("Failed to fetch about me data")
    }

    const data = await response.json()
    return data.aboutMe || null
  } catch (error) {
    console.error("Error fetching about me:", error)
    return null
  }
}

export async function updateAboutMe(aboutMe: Partial<AboutMe>): Promise<boolean> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/about-me`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(aboutMe),
    })

    return response.ok
  } catch (error) {
    console.error("Error updating about me:", error)
    return false
  }
}
