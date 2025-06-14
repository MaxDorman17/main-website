import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Award, Download, Calendar } from "lucide-react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { neon } from "@neondatabase/serverless"

// Force dynamic rendering to avoid caching issues
export const dynamic = "force-dynamic"
export const revalidate = 0
export const fetchCache = "force-no-store"

const sql = neon(process.env.DATABASE_URL!)

async function getCertificatesDirect() {
  try {
    const result = await sql`SELECT * FROM certificates ORDER BY date_earned DESC, created_at DESC`
    console.log("Certificates fetched:", result.length)
    return result
  } catch (error) {
    console.error("Error fetching certificates:", error)
    return []
  }
}

export default async function CertificatesPage() {
  const certificates = await getCertificatesDirect()

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4 hero-title">Certificates</h1>
          <p className="text-xl text-muted-foreground">
            My <span className="text-neon-pink">professional certifications</span> and achievements
          </p>
        </div>

        {/* Debug info */}
        <div className="mb-4 text-sm text-muted-foreground">
          Found {certificates.length} certificates • Last updated: {new Date().toLocaleString()}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.length > 0 ? (
            certificates.map((cert) => (
              <Card key={cert.id} className="cyber-card hover:scale-105 transition-all duration-300 hover:pink-glow">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="w-5 h-5 mr-2 text-yellow-600" />
                    {cert.title}
                  </CardTitle>
                  <CardDescription>
                    {cert.issuer && <div className="font-medium text-neon-cyan">{cert.issuer}</div>}
                    {cert.date_earned && (
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(cert.date_earned).toLocaleDateString()}
                      </div>
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {cert.description && <p className="text-muted-foreground mb-4">{cert.description}</p>}
                  <Link href={cert.file_url} target="_blank">
                    <Button variant="outline" className="w-full">
                      <Download className="w-4 h-4 mr-2" />
                      View Certificate
                    </Button>
                  </Link>
                  <div className="text-xs text-muted-foreground mt-2">
                    Added: {new Date(cert.created_at).toLocaleDateString()}
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="col-span-full cyber-card">
              <CardContent className="text-center py-12">
                <Award className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">No certificates yet</h3>
                <p className="text-muted-foreground">Certificates will appear here once uploaded</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
