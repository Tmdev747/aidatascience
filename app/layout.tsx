import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AI in Data Science | Batangas State University",
  description: "Interactive presentation on AI in Data Science with Philippine context for Batangas State University",
  icons: {
    icon: "/images/innovate-hub-logo.png",
    apple: "/images/innovate-hub-logo.png",
  },
  authors: [{ name: "Innovate Hub" }],
  keywords: ["AI", "Data Science", "Machine Learning", "Philippines", "Batangas State University", "Education"],
  creator: "Innovate Hub",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/innovate-hub-logo.png" sizes="any" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
