"use client"

import { useState } from "react"
import Link from "next/link"
import type { Aircraft } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Check, ChevronDown, ChevronUp, Calendar, Clock } from "lucide-react"

interface SearchResultsProps {
  results: Aircraft[] | any
  loading: boolean
  tripType?: string
}

export function SearchResults({ results, loading, tripType = "one-way" }: SearchResultsProps) {
  const [selectedAircraft, setSelectedAircraft] = useState<string[]>([])
  const [expandedAircraft, setExpandedAircraft] = useState<string | null>(null)

  // Ensure results is an array
  const aircraftResults = Array.isArray(results) ? results : results && results.data ? results.data : []

  const toggleAircraftSelection = (id: string) => {
    if (selectedAircraft.includes(id)) {
      setSelectedAircraft(selectedAircraft.filter((aircraftId) => aircraftId !== id))
    } else {
      setSelectedAircraft([...selectedAircraft, id])
    }
  }

  const toggleAircraftDetails = (id: string) => {
    if (expandedAircraft === id) {
      setExpandedAircraft(null)
    } else {
      setExpandedAircraft(id)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (aircraftResults.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <h3 className="text-xl font-medium mb-2">No aircraft found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your search criteria or filters to see more results.
          </p>
          <Button asChild>
            <Link href="/directory/aircraft">Browse All Aircraft</Link>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Search Results</h2>
          <p className="text-muted-foreground">Found {aircraftResults.length} aircraft matching your criteria</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => setSelectedAircraft([])} disabled={selectedAircraft.length === 0}>
            Clear Selection
          </Button>
          <Button asChild disabled={selectedAircraft.length === 0}>
            <Link href={`/request?aircraft=${selectedAircraft.join(",")}&tripType=${tripType}`}>
              Request Quote ({selectedAircraft.length})
            </Link>
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {aircraftResults.map((aircraft: Aircraft) => (
          <Card key={aircraft.id} className={selectedAircraft.includes(aircraft.id) ? "border-primary" : ""}>
            <CardHeader className="pb-2">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <CardTitle>{aircraft.model}</CardTitle>
                  <CardDescription>
                    {aircraft.category} • {aircraft.operator}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{aircraft.yom}</Badge>
                  <Badge variant="outline">{aircraft.pax} Pax</Badge>
                  <Badge variant={aircraft.pos === "Available" ? "default" : "secondary"}>{aircraft.pos}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="grid gap-6 md:grid-cols-3">
                <div className="md:col-span-1">
                  <div className="aspect-video overflow-hidden rounded-md">
                    <img
                      src={aircraft.gallery[0] || "/placeholder.svg?height=400&width=600"}
                      alt={aircraft.model}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.svg?height=400&width=600"
                      }}
                    />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">Home Base</div>
                      <div className="font-medium">{aircraft.homebase}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">Safety Rating</div>
                      <div className="font-medium">{aircraft.safety}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">Time on Type</div>
                      <div className="font-medium">{aircraft.tot}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">Cargo Capacity</div>
                      <div className="font-medium">{aircraft.cargo}</div>
                    </div>
                  </div>
                  <Separator className="my-4" />
                  <div className="flex flex-wrap gap-2">
                    {aircraft.amenities.slice(0, 3).map((amenity, index) => (
                      <Badge key={index} variant="outline" className="flex items-center gap-1">
                        <Check className="h-3 w-3" />
                        {amenity}
                      </Badge>
                    ))}
                    {aircraft.amenities.length > 3 && (
                      <Badge variant="outline">+{aircraft.amenities.length - 3} more</Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4">
              <div className="text-2xl font-bold">${aircraft.price.toLocaleString()}</div>
              {aircraft.time && (
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>Departure: {aircraft.time}</span>
                </div>
              )}
              <div className="flex gap-2 w-full sm:w-auto">
                <Button
                  variant="outline"
                  className="flex-1 sm:flex-initial"
                  onClick={() => toggleAircraftDetails(aircraft.id)}
                >
                  {expandedAircraft === aircraft.id ? (
                    <>
                      Hide Details <ChevronUp className="ml-2 h-4 w-4" />
                    </>
                  ) : (
                    <>
                      View Details <ChevronDown className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
                <Button
                  className="flex-1 sm:flex-initial"
                  variant={selectedAircraft.includes(aircraft.id) ? "secondary" : "default"}
                  onClick={() => toggleAircraftSelection(aircraft.id)}
                >
                  {selectedAircraft.includes(aircraft.id) ? "Selected" : "Select"}
                </Button>
              </div>
            </CardFooter>

            {/* Accordion for detailed aircraft information */}
            {expandedAircraft === aircraft.id && (
              <div className="px-6 pb-6">
                <Separator className="mb-4" />
                <div className="space-y-6">
                  {/* Aircraft Details */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Aircraft Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <div className="text-sm text-muted-foreground">Registration</div>
                        <div className="font-medium">{aircraft.registration}</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm text-muted-foreground">Model</div>
                        <div className="font-medium">{aircraft.model}</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm text-muted-foreground">Category</div>
                        <div className="font-medium">{aircraft.category}</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm text-muted-foreground">Year of Manufacture</div>
                        <div className="font-medium">{aircraft.yom}</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm text-muted-foreground">Passenger Capacity</div>
                        <div className="font-medium">{aircraft.pax}</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm text-muted-foreground">Ambulance Capability</div>
                        <div className="font-medium">{aircraft.ambulance ? "Yes" : "No"}</div>
                      </div>
                    </div>
                  </div>

                  {/* Operator Information */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Operator Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <div className="text-sm text-muted-foreground">Operator</div>
                        <div className="font-medium">{aircraft.operator}</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm text-muted-foreground">Home Base</div>
                        <div className="font-medium">{aircraft.homebase}</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm text-muted-foreground">Safety Rating</div>
                        <div className="font-medium">{aircraft.safety}</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm text-muted-foreground">Insurance</div>
                        <div className="font-medium">
                          {aircraft.insurance ? `${aircraft.insurance}%` : "Not specified"}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Amenities */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Amenities & Features</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {aircraft.amenities.map((amenity, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary" />
                          <span>{amenity}</span>
                        </div>
                      ))}
                      {aircraft.refurbished && (
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-primary" />
                          <span>Refurbished {aircraft.refurbished}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Gallery */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Gallery</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {aircraft.gallery.map((image, index) => (
                        <div key={index} className="aspect-video overflow-hidden rounded-md">
                          <img
                            src={image || "/placeholder.svg"}
                            alt={`${aircraft.model} - Image ${index + 1}`}
                            className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                              e.currentTarget.src = "/placeholder.svg"
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Call to Action */}
                  <div className="flex justify-end mt-6">
                    <Button
                      onClick={() => {
                        if (!selectedAircraft.includes(aircraft.id)) {
                          toggleAircraftSelection(aircraft.id)
                        }
                      }}
                      className="mr-2"
                    >
                      {selectedAircraft.includes(aircraft.id) ? "Already Selected" : "Select This Aircraft"}
                    </Button>
                    <Button variant="outline" onClick={() => toggleAircraftDetails(aircraft.id)}>
                      Close Details
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}
