import type React from "react"
export default function EmbedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="embed-container">{children}</div>
}

export const metadata = {
  title: "AI in Data Science | Embedded Module",
  description: "Interactive AI in Data Science module for embedding",
}
