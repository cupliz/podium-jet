"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { getAircraftDetails, type Aircraft } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Check, Calendar, MapPin, Users, Package, Ambulance, Shield, Wifi, Coffee } from "lucide-react"
import Link from "next/link"

export default function AircraftDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const [aircraft, setAircraft] = useState<Aircraft | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAircraftDetails = async () => {
      setLoading(true)
      try {
        const data = await getAircraftDetails(id as string)
        setAircraft(data)
      } catch (error) {
        console.error("Error fetching aircraft details:", error)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchAircraftDetails()
    }
  }, [id])

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!aircraft) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h2 className="text-2xl font-bold">Aircraft not found</h2>
        <p className="text-muted-foreground mb-4">The aircraft you are looking for does not exist.</p>
        <Button asChild>
          <Link href="/directory/aircraft">Back to Directory</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{aircraft.model}</h1>
            <p className="text-muted-foreground">
              {aircraft.category} • Registration: {aircraft.registration}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link href={`/search?aircraft=${aircraft.id}`}>Search Availability</Link>
          </Button>
          <Button asChild>
            <Link href={`/request?aircraft=${aircraft.id}`}>Request Quote</Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-0">
              <div className="aspect-video overflow-hidden rounded-t-lg">
                <img
                  src={aircraft.gallery[0] || "/placeholder.svg?height=600&width=800"}
                  alt={aircraft.model}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-2 p-2">
                {aircraft.gallery.slice(1, 5).map((image, index) => (
                  <div key={index} className="aspect-video overflow-hidden rounded-md">
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`${aircraft.model} - ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="details" className="space-y-4">
            <TabsList>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="amenities">Amenities</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="space-y-4">
              <Card>
                <CardContent className="p-6">
                  <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                    <div className="flex flex-col gap-1">
                      <span className="text-sm text-muted-foreground">Operator</span>
                      <span className="font-medium">{aircraft.operator}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-sm text-muted-foreground">Category</span>
                      <span className="font-medium">{aircraft.category}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-sm text-muted-foreground">Year of Manufacture</span>
                      <span className="font-medium">{aircraft.yom}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-sm text-muted-foreground">Passenger Capacity</span>
                      <span className="font-medium">{aircraft.pax} passengers</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-sm text-muted-foreground">Home Base</span>
                      <span className="font-medium">{aircraft.homebase}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-sm text-muted-foreground">Position</span>
                      <span className="font-medium">{aircraft.pos}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-sm text-muted-foreground">Time on Type</span>
                      <span className="font-medium">{aircraft.tot}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-sm text-muted-foreground">Cargo Capacity</span>
                      <span className="font-medium">{aircraft.cargo}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-sm text-muted-foreground">Safety Rating</span>
                      <span className="font-medium">{aircraft.safety}</span>
                    </div>
                    {aircraft.refurbished && (
                      <div className="flex flex-col gap-1">
                        <span className="text-sm text-muted-foreground">Refurbished</span>
                        <span className="font-medium">{aircraft.refurbished}</span>
                      </div>
                    )}
                    {aircraft.insurance && (
                      <div className="flex flex-col gap-1">
                        <span className="text-sm text-muted-foreground">Insurance</span>
                        <span className="font-medium">${aircraft.insurance}M</span>
                      </div>
                    )}
                    <div className="flex flex-col gap-1">
                      <span className="text-sm text-muted-foreground">Ambulance Capability</span>
                      <span className="font-medium">{aircraft.ambulance ? "Yes" : "No"}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="specifications" className="space-y-4">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium">Performance</h3>
                      <Separator className="my-2" />
                      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                        <div className="flex flex-col gap-1">
                          <span className="text-sm text-muted-foreground">Max Range</span>
                          <span className="font-medium">3,600 nm</span>
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="text-sm text-muted-foreground">Cruise Speed</span>
                          <span className="font-medium">470 kts</span>
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="text-sm text-muted-foreground">Max Altitude</span>
                          <span className="font-medium">45,000 ft</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">Dimensions</h3>
                      <Separator className="my-2" />
                      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                        <div className="flex flex-col gap-1">
                          <span className="text-sm text-muted-foreground">Cabin Length</span>
                          <span className="font-medium">25.3 ft</span>
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="text-sm text-muted-foreground">Cabin Width</span>
                          <span className="font-medium">7.2 ft</span>
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="text-sm text-muted-foreground">Cabin Height</span>
                          <span className="font-medium">6.1 ft</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">Engine</h3>
                      <Separator className="my-2" />
                      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                        <div className="flex flex-col gap-1">
                          <span className="text-sm text-muted-foreground">Engine Type</span>
                          <span className="font-medium">Rolls-Royce BR710</span>
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="text-sm text-muted-foreground">Number of Engines</span>
                          <span className="font-medium">2</span>
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="text-sm text-muted-foreground">Thrust</span>
                          <span className="font-medium">15,400 lbf each</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="amenities" className="space-y-4">
              <Card>
                <CardContent className="p-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Cabin Amenities</h3>
                      <ul className="space-y-2">
                        {aircraft.amenities.map((amenity, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-primary" />
                            <span>{amenity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-4">Entertainment</h3>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary" />
                          <span>High-speed Wi-Fi</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary" />
                          <span>Satellite Phone</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary" />
                          <span>Entertainment System</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-4">Estimated Price</h3>
              <div className="text-3xl font-bold mb-2">${aircraft.price.toLocaleString()}</div>
              <p className="text-sm text-muted-foreground mb-4">Per flight hour</p>
              <Button className="w-full" asChild>
                <Link href={`/request?aircraft=${aircraft.id}`}>Request Quote</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-4">Key Features</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-primary/10 p-2">
                    <MapPin className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">Home Base</div>
                    <div className="text-sm text-muted-foreground">{aircraft.homebase}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Users className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">Passenger Capacity</div>
                    <div className="text-sm text-muted-foreground">{aircraft.pax} passengers</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Package className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">Cargo Capacity</div>
                    <div className="text-sm text-muted-foreground">{aircraft.cargo}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Calendar className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">Year of Manufacture</div>
                    <div className="text-sm text-muted-foreground">{aircraft.yom}</div>
                  </div>
                </div>
                {aircraft.ambulance && (
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-primary/10 p-2">
                      <Ambulance className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">Ambulance Capability</div>
                      <div className="text-sm text-muted-foreground">Medical transport ready</div>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Shield className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">Safety Rating</div>
                    <div className="text-sm text-muted-foreground">{aircraft.safety}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-4">Popular Amenities</h3>
              <div className="flex flex-wrap gap-2">
                {aircraft.amenities.map((amenity, index) => (
                  <Badge key={index} variant="outline" className="flex items-center gap-1">
                    {amenity.includes("Wi-Fi") && <Wifi className="h-3 w-3" />}
                    {amenity.includes("Galley") && <Coffee className="h-3 w-3" />}
                    {amenity}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
