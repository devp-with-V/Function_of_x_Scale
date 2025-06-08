"use client"

import type React from "react"
import { useState, useEffect, useRef, type ChangeEvent } from "react"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { GripVertical, Upload, Info, Copy, Check } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type ColorInfo = {
  color: string
  hex: string
  rgb: string
  hsl: string
  percentage: number
}

export default function ColorPaletteExtractor() {
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.style.backgroundColor = "black"
      document.body.style.backgroundColor = "black"
    }

    return () => {
      if (typeof document !== "undefined") {
        document.documentElement.style.backgroundColor = ""
        document.body.style.backgroundColor = ""
      }
    }
  }, [])

  const [colorCount, setColorCount] = useState(8)
  const [extractionMethod, setExtractionMethod] = useState("kmeans")
  const [sortBy, setSortBy] = useState("prominence")
  const [loading, setLoading] = useState(true)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [leftPanelWidth, setLeftPanelWidth] = useState(25)
  const [isDragging, setIsDragging] = useState(false)
  const [isDraggingFile, setIsDraggingFile] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isDesktop, setIsDesktop] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)
  const [sidebarNarrow, setSidebarNarrow] = useState(false)
  const [palette, setPalette] = useState<ColorInfo[]>([])
  const [copiedColor, setCopiedColor] = useState<string | null>(null)
  const [exportFormat, setExportFormat] = useState("hex")

  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imageRef = useRef<HTMLImageElement | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const previewRef = useRef<HTMLDivElement>(null)

  const extractionMethods = {
    kmeans: "K-Means Clustering",
    quantize: "Median Cut Quantization",
    dominant: "Dominant Colors",
  }

  const sortOptions = {
    prominence: "Prominence",
    brightness: "Brightness",
    hue: "Hue",
  }

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  useEffect(() => {
    if (!isHydrated) return

    setIsDesktop(window.innerWidth >= 768)

    const handleResize = () => {
      const newIsDesktop = window.innerWidth >= 768
      setIsDesktop(newIsDesktop)

      if (newIsDesktop !== isDesktop) {
        setLeftPanelWidth(25)
      }
    }

    window.addEventListener("resize", handleResize)
    loadDefaultImage()

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [isDesktop, isHydrated])

  useEffect(() => {
    if (!isHydrated || !isDesktop) return

    const checkSidebarWidth = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth
        const sidebarWidth = (leftPanelWidth / 100) * containerWidth
        setSidebarNarrow(sidebarWidth < 350)
      }
    }

    checkSidebarWidth()
    window.addEventListener("resize", checkSidebarWidth)

    return () => {
      window.removeEventListener("resize", checkSidebarWidth)
    }
  }, [leftPanelWidth, isHydrated, isDesktop])

  useEffect(() => {
    if (imageLoaded && imageRef.current) {
      extractColors()
    }
  }, [colorCount, extractionMethod, sortBy, imageLoaded])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect()
        const newLeftWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100

        if (newLeftWidth >= 20 && newLeftWidth <= 80) {
          setLeftPanelWidth(newLeftWidth)
        }
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging])

  const startDragging = () => {
    setIsDragging(true)
  }

  const loadDefaultImage = () => {
    setLoading(true)
    setError(null)
    setImageLoaded(false)

    const img = new Image()
    img.crossOrigin = "anonymous"

    img.onload = () => {
      if (img.width === 0 || img.height === 0) {
        setError("Invalid image dimensions")
        setLoading(false)
        return
      }

      imageRef.current = img
      setImageLoaded(true)
      setLoading(false)
    }

    img.onerror = () => {
      setError("Failed to load image")
      setLoading(false)
    }

    img.src =
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/CleanShot%202025-04-21%20at%2007.18.50%402x-dZYTCjkP7AhQCvCtNcNHt4amOQSwtX.png"
  }

  const loadImage = (src: string) => {
    setLoading(true)
    setError(null)
    setImageLoaded(false)

    const img = new Image()
    img.crossOrigin = "anonymous"

    img.onload = () => {
      if (img.width === 0 || img.height === 0) {
        setError("Invalid image dimensions")
        setLoading(false)
        return
      }

      imageRef.current = img
      setImageLoaded(true)
      setLoading(false)
    }

    img.onerror = () => {
      setError("Failed to load image")
      setLoading(false)
    }

    img.src = src
  }

  const handleFileUpload = (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file")
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      if (e.target?.result) {
        loadImage(e.target.result as string)
      }
    }
    reader.onerror = () => {
      setError("Failed to read file")
    }
    reader.readAsDataURL(file)
  }

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0])
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDraggingFile(true)
  }

  const handleDragLeave = () => {
    setIsDraggingFile(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDraggingFile(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0])
    }
  }

  // Convert RGB to HEX
  const rgbToHex = (r: number, g: number, b: number): string => {
    return "#" + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)
  }

  // Convert RGB to HSL
  const rgbToHsl = (r: number, g: number, b: number): string => {
    r /= 255
    g /= 255
    b /= 255

    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h = 0,
      s = 0
    const l = (max + min) / 2

    if (max !== min) {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0)
          break
        case g:
          h = (b - r) / d + 2
          break
        case b:
          h = (r - g) / d + 4
          break
      }
      h /= 6
    }

    return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`
  }

  // Calculate color brightness
  const getBrightness = (r: number, g: number, b: number): number => {
    return (r * 299 + g * 587 + b * 114) / 1000
  }

  // Calculate color hue
  const getHue = (r: number, g: number, b: number): number => {
    r /= 255
    g /= 255
    b /= 255

    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h = 0

    if (max !== min) {
      const d = max - min

      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0)
          break
        case g:
          h = (b - r) / d + 2
          break
        case b:
          h = (r - g) / d + 4
          break
      }
      h /= 6
    }

    return h * 360
  }

  // K-means clustering for color extraction
  const kMeansColorExtraction = (imageData: ImageData, k: number): ColorInfo[] => {
    const pixels: number[][] = []
    const data = imageData.data

    // Extract pixels
    for (let i = 0; i < data.length; i += 4) {
      pixels.push([data[i], data[i + 1], data[i + 2]])
    }

    // Initialize centroids randomly
    const centroids: number[][] = []
    for (let i = 0; i < k; i++) {
      const randomIndex = Math.floor(Math.random() * pixels.length)
      centroids.push([...pixels[randomIndex]])
    }

    // Assign pixels to clusters
    const assignments: number[] = new Array(pixels.length).fill(0)
    let changed = true
    let iterations = 0
    const maxIterations = 10

    while (changed && iterations < maxIterations) {
      changed = false
      iterations++

      // Assign each pixel to nearest centroid
      for (let i = 0; i < pixels.length; i++) {
        const pixel = pixels[i]
        let minDistance = Number.POSITIVE_INFINITY
        let closestCentroid = 0

        for (let j = 0; j < centroids.length; j++) {
          const centroid = centroids[j]
          const distance = Math.sqrt(
            Math.pow(pixel[0] - centroid[0], 2) +
              Math.pow(pixel[1] - centroid[1], 2) +
              Math.pow(pixel[2] - centroid[2], 2),
          )

          if (distance < minDistance) {
            minDistance = distance
            closestCentroid = j
          }
        }

        if (assignments[i] !== closestCentroid) {
          assignments[i] = closestCentroid
          changed = true
        }
      }

      // Update centroids
      const counts: number[] = new Array(k).fill(0)
      const newCentroids: number[][] = new Array(k).fill(0).map(() => [0, 0, 0])

      for (let i = 0; i < pixels.length; i++) {
        const cluster = assignments[i]
        counts[cluster]++
        newCentroids[cluster][0] += pixels[i][0]
        newCentroids[cluster][1] += pixels[i][1]
        newCentroids[cluster][2] += pixels[i][2]
      }

      for (let i = 0; i < k; i++) {
        if (counts[i] > 0) {
          centroids[i][0] = Math.round(newCentroids[i][0] / counts[i])
          centroids[i][1] = Math.round(newCentroids[i][1] / counts[i])
          centroids[i][2] = Math.round(newCentroids[i][2] / counts[i])
        }
      }
    }

    // Calculate color percentages
    const clusterCounts = new Array(k).fill(0)
    for (let i = 0; i < assignments.length; i++) {
      clusterCounts[assignments[i]]++
    }

    // Create color info objects
    const result: ColorInfo[] = []
    for (let i = 0; i < k; i++) {
      const [r, g, b] = centroids[i]
      const hex = rgbToHex(r, g, b)
      const rgb = `rgb(${r}, ${g}, ${b})`
      const hsl = rgbToHsl(r, g, b)
      const percentage = (clusterCounts[i] / pixels.length) * 100

      result.push({
        color: rgb,
        hex,
        rgb,
        hsl,
        percentage,
      })
    }

    return result
  }

  // Median cut quantization
  const medianCutQuantization = (imageData: ImageData, colorCount: number): ColorInfo[] => {
    const pixels: [number, number, number][] = []
    const data = imageData.data

    // Extract pixels
    for (let i = 0; i < data.length; i += 4) {
      pixels.push([data[i], data[i + 1], data[i + 2]])
    }

    // Recursive median cut
    const medianCut = (pixelList: [number, number, number][], depth: number): ColorInfo[] => {
      if (depth === 0 || pixelList.length <= 1) {
        // Calculate average color
        const avgR = Math.round(pixelList.reduce((sum, p) => sum + p[0], 0) / pixelList.length)
        const avgG = Math.round(pixelList.reduce((sum, p) => sum + p[1], 0) / pixelList.length)
        const avgB = Math.round(pixelList.reduce((sum, p) => sum + p[2], 0) / pixelList.length)

        const hex = rgbToHex(avgR, avgG, avgB)
        const rgb = `rgb(${avgR}, ${avgG}, ${avgB})`
        const hsl = rgbToHsl(avgR, avgG, avgB)
        const percentage = (pixelList.length / pixels.length) * 100

        return [
          {
            color: rgb,
            hex,
            rgb,
            hsl,
            percentage,
          },
        ]
      }

      // Find the channel with the greatest range
      const ranges = [0, 1, 2].map((channel) => {
        const values = pixelList.map((p) => p[channel])
        return Math.max(...values) - Math.min(...values)
      })

      const maxChannel = ranges.indexOf(Math.max(...ranges))

      // Sort by the channel with greatest range
      pixelList.sort((a, b) => a[maxChannel] - b[maxChannel])

      // Split at median
      const median = Math.floor(pixelList.length / 2)
      const left = pixelList.slice(0, median)
      const right = pixelList.slice(median)

      return [...medianCut(left, depth - 1), ...medianCut(right, depth - 1)]
    }

    const depth = Math.ceil(Math.log2(colorCount))
    return medianCut(pixels, depth).slice(0, colorCount)
  }

  // Extract dominant colors
  const extractDominantColors = (imageData: ImageData, colorCount: number): ColorInfo[] => {
    // Use a simplified approach for dominant colors
    // This is a basic implementation - a real algorithm would be more complex
    const pixelCounts: Record<string, { count: number; r: number; g: number; b: number }> = {}
    const data = imageData.data

    // Count pixel colors (with some rounding to group similar colors)
    for (let i = 0; i < data.length; i += 4) {
      // Skip transparent pixels
      if (data[i + 3] < 128) continue

      // Round to reduce unique colors
      const r = Math.round(data[i] / 10) * 10
      const g = Math.round(data[i + 1] / 10) * 10
      const b = Math.round(data[i + 2] / 10) * 10
      const key = `${r},${g},${b}`

      if (!pixelCounts[key]) {
        pixelCounts[key] = { count: 0, r, g, b }
      }
      pixelCounts[key].count++
    }

    // Convert to array and sort by count
    const colorArray = Object.values(pixelCounts).sort((a, b) => b.count - a.count)

    // Take top colors
    const totalPixels = data.length / 4
    const result: ColorInfo[] = []

    for (let i = 0; i < Math.min(colorCount, colorArray.length); i++) {
      const { r, g, b, count } = colorArray[i]
      const hex = rgbToHex(r, g, b)
      const rgb = `rgb(${r}, ${g}, ${b})`
      const hsl = rgbToHsl(r, g, b)
      const percentage = (count / totalPixels) * 100

      result.push({
        color: rgb,
        hex,
        rgb,
        hsl,
        percentage,
      })
    }

    return result
  }

  // Sort colors based on selected criteria
  const sortColors = (colors: ColorInfo[], sortMethod: string): ColorInfo[] => {
    const sortedColors = [...colors]

    switch (sortMethod) {
      case "prominence":
        sortedColors.sort((a, b) => b.percentage - a.percentage)
        break
      case "brightness":
        sortedColors.sort((a, b) => {
          const aMatch = a.rgb.match(/rgb$$(\d+), (\d+), (\d+)$$/)
          const bMatch = b.rgb.match(/rgb$$(\d+), (\d+), (\d+)$$/)
          if (aMatch && bMatch) {
            const aBrightness = getBrightness(
              Number.parseInt(aMatch[1]),
              Number.parseInt(aMatch[2]),
              Number.parseInt(aMatch[3]),
            )
            const bBrightness = getBrightness(
              Number.parseInt(bMatch[1]),
              Number.parseInt(bMatch[2]),
              Number.parseInt(bMatch[3]),
            )
            return bBrightness - aBrightness
          }
          return 0
        })
        break
      case "hue":
        sortedColors.sort((a, b) => {
          const aMatch = a.rgb.match(/rgb$$(\d+), (\d+), (\d+)$$/)
          const bMatch = b.rgb.match(/rgb$$(\d+), (\d+), (\d+)$$/)
          if (aMatch && bMatch) {
            const aHue = getHue(Number.parseInt(aMatch[1]), Number.parseInt(aMatch[2]), Number.parseInt(aMatch[3]))
            const bHue = getHue(Number.parseInt(bMatch[1]), Number.parseInt(bMatch[2]), Number.parseInt(bMatch[3]))
            return aHue - bHue
          }
          return 0
        })
        break
    }

    return sortedColors
  }

  const extractColors = () => {
    try {
      if (!canvasRef.current || !imageRef.current) {
        throw new Error("Canvas or image not available")
      }

      const img = imageRef.current
      if (img.width === 0 || img.height === 0) {
        throw new Error("Invalid image dimensions")
      }

      const canvas = canvasRef.current
      const ctx = canvas.getContext("2d")
      if (!ctx) {
        throw new Error("Could not get canvas context")
      }

      // Set canvas dimensions
      canvas.width = img.width
      canvas.height = img.height

      // Draw image to canvas
      ctx.drawImage(img, 0, 0)

      // Get image data
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)

      // Extract colors based on selected method
      let extractedColors: ColorInfo[] = []
      switch (extractionMethod) {
        case "kmeans":
          extractedColors = kMeansColorExtraction(imageData, colorCount)
          break
        case "quantize":
          extractedColors = medianCutQuantization(imageData, colorCount)
          break
        case "dominant":
          extractedColors = extractDominantColors(imageData, colorCount)
          break
      }

      // Sort colors
      const sortedColors = sortColors(extractedColors, sortBy)
      setPalette(sortedColors)
      setError(null)
    } catch (err) {
      console.error("Error extracting colors:", err)
      setError(err instanceof Error ? err.message : "Unknown error occurred")
      setPalette([])
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        setCopiedColor(text)
        setTimeout(() => setCopiedColor(null), 2000)
      },
      (err) => {
        console.error("Could not copy text: ", err)
      },
    )
  }

  const getColorValue = (color: ColorInfo): string => {
    switch (exportFormat) {
      case "hex":
        return color.hex
      case "rgb":
        return color.rgb
      case "hsl":
        return color.hsl
      default:
        return color.hex
    }
  }

  const downloadPalette = () => {
    if (palette.length === 0) {
      setError("No palette to download")
      return
    }

    let content = ""
    switch (exportFormat) {
      case "hex":
        content = palette.map((c) => c.hex).join("\n")
        break
      case "rgb":
        content = palette.map((c) => c.rgb).join("\n")
        break
      case "hsl":
        content = palette.map((c) => c.hsl).join("\n")
        break
      case "json":
        content = JSON.stringify(
          palette.map((c) => ({
            hex: c.hex,
            rgb: c.rgb,
            hsl: c.hsl,
            percentage: c.percentage.toFixed(2),
          })),
          null,
          2,
        )
        break
      case "css":
        content = `:root {\n${palette
          .map((c, i) => `  --color-${i + 1}: ${c.hex};`)
          .join("\n")}\n}\n\n/* RGB Values */\n:root {\n${palette
          .map((c, i) => `  --color-${i + 1}-rgb: ${c.rgb};`)
          .join("\n")}\n}`
        break
    }

    const element = document.createElement("a")
    const file = new Blob([content], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = `color-palette.${exportFormat === "json" ? "json" : "txt"}`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="min-h-screen w-full bg-black text-white">
      <div
        ref={containerRef}
        className="flex flex-col md:flex-row min-h-screen w-full overflow-hidden select-none"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {/* Color Palette Preview */}
        <div
          ref={previewRef}
          className={`order-1 md:order-2 flex-1 bg-black overflow-auto flex flex-col items-center justify-start p-4 ${
            isDraggingFile ? "bg-opacity-50" : ""
          } relative`}
          style={{
            ...(isHydrated && isDesktop
              ? {
                  width: `${100 - leftPanelWidth}%`,
                  marginLeft: `${leftPanelWidth}%`,
                }
              : {}),
          }}
        >
          {isDraggingFile && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 z-10 select-none">
              <div className="text-white text-xl font-mono">Drop image here</div>
            </div>
          )}
          {loading ? (
            <div className="text-white font-mono select-none">Loading image...</div>
          ) : error ? (
            <div className="text-red-400 font-mono p-4 text-center select-none">
              {error}
              <div className="mt-2 text-white text-sm">Try uploading a different image or refreshing the page.</div>
            </div>
          ) : (
            <div className="w-full max-w-4xl">
              {/* Image Preview */}
              <div className="mb-8 border border-stone-700 rounded-lg overflow-hidden">
                {imageRef.current && (
                  <img
                    src={imageRef.current.src || "/placeholder.svg"}
                    alt="Source"
                    className="w-full h-auto max-h-[300px] object-contain"
                  />
                )}
              </div>

              {/* Color Palette Display */}
              <div className="space-y-8">
                <h2 className="text-2xl font-mono text-white">Extracted Color Palette</h2>

                <Tabs defaultValue="grid" className="w-full">
                  <TabsList className="bg-stone-800 border border-stone-700">
                    <TabsTrigger value="grid">Grid View</TabsTrigger>
                    <TabsTrigger value="list">List View</TabsTrigger>
                    <TabsTrigger value="swatches">Swatches</TabsTrigger>
                  </TabsList>

                  {/* Grid View */}
                  <TabsContent value="grid" className="mt-4">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {palette.map((color, index) => (
                        <div
                          key={index}
                          className="bg-stone-900 border border-stone-700 rounded-lg overflow-hidden hover:border-stone-500 transition-colors"
                        >
                          <div
                            className="h-32 w-full"
                            style={{ backgroundColor: color.color }}
                            title={`Click to copy ${getColorValue(color)}`}
                            onClick={() => copyToClipboard(getColorValue(color))}
                          ></div>
                          <div className="p-3 space-y-1">
                            <div className="flex justify-between items-center">
                              <span className="font-mono text-sm">{color.hex}</span>
                              <button
                                onClick={() => copyToClipboard(getColorValue(color))}
                                className="text-stone-400 hover:text-white transition-colors"
                                title={`Copy ${getColorValue(color)}`}
                              >
                                {copiedColor === getColorValue(color) ? (
                                  <Check className="h-4 w-4" />
                                ) : (
                                  <Copy className="h-4 w-4" />
                                )}
                              </button>
                            </div>
                            <div className="text-xs text-stone-400">{Math.round(color.percentage)}% prominence</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  {/* List View */}
                  <TabsContent value="list" className="mt-4">
                    <div className="space-y-2">
                      {palette.map((color, index) => (
                        <div
                          key={index}
                          className="flex items-center bg-stone-900 border border-stone-700 rounded-lg p-3 hover:border-stone-500 transition-colors"
                        >
                          <div
                            className="h-10 w-10 rounded-md mr-4 flex-shrink-0"
                            style={{ backgroundColor: color.color }}
                          ></div>
                          <div className="flex-grow">
                            <div className="flex flex-wrap gap-3">
                              <span className="font-mono text-sm">{color.hex}</span>
                              <span className="font-mono text-sm text-stone-400">{color.rgb}</span>
                              <span className="font-mono text-sm text-stone-400">{color.hsl}</span>
                            </div>
                            <div className="text-xs text-stone-400 mt-1">
                              {Math.round(color.percentage)}% prominence
                            </div>
                          </div>
                          <button
                            onClick={() => copyToClipboard(getColorValue(color))}
                            className="text-stone-400 hover:text-white transition-colors ml-2"
                            title={`Copy ${getColorValue(color)}`}
                          >
                            {copiedColor === getColorValue(color) ? (
                              <Check className="h-4 w-4" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  {/* Swatches View */}
                  <TabsContent value="swatches" className="mt-4">
                    <div className="flex flex-wrap gap-2">
                      {palette.map((color, index) => (
                        <div
                          key={index}
                          className="group relative"
                          title={`${color.hex} - Click to copy`}
                          onClick={() => copyToClipboard(getColorValue(color))}
                        >
                          <div
                            className="h-16 w-16 rounded-md border border-stone-700 cursor-pointer hover:scale-110 transition-transform"
                            style={{ backgroundColor: color.color }}
                          ></div>
                          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-stone-800 px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            {color.hex}
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          )}
        </div>

        {/* Resizable divider */}
        {isHydrated && isDesktop && (
          <div
            className="order-3 w-2 bg-stone-800 hover:bg-stone-700 cursor-col-resize items-center justify-center z-10 transition-opacity duration-300"
            onMouseDown={startDragging}
            style={{
              position: "absolute",
              left: `${leftPanelWidth}%`,
              top: 0,
              bottom: 0,
              display: "flex",
            }}
          >
            <GripVertical className="h-6 w-6 text-stone-500" />
          </div>
        )}

        {/* Control Panel */}
        <div
          className={`order-2 md:order-1 w-full md:h-auto p-2 md:p-4 bg-stone-900 font-mono text-stone-300 transition-opacity duration-300 ${
            !isHydrated ? "opacity-0" : "opacity-100"
          }`}
          style={{
            width: "100%",
            height: "auto",
            flex: "0 0 auto",
            ...(isHydrated && isDesktop
              ? {
                  position: "absolute",
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: `${leftPanelWidth}%`,
                  overflowY: "auto",
                }
              : {}),
          }}
        >
          <div className="space-y-4 p-2 md:p-4 border border-stone-700 rounded-md">
            <div className="space-y-1">
              <h1 className="text-lg text-stone-100 font-bold">Color Palette Extractor</h1>
              <p className="text-xs text-stone-400">Extract and analyze dominant colors from images</p>
              {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
            </div>

            {/* Info Card */}
            <Card className="bg-stone-800 border-stone-600">
              <CardContent className="p-3">
                <div className="flex items-start space-x-2">
                  <Info className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                  <div className="text-xs text-stone-300">
                    <p className="font-semibold text-blue-400 mb-1">About Color Extraction</p>
                    <p>
                      This tool analyzes images to identify and extract key colors. Use different algorithms to find
                      dominant colors, create harmonious palettes, or extract exact color schemes.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Upload Section */}
            <div className="space-y-2 border-t border-stone-700 pt-4">
              <Label className="text-stone-300">Upload Image</Label>
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="palette-file-upload"
                  className="flex flex-col items-center justify-center w-full h-24 border-2 border-stone-600 border-dashed rounded-lg cursor-pointer bg-stone-800 hover:bg-stone-700 transition-colors"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-2 text-stone-400" />
                    <p className="mb-2 text-sm text-stone-400">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                  </div>
                  <input
                    id="palette-file-upload"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileInputChange}
                    ref={fileInputRef}
                  />
                </label>
              </div>
            </div>

            <div className="space-y-4 pt-2">
              <div className="space-y-2 border-t border-stone-700 pt-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="colorcount" className="text-stone-300">
                    Color Count: {colorCount}
                  </Label>
                </div>
                <Slider
                  id="colorcount"
                  min={2}
                  max={32}
                  step={1}
                  value={[colorCount]}
                  onValueChange={(value) => setColorCount(value[0])}
                  className="[&>span]:border-none [&_.bg-primary]:bg-stone-800 [&>.bg-background]:bg-stone-500/30"
                />
              </div>

              <div className="space-y-2 border-t border-stone-700 pt-4">
                <Label htmlFor="extractionmethod" className="text-stone-300">
                  Extraction Method
                </Label>
                <Select value={extractionMethod} onValueChange={setExtractionMethod}>
                  <SelectTrigger id="extractionmethod" className="bg-stone-800 border-stone-700 text-stone-300">
                    <SelectValue placeholder="Select extraction method" />
                  </SelectTrigger>
                  <SelectContent className="bg-stone-800 border-stone-700 text-stone-300">
                    {Object.entries(extractionMethods).map(([key, label]) => (
                      <SelectItem key={key} value={key} className="focus:bg-stone-700 focus:text-stone-100">
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 border-t border-stone-700 pt-4">
                <Label htmlFor="sortby" className="text-stone-300">
                  Sort Colors By
                </Label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger id="sortby" className="bg-stone-800 border-stone-700 text-stone-300">
                    <SelectValue placeholder="Select sort method" />
                  </SelectTrigger>
                  <SelectContent className="bg-stone-800 border-stone-700 text-stone-300">
                    {Object.entries(sortOptions).map(([key, label]) => (
                      <SelectItem key={key} value={key} className="focus:bg-stone-700 focus:text-stone-100">
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 border-t border-stone-700 pt-4">
                <Label htmlFor="exportformat" className="text-stone-300">
                  Export Format
                </Label>
                <Select value={exportFormat} onValueChange={setExportFormat}>
                  <SelectTrigger id="exportformat" className="bg-stone-800 border-stone-700 text-stone-300">
                    <SelectValue placeholder="Select export format" />
                  </SelectTrigger>
                  <SelectContent className="bg-stone-800 border-stone-700 text-stone-300">
                    <SelectItem value="hex" className="focus:bg-stone-700 focus:text-stone-100">
                      HEX (#RRGGBB)
                    </SelectItem>
                    <SelectItem value="rgb" className="focus:bg-stone-700 focus:text-stone-100">
                      RGB (rgb(r, g, b))
                    </SelectItem>
                    <SelectItem value="hsl" className="focus:bg-stone-700 focus:text-stone-100">
                      HSL (hsl(h, s%, l%))
                    </SelectItem>
                    <SelectItem value="json" className="focus:bg-stone-700 focus:text-stone-100">
                      JSON (All formats)
                    </SelectItem>
                    <SelectItem value="css" className="focus:bg-stone-700 focus:text-stone-100">
                      CSS Variables
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="hidden">
                <canvas ref={canvasRef} width="300" height="300"></canvas>
              </div>

              <div className="flex gap-2 pt-4 border-t border-stone-700">
                <Button
                  onClick={downloadPalette}
                  className="flex-1 bg-stone-700 hover:bg-stone-600 text-stone-200 border-stone-600"
                  disabled={loading || !imageLoaded || palette.length === 0}
                >
                  {sidebarNarrow ? "Download" : "Download Palette"}
                </Button>

                <Button
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-stone-700 hover:bg-stone-600 text-stone-200 border-stone-600"
                  title="Upload Image"
                >
                  <Upload className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
