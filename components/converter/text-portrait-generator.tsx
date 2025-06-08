"use client"

import type React from "react"
import { useState, useEffect, useRef, type ChangeEvent } from "react"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { GripVertical, Upload, Download, Info, Type, Copy, Check } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type ColoredChar = {
  char: string
  color: string
  fontSize: number
}

export default function TextPortraitGenerator() {
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

  const [customText, setCustomText] = useState("PORTRAIT")
  const [fontFamily, setFontFamily] = useState("monospace")
  const [fontSize, setFontSize] = useState(12)
  const [textDensity, setTextDensity] = useState(0.15)
  const [inverted, setInverted] = useState(false)
  const [grayscale, setGrayscale] = useState(false)
  const [variableFontSize, setVariableFontSize] = useState(true)
  const [textDirection, setTextDirection] = useState("horizontal")
  const [letterSpacing, setLetterSpacing] = useState(1)
  const [lineHeight, setLineHeight] = useState(1.2)
  const [loading, setLoading] = useState(true)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [textPortrait, setTextPortrait] = useState<string>("")
  const [coloredTextPortrait, setColoredTextPortrait] = useState<ColoredChar[][]>([])
  const [leftPanelWidth, setLeftPanelWidth] = useState(25)
  const [isDragging, setIsDragging] = useState(false)
  const [isDraggingFile, setIsDraggingFile] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isDesktop, setIsDesktop] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)
  const [sidebarNarrow, setSidebarNarrow] = useState(false)
  const [copiedText, setCopiedText] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const outputCanvasRef = useRef<HTMLCanvasElement>(null)
  const imageRef = useRef<HTMLImageElement | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const previewRef = useRef<HTMLDivElement>(null)

  const fontFamilies = {
    monospace: "monospace",
    serif: "serif",
    "sans-serif": "sans-serif",
    cursive: "cursive",
    fantasy: "fantasy",
    "courier-new": "'Courier New', monospace",
    arial: "Arial, sans-serif",
    helvetica: "Helvetica, sans-serif",
    "times-new-roman": "'Times New Roman', serif",
    georgia: "Georgia, serif",
    verdana: "Verdana, sans-serif",
  }

  const textDirections = {
    horizontal: "Horizontal",
    vertical: "Vertical",
    diagonal: "Diagonal",
    circular: "Circular",
  }

  const presetTexts = {
    portrait: "PORTRAIT",
    love: "LOVE",
    art: "ART",
    custom: "Custom Text",
    lorem: "Lorem ipsum dolor sit amet consectetur adipiscing elit",
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
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
      generateTextPortrait()
    }
  }, [
    customText,
    fontFamily,
    fontSize,
    textDensity,
    inverted,
    grayscale,
    variableFontSize,
    textDirection,
    letterSpacing,
    lineHeight,
    imageLoaded,
  ])

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

  const adjustColorBrightness = (r: number, g: number, b: number, factor: number): string => {
    const minBrightness = 40
    r = Math.max(Math.min(Math.round(r * factor), 255), minBrightness)
    g = Math.max(Math.min(Math.round(g * factor), 255), minBrightness)
    b = Math.max(Math.min(Math.round(b * factor), 255), minBrightness)
    return `rgb(${r}, ${g}, ${b})`
  }

  const getCharacterAtPosition = (x: number, y: number, text: string): string => {
    if (!text || text.length === 0) return " "

    switch (textDirection) {
      case "horizontal":
        return text[x % text.length]
      case "vertical":
        return text[y % text.length]
      case "diagonal":
        return text[(x + y) % text.length]
      case "circular":
        const centerX = 50
        const centerY = 50
        const angle = Math.atan2(y - centerY, x - centerX)
        const normalizedAngle = (angle + Math.PI) / (2 * Math.PI)
        const index = Math.floor(normalizedAngle * text.length) % text.length
        return text[index]
      default:
        return text[(x + y) % text.length]
    }
  }

  const calculateFontSize = (brightness: number, baseFontSize: number): number => {
    if (!variableFontSize) return baseFontSize

    // Map brightness to font size (brighter = larger text)
    const minSize = baseFontSize * 0.5
    const maxSize = baseFontSize * 1.5
    return minSize + (maxSize - minSize) * brightness
  }

  const renderToCanvas = () => {
    if (!outputCanvasRef.current || (!textPortrait && coloredTextPortrait.length === 0)) return

    const canvas = outputCanvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    if (grayscale && textPortrait) {
      // Render grayscale text portrait
      const lines = textPortrait.split("\n")
      const maxLineLength = Math.max(...lines.map((line) => line.length))

      canvas.width = maxLineLength * fontSize * letterSpacing
      canvas.height = lines.length * fontSize * lineHeight

      ctx.font = `${Math.max(8, fontSize)}px ${fontFamily}`
      ctx.textBaseline = "top"
      ctx.fillStyle = "white"

      lines.forEach((line, lineIndex) => {
        for (let charIndex = 0; charIndex < line.length; charIndex++) {
          const char = line[charIndex]
          const x = charIndex * fontSize * letterSpacing
          const y = lineIndex * fontSize * lineHeight
          ctx.fillText(char, x, y)
        }
      })
    } else if (coloredTextPortrait.length > 0) {
      // Render colored text portrait
      const maxRowLength = Math.max(...coloredTextPortrait.map((row) => row.length))

      canvas.width = maxRowLength * fontSize * letterSpacing
      canvas.height = coloredTextPortrait.length * fontSize * lineHeight

      ctx.textBaseline = "top"

      coloredTextPortrait.forEach((row, rowIndex) => {
        row.forEach((col, colIndex) => {
          if (col.char.trim()) {
            ctx.font = `${Math.max(8, col.fontSize)}px ${fontFamily}`
            ctx.fillStyle = col.color
            const x = colIndex * fontSize * letterSpacing
            const y = rowIndex * fontSize * lineHeight
            ctx.fillText(col.char, x, y)
          }
        })
      })
    }
  }

  useEffect(() => {
    if (imageLoaded && !loading && !error) {
      renderToCanvas()
    }
  }, [
    textPortrait,
    coloredTextPortrait,
    grayscale,
    loading,
    error,
    imageLoaded,
    fontSize,
    fontFamily,
    letterSpacing,
    lineHeight,
  ])

  const generateTextPortrait = () => {
    try {
      if (!canvasRef.current || !imageRef.current || !customText.trim()) {
        throw new Error("Canvas, image, or text not available")
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

      // Calculate dimensions based on text density
      const width = Math.floor(img.width * textDensity)
      const height = Math.floor(img.height * textDensity)

      canvas.width = img.width
      canvas.height = img.height

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(img, 0, 0, img.width, img.height)

      let imageData
      try {
        imageData = ctx.getImageData(0, 0, img.width, img.height)
      } catch (e) {
        throw new Error("Failed to get image data. This might be a CORS issue.")
      }

      const data = imageData.data
      const text = customText.trim()

      // Calculate step sizes
      const widthStep = Math.ceil(img.width / width)
      const heightStep = Math.ceil(img.height / height)

      let result = ""
      const coloredResult: ColoredChar[][] = []

      // Process the image
      for (let y = 0; y < img.height; y += heightStep) {
        const coloredRow: ColoredChar[] = []

        for (let x = 0; x < img.width; x += widthStep) {
          const pos = (y * img.width + x) * 4

          const r = data[pos]
          const g = data[pos + 1]
          const b = data[pos + 2]

          // Calculate brightness
          let brightness = (r * 0.299 + g * 0.587 + b * 0.114) / 255

          // Invert if needed
          if (inverted) brightness = 1 - brightness

          // Get character based on position and direction
          const charX = Math.floor(x / widthStep)
          const charY = Math.floor(y / heightStep)
          const char = getCharacterAtPosition(charX, charY, text)

          // Calculate font size based on brightness
          const charFontSize = calculateFontSize(brightness, fontSize)

          // Determine if we should place a character based on brightness
          const shouldPlaceChar = brightness > 0.05 // Lower threshold for better coverage

          const finalChar = shouldPlaceChar ? char : " "
          result += finalChar

          // For colored mode, store the character with its properties
          if (!grayscale) {
            const brightnessFactor = Math.max(0.3, brightness * 1.5)
            const color = adjustColorBrightness(r, g, b, brightnessFactor)
            coloredRow.push({
              char: finalChar,
              color,
              fontSize: charFontSize,
            })
          } else {
            coloredRow.push({
              char: finalChar,
              color: "white",
              fontSize: charFontSize,
            })
          }
        }

        result += "\n"
        coloredResult.push(coloredRow)
      }

      setTextPortrait(result)
      setColoredTextPortrait(coloredResult)
      setError(null)
    } catch (err) {
      console.error("Error generating text portrait:", err)
      setError(err instanceof Error ? err.message : "Unknown error occurred")
      setTextPortrait("")
      setColoredTextPortrait([])
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        setCopiedText(true)
        setTimeout(() => setCopiedText(false), 2000)
      },
      (err) => {
        console.error("Could not copy text: ", err)
      },
    )
  }

  const downloadTextPortrait = () => {
    if (!textPortrait) {
      setError("No text portrait to download")
      return
    }

    const element = document.createElement("a")
    const file = new Blob([textPortrait], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = "text-portrait.txt"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const downloadAsImage = () => {
    if (!outputCanvasRef.current) {
      setError("No image to download")
      return
    }

    const link = document.createElement("a")
    link.download = "text-portrait.png"
    link.href = outputCanvasRef.current.toDataURL()
    link.click()
  }

  const handlePresetTextChange = (preset: string) => {
    if (preset !== "custom") {
      setCustomText(presetTexts[preset as keyof typeof presetTexts])
    }
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
        {/* Text Portrait Preview */}
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
                  <TabsTrigger value="preview">Text Preview</TabsTrigger>
                  <TabsTrigger value="canvas">Canvas View</TabsTrigger>
                  <TabsTrigger value="comparison">Comparison</TabsTrigger>
                </TabsList>

                {/* Text Preview */}
                <TabsContent value="preview" className="mt-4">
                  <div className="border border-stone-700 rounded-lg p-4 bg-black overflow-auto max-h-[600px]">
                    {grayscale ? (
                      <pre
                        className="text-stone-300 whitespace-pre-wrap select-text"
                        style={{
                          fontSize: `${Math.max(4, fontSize / 3)}px`,
                          lineHeight: lineHeight,
                          letterSpacing: `${letterSpacing - 1}px`,
                          fontFamily: fontFamily,
                        }}
                      >
                        {textPortrait}
                      </pre>
                    ) : (
                      <div className="select-text">
                        {coloredTextPortrait.map((row, rowIndex) => (
                          <div key={rowIndex} style={{ lineHeight: lineHeight }}>
                            {row.map((col, colIndex) => (
                              <span
                                key={colIndex}
                                style={{
                                  color: col.color,
                                  fontSize: `${Math.max(4, col.fontSize / 3)}px`,
                                  letterSpacing: `${letterSpacing - 1}px`,
                                  fontFamily: fontFamily,
                                }}
                              >
                                {col.char}
                              </span>
                            ))}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </TabsContent>

                {/* Canvas View */}
                <TabsContent value="canvas" className="mt-4">
                  <div className="border border-stone-700 rounded-lg p-4 bg-white overflow-auto max-h-[600px]">
                    <canvas
                      ref={outputCanvasRef}
                      className="max-w-full select-text"
                      style={{
                        imageRendering: "crisp-edges",
                      }}
                    />
                  </div>
                </TabsContent>

                {/* Comparison */}
                <TabsContent value="comparison" className="mt-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-lg font-mono text-white mb-2">Original Image</h3>
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
                      <h3 className="text-lg font-mono text-white mb-2">Text Portrait</h3>
                      <div className="border border-stone-700 rounded-lg p-4 bg-black overflow-auto max-h-[400px]">
                        {grayscale ? (
                          <pre
                            className="text-stone-300 whitespace-pre-wrap text-xs"
                            style={{
                              lineHeight: lineHeight,
                              letterSpacing: `${letterSpacing - 1}px`,
                              fontFamily: fontFamily,
                            }}
                          >
                            {textPortrait}
                          </pre>
                        ) : (
                          <div>
                            {coloredTextPortrait.slice(0, 50).map((row, rowIndex) => (
                              <div key={rowIndex} style={{ lineHeight: lineHeight }}>
                                {row.slice(0, 100).map((col, colIndex) => (
                                  <span
                                    key={colIndex}
                                    style={{
                                      color: col.color,
                                      fontSize: "8px",
                                      letterSpacing: `${letterSpacing - 1}px`,
                                      fontFamily: fontFamily,
                                    }}
                                  >
                                    {col.char}
                                  </span>
                                ))}
                              </div>
                            ))}
                          </div>
                        )}
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
              <h1 className="text-lg text-stone-100 font-bold">Text Portrait Generator</h1>
              <p className="text-xs text-stone-400">Create portraits using custom text and typography</p>
              {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
            </div>

            {/* Info Card */}
            <Card className="bg-stone-800 border-stone-600">
              <CardContent className="p-3">
                <div className="flex items-start space-x-2">
                  <Info className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                  <div className="text-xs text-stone-300">
                    <p className="font-semibold text-blue-400 mb-1">About Text Portraits</p>
                    <p>
                      Text portraits use typography to recreate images. Characters are placed based on image brightness
                      and can follow different patterns and directions.
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
                  htmlFor="text-portrait-file-upload"
                  className="flex flex-col items-center justify-center w-full h-24 border-2 border-stone-600 border-dashed rounded-lg cursor-pointer bg-stone-800 hover:bg-stone-700 transition-colors"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-2 text-stone-400" />
                    <p className="mb-2 text-sm text-stone-400">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                  </div>
                  <input
                    id="text-portrait-file-upload"
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
              {/* Text Settings */}
              <div className="space-y-2 border-t border-stone-700 pt-4">
                <Label htmlFor="preset-text" className="text-stone-300">
                  Preset Text
                </Label>
                <Select onValueChange={handlePresetTextChange}>
                  <SelectTrigger id="preset-text" className="bg-stone-800 border-stone-700 text-stone-300">
                    <SelectValue placeholder="Choose preset or use custom" />
                  </SelectTrigger>
                  <SelectContent className="bg-stone-800 border-stone-700 text-stone-300">
                    {Object.entries(presetTexts).map(([key, label]) => (
                      <SelectItem key={key} value={key} className="focus:bg-stone-700 focus:text-stone-100">
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="custom-text" className="text-stone-300">
                  Custom Text
                </Label>
                <Textarea
                  id="custom-text"
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  placeholder="Enter your custom text..."
                  className="bg-stone-800 border-stone-700 text-stone-300 resize-none h-20"
                />
              </div>

              {/* Typography Settings */}
              <div className="space-y-2 border-t border-stone-700 pt-4">
                <Label htmlFor="font-family" className="text-stone-300">
                  Font Family
                </Label>
                <Select value={fontFamily} onValueChange={setFontFamily}>
                  <SelectTrigger id="font-family" className="bg-stone-800 border-stone-700 text-stone-300">
                    <SelectValue placeholder="Select font family" />
                  </SelectTrigger>
                  <SelectContent className="bg-stone-800 border-stone-700 text-stone-300">
                    {Object.entries(fontFamilies).map(([key, label]) => (
                      <SelectItem key={key} value={key} className="focus:bg-stone-700 focus:text-stone-100">
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 border-t border-stone-700 pt-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="font-size" className="text-stone-300">
                    Font Size: {fontSize}px
                  </Label>
                </div>
                <Slider
                  id="font-size"
                  min={6}
                  max={24}
                  step={1}
                  value={[fontSize]}
                  onValueChange={(value) => setFontSize(value[0])}
                  className="[&>span]:border-none [&_.bg-primary]:bg-stone-800 [&>.bg-background]:bg-stone-500/30"
                />
              </div>

              <div className="space-y-2 border-t border-stone-700 pt-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="text-density" className="text-stone-300">
                    Text Density: {textDensity.toFixed(2)}
                  </Label>
                </div>
                <Slider
                  id="text-density"
                  min={0.05}
                  max={0.5}
                  step={0.01}
                  value={[textDensity]}
                  onValueChange={(value) => setTextDensity(value[0])}
                  className="[&>span]:border-none [&_.bg-primary]:bg-stone-800 [&>.bg-background]:bg-stone-500/30"
                />
              </div>

              <div className="space-y-2 border-t border-stone-700 pt-4">
                <Label htmlFor="text-direction" className="text-stone-300">
                  Text Direction
                </Label>
                <Select value={textDirection} onValueChange={setTextDirection}>
                  <SelectTrigger id="text-direction" className="bg-stone-800 border-stone-700 text-stone-300">
                    <SelectValue placeholder="Select text direction" />
                  </SelectTrigger>
                  <SelectContent className="bg-stone-800 border-stone-700 text-stone-300">
                    {Object.entries(textDirections).map(([key, label]) => (
                      <SelectItem key={key} value={key} className="focus:bg-stone-700 focus:text-stone-100">
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 border-t border-stone-700 pt-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="letter-spacing" className="text-stone-300">
                    Letter Spacing: {letterSpacing.toFixed(1)}
                  </Label>
                </div>
                <Slider
                  id="letter-spacing"
                  min={0.5}
                  max={3}
                  step={0.1}
                  value={[letterSpacing]}
                  onValueChange={(value) => setLetterSpacing(value[0])}
                  className="[&>span]:border-none [&_.bg-primary]:bg-stone-800 [&>.bg-background]:bg-stone-500/30"
                />
              </div>

              <div className="space-y-2 border-t border-stone-700 pt-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="line-height" className="text-stone-300">
                    Line Height: {lineHeight.toFixed(1)}
                  </Label>
                </div>
                <Slider
                  id="line-height"
                  min={0.8}
                  max={2}
                  step={0.1}
                  value={[lineHeight]}
                  onValueChange={(value) => setLineHeight(value[0])}
                  className="[&>span]:border-none [&_.bg-primary]:bg-stone-800 [&>.bg-background]:bg-stone-500/30"
                />
              </div>

              {/* Style Options */}
              <div className="flex items-center space-x-2 border-t border-stone-700 pt-4">
                <Switch
                  id="variable-font-size"
                  checked={variableFontSize}
                  onCheckedChange={setVariableFontSize}
                  className="data-[state=checked]:bg-stone-600"
                />
                <Label htmlFor="variable-font-size" className="text-stone-300">
                  Variable Font Size
                </Label>
              </div>

              <div className="flex items-center space-x-2 border-t border-stone-700 pt-4">
                <Switch
                  id="invert"
                  checked={inverted}
                  onCheckedChange={setInverted}
                  className="data-[state=checked]:bg-stone-600"
                />
                <Label htmlFor="invert" className="text-stone-300">
                  Invert Colors
                </Label>
              </div>

              <div className="flex items-center space-x-2 border-t border-stone-700 pt-4">
                <Switch
                  id="grayscale"
                  checked={grayscale}
                  onCheckedChange={setGrayscale}
                  className="data-[state=checked]:bg-stone-600"
                />
                <Label htmlFor="grayscale" className="text-stone-300">
                  Grayscale Mode
                </Label>
              </div>

              <div className="hidden">
                <canvas ref={canvasRef} width="300" height="300"></canvas>
              </div>

              <div className="flex gap-2 pt-4 border-t border-stone-700">
                <Button
                  onClick={() => copyToClipboard(textPortrait)}
                  className="flex-1 bg-stone-700 hover:bg-stone-600 text-stone-200 border-stone-600"
                  disabled={loading || !imageLoaded || !textPortrait}
                >
                  {copiedText ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                  {sidebarNarrow ? "Copy" : "Copy Text"}
                </Button>

                <Button
                  onClick={downloadTextPortrait}
                  className="bg-stone-700 hover:bg-stone-600 text-stone-200 border-stone-600"
                  title="Download as Text"
                  disabled={loading || !imageLoaded || !textPortrait}
                >
                  <Download className="h-4 w-4" />
                </Button>

                <Button
                  onClick={downloadAsImage}
                  className="bg-stone-700 hover:bg-stone-600 text-stone-200 border-stone-600"
                  title="Download as Image"
                  disabled={loading || !imageLoaded || !textPortrait}
                >
                  <Type className="h-4 w-4" />
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
