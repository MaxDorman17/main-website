"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Upload,
  Eye,
  EyeOff,
  Zap,
  FileSpreadsheet,
  Award,
  BookOpen,
  ExternalLink,
  Settings,
  Trash2,
  Calendar,
} from "lucide-react"
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

  // Blog management states
  const [blogPosts, setBlogPosts] = useState([])
  const [editingBlogPost, setEditingBlogPost] = useState(null)
  const [isEditMode, setIsEditMode] = useState(false)

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
  const [msStatus, setMsStatus] = useState("not_started")
  const [msModulesCompleted, setMsModulesCompleted] = useState("")
  const [msTotalModules, setMsTotalModules] = useState("")
  const [msEstimatedCompletion, setMsEstimatedCompletion] = useState("")

  // Profile picture state
  const [profilePicFile, setProfilePicFile] = useState<FileList | null>(null)

  // Resources states
  const [resourceTitle, setResourceTitle] = useState("")
  const [resourceDescription, setResourceDescription] = useState("")
  const [resourceUrl, setResourceUrl] = useState("")
  const [resourceCategory, setResourceCategory] = useState("Learning")
  const [resourceIsFree, setResourceIsFree] = useState(true)

  // Services states
  const [serviceTitle, setServiceTitle] = useState("")
  const [serviceDescription, setServiceDescription] = useState("")
  const [serviceFeatures, setServiceFeatures] = useState("")
  const [servicePriceFrom, setServicePriceFrom] = useState("")
  const [servicePriceType, setServicePriceType] = useState("from")
  const [serviceIsFeatured, setServiceIsFeatured] = useState(false)
  const [serviceIconName, setServiceIconName] = useState("FileSpreadsheet")

  // Content lists for management
  const [portfolioItems, setPortfolioItems] = useState({ excel: [], logos: [] })
  const [certificates, setCertificates] = useState([])
  const [msLearnProgress, setMsLearnProgress] = useState([])
  const [resources, setResources] = useState([])
  const [services, setServices] = useState([])

  // Booking management states
  const [bookings, setBookings] = useState([])
  const [availability, setAvailability] = useState([])
  const [newSlotDay, setNewSlotDay] = useState("")
  const [newSlotStartTime, setNewSlotStartTime] = useState("")
  const [newSlotEndTime, setNewSlotEndTime] = useState("")

  // Load existing content when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      loadAboutMe()
      loadHeroContent()
      loadPortfolioItems()
      loadCertificates()
      loadMSLearnProgress()
      loadResources()
      loadServices()
      loadBlogPosts()
      loadBookings()
      loadAvailability()
    }
  }, [isAuthenticated])

  const loadAboutMe = async () => {
    try {
      const response = await fetch("/api/about-me", { method: "GET" })
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

  const loadBlogPosts = async () => {
    try {
      const response = await fetch("/api/blog-posts")
      if (response.ok) {
        const data = await response.json()
        setBlogPosts(data)
      }
    } catch (error) {
      console.error("Failed to load blog posts:", error)
    }
  }

  const loadHeroContent = async () => {
    try {
      const response = await fetch("/api/hero-content", { method: "GET" })
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

  const loadPortfolioItems = async () => {
    try {
      const [excelResponse, logosResponse] = await Promise.all([
        fetch("/api/portfolio/excel"),
        fetch("/api/portfolio/logos"),
      ])

      const excel = excelResponse.ok ? await excelResponse.json() : []
      const logos = logosResponse.ok ? await logosResponse.json() : []

      setPortfolioItems({ excel, logos })
    } catch (error) {
      console.error("Failed to load portfolio items:", error)
    }
  }

  const loadCertificates = async () => {
    try {
      const response = await fetch("/api/certificates")
      if (response.ok) {
        const data = await response.json()
        setCertificates(data)
      }
    } catch (error) {
      console.error("Failed to load certificates:", error)
    }
  }

  const loadMSLearnProgress = async () => {
    try {
      const response = await fetch("/api/ms-learn")
      if (response.ok) {
        const data = await response.json()
        setMsLearnProgress(data)
      }
    } catch (error) {
      console.error("Failed to load MS Learn progress:", error)
    }
  }

  const loadResources = async () => {
    try {
      const response = await fetch("/api/resources")
      if (response.ok) {
        const data = await response.json()
        setResources(data)
      }
    } catch (error) {
      console.error("Failed to load resources:", error)
    }
  }

  const loadServices = async () => {
    try {
      const response = await fetch("/api/services")
      if (response.ok) {
        const data = await response.json()
        setServices(data)
      }
    } catch (error) {
      console.error("Failed to load services:", error)
    }
  }

  const loadBookings = async () => {
    try {
      const response = await fetch("/api/bookings")
      if (response.ok) {
        const data = await response.json()
        setBookings(data)
      }
    } catch (error) {
      console.error("Failed to load bookings:", error)
    }
  }

  const loadAvailability = async () => {
    try {
      const response = await fetch("/api/availability")
      if (response.ok) {
        const data = await response.json()
        setAvailability(data)
      }
    } catch (error) {
      console.error("Failed to load availability:", error)
    }
  }

  const handleUpdateBookingStatus = async (bookingId, status) => {
    try {
      const response = await fetch(`/api/bookings/${bookingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Booking status updated successfully!",
        })
        loadBookings()
      } else {
        throw new Error("Failed to update booking status")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to update booking: ${error.message}`,
        variant: "destructive",
      })
    }
  }

  const handleAddAvailabilitySlot = async () => {
    if (!newSlotDay || !newSlotStartTime || !newSlotEndTime) {
      toast({
        title: "Error",
        description: "Please fill in all availability fields",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      const response = await fetch("/api/availability", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          day_of_week: Number.parseInt(newSlotDay),
          start_time: newSlotStartTime,
          end_time: newSlotEndTime,
        }),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Availability slot added successfully!",
        })
        setNewSlotDay("")
        setNewSlotStartTime("")
        setNewSlotEndTime("")
        loadAvailability()
      } else {
        throw new Error("Failed to add availability slot")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to add availability: ${error.message}`,
        variant: "destructive",
      })
    }
    setLoading(false)
  }

  const handleDeleteAvailabilitySlot = async (slotId) => {
    if (!confirm("Are you sure you want to delete this availability slot?")) return

    try {
      const response = await fetch(`/api/availability/${slotId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Availability slot deleted successfully!",
        })
        loadAvailability()
      } else {
        throw new Error("Failed to delete availability slot")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to delete availability: ${error.message}`,
        variant: "destructive",
      })
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

  const handleEditBlogPost = (post) => {
    setEditingBlogPost(post)
    setBlogTitle(post.title)
    setBlogContent(post.content)
    setIsEditMode(true)
    setBlogFiles(null)
    const fileInput = document.getElementById("blog-files") as HTMLInputElement
    if (fileInput) fileInput.value = ""
  }

  const handleUpdateBlogPost = async () => {
    if (!blogTitle.trim() || !blogContent.trim() || !editingBlogPost) {
      toast({
        title: "Error",
        description: "Please fill in both title and content",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      const response = await fetch(`/api/blog/${editingBlogPost.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: blogTitle,
          content: blogContent,
        }),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Blog post updated successfully!",
        })
        setBlogTitle("")
        setBlogContent("")
        setBlogFiles(null)
        setEditingBlogPost(null)
        setIsEditMode(false)
        const fileInput = document.getElementById("blog-files") as HTMLInputElement
        if (fileInput) fileInput.value = ""
        loadBlogPosts()
      } else {
        const errorData = await response.json()
        throw new Error(errorData.error || "Update failed")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to update blog post: ${error.message}`,
        variant: "destructive",
      })
    }
    setLoading(false)
  }

  const handleDeleteBlogPost = async (postId) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return

    try {
      const response = await fetch(`/api/blog/${postId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Blog post deleted successfully!",
        })
        loadBlogPosts()
      } else {
        throw new Error("Failed to delete blog post")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to delete blog post: ${error.message}`,
        variant: "destructive",
      })
    }
  }

  const handleCancelEdit = () => {
    setEditingBlogPost(null)
    setIsEditMode(false)
    setBlogTitle("")
    setBlogContent("")
    setBlogFiles(null)
    const fileInput = document.getElementById("blog-files") as HTMLInputElement
    if (fileInput) fileInput.value = ""
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
      const uploadedFiles = await handleFileUpload(excelFile, "excel")
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
        loadPortfolioItems()
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
      const uploadedFiles = await handleFileUpload(logoFile, "logos")
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
        loadPortfolioItems()
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
        description: "Please provide title and certificate file",
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
        loadCertificates()
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
          status: msStatus,
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
        setMsStatus("not_started")
        setMsModulesCompleted("")
        setMsTotalModules("")
        setMsEstimatedCompletion("")
        loadMSLearnProgress()
      } else {
        throw new Error("Failed to save MS Learn progress")
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
          category: resourceCategory,
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
        setResourceCategory("Learning")
        setResourceIsFree(true)
        loadResources()
      } else {
        throw new Error("Failed to save resource")
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

  const handleSaveService = async () => {
    if (!serviceTitle.trim() || !serviceDescription.trim()) {
      toast({
        title: "Error",
        description: "Please provide title and description",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      const featuresArray = serviceFeatures
        .split("\n")
        .filter((f) => f.trim())
        .map((f) => f.trim())

      const response = await fetch("/api/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: serviceTitle,
          description: serviceDescription,
          features: featuresArray,
          price_from: Number.parseFloat(servicePriceFrom) || null,
          price_type: servicePriceType,
          is_featured: serviceIsFeatured,
          icon_name: serviceIconName,
        }),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Service added successfully!",
        })
        setServiceTitle("")
        setServiceDescription("")
        setServiceFeatures("")
        setServicePriceFrom("")
        setServicePriceType("from")
        setServiceIsFeatured(false)
        setServiceIconName("FileSpreadsheet")
        loadServices()
      } else {
        throw new Error("Failed to save service")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to add service: ${error.message}`,
        variant: "destructive",
      })
    }
    setLoading(false)
  }

  const handleDeleteItem = async (type: string, id: number) => {
    if (!confirm("Are you sure you want to delete this item?")) return

    try {
      const response = await fetch(`/api/${type}/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Item deleted successfully!",
        })

        // Reload the appropriate data
        switch (type) {
          case "portfolio/excel":
          case "portfolio/logos":
            loadPortfolioItems()
            break
          case "certificates":
            loadCertificates()
            break
          case "ms-learn":
            loadMSLearnProgress()
            break
          case "resources":
            loadResources()
            break
          case "services":
            loadServices()
            break
          case "blog":
            loadBlogPosts()
            break
        }
      } else {
        throw new Error("Failed to delete item")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to delete item: ${error.message}`,
        variant: "destructive",
      })
    }
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
          <TabsList className="grid w-full grid-cols-5 lg:grid-cols-9">
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="hero">Hero</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="blog">Blog</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="certificates">Certificates</TabsTrigger>
            <TabsTrigger value="mslearn">MS Learn</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
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
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>{isEditMode ? "Edit Blog Post" : "Create New Blog Post"}</CardTitle>
                  <CardDescription>
                    {isEditMode
                      ? "Update your existing blog post"
                      : "Add a new blog post with optional file attachments"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isEditMode && (
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm text-blue-800">
                        Editing: <strong>{editingBlogPost?.title}</strong>
                      </p>
                    </div>
                  )}
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
                  {!isEditMode && (
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
                  )}
                  <div className="flex gap-2">
                    {isEditMode ? (
                      <>
                        <Button onClick={handleUpdateBlogPost} disabled={loading}>
                          {loading ? "Updating..." : "Update Blog Post"}
                        </Button>
                        <Button variant="outline" onClick={handleCancelEdit}>
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <Button onClick={handleSaveBlogPost} disabled={loading}>
                        {loading ? "Creating..." : "Create Blog Post"}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Existing Blog Posts ({blogPosts.length})</CardTitle>
                  <CardDescription>Manage your published blog posts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {blogPosts.length > 0 ? (
                      blogPosts.map((post) => (
                        <div key={post.id} className="p-3 border rounded-lg">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h4 className="font-medium text-sm">{post.title}</h4>
                              <p className="text-xs text-gray-500 mt-1">
                                Created: {new Date(post.created_at).toLocaleDateString()}
                              </p>
                              {post.updated_at !== post.created_at && (
                                <p className="text-xs text-gray-500">
                                  Updated: {new Date(post.updated_at).toLocaleDateString()}
                                </p>
                              )}
                              <div className="text-xs text-gray-400 mt-1">
                                Content: {post.content.replace(/<[^>]*>/g, "").substring(0, 100)}...
                              </div>
                            </div>
                            <div className="flex gap-1 ml-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEditBlogPost(post)}
                                disabled={isEditMode}
                              >
                                Edit
                              </Button>
                              <Button variant="destructive" size="sm" onClick={() => handleDeleteBlogPost(post.id)}>
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 text-center py-4">No blog posts yet</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="portfolio">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Excel Projects */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileSpreadsheet className="w-5 h-5 mr-2" />
                    Add Excel Project
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="excel-title">Title *</Label>
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
                      accept=".xlsx,.xls,.xlsm"
                      onChange={(e) => setExcelFile(e.target.files)}
                      required
                    />
                  </div>
                  <Button onClick={handleSaveExcelProject} disabled={loading} className="w-full">
                    {loading ? "Adding..." : "Add Excel Project"}
                  </Button>
                </CardContent>
              </Card>

              {/* Logo Designs */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Upload className="w-5 h-5 mr-2" />
                    Add Logo Design
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="logo-title">Title *</Label>
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
                      accept=".jpg,.jpeg,.png,.gif,.webp,.svg"
                      onChange={(e) => setLogoFile(e.target.files)}
                      required
                    />
                  </div>
                  <Button onClick={handleSaveLogoDesign} disabled={loading} className="w-full">
                    {loading ? "Adding..." : "Add Logo Design"}
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Existing Portfolio Items */}
            <div className="mt-8 grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Excel Projects ({portfolioItems.excel.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {portfolioItems.excel.map((item) => (
                      <div key={item.id} className="flex justify-between items-center p-2 border rounded">
                        <div>
                          <div className="font-medium">{item.title}</div>
                          <div className="text-sm text-gray-500">{item.description}</div>
                        </div>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteItem("portfolio/excel", item.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Logo Designs ({portfolioItems.logos.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {portfolioItems.logos.map((item) => (
                      <div key={item.id} className="flex justify-between items-center p-2 border rounded">
                        <div>
                          <div className="font-medium">{item.title}</div>
                          <div className="text-sm text-gray-500">{item.description}</div>
                        </div>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteItem("portfolio/logos", item.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="certificates">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="w-5 h-5 mr-2" />
                    Add Certificate
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="cert-title">Title *</Label>
                    <Input
                      id="cert-title"
                      value={certTitle}
                      onChange={(e) => setCertTitle(e.target.value)}
                      placeholder="Certificate title"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cert-issuer">Issuer</Label>
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
                    <Label htmlFor="cert-file">Certificate File *</Label>
                    <Input
                      id="cert-file"
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => setCertFile(e.target.files)}
                      required
                    />
                  </div>
                  <Button onClick={handleSaveCertificate} disabled={loading} className="w-full">
                    {loading ? "Adding..." : "Add Certificate"}
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Existing Certificates ({certificates.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {certificates.map((cert) => (
                      <div key={cert.id} className="flex justify-between items-center p-2 border rounded">
                        <div>
                          <div className="font-medium">{cert.title}</div>
                          <div className="text-sm text-gray-500">{cert.issuer}</div>
                          {cert.date_earned && (
                            <div className="text-xs text-gray-400">
                              {new Date(cert.date_earned).toLocaleDateString()}
                            </div>
                          )}
                        </div>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteItem("certificates", cert.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="mslearn">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BookOpen className="w-5 h-5 mr-2" />
                    Add MS Learn Progress
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="ms-course-name">Course Name *</Label>
                    <Input
                      id="ms-course-name"
                      value={msCourseName}
                      onChange={(e) => setMsCourseName(e.target.value)}
                      placeholder="e.g., Microsoft Azure Fundamentals (AZ-900)"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ms-description">Description</Label>
                    <Textarea
                      id="ms-description"
                      value={msDescription}
                      onChange={(e) => setMsDescription(e.target.value)}
                      placeholder="Course description"
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="ms-progress">Progress %</Label>
                      <Input
                        id="ms-progress"
                        type="number"
                        min="0"
                        max="100"
                        value={msProgress}
                        onChange={(e) => setMsProgress(e.target.value)}
                        placeholder="0-100"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ms-status">Status</Label>
                      <Select value={msStatus} onValueChange={setMsStatus}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="not_started">Not Started</SelectItem>
                          <SelectItem value="in_progress">In Progress</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="ms-modules-completed">Modules Completed</Label>
                      <Input
                        id="ms-modules-completed"
                        type="number"
                        min="0"
                        value={msModulesCompleted}
                        onChange={(e) => setMsModulesCompleted(e.target.value)}
                        placeholder="0"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ms-total-modules">Total Modules</Label>
                      <Input
                        id="ms-total-modules"
                        type="number"
                        min="0"
                        value={msTotalModules}
                        onChange={(e) => setMsTotalModules(e.target.value)}
                        placeholder="10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ms-estimated-completion">Estimated Completion</Label>
                    <Input
                      id="ms-estimated-completion"
                      type="date"
                      value={msEstimatedCompletion}
                      onChange={(e) => setMsEstimatedCompletion(e.target.value)}
                    />
                  </div>
                  <Button onClick={handleSaveMSLearnProgress} disabled={loading} className="w-full">
                    {loading ? "Adding..." : "Add MS Learn Progress"}
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Existing Progress ({msLearnProgress.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {msLearnProgress.map((progress) => (
                      <div key={progress.id} className="flex justify-between items-center p-2 border rounded">
                        <div>
                          <div className="font-medium">{progress.course_name}</div>
                          <div className="text-sm text-gray-500">
                            {progress.progress_percentage}% - {progress.status}
                          </div>
                        </div>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteItem("ms-learn", progress.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="resources">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <ExternalLink className="w-5 h-5 mr-2" />
                    Add Resource
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="resource-title">Title *</Label>
                    <Input
                      id="resource-title"
                      value={resourceTitle}
                      onChange={(e) => setResourceTitle(e.target.value)}
                      placeholder="Resource title"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="resource-description">Description</Label>
                    <Textarea
                      id="resource-description"
                      value={resourceDescription}
                      onChange={(e) => setResourceDescription(e.target.value)}
                      placeholder="Resource description"
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="resource-url">URL *</Label>
                    <Input
                      id="resource-url"
                      type="url"
                      value={resourceUrl}
                      onChange={(e) => setResourceUrl(e.target.value)}
                      placeholder="https://example.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="resource-category">Category</Label>
                    <Select value={resourceCategory} onValueChange={setResourceCategory}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Learning">Learning</SelectItem>
                        <SelectItem value="Tools">Tools</SelectItem>
                        <SelectItem value="Documentation">Documentation</SelectItem>
                        <SelectItem value="Videos">Videos</SelectItem>
                        <SelectItem value="Websites">Websites</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="resource-is-free" checked={resourceIsFree} onCheckedChange={setResourceIsFree} />
                    <Label htmlFor="resource-is-free">Free Resource</Label>
                  </div>
                  <Button onClick={handleSaveResource} disabled={loading} className="w-full">
                    {loading ? "Adding..." : "Add Resource"}
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Existing Resources ({resources.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {resources.map((resource) => (
                      <div key={resource.id} className="flex justify-between items-center p-2 border rounded">
                        <div>
                          <div className="font-medium">{resource.title}</div>
                          <div className="text-sm text-gray-500">{resource.category}</div>
                          <div className="text-xs text-gray-400">{resource.url}</div>
                        </div>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteItem("resources", resource.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="services">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Settings className="w-5 h-5 mr-2" />
                    Add Service
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="service-title">Title *</Label>
                    <Input
                      id="service-title"
                      value={serviceTitle}
                      onChange={(e) => setServiceTitle(e.target.value)}
                      placeholder="Service title"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="service-description">Description *</Label>
                    <Textarea
                      id="service-description"
                      value={serviceDescription}
                      onChange={(e) => setServiceDescription(e.target.value)}
                      placeholder="Service description"
                      rows={3}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="service-features">Features (one per line)</Label>
                    <Textarea
                      id="service-features"
                      value={serviceFeatures}
                      onChange={(e) => setServiceFeatures(e.target.value)}
                      placeholder="Custom formulas and functions&#10;Data analysis and reporting&#10;Automated workflows"
                      rows={4}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="service-price">Price (£)</Label>
                      <Input
                        id="service-price"
                        type="number"
                        step="0.01"
                        min="0"
                        value={servicePriceFrom}
                        onChange={(e) => setServicePriceFrom(e.target.value)}
                        placeholder="50.00"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="service-price-type">Price Type</Label>
                      <Select value={servicePriceType} onValueChange={setServicePriceType}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="from">From</SelectItem>
                          <SelectItem value="fixed">Fixed</SelectItem>
                          <SelectItem value="hourly">Hourly</SelectItem>
                          <SelectItem value="contact">Contact</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="service-icon">Icon</Label>
                    <Select value={serviceIconName} onValueChange={setServiceIconName}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="FileSpreadsheet">FileSpreadsheet</SelectItem>
                        <SelectItem value="Palette">Palette</SelectItem>
                        <SelectItem value="Settings">Settings</SelectItem>
                        <SelectItem value="Lightbulb">Lightbulb</SelectItem>
                        <SelectItem value="Users">Users</SelectItem>
                        <SelectItem value="Clock">Clock</SelectItem>
                        <SelectItem value="Award">Award</SelectItem>
                        <SelectItem value="Zap">Zap</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="service-is-featured"
                      checked={serviceIsFeatured}
                      onCheckedChange={setServiceIsFeatured}
                    />
                    <Label htmlFor="service-is-featured">Featured Service</Label>
                  </div>
                  <Button onClick={handleSaveService} disabled={loading} className="w-full">
                    {loading ? "Adding..." : "Add Service"}
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Existing Services ({services.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {services.map((service) => (
                      <div key={service.id} className="flex justify-between items-center p-2 border rounded">
                        <div>
                          <div className="font-medium">{service.title}</div>
                          <div className="text-sm text-gray-500">
                            {service.price_from ? `£${service.price_from}` : "Contact for pricing"}
                            {service.is_featured && <span className="ml-2 text-yellow-600">★ Featured</span>}
                          </div>
                        </div>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteItem("services", service.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="bookings">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    Manage Availability
                  </CardTitle>
                  <CardDescription>Set your available time slots for bookings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="slot-day">Day of Week</Label>
                      <Select value={newSlotDay} onValueChange={setNewSlotDay}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select day" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">Monday</SelectItem>
                          <SelectItem value="2">Tuesday</SelectItem>
                          <SelectItem value="3">Wednesday</SelectItem>
                          <SelectItem value="4">Thursday</SelectItem>
                          <SelectItem value="5">Friday</SelectItem>
                          <SelectItem value="6">Saturday</SelectItem>
                          <SelectItem value="0">Sunday</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="slot-start">Start Time</Label>
                      <Input
                        id="slot-start"
                        type="time"
                        value={newSlotStartTime}
                        onChange={(e) => setNewSlotStartTime(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="slot-end">End Time</Label>
                      <Input
                        id="slot-end"
                        type="time"
                        value={newSlotEndTime}
                        onChange={(e) => setNewSlotEndTime(e.target.value)}
                      />
                    </div>
                  </div>
                  <Button onClick={handleAddAvailabilitySlot} disabled={loading} className="w-full">
                    {loading ? "Adding..." : "Add Availability Slot"}
                  </Button>

                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    <h4 className="font-medium">Current Availability</h4>
                    {availability.map((slot) => (
                      <div key={slot.id} className="flex justify-between items-center p-2 border rounded">
                        <div>
                          <div className="font-medium">
                            {
                              ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][
                                slot.day_of_week
                              ]
                            }
                          </div>
                          <div className="text-sm text-gray-500">
                            {slot.start_time} - {slot.end_time}
                          </div>
                        </div>
                        <Button variant="destructive" size="sm" onClick={() => handleDeleteAvailabilitySlot(slot.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Booking Requests ({bookings.length})</CardTitle>
                  <CardDescription>Manage client booking requests</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {bookings.length > 0 ? (
                      bookings.map((booking) => (
                        <div key={booking.id} className="p-3 border rounded-lg">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h4 className="font-medium">{booking.client_name}</h4>
                              <p className="text-sm text-gray-600">{booking.client_email}</p>
                              <p className="text-sm text-gray-500">
                                {new Date(booking.booking_date).toLocaleDateString()} at {booking.booking_time}
                              </p>
                              <p className="text-sm text-gray-500">Service: {booking.service_type}</p>
                              {booking.message && <p className="text-xs text-gray-400 mt-1">"{booking.message}"</p>}
                              <div className="flex gap-2 mt-2">
                                <span
                                  className={`text-xs px-2 py-1 rounded ${
                                    booking.status === "confirmed"
                                      ? "bg-green-100 text-green-800"
                                      : booking.status === "cancelled"
                                        ? "bg-red-100 text-red-800"
                                        : booking.status === "completed"
                                          ? "bg-blue-100 text-blue-800"
                                          : "bg-yellow-100 text-yellow-800"
                                  }`}
                                >
                                  {booking.status}
                                </span>
                              </div>
                            </div>
                            <div className="flex flex-col gap-1 ml-2">
                              {booking.status === "pending" && (
                                <>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleUpdateBookingStatus(booking.id, "confirmed")}
                                  >
                                    Confirm
                                  </Button>
                                  <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => handleUpdateBookingStatus(booking.id, "cancelled")}
                                  >
                                    Cancel
                                  </Button>
                                </>
                              )}
                              {booking.status === "confirmed" && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleUpdateBookingStatus(booking.id, "completed")}
                                >
                                  Complete
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 text-center py-4">No booking requests yet</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
