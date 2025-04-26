"use client"

import { useState, useEffect } from "react"
import { BookCard } from "@/components/book-card"
import { FilterPanel } from "@/components/filter-panel"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, SlidersHorizontal } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useLibrary } from "@/components/library-provider"
import { Badge } from "@/components/ui/badge"

export default function Catalog() {
  const { books } = useLibrary()
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("title")
  const [filters, setFilters] = useState({
    categories: [],
    years: [],
    availability: "all",
    type: "all", // "hardcopy" or "ebook" or "all"
  })
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)

  // Filter and sort books
  useEffect(() => {
    const filteredBooks = books.filter((book) => {
      // Search filter
      const matchesSearch =
        searchQuery === "" ||
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.isbn.includes(searchQuery)

      // Category filter
      const matchesCategory = filters.categories.length === 0 || filters.categories.includes(book.category)

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

      return matchesSearch && matchesCategory && matchesYear && matchesAvailability && matchesType
    })

    // Sort books
    const sortedBooks = [...filteredBooks].sort((a, b) => {
      if (sortBy === "title") return a.title.localeCompare(b.title)
      if (sortBy === "author") return a.author.localeCompare(b.author)
      if (sortBy === "year") return b.publishYear - a.publishYear
      return 0
    })

    setSearchResults(sortedBooks)
  }, [books, searchQuery, filters, sortBy])

  const handleSearch = (e) => {
    e.preventDefault()
    setIsSearching(true)
  }

  // Group search results by type
  const hardcopyBooks = searchResults.filter((book) => book.type === "hardcopy")
  const ebookBooks = searchResults.filter((book) => book.type === "ebook")

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6 text-primary">Book Catalog</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <form onSubmit={handleSearch} className="flex w-full md:w-2/3 items-center space-x-2">
          <Input
            type="text"
            placeholder="Search by title, author, or ISBN..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="rounded-l-md"
          />
          <Button type="submit" className="rounded-r-md">
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </form>

        <div className="flex w-full md:w-1/3 items-center space-x-2">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="title">Title</SelectItem>
              <SelectItem value="author">Author</SelectItem>
              <SelectItem value="year">Publication Year</SelectItem>
            </SelectContent>
          </Select>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent>
              <FilterPanel filters={filters} setFilters={setFilters} />
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {isSearching && searchQuery && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Search Results for "{searchQuery}"</h2>

          {searchResults.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2">No books found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filters</p>
            </div>
          ) : (
            <>
              {hardcopyBooks.length > 0 && (
                <div className="mb-8">
                  <div className="flex items-center mb-4">
                    <h3 className="text-lg font-semibold">Hardcopy Books</h3>
                    <Badge className="ml-2">{hardcopyBooks.length}</Badge>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {hardcopyBooks.map((book) => (
                      <BookCard key={book.id} book={book} />
                    ))}
                  </div>
                </div>
              )}

              {ebookBooks.length > 0 && (
                <div>
                  <div className="flex items-center mb-4">
                    <h3 className="text-lg font-semibold">E-Books</h3>
                    <Badge className="ml-2">{ebookBooks.length}</Badge>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {ebookBooks.map((book) => (
                      <BookCard key={book.id} book={book} />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {(!isSearching || !searchQuery) && (
        <>
          {searchResults.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-xl font-semibold mb-2">No books found</h2>
              <p className="text-muted-foreground">Try adjusting your filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {searchResults.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}
