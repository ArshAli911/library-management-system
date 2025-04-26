"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BookPlus, Library, Search, Users } from "lucide-react"
import { useLibrary } from "@/components/library-provider"
import { formatDate } from "@/lib/utils"

export default function AdminDashboard() {
  const { books, loans, users, addBook, issueBook } = useLibrary()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("books")
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    isbn: "",
    category: "fiction",
    publishYear: new Date().getFullYear(),
    pages: 0,
    description: "",
  })
  const [newLoan, setNewLoan] = useState({
    bookId: "",
    userId: "",
    dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
  })

  // Filter books based on search query
  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.isbn.includes(searchQuery),
  )

  // Filter active loans
  const activeLoans = loans.filter((loan) => !loan.returned)

  // Handle adding a new book
  const handleAddBook = (e) => {
    e.preventDefault()
    addBook({
      ...newBook,
      id: `book-${Date.now()}`,
      available: true,
      coverImage: null,
      publishYear: Number.parseInt(newBook.publishYear),
      pages: Number.parseInt(newBook.pages),
    })
    setNewBook({
      title: "",
      author: "",
      isbn: "",
      category: "fiction",
      publishYear: new Date().getFullYear(),
      pages: 0,
      description: "",
    })
  }

  // Handle issuing a book
  const handleIssueBook = (e) => {
    e.preventDefault()
    issueBook({
      id: `loan-${Date.now()}`,
      bookId: newLoan.bookId,
      userId: newLoan.userId,
      borrowDate: new Date().toISOString(),
      dueDate: new Date(newLoan.dueDate).toISOString(),
      returned: false,
      returnDate: null,
      isOverdue: false,
    })
    setNewLoan({
      bookId: "",
      userId: "",
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    })
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage books, loans, and users</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <BookPlus className="mr-2 h-4 w-4" />
                Add Book
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Book</DialogTitle>
                <DialogDescription>Enter the details of the new book to add to the library.</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddBook}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        value={newBook.title}
                        onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="author">Author</Label>
                      <Input
                        id="author"
                        value={newBook.author}
                        onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="isbn">ISBN</Label>
                      <Input
                        id="isbn"
                        value={newBook.isbn}
                        onChange={(e) => setNewBook({ ...newBook, isbn: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select
                        value={newBook.category}
                        onValueChange={(value) => setNewBook({ ...newBook, category: value })}
                      >
                        <SelectTrigger id="category">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fiction">Fiction</SelectItem>
                          <SelectItem value="non-fiction">Non-Fiction</SelectItem>
                          <SelectItem value="science">Science</SelectItem>
                          <SelectItem value="technology">Technology</SelectItem>
                          <SelectItem value="history">History</SelectItem>
                          <SelectItem value="biography">Biography</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="publishYear">Publication Year</Label>
                      <Input
                        id="publishYear"
                        type="number"
                        value={newBook.publishYear}
                        onChange={(e) => setNewBook({ ...newBook, publishYear: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pages">Pages</Label>
                      <Input
                        id="pages"
                        type="number"
                        value={newBook.pages}
                        onChange={(e) => setNewBook({ ...newBook, pages: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Input
                      id="description"
                      value={newBook.description}
                      onChange={(e) => setNewBook({ ...newBook, description: e.target.value })}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Add Book</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Issue Book</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Issue Book to Student</DialogTitle>
                <DialogDescription>Select a book and student to create a new loan.</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleIssueBook}>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="book">Book</Label>
                    <Select
                      value={newLoan.bookId}
                      onValueChange={(value) => setNewLoan({ ...newLoan, bookId: value })}
                      required
                    >
                      <SelectTrigger id="book">
                        <SelectValue placeholder="Select book" />
                      </SelectTrigger>
                      <SelectContent>
                        {books
                          .filter((book) => book.available)
                          .map((book) => (
                            <SelectItem key={book.id} value={book.id}>
                              {book.title} - {book.author}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="student">Student</Label>
                    <Select
                      value={newLoan.userId}
                      onValueChange={(value) => setNewLoan({ ...newLoan, userId: value })}
                      required
                    >
                      <SelectTrigger id="student">
                        <SelectValue placeholder="Select student" />
                      </SelectTrigger>
                      <SelectContent>
                        {users
                          .filter((user) => user.role === "student")
                          .map((user) => (
                            <SelectItem key={user.id} value={user.id}>
                              {user.name} ({user.id})
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dueDate">Due Date</Label>
                    <Input
                      id="dueDate"
                      type="date"
                      value={newLoan.dueDate}
                      onChange={(e) => setNewLoan({ ...newLoan, dueDate: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Issue Book</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">Books</CardTitle>
            <CardDescription>Total books in library</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{books.length}</div>
            <div className="text-sm text-muted-foreground mt-2">
              {books.filter((book) => book.available).length} available
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">Active Loans</CardTitle>
            <CardDescription>Books currently checked out</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{activeLoans.length}</div>
            <div className="text-sm text-muted-foreground mt-2">
              {activeLoans.filter((loan) => loan.isOverdue).length} overdue
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">Users</CardTitle>
            <CardDescription>Registered library users</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{users.length}</div>
            <div className="text-sm text-muted-foreground mt-2">
              {users.filter((user) => user.role === "student").length} students
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="books">
            <Library className="mr-2 h-4 w-4" />
            Manage Books
          </TabsTrigger>
          <TabsTrigger value="loans">
            <BookPlus className="mr-2 h-4 w-4" />
            Active Loans
          </TabsTrigger>
          <TabsTrigger value="users">
            <Users className="mr-2 h-4 w-4" />
            Users
          </TabsTrigger>
        </TabsList>

        <TabsContent value="books">
          <div className="flex mb-4">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search books..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>ISBN</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBooks.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center h-24">
                      No books found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredBooks.map((book) => (
                    <TableRow key={book.id}>
                      <TableCell className="font-medium">{book.title}</TableCell>
                      <TableCell>{book.author}</TableCell>
                      <TableCell>{book.category}</TableCell>
                      <TableCell>{book.isbn}</TableCell>
                      <TableCell>
                        <Badge variant={book.available ? "secondary" : "outline"}>
                          {book.available ? "Available" : "Checked Out"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" asChild>
                          <a href={`/books/${book.id}`}>View</a>
                        </Button>
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="loans">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Book</TableHead>
                  <TableHead>Student</TableHead>
                  <TableHead>Borrowed Date</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activeLoans.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center h-24">
                      No active loans.
                    </TableCell>
                  </TableRow>
                ) : (
                  activeLoans.map((loan) => {
                    const book = books.find((b) => b.id === loan.bookId)
                    const user = users.find((u) => u.id === loan.userId)

                    return (
                      <TableRow key={loan.id}>
                        <TableCell className="font-medium">{book?.title}</TableCell>
                        <TableCell>{user?.name}</TableCell>
                        <TableCell>{formatDate(loan.borrowDate)}</TableCell>
                        <TableCell>{formatDate(loan.dueDate)}</TableCell>
                        <TableCell>
                          <Badge variant={loan.isOverdue ? "destructive" : "secondary"}>
                            {loan.isOverdue ? "Overdue" : "Active"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            Return
                          </Button>
                          <Button variant="ghost" size="sm">
                            Extend
                          </Button>
                        </TableCell>
                      </TableRow>
                    )
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="users">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>ID</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Active Loans</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => {
                  const userActiveLoans = loans.filter((loan) => loan.userId === user.id && !loan.returned).length

                  return (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.id}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{user.role}</Badge>
                      </TableCell>
                      <TableCell>{userActiveLoans}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
