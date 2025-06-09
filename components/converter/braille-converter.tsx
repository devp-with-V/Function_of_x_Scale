// "use client"

// import type React from "react"
// import { useState, useEffect, useRef, type ChangeEvent } from "react"
// import { Slider } from "@/components/ui/slider"
// import { Button } from "@/components/ui/button"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Switch } from "@/components/ui/switch"
// import { Label } from "@/components/ui/label"
// import { GripVertical, Upload, Download, Info } from "lucide-react"
// import { Card, CardContent } from "@/components/ui/card"

// // Define a type for colored Braille characters
// type ColoredChar = {
//   char: string
//   color: string
// }

// export default function BrailleConverter() {
//   useEffect(() => {
//     if (typeof document !== "undefined") {
//       document.documentElement.style.backgroundColor = "black"
//       document.body.style.backgroundColor = "black"
//     }

//     return () => {
//       if (typeof document !== "undefined") {
//         document.documentElement.style.backgroundColor = ""
//         document.body.style.backgroundColor = ""
//       }
//     }
//   }, [])

//   const [resolution, setResolution] = useState(0.15)
//   const [inverted, setInverted] = useState(false)
//   const [grayscale, setGrayscale] = useState(true)
//   const [threshold, setThreshold] = useState(0.5)
//   const [dotDensity, setDotDensity] = useState("medium")
//   const [loading, setLoading] = useState(true)
//   const [imageLoaded, setImageLoaded] = useState(false)
//   const [brailleArt, setBrailleArt] = useState<string>("")
//   const [coloredBrailleArt, setColoredBrailleArt] = useState<ColoredChar[][]>([])
//   const [leftPanelWidth, setLeftPanelWidth] = useState(25)
//   const [isDragging, setIsDragging] = useState(false)
//   const [isDraggingFile, setIsDraggingFile] = useState(false)
//   const [error, setError] = useState<string | null>(null)
//   const [isDesktop, setIsDesktop] = useState(false)
//   const [isHydrated, setIsHydrated] = useState(false)
//   const [sidebarNarrow, setSidebarNarrow] = useState(false)
//   const containerRef = useRef<HTMLDivElement>(null)
//   const canvasRef = useRef<HTMLCanvasElement>(null)
//   const imageRef = useRef<HTMLImageElement | null>(null)
//   const fileInputRef = useRef<HTMLInputElement>(null)
//   const previewRef = useRef<HTMLDivElement>(null)
//   const outputCanvasRef = useRef<HTMLCanvasElement>(null)

//   // Braille Unicode patterns (2x4 dot matrix)
//   const braillePatterns = [
//     "⠀",
//     "⠁",
//     "⠂",
//     "⠃",
//     "⠄",
//     "⠅",
//     "⠆",
//     "⠇",
//     "⠈",
//     "⠉",
//     "⠊",
//     "⠋",
//     "⠌",
//     "⠍",
//     "⠎",
//     "⠏",
//     "⠐",
//     "⠑",
//     "⠒",
//     "⠓",
//     "⠔",
//     "⠕",
//     "⠖",
//     "⠗",
//     "⠘",
//     "⠙",
//     "⠚",
//     "⠛",
//     "⠜",
//     "⠝",
//     "⠞",
//     "⠟",
//     "⠠",
//     "⠡",
//     "⠢",
//     "⠣",
//     "⠤",
//     "⠥",
//     "⠦",
//     "⠧",
//     "⠨",
//     "⠩",
//     "⠪",
//     "⠫",
//     "⠬",
//     "⠭",
//     "⠮",
//     "⠯",
//     "⠰",
//     "⠱",
//     "⠲",
//     "⠳",
//     "⠴",
//     "⠵",
//     "⠶",
//     "⠷",
//     "⠸",
//     "⠹",
//     "⠺",
//     "⠻",
//     "⠼",
//     "⠽",
//     "⠾",
//     "⠿",
//     "⡀",
//     "⡁",
//     "⡂",
//     "⡃",
//     "⡄",
//     "⡅",
//     "⡆",
//     "⡇",
//     "⡈",
//     "⡉",
//     "⡊",
//     "⡋",
//     "⡌",
//     "⡍",
//     "⡎",
//     "⡏",
//     "⡐",
//     "⡑",
//     "⡒",
//     "⡓",
//     "⡔",
//     "⡕",
//     "⡖",
//     "⡗",
//     "⡘",
//     "⡙",
//     "⡚",
//     "⡛",
//     "⡜",
//     "⡝",
//     "⡞",
//     "⡟",
//     "⡠",
//     "⡡",
//     "⡢",
//     "⡣",
//     "⡤",
//     "⡥",
//     "⡦",
//     "⡧",
//     "⡨",
//     "⡩",
//     "⡪",
//     "⡫",
//     "⡬",
//     "⡭",
//     "⡮",
//     "⡯",
//     "⡰",
//     "⡱",
//     "⡲",
//     "⡳",
//     "⡴",
//     "⡵",
//     "⡶",
//     "⡷",
//     "⡸",
//     "⡹",
//     "⡺",
//     "⡻",
//     "⡼",
//     "⡽",
//     "⡾",
//     "⡿",
//     "⢀",
//     "⢁",
//     "⢂",
//     "⢃",
//     "⢄",
//     "⢅",
//     "⢆",
//     "⢇",
//     "⢈",
//     "⢉",
//     "⢊",
//     "⢋",
//     "⢌",
//     "⢍",
//     "⢎",
//     "⢏",
//     "⢐",
//     "⢑",
//     "⢒",
//     "⢓",
//     "⢔",
//     "⢕",
//     "⢖",
//     "⢗",
//     "⢘",
//     "⢙",
//     "⢚",
//     "⢛",
//     "⢜",
//     "⢝",
//     "⢞",
//     "⢟",
//     "⢠",
//     "⢡",
//     "⢢",
//     "⢣",
//     "⢤",
//     "⢥",
//     "⢦",
//     "⢧",
//     "⢨",
//     "⢩",
//     "⢪",
//     "⢫",
//     "⢬",
//     "⢭",
//     "⢮",
//     "⢯",
//     "⢰",
//     "⢱",
//     "⢲",
//     "⢳",
//     "⢴",
//     "⢵",
//     "⢶",
//     "⢷",
//     "⢸",
//     "⢹",
//     "⢺",
//     "⢻",
//     "⢼",
//     "⢽",
//     "⢾",
//     "⢿",
//     "⣀",
//     "⣁",
//     "⣂",
//     "⣃",
//     "⣄",
//     "⣅",
//     "⣆",
//     "⣇",
//     "⣈",
//     "⣉",
//     "⣊",
//     "⣋",
//     "⣌",
//     "⣍",
//     "⣎",
//     "⣏",
//     "⣐",
//     "⣑",
//     "⣒",
//     "⣓",
//     "⣔",
//     "⣕",
//     "⣖",
//     "⣗",
//     "⣘",
//     "⣙",
//     "⣚",
//     "⣛",
//     "⣜",
//     "⣝",
//     "⣞",
//     "⣟",
//     "⣠",
//     "⣡",
//     "⣢",
//     "⣣",
//     "⣤",
//     "⣥",
//     "⣦",
//     "⣧",
//     "⣨",
//     "⣩",
//     "⣪",
//     "⣫",
//     "⣬",
//     "⣭",
//     "⣮",
//     "⣯",
//     "⣰",
//     "⣱",
//     "⣲",
//     "⣳",
//     "⣴",
//     "⣵",
//     "⣶",
//     "⣷",
//     "⣸",
//     "⣹",
//     "⣺",
//     "⣻",
//     "⣼",
//     "⣽",
//     "⣾",
//     "⣿",
//   ]

//   const dotDensityModes = {
//     low: { threshold: 0.7, name: "Low Density" },
//     medium: { threshold: 0.5, name: "Medium Density" },
//     high: { threshold: 0.3, name: "High Density" },
//     ultra: { threshold: 0.1, name: "Ultra High" },
//   }

//   useEffect(() => {
//     setIsHydrated(true)
//   }, [])

//   useEffect(() => {
//     if (!isHydrated) return

//     setIsDesktop(window.innerWidth >= 768)

//     const handleResize = () => {
//       const newIsDesktop = window.innerWidth >= 768
//       setIsDesktop(newIsDesktop)

//       if (newIsDesktop !== isDesktop) {
//         setLeftPanelWidth(25)
//       }
//     }

//     window.addEventListener("resize", handleResize)
//     loadDefaultImage()

//     return () => {
//       window.removeEventListener("resize", handleResize)
//     }
//   }, [isDesktop, isHydrated])

//   useEffect(() => {
//     if (!isHydrated || !isDesktop) return

//     const checkSidebarWidth = () => {
//       if (containerRef.current) {
//         const containerWidth = containerRef.current.clientWidth
//         const sidebarWidth = (leftPanelWidth / 100) * containerWidth
//         setSidebarNarrow(sidebarWidth < 350)
//       }
//     }

//     checkSidebarWidth()
//     window.addEventListener("resize", checkSidebarWidth)

//     return () => {
//       window.removeEventListener("resize", checkSidebarWidth)
//     }
//   }, [leftPanelWidth, isHydrated, isDesktop])

//   useEffect(() => {
//     if (imageLoaded && imageRef.current) {
//       convertToBraille()
//     }
//   }, [resolution, inverted, grayscale, threshold, dotDensity, imageLoaded])

//   useEffect(() => {
//     const handleMouseMove = (e: MouseEvent) => {
//       if (isDragging && containerRef.current) {
//         const containerRect = containerRef.current.getBoundingClientRect()
//         const newLeftWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100

//         if (newLeftWidth >= 20 && newLeftWidth <= 80) {
//           setLeftPanelWidth(newLeftWidth)
//         }
//       }
//     }

//     const handleMouseUp = () => {
//       setIsDragging(false)
//     }

//     if (isDragging) {
//       document.addEventListener("mousemove", handleMouseMove)
//       document.addEventListener("mouseup", handleMouseUp)
//     }

//     return () => {
//       document.removeEventListener("mousemove", handleMouseMove)
//       document.removeEventListener("mouseup", handleMouseUp)
//     }
//   }, [isDragging])

//   const startDragging = () => {
//     setIsDragging(true)
//   }

//   const loadDefaultImage = () => {
//     setLoading(true)
//     setError(null)
//     setImageLoaded(false)

//     const img = new Image()
//     img.crossOrigin = "anonymous"

//     img.onload = () => {
//       if (img.width === 0 || img.height === 0) {
//         setError("Invalid image dimensions")
//         setLoading(false)
//         return
//       }

//       imageRef.current = img
//       setImageLoaded(true)
//       setLoading(false)
//     }

//     img.onerror = () => {
//       setError("Failed to load image")
//       setLoading(false)
//     }

//     img.src =
//       "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/CleanShot%202025-04-21%20at%2007.18.50%402x-dZYTCjkP7AhQCvCtNcNHt4amOQSwtX.png"
//   }

//   const loadImage = (src: string) => {
//     setLoading(true)
//     setError(null)
//     setImageLoaded(false)

//     const img = new Image()
//     img.crossOrigin = "anonymous"

//     img.onload = () => {
//       if (img.width === 0 || img.height === 0) {
//         setError("Invalid image dimensions")
//         setLoading(false)
//         return
//       }

//       imageRef.current = img
//       setImageLoaded(true)
//       setLoading(false)
//     }

//     img.onerror = () => {
//       setError("Failed to load image")
//       setLoading(false)
//     }

//     img.src = src
//   }

//   const handleFileUpload = (file: File) => {
//     if (!file.type.startsWith("image/")) {
//       setError("Please upload an image file")
//       return
//     }

//     const reader = new FileReader()
//     reader.onload = (e) => {
//       if (e.target?.result) {
//         loadImage(e.target.result as string)
//       }
//     }
//     reader.onerror = () => {
//       setError("Failed to read file")
//     }
//     reader.readAsDataURL(file)
//   }

//   const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       handleFileUpload(e.target.files[0])
//     }
//   }

//   const handleDragOver = (e: React.DragEvent) => {
//     e.preventDefault()
//     setIsDraggingFile(true)
//   }

//   const handleDragLeave = () => {
//     setIsDraggingFile(false)
//   }

//   const handleDrop = (e: React.DragEvent) => {
//     e.preventDefault()
//     setIsDraggingFile(false)

//     if (e.dataTransfer.files && e.dataTransfer.files[0]) {
//       handleFileUpload(e.dataTransfer.files[0])
//     }
//   }

//   const adjustColorBrightness = (r: number, g: number, b: number, factor: number): string => {
//     const minBrightness = 40
//     r = Math.max(Math.min(Math.round(r * factor), 255), minBrightness)
//     g = Math.max(Math.min(Math.round(g * factor), 255), minBrightness)
//     b = Math.max(Math.min(Math.round(b * factor), 255), minBrightness)
//     return `rgb(${r}, ${g}, ${b})`
//   }

//   const renderToCanvas = () => {
//     if (!outputCanvasRef.current || !brailleArt || coloredBrailleArt.length === 0) return

//     const canvas = outputCanvasRef.current
//     const ctx = canvas.getContext("2d")
//     if (!ctx) return

//     ctx.clearRect(0, 0, canvas.width, canvas.height)

//     const fontSize = 12
//     ctx.font = `${fontSize}px monospace`
//     ctx.textBaseline = "top"

//     const lineHeight = fontSize * 1.2
//     const charWidth = fontSize * 0.6

//     if (grayscale) {
//       const lines = brailleArt.split("\n")
//       const maxLineLength = Math.max(...lines.map((line) => line.length))
//       canvas.width = maxLineLength * charWidth
//       canvas.height = lines.length * lineHeight
//     } else {
//       canvas.width = coloredBrailleArt[0].length * charWidth
//       canvas.height = coloredBrailleArt.length * lineHeight
//     }

//     ctx.font = `${fontSize}px monospace`
//     ctx.textBaseline = "top"

//     if (grayscale) {
//       ctx.fillStyle = "white"
//       brailleArt.split("\n").forEach((line, lineIndex) => {
//         ctx.fillText(line, 0, lineIndex * lineHeight)
//       })
//     } else {
//       coloredBrailleArt.forEach((row, rowIndex) => {
//         row.forEach((col, colIndex) => {
//           ctx.fillStyle = col.color
//           ctx.fillText(col.char, colIndex * charWidth, rowIndex * lineHeight)
//         })
//       })
//     }
//   }

//   useEffect(() => {
//     if (imageLoaded && !loading && !error) {
//       renderToCanvas()
//     }
//   }, [brailleArt, coloredBrailleArt, grayscale, loading, error, imageLoaded])

//   const convertToBraille = () => {
//     try {
//       if (!canvasRef.current || !imageRef.current) {
//         throw new Error("Canvas or image not available")
//       }

//       const img = imageRef.current

//       if (img.width === 0 || img.height === 0) {
//         throw new Error("Invalid image dimensions")
//       }

//       const canvas = canvasRef.current
//       const ctx = canvas.getContext("2d")
//       if (!ctx) {
//         throw new Error("Could not get canvas context")
//       }

//       // Calculate dimensions based on resolution
//       const width = Math.floor(img.width * resolution)
//       const height = Math.floor(img.height * resolution)

//       canvas.width = img.width
//       canvas.height = img.height

//       ctx.clearRect(0, 0, canvas.width, canvas.height)
//       ctx.drawImage(img, 0, 0, img.width, img.height)

//       let imageData
//       try {
//         imageData = ctx.getImageData(0, 0, img.width, img.height)
//       } catch (e) {
//         throw new Error("Failed to get image data. This might be a CORS issue.")
//       }

//       const data = imageData.data

//       // Braille characters are 2x4 dot matrices
//       const brailleWidth = 2
//       const brailleHeight = 4

//       const widthStep = Math.ceil(img.width / width)
//       const heightStep = Math.ceil(img.height / height)

//       let result = ""
//       const coloredResult: ColoredChar[][] = []

//       const currentThreshold = dotDensityModes[dotDensity as keyof typeof dotDensityModes].threshold

//       // Process the image in 2x4 blocks for Braille characters
//       for (let y = 0; y < img.height; y += heightStep * brailleHeight) {
//         const coloredRow: ColoredChar[] = []

//         for (let x = 0; x < img.width; x += widthStep * brailleWidth) {
//           let brailleValue = 0
//           let avgR = 0,
//             avgG = 0,
//             avgB = 0
//           let pixelCount = 0

//           // Check each dot position in the 2x4 Braille matrix
//           for (let dy = 0; dy < brailleHeight; dy++) {
//             for (let dx = 0; dx < brailleWidth; dx++) {
//               const pixelX = x + dx * widthStep
//               const pixelY = y + dy * heightStep

//               if (pixelX < img.width && pixelY < img.height) {
//                 const pos = (pixelY * img.width + pixelX) * 4
//                 const r = data[pos]
//                 const g = data[pos + 1]
//                 const b = data[pos + 2]

//                 avgR += r
//                 avgG += g
//                 avgB += b
//                 pixelCount++

//                 // Calculate brightness
//                 let brightness
//                 if (grayscale) {
//                   brightness = (r * 0.299 + g * 0.587 + b * 0.114) / 255
//                 } else {
//                   brightness = Math.sqrt(
//                     0.299 * (r / 255) * (r / 255) + 0.587 * (g / 255) * (g / 255) + 0.114 * (b / 255) * (b / 255),
//                   )
//                 }

//                 if (inverted) brightness = 1 - brightness

//                 // Set the corresponding Braille dot if brightness exceeds threshold
//                 if (brightness > currentThreshold) {
//                   // Braille dot positions (Unicode Braille pattern)
//                   const dotPosition = dy * 2 + dx
//                   const dotValues = [1, 8, 2, 16, 4, 32, 64, 128] // Braille dot bit positions
//                   if (dotPosition < dotValues.length) {
//                     brailleValue |= dotValues[dotPosition]
//                   }
//                 }
//               }
//             }
//           }

//           // Get the Braille character from the pattern
//           const brailleChar = braillePatterns[brailleValue] || "⠀"
//           result += brailleChar

//           // Calculate average color for this Braille character
//           if (pixelCount > 0) {
//             avgR = Math.round(avgR / pixelCount)
//             avgG = Math.round(avgG / pixelCount)
//             avgB = Math.round(avgB / pixelCount)
//           }

//           if (!grayscale) {
//             const brightnessFactor = (brailleValue / 255) * 1.5 + 0.5
//             const color = adjustColorBrightness(avgR, avgG, avgB, brightnessFactor)
//             coloredRow.push({ char: brailleChar, color })
//           } else {
//             coloredRow.push({ char: brailleChar, color: "white" })
//           }
//         }

//         result += "\n"
//         coloredResult.push(coloredRow)
//       }

//       setBrailleArt(result)
//       setColoredBrailleArt(coloredResult)
//       setError(null)
//     } catch (err) {
//       console.error("Error converting to Braille:", err)
//       setError(err instanceof Error ? err.message : "Unknown error occurred")
//       setBrailleArt("")
//       setColoredBrailleArt([])
//     }
//   }

//   const downloadBrailleArt = () => {
//     if (!brailleArt) {
//       setError("No Braille art to download")
//       return
//     }

//     const element = document.createElement("a")
//     const file = new Blob([brailleArt], { type: "text/plain" })
//     element.href = URL.createObjectURL(file)
//     element.download = "braille-art.txt"
//     document.body.appendChild(element)
//     element.click()
//     document.body.removeChild(element)
//   }

//   return (
//     <div className="min-h-screen w-full bg-black text-white">
//       <div
//         ref={containerRef}
//         className="flex flex-col md:flex-row min-h-screen w-full overflow-hidden select-none"
//         onDragOver={handleDragOver}
//         onDragLeave={handleDragLeave}
//         onDrop={handleDrop}
//       >
//         {/* Braille Art Preview */}
//         <div
//           ref={previewRef}
//           className={`order-1 md:order-2 flex-1 bg-black overflow-auto flex items-center justify-center ${
//             isDraggingFile ? "bg-opacity-50" : ""
//           } relative`}
//           style={{
//             ...(isHydrated && isDesktop
//               ? {
//                   width: `${100 - leftPanelWidth}%`,
//                   marginLeft: `${leftPanelWidth}%`,
//                 }
//               : {}),
//           }}
//         >
//           {isDraggingFile && (
//             <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 z-10 select-none">
//               <div className="text-white text-xl font-mono">Drop image here</div>
//             </div>
//           )}
//           {loading ? (
//             <div className="text-white font-mono select-none">Loading image...</div>
//           ) : error ? (
//             <div className="text-red-400 font-mono p-4 text-center select-none">
//               {error}
//               <div className="mt-2 text-white text-sm">Try uploading a different image or refreshing the page.</div>
//             </div>
//           ) : (
//             <canvas
//               ref={outputCanvasRef}
//               className="max-w-full select-text"
//               style={{
//                 fontSize: "0.6rem",
//                 lineHeight: "0.7rem",
//                 fontFamily: "monospace",
//               }}
//             />
//           )}
//         </div>

//         {/* Resizable divider */}
//         {isHydrated && isDesktop && (
//           <div
//             className="order-3 w-2 bg-stone-800 hover:bg-stone-700 cursor-col-resize items-center justify-center z-10 transition-opacity duration-300"
//             onMouseDown={startDragging}
//             style={{
//               position: "absolute",
//               left: `${leftPanelWidth}%`,
//               top: 0,
//               bottom: 0,
//               display: "flex",
//             }}
//           >
//             <GripVertical className="h-6 w-6 text-stone-500" />
//           </div>
//         )}

//         {/* Control Panel */}
//         <div
//           className={`order-2 md:order-1 w-full md:h-auto p-2 md:p-4 bg-stone-900 font-mono text-stone-300 transition-opacity duration-300 ${
//             !isHydrated ? "opacity-0" : "opacity-100"
//           }`}
//           style={{
//             width: "100%",
//             height: "auto",
//             flex: "0 0 auto",
//             ...(isHydrated && isDesktop
//               ? {
//                   position: "absolute",
//                   left: 0,
//                   top: 0,
//                   bottom: 0,
//                   width: `${leftPanelWidth}%`,
//                   overflowY: "auto",
//                 }
//               : {}),
//           }}
//         >
//           <div className="space-y-4 p-2 md:p-4 border border-stone-700 rounded-md">
//             <div className="space-y-1">
//               <h1 className="text-lg text-stone-100 font-bold">Braille Art Converter</h1>
//               <p className="text-xs text-stone-400">Transform images into tactile Braille patterns</p>
//               {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
//             </div>

//             {/* Info Card */}
//             <Card className="bg-stone-800 border-stone-600">
//               <CardContent className="p-3">
//                 <div className="flex items-start space-x-2">
//                   <Info className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
//                   <div className="text-xs text-stone-300">
//                     <p className="font-semibold text-blue-400 mb-1">About Braille Art</p>
//                     <p>
//                       Braille art uses the 6-dot Braille system to create tactile images. Each character represents a
//                       2×3 dot pattern, making images accessible through touch.
//                     </p>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             <div className="space-y-4 pt-2">
//               <div className="space-y-2 border-t border-stone-700 pt-4">
//                 <Label className="text-stone-300">Upload Image</Label>
//                 <div className="flex items-center justify-center w-full">
//                   <label
//                     htmlFor="braille-file-upload"
//                     className="flex flex-col items-center justify-center w-full h-24 border-2 border-stone-600 border-dashed rounded-lg cursor-pointer bg-stone-800 hover:bg-stone-700 transition-colors"
//                   >
//                     <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                       <Upload className="w-8 h-8 mb-2 text-stone-400" />
//                       <p className="mb-2 text-sm text-stone-400">
//                         <span className="font-semibold">Click to upload</span> or drag and drop
//                       </p>
//                     </div>
//                     <input
//                       id="braille-file-upload"
//                       type="file"
//                       className="hidden"
//                       accept="image/*"
//                       onChange={handleFileInputChange}
//                       ref={fileInputRef}
//                     />
//                   </label>
//                 </div>
//               </div>

//               <div className="space-y-2 border-t border-stone-700 pt-4">
//                 <div className="flex items-center justify-between">
//                   <Label htmlFor="resolution" className="text-stone-300">
//                     Resolution: {resolution.toFixed(2)}
//                   </Label>
//                 </div>
//                 <Slider
//                   id="resolution"
//                   min={0.05}
//                   max={0.4}
//                   step={0.01}
//                   value={[resolution]}
//                   onValueChange={(value) => setResolution(value[0])}
//                   className="[&>span]:border-none [&_.bg-primary]:bg-stone-800 [&>.bg-background]:bg-stone-500/30"
//                 />
//               </div>

//               <div className="space-y-2 border-t border-stone-700 pt-4">
//                 <Label htmlFor="dotdensity" className="text-stone-300">
//                   Dot Density
//                 </Label>
//                 <Select value={dotDensity} onValueChange={setDotDensity}>
//                   <SelectTrigger id="dotdensity" className="bg-stone-800 border-stone-700 text-stone-300">
//                     <SelectValue placeholder="Select dot density" />
//                   </SelectTrigger>
//                   <SelectContent className="bg-stone-800 border-stone-700 text-stone-300">
//                     <SelectItem value="low" className="focus:bg-stone-700 focus:text-stone-100">
//                       Low Density
//                     </SelectItem>
//                     <SelectItem value="medium" className="focus:bg-stone-700 focus:text-stone-100">
//                       Medium Density
//                     </SelectItem>
//                     <SelectItem value="high" className="focus:bg-stone-700 focus:text-stone-100">
//                       High Density
//                     </SelectItem>
//                     <SelectItem value="ultra" className="focus:bg-stone-700 focus:text-stone-100">
//                       Ultra High
//                     </SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>

//               <div className="space-y-2 border-t border-stone-700 pt-4">
//                 <div className="flex items-center justify-between">
//                   <Label htmlFor="threshold" className="text-stone-300">
//                     Threshold: {threshold.toFixed(2)}
//                   </Label>
//                 </div>
//                 <Slider
//                   id="threshold"
//                   min={0.1}
//                   max={0.9}
//                   step={0.05}
//                   value={[threshold]}
//                   onValueChange={(value) => setThreshold(value[0])}
//                   className="[&>span]:border-none [&_.bg-primary]:bg-stone-800 [&>.bg-background]:bg-stone-500/30"
//                 />
//               </div>

//               <div className="flex items-center space-x-2 border-t border-stone-700 pt-4">
//                 <Switch
//                   id="invert"
//                   checked={inverted}
//                   onCheckedChange={setInverted}
//                   className="data-[state=checked]:bg-stone-600"
//                 />
//                 <Label htmlFor="invert" className="text-stone-300">
//                   Invert Colors
//                 </Label>
//               </div>

//               <div className="flex items-center space-x-2 border-t border-stone-700 pt-4">
//                 <Switch
//                   id="grayscale"
//                   checked={grayscale}
//                   onCheckedChange={setGrayscale}
//                   className="data-[state=checked]:bg-stone-600"
//                 />
//                 <Label htmlFor="grayscale" className="text-stone-300">
//                   Grayscale Mode
//                 </Label>
//               </div>

//               <div className="hidden">
//                 <canvas ref={canvasRef} width="300" height="300"></canvas>
//                 <input
//                   type="file"
//                   ref={fileInputRef}
//                   accept="image/*"
//                   onChange={handleFileInputChange}
//                   className="hidden"
//                 />
//               </div>

//               <div className="flex gap-2 pt-4 border-t border-stone-700">
//                 <Button
//                   onClick={() => {
//                     if (!brailleArt) {
//                       setError("No Braille art to copy")
//                       return
//                     }
//                     const el = document.createElement("textarea")
//                     el.value = brailleArt
//                     document.body.appendChild(el)
//                     el.select()
//                     document.execCommand("copy")
//                     document.body.removeChild(el)
//                     alert("Braille art copied to clipboard!")
//                   }}
//                   className="flex-1 bg-stone-700 hover:bg-stone-600 text-stone-200 border-stone-600"
//                   disabled={loading || !imageLoaded}
//                 >
//                   {sidebarNarrow ? "Copy" : "Copy Braille Art"}
//                 </Button>

//                 <Button
//                   onClick={downloadBrailleArt}
//                   className="bg-stone-700 hover:bg-stone-600 text-stone-200 border-stone-600"
//                   title="Download Braille Art"
//                   disabled={loading || !imageLoaded || !brailleArt}
//                 >
//                   <Download className="h-4 w-4" />
//                 </Button>

//                 <Button
//                   onClick={() => fileInputRef.current?.click()}
//                   className="bg-stone-700 hover:bg-stone-600 text-stone-200 border-stone-600"
//                   title="Upload Image"
//                 >
//                   <Upload className="h-4 w-4" />
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }


"use client"

import type React from "react"
import { useState, useEffect, useRef, type ChangeEvent } from "react"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { GripVertical, Upload, Info } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

// Define a type for colored Braille characters
type ColoredChar = {
  char: string
  color: string
}

export default function BrailleConverter() {
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

  const [resolution, setResolution] = useState(0.15)
  const [inverted, setInverted] = useState(false)
  const [grayscale, setGrayscale] = useState(true)
  const [threshold, setThreshold] = useState(0.5)
  const [dotDensity, setDotDensity] = useState("medium")
  const [loading, setLoading] = useState(true)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [brailleArt, setBrailleArt] = useState<string>("")
  const [coloredBrailleArt, setColoredBrailleArt] = useState<ColoredChar[][]>([])
  const [leftPanelWidth, setLeftPanelWidth] = useState(25)
  const [isDragging, setIsDragging] = useState(false)
  const [isDraggingFile, setIsDraggingFile] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isDesktop, setIsDesktop] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)
  const [sidebarNarrow, setSidebarNarrow] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imageRef = useRef<HTMLImageElement | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const previewRef = useRef<HTMLDivElement>(null)
  const outputCanvasRef = useRef<HTMLCanvasElement>(null)

  // Braille Unicode patterns (2x4 dot matrix)
  const braillePatterns = [
    "⠀",
    "⠁",
    "⠂",
    "⠃",
    "⠄",
    "⠅",
    "⠆",
    "⠇",
    "⠈",
    "⠉",
    "⠊",
    "⠋",
    "⠌",
    "⠍",
    "⠎",
    "⠏",
    "⠐",
    "⠑",
    "⠒",
    "⠓",
    "⠔",
    "⠕",
    "⠖",
    "⠗",
    "⠘",
    "⠙",
    "⠚",
    "⠛",
    "⠜",
    "⠝",
    "⠞",
    "⠟",
    "⠠",
    "⠡",
    "⠢",
    "⠣",
    "⠤",
    "⠥",
    "⠦",
    "⠧",
    "⠨",
    "⠩",
    "⠪",
    "⠫",
    "⠬",
    "⠭",
    "⠮",
    "⠯",
    "⠰",
    "⠱",
    "⠲",
    "⠳",
    "⠴",
    "⠵",
    "⠶",
    "⠷",
    "⠸",
    "⠹",
    "⠺",
    "⠻",
    "⠼",
    "⠽",
    "⠾",
    "⠿",
    "⡀",
    "⡁",
    "⡂",
    "⡃",
    "⡄",
    "⡅",
    "⡆",
    "⡇",
    "⡈",
    "⡉",
    "⡊",
    "⡋",
    "⡌",
    "⡍",
    "⡎",
    "⡏",
    "⡐",
    "⡑",
    "⡒",
    "⡓",
    "⡔",
    "⡕",
    "⡖",
    "⡗",
    "⡘",
    "⡙",
    "⡚",
    "⡛",
    "⡜",
    "⡝",
    "⡞",
    "⡟",
    "⡠",
    "⡡",
    "⡢",
    "⡣",
    "⡤",
    "⡥",
    "⡦",
    "⡧",
    "⡨",
    "⡩",
    "⡪",
    "⡫",
    "⡬",
    "⡭",
    "⡮",
    "⡯",
    "⡰",
    "⡱",
    "⡲",
    "⡳",
    "⡴",
    "⡵",
    "⡶",
    "⡷",
    "⡸",
    "⡹",
    "⡺",
    "⡻",
    "⡼",
    "⡽",
    "⡾",
    "⡿",
    "⢀",
    "⢁",
    "⢂",
    "⢃",
    "⢄",
    "⢅",
    "⢆",
    "⢇",
    "⢈",
    "⢉",
    "⢊",
    "⢋",
    "⢌",
    "⢍",
    "⢎",
    "⢏",
    "⢐",
    "⢑",
    "⢒",
    "⢓",
    "⢔",
    "⢕",
    "⢖",
    "⢗",
    "⢘",
    "⢙",
    "⢚",
    "⢛",
    "⢜",
    "⢝",
    "⢞",
    "⢟",
    "⢠",
    "⢡",
    "⢢",
    "⢣",
    "⢤",
    "⢥",
    "⢦",
    "⢧",
    "⢨",
    "⢩",
    "⢪",
    "⢫",
    "⢬",
    "⢭",
    "⢮",
    "⢯",
    "⢰",
    "⢱",
    "⢲",
    "⢳",
    "⢴",
    "⢵",
    "⢶",
    "⢷",
    "⢸",
    "⢹",
    "⢺",
    "⢻",
    "⢼",
    "⢽",
    "⢾",
    "⢿",
    "⣀",
    "⣁",
    "⣂",
    "⣃",
    "⣄",
    "⣅",
    "⣆",
    "⣇",
    "⣈",
    "⣉",
    "⣊",
    "⣋",
    "⣌",
    "⣍",
    "⣎",
    "⣏",
    "⣐",
    "⣑",
    "⣒",
    "⣓",
    "⣔",
    "⣕",
    "⣖",
    "⣗",
    "⣘",
    "⣙",
    "⣚",
    "⣛",
    "⣜",
    "⣝",
    "⣞",
    "⣟",
    "⣠",
    "⣡",
    "⣢",
    "⣣",
    "⣤",
    "⣥",
    "⣦",
    "⣧",
    "⣨",
    "⣩",
    "⣪",
    "⣫",
    "⣬",
    "⣭",
    "⣮",
    "⣯",
    "⣰",
    "⣱",
    "⣲",
    "⣳",
    "⣴",
    "⣵",
    "⣶",
    "⣷",
    "⣸",
    "⣹",
    "⣺",
    "⣻",
    "⣼",
    "⣽",
    "⣾",
    "⣿",
  ]

  const dotDensityModes = {
    low: { threshold: 0.7, name: "Low Density" },
    medium: { threshold: 0.5, name: "Medium Density" },
    high: { threshold: 0.3, name: "High Density" },
    ultra: { threshold: 0.1, name: "Ultra High" },
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
      convertToBraille()
    }
  }, [resolution, inverted, grayscale, threshold, dotDensity, imageLoaded])

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

  const renderToCanvas = () => {
    if (!outputCanvasRef.current || !brailleArt || coloredBrailleArt.length === 0) return

    const canvas = outputCanvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const fontSize = 12
    ctx.font = `${fontSize}px monospace`
    ctx.textBaseline = "top"

    const lineHeight = fontSize * 1.2
    const charWidth = fontSize * 0.6

    if (grayscale) {
      const lines = brailleArt.split("\n")
      const maxLineLength = Math.max(...lines.map((line) => line.length))
      canvas.width = maxLineLength * charWidth
      canvas.height = lines.length * lineHeight
    } else {
      canvas.width = coloredBrailleArt[0].length * charWidth
      canvas.height = coloredBrailleArt.length * lineHeight
    }

    ctx.font = `${fontSize}px monospace`
    ctx.textBaseline = "top"

    if (grayscale) {
      ctx.fillStyle = "white"
      brailleArt.split("\n").forEach((line, lineIndex) => {
        ctx.fillText(line, 0, lineIndex * lineHeight)
      })
    } else {
      coloredBrailleArt.forEach((row, rowIndex) => {
        row.forEach((col, colIndex) => {
          ctx.fillStyle = col.color
          ctx.fillText(col.char, colIndex * charWidth, rowIndex * lineHeight)
        })
      })
    }
  }

  useEffect(() => {
    if (imageLoaded && !loading && !error) {
      renderToCanvas()
    }
  }, [brailleArt, coloredBrailleArt, grayscale, loading, error, imageLoaded])

  const convertToBraille = () => {
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

      // Calculate dimensions based on resolution
      const width = Math.floor(img.width * resolution)
      const height = Math.floor(img.height * resolution)

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

      // Braille characters are 2x4 dot matrices
      const brailleWidth = 2
      const brailleHeight = 4

      const widthStep = Math.ceil(img.width / width)
      const heightStep = Math.ceil(img.height / height)

      let result = ""
      const coloredResult: ColoredChar[][] = []

      const currentThreshold = dotDensityModes[dotDensity as keyof typeof dotDensityModes].threshold

      // Process the image in 2x4 blocks for Braille characters
      for (let y = 0; y < img.height; y += heightStep * brailleHeight) {
        const coloredRow: ColoredChar[] = []

        for (let x = 0; x < img.width; x += widthStep * brailleWidth) {
          let brailleValue = 0
          let avgR = 0,
            avgG = 0,
            avgB = 0
          let pixelCount = 0

          // Check each dot position in the 2x4 Braille matrix
          for (let dy = 0; dy < brailleHeight; dy++) {
            for (let dx = 0; dx < brailleWidth; dx++) {
              const pixelX = x + dx * widthStep
              const pixelY = y + dy * heightStep

              if (pixelX < img.width && pixelY < img.height) {
                const pos = (pixelY * img.width + pixelX) * 4
                const r = data[pos]
                const g = data[pos + 1]
                const b = data[pos + 2]

                avgR += r
                avgG += g
                avgB += b
                pixelCount++

                // Calculate brightness
                let brightness
                if (grayscale) {
                  brightness = (r * 0.299 + g * 0.587 + b * 0.114) / 255
                } else {
                  brightness = Math.sqrt(
                    0.299 * (r / 255) * (r / 255) + 0.587 * (g / 255) * (g / 255) + 0.114 * (b / 255) * (b / 255),
                  )
                }

                if (inverted) brightness = 1 - brightness

                // Set the corresponding Braille dot if brightness exceeds threshold
                if (brightness > currentThreshold) {
                  // Braille dot positions (Unicode Braille pattern)
                  const dotPosition = dy * 2 + dx
                  const dotValues = [1, 8, 2, 16, 4, 32, 64, 128] // Braille dot bit positions
                  if (dotPosition < dotValues.length) {
                    brailleValue |= dotValues[dotPosition]
                  }
                }
              }
            }
          }

          // Get the Braille character from the pattern
          const brailleChar = braillePatterns[brailleValue] || "⠀"
          result += brailleChar

          // Calculate average color for this Braille character
          if (pixelCount > 0) {
            avgR = Math.round(avgR / pixelCount)
            avgG = Math.round(avgG / pixelCount)
            avgB = Math.round(avgB / pixelCount)
          }

          if (!grayscale) {
            const brightnessFactor = (brailleValue / 255) * 1.5 + 0.5
            const color = adjustColorBrightness(avgR, avgG, avgB, brightnessFactor)
            coloredRow.push({ char: brailleChar, color })
          } else {
            coloredRow.push({ char: brailleChar, color: "white" })
          }
        }

        result += "\n"
        coloredResult.push(coloredRow)
      }

      setBrailleArt(result)
      setColoredBrailleArt(coloredResult)
      setError(null)
    } catch (err) {
      console.error("Error converting to Braille:", err)
      setError(err instanceof Error ? err.message : "Unknown error occurred")
      setBrailleArt("")
      setColoredBrailleArt([])
    }
  }

  const downloadBrailleArt = () => {
    if (!outputCanvasRef.current) {
      setError("No Braille art to download")
      return
    }

    // Create a link element and trigger download
    const link = document.createElement("a")
    link.download = "braille-art.png"
    link.href = outputCanvasRef.current.toDataURL("image/png")
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
        {/* Braille Art Preview */}
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
              className="max-w-full select-text"
              style={{
                fontSize: "0.6rem",
                lineHeight: "0.7rem",
                fontFamily: "monospace",
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
              <h1 className="text-lg text-stone-100 font-bold">Braille Art Converter</h1>
              <p className="text-xs text-stone-400">
                Transform images into tactile Braille patterns - download as image or copy as text
              </p>
              {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
            </div>

            {/* Info Card */}
            <Card className="bg-stone-800 border-stone-600">
              <CardContent className="p-3">
                <div className="flex items-start space-x-2">
                  <Info className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                  <div className="text-xs text-stone-300">
                    <p className="font-semibold text-blue-400 mb-1">About Braille Art</p>
                    <p>
                      Braille art uses the 6-dot Braille system to create tactile images. Each character represents a
                      2×3 dot pattern. Download as an image to share or copy the text for accessibility tools.
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
                    htmlFor="braille-file-upload"
                    className="flex flex-col items-center justify-center w-full h-24 border-2 border-stone-600 border-dashed rounded-lg cursor-pointer bg-stone-800 hover:bg-stone-700 transition-colors"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-2 text-stone-400" />
                      <p className="mb-2 text-sm text-stone-400">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                    </div>
                    <input
                      id="braille-file-upload"
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
                  <Label htmlFor="resolution" className="text-stone-300">
                    Resolution: {resolution.toFixed(2)}
                  </Label>
                </div>
                <Slider
                  id="resolution"
                  min={0.05}
                  max={0.4}
                  step={0.01}
                  value={[resolution]}
                  onValueChange={(value) => setResolution(value[0])}
                  className="[&>span]:border-none [&_.bg-primary]:bg-stone-800 [&>.bg-background]:bg-stone-500/30"
                />
              </div>

              <div className="space-y-2 border-t border-stone-700 pt-4">
                <Label htmlFor="dotdensity" className="text-stone-300">
                  Dot Density
                </Label>
                <Select value={dotDensity} onValueChange={setDotDensity}>
                  <SelectTrigger id="dotdensity" className="bg-stone-800 border-stone-700 text-stone-300">
                    <SelectValue placeholder="Select dot density" />
                  </SelectTrigger>
                  <SelectContent className="bg-stone-800 border-stone-700 text-stone-300">
                    <SelectItem value="low" className="focus:bg-stone-700 focus:text-stone-100">
                      Low Density
                    </SelectItem>
                    <SelectItem value="medium" className="focus:bg-stone-700 focus:text-stone-100">
                      Medium Density
                    </SelectItem>
                    <SelectItem value="high" className="focus:bg-stone-700 focus:text-stone-100">
                      High Density
                    </SelectItem>
                    <SelectItem value="ultra" className="focus:bg-stone-700 focus:text-stone-100">
                      Ultra High
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 border-t border-stone-700 pt-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="threshold" className="text-stone-300">
                    Threshold: {threshold.toFixed(2)}
                  </Label>
                </div>
                <Slider
                  id="threshold"
                  min={0.1}
                  max={0.9}
                  step={0.05}
                  value={[threshold]}
                  onValueChange={(value) => setThreshold(value[0])}
                  className="[&>span]:border-none [&_.bg-primary]:bg-stone-800 [&>.bg-background]:bg-stone-500/30"
                />
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
                  onClick={downloadBrailleArt}
                  className="flex-1 bg-stone-700 hover:bg-stone-600 text-stone-200 border-stone-600"
                  disabled={loading || !imageLoaded || !brailleArt}
                >
                  {sidebarNarrow ? "Download" : "Download Image"}
                </Button>

                <Button
                  onClick={() => {
                    if (!brailleArt) {
                      setError("No Braille art to copy")
                      return
                    }
                    const el = document.createElement("textarea")
                    el.value = brailleArt
                    document.body.appendChild(el)
                    el.select()
                    document.execCommand("copy")
                    document.body.removeChild(el)
                    alert("Braille text copied to clipboard!")
                  }}
                  variant="outline"
                  className="bg-stone-800 hover:bg-stone-700 text-stone-300 border-stone-600"
                  disabled={loading || !imageLoaded}
                  title="Copy Braille Text"
                >
                  Copy
                </Button>

                <Button
                  onClick={() => fileInputRef.current?.click()}
                  variant="outline"
                  className="bg-stone-800 hover:bg-stone-700 text-stone-300 border-stone-600"
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
