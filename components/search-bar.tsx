"use client"

import { useState, useEffect, useRef } from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { useRouter } from "next/navigation"
import { books } from "@/lib/data"

export function SearchBar() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [suggestions, setSuggestions] = useState([])
  const inputRef = useRef(null)
  const router = useRouter()

  // External dashboard URL
  const dashboardUrl = "https://your-external-dashboard.com"

  // Load last search from sessionStorage
  useEffect(() => {
    const lastSearch = sessionStorage.getItem("lastSearch")
    if (lastSearch) {
      setQuery(lastSearch)
    }
  }, [])

  // Handle keyboard shortcut to open search
  useEffect(() => {
    const down = (e) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  // Generate search suggestions
  useEffect(() => {
    if (query.length > 1) {
      const bookSuggestions = books
        .filter(
          (book) =>
            book.title.toLowerCase().includes(query.toLowerCase()) ||
            book.author.toLowerCase().includes(query.toLowerCase()) ||
            book.category.toLowerCase().includes(query.toLowerCase()),
        )
        .slice(0, 5)
        .map((book) => ({
          id: book.id,
          title: book.title,
          author: book.author,
          category: book.category,
          type: "book",
        }))

      // Add category suggestions
      const categories = [...new Set(books.map((book) => book.category))]
        .filter((category) => category.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 3)
        .map((category) => ({
          id: category,
          title: `Browse ${category}`,
          category: category,
          type: "category",
        }))

      // Add author suggestions
      const authors = [...new Set(books.map((book) => book.author))]
        .filter((author) => author.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 3)
        .map((author) => ({
          id: author,
          title: `Books by ${author}`,
          author: author,
          type: "author",
        }))

      setSuggestions([...bookSuggestions, ...categories, ...authors])
    } else {
      setSuggestions([])
    }
  }, [query])

  const handleSearch = (e) => {
    e.preventDefault()
    if (query.trim()) {
      // Save search to sessionStorage
      sessionStorage.setItem("lastSearch", query)

      // Redirect to external dashboard with search query
      window.location.href = `${dashboardUrl}?search=${encodeURIComponent(query)}`
    }
  }

  const handleSuggestionClick = (suggestion) => {
    setOpen(false)

    if (suggestion.type === "book") {
      router.push(`/books/${suggestion.id}`)
    } else if (suggestion.type === "category") {
      router.push(`/all-books?category=${encodeURIComponent(suggestion.category)}`)
    } else if (suggestion.type === "author") {
      router.push(`/all-books?author=${encodeURIComponent(suggestion.author)}`)
    }
  }

  return (
    <>
      <form onSubmit={handleSearch} className="flex w-full max-w-sm items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            ref={inputRef}
            type="text"
            placeholder="Search books, authors, or categories..."
            className="pl-8 pr-10"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onClick={() => setOpen(true)}
          />
          {query && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3"
              onClick={() => setQuery("")}
            >
              ×
            </Button>
          )}
        </div>
        <Button type="submit">Search</Button>
      </form>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search books, authors, or categories..." value={query} onValueChange={setQuery} />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {suggestions.length > 0 && (
            <CommandGroup heading="Suggestions">
              {suggestions.map((suggestion) => (
                <CommandItem
                  key={`${suggestion.type}-${suggestion.id}`}
                  onSelect={() => handleSuggestionClick(suggestion)}
                >
                  <div className="flex flex-col">
                    <span>{suggestion.title}</span>
                    {suggestion.type === "book" && (
                      <span className="text-xs text-muted-foreground">
                        by {suggestion.author} • {suggestion.category}
                      </span>
                    )}
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  )
}
