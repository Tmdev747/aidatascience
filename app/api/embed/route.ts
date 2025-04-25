import { NextResponse } from "next/server"
import { headers } from "next/headers"

export async function POST(request: Request) {
  const headersList = headers()
  const origin = headersList.get("origin")

  // Check if the origin is allowed
  const allowedOrigins = ["https://innovatehub-presentation-bsu.replit.app", "http://localhost:3000"]

  // Only allow requests from specified origins
  if (!origin || !allowedOrigins.includes(origin)) {
    return NextResponse.json({ error: "Unauthorized origin" }, { status: 403 })
  }

  try {
    const data = await request.json()

    // Handle different types of requests
    if (data.type === "themeRequest") {
      // Return theme data
      return NextResponse.json({
        success: true,
        theme: "replitLight",
        colors: {
          background: "#F5F9FC",
          text: "#0E1525",
          primary: "#3485FF",
        },
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  })
}
