"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ModeToggle } from "@/components/mode-toggle"
import { Menu } from "lucide-react"
import { CCETLogo } from "@/components/ccet-logo"

export function Header() {
  const [activeTab, setActiveTab] = useState("")

  // Load last visited tab from localStorage
  useEffect(() => {
    const lastTab = localStorage.getItem("lastVisitedTab")
    if (lastTab) {
      setActiveTab(lastTab)
    }
  }, [])

  // Save active tab to localStorage
  const handleTabClick = (tab) => {
    setActiveTab(tab)
    localStorage.setItem("lastVisitedTab", tab)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="flex items-center space-x-2" onClick={() => handleTabClick("")}>
            <CCETLogo />
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="hidden md:flex items-center space-x-4">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors hover:text-primary ${activeTab === "" ? "text-primary" : ""}`}
              onClick={() => handleTabClick("")}
            >
              Home
            </Link>
            <Link
              href="/all-books"
              className={`text-sm font-medium transition-colors hover:text-primary ${activeTab === "all-books" ? "text-primary" : ""}`}
              onClick={() => handleTabClick("all-books")}
            >
              All Books
            </Link>
            <Link
              href="/academic"
              className={`text-sm font-medium transition-colors hover:text-primary ${activeTab === "academic" ? "text-primary" : ""}`}
              onClick={() => handleTabClick("academic")}
            >
              Academic
            </Link>
            <Link
              href="/newspapers"
              className={`text-sm font-medium transition-colors hover:text-primary ${activeTab === "newspapers" ? "text-primary" : ""}`}
              onClick={() => handleTabClick("newspapers")}
            >
              Newspapers
            </Link>
            <Link
              href="/novels"
              className={`text-sm font-medium transition-colors hover:text-primary ${activeTab === "novels" ? "text-primary" : ""}`}
              onClick={() => handleTabClick("novels")}
            >
              Novels
            </Link>
            <Link
              href="/papers"
              className={`text-sm font-medium transition-colors hover:text-primary ${activeTab === "papers" ? "text-primary" : ""}`}
              onClick={() => handleTabClick("papers")}
            >
              Previous Papers
            </Link>
          </nav>
          <div className="flex items-center space-x-2">
            <ModeToggle />
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <Link href="/" className="flex items-center space-x-2 mb-6" onClick={() => handleTabClick("")}>
                  <CCETLogo />
                </Link>
                <nav className="flex flex-col space-y-4">
                  <Link
                    href="/"
                    className={`text-sm font-medium transition-colors hover:text-primary ${activeTab === "" ? "text-primary" : ""}`}
                    onClick={() => handleTabClick("")}
                  >
                    Home
                  </Link>
                  <Link
                    href="/all-books"
                    className={`text-sm font-medium transition-colors hover:text-primary ${activeTab === "all-books" ? "text-primary" : ""}`}
                    onClick={() => handleTabClick("all-books")}
                  >
                    All Books
                  </Link>
                  <Link
                    href="/academic"
                    className={`text-sm font-medium transition-colors hover:text-primary ${activeTab === "academic" ? "text-primary" : ""}`}
                    onClick={() => handleTabClick("academic")}
                  >
                    Academic
                  </Link>
                  <Link
                    href="/newspapers"
                    className={`text-sm font-medium transition-colors hover:text-primary ${activeTab === "newspapers" ? "text-primary" : ""}`}
                    onClick={() => handleTabClick("newspapers")}
                  >
                    Newspapers
                  </Link>
                  <Link
                    href="/novels"
                    className={`text-sm font-medium transition-colors hover:text-primary ${activeTab === "novels" ? "text-primary" : ""}`}
                    onClick={() => handleTabClick("novels")}
                  >
                    Novels
                  </Link>
                  <Link
                    href="/papers"
                    className={`text-sm font-medium transition-colors hover:text-primary ${activeTab === "papers" ? "text-primary" : ""}`}
                    onClick={() => handleTabClick("papers")}
                  >
                    Previous Papers
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
