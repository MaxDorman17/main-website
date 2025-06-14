import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, BookOpen, PenToolIcon as Tool, Globe, Video, FileText } from "lucide-react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { neon } from "@neondatabase/serverless"
import type { Metadata } from "next"

// Force dynamic rendering to avoid caching issues
export const dynamic = "force-dynamic"
export const revalidate = 0
export const fetchCache = "force-no-store"

export const metadata: Metadata = {
  title: "Resources",
  description: "Useful resources, tools, and learning materials for Microsoft technologies and development.",
}

const sql = neon(process.env.DATABASE_URL!)

async function getResourcesDirect() {
  try {
    const result = await sql`SELECT * FROM resources ORDER BY category, title ASC`
    console.log("Resources fetched:", result.length)
    return result
  } catch (error) {
    console.error("Error fetching resources:", error)
    return []
  }
}

export default async function ResourcesPage() {
  const resources = await getResourcesDirect()

  // Group resources by category
  const groupedResources = resources.reduce((acc, resource) => {
    const category = resource.category || "Other"
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(resource)
    return acc
  }, {})

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "learning":
        return <BookOpen className="w-5 h-5" />
      case "tools":
        return <Tool className="w-5 h-5" />
      case "documentation":
        return <FileText className="w-5 h-5" />
      case "videos":
        return <Video className="w-5 h-5" />
      case "websites":
        return <Globe className="w-5 h-5" />
      default:
        return <ExternalLink className="w-5 h-5" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "learning":
        return "text-blue-600"
      case "tools":
        return "text-green-600"
      case "documentation":
        return "text-purple-600"
      case "videos":
        return "text-red-600"
      case "websites":
        return "text-orange-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Resources</h1>
          <p className="text-xl text-muted-foreground">
            Useful tools, learning materials, and resources for Microsoft technologies and development
          </p>
        </div>

        {/* Debug info */}
        <div className="mb-4 text-sm text-muted-foreground">
          Found {resources.length} resources • Categories: {Object.keys(groupedResources).length} • Last updated:{" "}
          {new Date().toLocaleString()}
        </div>

        {Object.keys(groupedResources).length > 0 ? (
          <div className="space-y-8">
            {Object.entries(groupedResources).map(([category, categoryResources]) => (
              <div key={category}>
                <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                  <span className={`mr-3 ${getCategoryColor(category)}`}>{getCategoryIcon(category)}</span>
                  {category}
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryResources.map((resource) => (
                    <Card key={resource.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <CardTitle className="text-lg">{resource.title}</CardTitle>
                        <CardDescription>{resource.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <Link href={resource.url} target="_blank" rel="noopener noreferrer">
                            <Button variant="outline" size="sm">
                              <ExternalLink className="w-4 h-4 mr-2" />
                              Visit Resource
                            </Button>
                          </Link>
                          {resource.is_free && (
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Free</span>
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground mt-2">
                          Added: {new Date(resource.created_at).toLocaleDateString()}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="text-center py-12">
              <BookOpen className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No resources yet</h3>
              <p className="text-muted-foreground">Resources will appear here once added</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
