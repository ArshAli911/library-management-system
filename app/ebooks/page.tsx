"use client"

import { useState } from "react"
import { useLibrary } from "@/components/library-provider"
import { BookCard } from "@/components/book-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function EBooks() {
  const { books } = useLibrary()
  const [searchQuery, setSearchQuery] = useState("")
  const [category, setCategory] = useState("all")

  // Get only ebooks
  const ebooks = books.filter((book) => book.type === "ebook")

  // Get unique categories
  const categories = [...new Set(ebooks.map((book) => book.category))]

  // Filter ebooks based on search query and category
  const filteredEbooks = ebooks.filter((book) => {
    const matchesSearch =
      searchQuery === "" ||
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.isbn.includes(searchQuery)

    const matchesCategory = category === "all" || book.category === category

    return matchesSearch && matchesCategory
  })

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6 text-primary">E-Book Collection</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex w-full md:w-2/3 items-center space-x-2">
          <Input
            type="text"
            placeholder="Search e-books by title, author, or ISBN..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="rounded-l-md"
          />
          <Button type="submit" className="rounded-r-md">
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>

        <div className="w-full md:w-1/3">
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat} className="capitalize">
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Available E-Books</h2>
        {filteredEbooks.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-2">No e-books found</h3>
            <p className="text-muted-foreground">Try adjusting your search or category filter</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredEbooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        )}
      </div>

      <div className="bg-primary/10 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">How to Access E-Books</h2>
        <div className="space-y-4">
          <p>
            CCET Library provides access to e-books through our digital library platform. Follow these steps to access
            e-books:
          </p>
          <ol className="list-decimal list-inside space-y-2">
            <li>Log in to your student account</li>
            <li>Click on the e-book you want to read</li>
            <li>You can read online or download for offline access (where permitted)</li>
            <li>E-books are available for 14 days and will automatically return after the lending period</li>
          </ol>
          <p>For technical assistance with e-books, please contact the library help desk at library.help@ccet.ac.in</p>
        </div>
      </div>
    </div>
  )
}
