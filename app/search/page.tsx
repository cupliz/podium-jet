"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { MainLayout } from "@/components/main-layout"
import { SearchResults } from "@/components/search-results"
import { SearchSidebar } from "@/components/search-sidebar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { searchAircraft, type FilterParams } from "@/lib/api"
import { X, Plus, Minus } from "lucide-react"

export default function SearchPage() {
  const [searchParams, setSearchParams] = useState({
    from: "",
    to: "",
    date: undefined as Date | undefined,
    returnDate: undefined as Date | undefined,
    returnTime: "17:00",
    passengers: "1",
    category: "any",
    time: "09:00",
  })
  const [filters, setFilters] = useState<FilterParams>({
    categories: [],
    minYom: 2000,
    models: [],
    ambulance: false,
    amenities: [],
    minRefurbished: 2015,
    minInsurance: 0,
  })
  const [searchResults, setSearchResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [tripType, setTripType] = useState("one-way")

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      // Convert the form data to the format expected by the API
      const apiSearchParams = {
        from: searchParams.from,
        to: searchParams.to,
        date: searchParams.date ? format(searchParams.date, "yyyy-MM-dd") : "",
        time: searchParams.time,
        pax: Number.parseInt(searchParams.passengers, 10),
        category: searchParams.category,
        returnDate: searchParams.returnDate ? format(searchParams.returnDate, "yyyy-MM-dd") : undefined,
        returnTime: searchParams.returnTime,
      }

      const results = await searchAircraft(apiSearchParams, filters)
      // Make sure we're setting the data array, not the whole response object
      setSearchResults(results?.data || [])
      setHasSearched(true)
    } catch (error) {
      console.error("Error searching aircraft:", error)
      // Set empty results array on error
      setSearchResults([])
      setHasSearched(true)
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (newFilters: Partial<FilterParams>) => {
    setFilters((prev) => {
      // Only update if there are actual changes
      const updatedFilters = { ...prev, ...newFilters }
      // Check if filters have actually changed before triggering a search
      if (JSON.stringify(updatedFilters) !== JSON.stringify(prev)) {
        return updatedFilters
      }
      return prev
    })
  }

  useEffect(() => {
    if (hasSearched) {
      handleSearch({ preventDefault: () => {} } as React.FormEvent)
    }
  }, [filters])

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Search Flights</h1>
          <p className="text-muted-foreground">Find the perfect aircraft for your journey</p>
        </div>
        <Card>
          <CardContent className="p-6">
            <Tabs defaultValue="one-way" className="mb-6" onValueChange={setTripType}>
              <TabsList>
                <TabsTrigger value="one-way">One Way</TabsTrigger>
                <TabsTrigger value="round-trip">Round Trip</TabsTrigger>
                <TabsTrigger value="multi-city" disabled>
                  Multi-City
                </TabsTrigger>
              </TabsList>
              <TabsContent value="one-way" className="mt-4">
                <form onSubmit={handleSearch} className="flex flex-col md:flex-row md:items-end gap-4 flex-wrap">
                  <div className="grid gap-2 w-full md:w-auto">
                    <Label htmlFor="from">From</Label>
                    <div className="relative">
                      <Input
                        id="from"
                        placeholder="KHOU"
                        value={searchParams.from}
                        onChange={(e) => setSearchParams({ ...searchParams, from: e.target.value })}
                        required
                        className="w-full md:w-[120px]"
                      />
                      {searchParams.from && (
                        <button
                          type="button"
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                          onClick={() => setSearchParams({ ...searchParams, from: "" })}
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="grid gap-2 w-full md:w-auto">
                    <Label htmlFor="to">To</Label>
                    <div className="relative">
                      <Input
                        id="to"
                        placeholder="KMVY"
                        value={searchParams.to}
                        onChange={(e) => setSearchParams({ ...searchParams, to: e.target.value })}
                        required
                        className="w-full md:w-[120px]"
                      />
                      {searchParams.to && (
                        <button
                          type="button"
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                          onClick={() => setSearchParams({ ...searchParams, to: "" })}
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="grid gap-2 w-full md:w-auto">
                    <Label htmlFor="date">Departure (local)</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          id="date"
                          variant="outline"
                          className={cn(
                            "justify-start text-left font-normal w-full md:w-[140px]",
                            !searchParams.date && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {searchParams.date ? format(searchParams.date, "MM/dd/yy") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={searchParams.date}
                          onSelect={(date) => setSearchParams({ ...searchParams, date })}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="grid gap-2 w-full md:w-auto">
                    <Label htmlFor="time">Time</Label>
                    <Select
                      value={searchParams.time}
                      onValueChange={(value) => setSearchParams({ ...searchParams, time: value })}
                    >
                      <SelectTrigger id="time" className="w-full md:w-[100px]">
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 24 }, (_, i) => (
                          <SelectItem key={i} value={`${i.toString().padStart(2, "0")}:00`}>
                            {i.toString().padStart(2, "0")}:00
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2 w-full md:w-auto">
                    <Label htmlFor="passengers">PAX</Label>
                    <div className="flex items-center">
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="h-10 w-10 rounded-r-none"
                        onClick={() => {
                          const currentPax = Number.parseInt(searchParams.passengers)
                          if (currentPax > 1) {
                            setSearchParams({ ...searchParams, passengers: (currentPax - 1).toString() })
                          }
                        }}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Input
                        id="passengers"
                        type="text"
                        value={searchParams.passengers}
                        onChange={(e) => {
                          const value = e.target.value
                          if (/^\d*$/.test(value)) {
                            setSearchParams({ ...searchParams, passengers: value })
                          }
                        }}
                        className="h-10 rounded-none text-center w-12"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="h-10 w-10 rounded-l-none"
                        onClick={() => {
                          const currentPax = Number.parseInt(searchParams.passengers)
                          setSearchParams({ ...searchParams, passengers: (currentPax + 1).toString() })
                        }}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="grid gap-2 w-full md:w-auto">
                    <Label htmlFor="category">Minimum Category</Label>
                    <Select
                      value={searchParams.category}
                      onValueChange={(value) => setSearchParams({ ...searchParams, category: value })}
                    >
                      <SelectTrigger id="category" className="w-full md:w-[180px]">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any Category</SelectItem>
                        <SelectItem value="light">Light Jet</SelectItem>
                        <SelectItem value="midsize">Midsize Jet</SelectItem>
                        <SelectItem value="super-midsize">Super Midsize Jet</SelectItem>
                        <SelectItem value="large">Large Jet</SelectItem>
                        <SelectItem value="ultra-long-range">Ultra Long Range</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="w-full md:w-auto md:ml-auto">
                    <Button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 w-full md:w-auto">
                      {loading ? "Searching..." : "Search"}
                    </Button>
                  </div>
                </form>
              </TabsContent>
              <TabsContent value="round-trip" className="mt-4">
                <form onSubmit={handleSearch} className="flex flex-col md:flex-row md:items-end gap-4 flex-wrap">
                  <div className="grid gap-2 w-full md:w-auto">
                    <Label htmlFor="from-rt">From</Label>
                    <div className="relative">
                      <Input
                        id="from-rt"
                        placeholder="KHOU"
                        value={searchParams.from}
                        onChange={(e) => setSearchParams({ ...searchParams, from: e.target.value })}
                        required
                        className="w-full md:w-[120px]"
                      />
                      {searchParams.from && (
                        <button
                          type="button"
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                          onClick={() => setSearchParams({ ...searchParams, from: "" })}
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="grid gap-2 w-full md:w-auto">
                    <Label htmlFor="to-rt">To</Label>
                    <div className="relative">
                      <Input
                        id="to-rt"
                        placeholder="KMVY"
                        value={searchParams.to}
                        onChange={(e) => setSearchParams({ ...searchParams, to: e.target.value })}
                        required
                        className="w-full md:w-[120px]"
                      />
                      {searchParams.to && (
                        <button
                          type="button"
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                          onClick={() => setSearchParams({ ...searchParams, to: "" })}
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="grid gap-2 w-full md:w-auto">
                    <Label htmlFor="date-rt">Departure (local)</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          id="date-rt"
                          variant="outline"
                          className={cn(
                            "justify-start text-left font-normal w-full md:w-[140px]",
                            !searchParams.date && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {searchParams.date ? format(searchParams.date, "MM/dd/yy") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={searchParams.date}
                          onSelect={(date) => setSearchParams({ ...searchParams, date })}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="grid gap-2 w-full md:w-auto">
                    <Label htmlFor="time-rt">Time</Label>
                    <Select
                      value={searchParams.time}
                      onValueChange={(value) => setSearchParams({ ...searchParams, time: value })}
                    >
                      <SelectTrigger id="time-rt" className="w-full md:w-[100px]">
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 24 }, (_, i) => (
                          <SelectItem key={i} value={`${i.toString().padStart(2, "0")}:00`}>
                            {i.toString().padStart(2, "0")}:00
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2 w-full md:w-auto">
                    <Label htmlFor="return-date">Return Departure (local)</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          id="return-date"
                          variant="outline"
                          className={cn(
                            "justify-start text-left font-normal w-full md:w-[140px]",
                            !searchParams.returnDate && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {searchParams.returnDate ? format(searchParams.returnDate, "MM/dd/yy") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={searchParams.returnDate}
                          onSelect={(date) => setSearchParams({ ...searchParams, returnDate: date })}
                          initialFocus
                          disabled={(date) => (searchParams.date ? date < searchParams.date : false)}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="grid gap-2 w-full md:w-auto">
                    <Label htmlFor="return-time">Time</Label>
                    <Select
                      value={searchParams.returnTime || "17:00"}
                      onValueChange={(value) => setSearchParams({ ...searchParams, returnTime: value })}
                    >
                      <SelectTrigger id="return-time" className="w-full md:w-[100px]">
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 24 }, (_, i) => (
                          <SelectItem key={i} value={`${i.toString().padStart(2, "0")}:00`}>
                            {i.toString().padStart(2, "0")}:00
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2 w-full md:w-auto">
                    <Label htmlFor="passengers-rt">PAX</Label>
                    <div className="flex items-center">
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="h-10 w-10 rounded-r-none"
                        onClick={() => {
                          const currentPax = Number.parseInt(searchParams.passengers)
                          if (currentPax > 1) {
                            setSearchParams({ ...searchParams, passengers: (currentPax - 1).toString() })
                          }
                        }}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Input
                        id="passengers-rt"
                        type="text"
                        value={searchParams.passengers}
                        onChange={(e) => {
                          const value = e.target.value
                          if (/^\d*$/.test(value)) {
                            setSearchParams({ ...searchParams, passengers: value })
                          }
                        }}
                        className="h-10 rounded-none text-center w-12"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="h-10 w-10 rounded-l-none"
                        onClick={() => {
                          const currentPax = Number.parseInt(searchParams.passengers)
                          setSearchParams({ ...searchParams, passengers: (currentPax + 1).toString() })
                        }}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="grid gap-2 w-full md:w-auto">
                    <Label htmlFor="category-rt">Minimum Category</Label>
                    <Select
                      value={searchParams.category}
                      onValueChange={(value) => setSearchParams({ ...searchParams, category: value })}
                    >
                      <SelectTrigger id="category-rt" className="w-full md:w-[180px]">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any Category</SelectItem>
                        <SelectItem value="light">Light Jet</SelectItem>
                        <SelectItem value="midsize">Midsize Jet</SelectItem>
                        <SelectItem value="super-midsize">Super Midsize Jet</SelectItem>
                        <SelectItem value="large">Large Jet</SelectItem>
                        <SelectItem value="ultra-long-range">Ultra Long Range</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="w-full md:w-auto md:ml-auto">
                    <Button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 w-full md:w-auto">
                      {loading ? "Searching..." : "Search"}
                    </Button>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {hasSearched && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-1">
              <SearchSidebar filters={filters} onFilterChange={handleFilterChange} />
            </div>
            <div className="md:col-span-3">
              <SearchResults results={searchResults} loading={loading} tripType={tripType} />
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  )
}
