"use client"

import { usePathname } from "next/navigation"
import NavigationBar from "@/components/navigation-bar"

export default function ConditionalHeader() {
  const pathname = usePathname()
  const isEmbedRoute = pathname.startsWith("/embed") || pathname.startsWith("/showcase")

  if (isEmbedRoute) {
    return null
  }

  return <NavigationBar />
}
