"use client"

import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, BookOpen, Calendar, Hash, User, MapPin } from "lucide-react"
import Link from "next/link"
import { books, booksByType } from "@/lib/data"
import { notFound } from "next/navigation"
import { NewspaperViewer } from "@/components/newspaper-viewer"

export default function BookDetails() {
  const params = useParams()
  const book = books.find((b) => b.id === params.id)

  if (!book) {
    notFound()
  }

  // Check if this is a newspaper
  const isNewspaper = book.id.includes("newspaper") || booksByType.newspapers.some((n) => n.id === book.id)

  return (
    <div className="container mx-auto px-4 py-6">
      <Link href="/all-books">
        <Button variant="ghost" className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to All Books
        </Button>
      </Link>

      <div className="grid grid-cols-1 gap-8">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2 text-primary">{book.title}</h1>
            <div className="flex items-center text-muted-foreground mb-4">
              <User className="h-4 w-4 mr-1" />
              <span className="mr-4">{book.author}</span>
              <Calendar className="h-4 w-4 mr-1" />
              <span>{book.publishYear}</span>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge className="capitalize">{book.category}</Badge>
              <Badge variant={book.type === "ebook" ? "outline" : "secondary"}>
                {book.type === "ebook" ? "E-Book" : "Hardcopy"}
              </Badge>
              <Badge variant={book.available ? "success" : "destructive"}>
                {book.available ? "Available" : "Checked Out"}
              </Badge>
            </div>
          </div>

          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center">
                  <Hash className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="font-medium mr-2">ISBN:</span>
                  <span>{book.isbn}</span>
                </div>
                <div className="flex items-center">
                  <BookOpen className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="font-medium mr-2">Pages:</span>
                  <span>{book.pages}</span>
                </div>
                <div className="flex items-center col-span-2">
                  <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="font-medium mr-2">Location:</span>
                  <span>{book.location}</span>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">Description</h2>
                <p className="text-muted-foreground">{book.description}</p>
              </div>
            </CardContent>
          </Card>

          {isNewspaper && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-4">View Newspaper</h2>
              <NewspaperViewer newspaper={book} />
            </div>
          )}

          <div className="flex flex-wrap gap-4">
            {book.available ? <Button>Request Book</Button> : <Button disabled>Currently Unavailable</Button>}

            {book.type === "ebook" && book.available && <Button variant="outline">Read Online</Button>}

            <Button variant="outline">Add to Reading List</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
