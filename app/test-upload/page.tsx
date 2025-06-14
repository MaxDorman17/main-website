"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TestUploadPage() {
  const [file, setFile] = useState<File | null>(null)
  const [result, setResult] = useState("")
  const [loading, setLoading] = useState(false)

  const testUpload = async () => {
    if (!file) {
      setResult("Please select a file first")
      return
    }

    setLoading(true)
    try {
      const formData = new FormData()
      formData.append("files", file)
      formData.append("type", "test")

      console.log("Uploading file:", file.name, file.size, file.type)

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      console.log("Response status:", response.status)
      const data = await response.json()
      console.log("Response data:", data)

      setResult(JSON.stringify(data, null, 2))
    } catch (error) {
      console.error("Upload error:", error)
      setResult(`Error: ${error.message}`)
    }
    setLoading(false)
  }

  const checkEnvVars = async () => {
    try {
      const response = await fetch("/api/test-env")
      const data = await response.json()
      setResult(JSON.stringify(data, null, 2))
    } catch (error) {
      setResult(`Error: ${error.message}`)
    }
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Test File Upload</h1>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Upload Test</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} accept=".pdf,.jpg,.jpeg,.png" />
            <div className="flex gap-2">
              <Button onClick={testUpload} disabled={loading || !file}>
                {loading ? "Uploading..." : "Test Upload"}
              </Button>
              <Button onClick={checkEnvVars} variant="outline">
                Check Environment
              </Button>
            </div>
            {file && (
              <div className="text-sm text-gray-600">
                <p>Selected: {file.name}</p>
                <p>Size: {(file.size / 1024).toFixed(1)} KB</p>
                <p>Type: {file.type}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Result</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="text-sm bg-gray-100 p-4 rounded overflow-auto whitespace-pre-wrap">
              {result || "No result yet"}
            </pre>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
