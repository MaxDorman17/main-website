"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function TestCommentsPage() {
  const [testResult, setTestResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const runTest = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/test-comments")
      const data = await response.json()
      setTestResult(data)
    } catch (error) {
      setTestResult({ error: error.message })
    }
    setLoading(false)
  }

  useEffect(() => {
    runTest()
  }, [])

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Comments System Test</h1>

      <Card>
        <CardHeader>
          <CardTitle>Test Results</CardTitle>
        </CardHeader>
        <CardContent>
          <Button onClick={runTest} disabled={loading} className="mb-4">
            {loading ? "Testing..." : "Run Test"}
          </Button>

          <pre className="text-sm bg-gray-100 p-4 rounded overflow-auto">
            {testResult ? JSON.stringify(testResult, null, 2) : "No results yet"}
          </pre>
        </CardContent>
      </Card>
    </div>
  )
}
