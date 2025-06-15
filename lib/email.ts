import { Resend } from "resend"
import { getBookingAcceptedEmailTemplate, getBookingRejectedEmailTemplate } from "./email-templates"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendBookingStatusEmail(booking: any, status: "accepted" | "rejected") {
  try {
    console.log("Sending email with Resend API key:", process.env.RESEND_API_KEY ? "Present" : "Missing")

    const template =
      status === "accepted" ? getBookingAcceptedEmailTemplate(booking) : getBookingRejectedEmailTemplate(booking)

    const result = await resend.emails.send({
      from: "Max Dorman <onboarding@resend.dev>", // Using Resend's test domain
      to: [booking.client_email],
      subject: template.subject,
      html: template.html,
      text: template.text,
    })

    console.log("Email sent successfully:", result)
    return { success: true, result }
  } catch (error) {
    console.error("Error sending email:", error)
    return { success: false, error: error.message }
  }
}

export async function sendBookingNotificationToAdmin(booking: any) {
  try {
    const result = await resend.emails.send({
      from: "Website <onboarding@resend.dev>",
      to: ["maxdorman@example.com"], // Replace with your actual email
      subject: `New Booking Request - ${booking.service_type}`,
      html: `
        <h2>New Booking Request</h2>
        <p><strong>Client:</strong> ${booking.client_name}</p>
        <p><strong>Email:</strong> ${booking.client_email}</p>
        <p><strong>Service:</strong> ${booking.service_type}</p>
        <p><strong>Date:</strong> ${new Date(booking.preferred_date).toLocaleDateString("en-GB")}</p>
        <p><strong>Time:</strong> ${booking.preferred_time}</p>
        <p><strong>Duration:</strong> ${booking.duration} minutes</p>
        ${booking.message ? `<p><strong>Message:</strong> ${booking.message}</p>` : ""}
        
        <p><a href="http://localhost:3000/admin">Go to Admin Panel</a></p>
      `,
    })

    return { success: true, result }
  } catch (error) {
    console.error("Error sending admin notification:", error)
    return { success: false, error }
  }
}
