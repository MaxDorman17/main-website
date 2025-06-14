"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TestSavePage() {
  const [content, setContent] = useState("Test content from admin - " + new Date().toISOString())
  const [result, setResult] = useState("")
  const [loading, setLoading] = useState(false)

  const testSave = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/about-me", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      })

      const data = await response.json()
      setResult(JSON.stringify(data, null, 2))
    } catch (error) {
      setResult(`Error: ${error.message}`)
    }
    setLoading(false)
  }

  const testLoad = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/about-me")
      const data = await response.json()
      setResult(JSON.stringify(data, null, 2))
    } catch (error) {
      setResult(`Error: ${error.message}`)
    }
    setLoading(false)
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Test Save/Load</h1>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Test Content</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={5}
              placeholder="Enter test content"
            />
            <div className="flex gap-2">
              <Button onClick={testSave} disabled={loading}>
                {loading ? "Saving..." : "Test Save"}
              </Button>
              <Button onClick={testLoad} disabled={loading} variant="outline">
                {loading ? "Loading..." : "Test Load"}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Result</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="text-sm bg-gray-100 p-4 rounded overflow-auto">{result || "No result yet"}</pre>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
