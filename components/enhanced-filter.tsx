"use client"

import { useState, useEffect } from "react"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { uniqueCategories, uniqueAuthors, uniqueYears } from "@/lib/data"

export function EnhancedFilter({ filters, setFilters, applyFilters }) {
  const [searchCategory, setSearchCategory] = useState("")
  const [searchAuthor, setSearchAuthor] = useState("")
  const [searchYear, setSearchYear] = useState("")

  // Filter the lists based on search
  const filteredCategories = uniqueCategories.filter((category) =>
    category.toLowerCase().includes(searchCategory.toLowerCase()),
  )

  const filteredAuthors = uniqueAuthors.filter((author) => author.toLowerCase().includes(searchAuthor.toLowerCase()))

  const filteredYears = uniqueYears.filter((year) => year.toString().includes(searchYear))

  // Load filters from localStorage
  useEffect(() => {
    const savedFilters = localStorage.getItem("bookFilters")
    if (savedFilters) {
      setFilters(JSON.parse(savedFilters))
    }
  }, [setFilters])

  // Save filters to localStorage when they change
  useEffect(() => {
    localStorage.setItem("bookFilters", JSON.stringify(filters))
  }, [filters])

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

  // Handle author filter changes
  const handleAuthorChange = (author, checked) => {
    setFilters((prev) => {
      if (checked) {
        return { ...prev, authors: [...prev.authors, author] }
      } else {
        return { ...prev, authors: prev.authors.filter((a) => a !== author) }
      }
    })
  }

  // Handle year filter changes
  const handleYearChange = (year, checked) => {
    setFilters((prev) => {
      if (checked) {
        return { ...prev, years: [...prev.years, year.toString()] }
      } else {
        return { ...prev, years: prev.years.filter((y) => y !== year.toString()) }
      }
    })
  }

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      categories: [],
      authors: [],
      years: [],
      availability: "all",
      type: "all",
    })
    setSearchCategory("")
    setSearchAuthor("")
    setSearchYear("")
  }

  return (
    <div className="space-y-6 py-2">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Filters</h3>
        <Button variant="ghost" size="sm" onClick={resetFilters}>
          Reset All
        </Button>
      </div>

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

        <Accordion type="multiple" defaultValue={["categories"]}>
          <AccordionItem value="categories">
            <AccordionTrigger>Categories</AccordionTrigger>
            <AccordionContent>
              <div className="mb-2">
                <Input
                  placeholder="Search categories..."
                  value={searchCategory}
                  onChange={(e) => setSearchCategory(e.target.value)}
                  className="mb-2"
                />
              </div>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {filteredCategories.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No categories found</p>
                ) : (
                  filteredCategories.map((category) => (
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
                  ))
                )}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="authors">
            <AccordionTrigger>Authors</AccordionTrigger>
            <AccordionContent>
              <div className="mb-2">
                <Input
                  placeholder="Search authors..."
                  value={searchAuthor}
                  onChange={(e) => setSearchAuthor(e.target.value)}
                  className="mb-2"
                />
              </div>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {filteredAuthors.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No authors found</p>
                ) : (
                  filteredAuthors.map((author) => (
                    <div key={author} className="flex items-center space-x-2">
                      <Checkbox
                        id={`author-${author}`}
                        checked={filters.authors.includes(author)}
                        onCheckedChange={(checked) => handleAuthorChange(author, checked)}
                      />
                      <Label htmlFor={`author-${author}`}>{author}</Label>
                    </div>
                  ))
                )}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="years">
            <AccordionTrigger>Publication Year</AccordionTrigger>
            <AccordionContent>
              <div className="mb-2">
                <Input
                  placeholder="Search years..."
                  value={searchYear}
                  onChange={(e) => setSearchYear(e.target.value)}
                  className="mb-2"
                />
              </div>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {filteredYears.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No years found</p>
                ) : (
                  filteredYears.map((year) => (
                    <div key={year} className="flex items-center space-x-2">
                      <Checkbox
                        id={`year-${year}`}
                        checked={filters.years.includes(year.toString())}
                        onCheckedChange={(checked) => handleYearChange(year, checked)}
                      />
                      <Label htmlFor={`year-${year}`}>{year}</Label>
                    </div>
                  ))
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Button className="w-full" onClick={applyFilters}>
          Apply Filters
        </Button>
      </div>
    </div>
  )
}
