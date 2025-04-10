"use client"

import { useState, useEffect } from "react"
import type { FilterParams } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"
import { Ambulance, Wifi, Coffee, Tv, ShowerHeadIcon as Shower } from "lucide-react"

interface SearchSidebarProps {
  filters: FilterParams
  onFilterChange: (filters: Partial<FilterParams>) => void
}

export function SearchSidebar({ filters, onFilterChange }: SearchSidebarProps) {
  const [categories, setCategories] = useState<string[]>([])
  const [models, setModels] = useState<string[]>([])
  const [amenities, setAmenities] = useState<string[]>([])
  const [minYom, setMinYom] = useState<number>(2000)
  const [ambulance, setAmbulance] = useState<boolean>(false)
  const [minInsurance, setMinInsurance] = useState<number>(0)

  const jetCategories = ["Light Jet", "Midsize Jet", "Super Midsize Jet", "Heavy Jet", "Ultra Long Range"]

  const jetModels = [
    "Gulfstream G650",
    "Bombardier Global 7500",
    "Dassault Falcon 8X",
    "Cessna Citation Longitude",
    "Embraer Praetor 600",
    "Pilatus PC-24",
    "Hawker 800XP",
    "Learjet 75",
  ]

  const amenitiesList = [
    { name: "Wi-Fi", icon: <Wifi className="h-4 w-4" /> },
    { name: "Full Galley", icon: <Coffee className="h-4 w-4" /> },
    { name: "Entertainment System", icon: <Tv className="h-4 w-4" /> },
    { name: "Shower", icon: <Shower className="h-4 w-4" /> },
  ]

  useEffect(() => {
    setCategories(filters.categories || [])
    setModels(filters.models || [])
    setAmenities(filters.amenities || [])
    setMinYom(filters.minYom || 2000)
    setAmbulance(filters.ambulance || false)
    setMinInsurance(filters.minInsurance || 0)
  }, [])

  const toggleCategory = (category: string) => {
    if (categories.includes(category)) {
      setCategories(categories.filter((c) => c !== category))
    } else {
      setCategories([...categories, category])
    }
  }

  const toggleModel = (model: string) => {
    if (models.includes(model)) {
      setModels(models.filter((m) => m !== model))
    } else {
      setModels([...models, model])
    }
  }

  const toggleAmenity = (amenity: string) => {
    if (amenities.includes(amenity)) {
      setAmenities(amenities.filter((a) => a !== amenity))
    } else {
      setAmenities([...amenities, amenity])
    }
  }

  const resetFilters = () => {
    setCategories([])
    setModels([])
    setAmenities([])
    setMinYom(2000)
    setAmbulance(false)
    setMinInsurance(0)
  }

  const applyFilters = () => {
    onFilterChange({
      categories,
      models,
      amenities,
      minYom,
      ambulance,
      minInsurance,
    })
  }

  return (
    <Card className="sticky top-20">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle>Filters</CardTitle>
          <Button variant="ghost" size="sm" onClick={resetFilters}>
            Reset
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="font-medium">Jet Category</h3>
          <div className="space-y-2">
            {jetCategories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={`category-${category}`}
                  checked={categories.includes(category)}
                  onCheckedChange={() => toggleCategory(category)}
                />
                <Label htmlFor={`category-${category}`}>{category}</Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="font-medium">Year of Manufacture</h3>
          <div className="space-y-4">
            <Slider
              defaultValue={[minYom]}
              min={2000}
              max={2023}
              step={1}
              onValueChange={(value) => setMinYom(value[0])}
            />
            <div className="flex items-center justify-between">
              <span className="text-sm">Min: {minYom}</span>
              <span className="text-sm">Max: 2023</span>
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="font-medium">Aircraft Model</h3>
          <div className="space-y-2">
            {jetModels.map((model) => (
              <div key={model} className="flex items-center space-x-2">
                <Checkbox
                  id={`model-${model}`}
                  checked={models.includes(model)}
                  onCheckedChange={() => toggleModel(model)}
                />
                <Label htmlFor={`model-${model}`}>{model}</Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="font-medium">Amenities</h3>
          <div className="space-y-2">
            {amenitiesList.map((amenity) => (
              <div key={amenity.name} className="flex items-center space-x-2">
                <Checkbox
                  id={`amenity-${amenity.name}`}
                  checked={amenities.includes(amenity.name)}
                  onCheckedChange={() => toggleAmenity(amenity.name)}
                />
                <Label htmlFor={`amenity-${amenity.name}`} className="flex items-center gap-2">
                  {amenity.icon}
                  {amenity.name}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="font-medium">Special Requirements</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="ambulance"
                checked={ambulance}
                onCheckedChange={(checked) => setAmbulance(checked === true)}
              />
              <Label htmlFor="ambulance" className="flex items-center gap-2">
                <Ambulance className="h-4 w-4" />
                Ambulance Capability
              </Label>
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="font-medium">Minimum Insurance</h3>
          <div className="space-y-4">
            <Slider
              defaultValue={[minInsurance]}
              min={0}
              max={100}
              step={10}
              onValueChange={(value) => setMinInsurance(value[0])}
            />
            <div className="flex items-center justify-between">
              <span className="text-sm">${minInsurance}M</span>
              <span className="text-sm">$100M</span>
            </div>
          </div>
        </div>

        <div className="pt-2">
          <Button className="w-full" onClick={applyFilters}>
            Apply Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
