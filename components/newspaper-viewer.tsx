"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize, Minimize } from "lucide-react"

export function NewspaperViewer({ newspaper }) {
  const [currentPage, setCurrentPage] = useState(1)
  const [zoom, setZoom] = useState(1)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const totalPages = 5 // Mock total pages

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handleZoomIn = () => {
    if (zoom < 2) {
      setZoom(zoom + 0.1)
    }
  }

  const handleZoomOut = () => {
    if (zoom > 0.5) {
      setZoom(zoom - 0.1)
    }
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  return (
    <Card className={`${isFullscreen ? "fixed inset-0 z-50 rounded-none" : "relative"}`}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl">
          {newspaper.title} - Page {currentPage} of {totalPages}
        </CardTitle>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={handleZoomOut}>
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={handleZoomIn}>
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={toggleFullscreen}>
            {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div
          className="bg-muted rounded-md p-4 min-h-[500px] flex items-center justify-center overflow-auto"
          style={{ transform: `scale(${zoom})`, transformOrigin: "center center" }}
        >
          {/* This would be replaced with an actual PDF viewer or embedded content */}
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">{newspaper.title}</h2>
            <p className="text-muted-foreground mb-2">
              Published: {new Date(newspaper.dateAdded).toLocaleDateString()}
            </p>
            <div className="max-w-2xl mx-auto">
              <p className="mb-4">{newspaper.description}</p>
              <p className="text-muted-foreground">
                This is a sample newspaper content. In a real implementation, this would be replaced with an embedded
                PDF viewer or a custom newspaper layout with actual content.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center mt-4 space-x-2">
          <Button variant="outline" size="sm" onClick={handlePrevPage} disabled={currentPage === 1}>
            <ChevronLeft className="h-4 w-4 mr-1" /> Previous
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </span>
          <Button variant="outline" size="sm" onClick={handleNextPage} disabled={currentPage === totalPages}>
            Next <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
