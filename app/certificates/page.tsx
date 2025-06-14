import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Award, Download, Calendar } from "lucide-react"
import Link from "next/link"
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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Certificates</h1>
          <p className="text-xl text-gray-600">My professional certifications and achievements</p>
        </div>

        {/* Debug info */}
        <div className="mb-4 text-sm text-gray-500">
          Found {certificates.length} certificates • Last updated: {new Date().toLocaleString()}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.length > 0 ? (
            certificates.map((cert) => (
              <Card key={cert.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="w-5 h-5 mr-2 text-yellow-600" />
                    {cert.title}
                  </CardTitle>
                  <CardDescription>
                    {cert.issuer && <div className="font-medium">{cert.issuer}</div>}
                    {cert.date_earned && (
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(cert.date_earned).toLocaleDateString()}
                      </div>
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {cert.description && <p className="text-gray-600 mb-4">{cert.description}</p>}
                  <Link href={cert.file_url} target="_blank">
                    <Button variant="outline" className="w-full">
                      <Download className="w-4 h-4 mr-2" />
                      View Certificate
                    </Button>
                  </Link>
                  <div className="text-xs text-gray-400 mt-2">
                    Added: {new Date(cert.created_at).toLocaleDateString()}
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="col-span-full">
              <CardContent className="text-center py-12">
                <Award className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No certificates yet</h3>
                <p className="text-gray-600">Certificates will appear here once uploaded</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
