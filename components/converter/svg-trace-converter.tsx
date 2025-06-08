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

export default function SvgTraceConverter() {
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

  const [threshold, setThreshold] = useState(128)
  const [smoothing, setSmoothing] = useState(1)
  const [colorMode, setColorMode] = useState("monochrome")
  const [colorCount, setColorCount] = useState(8)
  const [strokeWidth, setStrokeWidth] = useState(1)
  const [loading, setLoading] = useState(true)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [leftPanelWidth, setLeftPanelWidth] = useState(25)
  const [isDragging, setIsDragging] = useState(false)
  const [isDraggingFile, setIsDraggingFile] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isDesktop, setIsDesktop] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)
  const [sidebarNarrow, setSidebarNarrow] = useState(false)
  const [svgData, setSvgData] = useState<string>("")
  const [svgSize, setSvgSize] = useState({ width: 0, height: 0 })
  const [copiedSvg, setCopiedSvg] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imageRef = useRef<HTMLImageElement | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const previewRef = useRef<HTMLDivElement>(null)
  const svgPreviewRef = useRef<HTMLDivElement>(null)

  const colorModes = {
    monochrome: "Monochrome",
    grayscale: "Grayscale",
    color: "Full Color",
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
      convertToSvg()
    }
  }, [threshold, smoothing, colorMode, colorCount, strokeWidth, imageLoaded])

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

  // Potrace-like algorithm for monochrome tracing
  const traceMonochrome = (imageData: ImageData): string => {
    const { width, height, data } = imageData
    const paths: string[] = []

    // Convert to binary (black and white)
    const binaryData = new Uint8Array(width * height)
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const i = (y * width + x) * 4
        const avg = (data[i] + data[i + 1] + data[i + 2]) / 3
        binaryData[y * width + x] = avg < threshold ? 1 : 0
      }
    }

    // Simple contour tracing (marching squares-inspired)
    const visited = new Set<string>()

    for (let y = 0; y < height - 1; y++) {
      for (let x = 0; x < width - 1; x++) {
        const key = `${x},${y}`
        if (visited.has(key)) continue

        const i = y * width + x
        if (binaryData[i] === 1) {
          // Start a new path
          const path: [number, number][] = []
          let currentX = x
          let currentY = y
          let direction = 0 // 0: right, 1: down, 2: left, 3: up

          // Trace the contour
          const maxIterations = width * height // Safety limit
          let iterations = 0

          while (iterations < maxIterations) {
            iterations++
            path.push([currentX, currentY])
            visited.add(`${currentX},${currentY}`)

            // Try to turn right first, then straight, then left, then back
            let found = false
            for (let turn = 0; turn < 4; turn++) {
              const newDir = (direction + 3 - turn) % 4
              let newX = currentX
              let newY = currentY

              switch (newDir) {
                case 0:
                  newX++
                  break
                case 1:
                  newY++
                  break
                case 2:
                  newX--
                  break
                case 3:
                  newY--
                  break
              }

              // Check if the new position is valid and has a black pixel
              if (
                newX >= 0 &&
                newX < width &&
                newY >= 0 &&
                newY < height &&
                binaryData[newY * width + newX] === 1 &&
                !visited.has(`${newX},${newY}`)
              ) {
                currentX = newX
                currentY = newY
                direction = newDir
                found = true
                break
              }
            }

            if (!found || (path.length > 2 && currentX === path[0][0] && currentY === path[0][1])) {
              break
            }
          }

          // Simplify path using Ramer-Douglas-Peucker algorithm
          const simplifiedPath = simplifyPath(path, smoothing)

          // Convert to SVG path
          if (simplifiedPath.length > 2) {
            const svgPath = pathToSvg(simplifiedPath)
            paths.push(svgPath)
          }
        }
      }
    }

    // Create SVG with paths
    return paths.join(" ")
  }

  // Simplify path using Ramer-Douglas-Peucker algorithm
  const simplifyPath = (points: [number, number][], epsilon: number): [number, number][] => {
    if (points.length <= 2) return points

    // Find the point with the maximum distance
    let maxDistance = 0
    let maxIndex = 0

    const firstPoint = points[0]
    const lastPoint = points[points.length - 1]

    for (let i = 1; i < points.length - 1; i++) {
      const distance = perpendicularDistance(points[i], firstPoint, lastPoint)
      if (distance > maxDistance) {
        maxDistance = distance
        maxIndex = i
      }
    }

    // If max distance is greater than epsilon, recursively simplify
    if (maxDistance > epsilon) {
      const firstHalf = simplifyPath(points.slice(0, maxIndex + 1), epsilon)
      const secondHalf = simplifyPath(points.slice(maxIndex), epsilon)
      return [...firstHalf.slice(0, -1), ...secondHalf]
    } else {
      return [firstPoint, lastPoint]
    }
  }

  // Calculate perpendicular distance from a point to a line
  const perpendicularDistance = (
    point: [number, number],
    lineStart: [number, number],
    lineEnd: [number, number],
  ): number => {
    const [x, y] = point
    const [x1, y1] = lineStart
    const [x2, y2] = lineEnd

    const numerator = Math.abs((y2 - y1) * x - (x2 - x1) * y + x2 * y1 - y2 * x1)
    const denominator = Math.sqrt(Math.pow(y2 - y1, 2) + Math.pow(x2 - x1, 2))

    return numerator / denominator
  }

  // Convert path points to SVG path string
  const pathToSvg = (points: [number, number][]): string => {
    if (points.length === 0) return ""

    let path = `M${points[0][0]},${points[0][1]}`
    for (let i = 1; i < points.length; i++) {
      path += ` L${points[i][0]},${points[i][1]}`
    }
    path += " Z"
    return path
  }

  // Color quantization for color tracing
  const quantizeColors = (imageData: ImageData, numColors: number): string[] => {
    const pixels: [number, number, number][] = []
    const data = imageData.data

    // Extract all pixels
    for (let i = 0; i < data.length; i += 4) {
      pixels.push([data[i], data[i + 1], data[i + 2]])
    }

    // Median cut algorithm
    const medianCut = (pixelList: [number, number, number][], depth: number): string[] => {
      if (depth === 0 || pixelList.length <= 1) {
        // Calculate average color
        const avgR = Math.round(pixelList.reduce((sum, p) => sum + p[0], 0) / pixelList.length)
        const avgG = Math.round(pixelList.reduce((sum, p) => sum + p[1], 0) / pixelList.length)
        const avgB = Math.round(pixelList.reduce((sum, p) => sum + p[2], 0) / pixelList.length)
        return [rgbToHex(avgR, avgG, avgB)]
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

    const depth = Math.ceil(Math.log2(numColors))
    return medianCut(pixels, depth).slice(0, numColors)
  }

  // Create color layers for color tracing
  const createColorLayers = (imageData: ImageData, colors: string[]): string[] => {
    const { width, height, data } = imageData
    const layers: string[] = []

    for (const color of colors) {
      // Convert hex to RGB
      const r = Number.parseInt(color.slice(1, 3), 16)
      const g = Number.parseInt(color.slice(3, 5), 16)
      const b = Number.parseInt(color.slice(5, 7), 16)

      // Create a binary mask for this color
      const colorData = new ImageData(width, height)
      for (let i = 0; i < data.length; i += 4) {
        const pixelR = data[i]
        const pixelG = data[i + 1]
        const pixelB = data[i + 2]

        // Calculate color distance
        const distance = Math.sqrt(Math.pow(pixelR - r, 2) + Math.pow(pixelG - g, 2) + Math.pow(pixelB - b, 2))

        // If close enough to this color, mark as white, otherwise black
        const value = distance < 50 ? 255 : 0
        colorData.data[i] = value
        colorData.data[i + 1] = value
        colorData.data[i + 2] = value
        colorData.data[i + 3] = 255
      }

      // Trace this color layer
      const paths = traceMonochrome(colorData)
      if (paths) {
        layers.push(`<g fill="${color}" stroke="${color}" strokeWidth="${strokeWidth}">${paths}</g>`)
      }
    }

    return layers
  }

  const convertToSvg = () => {
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

      let svgContent = ""

      switch (colorMode) {
        case "monochrome":
          const monoPaths = traceMonochrome(imageData)
          svgContent = `<path d="${monoPaths}" fill="black" stroke="black" strokeWidth="${strokeWidth}"/>`
          break

        case "grayscale":
          // Create multiple layers for different gray levels
          const grayLevels = Math.min(colorCount, 8)
          const grayLayers: string[] = []

          for (let i = 0; i < grayLevels; i++) {
            const grayValue = Math.round((255 / (grayLevels - 1)) * i)
            const grayHex = rgbToHex(grayValue, grayValue, grayValue)

            // Create threshold for this gray level
            const grayThreshold = (255 / grayLevels) * (i + 1)
            const originalThreshold = threshold
            setThreshold(grayThreshold)

            const grayPaths = traceMonochrome(imageData)
            if (grayPaths) {
              grayLayers.push(
                `<path d="${grayPaths}" fill="${grayHex}" stroke="${grayHex}" strokeWidth="${strokeWidth}"/>`,
              )
            }

            setThreshold(originalThreshold)
          }

          svgContent = grayLayers.join("\n")
          break

        case "color":
          // Extract dominant colors and create layers
          const colors = quantizeColors(imageData, colorCount)
          const colorLayers = createColorLayers(imageData, colors)
          svgContent = colorLayers.join("\n")
          break
      }

      // Create complete SVG
      const svg = `<svg width="${img.width}" height="${img.height}" viewBox="0 0 ${img.width} ${img.height}" xmlns="http://www.w3.org/2000/svg">
${svgContent}
</svg>`

      setSvgData(svg)
      setSvgSize({ width: img.width, height: img.height })
      setError(null)
    } catch (err) {
      console.error("Error converting to SVG:", err)
      setError(err instanceof Error ? err.message : "Unknown error occurred")
      setSvgData("")
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        setCopiedSvg(true)
        setTimeout(() => setCopiedSvg(false), 2000)
      },
      (err) => {
        console.error("Could not copy text: ", err)
      },
    )
  }

  const downloadSvg = () => {
    if (!svgData) {
      setError("No SVG to download")
      return
    }

    const element = document.createElement("a")
    const file = new Blob([svgData], { type: "image/svg+xml" })
    element.href = URL.createObjectURL(file)
    element.download = "traced-image.svg"
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
        {/* SVG Preview */}
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
              <Tabs defaultValue="preview" className="w-full">
                <TabsList className="bg-stone-800 border border-stone-700 mb-4">
                  <TabsTrigger value="preview">SVG Preview</TabsTrigger>
                  <TabsTrigger value="code">SVG Code</TabsTrigger>
                  <TabsTrigger value="comparison">Comparison</TabsTrigger>
                </TabsList>

                {/* SVG Preview */}
                <TabsContent value="preview" className="mt-4">
                  <div className="border border-stone-700 rounded-lg p-4 bg-white">
                    {svgData && (
                      <div
                        ref={svgPreviewRef}
                        className="w-full flex justify-center"
                        dangerouslySetInnerHTML={{ __html: svgData }}
                      />
                    )}
                  </div>
                  <div className="mt-4 text-center text-stone-400 text-sm">
                    SVG Size: {svgSize.width} × {svgSize.height} pixels
                  </div>
                </TabsContent>

                {/* SVG Code */}
                <TabsContent value="code" className="mt-4">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-mono text-white">SVG Code</h3>
                      <Button
                        onClick={() => copyToClipboard(svgData)}
                        className="bg-stone-700 hover:bg-stone-600 text-white"
                        size="sm"
                      >
                        {copiedSvg ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                        {copiedSvg ? "Copied!" : "Copy SVG"}
                      </Button>
                    </div>
                    <div className="bg-stone-900 border border-stone-700 rounded-lg p-4 overflow-auto max-h-96">
                      <pre className="text-stone-300 text-sm whitespace-pre-wrap font-mono">{svgData}</pre>
                    </div>
                  </div>
                </TabsContent>

                {/* Comparison */}
                <TabsContent value="comparison" className="mt-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-lg font-mono text-white mb-2">Original</h3>
                      <div className="border border-stone-700 rounded-lg overflow-hidden">
                        {imageRef.current && (
                          <img
                            src={imageRef.current.src || "/placeholder.svg"}
                            alt="Original"
                            className="w-full h-auto"
                          />
                        )}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-mono text-white mb-2">SVG Trace</h3>
                      <div className="border border-stone-700 rounded-lg p-4 bg-white">
                        {svgData && <div dangerouslySetInnerHTML={{ __html: svgData }} />}
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
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
              <h1 className="text-lg text-stone-100 font-bold">SVG Trace Converter</h1>
              <p className="text-xs text-stone-400">Convert raster images to scalable vector graphics</p>
              {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
            </div>

            {/* Info Card */}
            <Card className="bg-stone-800 border-stone-600">
              <CardContent className="p-3">
                <div className="flex items-start space-x-2">
                  <Info className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                  <div className="text-xs text-stone-300">
                    <p className="font-semibold text-blue-400 mb-1">About SVG Tracing</p>
                    <p>
                      SVG tracing converts raster images into scalable vector graphics. The result is
                      resolution-independent and perfect for logos, icons, and illustrations.
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
                  htmlFor="svg-file-upload"
                  className="flex flex-col items-center justify-center w-full h-24 border-2 border-stone-600 border-dashed rounded-lg cursor-pointer bg-stone-800 hover:bg-stone-700 transition-colors"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-2 text-stone-400" />
                    <p className="mb-2 text-sm text-stone-400">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                  </div>
                  <input
                    id="svg-file-upload"
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
                <Label htmlFor="colormode" className="text-stone-300">
                  Color Mode
                </Label>
                <Select value={colorMode} onValueChange={setColorMode}>
                  <SelectTrigger id="colormode" className="bg-stone-800 border-stone-700 text-stone-300">
                    <SelectValue placeholder="Select color mode" />
                  </SelectTrigger>
                  <SelectContent className="bg-stone-800 border-stone-700 text-stone-300">
                    {Object.entries(colorModes).map(([key, label]) => (
                      <SelectItem key={key} value={key} className="focus:bg-stone-700 focus:text-stone-100">
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 border-t border-stone-700 pt-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="threshold" className="text-stone-300">
                    Threshold: {threshold}
                  </Label>
                </div>
                <Slider
                  id="threshold"
                  min={0}
                  max={255}
                  step={1}
                  value={[threshold]}
                  onValueChange={(value) => setThreshold(value[0])}
                  className="[&>span]:border-none [&_.bg-primary]:bg-stone-800 [&>.bg-background]:bg-stone-500/30"
                />
              </div>

              <div className="space-y-2 border-t border-stone-700 pt-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="smoothing" className="text-stone-300">
                    Smoothing: {smoothing}
                  </Label>
                </div>
                <Slider
                  id="smoothing"
                  min={0.1}
                  max={5}
                  step={0.1}
                  value={[smoothing]}
                  onValueChange={(value) => setSmoothing(value[0])}
                  className="[&>span]:border-none [&_.bg-primary]:bg-stone-800 [&>.bg-background]:bg-stone-500/30"
                />
              </div>

              {(colorMode === "color" || colorMode === "grayscale") && (
                <div className="space-y-2 border-t border-stone-700 pt-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="colorcount" className="text-stone-300">
                      Color Count: {colorCount}
                    </Label>
                  </div>
                  <Slider
                    id="colorcount"
                    min={2}
                    max={16}
                    step={1}
                    value={[colorCount]}
                    onValueChange={(value) => setColorCount(value[0])}
                    className="[&>span]:border-none [&_.bg-primary]:bg-stone-800 [&>.bg-background]:bg-stone-500/30"
                  />
                </div>
              )}

              <div className="space-y-2 border-t border-stone-700 pt-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="strokewidth" className="text-stone-300">
                    Stroke Width: {strokeWidth}
                  </Label>
                </div>
                <Slider
                  id="strokewidth"
                  min={0}
                  max={5}
                  step={0.1}
                  value={[strokeWidth]}
                  onValueChange={(value) => setStrokeWidth(value[0])}
                  className="[&>span]:border-none [&_.bg-primary]:bg-stone-800 [&>.bg-background]:bg-stone-500/30"
                />
              </div>

              <div className="hidden">
                <canvas ref={canvasRef} width="300" height="300"></canvas>
              </div>

              <div className="flex gap-2 pt-4 border-t border-stone-700">
                <Button
                  onClick={downloadSvg}
                  className="flex-1 bg-stone-700 hover:bg-stone-600 text-stone-200 border-stone-600"
                  disabled={loading || !imageLoaded || !svgData}
                >
                  {sidebarNarrow ? "Download" : "Download SVG"}
                </Button>

                <Button
                  onClick={() => copyToClipboard(svgData)}
                  className="bg-stone-700 hover:bg-stone-600 text-stone-200 border-stone-600"
                  title="Copy SVG Code"
                  disabled={!svgData}
                >
                  {copiedSvg ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
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
