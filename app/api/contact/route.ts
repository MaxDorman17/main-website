import { Resend } from "resend"
import { type NextRequest, NextResponse } from "next/server"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    console.log("📝 Received contact form data:", body)

    const { name, email, phone, company, service, budget, timeline, message } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required" }, { status: 400 })
    }

    const emailHtml = `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 10px; overflow: hidden;">
    <div style="padding: 30px; text-align: center; background: rgba(0,0,0,0.2);">
      <h1 style="margin: 0; font-size: 28px; background: linear-gradient(45deg, #00f5ff, #ff00ff); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">New Contact Form Submission</h1>
      <p style="margin: 10px 0 0 0; opacity: 0.9;">From Max Dorman Website</p>
    </div>
    
    <div style="padding: 30px; background: rgba(255,255,255,0.1); backdrop-filter: blur(10px);">
      <div style="margin-bottom: 25px; padding: 20px; background: rgba(0,0,0,0.2); border-radius: 8px; border-left: 4px solid #00f5ff;">
        <h3 style="margin: 0 0 10px 0; color: #00f5ff;">Contact Information</h3>
        <p style="margin: 5px 0;"><strong>Name:</strong> ${name}</p>
        <p style="margin: 5px 0;"><strong>Email:</strong> ${email}</p>
        <p style="margin: 5px 0;"><strong>Phone:</strong> ${phone || "Not provided"}</p>
        <p style="margin: 5px 0;"><strong>Company:</strong> ${company || "Not provided"}</p>
      </div>
      
      <div style="margin-bottom: 25px; padding: 20px; background: rgba(0,0,0,0.2); border-radius: 8px; border-left: 4px solid #ff00ff;">
        <h3 style="margin: 0 0 10px 0; color: #ff00ff;">Project Details</h3>
        <p style="margin: 5px 0;"><strong>Service:</strong> ${service || "Not specified"}</p>
        <p style="margin: 5px 0;"><strong>Budget:</strong> ${budget || "Not specified"}</p>
        <p style="margin: 5px 0;"><strong>Timeline:</strong> ${timeline || "Not specified"}</p>
      </div>
      
      <div style="padding: 20px; background: rgba(0,0,0,0.2); border-radius: 8px; border-left: 4px solid #00ff88;">
        <h3 style="margin: 0 0 10px 0; color: #00ff88;">Message</h3>
        <p style="line-height: 1.6; white-space: pre-wrap;">${message}</p>
      </div>
      
      <div style="margin-top: 30px; padding: 20px; text-align: center; background: rgba(0,0,0,0.1); border-radius: 8px;">
        <p style="margin: 0; opacity: 0.8; font-size: 14px;">
          Received: ${new Date().toLocaleString()}<br>
          Source: maxdorman.co.uk/contact
        </p>
      </div>
    </div>
  </div>
`

    console.log("📧 Attempting to send email to maxd@ittechs.io")

    const data = await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: ["maxd@ittechs.io"],
      subject: `New Contact: ${name} - ${service || "General Inquiry"}`,
      html: emailHtml,
    })

    console.log("✅ Email sent successfully:", data)

    return NextResponse.json({
      success: true,
      message: "Message sent successfully!",
      emailId: data.id,
    })
  } catch (error) {
    console.error("❌ Contact form error:", error)
    return NextResponse.json({ error: `Failed to send message: ${error.message}` }, { status: 500 })
  }
}
