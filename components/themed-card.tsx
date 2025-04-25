"use client"

import type React from "react"

import { Card as ShadcnCard } from "@/components/ui/card"
import type { ThemeColors } from "@/lib/themes"
import { type HTMLAttributes, forwardRef } from "react"

interface ThemedCardProps extends HTMLAttributes<HTMLDivElement> {
  theme?: ThemeColors
  children: React.ReactNode
}

const ThemedCard = forwardRef<HTMLDivElement, ThemedCardProps>(({ theme, className = "", children, ...props }, ref) => {
  // Use default theme if not provided
  const { cardBg = "bg-slate-800/50", cardBorder = "border-slate-700" } = theme || {}

  const cardClasses = `${cardBg} ${cardBorder} ${className}`

  return (
    <ShadcnCard ref={ref} className={cardClasses} {...props}>
      {children}
    </ShadcnCard>
  )
})

ThemedCard.displayName = "ThemedCard"

export default ThemedCard
