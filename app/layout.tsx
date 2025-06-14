import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "Max Dorman - Microsoft Fundamentals Student | Fife, Scotland",
    template: "%s | Max Dorman",
  },
  description:
    "Max Dorman's personal website showcasing Microsoft learning journey, Excel projects, logo designs, and professional development from Fife, Scotland.",
  keywords: [
    "Max Dorman",
    "Microsoft Fundamentals",
    "Excel Projects",
    "Logo Design",
    "Scotland",
    "Technology",
    "Learning",
  ],
  authors: [{ name: "Max Dorman", url: "https://maxdorman.com" }],
  creator: "Max Dorman",
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://maxdorman.com",
    title: "Max Dorman - Microsoft Fundamentals Student",
    description: "Exploring Microsoft technologies and building digital solutions from the heart of Scotland",
    siteName: "Max Dorman",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Max Dorman - Microsoft Fundamentals Student",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Max Dorman - Microsoft Fundamentals Student",
    description: "Exploring Microsoft technologies and building digital solutions from the heart of Scotland",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code", // You'll add this later
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="canonical" href="https://maxdorman.com" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
