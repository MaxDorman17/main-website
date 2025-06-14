"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, Loader2 } from "lucide-react"

export default function TestAllPage() {
  const [tests, setTests] = useState({
    database: { status: "pending", message: "" },
    services: { status: "pending", message: "" },
    contact: { status: "pending", message: "" },
    upload: { status: "pending", message: "" },
    hero: { status: "pending", message: "" },
  })
  const [loading, setLoading] = useState(false)

  const runAllTests = async () => {
    setLoading(true)
    const newTests = { ...tests }

    // Test 1: Database Connection
    try {
      const response = await fetch("/api/about-me")
      if (response.ok) {
        newTests.database = { status: "success", message: "Database connected successfully" }
      } else {
        newTests.database = { status: "error", message: "Database connection failed" }
      }
    } catch (error) {
      newTests.database = { status: "error", message: `Database error: ${error.message}` }
    }

    // Test 2: Services API
    try {
      const response = await fetch("/api/services")
      if (response.ok) {
        const data = await response.json()
        newTests.services = { status: "success", message: `Services loaded: ${data.length} services found` }
      } else {
        newTests.services = { status: "error", message: "Services API failed" }
      }
    } catch (error) {
      newTests.services = { status: "error", message: `Services error: ${error.message}` }
    }

    // Test 3: Contact Form Table
    try {
      const response = await fetch("/api/contact")
      if (response.ok) {
        newTests.contact = { status: "success", message: "Contact form ready" }
      } else {
        newTests.contact = { status: "error", message: "Contact form not working" }
      }
    } catch (error) {
      newTests.contact = { status: "error", message: `Contact error: ${error.message}` }
    }

    // Test 4: File Upload
    try {
      const response = await fetch("/api/test-env")
      if (response.ok) {
        const data = await response.json()
        if (data.hasBlobToken) {
          newTests.upload = { status: "success", message: "File upload ready" }
        } else {
          newTests.upload = { status: "error", message: "Blob token missing" }
        }
      } else {
        newTests.upload = { status: "error", message: "Upload test failed" }
      }
    } catch (error) {
      newTests.upload = { status: "error", message: `Upload error: ${error.message}` }
    }

    // Test 5: Hero Content
    try {
      const response = await fetch("/api/hero-content")
      if (response.ok) {
        newTests.hero = { status: "success", message: "Hero content loaded" }
      } else {
        newTests.hero = { status: "error", message: "Hero content failed" }
      }
    } catch (error) {
      newTests.hero = { status: "error", message: `Hero error: ${error.message}` }
    }

    setTests(newTests)
    setLoading(false)
  }

  useEffect(() => {
    runAllTests()
  }, [])

  const getStatusIcon = (status) => {
    switch (status) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "error":
        return <XCircle className="w-5 h-5 text-red-500" />
      default:
        return <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
    }
  }

  const allPassed = Object.values(tests).every((test) => test.status === "success")

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Website System Test</h1>
        <p className="text-muted-foreground">Testing all core functionality</p>
      </div>

      <div className="grid gap-4 mb-8">
        {Object.entries(tests).map(([key, test]) => (
          <Card key={key}>
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-3">
                {getStatusIcon(test.status)}
                <div>
                  <h3 className="font-semibold capitalize">{key.replace("_", " ")}</h3>
                  <p className="text-sm text-muted-foreground">{test.message}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <Button onClick={runAllTests} disabled={loading} className="mr-4">
          {loading ? "Testing..." : "Run Tests Again"}
        </Button>

        {allPassed && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="text-green-800 font-semibold">🎉 All Tests Passed!</h3>
            <p className="text-green-700">Your website is ready to go!</p>
          </div>
        )}
      </div>
    </div>
  )
}
