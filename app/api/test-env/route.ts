import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    hasBlobToken: !!process.env.BLOB_READ_WRITE_TOKEN,
    blobTokenStart: process.env.BLOB_READ_WRITE_TOKEN?.substring(0, 10) + "...",
    hasDatabaseUrl: !!process.env.DATABASE_URL,
    nodeEnv: process.env.NODE_ENV,
  })
}
