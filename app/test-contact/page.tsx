"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ContactForm } from "@/components/contact-form"

export default function TestContactPage() {
  const [submissions, setSubmissions] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchSubmissions = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/contact")
      if (response.ok) {
        const data = await response.json()
        setSubmissions(data)
      }
    } catch (error) {
      console.error("Error fetching submissions:", error)
    }
    setLoading(false)
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Test Contact Form</h1>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Contact Form</h2>
          <ContactForm />
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Submissions</h2>
            <Button onClick={fetchSubmissions} disabled={loading}>
              {loading ? "Loading..." : "Refresh"}
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Submissions ({submissions.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {submissions.length > 0 ? (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {submissions.slice(0, 5).map((submission) => (
                    <div key={submission.id} className="border-l-4 border-primary/20 pl-4 py-2">
                      <div className="font-semibold">{submission.name}</div>
                      <div className="text-sm text-muted-foreground">{submission.email}</div>
                      <div className="text-sm">{submission.subject}</div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(submission.created_at).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No submissions yet</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
