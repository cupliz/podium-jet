export function TestimonialsSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container max-w-6xl mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">What Our Customers Say</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
              Hear from satisfied customers who have used our platform to book private jet charters.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col justify-between space-y-4 rounded-lg border p-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                "The platform made it incredibly easy to find and book a private jet for our business trip. The
                comparison feature saved us time and money."
              </p>
            </div>
            <div>
              <div className="font-semibold">Sarah Johnson</div>
              <div className="text-sm text-muted-foreground">CEO, TechStart Inc.</div>
            </div>
          </div>
          <div className="flex flex-col justify-between space-y-4 rounded-lg border p-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                "I was impressed by the range of aircraft available and the detailed information provided. It helped me
                make an informed decision."
              </p>
            </div>
            <div>
              <div className="font-semibold">Michael Chen</div>
              <div className="text-sm text-muted-foreground">Frequent Traveler</div>
            </div>
          </div>
          <div className="flex flex-col justify-between space-y-4 rounded-lg border p-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                "The customer service was exceptional. They helped me find the perfect jet for my family vacation and
                handled all the details."
              </p>
            </div>
            <div>
              <div className="font-semibold">Emily Rodriguez</div>
              <div className="text-sm text-muted-foreground">Family Traveler</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
