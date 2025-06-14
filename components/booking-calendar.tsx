"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, User } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const services = [
  "Excel Development",
  "Logo Design",
  "Microsoft Office Consulting",
  "Data Analysis",
  "Business Process Automation",
  "General Consultation",
]

export function BookingCalendar() {
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [availableTimes, setAvailableTimes] = useState([])
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const { toast } = useToast()

  // Form states
  const [clientName, setClientName] = useState("")
  const [clientEmail, setClientEmail] = useState("")
  const [clientPhone, setClientPhone] = useState("")
  const [serviceType, setServiceType] = useState("")
  const [message, setMessage] = useState("")

  // Get minimum date (today)
  const today = new Date().toISOString().split("T")[0]

  // Get maximum date (3 months from now)
  const maxDate = new Date()
  maxDate.setMonth(maxDate.getMonth() + 3)
  const maxDateString = maxDate.toISOString().split("T")[0]

  useEffect(() => {
    if (selectedDate) {
      fetchAvailableTimes(selectedDate)
    }
  }, [selectedDate])

  const fetchAvailableTimes = async (date: string) => {
    setLoading(true)
    try {
      const response = await fetch(`/api/available-times?date=${date}`)
      if (response.ok) {
        const times = await response.json()
        setAvailableTimes(times)
        setSelectedTime("") // Reset selected time when date changes
      } else {
        setAvailableTimes([])
      }
    } catch (error) {
      console.error("Error fetching available times:", error)
      setAvailableTimes([])
    }
    setLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!clientName || !clientEmail || !selectedDate || !selectedTime || !serviceType) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setSubmitting(true)
    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          client_name: clientName,
          client_email: clientEmail,
          client_phone: clientPhone,
          booking_date: selectedDate,
          booking_time: selectedTime,
          service_type: serviceType,
          message: message,
        }),
      })

      if (response.ok) {
        toast({
          title: "Booking Request Sent!",
          description: "Your booking request has been submitted. I'll review it and get back to you soon.",
        })

        // Reset form
        setClientName("")
        setClientEmail("")
        setClientPhone("")
        setServiceType("")
        setMessage("")
        setSelectedDate("")
        setSelectedTime("")
        setAvailableTimes([])
      } else {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to submit booking")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to submit booking: ${error.message}`,
        variant: "destructive",
      })
    }
    setSubmitting(false)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatTime = (timeString: string) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
  }

  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 hero-title">Book a Consultation</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Schedule a consultation to discuss your <span className="text-primary font-semibold">Microsoft Office</span>,{" "}
          <span className="text-neon-pink font-semibold">Excel</span>, or{" "}
          <span className="text-neon-purple font-semibold">design</span> needs.
        </p>
        <div className="section-divider mt-6"></div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Date & Time Selection */}
        <Card className="cyber-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Select Date & Time
            </CardTitle>
            <CardDescription>Choose your preferred date and available time slot</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="booking-date">Date *</Label>
              <Input
                id="booking-date"
                type="date"
                min={today}
                max={maxDateString}
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                required
              />
            </div>

            {selectedDate && (
              <div className="space-y-2">
                <Label>Available Times for {formatDate(selectedDate)}</Label>
                {loading ? (
                  <p className="text-sm text-muted-foreground">Loading available times...</p>
                ) : availableTimes.length > 0 ? (
                  <div className="grid grid-cols-2 gap-2">
                    {availableTimes.map((time) => (
                      <Button
                        key={time}
                        variant={selectedTime === time ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedTime(time)}
                        className={`justify-start ${selectedTime === time ? "cyber-pink-button" : "cyber-button"}`}
                      >
                        <Clock className="w-4 h-4 mr-2" />
                        {formatTime(time)}
                      </Button>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No available times for this date</p>
                )}
              </div>
            )}

            {selectedDate && selectedTime && (
              <div className="p-3 bg-primary/10 rounded-lg">
                <p className="text-sm font-medium">Selected Appointment:</p>
                <p className="text-sm text-muted-foreground">
                  {formatDate(selectedDate)} at {formatTime(selectedTime)}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Booking Form */}
        <Card className="cyber-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="w-5 h-5 mr-2" />
              Your Details
            </CardTitle>
            <CardDescription>Please provide your contact information and service needs</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="client-name">Full Name *</Label>
                <Input
                  id="client-name"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="Your full name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="client-email">Email Address *</Label>
                <Input
                  id="client-email"
                  type="email"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="client-phone">Phone Number</Label>
                <Input
                  id="client-phone"
                  type="tel"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  placeholder="Your phone number"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="service-type">Service Required *</Label>
                <Select value={serviceType} onValueChange={setServiceType} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map((service) => (
                      <SelectItem key={service} value={service}>
                        {service}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">What do you need help with? *</Label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Please describe your project or what you need assistance with..."
                  rows={4}
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full cyber-pink-button"
                disabled={submitting || !selectedDate || !selectedTime}
              >
                {submitting ? "Submitting..." : "Request Booking"}
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                Your booking request will be reviewed and you'll receive a confirmation email within 24 hours.
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
