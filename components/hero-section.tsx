import Link from "next/link"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="container max-w-6xl mx-auto px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Private Jet Charter Made Simple
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Request quotes for private jet charters with ease. Compare prices, aircraft, and operators to find the
                perfect flight for your needs.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/search">
                <Button size="lg">Search Flights</Button>
              </Link>
              <Link href="/directory/aircraft">
                <Button variant="outline" size="lg">
                  Browse Aircraft
                </Button>
              </Link>
            </div>
          </div>
          <div className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last">
            <img
              src="/placeholder.svg?height=550&width=550"
              alt="Private jet on runway"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
