"use client"

import { Button as ShadcnButton } from "@/components/ui/button"
import type { ThemeColors } from "@/lib/themes"
import { type ButtonHTMLAttributes, forwardRef } from "react"

interface ThemedButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  theme?: ThemeColors
  variant?: "default" | "outline" | "secondary"
}

const ThemedButton = forwardRef<HTMLButtonElement, ThemedButtonProps>(
  ({ theme, variant = "default", className = "", children, ...props }, ref) => {
    // Use default theme if not provided
    const { primary = "bg-blue-600", primaryHover = "hover:bg-blue-700", buttonText = "text-white" } = theme || {}

    let buttonClasses = className

    if (variant === "default") {
      buttonClasses = `${primary} ${primaryHover} ${buttonText} ${className}`
    }

    return (
      <ShadcnButton ref={ref} variant={variant} className={buttonClasses} {...props}>
        {children}
      </ShadcnButton>
    )
  },
)

ThemedButton.displayName = "ThemedButton"

export default ThemedButton
