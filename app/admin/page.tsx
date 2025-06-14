"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, Eye, EyeOff, Zap } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  // Form states
  const [aboutMe, setAboutMe] = useState("")
  const [blogTitle, setBlogTitle] = useState("")
  const [blogContent, setBlogContent] = useState("")
  const [blogFiles, setBlogFiles] = useState<FileList | null>(null)

  // Hero content states
  const [heroTagline, setHeroTagline] = useState("")
  const [heroSubtitle, setHeroSubtitle] = useState("")
  const [heroDescription, setHeroDescription] = useState("")

  // Portfolio states
  const [excelTitle, setExcelTitle] = useState("")
  const [excelDescription, setExcelDescription] = useState("")
  const [excelFile, setExcelFile] = useState<FileList | null>(null)
  const [logoTitle, setLogoTitle] = useState("")
  const [logoDescription, setLogoDescription] = useState("")
  const [logoFile, setLogoFile] = useState<FileList | null>(null)

  // Certificate states
  const [certTitle, setCertTitle] = useState("")
  const [certIssuer, setCertIssuer] = useState("")
  const [certDate, setCertDate] = useState("")
  const [certDescription, setCertDescription] = useState("")
  const [certFile, setCertFile] = useState<FileList | null>(null)

  // MS Learn states
  const [msCourseName, setMsCourseName] = useState("")
  const [msDescription, setMsDescription] = useState("")
  const [msProgress, setMsProgress] = useState("")
  const [msStatus, setMsStatus] = useState("")
  const [msModulesCompleted, setMsModulesCompleted] = useState("")
  const [msTotalModules, setMsTotalModules] = useState("")
  const [msEstimatedCompletion, setMsEstimatedCompletion] = useState("")

  // Profile picture state
  const [profilePicFile, setProfilePicFile] = useState<FileList | null>(null)

  // Resources states
  const [resourceTitle, setResourceTitle] = useState("")
  const [resourceDescription, setResourceDescription] = useState("")
  const [resourceUrl, setResourceUrl] = useState("")
  const [resourceCategory, setResourceCategory] = useState("")
  const [resourceIsFree, setResourceIsFree] = useState(true)

  // Load existing content when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      loadAboutMe()
      loadHeroContent()
    }
  }, [isAuthenticated])

  const loadAboutMe = async () => {
    try {
      const response = await fetch("/api/about-me", {
        method: "GET",
      })
      if (response.ok) {
        const data = await response.json()
        if (data.content) {
          setAboutMe(data.content)
        }
      }
    } catch (error) {
      console.error("Failed to load about me:", error)
    }
  }

  const loadHeroContent = async () => {
    try {
      const response = await fetch("/api/hero-content", {
        method: "GET",
      })
      if (response.ok) {
        const data = await response.json()
        setHeroTagline(data.tagline || "")
        setHeroSubtitle(data.subtitle || "")
        setHeroDescription(data.description || "")
      }
    } catch (error) {
      console.error("Failed to load hero content:", error)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password === "Summer07max") {
      setIsAuthenticated(true)
      toast({
        title: "Success",
        description: "Successfully logged in to admin panel",
      })
    } else {
      toast({
        title: "Error",
        description: "Invalid password",
        variant: "destructive",
      })
    }
  }

  const handleFileUpload = async (files: FileList, type: string) => {
    const formData = new FormData()
    Array.from(files).forEach((file) => {
      formData.append("files", file)
    })
    formData.append("type", type)

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        const result = await response.json()
        toast({
          title: "Success",
          description: `Files uploaded successfully`,
        })
        return result.urls
      } else {
        const errorData = await response.json()
        throw new Error(errorData.error || "Upload failed")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to upload files: ${error.message}`,
        variant: "destructive",
      })
      return null
    }
  }

  const handleSaveAboutMe = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/about-me", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: aboutMe }),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "About me section updated successfully!",
        })
      } else {
        const errorData = await response.json()
        throw new Error(errorData.error || "Save failed")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to update about me section: ${error.message}`,
        variant: "destructive",
      })
    }
    setLoading(false)
  }

  const handleSaveHeroContent = async () => {
    if (!heroTagline.trim() || !heroSubtitle.trim() || !heroDescription.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all hero content fields",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      const response = await fetch("/api/hero-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tagline: heroTagline,
          subtitle: heroSubtitle,
          description: heroDescription,
        }),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Hero section updated successfully!",
        })
      } else {
        const errorData = await response.json()
        throw new Error(errorData.error || "Save failed")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to update hero section: ${error.message}`,
        variant: "destructive",
      })
    }
    setLoading(false)
  }

  const handleSaveBlogPost = async () => {
    if (!blogTitle.trim() || !blogContent.trim()) {
      toast({
        title: "Error",
        description: "Please fill in both title and content",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      let attachmentUrls = []
      if (blogFiles && blogFiles.length > 0) {
        attachmentUrls = await handleFileUpload(blogFiles, "blog")
        if (!attachmentUrls) {
          setLoading(false)
          return
        }
      }

      const response = await fetch("/api/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: blogTitle,
          content: blogContent,
          attachments: attachmentUrls || [],
        }),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Blog post created successfully!",
        })
        setBlogTitle("")
        setBlogContent("")
        setBlogFiles(null)
        // Reset file input
        const fileInput = document.getElementById("blog-files") as HTMLInputElement
        if (fileInput) fileInput.value = ""
      } else {
        const errorData = await response.json()
        throw new Error(errorData.error || "Save failed")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to create blog post: ${error.message}`,
        variant: "destructive",
      })
    }
    setLoading(false)
  }

  const handleSaveProfilePicture = async () => {
    if (!profilePicFile || profilePicFile.length === 0) {
      toast({
        title: "Error",
        description: "Please select a profile picture",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      const uploadedFiles = await handleFileUpload(profilePicFile, "profile")
      if (!uploadedFiles || uploadedFiles.length === 0) {
        setLoading(false)
        return
      }

      const response = await fetch("/api/profile-picture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image_url: uploadedFiles[0].url,
          alt_text: "Max Dorman Profile Picture",
        }),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Profile picture updated successfully!",
        })
        setProfilePicFile(null)
        const fileInput = document.getElementById("profile-pic-file") as HTMLInputElement
        if (fileInput) fileInput.value = ""
      } else {
        throw new Error("Failed to save profile picture")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to update profile picture: ${error.message}`,
        variant: "destructive",
      })
    }
    setLoading(false)
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Admin Login</CardTitle>
            <CardDescription>Enter password to access admin panel</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
          <Button variant="outline" onClick={() => setIsAuthenticated(false)}>
            Logout
          </Button>
        </div>

        <Tabs defaultValue="about" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="about">About Me</TabsTrigger>
            <TabsTrigger value="hero">Hero Section</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="blog">Blog</TabsTrigger>
          </TabsList>

          <TabsContent value="about">
            <Card>
              <CardHeader>
                <CardTitle>About Me Section</CardTitle>
                <CardDescription>Edit the about me content on the home page</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="about-content">Content (HTML supported)</Label>
                  <Textarea
                    id="about-content"
                    value={aboutMe}
                    onChange={(e) => setAboutMe(e.target.value)}
                    rows={10}
                    placeholder="Enter about me content (HTML supported)"
                  />
                </div>
                <div className="text-sm text-gray-600">
                  <p>You can use HTML tags like:</p>
                  <code>
                    &lt;p&gt;paragraph&lt;/p&gt;, &lt;strong&gt;bold&lt;/strong&gt;, &lt;em&gt;italic&lt;/em&gt;
                  </code>
                </div>
                <Button onClick={handleSaveAboutMe} disabled={loading}>
                  {loading ? "Saving..." : "Save About Me"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="hero">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="w-6 h-6 mr-2" />
                  Hero Section
                </CardTitle>
                <CardDescription>Edit the main tagline, subtitle, and description on the homepage</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="hero-tagline">Tagline *</Label>
                  <Input
                    id="hero-tagline"
                    value={heroTagline}
                    onChange={(e) => setHeroTagline(e.target.value)}
                    placeholder="e.g., Technology Consultant & Microsoft Specialist"
                    required
                  />
                  <p className="text-sm text-gray-500">This appears as the main subtitle under your name</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hero-subtitle">Subtitle *</Label>
                  <Textarea
                    id="hero-subtitle"
                    value={heroSubtitle}
                    onChange={(e) => setHeroSubtitle(e.target.value)}
                    placeholder="e.g., Delivering professional Microsoft solutions and digital services from Fife, Scotland"
                    rows={3}
                    required
                  />
                  <p className="text-sm text-gray-500">This appears with the lightning bolt icon</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hero-description">Professional Description *</Label>
                  <Textarea
                    id="hero-description"
                    value={heroDescription}
                    onChange={(e) => setHeroDescription(e.target.value)}
                    placeholder="e.g., Specializing in Excel development, logo design, and Microsoft Office consulting to help businesses streamline their operations and achieve their goals."
                    rows={4}
                    required
                  />
                  <p className="text-sm text-gray-500">This appears as the detailed description below the subtitle</p>
                </div>
                <Button onClick={handleSaveHeroContent} disabled={loading}>
                  {loading ? "Saving..." : "Save Hero Section"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Picture</CardTitle>
                <CardDescription>Upload your profile picture for the homepage</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="profile-pic-file">Profile Picture *</Label>
                  <Input
                    id="profile-pic-file"
                    type="file"
                    accept=".jpg,.jpeg,.png,.gif,.webp"
                    onChange={(e) => setProfilePicFile(e.target.files)}
                    required
                  />
                  <p className="text-sm text-gray-500">Recommended: Square image, at least 300x300 pixels</p>
                </div>
                <Button onClick={handleSaveProfilePicture} disabled={loading} className="w-full">
                  <Upload className="w-4 h-4 mr-2" />
                  {loading ? "Uploading..." : "Update Profile Picture"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="blog">
            <Card>
              <CardHeader>
                <CardTitle>Create New Blog Post</CardTitle>
                <CardDescription>Add a new blog post with optional file attachments</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="blog-title">Title *</Label>
                  <Input
                    id="blog-title"
                    value={blogTitle}
                    onChange={(e) => setBlogTitle(e.target.value)}
                    placeholder="Enter blog post title"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="blog-content">Content *</Label>
                  <Textarea
                    id="blog-content"
                    value={blogContent}
                    onChange={(e) => setBlogContent(e.target.value)}
                    rows={10}
                    placeholder="Enter blog post content (HTML supported)"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="blog-files">Attachments (Images & PDFs)</Label>
                  <Input
                    id="blog-files"
                    type="file"
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png,.gif,.webp"
                    onChange={(e) => setBlogFiles(e.target.files)}
                  />
                  <p className="text-sm text-gray-500">Supported formats: PDF, JPG, PNG, GIF, WebP</p>
                </div>
                <Button onClick={handleSaveBlogPost} disabled={loading}>
                  {loading ? "Creating..." : "Create Blog Post"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
