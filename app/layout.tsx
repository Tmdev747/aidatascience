import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import NavigationBar from "@/components/navigation-bar"
import AnalyticsProvider from "@/components/analytics-provider"
import { Suspense } from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AI & Data Science in the Philippines",
  description: "Interactive presentation on AI and Data Science applications in the Philippines",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <AnalyticsProvider>
            <NavigationBar />
            <Suspense>{children}</Suspense>
          </AnalyticsProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
