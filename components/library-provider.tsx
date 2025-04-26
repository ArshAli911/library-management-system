"use client"

import { createContext, useContext, useState } from "react"
import { books as initialBooks, users as initialUsers, loans as initialLoans } from "@/lib/data"

const LibraryContext = createContext(null)

export function LibraryProvider({ children }) {
  const [books, setBooks] = useState(initialBooks)
  const [users] = useState(initialUsers)
  const [loans, setLoans] = useState(initialLoans)
  const [user, setUser] = useState(null) // Start with no logged in user

  // Login function
  const login = (email, password) => {
    // In a real app, you would validate the password
    const foundUser = users.find((u) => u.email === email)
    if (foundUser) {
      setUser(foundUser)
      return true
    }
    return false
  }

  // Logout function
  const logout = () => {
    setUser(null)
  }

  // Add a new book
  const addBook = (newBook) => {
    setBooks((prevBooks) => [...prevBooks, newBook])
  }

  // Update a book
  const updateBook = (updatedBook) => {
    setBooks((prevBooks) => prevBooks.map((book) => (book.id === updatedBook.id ? updatedBook : book)))
  }

  // Check if user can borrow books (no overdue books with fines > 7 days)
  const canBorrowBooks = (userId) => {
    const userOverdueLoans = loans.filter(
      (loan) => loan.userId === userId && !loan.returned && loan.isOverdue && loan.daysOverdue > 7,
    )
    return userOverdueLoans.length === 0
  }

  // Calculate fine for overdue book (Rs. 10 per day)
  const calculateFine = (dueDate) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const due = new Date(dueDate)
    due.setHours(0, 0, 0, 0)

    if (today <= due) return 0

    const diffTime = today.getTime() - due.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays * 10 // Rs. 10 per day
  }

  // Issue a book to a student
  const issueBook = (newLoan) => {
    // Check if user can borrow books
    if (!canBorrowBooks(newLoan.userId)) {
      throw new Error("Cannot issue book. User has overdue books with fines pending for more than 7 days.")
    }

    // Update the book availability
    setBooks((prevBooks) =>
      prevBooks.map((book) => (book.id === newLoan.bookId ? { ...book, available: false } : book)),
    )

    // Add the new loan
    setLoans((prevLoans) => [...prevLoans, { ...newLoan, fine: 0, daysOverdue: 0 }])
  }

  // Return a book
  const returnBook = (loanId) => {
    // Find the loan
    const loan = loans.find((loan) => loan.id === loanId)
    if (!loan) return

    // Calculate fine if overdue
    const fine = calculateFine(loan.dueDate)
    const daysOverdue = fine > 0 ? Math.ceil(fine / 10) : 0

    // Update the loan
    setLoans((prevLoans) =>
      prevLoans.map((loan) =>
        loan.id === loanId
          ? {
              ...loan,
              returned: true,
              returnDate: new Date().toISOString(),
              fine: fine,
              daysOverdue: daysOverdue,
            }
          : loan,
      ),
    )

    // Update the book availability
    setBooks((prevBooks) => prevBooks.map((book) => (book.id === loan.bookId ? { ...book, available: true } : book)))
  }

  // Pay fine
  const payFine = (loanId) => {
    setLoans((prevLoans) => prevLoans.map((loan) => (loan.id === loanId ? { ...loan, fine: 0 } : loan)))
  }

  // Update fines for all overdue books
  const updateFines = () => {
    setLoans((prevLoans) =>
      prevLoans.map((loan) => {
        if (!loan.returned && loan.isOverdue) {
          const fine = calculateFine(loan.dueDate)
          const daysOverdue = Math.ceil(fine / 10)
          return { ...loan, fine: fine, daysOverdue: daysOverdue }
        }
        return loan
      }),
    )
  }

  // Check for overdue books and update their status
  const checkOverdueBooks = () => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    setLoans((prevLoans) =>
      prevLoans.map((loan) => {
        if (!loan.returned) {
          const dueDate = new Date(loan.dueDate)
          dueDate.setHours(0, 0, 0, 0)

          if (today > dueDate) {
            const diffTime = today.getTime() - dueDate.getTime()
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
            return {
              ...loan,
              isOverdue: true,
              fine: diffDays * 10,
              daysOverdue: diffDays,
            }
          }
        }
        return loan
      }),
    )
  }

  // Subscribe to newsletter
  const subscribeToNewsletter = (email) => {
    // In a real app, you would save this to a database
    console.log(`Subscribed ${email} to newsletter`)
    return true
  }

  return (
    <LibraryContext.Provider
      value={{
        books,
        users,
        loans,
        user,
        login,
        logout,
        addBook,
        updateBook,
        issueBook,
        returnBook,
        payFine,
        updateFines,
        checkOverdueBooks,
        canBorrowBooks,
        calculateFine,
        subscribeToNewsletter,
      }}
    >
      {children}
    </LibraryContext.Provider>
  )
}

export function useLibrary() {
  const context = useContext(LibraryContext)
  if (!context) {
    throw new Error("useLibrary must be used within a LibraryProvider")
  }
  return context
}
