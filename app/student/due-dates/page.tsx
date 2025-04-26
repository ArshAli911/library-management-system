"use client"

import { useEffect } from "react"
import { useLibrary } from "@/components/library-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, AlertTriangle } from "lucide-react"
import { formatDate, calculateDaysRemaining } from "@/lib/utils"
import { useRouter } from "next/navigation"

export default function DueDates() {
  const { loans, user, checkOverdueBooks } = useLibrary()
  const router = useRouter()

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      router.push("/login")
    }

    // Check for overdue books
    checkOverdueBooks()
  }, [user, router, checkOverdueBooks])

  if (!user) {
    return null
  }

  // Filter loans for the current user
  const userLoans = loans.filter((loan) => loan.userId === user.id && !loan.returned)

  // Sort loans by due date (closest first)
  const sortedLoans = [...userLoans].sort((a, b) => {
    const dateA = new Date(a.dueDate)
    const dateB = new Date(b.dueDate)
    return dateA.getTime() - dateB.getTime()
  })

  // Group loans by status
  const upcomingLoans = sortedLoans.filter((loan) => !loan.isOverdue)
  const overdueLoans = sortedLoans.filter((loan) => loan.isOverdue)

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-2 text-primary">Due Dates</h1>
      <p className="text-muted-foreground mb-6">Track your book return deadlines and avoid fines</p>

      {sortedLoans.length === 0 ? (
        <div className="text-center py-12 bg-muted rounded-lg">
          <Calendar className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold mb-2">No books checked out</h2>
          <p className="text-muted-foreground mb-4">You don't have any books checked out at the moment.</p>
          <Button asChild>
            <a href="/catalog">Browse Catalog</a>
          </Button>
        </div>
      ) : (
        <div className="space-y-8">
          {overdueLoans.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                <h2 className="text-xl font-semibold text-destructive">Overdue Books</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {overdueLoans.map((loan) => {
                  const book = loan.book
                  const daysOverdue = loan.daysOverdue
                  const fine = loan.fine

                  return (
                    <Card key={loan.id} className="border-destructive">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between">
                          <div>
                            <CardTitle>{book.title}</CardTitle>
                            <CardDescription>{book.author}</CardDescription>
                          </div>
                          <Badge variant="destructive">{daysOverdue} days overdue</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span className="font-medium mr-2">Borrowed:</span>
                            <span>{formatDate(loan.borrowDate)}</span>
                          </div>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span className="font-medium mr-2">Due Date:</span>
                            <span>{formatDate(loan.dueDate)}</span>
                          </div>
                          <div className="flex items-center text-destructive">
                            <Clock className="h-4 w-4 mr-2" />
                            <span className="font-medium mr-2">Fine:</span>
                            <span>₹{fine.toFixed(2)}</span>
                          </div>
                          {daysOverdue > 7 && (
                            <div className="mt-2 p-2 bg-destructive/10 rounded text-destructive text-xs">
                              <AlertTriangle className="h-3 w-3 inline-block mr-1" />
                              Your borrowing privileges have been suspended due to overdue books. Please return this
                              book and pay the fine to restore your privileges.
                            </div>
                          )}
                        </div>
                        <div className="mt-4 flex gap-2">
                          <Button variant="outline" size="sm" asChild>
                            <a href={`/books/${book.id}`}>View Book</a>
                          </Button>
                          <Button size="sm" variant="destructive">
                            Return Now
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          )}

          {upcomingLoans.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Upcoming Due Dates</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {upcomingLoans.map((loan) => {
                  const book = loan.book
                  const daysRemaining = calculateDaysRemaining(loan.dueDate)

                  return (
                    <Card key={loan.id} className={daysRemaining <= 3 ? "border-amber-500" : ""}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between">
                          <div>
                            <CardTitle>{book.title}</CardTitle>
                            <CardDescription>{book.author}</CardDescription>
                          </div>
                          <Badge
                            variant={daysRemaining <= 3 ? "outline" : "secondary"}
                            className={daysRemaining <= 3 ? "border-amber-500 text-amber-500" : ""}
                          >
                            {daysRemaining} days left
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span className="font-medium mr-2">Borrowed:</span>
                            <span>{formatDate(loan.borrowDate)}</span>
                          </div>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span className="font-medium mr-2">Due Date:</span>
                            <span>{formatDate(loan.dueDate)}</span>
                          </div>
                          {daysRemaining <= 3 && (
                            <div className="mt-2 p-2 bg-amber-500/10 rounded text-amber-600 text-xs">
                              <AlertTriangle className="h-3 w-3 inline-block mr-1" />
                              Return soon to avoid late fees (₹10/day)
                            </div>
                          )}
                        </div>
                        <div className="mt-4 flex gap-2">
                          <Button variant="outline" size="sm" asChild>
                            <a href={`/books/${book.id}`}>View Book</a>
                          </Button>
                          <Button size="sm">Renew Loan</Button>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          )}

          <div className="bg-primary/10 rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Library Policies</h2>
            <div className="space-y-4 text-sm">
              <div>
                <h3 className="font-medium">Loan Period</h3>
                <p>Books can be borrowed for 14 days. E-books automatically return after the lending period.</p>
              </div>
              <div>
                <h3 className="font-medium">Renewals</h3>
                <p>Books can be renewed twice if no one else has requested them.</p>
              </div>
              <div>
                <h3 className="font-medium">Fines</h3>
                <p>Overdue books incur a fine of ₹10 per day. Maximum fine is ₹500 per book.</p>
              </div>
              <div>
                <h3 className="font-medium">Borrowing Restrictions</h3>
                <p>
                  If you have books overdue for more than 7 days, your borrowing privileges will be suspended until the
                  books are returned and fines are paid.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
