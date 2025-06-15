export function getBookingAcceptedEmailTemplate(booking: any) {
  return {
    subject: `🎉 Booking Confirmed - ${booking.service_type}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #1a1a1a; color: #ffffff; padding: 20px; border-radius: 10px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #00ffff; margin: 0;">Max Dorman</h1>
          <p style="color: #888; margin: 5px 0;">Excel Expert & Microsoft Specialist</p>
        </div>
        
        <div style="background: #2a2a2a; padding: 20px; border-radius: 8px; border-left: 4px solid #00ffff;">
          <h2 style="color: #00ffff; margin-top: 0;">🎉 Great News! Your Booking is Confirmed</h2>
          <p>Hi ${booking.client_name},</p>
          <p>I'm excited to confirm your booking! I'm looking forward to working with you.</p>
          
          <div style="background: #1a1a1a; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #00ffff; margin-top: 0;">📅 Booking Details:</h3>
            <p><strong>Service:</strong> ${booking.service_type}</p>
            <p><strong>Date:</strong> ${new Date(booking.preferred_date).toLocaleDateString("en-GB")}</p>
            <p><strong>Time:</strong> ${booking.preferred_time}</p>
            <p><strong>Duration:</strong> ${booking.duration} minutes</p>
          </div>
          
          <h3 style="color: #00ffff;">🚀 What's Next?</h3>
          <p>I'll be in touch soon with:</p>
          <ul style="color: #ccc;">
            <li>Meeting details and access information</li>
            <li>Any preparation materials you might need</li>
            <li>My contact information for any questions</li>
          </ul>
          
          <p>If you have any questions before our session, feel free to reach out!</p>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #444;">
            <p style="color: #888; margin: 0;">Best regards,</p>
            <p style="color: #00ffff; font-weight: bold; margin: 5px 0;">Max Dorman</p>
            <p style="color: #888; font-size: 12px;">Excel Expert & Microsoft Specialist</p>
          </div>
        </div>
      </div>
    `,
    text: `
Hi ${booking.client_name},

Great news! Your booking has been confirmed.

Booking Details:
- Service: ${booking.service_type}
- Date: ${new Date(booking.preferred_date).toLocaleDateString("en-GB")}
- Time: ${booking.preferred_time}
- Duration: ${booking.duration} minutes

I'll be in touch soon with meeting details and any preparation materials.

Best regards,
Max Dorman
Excel Expert & Microsoft Specialist
    `,
  }
}

export function getBookingRejectedEmailTemplate(booking: any) {
  return {
    subject: `📅 Booking Update - ${booking.service_type}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #1a1a1a; color: #ffffff; padding: 20px; border-radius: 10px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #00ffff; margin: 0;">Max Dorman</h1>
          <p style="color: #888; margin: 5px 0;">Excel Expert & Microsoft Specialist</p>
        </div>
        
        <div style="background: #2a2a2a; padding: 20px; border-radius: 8px; border-left: 4px solid #ff6b6b;">
          <h2 style="color: #ff6b6b; margin-top: 0;">📅 Booking Update</h2>
          <p>Hi ${booking.client_name},</p>
          <p>Thank you for your interest in my services. Unfortunately, I'm not available for your requested time slot.</p>
          
          <div style="background: #1a1a1a; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #00ffff; margin-top: 0;">📋 Your Request:</h3>
            <p><strong>Service:</strong> ${booking.service_type}</p>
            <p><strong>Requested Date:</strong> ${new Date(booking.preferred_date).toLocaleDateString("en-GB")}</p>
            <p><strong>Requested Time:</strong> ${booking.preferred_time}</p>
          </div>
          
          <h3 style="color: #00ffff;">🔄 Let's Find Another Time!</h3>
          <p>I'd love to work with you on this project. Please:</p>
          <ul style="color: #ccc;">
            <li>Check my booking page for other available slots</li>
            <li>Consider alternative dates or times</li>
            <li>Contact me directly if you need flexible scheduling</li>
          </ul>
          
          <div style="text-align: center; margin: 20px 0;">
            <a href="http://localhost:3000/book" style="background: #00ffff; color: #000; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">View Available Times</a>
          </div>
          
          <p>I appreciate your understanding and look forward to working with you soon!</p>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #444;">
            <p style="color: #888; margin: 0;">Best regards,</p>
            <p style="color: #00ffff; font-weight: bold; margin: 5px 0;">Max Dorman</p>
            <p style="color: #888; font-size: 12px;">Excel Expert & Microsoft Specialist</p>
          </div>
        </div>
      </div>
    `,
    text: `
Hi ${booking.client_name},

Thank you for your interest in my services. Unfortunately, I'm not available for your requested time slot.

Your Request:
- Service: ${booking.service_type}
- Requested Date: ${new Date(booking.preferred_date).toLocaleDateString("en-GB")}
- Requested Time: ${booking.preferred_time}

Please check my booking page for other available times or contact me directly.

Best regards,
Max Dorman
Excel Expert & Microsoft Specialist
    `,
  }
}
