import { Plane, MapPin, Search, Filter, Send, Clock } from "lucide-react"

export function FeaturesSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
      <div className="container max-w-6xl mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Everything You Need for Private Jet Charter
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
              Our platform provides comprehensive tools to find, compare, and book private jet charters with confidence.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-4">
            <div className="rounded-full bg-primary/10 p-2">
              <Plane className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Aircraft Directory</h3>
            <p className="text-center text-muted-foreground">
              Browse our extensive directory of private jets with detailed specifications.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-4">
            <div className="rounded-full bg-primary/10 p-2">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Airport Directory</h3>
            <p className="text-center text-muted-foreground">
              Find information on airports worldwide, including facilities and services.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-4">
            <div className="rounded-full bg-primary/10 p-2">
              <Search className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Advanced Search</h3>
            <p className="text-center text-muted-foreground">
              Search for flights by route, date, passengers, and aircraft type.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-4">
            <div className="rounded-full bg-primary/10 p-2">
              <Filter className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Powerful Filters</h3>
            <p className="text-center text-muted-foreground">
              Filter results by aircraft category, year, amenities, and more.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-4">
            <div className="rounded-full bg-primary/10 p-2">
              <Send className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Quote Requests</h3>
            <p className="text-center text-muted-foreground">
              Send quote requests directly to operators and receive responses quickly.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-4">
            <div className="rounded-full bg-primary/10 p-2">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Itinerary Tracking</h3>
            <p className="text-center text-muted-foreground">
              Track your requests and manage your flight itineraries in one place.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
