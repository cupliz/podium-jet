import Link from "next/link"
import { Plane } from "lucide-react"

export function Footer() {
  return (
    <footer className="w-full border-t py-6">
      <div className="container max-w-6xl mx-auto flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex items-center gap-2">
          <Plane className="h-6 w-6" />
          <span className="text-lg font-bold">PodiumJet</span>
        </div>
        <nav className="flex gap-4 sm:gap-6">
          <Link href="/about" className="text-sm text-muted-foreground hover:underline underline-offset-4">
            About
          </Link>
          <Link href="/contact" className="text-sm text-muted-foreground hover:underline underline-offset-4">
            Contact
          </Link>
          <Link href="/privacy" className="text-sm text-muted-foreground hover:underline underline-offset-4">
            Privacy
          </Link>
          <Link href="/terms" className="text-sm text-muted-foreground hover:underline underline-offset-4">
            Terms
          </Link>
        </nav>
        <div className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} PodiumJet. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
