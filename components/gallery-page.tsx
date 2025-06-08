"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2, Download, Eye } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

type GalleryItem = {
  id: string
  originalImage: string
  asciiArt: string
  timestamp: number
  settings: {
    resolution: number
    charSet: string
    inverted: boolean
    grayscale: boolean
  }
}

export default function GalleryPage() {
  const pathname = usePathname()
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([])
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null)

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.style.backgroundColor = "black"
      document.body.style.backgroundColor = "black"
    }

    // Load gallery items from localStorage
    const savedItems = localStorage.getItem("fx-scale-gallery")
    if (savedItems) {
      setGalleryItems(JSON.parse(savedItems))
    }

    return () => {
      if (typeof document !== "undefined") {
        document.documentElement.style.backgroundColor = ""
        document.body.style.backgroundColor = ""
      }
    }
  }, [])

  const deleteItem = (id: string) => {
    const updatedItems = galleryItems.filter((item) => item.id !== id)
    setGalleryItems(updatedItems)
    localStorage.setItem("fx-scale-gallery", JSON.stringify(updatedItems))
    if (selectedItem?.id === id) {
      setSelectedItem(null)
    }
  }

  const downloadAscii = (item: GalleryItem) => {
    const element = document.createElement("a")
    const file = new Blob([item.asciiArt], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = `ascii-art-${item.id}.txt`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const clearGallery = () => {
    setGalleryItems([])
    setSelectedItem(null)
    localStorage.removeItem("fx-scale-gallery")
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link
              href="/"
              className="text-xl font-mono font-bold text-white relative group transition-all duration-300"
            >
              <span className="relative z-10">F(x) scale</span>
              <div className="absolute inset-0 bg-stone-700/20 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 -m-2"></div>
            </Link>
            <div className="hidden md:flex space-x-8">
              <Link
                href="/"
                className={`font-mono transition-all duration-300 relative ${
                  pathname === "/"
                    ? "text-white shadow-[0_0_10px_rgba(168,162,158,0.5)]"
                    : "text-stone-300 hover:text-white"
                }`}
              >
                Home
              </Link>
              <Link
                href="/converter"
                className={`font-mono transition-all duration-300 relative ${
                  pathname === "/converter"
                    ? "text-white shadow-[0_0_10px_rgba(168,162,158,0.5)]"
                    : "text-stone-300 hover:text-white"
                }`}
              >
                Converter
              </Link>
              <Link
                href="/about"
                className={`font-mono transition-all duration-300 relative ${
                  pathname === "/about"
                    ? "text-white shadow-[0_0_10px_rgba(168,162,158,0.5)]"
                    : "text-stone-300 hover:text-white"
                }`}
              >
                About
              </Link>
              <Link
                href="/gallery"
                className={`font-mono transition-all duration-300 relative ${
                  pathname === "/gallery"
                    ? "text-white shadow-[0_0_10px_rgba(168,162,158,0.5)]"
                    : "text-stone-300 hover:text-white"
                }`}
              >
                Gallery
              </Link>
              <Link
                href="/docs"
                className={`font-mono transition-all duration-300 relative ${
                  pathname === "/docs"
                    ? "text-white shadow-[0_0_10px_rgba(168,162,158,0.5)]"
                    : "text-stone-300 hover:text-white"
                }`}
              >
                Docs
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold font-mono text-white mb-2">Gallery</h1>
              <p className="text-stone-300">Your converted ASCII art collection</p>
            </div>
            {galleryItems.length > 0 && (
              <Button
                onClick={clearGallery}
                variant="outline"
                className="bg-red-900/20 border-red-700 text-red-300 hover:bg-red-900/40"
              >
                Clear All
              </Button>
            )}
          </div>

          {galleryItems.length === 0 ? (
            <Card className="bg-stone-900 border-stone-700">
              <CardContent className="p-12 text-center">
                <div className="text-stone-400 mb-4">
                  <Eye className="h-16 w-16 mx-auto mb-4" />
                </div>
                <h3 className="text-xl font-mono text-white mb-2">No items in gallery</h3>
                <p className="text-stone-300 mb-6">Start converting images to build your ASCII art collection</p>
                <Link href="/converter">
                  <Button className="bg-stone-700 hover:bg-stone-600 text-white">Go to Converter</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Gallery Grid */}
              <div className="space-y-4">
                <h2 className="text-xl font-mono text-white mb-4">Saved Items ({galleryItems.length})</h2>
                <div className="grid gap-4">
                  {galleryItems.map((item) => (
                    <Card
                      key={item.id}
                      className={`bg-stone-900 border-stone-700 cursor-pointer transition-colors ${
                        selectedItem?.id === item.id ? "border-stone-500" : "hover:border-stone-600"
                      }`}
                      onClick={() => setSelectedItem(item)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <img
                              src={item.originalImage || "/placeholder.svg"}
                              alt="Original"
                              className="w-16 h-16 object-cover rounded border border-stone-600"
                            />
                            <div>
                              <p className="text-white font-mono text-sm">
                                {new Date(item.timestamp).toLocaleDateString()}
                              </p>
                              <p className="text-stone-400 text-xs">
                                {item.settings.charSet} • {item.settings.resolution.toFixed(2)}x
                              </p>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={(e) => {
                                e.stopPropagation()
                                downloadAscii(item)
                              }}
                              className="text-stone-400 hover:text-white"
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={(e) => {
                                e.stopPropagation()
                                deleteItem(item.id)
                              }}
                              className="text-red-400 hover:text-red-300"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Preview Panel */}
              <div className="lg:sticky lg:top-24">
                {selectedItem ? (
                  <Card className="bg-stone-900 border-stone-700">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-mono text-white">Preview</h3>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            onClick={() => downloadAscii(selectedItem)}
                            className="bg-stone-700 hover:bg-stone-600"
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <p className="text-stone-400 text-sm mb-2">Original Image</p>
                          <img
                            src={selectedItem.originalImage || "/placeholder.svg"}
                            alt="Original"
                            className="w-full max-w-xs rounded border border-stone-600"
                          />
                        </div>

                        <div>
                          <p className="text-stone-400 text-sm mb-2">ASCII Output</p>
                          <div className="bg-black rounded p-4 overflow-auto max-h-96 border border-stone-700">
                            <pre className="text-stone-300 text-xs leading-none font-mono whitespace-pre-wrap">
                              {selectedItem.asciiArt}
                            </pre>
                          </div>
                        </div>

                        <div>
                          <p className="text-stone-400 text-sm mb-2">Settings Used</p>
                          <div className="text-xs text-stone-300 space-y-1">
                            <p>Resolution: {selectedItem.settings.resolution.toFixed(2)}x</p>
                            <p>Character Set: {selectedItem.settings.charSet}</p>
                            <p>Mode: {selectedItem.settings.grayscale ? "Grayscale" : "Color"}</p>
                            <p>Inverted: {selectedItem.settings.inverted ? "Yes" : "No"}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="bg-stone-900 border-stone-700">
                    <CardContent className="p-12 text-center">
                      <Eye className="h-12 w-12 text-stone-400 mx-auto mb-4" />
                      <p className="text-stone-300">Select an item to preview</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
