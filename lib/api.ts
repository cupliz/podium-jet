// This file contains functions to interact with the Aviapages API
// Documentation: https://dir.aviapages.com/api/documentation/#/

const API_BASE_URL = "https://dir.aviapages.com/api/v1"

// Types for API responses
export type Aircraft = {
  id: string
  model: string
  registration: string
  yom: number // Year of manufacture
  pax: number // Passenger capacity
  homebase: string
  category: string
  operator: string
  price: number
  tot: string // Time on type
  pos: string // Position
  cargo: string
  ambulance: boolean
  safety: string
  refurbished: number | null
  insurance: number | null
  amenities: string[]
  gallery: string[]
  time: string // Format: "HH:00"
}

export type Airport = {
  id: string
  name: string
  iata: string
  icao: string
  city: string
  country: string
  latitude: number
  longitude: number
}

export type SearchParams = {
  from: string
  to: string
  date: string
  time: string
  returnDate?: string
  returnTime?: string
  pax: number
  category: string
}

export type FilterParams = {
  categories?: string[]
  minYom?: number
  models?: string[]
  ambulance?: boolean
  safety?: string
  amenities?: string[]
  minRefurbished?: number
  minInsurance?: number
}

// Function to fetch aircraft directory
export async function getAircraftDirectory(page = 1, limit = 20) {
  try {
    // In a real app, you would call the API
    // For demonstration, we'll return mock data
    return {
      data: generateMockAircraft(limit),
      total: 100,
      page,
      limit,
    }
  } catch (error) {
    console.error("Error fetching aircraft directory:", error)
    throw error
  }
}

// Function to fetch airport directory
export async function getAirportsDirectory(page = 1, limit = 20, query = "") {
  try {
    // In a real app, you would call the API
    // For demonstration, we'll return mock data
    return {
      data: generateMockAirports(limit, query),
      total: 100,
      page,
      limit,
    }
  } catch (error) {
    console.error("Error fetching airport directory:", error)
    throw error
  }
}

// Function to search for aircraft
export async function searchAircraft(params: SearchParams, filters?: FilterParams) {
  try {
    // In a real app, you would call the API
    // For demonstration, we'll return mock data
    let mockAircraft = generateMockAircraft(10)

    // Apply filters if provided
    if (params.time) {
      mockAircraft = mockAircraft.filter((aircraft) => aircraft.time === params.time)
    }

    if (filters) {
      return {
        data: applyFilters(mockAircraft, filters),
        total: 10,
      }
    }

    return {
      data: mockAircraft,
      total: 10,
    }
  } catch (error) {
    console.error("Error searching aircraft:", error)
    // Return empty data array on error to prevent undefined errors
    return {
      data: [],
      total: 0,
    }
  }
}

// Function to get aircraft details
export async function getAircraftDetails(id: string | string[]): Promise<any> {
  try {
    // In a real app, you would call the API
    // For demonstration, we'll return mock data
    if (typeof id === "string") {
      return generateMockAircraft(1)[0]
    } else {
      return generateMockAircraft(id.length)
    }
  } catch (error) {
    console.error("Error fetching aircraft details:", error)
    throw error
  }
}

// Helper function to generate mock aircraft data
function generateMockAircraft(count: number): Aircraft[] {
  const models = [
    "Gulfstream G650",
    "Bombardier Global 7500",
    "Dassault Falcon 8X",
    "Cessna Citation Longitude",
    "Embraer Praetor 600",
    "Pilatus PC-24",
    "Hawker 800XP",
    "Learjet 75",
  ]

  const categories = ["Light Jet", "Midsize Jet", "Super Midsize Jet", "Heavy Jet", "Ultra Long Range"]

  const operators = ["ExecJet Aviation", "NetJets", "VistaJet", "Flexjet", "Jet Aviation", "Air Charter Service"]

  const homebases = [
    "KJFK - New York",
    "KLAX - Los Angeles",
    "EGLL - London",
    "LFPG - Paris",
    "EDDF - Frankfurt",
    "VHHH - Hong Kong",
    "OMDB - Dubai",
  ]

  const amenities = [
    "Wi-Fi",
    "Satellite Phone",
    "Full Galley",
    "Entertainment System",
    "Sleeping Facilities",
    "Shower",
    "Conference Area",
    "Air Conditioning",
  ]

  const safetyRatings = [
    "ARGUS Gold",
    "ARGUS Platinum",
    "Wyvern Wingman",
    "IS-BAO Stage 1",
    "IS-BAO Stage 2",
    "IS-BAO Stage 3",
  ]

  return Array.from({ length: count }, (_, i) => ({
    id: `aircraft-${i + 1}`,
    model: models[Math.floor(Math.random() * models.length)],
    registration: `N${Math.floor(Math.random() * 900) + 100}JC`,
    yom: Math.floor(Math.random() * 20) + 2000,
    pax: Math.floor(Math.random() * 12) + 4,
    homebase: homebases[Math.floor(Math.random() * homebases.length)],
    category: categories[Math.floor(Math.random() * categories.length)],
    operator: operators[Math.floor(Math.random() * operators.length)],
    price: Math.floor(Math.random() * 50000) + 5000,
    tot: `${Math.floor(Math.random() * 10000)}h`,
    pos: Math.random() > 0.5 ? "Available" : "Positioning",
    cargo: `${Math.floor(Math.random() * 500) + 100} lbs`,
    ambulance: Math.random() > 0.8,
    safety: safetyRatings[Math.floor(Math.random() * safetyRatings.length)],
    refurbished: Math.random() > 0.5 ? Math.floor(Math.random() * 5) + 2015 : null,
    insurance: Math.random() > 0.3 ? Math.floor(Math.random() * 50) + 50 : null,
    amenities: Array.from(
      { length: Math.floor(Math.random() * 5) + 1 },
      () => amenities[Math.floor(Math.random() * amenities.length)],
    ).filter((v, i, a) => a.indexOf(v) === i),
    gallery: Array.from({ length: Math.floor(Math.random() * 5) + 3 }, () => "/placeholder.svg?height=600&width=800"),
    time: `${String(Math.floor(Math.random() * 24)).padStart(2, "0")}:00`,
  }))
}

// Helper function to generate mock airport data
function generateMockAirports(count: number, query = ""): Airport[] {
  const airports = [
    {
      name: "John F. Kennedy International Airport",
      iata: "JFK",
      icao: "KJFK",
      city: "New York",
      country: "United States",
    },
    {
      name: "Los Angeles International Airport",
      iata: "LAX",
      icao: "KLAX",
      city: "Los Angeles",
      country: "United States",
    },
    { name: "Heathrow Airport", iata: "LHR", icao: "EGLL", city: "London", country: "United Kingdom" },
    { name: "Charles de Gaulle Airport", iata: "CDG", icao: "LFPG", city: "Paris", country: "France" },
    { name: "Frankfurt Airport", iata: "FRA", icao: "EDDF", city: "Frankfurt", country: "Germany" },
    { name: "Hong Kong International Airport", iata: "HKG", icao: "VHHH", city: "Hong Kong", country: "China" },
    { name: "Dubai International Airport", iata: "DXB", icao: "OMDB", city: "Dubai", country: "United Arab Emirates" },
    { name: "Teterboro Airport", iata: "TEB", icao: "KTEB", city: "Teterboro", country: "United States" },
    { name: "Van Nuys Airport", iata: "VNY", icao: "KVNY", city: "Los Angeles", country: "United States" },
    { name: "Le Bourget Airport", iata: "LBG", icao: "LFPB", city: "Paris", country: "France" },
  ]

  // Filter by query if provided
  let filteredAirports = airports
  if (query) {
    const lowerQuery = query.toLowerCase()
    filteredAirports = airports.filter(
      (airport) =>
        airport.name.toLowerCase().includes(lowerQuery) ||
        airport.iata.toLowerCase().includes(lowerQuery) ||
        airport.icao.toLowerCase().includes(lowerQuery) ||
        airport.city.toLowerCase().includes(lowerQuery) ||
        airport.country.toLowerCase().includes(lowerQuery),
    )
  }

  // Return requested number of airports
  return filteredAirports.slice(0, count).map((airport, i) => ({
    id: `airport-${i + 1}`,
    name: airport.name,
    iata: airport.iata,
    icao: airport.icao,
    city: airport.city,
    country: airport.country,
    latitude: Math.random() * 180 - 90,
    longitude: Math.random() * 360 - 180,
  }))
}

// Helper function to apply filters to aircraft
function applyFilters(aircraft: Aircraft[], filters: FilterParams): Aircraft[] {
  return aircraft.filter((aircraft) => {
    // Filter by categories
    if (filters.categories && filters.categories.length > 0) {
      if (!filters.categories.includes(aircraft.category)) {
        return false
      }
    }

    // Filter by minimum year of manufacture
    if (filters.minYom && aircraft.yom < filters.minYom) {
      return false
    }

    // Filter by models
    if (filters.models && filters.models.length > 0) {
      if (!filters.models.includes(aircraft.model)) {
        return false
      }
    }

    // Filter by ambulance capability
    if (filters.ambulance !== undefined && aircraft.ambulance !== filters.ambulance) {
      return false
    }

    // Filter by safety rating
    if (filters.safety && aircraft.safety !== filters.safety) {
      return false
    }

    // Filter by amenities
    if (filters.amenities && filters.amenities.length > 0) {
      if (!filters.amenities.every((amenity) => aircraft.amenities.includes(amenity))) {
        return false
      }
    }

    // Filter by minimum refurbished year
    if (filters.minRefurbished && (!aircraft.refurbished || aircraft.refurbished < filters.minRefurbished)) {
      return false
    }

    // Filter by minimum insurance
    if (filters.minInsurance && (!aircraft.insurance || aircraft.insurance < filters.minInsurance)) {
      return false
    }

    return true
  })
}

export async function getUserItineraries() {
  // Mock data for demonstration
  return [
    {
      id: "itin-1",
      from: "New York",
      to: "Miami",
      date: "2024-01-20",
      aircraft: { model: "Gulfstream G650", operator: "NetJets" },
      price: 25000,
      status: "pending",
      message: "Need catering",
    },
    {
      id: "itin-2",
      from: "Los Angeles",
      to: "Las Vegas",
      date: "2024-02-15",
      aircraft: { model: "Cessna Citation X", operator: "Flexjet" },
      price: 12000,
      status: "accepted",
      message: "Early morning",
      response: "Confirmed",
    },
    {
      id: "itin-3",
      from: "Chicago",
      to: "Toronto",
      date: "2024-03-10",
      aircraft: { model: "Bombardier Challenger 350", operator: "VistaJet" },
      price: 18000,
      status: "declined",
      message: "Wheelchair access",
      response: "Not available",
    },
  ]
}

export async function getAdminDashboardStats() {
  // Mock data for demonstration
  return {
    totalAircraft: 50,
    totalRequests: 120,
    activeBookings: 35,
    totalRevenue: 5500000,
    aircraftTrend: 5,
    requestsTrend: -3,
    bookingsTrend: 2,
    revenueTrend: 8,
    revenueData: [
      { month: "Jan", revenue: 450000 },
      { month: "Feb", revenue: 480000 },
      { month: "Mar", revenue: 520000 },
      { month: "Apr", revenue: 580000 },
      { month: "May", revenue: 620000 },
      { month: "Jun", revenue: 650000 },
      { month: "Jul", revenue: 590000 },
      { month: "Aug", revenue: 570000 },
      { month: "Sep", revenue: 540000 },
      { month: "Oct", revenue: 560000 },
      { month: "Nov", revenue: 580000 },
      { month: "Dec", revenue: 600000 },
    ],
    requestStatusData: [
      { name: "Jan", accepted: 20, pending: 5, declined: 2 },
      { name: "Feb", accepted: 22, pending: 3, declined: 1 },
      { name: "Mar", accepted: 25, pending: 7, declined: 3 },
    ],
    popularAircraft: [
      { id: "ac-1", model: "Gulfstream G650", category: "Heavy Jet", requests: 30, revenue: 1500000 },
      { id: "ac-2", model: "Bombardier Global 7500", category: "Ultra Long Range", requests: 25, revenue: 1300000 },
      { id: "ac-3", model: "Cessna Citation X", category: "Midsize Jet", requests: 20, revenue: 800000 },
      { id: "ac-4", model: "Embraer Praetor 600", category: "Super Midsize Jet", requests: 18, revenue: 700000 },
      { id: "ac-5", model: "Dassault Falcon 8X", category: "Heavy Jet", requests: 15, revenue: 600000 },
      { id: "ac-6", model: "Pilatus PC-24", category: "Light Jet", requests: 12, revenue: 400000 },
      { id: "ac-7", model: "Hawker 800XP", category: "Midsize Jet", requests: 10, revenue: 300000 },
      { id: "ac-8", model: "Learjet 75", category: "Light Jet", requests: 8, revenue: 250000 },
      { id: "ac-9", model: "Bombardier Challenger 350", category: "Super Midsize Jet", requests: 7, revenue: 200000 },
      { id: "ac-10", model: "Gulfstream G550", category: "Heavy Jet", requests: 5, revenue: 150000 },
    ],
  }
}
