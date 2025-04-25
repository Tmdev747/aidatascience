export type ThemeColors = {
  background: string
  text: string
  textMuted: string
  primary: string
  primaryHover: string
  secondary: string
  accent: string
  cardBg: string
  cardBorder: string
  buttonText: string
}

export const themes: Record<string, ThemeColors> = {
  default: {
    background: "from-slate-900 via-slate-800 to-slate-900",
    text: "text-white",
    textMuted: "text-white/80",
    primary: "bg-blue-600",
    primaryHover: "hover:bg-blue-700",
    secondary: "bg-slate-800/50",
    accent: "text-blue-400",
    cardBg: "bg-slate-800/50",
    cardBorder: "border-slate-700",
    buttonText: "text-white",
  },

  replitLight: {
    background: "from-[#F5F9FC] via-[#E4EBF1] to-[#F5F9FC]",
    text: "text-[#0E1525]",
    textMuted: "text-[#0E1525]/70",
    primary: "bg-[#3485FF]",
    primaryHover: "hover:bg-[#2D7DE4]",
    secondary: "bg-white/80",
    accent: "text-[#3485FF]",
    cardBg: "bg-white/80",
    cardBorder: "border-[#D1D9E4]",
    buttonText: "text-white",
  },

  replitDark: {
    background: "from-[#0E1525] via-[#1C2333] to-[#0E1525]",
    text: "text-[#F5F9FC]",
    textMuted: "text-[#F5F9FC]/80",
    primary: "bg-[#3485FF]",
    primaryHover: "hover:bg-[#2D7DE4]",
    secondary: "bg-[#1C2333]/50",
    accent: "text-[#3485FF]",
    cardBg: "bg-[#1C2333]/50",
    cardBorder: "border-[#2B3245]",
    buttonText: "text-white",
  },
}
