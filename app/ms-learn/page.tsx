import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Trophy, Target } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { neon } from "@neondatabase/serverless"

// Force dynamic rendering to avoid caching issues
export const dynamic = "force-dynamic"
export const revalidate = 0
export const fetchCache = "force-no-store"

const sql = neon(process.env.DATABASE_URL!)

async function getMSLearnProgressDirect() {
  try {
    const result = await sql`SELECT * FROM ms_learn_progress ORDER BY updated_at DESC`
    console.log("MS Learn progress fetched:", result.length)
    return result
  } catch (error) {
    console.error("Error fetching MS Learn progress:", error)
    return []
  }
}

export default async function MSLearnPage() {
  const progress = await getMSLearnProgressDirect()

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4 hero-title">Microsoft Learn Progress</h1>
          <p className="text-xl text-muted-foreground">
            Tracking my journey through <span className="text-neon-pink">Microsoft fundamentals</span> and beyond
          </p>
        </div>

        {/* Debug info */}
        <div className="mb-4 text-sm text-muted-foreground">
          Found {progress.length} learning paths • Last updated: {new Date().toLocaleString()}
        </div>

        {progress.length > 0 ? (
          <div className="space-y-6">
            {progress.map((item) => (
              <Card key={item.id} className="cyber-card">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center">
                      <BookOpen className="w-5 h-5 mr-2 text-blue-600" />
                      {item.course_name}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      {item.status === "completed" && <Trophy className="w-4 h-4 mr-1 text-yellow-500" />}
                      {item.status === "in_progress" && <Target className="w-4 h-4 mr-1 text-blue-500" />}
                      <span
                        className={
                          item.status === "completed"
                            ? "text-neon-pink"
                            : item.status === "in_progress"
                              ? "text-neon-cyan"
                              : "text-muted-foreground"
                        }
                      >
                        {item.status.charAt(0).toUpperCase() + item.status.slice(1).replace("_", " ")}
                      </span>
                    </div>
                  </CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span className="text-neon-pink font-semibold">{item.progress_percentage}%</span>
                    </div>
                    <Progress value={item.progress_percentage} className="w-full" />

                    {item.modules_completed && item.total_modules && (
                      <div className="text-sm text-muted-foreground">
                        Modules: <span className="text-neon-cyan">{item.modules_completed}</span> / {item.total_modules}{" "}
                        completed
                      </div>
                    )}

                    {item.estimated_completion && (
                      <div className="text-sm text-muted-foreground">
                        Estimated completion:{" "}
                        <span className="text-neon-pink">
                          {new Date(item.estimated_completion).toLocaleDateString()}
                        </span>
                      </div>
                    )}

                    <div className="text-xs text-muted-foreground">
                      Last updated: {new Date(item.updated_at).toLocaleDateString()}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="cyber-card">
            <CardContent className="text-center py-12">
              <BookOpen className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No learning progress yet</h3>
              <p className="text-muted-foreground">Learning progress will be tracked here</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
