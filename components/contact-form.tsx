"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, Send, User, Building, Phone, DollarSign, Clock } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    service_interest: "",
    message: "",
    phone: "",
    company: "",
    budget_range: "",
    timeline: "",
  })
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok) {
        toast({
          title: "Success!",
          description: result.message || "Thank you for your message! I'll get back to you within 24 hours.",
        })
        // Reset form
        setFormData({
          name: "",
          email: "",
          subject: "",
          service_interest: "",
          message: "",
          phone: "",
          company: "",
          budget_range: "",
          timeline: "",
        })
      } else {
        throw new Error(result.error || "Failed to send message")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="cyber-card">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Mail className="w-6 h-6 mr-2 text-primary" />
          Get In Touch
        </CardTitle>
        <CardDescription>
          Ready to start your project? Fill out the form below and I'll get back to you within 24 hours.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center">
                <User className="w-4 h-4 mr-1" />
                Name *
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Your full name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center">
                <Mail className="w-4 h-4 mr-1" />
                Email *
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="your@email.com"
                required
              />
            </div>
          </div>

          {/* Optional Contact Info */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center">
                <Phone className="w-4 h-4 mr-1" />
                Phone (Optional)
              </Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+44 7XXX XXXXXX"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company" className="flex items-center">
                <Building className="w-4 h-4 mr-1" />
                Company (Optional)
              </Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="Your company name"
              />
            </div>
          </div>

          {/* Project Details */}
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              placeholder="Brief description of your project"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="service_interest">Service Interest</Label>
            <Select
              value={formData.service_interest}
              onValueChange={(value) => setFormData({ ...formData, service_interest: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="excel-development">Excel Development & Automation</SelectItem>
                <SelectItem value="logo-design">Logo Design & Branding</SelectItem>
                <SelectItem value="office-consulting">Microsoft Office Consulting</SelectItem>
                <SelectItem value="technology-consulting">Technology Consulting</SelectItem>
                <SelectItem value="multiple">Multiple Services</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Budget and Timeline */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="budget_range" className="flex items-center">
                <DollarSign className="w-4 h-4 mr-1" />
                Budget Range (Optional)
              </Label>
              <Select
                value={formData.budget_range}
                onValueChange={(value) => setFormData({ ...formData, budget_range: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select budget range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="under-100">Under £100</SelectItem>
                  <SelectItem value="100-250">£100 - £250</SelectItem>
                  <SelectItem value="250-500">£250 - £500</SelectItem>
                  <SelectItem value="500-1000">£500 - £1,000</SelectItem>
                  <SelectItem value="1000-plus">£1,000+</SelectItem>
                  <SelectItem value="discuss">Let's discuss</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="timeline" className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                Timeline (Optional)
              </Label>
              <Select
                value={formData.timeline}
                onValueChange={(value) => setFormData({ ...formData, timeline: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select timeline" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asap">ASAP</SelectItem>
                  <SelectItem value="1-week">Within 1 week</SelectItem>
                  <SelectItem value="2-weeks">Within 2 weeks</SelectItem>
                  <SelectItem value="1-month">Within 1 month</SelectItem>
                  <SelectItem value="flexible">Flexible</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message">Message *</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Tell me about your project, requirements, and any specific details..."
              rows={6}
              required
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full" size="lg">
            <Send className="w-4 h-4 mr-2" />
            {loading ? "Sending..." : "Send Message"}
          </Button>

          <p className="text-sm text-muted-foreground text-center">
            I typically respond within 24 hours. All information is kept confidential.
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
