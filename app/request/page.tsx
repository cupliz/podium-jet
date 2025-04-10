"use client"

import { useState, useEffect, useRef } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { getAircraftDetails } from "@/lib/api"
import { MainLayout } from "@/components/main-layout"

export default function RequestPage() {
  const searchParams = useSearchParams()
  const aircraftIdsParam = searchParams.get("aircraft")
  const aircraftIds = aircraftIdsParam ? aircraftIdsParam.split(",") : []

  const [selectedAircraft, setSelectedAircraft] = useState([])
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const isMountedRef = useRef(true)

  useEffect(() => {
    isMountedRef.current = true

    const fetchAircraftDetails = async () => {
      if (!aircraftIdsParam) {
        if (isMountedRef.current) setLoading(false)
        return
      }

      try {
        const aircraftDetails = await getAircraftDetails(aircraftIds)
        if (isMountedRef.current) setSelectedAircraft(aircraftDetails)
      } catch (error) {
        console.error("Error fetching aircraft details:", error)
      } finally {
        if (isMountedRef.current) setLoading(false)
      }
    }

    fetchAircraftDetails()

    return () => {
      isMountedRef.current = false
    }
  }, [aircraftIdsParam])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      // Submit request logic would go here
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API call
      alert("Your request has been submitted successfully!")
      setMessage("")
    } catch (error) {
      console.error("Error submitting request:", error)
      alert("There was an error submitting your request. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Request Quote</h1>
          <p className="text-muted-foreground">Submit your charter request for the selected aircraft</p>
        </div>

        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="grid gap-6">
            {selectedAircraft.length > 0 ? (
              <>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {selectedAircraft.map((aircraft) => (
                    <Card key={aircraft.id}>
                      <CardHeader>
                        <CardTitle>{aircraft.model}</CardTitle>
                        <CardDescription>Operated by {aircraft.operator}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="text-muted-foreground">Category:</div>
                          <div>{aircraft.category}</div>
                          <div className="text-muted-foreground">Passengers:</div>
                          <div>{aircraft.pax}</div>
                          <div className="text-muted-foreground">Year:</div>
                          <div>{aircraft.yom}</div>
                          <div className="text-muted-foreground">Price:</div>
                          <div>${aircraft.price.toLocaleString()}</div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Your Message</CardTitle>
                    <CardDescription>Please provide any additional details about your charter request</CardDescription>
                  </CardHeader>
                  <form onSubmit={handleSubmit}>
                    <CardContent>
                      <Textarea
                        placeholder="Enter your message here..."
                        className="min-h-[150px]"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                      />
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" type="button" onClick={() => window.history.back()}>
                        Back
                      </Button>
                      <Button type="submit" disabled={submitting}>
                        {submitting ? "Submitting..." : "Submit Request"}
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              </>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>No Aircraft Selected</CardTitle>
                  <CardDescription>
                    Please select an aircraft from the search results or directory to request a quote
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button asChild>
                    <a href="/search">Search Aircraft</a>
                  </Button>
                </CardFooter>
              </Card>
            )}
          </div>
        )}
      </div>
    </MainLayout>
  )
}
