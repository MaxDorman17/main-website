export interface ImageData {
  url: string
  alt: string
  width?: number
  height?: number
}

export async function getImage(path: string): Promise<ImageData | null> {
  try {
    // Handle different image sources
    if (path.startsWith("http")) {
      // External URL
      return {
        url: path,
        alt: "Image",
      }
    }

    if (path.startsWith("/")) {
      // Local path
      return {
        url: path,
        alt: "Image",
      }
    }

    // Blob storage path
    if (path.includes("blob.vercel-storage.com")) {
      return {
        url: path,
        alt: "Image",
      }
    }

    // Default placeholder
    return {
      url: "/placeholder.svg?height=400&width=400",
      alt: "Placeholder image",
      width: 400,
      height: 400,
    }
  } catch (error) {
    console.error("Error getting image:", error)
    return {
      url: "/placeholder.svg?height=400&width=400",
      alt: "Placeholder image",
      width: 400,
      height: 400,
    }
  }
}

export async function getProfilePicture(): Promise<ImageData | null> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/profile-picture`, {
      cache: "no-store",
    })

    if (!response.ok) {
      throw new Error("Failed to fetch profile picture")
    }

    const data = await response.json()

    if (data.profilePicture?.image_url) {
      return {
        url: data.profilePicture.image_url,
        alt: data.profilePicture.alt_text || "Profile picture",
      }
    }

    return getImage("/placeholder.svg?height=400&width=400")
  } catch (error) {
    console.error("Error fetching profile picture:", error)
    return getImage("/placeholder.svg?height=400&width=400")
  }
}

export function optimizeImageUrl(url: string, width?: number, height?: number): string {
  if (!url) return "/placeholder.svg?height=400&width=400"

  // If it's already a placeholder, return as is
  if (url.includes("placeholder.svg")) {
    return url
  }

  // If it's a Vercel blob URL, we can add optimization parameters
  if (url.includes("blob.vercel-storage.com")) {
    const urlObj = new URL(url)
    if (width) urlObj.searchParams.set("w", width.toString())
    if (height) urlObj.searchParams.set("h", height.toString())
    return urlObj.toString()
  }

  return url
}
