import Link from "next/link"
import { Plane } from "lucide-react"

export function MainNav() {
  return (
    <div className="flex items-center">
      <Link href="/" className="flex items-center space-x-2">
        <Plane className="h-6 w-6" />
        <span className="inline-block font-bold">Podium Jet</span>
      </Link>
    </div>
  )
}
