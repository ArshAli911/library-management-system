import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function BookCard({ book }) {
  return (
    <Link href={`/books/${book.id}`} className="group">
      <Card className="h-full transition-all hover:shadow-md">
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors mb-1">
            {book.title}
          </h3>
          <p className="text-sm text-muted-foreground mb-2">{book.author}</p>
          <p className="text-xs text-muted-foreground line-clamp-3 mb-3">{book.description}</p>
          <div className="flex flex-wrap gap-2">
            {!book.available && (
              <Badge variant="destructive" className="text-xs">
                Checked Out
              </Badge>
            )}
            {book.type === "ebook" && (
              <Badge variant="outline" className="text-xs">
                E-Book
              </Badge>
            )}
            <Badge variant="outline" className="capitalize text-xs">
              {book.category}
            </Badge>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between items-center">
          <span className="text-xs text-muted-foreground">{book.publishYear}</span>
          {book.type === "newspaper" && (
            <Badge variant="secondary" className="text-xs">
              View Online
            </Badge>
          )}
        </CardFooter>
      </Card>
    </Link>
  )
}
