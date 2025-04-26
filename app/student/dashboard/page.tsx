"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, BookOpen } from "lucide-react"
import { useLibrary } from "@/components/library-provider"
import { calculateDaysRemaining, formatDate } from "@/lib/utils"

export default function StudentDashboard() {
  const { loans, user } = useLibrary()
  const [activeTab, setActiveTab] = useState("current")

  // Filter loans for the current user
  const userLoans = loans.filter((loan) => loan.userId === user?.id)

  // Separate loans into current, history, and overdue
  const currentLoans = userLoans.filter((loan) => !loan.returned && !loan.isOverdue)
  const overdueLoans = userLoans.filter((loan) => !loan.returned && loan.isOverdue)
  const loanHistory = userLoans.filter((loan) => loan.returned)

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Student Dashboard</h1>
          <p className="text-muted-foreground">Manage your borrowed books and reading history</p>
        </div>
        <Card className="w-full md:w-auto">
          <CardContent className="p-4">
            <div className="flex justify-between gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold">{currentLoans.length + overdueLoans.length}</p>
                <p className="text-xs text-muted-foreground">Current</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-destructive">{overdueLoans.length}</p>
                <p className="text-xs text-muted-foreground">Overdue</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">{loanHistory.length}</p>
                <p className="text-xs text-muted-foreground">History</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="current">Current Loans</TabsTrigger>
          <TabsTrigger value="overdue">Overdue</TabsTrigger>
          <TabsTrigger value="history">Loan History</TabsTrigger>
        </TabsList>

        <TabsContent value="current">
          {currentLoans.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h2 className="text-xl font-semibold mb-2">No current loans</h2>
              <p className="text-muted-foreground mb-4">You don't have any books checked out at the moment.</p>
              <Button asChild>
                <a href="/catalog">Browse Catalog</a>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentLoans.map((loan) => {
                const book = loan.book
                const daysRemaining = calculateDaysRemaining(loan.dueDate)

                return (
                  <Card key={loan.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <div>
                          <CardTitle>{book.title}</CardTitle>
                          <CardDescription>{book.author}</CardDescription>
                        </div>
                        <Badge variant={daysRemaining <= 3 ? "outline" : "secondary"}>{daysRemaining} days left</Badge>
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
          )}
        </TabsContent>

        <TabsContent value="overdue">
          {overdueLoans.length === 0 ? (
            <div className="text-center py-12">
              <Clock className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h2 className="text-xl font-semibold mb-2">No overdue books</h2>
              <p className="text-muted-foreground">All your books are returned on time. Great job!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {overdueLoans.map((loan) => {
                const book = loan.book
                const daysOverdue = -calculateDaysRemaining(loan.dueDate)

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
                          <span>${(daysOverdue * 0.5).toFixed(2)}</span>
                        </div>
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
          )}
        </TabsContent>

        <TabsContent value="history">
          {loanHistory.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h2 className="text-xl font-semibold mb-2">No loan history</h2>
              <p className="text-muted-foreground mb-4">You haven't borrowed any books yet.</p>
              <Button asChild>
                <a href="/catalog">Browse Catalog</a>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {loanHistory.map((loan) => {
                const book = loan.book

                return (
                  <Card key={loan.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <div>
                          <CardTitle>{book.title}</CardTitle>
                          <CardDescription>{book.author}</CardDescription>
                        </div>
                        <Badge variant="outline">Returned</Badge>
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
                          <span className="font-medium mr-2">Returned:</span>
                          <span>{formatDate(loan.returnDate)}</span>
                        </div>
                      </div>
                      <div className="mt-4">
                        <Button variant="outline" size="sm" asChild>
                          <a href={`/books/${book.id}`}>View Book</a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
