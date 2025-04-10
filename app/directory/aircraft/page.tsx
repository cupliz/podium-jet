"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { getAircraftDirectory, type Aircraft } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, Info, Plane, Package, Ambulance, DollarSign, Shield } from "lucide-react"
import { MainLayout } from "@/components/main-layout"

export default function AircraftDirectoryPage() {
  const [aircraft, setAircraft] = useState<Aircraft[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [expandedAircraft, setExpandedAircraft] = useState<string | null>(null)

  useEffect(() => {
    const fetchAircraft = async () => {
      setLoading(true)
      try {
        const response = await getAircraftDirectory(currentPage, 10)
        setAircraft(response.data)
        setTotalPages(Math.ceil(response.total / response.limit))
      } catch (error) {
        console.error("Error fetching aircraft:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchAircraft()
  }, [currentPage])

  const filteredAircraft = aircraft.filter(
    (aircraft) =>
      aircraft.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      aircraft.operator.toLowerCase().includes(searchQuery.toLowerCase()) ||
      aircraft.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleAccordionChange = (aircraftId: string) => {
    setExpandedAircraft(expandedAircraft === aircraftId ? null : aircraftId)
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Aircraft Directory</h1>
            <p className="text-muted-foreground">Browse our extensive directory of private jets</p>
          </div>
          <div className="mt-4 sm:mt-0">
            <Button asChild>
              <Link href="/search">Search Flights</Link>
            </Button>
          </div>
        </div>
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search by model, operator, or category..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </Button>
            </div>
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : (
              <>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Model</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Pax</TableHead>
                        <TableHead>YOM</TableHead>
                        <TableHead>Operator</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredAircraft.map((aircraft) => (
                        <>
                          <TableRow
                            key={aircraft.id}
                            className="cursor-pointer"
                            onClick={() => handleAccordionChange(aircraft.id)}
                          >
                            <TableCell className="font-medium">{aircraft.model}</TableCell>
                            <TableCell>{aircraft.category}</TableCell>
                            <TableCell>{aircraft.pax}</TableCell>
                            <TableCell>{aircraft.yom}</TableCell>
                            <TableCell>{aircraft.operator}</TableCell>
                            <TableCell>${aircraft.price.toLocaleString()}</TableCell>
                            <TableCell className="text-right">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleAccordionChange(aircraft.id)
                                }}
                              >
                                {expandedAircraft === aircraft.id ? "Hide" : "View"}
                              </Button>
                            </TableCell>
                          </TableRow>
                          {expandedAircraft === aircraft.id && (
                            <TableRow>
                              <TableCell colSpan={7} className="p-0 border-t-0">
                                <div className="p-4 bg-muted/20">
                                  <Tabs defaultValue="aircraft">
                                    <TabsList className="mb-4">
                                      <TabsTrigger value="aircraft">Aircraft</TabsTrigger>
                                      <TabsTrigger value="amenities">Amenities</TabsTrigger>
                                      <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
                                      <TabsTrigger value="seller">Seller</TabsTrigger>
                                      <TabsTrigger value="price">Price Details</TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="aircraft" className="mt-0">
                                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="space-y-4">
                                          <h3 className="text-lg font-medium">Aircraft</h3>
                                          <div className="grid grid-cols-2 gap-2 text-sm">
                                            <div className="text-muted-foreground">Homebase:</div>
                                            <div>{aircraft.homebase || "N/A"}</div>
                                            <div className="text-muted-foreground">Reg. Nr.:</div>
                                            <div>{aircraft.regNumber || "N/A"}</div>
                                            <div className="text-muted-foreground">Category:</div>
                                            <div>{aircraft.category}</div>
                                            <div className="text-muted-foreground">Year of Make:</div>
                                            <div>{aircraft.yom}</div>
                                            <div className="text-muted-foreground">Refurbished:</div>
                                            <div>{aircraft.refurbished || "- / -"}</div>
                                          </div>
                                        </div>
                                        <div className="space-y-4">
                                          <h3 className="text-lg font-medium">Transport</h3>
                                          <div className="grid grid-cols-[24px_1fr] gap-x-3 gap-y-2 text-sm items-center">
                                            <Plane className="h-4 w-4" />
                                            <div>Max. {aircraft.pax} PAX</div>
                                            <Package className="h-4 w-4" />
                                            <div>Cargo {aircraft.cargo ? "available" : "not listed"}</div>
                                            <Ambulance className="h-4 w-4" />
                                            <div>Ambulance {aircraft.ambulance ? "available" : "not listed"}</div>
                                          </div>
                                        </div>
                                        <div className="space-y-4">
                                          <h3 className="text-lg font-medium">General</h3>
                                          <div className="grid grid-cols-[24px_1fr] gap-x-3 gap-y-2 text-sm items-center">
                                            <DollarSign className="h-4 w-4" />
                                            <div>
                                              {aircraft.price.toLocaleString()} USD
                                              <Link href="#" className="text-primary text-xs ml-2">
                                                Disclaimer
                                              </Link>
                                            </div>
                                            <Shield className="h-4 w-4" />
                                            <div>
                                              {aircraft.safety || "ARGUS Gold"}
                                              <Info className="h-3 w-3 inline-block ml-1 text-muted-foreground" />
                                            </div>
                                            <Info className="h-4 w-4" />
                                            <div>N/A</div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="md:col-span-2">
                                          <Image
                                            src="/placeholder.svg?height=200&width=400"
                                            alt="Cabin layout"
                                            width={400}
                                            height={200}
                                            className="border rounded-md"
                                          />
                                        </div>
                                        <div className="grid grid-cols-3 gap-2">
                                          <Image
                                            src="/placeholder.svg?height=60&width=80"
                                            alt="Aircraft thumbnail 1"
                                            width={80}
                                            height={60}
                                            className="border rounded-md"
                                          />
                                          <Image
                                            src="/placeholder.svg?height=60&width=80"
                                            alt="Aircraft thumbnail 2"
                                            width={80}
                                            height={60}
                                            className="border rounded-md"
                                          />
                                          <Image
                                            src="/placeholder.svg?height=60&width=80"
                                            alt="Aircraft thumbnail 3"
                                            width={80}
                                            height={60}
                                            className="border rounded-md"
                                          />
                                        </div>
                                      </div>
                                    </TabsContent>
                                    <TabsContent value="amenities" className="mt-0">
                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-4">
                                          <h3 className="text-lg font-medium">Cabin Amenities</h3>
                                          <ul className="list-disc list-inside space-y-1 text-sm">
                                            <li>Wi-Fi</li>
                                            <li>Entertainment System</li>
                                            <li>Fully Reclining Seats</li>
                                            <li>Galley</li>
                                            <li>Lavatory</li>
                                          </ul>
                                        </div>
                                        <div className="space-y-4">
                                          <h3 className="text-lg font-medium">Additional Services</h3>
                                          <ul className="list-disc list-inside space-y-1 text-sm">
                                            <li>Catering Available</li>
                                            <li>Flight Attendant</li>
                                            <li>Ground Transportation</li>
                                          </ul>
                                        </div>
                                      </div>
                                    </TabsContent>
                                    <TabsContent value="itinerary" className="mt-0">
                                      <p className="text-sm">Itinerary information not available for this aircraft.</p>
                                    </TabsContent>
                                    <TabsContent value="seller" className="mt-0">
                                      <div className="space-y-4">
                                        <h3 className="text-lg font-medium">Operator Information</h3>
                                        <div className="grid grid-cols-2 gap-2 text-sm">
                                          <div className="text-muted-foreground">Operator:</div>
                                          <div>{aircraft.operator}</div>
                                          <div className="text-muted-foreground">Contact:</div>
                                          <div>info@example.com</div>
                                          <div className="text-muted-foreground">Phone:</div>
                                          <div>+1 (555) 123-4567</div>
                                        </div>
                                      </div>
                                    </TabsContent>
                                    <TabsContent value="price" className="mt-0">
                                      <div className="space-y-4">
                                        <h3 className="text-lg font-medium">Price Breakdown</h3>
                                        <div className="grid grid-cols-2 gap-2 text-sm">
                                          <div className="text-muted-foreground">Base Price:</div>
                                          <div>${(aircraft.price * 0.85).toLocaleString()} USD</div>
                                          <div className="text-muted-foreground">Taxes & Fees:</div>
                                          <div>${(aircraft.price * 0.15).toLocaleString()} USD</div>
                                          <div className="text-muted-foreground font-medium">Total:</div>
                                          <div className="font-medium">${aircraft.price.toLocaleString()} USD</div>
                                        </div>
                                      </div>
                                    </TabsContent>
                                  </Tabs>
                                  <div className="mt-4 flex justify-end">
                                    <Button asChild size="sm">
                                      <Link href={`/request?aircraft=${aircraft.id}`}>Request Quote</Link>
                                    </Button>
                                  </div>
                                </div>
                              </TableCell>
                            </TableRow>
                          )}
                        </>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <Pagination className="mt-4">
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                      />
                    </PaginationItem>
                    {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                      const page = i + 1
                      return (
                        <PaginationItem key={page}>
                          <PaginationLink onClick={() => setCurrentPage(page)} isActive={currentPage === page}>
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      )
                    })}
                    {totalPages > 5 && (
                      <>
                        <PaginationItem>
                          <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink
                            onClick={() => setCurrentPage(totalPages)}
                            isActive={currentPage === totalPages}
                          >
                            {totalPages}
                          </PaginationLink>
                        </PaginationItem>
                      </>
                    )}
                    <PaginationItem>
                      <PaginationNext
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}
