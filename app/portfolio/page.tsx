import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileSpreadsheet, ImageIcon, Download } from "lucide-react"
import Link from "next/link"
import { neon } from "@neondatabase/serverless"

// Force dynamic rendering to avoid caching issues
export const dynamic = "force-dynamic"
export const revalidate = 0
export const fetchCache = "force-no-store"

const sql = neon(process.env.DATABASE_URL!)

async function getPortfolioItemsDirect() {
  try {
    const [excel, logos] = await Promise.all([
      sql`SELECT * FROM portfolio_excel ORDER BY created_at DESC`,
      sql`SELECT * FROM portfolio_logos ORDER BY created_at DESC`,
    ])
    console.log("Portfolio items fetched:", { excel: excel.length, logos: logos.length })
    return { excel, logos }
  } catch (error) {
    console.error("Error fetching portfolio items:", error)
    return { excel: [], logos: [] }
  }
}

export default async function PortfolioPage() {
  const portfolioItems = await getPortfolioItemsDirect()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Portfolio</h1>
          <p className="text-xl text-gray-600">Showcasing my work in Excel projects and logo designs</p>
        </div>

        {/* Debug info */}
        <div className="mb-4 text-sm text-gray-500">
          Excel projects: {portfolioItems.excel?.length || 0} • Logo designs: {portfolioItems.logos?.length || 0} • Last
          updated: {new Date().toLocaleString()}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Excel Projects */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Excel Projects</h2>
            <div className="space-y-4">
              {portfolioItems.excel?.length > 0 ? (
                portfolioItems.excel.map((item) => (
                  <Card key={item.id}>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <FileSpreadsheet className="w-5 h-5 mr-2 text-green-600" />
                        {item.title}
                      </CardTitle>
                      <CardDescription>{item.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Link href={item.file_url} target="_blank">
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          View Excel File
                        </Button>
                      </Link>
                      <div className="text-xs text-gray-400 mt-2">
                        Added: {new Date(item.created_at).toLocaleDateString()}
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card>
                  <CardContent className="text-center py-8">
                    <FileSpreadsheet className="w-12 h-12 mx-auto text-gray-400 mb-3" />
                    <p className="text-gray-600">No Excel projects yet</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Logo Designs */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Logo Designs</h2>
            <div className="grid grid-cols-2 gap-4">
              {portfolioItems.logos?.length > 0 ? (
                portfolioItems.logos.map((logo) => (
                  <Card key={logo.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                      <div className="aspect-square bg-gray-100 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
                        <img
                          src={logo.image_url || "/placeholder.svg"}
                          alt={logo.title}
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                      <h3 className="font-semibold text-sm">{logo.title}</h3>
                      {logo.description && <p className="text-xs text-gray-600 mt-1">{logo.description}</p>}
                      <div className="text-xs text-gray-400 mt-2">
                        Added: {new Date(logo.created_at).toLocaleDateString()}
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card className="col-span-2">
                  <CardContent className="text-center py-8">
                    <ImageIcon className="w-12 h-12 mx-auto text-gray-400 mb-3" />
                    <p className="text-gray-600">No logo designs yet</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
