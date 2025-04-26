"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { SlidersHorizontal, Search } from "lucide-react"
import { BookCard } from "@/components/book-card"
import { EnhancedFilter } from "@/components/enhanced-filter"
import { booksByType } from "@/lib/data"

export default function Novels() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState({
    categories: [],
    authors: [],
    years: [],
    availability: "all",
    type: "all",
  })
  const [filteredBooks, setFilteredBooks] = useState(booksByType.novels)
  const [isFiltering, setIsFiltering] = useState(false)

  // Apply filters when they change or on initial load
  useEffect(() => {
    applyFilters()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const applyFilters = () => {
    setIsFiltering(true)

    const filtered = booksByType.novels.filter((book) => {
      // Search filter
      const matchesSearch =
        searchQuery === "" ||
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.description.toLowerCase().includes(searchQuery.toLowerCase())

      // Category filter
      const matchesCategory = filters.categories.length === 0 || filters.categories.includes(book.category)

      // Author filter
      const matchesAuthor = filters.authors.length === 0 || filters.authors.includes(book.author)

      // Year filter
      const matchesYear = filters.years.length === 0 || filters.years.includes(book.publishYear.toString())

      // Availability filter
      const matchesAvailability =
        filters.availability === "all" ||
        (filters.availability === "available" && book.available) ||
        (filters.availability === "unavailable" && !book.available)

      // Type filter
      const matchesType =
        filters.type === "all" ||
        (filters.type === "hardcopy" && book.type === "hardcopy") ||
        (filters.type === "ebook" && book.type === "ebook")

      return matchesSearch && matchesCategory && matchesAuthor && matchesYear && matchesAvailability && matchesType
    })

    setFilteredBooks(filtered)
    setIsFiltering(false)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    applyFilters()
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6 text-primary">Novels</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <form onSubmit={handleSearch} className="flex w-full md:w-2/3 items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search novels..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button type="submit">Search</Button>
        </form>

        <div className="flex w-full md:w-1/3 items-center justify-end">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent>
              <EnhancedFilter filters={filters} setFilters={setFilters} applyFilters={applyFilters} />
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {isFiltering ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Filtering novels...</p>
        </div>
      ) : filteredBooks.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-2">No novels found</h2>
          <p className="text-muted-foreground">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  )
}
