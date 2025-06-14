"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, Eye, EyeOff, ImageIcon, Zap } from "lucide-react"
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

  // Content management states
  const [allContent, setAllContent] = useState({
    blogPosts: [],
    excelProjects: [],
    logoDesigns: [],
    certificates: [],
    msLearnProgress: [],
    resources: [],
  })
  const [editingItem, setEditingItem] = useState(null)
  const [editForm, setEditForm] = useState({})

  // Load existing content when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      loadAboutMe()
      loadHeroContent()
      loadAllContent()
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

  const loadAllContent = async () => {
    try {
      const [adminResponse, resourcesResponse] = await Promise.all([
        fetch("/api/admin/content"),
        fetch("/api/resources"),
      ])

      if (adminResponse.ok) {
        const adminData = await adminResponse.json()
        const resourcesData = resourcesResponse.ok ? await resourcesResponse.json() : []

        setAllContent({
          ...adminData,
          resources: resourcesData,
        })
      }
    } catch (error) {
      console.error("Failed to load content:", error)
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

  const handleSaveExcelProject = async () => {
    if (!excelTitle.trim() || !excelFile || excelFile.length === 0) {
      toast({
        title: "Error",
        description: "Please provide title and Excel file",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      const uploadedFiles = await handleFileUpload(excelFile, "portfolio/excel")
      if (!uploadedFiles || uploadedFiles.length === 0) {
        setLoading(false)
        return
      }

      const response = await fetch("/api/portfolio/excel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: excelTitle,
          description: excelDescription,
          file_url: uploadedFiles[0].url,
        }),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Excel project added successfully!",
        })
        setExcelTitle("")
        setExcelDescription("")
        setExcelFile(null)
        const fileInput = document.getElementById("excel-file") as HTMLInputElement
        if (fileInput) fileInput.value = ""
      } else {
        throw new Error("Failed to save Excel project")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to add Excel project: ${error.message}`,
        variant: "destructive",
      })
    }
    setLoading(false)
  }

  const handleSaveLogoDesign = async () => {
    if (!logoTitle.trim() || !logoFile || logoFile.length === 0) {
      toast({
        title: "Error",
        description: "Please provide title and logo image",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      const uploadedFiles = await handleFileUpload(logoFile, "portfolio/logos")
      if (!uploadedFiles || uploadedFiles.length === 0) {
        setLoading(false)
        return
      }

      const response = await fetch("/api/portfolio/logos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: logoTitle,
          description: logoDescription,
          image_url: uploadedFiles[0].url,
        }),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Logo design added successfully!",
        })
        setLogoTitle("")
        setLogoDescription("")
        setLogoFile(null)
        const fileInput = document.getElementById("logo-file") as HTMLInputElement
        if (fileInput) fileInput.value = ""
      } else {
        throw new Error("Failed to save logo design")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to add logo design: ${error.message}`,
        variant: "destructive",
      })
    }
    setLoading(false)
  }

  const handleSaveCertificate = async () => {
    if (!certTitle.trim() || !certFile || certFile.length === 0) {
      toast({
        title: "Error",
        description: "Please provide title and certificate PDF",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      const uploadedFiles = await handleFileUpload(certFile, "certificates")
      if (!uploadedFiles || uploadedFiles.length === 0) {
        setLoading(false)
        return
      }

      const response = await fetch("/api/certificates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: certTitle,
          issuer: certIssuer,
          description: certDescription,
          file_url: uploadedFiles[0].url,
          date_earned: certDate || null,
        }),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Certificate added successfully!",
        })
        setCertTitle("")
        setCertIssuer("")
        setCertDescription("")
        setCertDate("")
        setCertFile(null)
        const fileInput = document.getElementById("cert-file") as HTMLInputElement
        if (fileInput) fileInput.value = ""
      } else {
        throw new Error("Failed to save certificate")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to add certificate: ${error.message}`,
        variant: "destructive",
      })
    }
    setLoading(false)
  }

  const handleSaveMSLearnProgress = async () => {
    if (!msCourseName.trim()) {
      toast({
        title: "Error",
        description: "Please provide course name",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      const response = await fetch("/api/ms-learn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          course_name: msCourseName,
          description: msDescription,
          progress_percentage: Number.parseInt(msProgress) || 0,
          status: msStatus || "not_started",
          modules_completed: Number.parseInt(msModulesCompleted) || 0,
          total_modules: Number.parseInt(msTotalModules) || null,
          estimated_completion: msEstimatedCompletion || null,
        }),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "MS Learn progress added successfully!",
        })
        setMsCourseName("")
        setMsDescription("")
        setMsProgress("")
        setMsStatus("")
        setMsModulesCompleted("")
        setMsTotalModules("")
        setMsEstimatedCompletion("")
      } else {
        const errorData = await response.json()
        throw new Error(errorData.error || "Save failed")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to add MS Learn progress: ${error.message}`,
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

  const handleSaveResource = async () => {
    if (!resourceTitle.trim() || !resourceUrl.trim()) {
      toast({
        title: "Error",
        description: "Please provide title and URL",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      const response = await fetch("/api/resources", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: resourceTitle,
          description: resourceDescription,
          url: resourceUrl,
          category: resourceCategory || "Other",
          is_free: resourceIsFree,
        }),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Resource added successfully!",
        })
        setResourceTitle("")
        setResourceDescription("")
        setResourceUrl("")
        setResourceCategory("")
        setResourceIsFree(true)
        loadAllContent()
      } else {
        const errorData = await response.json()
        throw new Error(errorData.error || "Save failed")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to add resource: ${error.message}`,
        variant: "destructive",
      })
    }
    setLoading(false)
  }

  const handleEditItem = (type, item) => {
    setEditingItem({ type, id: item.id })
    setEditForm(item)
  }

  const handleSaveEdit = async () => {
    if (!editingItem) return

    setLoading(true)
    try {
      const { type, id } = editingItem
      let endpoint = ""

      switch (type) {
        case "blog":
          endpoint = `/api/blog/${id}`
          break
        case "excel":
          endpoint = `/api/portfolio/excel/${id}`
          break
        case "logo":
          endpoint = `/api/portfolio/logos/${id}`
          break
        case "certificate":
          endpoint = `/api/certificates/${id}`
          break
        case "mslearn":
          endpoint = `/api/ms-learn/${id}`
          break
        case "resource":
          endpoint = `/api/resources/${id}`
          break
      }

      const response = await fetch(endpoint, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Item updated successfully!",
        })
        setEditingItem(null)
        setEditForm({})
        loadAllContent()
      } else {
        throw new Error("Update failed")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to update: ${error.message}`,
        variant: "destructive",
      })
    }
    setLoading(false)
  }

  const handleDeleteItem = async (type, id) => {
    if (!confirm("Are you sure you want to delete this item?")) return

    setLoading(true)
    try {
      let endpoint = ""

      switch (type) {
        case "blog":
          endpoint = `/api/blog/${id}`
          break
        case "excel":
          endpoint = `/api/portfolio/excel/${id}`
          break
        case "logo":
          endpoint = `/api/portfolio/logos/${id}`
          break
        case "certificate":
          endpoint = `/api/certificates/${id}`
          break
        case "mslearn":
          endpoint = `/api/ms-learn/${id}`
          break
        case "resource":
          endpoint = `/api/resources/${id}`
          break
      }

      const response = await fetch(endpoint, {
        method: "DELETE",
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Item deleted successfully!",
        })
        loadAllContent()
      } else {
        throw new Error("Delete failed")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to delete: ${error.message}`,
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
          <TabsList className="grid w-full grid-cols-12">
            <TabsTrigger value="about">About Me</TabsTrigger>
            <TabsTrigger value="hero">Hero Section</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="blog">Blog</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="certificates">Certificates</TabsTrigger>
            <TabsTrigger value="mslearn">MS Learn</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="stats">Statistics</TabsTrigger>
            <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
            <TabsTrigger value="comments">Comments</TabsTrigger>
            <TabsTrigger value="manage">Manage</TabsTrigger>
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
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Preview:</h4>
                  <div className="text-sm text-blue-800 space-y-2">
                    <p><strong>Tagline:</strong> {heroTagline || "Technology Consultant & Microsoft Specialist"}</p>
                    <p><strong>Subtitle:</strong> {heroSubtitle || "Delivering professional Microsoft solutions..."}</p>
                    <p><strong>Description:</strong> {heroDescription ? heroDescription.substring(0, 100) + "..." : "Specializing in Excel development..."}</p>
                  </div>
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

          <TabsContent value="portfolio">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Add Excel Project</CardTitle>
                  <CardDescription>Upload Excel files for portfolio</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="excel-title">Project Title *</Label>
                    <Input
                      id="excel-title"
                      value={excelTitle}
                      onChange={(e) => setExcelTitle(e.target.value)}
                      placeholder="Project title"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="excel-description">Description</Label>
                    <Textarea
                      id="excel-description"
                      value={excelDescription}
                      onChange={(e) => setExcelDescription(e.target.value)}
                      placeholder="Project description"
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="excel-file">Excel File *</Label>
                    <Input
                      id="excel-file"
                      type="file"
                      accept=".xlsx,.xls"
                      onChange={(e) => setExcelFile(e.target.files)}
                      required
                    />
                  </div>
                  <Button onClick={handleSaveExcelProject} disabled={loading} className="w-full">
                    <Upload className="w-4 h-4 mr-2" />
                    {loading ? "Adding..." : "Add Excel Project"}
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Add Logo Design</CardTitle>
                  <CardDescription>Upload logo images</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="logo-title">Logo Title *</Label>
                    <Input
                      id="logo-title"
                      value={logoTitle}
                      onChange={(e) => setLogoTitle(e.target.value)}
                      placeholder="Logo title"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="logo-description">Description</Label>
                    <Textarea
                      id="logo-description"
                      value={logoDescription}
                      onChange={(e) => setLogoDescription(e.target.value)}
                      placeholder="Logo description"
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="logo-file">Logo Image *</Label>
                    <Input
                      id="logo-file"
                      type="file"
                      accept=".jpg,.jpeg,.png,.gif,.svg,.webp"
                      onChange={(e) => setLogoFile(e.target.files)}
                      required
                    />
                  </div>
                  <Button onClick={handleSaveLogoDesign} disabled={loading} className="w-full">
                    <ImageIcon className="w-4 h-4 mr-2" />
                    {loading ? "Adding..." : "Add Logo Design"}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="certificates">
            <Card>
              <CardHeader>
                <CardTitle>Add Certificate</CardTitle>
                <CardDescription>Upload certificate PDFs</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cert-title">Certificate Title *</Label>
                  <Input
                    id="cert-title"
                    value={certTitle}
                    onChange={(e) => setCertTitle(e.target.value)}
                    placeholder="Certificate title"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cert-issuer">Issuing Organization</Label>
                  <Input
                    id="cert-issuer"
                    value={certIssuer}
                    onChange={(e) => setCertIssuer(e.target.value)}
                    placeholder="Issuing organization"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cert-date">Date Earned</Label>
                  <Input id="cert-date" type="date" value={certDate} onChange={(e) => setCertDate(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cert-description">Description</Label>
                  <Textarea
                    id="cert-description"
                    value={certDescription}
                    onChange={(e) => setCertDescription(e.target.value)}
                    placeholder="Certificate description"
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label\
