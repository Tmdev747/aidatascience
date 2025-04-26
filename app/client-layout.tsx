"use client"

import type React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import NavigationBar from "@/components/navigation-bar"
import AnalyticsProvider from "@/components/analytics-provider"
import { Suspense } from "react"
import { usePathname } from "next/navigation"

// Create a client component for conditional rendering
function ConditionalHeader() {
  const pathname = usePathname()
  const isEmbedRoute = pathname.startsWith("/embed")

  if (isEmbedRoute) {
    return null
  }

  return <NavigationBar />
}

// Changed from named export to default export
export default function ClientRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
      <AnalyticsProvider>
        <Suspense>
          {/* Use client component for conditional rendering */}
          <ConditionalHeader />
          {children}
        </Suspense>
      </AnalyticsProvider>
    </ThemeProvider>
  )
}
