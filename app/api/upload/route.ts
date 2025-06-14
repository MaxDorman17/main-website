import { type NextRequest, NextResponse } from "next/server"
import { put } from "@vercel/blob"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const files = formData.getAll("files") as File[]
    const type = formData.get("type") as string

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "No files provided" }, { status: 400 })
    }

    console.log(`Uploading ${files.length} files of type: ${type}`)

    const uploadPromises = files.map(async (file) => {
      const filename = `${type}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`
      console.log(`Uploading file: ${filename}`)

      const blob = await put(filename, file, {
        access: "public",
      })

      return {
        name: file.name,
        url: blob.url,
        type: file.type.startsWith("image/") ? "image" : "document",
        size: file.size,
      }
    })

    const urls = await Promise.all(uploadPromises)
    console.log("Upload successful:", urls)

    return NextResponse.json({ success: true, urls })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json({ error: `Upload failed: ${error.message}` }, { status: 500 })
  }
}
