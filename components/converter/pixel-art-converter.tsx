"use client"

import type React from "react"
import { useState, useEffect, useRef, type ChangeEvent } from "react"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { GripVertical, Upload, Info, Palette } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function PixelArtConverter() {
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

  const [pixelSize, setPixelSize] = useState(8)
  const [colorCount, setColorCount] = useState(16)
  const [ditheringEnabled, setDitheringEnabled] = useState(false)
  const [ditheringMethod, setDitheringMethod] = useState("floyd-steinberg")
  const [smoothing, setSmoothing] = useState(false)
  const [contrastBoost, setContrastBoost] = useState(1.0)
  const [saturationBoost, setSaturationBoost] = useState(1.0)
  const [loading, setLoading] = useState(true)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [leftPanelWidth, setLeftPanelWidth] = useState(25)
  const [isDragging, setIsDragging] = useState(false)
  const [isDraggingFile, setIsDraggingFile] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isDesktop, setIsDesktop] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)
  const [sidebarNarrow, setSidebarNarrow] = useState(false)
  const [colorPalette, setColorPalette] = useState<string[]>([])

  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const outputCanvasRef = useRef<HTMLCanvasElement>(null)
  const imageRef = useRef<HTMLImageElement | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const previewRef = useRef<HTMLDivElement>(null)

  const ditheringMethods = {
    "floyd-steinberg": "Floyd-Steinberg",
    atkinson: "Atkinson",
    ordered: "Ordered Dithering",
    random: "Random Dithering",
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
      convertToPixelArt()
    }
  }, [pixelSize, colorCount, ditheringEnabled, ditheringMethod, smoothing, contrastBoost, saturationBoost, imageLoaded])

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

  // Color quantization using median cut algorithm
  const quantizeColors = (imageData: ImageData, numColors: number): string[] => {
    const pixels: [number, number, number][] = []

    // Extract all pixels
    for (let i = 0; i < imageData.data.length; i += 4) {
      pixels.push([
        imageData.data[i], // R
        imageData.data[i + 1], // G
        imageData.data[i + 2], // B
      ])
    }

    // Median cut algorithm
    const medianCut = (pixelList: [number, number, number][], depth: number): string[] => {
      if (depth === 0 || pixelList.length <= 1) {
        // Calculate average color
        const avgR = Math.round(pixelList.reduce((sum, p) => sum + p[0], 0) / pixelList.length)
        const avgG = Math.round(pixelList.reduce((sum, p) => sum + p[1], 0) / pixelList.length)
        const avgB = Math.round(pixelList.reduce((sum, p) => sum + p[2], 0) / pixelList.length)
        return [`rgb(${avgR}, ${avgG}, ${avgB})`]
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

  // Find closest color in palette
  const findClosestColor = (r: number, g: number, b: number, palette: string[]): string => {
    let minDistance = Number.POSITIVE_INFINITY
    let closestColor = palette[0]

    for (const color of palette) {
      const match = color.match(/rgb$$(\d+), (\d+), (\d+)$$/)
      if (match) {
        const [, pr, pg, pb] = match.map(Number)
        const distance = Math.sqrt(Math.pow(r - pr, 2) + Math.pow(g - pg, 2) + Math.pow(b - pb, 2))
        if (distance < minDistance) {
          minDistance = distance
          closestColor = color
        }
      }
    }

    return closestColor
  }

  // Floyd-Steinberg dithering
  const applyFloydSteinbergDithering = (
    imageData: ImageData,
    palette: string[],
    width: number,
    height: number,
  ): ImageData => {
    const data = new Uint8ClampedArray(imageData.data)

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = (y * width + x) * 4
        const oldR = data[idx]
        const oldG = data[idx + 1]
        const oldB = data[idx + 2]

        const newColor = findClosestColor(oldR, oldG, oldB, palette)
        const match = newColor.match(/rgb$$(\d+), (\d+), (\d+)$$/)

        if (match) {
          const [, newR, newG, newB] = match.map(Number)

          data[idx] = newR
          data[idx + 1] = newG
          data[idx + 2] = newB

          const errR = oldR - newR
          const errG = oldG - newG
          const errB = oldB - newB

          // Distribute error to neighboring pixels
          const distributeError = (dx: number, dy: number, factor: number) => {
            const nx = x + dx
            const ny = y + dy
            if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
              const nIdx = (ny * width + nx) * 4
              data[nIdx] = Math.max(0, Math.min(255, data[nIdx] + errR * factor))
              data[nIdx + 1] = Math.max(0, Math.min(255, data[nIdx + 1] + errG * factor))
              data[nIdx + 2] = Math.max(0, Math.min(255, data[nIdx + 2] + errB * factor))
            }
          }

          distributeError(1, 0, 7 / 16)
          distributeError(-1, 1, 3 / 16)
          distributeError(0, 1, 5 / 16)
          distributeError(1, 1, 1 / 16)
        }
      }
    }

    return new ImageData(data, width, height)
  }

  // Apply contrast and saturation adjustments
  const adjustImageProperties = (imageData: ImageData): ImageData => {
    const data = new Uint8ClampedArray(imageData.data)

    for (let i = 0; i < data.length; i += 4) {
      let r = data[i]
      let g = data[i + 1]
      let b = data[i + 2]

      // Apply contrast
      r = Math.max(0, Math.min(255, (r - 128) * contrastBoost + 128))
      g = Math.max(0, Math.min(255, (g - 128) * contrastBoost + 128))
      b = Math.max(0, Math.min(255, (b - 128) * contrastBoost + 128))

      // Apply saturation
      const gray = 0.299 * r + 0.587 * g + 0.114 * b
      r = Math.max(0, Math.min(255, gray + (r - gray) * saturationBoost))
      g = Math.max(0, Math.min(255, gray + (g - gray) * saturationBoost))
      b = Math.max(0, Math.min(255, gray + (b - gray) * saturationBoost))

      data[i] = r
      data[i + 1] = g
      data[i + 2] = b
    }

    return new ImageData(data, imageData.width, imageData.height)
  }

  const convertToPixelArt = () => {
    try {
      if (!canvasRef.current || !outputCanvasRef.current || !imageRef.current) {
        throw new Error("Canvas or image not available")
      }

      const img = imageRef.current
      if (img.width === 0 || img.height === 0) {
        throw new Error("Invalid image dimensions")
      }

      const canvas = canvasRef.current
      const outputCanvas = outputCanvasRef.current
      const ctx = canvas.getContext("2d")
      const outputCtx = outputCanvas.getContext("2d")

      if (!ctx || !outputCtx) {
        throw new Error("Could not get canvas context")
      }

      // Calculate pixelated dimensions
      const pixelatedWidth = Math.floor(img.width / pixelSize)
      const pixelatedHeight = Math.floor(img.height / pixelSize)

      // Set up working canvas
      canvas.width = pixelatedWidth
      canvas.height = pixelatedHeight

      // Disable smoothing for pixelated effect
      ctx.imageSmoothingEnabled = smoothing
      ctx.drawImage(img, 0, 0, pixelatedWidth, pixelatedHeight)

      // Get image data
      let imageData = ctx.getImageData(0, 0, pixelatedWidth, pixelatedHeight)

      // Apply contrast and saturation adjustments
      imageData = adjustImageProperties(imageData)

      // Generate color palette
      const palette = quantizeColors(imageData, colorCount)
      setColorPalette(palette)

      // Apply dithering if enabled
      if (ditheringEnabled && ditheringMethod === "floyd-steinberg") {
        imageData = applyFloydSteinbergDithering(imageData, palette, pixelatedWidth, pixelatedHeight)
      } else if (ditheringEnabled) {
        // Apply color quantization without dithering
        const data = imageData.data
        for (let i = 0; i < data.length; i += 4) {
          const closestColor = findClosestColor(data[i], data[i + 1], data[i + 2], palette)
          const match = closestColor.match(/rgb$$(\d+), (\d+), (\d+)$$/)
          if (match) {
            const [, r, g, b] = match.map(Number)
            data[i] = r
            data[i + 1] = g
            data[i + 2] = b
          }
        }
      }

      // Put processed data back
      ctx.putImageData(imageData, 0, 0)

      // Scale up to output canvas
      const outputWidth = pixelatedWidth * pixelSize
      const outputHeight = pixelatedHeight * pixelSize

      outputCanvas.width = outputWidth
      outputCanvas.height = outputHeight

      // Disable smoothing for crisp pixels
      outputCtx.imageSmoothingEnabled = false
      outputCtx.drawImage(canvas, 0, 0, outputWidth, outputHeight)

      setError(null)
    } catch (err) {
      console.error("Error converting to pixel art:", err)
      setError(err instanceof Error ? err.message : "Unknown error occurred")
    }
  }

  const downloadPixelArt = () => {
    if (!outputCanvasRef.current) {
      setError("No pixel art to download")
      return
    }

    const link = document.createElement("a")
    link.download = "pixel-art.png"
    link.href = outputCanvasRef.current.toDataURL()
    link.click()
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
        {/* Pixel Art Preview */}
        <div
          ref={previewRef}
          className={`order-1 md:order-2 flex-1 bg-black overflow-auto flex items-center justify-center ${
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
            <canvas
              ref={outputCanvasRef}
              className="max-w-full max-h-full object-contain border border-stone-700 rounded"
              style={{
                imageRendering: "pixelated",
                imageRendering: "-moz-crisp-edges",
                imageRendering: "crisp-edges",
              }}
            />
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
              <h1 className="text-lg text-stone-100 font-bold">Pixel Art Converter</h1>
              <p className="text-xs text-stone-400">Transform images into retro pixel art</p>
              {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
            </div>

            {/* Info Card */}
            <Card className="bg-stone-800 border-stone-600">
              <CardContent className="p-3">
                <div className="flex items-start space-x-2">
                  <Info className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                  <div className="text-xs text-stone-300">
                    <p className="font-semibold text-blue-400 mb-1">About Pixel Art</p>
                    <p>
                      Pixel art reduces image resolution and color count to create a retro, video game-inspired
                      aesthetic.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4 pt-2">
              <div className="space-y-2 border-t border-stone-700 pt-4">
                <Label className="text-stone-300">Upload Image</Label>
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="pixel-file-upload"
                    className="flex flex-col items-center justify-center w-full h-24 border-2 border-stone-600 border-dashed rounded-lg cursor-pointer bg-stone-800 hover:bg-stone-700 transition-colors"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-2 text-stone-400" />
                      <p className="mb-2 text-sm text-stone-400">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                    </div>
                    <input
                      id="pixel-file-upload"
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileInputChange}
                      ref={fileInputRef}
                    />
                  </label>
                </div>
              </div>

              <div className="space-y-2 border-t border-stone-700 pt-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="pixelsize" className="text-stone-300">
                    Pixel Size: {pixelSize}px
                  </Label>
                </div>
                <Slider
                  id="pixelsize"
                  min={2}
                  max={32}
                  step={1}
                  value={[pixelSize]}
                  onValueChange={(value) => setPixelSize(value[0])}
                  className="[&>span]:border-none [&_.bg-primary]:bg-stone-800 [&>.bg-background]:bg-stone-500/30"
                />
              </div>

              <div className="space-y-2 border-t border-stone-700 pt-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="colorcount" className="text-stone-300">
                    Color Count: {colorCount}
                  </Label>
                </div>
                <Slider
                  id="colorcount"
                  min={2}
                  max={256}
                  step={1}
                  value={[colorCount]}
                  onValueChange={(value) => setColorCount(value[0])}
                  className="[&>span]:border-none [&_.bg-primary]:bg-stone-800 [&>.bg-background]:bg-stone-500/30"
                />
              </div>

              <div className="space-y-2 border-t border-stone-700 pt-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="contrast" className="text-stone-300">
                    Contrast: {contrastBoost.toFixed(1)}
                  </Label>
                </div>
                <Slider
                  id="contrast"
                  min={0.5}
                  max={2.0}
                  step={0.1}
                  value={[contrastBoost]}
                  onValueChange={(value) => setContrastBoost(value[0])}
                  className="[&>span]:border-none [&_.bg-primary]:bg-stone-800 [&>.bg-background]:bg-stone-500/30"
                />
              </div>

              <div className="space-y-2 border-t border-stone-700 pt-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="saturation" className="text-stone-300">
                    Saturation: {saturationBoost.toFixed(1)}
                  </Label>
                </div>
                <Slider
                  id="saturation"
                  min={0.0}
                  max={2.0}
                  step={0.1}
                  value={[saturationBoost]}
                  onValueChange={(value) => setSaturationBoost(value[0])}
                  className="[&>span]:border-none [&_.bg-primary]:bg-stone-800 [&>.bg-background]:bg-stone-500/30"
                />
              </div>

              <div className="flex items-center space-x-2 border-t border-stone-700 pt-4">
                <Switch
                  id="dithering"
                  checked={ditheringEnabled}
                  onCheckedChange={setDitheringEnabled}
                  className="data-[state=checked]:bg-stone-600"
                />
                <Label htmlFor="dithering" className="text-stone-300">
                  Enable Dithering
                </Label>
              </div>

              {ditheringEnabled && (
                <div className="space-y-2">
                  <Label htmlFor="ditheringmethod" className="text-stone-300">
                    Dithering Method
                  </Label>
                  <Select value={ditheringMethod} onValueChange={setDitheringMethod}>
                    <SelectTrigger id="ditheringmethod" className="bg-stone-800 border-stone-700 text-stone-300">
                      <SelectValue placeholder="Select dithering method" />
                    </SelectTrigger>
                    <SelectContent className="bg-stone-800 border-stone-700 text-stone-300">
                      {Object.entries(ditheringMethods).map(([key, label]) => (
                        <SelectItem key={key} value={key} className="focus:bg-stone-700 focus:text-stone-100">
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="flex items-center space-x-2 border-t border-stone-700 pt-4">
                <Switch
                  id="smoothing"
                  checked={smoothing}
                  onCheckedChange={setSmoothing}
                  className="data-[state=checked]:bg-stone-600"
                />
                <Label htmlFor="smoothing" className="text-stone-300">
                  Image Smoothing
                </Label>
              </div>

              {/* Color Palette Display */}
              {colorPalette.length > 0 && (
                <div className="space-y-2 border-t border-stone-700 pt-4">
                  <div className="flex items-center space-x-2">
                    <Palette className="h-4 w-4 text-stone-400" />
                    <Label className="text-stone-300">Generated Palette</Label>
                  </div>
                  <div className="grid grid-cols-8 gap-1">
                    {colorPalette.slice(0, 32).map((color, index) => (
                      <div
                        key={index}
                        className="w-6 h-6 rounded border border-stone-600"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
              )}

              <div className="hidden">
                <canvas ref={canvasRef} width="300" height="300"></canvas>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleFileInputChange}
                  className="hidden"
                />
              </div>

              <div className="flex gap-2 pt-4 border-t border-stone-700">
                <Button
                  onClick={downloadPixelArt}
                  className="flex-1 bg-stone-700 hover:bg-stone-600 text-stone-200 border-stone-600"
                  disabled={loading || !imageLoaded}
                >
                  {sidebarNarrow ? "Download" : "Download PNG"}
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
