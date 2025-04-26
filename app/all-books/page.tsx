"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { SlidersHorizontal, Search } from "lucide-react"
import { BookCard } from "@/components/book-card"
import { EnhancedFilter } from "@/components/enhanced-filter"
import { books } from "@/lib/data"

export default function AllBooks() {
  const searchParams = useSearchParams()
  const initialCategory = searchParams.get("category")
  const initialAuthor = searchParams.get("author")

  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState({
    categories: initialCategory ? [initialCategory] : [],
    authors: initialAuthor ? [initialAuthor] : [],
    years: [],
    availability: "all",
    type: "all",
  })
  const [filteredBooks, setFilteredBooks] = useState(books)
  const [isFiltering, setIsFiltering] = useState(false)

  // Apply filters when they change or on initial load
  useEffect(() => {
    applyFilters()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const applyFilters = () => {
    setIsFiltering(true)

    const filtered = books.filter((book) => {
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
      <h1 className="text-3xl font-bold mb-6 text-primary">All Books</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <form onSubmit={handleSearch} className="flex w-full md:w-2/3 items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by title, author, category, or description..."
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

      {/* Active filters display */}
      {(filters.categories.length > 0 ||
        filters.authors.length > 0 ||
        filters.years.length > 0 ||
        filters.availability !== "all" ||
        filters.type !== "all") && (
        <div className="mb-4 flex flex-wrap gap-2 items-center">
          <span className="text-sm font-medium">Active Filters:</span>

          {filters.categories.map((category) => (
            <Button
              key={`cat-${category}`}
              variant="secondary"
              size="sm"
              className="text-xs h-7 capitalize"
              onClick={() => {
                setFilters({
                  ...filters,
                  categories: filters.categories.filter((c) => c !== category),
                })
                setTimeout(applyFilters, 0)
              }}
            >
              {category} ×
            </Button>
          ))}

          {filters.authors.map((author) => (
            <Button
              key={`auth-${author}`}
              variant="secondary"
              size="sm"
              className="text-xs h-7"
              onClick={() => {
                setFilters({
                  ...filters,
                  authors: filters.authors.filter((a) => a !== author),
                })
                setTimeout(applyFilters, 0)
              }}
            >
              {author} ×
            </Button>
          ))}

          {filters.years.map((year) => (
            <Button
              key={`year-${year}`}
              variant="secondary"
              size="sm"
              className="text-xs h-7"
              onClick={() => {
                setFilters({
                  ...filters,
                  years: filters.years.filter((y) => y !== year),
                })
                setTimeout(applyFilters, 0)
              }}
            >
              {year} ×
            </Button>
          ))}

          {filters.availability !== "all" && (
            <Button
              variant="secondary"
              size="sm"
              className="text-xs h-7 capitalize"
              onClick={() => {
                setFilters({
                  ...filters,
                  availability: "all",
                })
                setTimeout(applyFilters, 0)
              }}
            >
              {filters.availability} ×
            </Button>
          )}

          {filters.type !== "all" && (
            <Button
              variant="secondary"
              size="sm"
              className="text-xs h-7 capitalize"
              onClick={() => {
                setFilters({
                  ...filters,
                  type: "all",
                })
                setTimeout(applyFilters, 0)
              }}
            >
              {filters.type} ×
            </Button>
          )}

          <Button
            variant="ghost"
            size="sm"
            className="text-xs h-7 ml-auto"
            onClick={() => {
              setFilters({
                categories: [],
                authors: [],
                years: [],
                availability: "all",
                type: "all",
              })
              setTimeout(applyFilters, 0)
            }}
          >
            Clear All
          </Button>
        </div>
      )}

      {isFiltering ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Filtering books...</p>
        </div>
      ) : filteredBooks.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-2">No books found</h2>
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
