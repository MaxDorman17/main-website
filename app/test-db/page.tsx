import { getAboutMe } from "@/lib/data"

export const dynamic = "force-dynamic"

export default async function TestPage() {
  let result = null
  let error = null

  try {
    result = await getAboutMe()
  } catch (e) {
    error = e
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Database Test</h1>

      <div className="bg-gray-100 p-4 rounded mb-4">
        <h2 className="font-bold">Environment Check:</h2>
        <p>DATABASE_URL exists: {process.env.DATABASE_URL ? "✅ Yes" : "❌ No"}</p>
        <p>DATABASE_URL starts with: {process.env.DATABASE_URL?.substring(0, 20)}...</p>
      </div>

      <div className="bg-blue-100 p-4 rounded mb-4">
        <h2 className="font-bold">Database Result:</h2>
        {error ? (
          <div className="text-red-600">
            <p>Error: {error.message}</p>
            <pre className="text-xs mt-2">{error.stack}</pre>
          </div>
        ) : (
          <pre className="text-sm">{JSON.stringify(result, null, 2)}</pre>
        )}
      </div>
    </div>
  )
}
