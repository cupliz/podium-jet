import type React from "react"
import { SiteHeader } from "@/components/site-header"

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 container max-w-[1400px] mx-auto py-6 md:py-10">{children}</main>
    </div>
  )
}
