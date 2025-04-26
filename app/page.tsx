import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookCard } from "@/components/book-card"
import { SearchBar } from "@/components/search-bar"
import { recentlyAddedBooks, popularBooks, announcements } from "@/lib/data"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary">
          CCET Library
        </h1>
        <p className="max-w-[700px] text-muted-foreground">
          Search, browse, and manage books in our extensive engineering collection.
        </p>
        <div className="w-full max-w-md">
          <SearchBar />
        </div>
      </div>

      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-6">Recently Added</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {recentlyAddedBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </div>

      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-6">Most Popular</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {popularBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </div>

      <Tabs defaultValue="announcements" className="w-full mb-8">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-1">
          <TabsTrigger value="announcements">Announcements</TabsTrigger>
        </TabsList>
        <TabsContent value="announcements">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {announcements.map((announcement, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-xl">{announcement.title}</CardTitle>
                    <Badge variant={announcement.type === "important" ? "destructive" : "secondary"}>
                      {announcement.type}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{announcement.content}</p>
                  <p className="text-sm text-muted-foreground mt-4">Posted on {announcement.date}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-primary text-white">
          <CardHeader>
            <CardTitle>Quick Links</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <a href="/all-books" className="block text-white hover:underline">
              Browse All Books
            </a>
            <a href="/academic" className="block text-white hover:underline">
              Academic Books
            </a>
            <a href="/newspapers" className="block text-white hover:underline">
              Newspapers
            </a>
            <a href="/novels" className="block text-white hover:underline">
              Novels
            </a>
            <a href="/papers" className="block text-white hover:underline">
              Previous Year Papers
            </a>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Library Hours</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span>Monday - Friday</span>
                <span>8:00 AM - 8:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Saturday</span>
                <span>9:00 AM - 6:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday</span>
                <span>Closed</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>Email: library@ccet.ac.in</p>
            <p>Phone: +91-172-2750947 (Ext. 123)</p>
            <p>Location: Academic Block, Ground Floor</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
