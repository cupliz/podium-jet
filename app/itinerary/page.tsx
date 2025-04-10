"use client"

import { useState, useEffect } from "react"
import { MainLayout } from "@/components/main-layout"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getUserItineraries } from "@/lib/api"

export default function ItineraryPage() {
  const [itineraries, setItineraries] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchItineraries = async () => {
      setLoading(true)
      try {
        const data = await getUserItineraries()
        setItineraries(data)
      } catch (error) {
        console.error("Error fetching itineraries:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchItineraries()
  }, [])

  const acceptedItineraries = itineraries.filter((item) => item.status === "accepted")
  const pendingItineraries = itineraries.filter((item) => item.status === "pending")
  const declinedItineraries = itineraries.filter((item) => item.status === "declined")

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Your Itineraries</h1>
          <p className="text-muted-foreground">View and manage your charter requests</p>
        </div>

        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="accepted">Accepted</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="declined">Declined</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              {itineraries.length > 0 ? (
                itineraries.map((item) => <ItineraryCard key={item.id} itinerary={item} />)
              ) : (
                <EmptyState />
              )}
            </TabsContent>

            <TabsContent value="accepted" className="space-y-4">
              {acceptedItineraries.length > 0 ? (
                acceptedItineraries.map((item) => <ItineraryCard key={item.id} itinerary={item} />)
              ) : (
                <EmptyState type="accepted" />
              )}
            </TabsContent>

            <TabsContent value="pending" className="space-y-4">
              {pendingItineraries.length > 0 ? (
                pendingItineraries.map((item) => <ItineraryCard key={item.id} itinerary={item} />)
              ) : (
                <EmptyState type="pending" />
              )}
            </TabsContent>

            <TabsContent value="declined" className="space-y-4">
              {declinedItineraries.length > 0 ? (
                declinedItineraries.map((item) => <ItineraryCard key={item.id} itinerary={item} />)
              ) : (
                <EmptyState type="declined" />
              )}
            </TabsContent>
          </Tabs>
        )}
      </div>
    </MainLayout>
  )
}

function ItineraryCard({ itinerary }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>
              {itinerary.from} to {itinerary.to}
            </CardTitle>
            <CardDescription>
              {new Date(itinerary.date).toLocaleDateString()} • {itinerary.aircraft.model}
            </CardDescription>
          </div>
          <StatusBadge status={itinerary.status} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2 text-sm">
          <div className="grid grid-cols-2 gap-2">
            <div className="text-muted-foreground">Aircraft:</div>
            <div>{itinerary.aircraft.model}</div>
            <div className="text-muted-foreground">Operator:</div>
            <div>{itinerary.aircraft.operator}</div>
            <div className="text-muted-foreground">Price:</div>
            <div>${itinerary.price.toLocaleString()}</div>
          </div>

          {itinerary.message && (
            <div className="mt-4">
              <div className="font-medium mb-1">Message:</div>
              <div className="text-muted-foreground">{itinerary.message}</div>
            </div>
          )}

          {itinerary.response && (
            <div className="mt-4">
              <div className="font-medium mb-1">Response:</div>
              <div className="text-muted-foreground">{itinerary.response}</div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        {itinerary.status === "accepted" && <Button>View Details</Button>}
        {itinerary.status === "pending" && <Button variant="outline">Cancel Request</Button>}
      </CardFooter>
    </Card>
  )
}

function StatusBadge({ status }) {
  const variants = {
    accepted: "success",
    pending: "warning",
    declined: "destructive",
  }

  const labels = {
    accepted: "Accepted",
    pending: "Pending",
    declined: "Declined",
  }

  return <Badge variant={variants[status]}>{labels[status]}</Badge>
}

function EmptyState({ type = "all" }) {
  const messages = {
    all: "You don't have any itineraries yet",
    accepted: "You don't have any accepted requests",
    pending: "You don't have any pending requests",
    declined: "You don't have any declined requests",
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">{messages[type]}</CardTitle>
      </CardHeader>
      <CardContent className="text-center text-muted-foreground">
        {type === "all" && "Search for aircraft and submit a request to get started"}
      </CardContent>
      <CardFooter className="justify-center">
        <Button asChild>
          <a href="/search">Search Aircraft</a>
        </Button>
      </CardFooter>
    </Card>
  )
}
