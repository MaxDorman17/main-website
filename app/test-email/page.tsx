"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function TestEmailPage() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [email, setEmail] = useState("maxdorman@example.com") // Change to your real email

  const testEmail = async (type: "accepted" | "rejected") => {
    setLoading(true)
    try {
      const mockBooking = {
        id: 1,
        client_name: "John Doe",
        client_email: email,
        service_type: "Excel Dashboard Creation",
        preferred_date: new Date().toISOString(),
        preferred_time: "14:00",
        duration: 60,
        message: "Looking forward to working together!",
        status: type,
      }

      const response = await fetch("/api/test-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ booking: mockBooking, type }),
      })

      const data = await response.json()
      setResult(data)
    } catch (error) {
      setResult({ error: error.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="container mx-auto max-w-2xl">
        <Card className="bg-gray-900 border-cyan-500/20">
          <CardHeader>
            <CardTitle className="text-cyan-400">Test Email Notifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="email" className="text-cyan-300">
                Test Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-800 border-cyan-500/30 text-white"
                placeholder="Enter your email address"
              />
            </div>

            <div className="flex gap-4">
              <Button
                onClick={() => testEmail("accepted")}
                disabled={loading}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                {loading ? "Sending..." : "Test Acceptance Email"}
              </Button>
              <Button
                onClick={() => testEmail("rejected")}
                disabled={loading}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                {loading ? "Sending..." : "Test Rejection Email"}
              </Button>
            </div>

            {result && (
              <div className="mt-4 p-4 bg-gray-800 rounded border border-cyan-500/20">
                <h3 className="text-cyan-400 mb-2">Result:</h3>
                <pre className="text-sm text-gray-300 overflow-auto">{JSON.stringify(result, null, 2)}</pre>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
