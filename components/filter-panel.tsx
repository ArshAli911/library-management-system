"use client"

import { useState, useEffect } from "react"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useLibrary } from "@/components/library-provider"

export function FilterPanel({ filters, setFilters }) {
  const { books } = useLibrary()
  const [categories, setCategories] = useState([])
  const [years, setYears] = useState([])

  // Extract unique categories and years from books
  useEffect(() => {
    const uniqueCategories = [...new Set(books.map((book) => book.category))]
    const uniqueYears = [...new Set(books.map((book) => book.publishYear))]
    uniqueYears.sort((a, b) => b - a) // Sort years in descending order

    setCategories(uniqueCategories)
    setYears(uniqueYears)
  }, [books])

  // Handle category filter changes
  const handleCategoryChange = (category, checked) => {
    setFilters((prev) => {
      if (checked) {
        return { ...prev, categories: [...prev.categories, category] }
      } else {
        return { ...prev, categories: prev.categories.filter((c) => c !== category) }
      }
    })
  }

  // Handle year filter changes
  const handleYearChange = (year, checked) => {
    setFilters((prev) => {
      if (checked) {
        return { ...prev, years: [...prev.years, year] }
      } else {
        return { ...prev, years: prev.years.filter((y) => y !== year) }
      }
    })
  }

  return (
    <div className="space-y-6 py-2">
      <div>
        <h3 className="text-lg font-medium mb-4">Filters</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Availability</h4>
            <RadioGroup
              value={filters.availability}
              onValueChange={(value) => setFilters({ ...filters, availability: value })}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all" id="all" />
                <Label htmlFor="all">All Books</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="available" id="available" />
                <Label htmlFor="available">Available Only</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="unavailable" id="unavailable" />
                <Label htmlFor="unavailable">Checked Out</Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <h4 className="font-medium mb-2">Type</h4>
            <RadioGroup value={filters.type} onValueChange={(value) => setFilters({ ...filters, type: value })}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all" id="type-all" />
                <Label htmlFor="type-all">All Types</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="hardcopy" id="hardcopy" />
                <Label htmlFor="hardcopy">Hardcopy Only</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="ebook" id="ebook" />
                <Label htmlFor="ebook">E-Books Only</Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <h4 className="font-medium mb-2">Categories</h4>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category}`}
                    checked={filters.categories.includes(category)}
                    onCheckedChange={(checked) => handleCategoryChange(category, checked)}
                  />
                  <Label htmlFor={`category-${category}`} className="capitalize">
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">Publication Year</h4>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {years.map((year) => (
                <div key={year} className="flex items-center space-x-2">
                  <Checkbox
                    id={`year-${year}`}
                    checked={filters.years.includes(year.toString())}
                    onCheckedChange={(checked) => handleYearChange(year.toString(), checked)}
                  />
                  <Label htmlFor={`year-${year}`}>{year}</Label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
