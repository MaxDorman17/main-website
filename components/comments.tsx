"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MessageCircle, Send, AlertCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Comment {
  id: number
  author_name: string
  content: string
  created_at: string
}

interface CommentsProps {
  blogPostId: number
}

export function Comments({ blogPostId }: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    author_name: "",
    author_email: "",
    content: "",
  })
  const { toast } = useToast()

  useEffect(() => {
    fetchComments()
  }, [blogPostId])

  const fetchComments = async () => {
    try {
      setError("")
      const response = await fetch(`/api/comments?blog_post_id=${blogPostId}`)
      const data = await response.json()

      if (response.ok) {
        setComments(data)
      } else {
        console.error("Error fetching comments:", data)
        setError(`Failed to load comments: ${data.error}`)
      }
    } catch (error) {
      console.error("Error fetching comments:", error)
      setError("Failed to load comments")
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!formData.author_name.trim() || !formData.author_email.trim() || !formData.content.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      })
      return
    }

    setSubmitting(true)
    try {
      console.log("Submitting comment:", {
        blog_post_id: blogPostId,
        ...formData,
      })

      const response = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          blog_post_id: blogPostId,
          ...formData,
        }),
      })

      const result = await response.json()
      console.log("Comment submission result:", result)

      if (response.ok) {
        toast({
          title: "Success",
          description: result.message || "Comment submitted successfully!",
        })
        setFormData({ author_name: "", author_email: "", content: "" })
        // Don't refresh comments immediately since they need approval
      } else {
        console.error("Comment submission error:", result)
        setError(result.error || "Failed to submit comment")
        toast({
          title: "Error",
          description: result.error || "Failed to submit comment",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Comment submission error:", error)
      setError(`Failed to submit comment: ${error.message}`)
      toast({
        title: "Error",
        description: `Failed to submit comment: ${error.message}`,
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Debug Info */}
      <div className="text-xs text-muted-foreground bg-muted p-2 rounded">
        Blog Post ID: {blogPostId} | Comments: {comments.length} | Loading: {loading.toString()}
        {error && <div className="text-red-600 mt-1">Error: {error}</div>}
      </div>

      {/* Comments Display */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MessageCircle className="w-5 h-5 mr-2" />
            Comments ({comments.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-muted-foreground">Loading comments...</p>
          ) : error ? (
            <div className="flex items-center text-red-600 bg-red-50 p-3 rounded">
              <AlertCircle className="w-4 h-4 mr-2" />
              {error}
            </div>
          ) : comments.length > 0 ? (
            <div className="space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="border-l-4 border-primary/20 pl-4 py-2">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-sm">{comment.author_name}</h4>
                    <span className="text-xs text-muted-foreground">
                      {new Date(comment.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">{comment.content}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-4">No comments yet. Be the first to comment!</p>
          )}
        </CardContent>
      </Card>

      {/* Comment Form */}
      <Card>
        <CardHeader>
          <CardTitle>Leave a Comment</CardTitle>
          <CardDescription>Your comment will be reviewed before being published</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="author_name">Name *</Label>
                <Input
                  id="author_name"
                  value={formData.author_name}
                  onChange={(e) => setFormData({ ...formData, author_name: e.target.value })}
                  placeholder="Your name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="author_email">Email *</Label>
                <Input
                  id="author_email"
                  type="email"
                  value={formData.author_email}
                  onChange={(e) => setFormData({ ...formData, author_email: e.target.value })}
                  placeholder="your@email.com"
                  required
                />
                <p className="text-xs text-muted-foreground">Your email will not be published</p>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Comment *</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Share your thoughts..."
                rows={4}
                required
              />
            </div>
            <Button type="submit" disabled={submitting}>
              <Send className="w-4 h-4 mr-2" />
              {submitting ? "Submitting..." : "Submit Comment"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
