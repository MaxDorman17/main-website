"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Calendar } from "lucide-react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Search } from "@/components/search"

export default function BlogPage() {
  const [posts, setPosts] = useState([])
  const [filteredPosts, setFilteredPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    fetchPosts()
  }, [])

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredPosts(posts)
    } else {
      const filtered = posts.filter(
        (post) =>
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.content.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      setFilteredPosts(filtered)
    }
  }, [posts, searchQuery])

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/blog-posts", {
        cache: "no-store",
      })
      if (response.ok) {
        const data = await response.json()
        setPosts(data)
        setFilteredPosts(data)
      }
    } catch (error) {
      console.error("Error fetching posts:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Blog</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Sharing insights on technology, learning, and development
          </p>

          <div className="max-w-md mx-auto">
            <Search onSearch={setSearchQuery} placeholder="Search blog posts..." />
          </div>
        </div>

        {/* Search Results Info */}
        {searchQuery && (
          <div className="mb-6 text-center">
            <p className="text-muted-foreground">
              {filteredPosts.length} result{filteredPosts.length !== 1 ? "s" : ""} for "{searchQuery}"
            </p>
          </div>
        )}

        {/* Debug info */}
        <div className="mb-4 text-sm text-muted-foreground">
          Found {posts.length} blog posts • Last updated: {new Date().toLocaleString()}
        </div>

        <div className="grid gap-8">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading blog posts...</p>
            </div>
          ) : filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <Link href={`/blog/${post.id}`} key={post.id}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <CardTitle className="text-2xl">{post.title}</CardTitle>
                    <CardDescription className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 mr-2" />
                      {new Date(post.created_at).toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="prose max-w-none mb-4 dark:prose-invert">
                      <div dangerouslySetInnerHTML={{ __html: post.content.substring(0, 300) + "..." }} />
                    </div>
                    <Button variant="outline" size="sm">
                      Read More →
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <FileText className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {searchQuery ? "No posts found" : "No blog posts yet"}
                </h3>
                <p className="text-muted-foreground">
                  {searchQuery ? "Try a different search term" : "Check back soon for new content!"}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
