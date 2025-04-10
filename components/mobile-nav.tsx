"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { useAuth } from "@/lib/auth-provider"
import { Separator } from "@/components/ui/separator"

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { user } = useAuth()
  const isAdmin = user?.role === "admin"

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="overflow-y-auto">
        <div className="grid gap-6 py-6">
          <div className="grid gap-3">
            <Link
              href="/dashboard"
              className={`text-sm font-medium ${pathname === "/dashboard" ? "text-primary" : ""}`}
              onClick={() => setOpen(false)}
            >
              Dashboard
            </Link>

            <Separator className="my-1" />
            <p className="text-sm font-semibold mb-1">Directory</p>
            <Link
              href="/directory/aircraft"
              className={`text-sm font-medium pl-2 ${pathname === "/directory/aircraft" ? "text-primary" : ""}`}
              onClick={() => setOpen(false)}
            >
              Aircraft
            </Link>
            <Link
              href="/directory/airports"
              className={`text-sm font-medium pl-2 ${pathname === "/directory/airports" ? "text-primary" : ""}`}
              onClick={() => setOpen(false)}
            >
              Airports
            </Link>

            <Separator className="my-1" />
            <Link
              href="/search"
              className={`text-sm font-medium ${pathname === "/search" ? "text-primary" : ""}`}
              onClick={() => setOpen(false)}
            >
              Search
            </Link>
            <Link
              href="/itinerary"
              className={`text-sm font-medium ${pathname === "/itinerary" ? "text-primary" : ""}`}
              onClick={() => setOpen(false)}
            >
              My Itinerary
            </Link>

            {isAdmin && (
              <>
                <Separator className="my-1" />
                <p className="text-sm font-semibold mb-1">Admin</p>
                <Link
                  href="/admin/requests"
                  className={`text-sm font-medium pl-2 ${pathname === "/admin/requests" ? "text-primary" : ""}`}
                  onClick={() => setOpen(false)}
                >
                  Requests
                </Link>
                <Link
                  href="/admin/dashboard"
                  className={`text-sm font-medium pl-2 ${pathname === "/admin/dashboard" ? "text-primary" : ""}`}
                  onClick={() => setOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  href="/admin/users"
                  className={`text-sm font-medium pl-2 ${pathname === "/admin/users" ? "text-primary" : ""}`}
                  onClick={() => setOpen(false)}
                >
                  Users
                </Link>
              </>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
