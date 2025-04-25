import { type ThemeColors, themes } from "./themes"

/**
 * Gets a theme by name or returns the default theme
 */
export function getTheme(themeName: string): ThemeColors {
  return themes[themeName] || themes.replitLight
}

/**
 * Creates a custom theme from URL parameters
 */
export function createCustomTheme(
  baseTheme: string,
  bgColor?: string,
  textColor?: string,
  primaryColor?: string,
): ThemeColors {
  const base = getTheme(baseTheme)

  return {
    ...base,
    background: bgColor ? `from-[${bgColor}] to-[${bgColor}]` : base.background,
    text: textColor ? `text-[${textColor}]` : base.text,
    primary: primaryColor ? `bg-[${primaryColor}]` : base.primary,
    primaryHover: primaryColor ? `hover:bg-[${primaryColor}]/90` : base.primaryHover,
  }
}

/**
 * Generates CSS variables for a theme
 */
export function generateCssVariables(theme: ThemeColors): Record<string, string> {
  // Extract color values from Tailwind classes
  const extractColor = (className: string) => {
    // This is a simplified extraction - in a real app you'd need more robust parsing
    const match = className.match(/\[(#[0-9A-Fa-f]+)\]/)
    return match ? match[1] : null
  }

  return {
    "--embed-bg-color": extractColor(theme.background) || "#0f172a",
    "--embed-text-color": extractColor(theme.text) || "#ffffff",
    "--embed-primary-color": extractColor(theme.primary) || "#3b82f6",
    "--embed-card-bg": extractColor(theme.cardBg) || "#1e293b",
    "--embed-card-border": extractColor(theme.cardBorder) || "#334155",
  }
}
