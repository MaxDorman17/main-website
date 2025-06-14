import { ImageResponse } from "next/og"
import type { NextRequest } from "next/server"

export const runtime = "edge"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const title = searchParams.get("title") || "Max Dorman"
    const subtitle = searchParams.get("subtitle") || "Technology Consultant & Microsoft Specialist"
    const type = searchParams.get("type") || "website"

    return new ImageResponse(
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0f172a",
          backgroundImage:
            "radial-gradient(circle at 25% 25%, rgba(0, 212, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)",
          position: "relative",
        }}
      >
        {/* Grid Pattern */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage:
              "linear-gradient(rgba(0, 212, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 212, 255, 0.1) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
            opacity: 0.3,
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "40px",
            zIndex: 1,
          }}
        >
          {/* Logo/Icon */}
          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              background: "linear-gradient(45deg, #00d4ff, #ff1493)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "30px",
              boxShadow: "0 0 30px rgba(0, 212, 255, 0.4)",
            }}
          >
            <div
              style={{
                color: "#0f172a",
                fontSize: "40px",
                fontWeight: "bold",
              }}
            >
              MD
            </div>
          </div>

          {/* Title */}
          <h1
            style={{
              fontSize: "60px",
              fontWeight: "bold",
              background: "linear-gradient(45deg, #00d4ff, #ff1493, #8b5cf6)",
              backgroundClip: "text",
              color: "transparent",
              margin: "0 0 20px 0",
              lineHeight: 1.1,
            }}
          >
            {title}
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: "24px",
              color: "#94a3b8",
              margin: "0 0 20px 0",
              maxWidth: "800px",
            }}
          >
            {subtitle}
          </p>

          {/* Location */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: "18px",
              color: "#00d4ff",
            }}
          >
            📍 Fife, Scotland
          </div>

          {/* Type indicator */}
          {type !== "website" && (
            <div
              style={{
                marginTop: "20px",
                padding: "8px 16px",
                backgroundColor: "rgba(255, 20, 147, 0.2)",
                border: "1px solid rgba(255, 20, 147, 0.5)",
                borderRadius: "20px",
                color: "#ff1493",
                fontSize: "14px",
                textTransform: "uppercase",
              }}
            >
              {type}
            </div>
          )}
        </div>

        {/* Decorative elements */}
        <div
          style={{
            position: "absolute",
            top: "50px",
            right: "50px",
            width: "100px",
            height: "100px",
            border: "2px solid rgba(0, 212, 255, 0.3)",
            borderRadius: "50%",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "50px",
            left: "50px",
            width: "80px",
            height: "80px",
            border: "2px solid rgba(255, 20, 147, 0.3)",
            borderRadius: "10px",
            transform: "rotate(45deg)",
          }}
        />
      </div>,
      {
        width: 1200,
        height: 630,
      },
    )
  } catch (e) {
    console.log(`Failed to generate OG image: ${e.message}`)
    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
}
