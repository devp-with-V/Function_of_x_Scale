// "use client"

// import type React from "react"

// import { useState, useRef, useEffect } from "react"
// import { Button } from "@/components/ui/button"
// import { Slider } from "@/components/ui/slider"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Card, CardContent } from "@/components/ui/card"
// import { Label } from "@/components/ui/label"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Switch } from "@/components/ui/switch"
// import { Upload, Download, Info, Zap } from "lucide-react"
// import { Badge } from "@/components/ui/badge"

// export default function FourierTransformAnalyzer() {
//   const [imageLoaded, setImageLoaded] = useState(false)
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState<string | null>(null)
//   const [transformType, setTransformType] = useState<"fft" | "dct" | "wavelet">("fft")
//   const [filterType, setFilterType] = useState<"lowpass" | "highpass" | "bandpass" | "none">("none")
//   const [filterStrength, setFilterStrength] = useState(50)
//   const [showPhase, setShowPhase] = useState(false)
//   const [logScale, setLogScale] = useState(true)
//   const [colormap, setColormap] = useState<"viridis" | "jet" | "grayscale">("viridis")

//   const originalCanvasRef = useRef<HTMLCanvasElement>(null)
//   const magnitudeCanvasRef = useRef<HTMLCanvasElement>(null)
//   const phaseCanvasRef = useRef<HTMLCanvasElement>(null)
//   const reconstructedCanvasRef = useRef<HTMLCanvasElement>(null)
//   const fileInputRef = useRef<HTMLInputElement>(null)
//   const imageRef = useRef<HTMLImageElement | null>(null)

//   useEffect(() => {
//     if (imageLoaded && imageRef.current) {
//       processImage()
//     }
//   }, [imageLoaded, transformType, filterType, filterStrength, logScale, colormap])

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

//     img.src = "/placeholder.svg?height=512&width=512"
//   }

//   useEffect(() => {
//     loadDefaultImage()
//   }, [])

//   const handleFileUpload = (file: File) => {
//     if (!file.type.startsWith("image/")) {
//       setError("Please upload an image file")
//       return
//     }

//     const reader = new FileReader()
//     reader.onload = (e) => {
//       if (e.target?.result) {
//         const img = new Image()
//         img.crossOrigin = "anonymous"

//         img.onload = () => {
//           imageRef.current = img
//           setImageLoaded(true)
//           setLoading(false)
//         }

//         img.onerror = () => {
//           setError("Failed to load image")
//           setLoading(false)
//         }

//         img.src = e.target.result as string
//       }
//     }
//     reader.onerror = () => {
//       setError("Failed to read file")
//     }
//     reader.readAsDataURL(file)
//   }

//   const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       setLoading(true)
//       handleFileUpload(e.target.files[0])
//     }
//   }

//   const processImage = () => {
//     if (!imageRef.current) return

//     try {
//       // Draw original image
//       const originalCanvas = originalCanvasRef.current
//       if (!originalCanvas) return

//       const ctx = originalCanvas.getContext("2d")
//       if (!ctx) return

//       // Make canvas power of 2 size for FFT efficiency
//       const size = nextPowerOf2(Math.max(imageRef.current.width, imageRef.current.height))
//       originalCanvas.width = size
//       originalCanvas.height = size

//       // Clear and draw image centered
//       ctx.fillStyle = "black"
//       ctx.fillRect(0, 0, size, size)

//       const offsetX = (size - imageRef.current.width) / 2
//       const offsetY = (size - imageRef.current.height) / 2

//       ctx.drawImage(imageRef.current, offsetX, offsetY, imageRef.current.width, imageRef.current.height)

//       // Get image data
//       const imageData = ctx.getImageData(0, 0, size, size)

//       // Perform selected transform
//       performTransform(imageData)
//     } catch (err) {
//       console.error("Error processing image:", err)
//       setError(err instanceof Error ? err.message : "Unknown error occurred")
//     }
//   }

//   const nextPowerOf2 = (n: number): number => {
//     return Math.pow(2, Math.ceil(Math.log2(n)))
//   }

//   const performTransform = (imageData: ImageData) => {
//     // This is a placeholder for the actual transform implementation
//     // In a real implementation, we would:
//     // 1. Convert image to grayscale or process each channel
//     // 2. Apply windowing function
//     // 3. Perform FFT/DCT/Wavelet transform
//     // 4. Apply filtering in frequency domain
//     // 5. Visualize magnitude and phase
//     // 6. Perform inverse transform

//     const { width, height } = imageData

//     // Draw placeholder magnitude spectrum
//     const magnitudeCanvas = magnitudeCanvasRef.current
//     if (magnitudeCanvas) {
//       magnitudeCanvas.width = width
//       magnitudeCanvas.height = height
//       const ctx = magnitudeCanvas.getContext("2d")
//       if (ctx) {
//         // Create a simulated FFT magnitude spectrum
//         const gradient = ctx.createRadialGradient(width / 2, height / 2, 5, width / 2, height / 2, width / 2)

//         gradient.addColorStop(0, "white")
//         gradient.addColorStop(1, "black")

//         ctx.fillStyle = gradient
//         ctx.fillRect(0, 0, width, height)

//         // Add some frequency components
//         for (let i = 0; i < 8; i++) {
//           const angle = Math.random() * Math.PI * 2
//           const distance = (Math.random() * width) / 4 + width / 8
//           ctx.fillStyle = "white"
//           ctx.beginPath()
//           ctx.arc(
//             width / 2 + Math.cos(angle) * distance,
//             height / 2 + Math.sin(angle) * distance,
//             3 + Math.random() * 5,
//             0,
//             Math.PI * 2,
//           )
//           ctx.fill()
//         }

//         // Apply colormap
//         applyColormap(ctx, width, height)
//       }
//     }

//     // Draw placeholder phase spectrum
//     const phaseCanvas = phaseCanvasRef.current
//     if (phaseCanvas) {
//       phaseCanvas.width = width
//       phaseCanvas.height = height
//       const ctx = phaseCanvas.getContext("2d")
//       if (ctx) {
//         // Create a simulated phase spectrum
//         for (let y = 0; y < height; y++) {
//           for (let x = 0; x < width; x++) {
//             const angle = Math.atan2(y - height / 2, x - width / 2)
//             const normalizedAngle = (angle + Math.PI) / (2 * Math.PI)
//             const value = Math.floor(normalizedAngle * 255)
//             ctx.fillStyle = `rgb(${value}, ${value}, ${value})`
//             ctx.fillRect(x, y, 1, 1)
//           }
//         }
//       }
//     }

//     // Draw placeholder reconstructed image
//     const reconstructedCanvas = reconstructedCanvasRef.current
//     if (reconstructedCanvas) {
//       reconstructedCanvas.width = width
//       reconstructedCanvas.height = height
//       const ctx = reconstructedCanvas.getContext("2d")
//       if (ctx) {
//         // Apply filter effect to original image
//         ctx.drawImage(originalCanvasRef.current!, 0, 0)

//         // Apply a simple filter based on filter type
//         const filterData = ctx.getImageData(0, 0, width, height)
//         const data = filterData.data

//         const strength = filterStrength / 100

//         for (let i = 0; i < data.length; i += 4) {
//           switch (filterType) {
//             case "lowpass":
//               // Blur effect
//               data[i] = data[i] * (1 - strength) + 128 * strength
//               data[i + 1] = data[i + 1] * (1 - strength) + 128 * strength
//               data[i + 2] = data[i + 2] * (1 - strength) + 128 * strength
//               break
//             case "highpass":
//               // Edge enhancement
//               const avg = (data[i] + data[i + 1] + data[i + 2]) / 3
//               const diff = 128 - avg
//               data[i] += diff * strength
//               data[i + 1] += diff * strength
//               data[i + 2] += diff * strength
//               break
//             case "bandpass":
//               // Increase contrast
//               data[i] = 128 + (data[i] - 128) * (1 + strength)
//               data[i + 1] = 128 + (data[i + 1] - 128) * (1 + strength)
//               data[i + 2] = 128 + (data[i + 2] - 128) * (1 + strength)
//               break
//             default:
//               // No filter
//               break
//           }
//         }

//         ctx.putImageData(filterData, 0, 0)
//       }
//     }
//   }

//   const applyColormap = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
//     const imageData = ctx.getImageData(0, 0, width, height)
//     const data = imageData.data

//     for (let i = 0; i < data.length; i += 4) {
//       const value = data[i] // Grayscale value

//       switch (colormap) {
//         case "viridis":
//           // Approximate viridis colormap
//           const r = Math.sin(0.3 * Math.PI * (value / 255)) * 255
//           const g = Math.sin(0.5 * Math.PI * (value / 255)) * 255
//           const b = Math.cos(0.1 * Math.PI * (value / 255)) * 255
//           data[i] = r
//           data[i + 1] = g
//           data[i + 2] = b
//           break
//         case "jet":
//           // Approximate jet colormap
//           const v = value / 255
//           data[i] = Math.max(0, Math.min(255, 255 * 4 * (v - 0.75)))
//           data[i + 1] = Math.max(0, Math.min(255, 255 * 4 * Math.abs(v - 0.5) - 255))
//           data[i + 2] = Math.max(0, Math.min(255, 255 * 4 * (0.25 - v)))
//           break
//         case "grayscale":
//           // Already grayscale
//           break
//       }
//     }

//     ctx.putImageData(imageData, 0, 0)
//   }

//   const downloadImage = (canvas: HTMLCanvasElement | null, filename: string) => {
//     if (!canvas) return

//     const link = document.createElement("a")
//     link.download = filename
//     link.href = canvas.toDataURL("image/png")
//     link.click()
//   }

//   return (
//     <div className="min-h-screen bg-black text-white p-4 md:p-8">
//       <div className="max-w-7xl mx-auto">
//         <div className="flex items-center justify-between mb-6">
//           <div>
//             <div className="flex items-center gap-2">
//               <h1 className="text-2xl font-bold">Fourier Transform Analyzer</h1>
//               <Badge variant="outline" className="bg-yellow-900/30 text-yellow-500 border-yellow-500/50">
//                 Beta
//               </Badge>
//             </div>
//             <p className="text-gray-400 mt-1">Analyze and manipulate images in the frequency domain</p>
//           </div>
//         </div>

//         <Card className="bg-stone-800 border-stone-700 mb-6">
//           <CardContent className="p-4">
//             <div className="flex items-start gap-3">
//               <Info className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
//               <div>
//                 <p className="text-blue-400 font-medium mb-1">About Fourier Transform Analysis</p>
//                 <p className="text-sm text-gray-300">
//                   This tool applies mathematical transforms to convert images from the spatial domain to the frequency
//                   domain. The Fourier Transform reveals frequency patterns that aren't visible in the original image.
//                   You can apply filters in the frequency domain and see the results in real-time.
//                 </p>
//                 <p className="text-sm text-yellow-500 mt-2 flex items-center gap-1">
//                   <Zap className="h-4 w-4" />
//                   This feature is in beta testing and may not work perfectly.
//                 </p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           <div className="lg:col-span-2">
//             <Tabs defaultValue="original" className="w-full">
//               <TabsList className="bg-stone-800 border border-stone-700 mb-4">
//                 <TabsTrigger value="original">Original</TabsTrigger>
//                 <TabsTrigger value="magnitude">Magnitude Spectrum</TabsTrigger>
//                 <TabsTrigger value="phase">Phase Spectrum</TabsTrigger>
//                 <TabsTrigger value="reconstructed">Filtered Result</TabsTrigger>
//               </TabsList>

//               <TabsContent value="original" className="mt-0">
//                 <div className="border border-stone-700 rounded-lg overflow-hidden bg-stone-900">
//                   <canvas ref={originalCanvasRef} className="w-full h-auto max-h-[600px] object-contain" />
//                 </div>
//               </TabsContent>

//               <TabsContent value="magnitude" className="mt-0">
//                 <div className="border border-stone-700 rounded-lg overflow-hidden bg-stone-900">
//                   <canvas ref={magnitudeCanvasRef} className="w-full h-auto max-h-[600px] object-contain" />
//                 </div>
//               </TabsContent>

//               <TabsContent value="phase" className="mt-0">
//                 <div className="border border-stone-700 rounded-lg overflow-hidden bg-stone-900">
//                   <canvas ref={phaseCanvasRef} className="w-full h-auto max-h-[600px] object-contain" />
//                 </div>
//               </TabsContent>

//               <TabsContent value="reconstructed" className="mt-0">
//                 <div className="border border-stone-700 rounded-lg overflow-hidden bg-stone-900">
//                   <canvas ref={reconstructedCanvasRef} className="w-full h-auto max-h-[600px] object-contain" />
//                 </div>
//               </TabsContent>
//             </Tabs>
//           </div>

//           <div className="space-y-6">
//             <Card className="bg-stone-800 border-stone-700">
//               <CardContent className="p-4 space-y-4">
//                 <div>
//                   <Label htmlFor="file-upload" className="text-sm font-medium text-gray-300 mb-2 block">
//                     Upload Image
//                   </Label>
//                   <div className="flex items-center justify-center w-full">
//                     <label
//                       htmlFor="file-upload"
//                       className="flex flex-col items-center justify-center w-full h-24 border-2 border-stone-600 border-dashed rounded-lg cursor-pointer bg-stone-700/50 hover:bg-stone-700 transition-colors"
//                     >
//                       <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                         <Upload className="w-8 h-8 mb-2 text-stone-400" />
//                         <p className="mb-2 text-sm text-stone-400">
//                           <span className="font-semibold">Click to upload</span> or drag and drop
//                         </p>
//                       </div>
//                       <input
//                         id="file-upload"
//                         type="file"
//                         className="hidden"
//                         accept="image/*"
//                         onChange={handleFileInputChange}
//                         ref={fileInputRef}
//                       />
//                     </label>
//                   </div>
//                 </div>

//                 <div>
//                   <Label htmlFor="transform-type" className="text-sm font-medium text-gray-300 mb-2 block">
//                     Transform Type
//                   </Label>
//                   <Select value={transformType} onValueChange={(value) => setTransformType(value as any)}>
//                     <SelectTrigger id="transform-type" className="bg-stone-700 border-stone-600">
//                       <SelectValue placeholder="Select transform type" />
//                     </SelectTrigger>
//                     <SelectContent className="bg-stone-700 border-stone-600">
//                       <SelectItem value="fft">Fast Fourier Transform (FFT)</SelectItem>
//                       <SelectItem value="dct">Discrete Cosine Transform (DCT)</SelectItem>
//                       <SelectItem value="wavelet">Wavelet Transform</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>

//                 <div>
//                   <Label htmlFor="filter-type" className="text-sm font-medium text-gray-300 mb-2 block">
//                     Filter Type
//                   </Label>
//                   <Select value={filterType} onValueChange={(value) => setFilterType(value as any)}>
//                     <SelectTrigger id="filter-type" className="bg-stone-700 border-stone-600">
//                       <SelectValue placeholder="Select filter type" />
//                     </SelectTrigger>
//                     <SelectContent className="bg-stone-700 border-stone-600">
//                       <SelectItem value="none">No Filter</SelectItem>
//                       <SelectItem value="lowpass">Low Pass Filter</SelectItem>
//                       <SelectItem value="highpass">High Pass Filter</SelectItem>
//                       <SelectItem value="bandpass">Band Pass Filter</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>

//                 <div>
//                   <div className="flex items-center justify-between">
//                     <Label htmlFor="filter-strength" className="text-sm font-medium text-gray-300">
//                       Filter Strength: {filterStrength}%
//                     </Label>
//                   </div>
//                   <Slider
//                     id="filter-strength"
//                     min={0}
//                     max={100}
//                     step={1}
//                     value={[filterStrength]}
//                     onValueChange={(value) => setFilterStrength(value[0])}
//                     className="mt-2"
//                     disabled={filterType === "none"}
//                   />
//                 </div>

//                 <div>
//                   <Label htmlFor="colormap" className="text-sm font-medium text-gray-300 mb-2 block">
//                     Colormap
//                   </Label>
//                   <Select value={colormap} onValueChange={(value) => setColormap(value as any)}>
//                     <SelectTrigger id="colormap" className="bg-stone-700 border-stone-600">
//                       <SelectValue placeholder="Select colormap" />
//                     </SelectTrigger>
//                     <SelectContent className="bg-stone-700 border-stone-600">
//                       <SelectItem value="viridis">Viridis</SelectItem>
//                       <SelectItem value="jet">Jet</SelectItem>
//                       <SelectItem value="grayscale">Grayscale</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>

//                 <div className="flex items-center space-x-2">
//                   <Switch id="log-scale" checked={logScale} onCheckedChange={setLogScale} />
//                   <Label htmlFor="log-scale" className="text-sm font-medium text-gray-300">
//                     Logarithmic Scale
//                   </Label>
//                 </div>

//                 <div className="flex items-center space-x-2">
//                   <Switch id="show-phase" checked={showPhase} onCheckedChange={setShowPhase} />
//                   <Label htmlFor="show-phase" className="text-sm font-medium text-gray-300">
//                     Show Phase Information
//                   </Label>
//                 </div>

//                 <div className="flex gap-2 pt-2">
//                   <Button
//                     onClick={() => downloadImage(originalCanvasRef.current, "original.png")}
//                     className="flex-1 bg-stone-700 hover:bg-stone-600"
//                     disabled={!imageLoaded}
//                   >
//                     <Download className="h-4 w-4 mr-2" />
//                     Original
//                   </Button>
//                   <Button
//                     onClick={() => downloadImage(reconstructedCanvasRef.current, "filtered.png")}
//                     className="flex-1 bg-stone-700 hover:bg-stone-600"
//                     disabled={!imageLoaded}
//                   >
//                     <Download className="h-4 w-4 mr-2" />
//                     Result
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>

//             <Card className="bg-stone-800 border-stone-700">
//               <CardContent className="p-4">
//                 <h3 className="font-medium text-gray-200 mb-2">Mathematical Background</h3>
//                 <p className="text-sm text-gray-300 mb-2">
//                   The Fourier Transform decomposes an image into its sine and cosine components, revealing the frequency
//                   content.
//                 </p>
//                 <p className="text-sm text-gray-300">For a 2D image f(x,y), the Discrete Fourier Transform is:</p>
//                 <div className="bg-stone-900 p-3 rounded-md my-2 overflow-x-auto">
//                   <code className="text-green-400 text-sm">F(u,v) = ∑∑ f(x,y) * e^(-j2π(ux/M + vy/N))</code>
//                 </div>
//                 <p className="text-sm text-gray-300">
//                   Where F(u,v) is the frequency domain representation, with u and v as frequency variables.
//                 </p>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

"use client"
import { useState, useRef, useEffect, type ChangeEvent } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Upload, Download, Info, Zap } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Complex number operations
class Complex {
  constructor(
    public real: number,
    public imag: number,
  ) {}

  static add(a: Complex, b: Complex): Complex {
    return new Complex(a.real + b.real, a.imag + b.imag)
  }

  static subtract(a: Complex, b: Complex): Complex {
    return new Complex(a.real - b.real, a.imag - b.imag)
  }

  static multiply(a: Complex, b: Complex): Complex {
    return new Complex(a.real * b.real - a.imag * b.imag, a.real * b.imag + a.imag * b.real)
  }

  static exp(angle: number): Complex {
    return new Complex(Math.cos(angle), Math.sin(angle))
  }

  magnitude(): number {
    return Math.sqrt(this.real * this.real + this.imag * this.imag)
  }

  phase(): number {
    return Math.atan2(this.imag, this.real)
  }
}

export default function FourierTransformAnalyzer() {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [transformType, setTransformType] = useState<"fft" | "dct" | "wavelet">("fft")
  const [filterType, setFilterType] = useState<"lowpass" | "highpass" | "bandpass" | "none">("none")
  const [filterStrength, setFilterStrength] = useState(50)
  const [showPhase, setShowPhase] = useState(false)
  const [logScale, setLogScale] = useState(true)
  const [colormap, setColormap] = useState<"viridis" | "jet" | "grayscale">("viridis")
  const [processing, setProcessing] = useState(false)

  const originalCanvasRef = useRef<HTMLCanvasElement>(null)
  const magnitudeCanvasRef = useRef<HTMLCanvasElement>(null)
  const phaseCanvasRef = useRef<HTMLCanvasElement>(null)
  const reconstructedCanvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const imageRef = useRef<HTMLImageElement | null>(null)

  // Store transform data
  const [transformData, setTransformData] = useState<{
    magnitude: number[][]
    phase: number[][]
    original: ImageData | null
  }>({
    magnitude: [],
    phase: [],
    original: null,
  })

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

  useEffect(() => {
    if (imageLoaded && imageRef.current) {
      processImage()
    }
  }, [imageLoaded, transformType, logScale, colormap])

  useEffect(() => {
    if (transformData.magnitude.length > 0) {
      applyFilter()
    }
  }, [filterType, filterStrength, transformData.magnitude])

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

  useEffect(() => {
    loadDefaultImage()
  }, [])

  const handleFileUpload = (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file")
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      if (e.target?.result) {
        const img = new Image()
        img.crossOrigin = "anonymous"

        img.onload = () => {
          imageRef.current = img
          setImageLoaded(true)
          setLoading(false)
        }

        img.onerror = () => {
          setError("Failed to load image")
          setLoading(false)
        }

        img.src = e.target.result as string
      }
    }
    reader.onerror = () => {
      setError("Failed to read file")
    }
    reader.readAsDataURL(file)
  }

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLoading(true)
      handleFileUpload(e.target.files[0])
    }
  }

  const nextPowerOf2 = (n: number): number => {
    return Math.pow(2, Math.ceil(Math.log2(n)))
  }

  // 1D FFT implementation
  const fft1D = (input: Complex[]): Complex[] => {
    const N = input.length
    if (N <= 1) return input

    // Bit-reversal permutation
    const output = new Array(N)
    for (let i = 0; i < N; i++) {
      let j = 0
      for (let k = 0; k < Math.log2(N); k++) {
        j = (j << 1) | ((i >> k) & 1)
      }
      output[j] = input[i]
    }

    // Cooley-Tukey FFT
    for (let len = 2; len <= N; len *= 2) {
      const wlen = Complex.exp((-2 * Math.PI) / len)
      for (let i = 0; i < N; i += len) {
        let w = new Complex(1, 0)
        for (let j = 0; j < len / 2; j++) {
          const u = output[i + j]
          const v = Complex.multiply(output[i + j + len / 2], w)
          output[i + j] = Complex.add(u, v)
          output[i + j + len / 2] = Complex.subtract(u, v)
          w = Complex.multiply(w, wlen)
        }
      }
    }

    return output
  }

  // 2D FFT implementation
  const fft2D = (input: number[][]): Complex[][] => {
    const height = input.length
    const width = input[0].length

    // Convert to complex numbers
    const data: Complex[][] = input.map((row) => row.map((val) => new Complex(val, 0)))

    // FFT on rows
    for (let i = 0; i < height; i++) {
      data[i] = fft1D(data[i])
    }

    // Transpose
    const transposed: Complex[][] = []
    for (let j = 0; j < width; j++) {
      transposed[j] = []
      for (let i = 0; i < height; i++) {
        transposed[j][i] = data[i][j]
      }
    }

    // FFT on columns (now rows after transpose)
    for (let i = 0; i < width; i++) {
      transposed[i] = fft1D(transposed[i])
    }

    // Transpose back
    const result: Complex[][] = []
    for (let i = 0; i < height; i++) {
      result[i] = []
      for (let j = 0; j < width; j++) {
        result[i][j] = transposed[j][i]
      }
    }

    return result
  }

  // Inverse FFT
  const ifft1D = (input: Complex[]): Complex[] => {
    // Conjugate input
    const conjugated = input.map((c) => new Complex(c.real, -c.imag))

    // Apply FFT
    const result = fft1D(conjugated)

    // Conjugate and normalize
    return result.map((c) => new Complex(c.real / input.length, -c.imag / input.length))
  }

  const ifft2D = (input: Complex[][]): Complex[][] => {
    const height = input.length
    const width = input[0].length

    // Conjugate input
    const data = input.map((row) => row.map((c) => new Complex(c.real, -c.imag)))

    // IFFT on rows
    for (let i = 0; i < height; i++) {
      data[i] = fft1D(data[i])
    }

    // Transpose
    const transposed: Complex[][] = []
    for (let j = 0; j < width; j++) {
      transposed[j] = []
      for (let i = 0; i < height; i++) {
        transposed[j][i] = data[i][j]
      }
    }

    // IFFT on columns
    for (let i = 0; i < width; i++) {
      transposed[i] = fft1D(transposed[i])
    }

    // Transpose back and normalize
    const result: Complex[][] = []
    for (let i = 0; i < height; i++) {
      result[i] = []
      for (let j = 0; j < width; j++) {
        const val = transposed[j][i]
        result[i][j] = new Complex(val.real / (width * height), -val.imag / (width * height))
      }
    }

    return result
  }

  // DCT implementation
  const dct2D = (input: number[][]): number[][] => {
    const height = input.length
    const width = input[0].length
    const result: number[][] = []

    for (let u = 0; u < height; u++) {
      result[u] = []
      for (let v = 0; v < width; v++) {
        let sum = 0
        for (let x = 0; x < height; x++) {
          for (let y = 0; y < width; y++) {
            sum +=
              input[x][y] *
              Math.cos(((2 * x + 1) * u * Math.PI) / (2 * height)) *
              Math.cos(((2 * y + 1) * v * Math.PI) / (2 * width))
          }
        }

        const cu = u === 0 ? 1 / Math.sqrt(2) : 1
        const cv = v === 0 ? 1 / Math.sqrt(2) : 1
        result[u][v] = (2 / Math.sqrt(height * width)) * cu * cv * sum
      }
    }

    return result
  }

  const processImage = async () => {
    if (!imageRef.current) return

    setProcessing(true)
    setError(null)

    try {
      // Draw original image
      const originalCanvas = originalCanvasRef.current
      if (!originalCanvas) return

      const ctx = originalCanvas.getContext("2d")
      if (!ctx) return

      // Make canvas power of 2 size for FFT efficiency
      const maxSize = Math.max(imageRef.current.width, imageRef.current.height)
      const size = Math.min(nextPowerOf2(maxSize), 512) // Limit size for performance
      originalCanvas.width = size
      originalCanvas.height = size

      // Clear and draw image centered
      ctx.fillStyle = "black"
      ctx.fillRect(0, 0, size, size)

      const scale = Math.min(size / imageRef.current.width, size / imageRef.current.height)
      const scaledWidth = imageRef.current.width * scale
      const scaledHeight = imageRef.current.height * scale
      const offsetX = (size - scaledWidth) / 2
      const offsetY = (size - scaledHeight) / 2

      ctx.drawImage(imageRef.current, offsetX, offsetY, scaledWidth, scaledHeight)

      // Get image data
      const imageData = ctx.getImageData(0, 0, size, size)

      // Convert to grayscale
      const grayscaleData: number[][] = []
      for (let y = 0; y < size; y++) {
        grayscaleData[y] = []
        for (let x = 0; x < size; x++) {
          const idx = (y * size + x) * 4
          const gray = 0.299 * imageData.data[idx] + 0.587 * imageData.data[idx + 1] + 0.114 * imageData.data[idx + 2]
          grayscaleData[y][x] = gray
        }
      }

      // Perform selected transform
      let magnitude: number[][] = []
      let phase: number[][] = []

      if (transformType === "fft") {
        // Apply windowing function (Hann window)
        const windowedData = grayscaleData.map((row, y) =>
          row.map((val, x) => {
            const windowY = 0.5 * (1 - Math.cos((2 * Math.PI * y) / (size - 1)))
            const windowX = 0.5 * (1 - Math.cos((2 * Math.PI * x) / (size - 1)))
            return val * windowY * windowX
          }),
        )

        const fftResult = fft2D(windowedData)

        // Extract magnitude and phase
        magnitude = fftResult.map((row) => row.map((c) => c.magnitude()))
        phase = fftResult.map((row) => row.map((c) => c.phase()))

        // Shift zero frequency to center
        magnitude = fftShift(magnitude)
        phase = fftShift(phase)
      } else if (transformType === "dct") {
        const dctResult = dct2D(grayscaleData)
        magnitude = dctResult.map((row) => row.map((val) => Math.abs(val)))
        phase = dctResult.map((row) => row.map(() => 0)) // DCT is real-valued
      }

      setTransformData({
        magnitude,
        phase,
        original: imageData,
      })

      // Render magnitude spectrum
      renderSpectrum(magnitude, magnitudeCanvasRef.current, "magnitude")

      // Render phase spectrum if enabled
      if (showPhase) {
        renderSpectrum(phase, phaseCanvasRef.current, "phase")
      }
    } catch (err) {
      console.error("Error processing image:", err)
      setError(err instanceof Error ? err.message : "Unknown error occurred")
    } finally {
      setProcessing(false)
    }
  }

  const fftShift = (data: number[][]): number[][] => {
    const height = data.length
    const width = data[0].length
    const result: number[][] = []

    for (let i = 0; i < height; i++) {
      result[i] = []
      for (let j = 0; j < width; j++) {
        const newI = (i + height / 2) % height
        const newJ = (j + width / 2) % width
        result[i][j] = data[newI][newJ]
      }
    }

    return result
  }

  const renderSpectrum = (data: number[][], canvas: HTMLCanvasElement | null, type: "magnitude" | "phase") => {
    if (!canvas || data.length === 0) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const size = data.length
    canvas.width = size
    canvas.height = size

    const imageData = ctx.createImageData(size, size)

    // Find min and max values for normalization
    let minVal = Number.POSITIVE_INFINITY
    let maxVal = Number.NEGATIVE_INFINITY

    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        let val = data[y][x]
        if (logScale && type === "magnitude" && val > 0) {
          val = Math.log(1 + val)
        }
        minVal = Math.min(minVal, val)
        maxVal = Math.max(maxVal, val)
      }
    }

    // Render spectrum
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        let val = data[y][x]

        if (logScale && type === "magnitude" && val > 0) {
          val = Math.log(1 + val)
        }

        // Normalize to 0-1
        const normalized = (val - minVal) / (maxVal - minVal)

        const idx = (y * size + x) * 4
        const [r, g, b] = applyColormap(normalized)

        imageData.data[idx] = r
        imageData.data[idx + 1] = g
        imageData.data[idx + 2] = b
        imageData.data[idx + 3] = 255
      }
    }

    ctx.putImageData(imageData, 0, 0)
  }

  const applyColormap = (value: number): [number, number, number] => {
    const v = Math.max(0, Math.min(1, value))

    switch (colormap) {
      case "viridis":
        // Approximate viridis colormap
        const r = Math.max(0, Math.min(255, 255 * (0.267 + 0.005 * v + 0.322 * v * v)))
        const g = Math.max(0, Math.min(255, 255 * (0.004 + 0.396 * v + 0.58 * v * v)))
        const b = Math.max(0, Math.min(255, 255 * (0.329 + 0.718 * v - 0.047 * v * v)))
        return [r, g, b]

      case "jet":
        // Approximate jet colormap
        let red, green, blue
        if (v < 0.25) {
          red = 0
          green = 4 * v * 255
          blue = 255
        } else if (v < 0.5) {
          red = 0
          green = 255
          blue = 255 - 4 * (v - 0.25) * 255
        } else if (v < 0.75) {
          red = 4 * (v - 0.5) * 255
          green = 255
          blue = 0
        } else {
          red = 255
          green = 255 - 4 * (v - 0.75) * 255
          blue = 0
        }
        return [Math.round(red), Math.round(green), Math.round(blue)]

      case "grayscale":
      default:
        const gray = Math.round(v * 255)
        return [gray, gray, gray]
    }
  }

  const applyFilter = () => {
    if (transformData.magnitude.length === 0 || filterType === "none") {
      // No filter, copy original
      if (originalCanvasRef.current && reconstructedCanvasRef.current) {
        const ctx = reconstructedCanvasRef.current.getContext("2d")
        if (ctx) {
          reconstructedCanvasRef.current.width = originalCanvasRef.current.width
          reconstructedCanvasRef.current.height = originalCanvasRef.current.height
          ctx.drawImage(originalCanvasRef.current, 0, 0)
        }
      }
      return
    }

    const size = transformData.magnitude.length
    const centerX = size / 2
    const centerY = size / 2
    const maxRadius = size / 2
    const cutoffRadius = (filterStrength / 100) * maxRadius

    // Create filtered magnitude spectrum
    const filteredMagnitude = transformData.magnitude.map((row, y) =>
      row.map((val, x) => {
        const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2)

        let filterValue = 1
        switch (filterType) {
          case "lowpass":
            filterValue = distance <= cutoffRadius ? 1 : 0
            break
          case "highpass":
            filterValue = distance > cutoffRadius ? 1 : 0
            break
          case "bandpass":
            const bandwidth = maxRadius * 0.1
            filterValue = Math.abs(distance - cutoffRadius) <= bandwidth ? 1 : 0
            break
        }

        return val * filterValue
      }),
    )

    // Render filtered result (simplified - just apply filter to original image)
    if (originalCanvasRef.current && reconstructedCanvasRef.current && transformData.original) {
      const ctx = reconstructedCanvasRef.current.getContext("2d")
      if (ctx) {
        reconstructedCanvasRef.current.width = size
        reconstructedCanvasRef.current.height = size

        const imageData = new ImageData(new Uint8ClampedArray(transformData.original.data), size, size)

        // Apply simple spatial domain filter approximation
        const data = imageData.data
        for (let i = 0; i < data.length; i += 4) {
          const y = Math.floor(i / 4 / size)
          const x = (i / 4) % size
          const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2)

          let filterValue = 1
          switch (filterType) {
            case "lowpass":
              filterValue = Math.exp(-(distance * distance) / (2 * cutoffRadius * cutoffRadius))
              break
            case "highpass":
              filterValue = 1 - Math.exp(-(distance * distance) / (2 * cutoffRadius * cutoffRadius))
              break
            case "bandpass":
              const gaussian = Math.exp(-Math.pow(distance - cutoffRadius, 2) / (2 * Math.pow(maxRadius * 0.1, 2)))
              filterValue = gaussian
              break
          }

          data[i] *= filterValue // R
          data[i + 1] *= filterValue // G
          data[i + 2] *= filterValue // B
        }

        ctx.putImageData(imageData, 0, 0)
      }
    }
  }

  const downloadImage = (canvas: HTMLCanvasElement | null, filename: string) => {
    if (!canvas) return

    const link = document.createElement("a")
    link.download = filename
    link.href = canvas.toDataURL("image/png")
    link.click()
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">Fourier Transform Analyzer</h1>
              <Badge variant="outline" className="bg-yellow-900/30 text-yellow-500 border-yellow-500/50">
                Beta
              </Badge>
            </div>
            <p className="text-gray-400 mt-1">Analyze and manipulate images in the frequency domain</p>
          </div>
        </div>

        <Card className="bg-stone-800 border-stone-700 mb-6">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-blue-400 font-medium mb-1">About Fourier Transform Analysis</p>
                <p className="text-sm text-gray-300">
                  This tool applies mathematical transforms to convert images from the spatial domain to the frequency
                  domain. The Fourier Transform reveals frequency patterns that aren't visible in the original image.
                  You can apply filters in the frequency domain and see the results in real-time.
                </p>
                <p className="text-sm text-yellow-500 mt-2 flex items-center gap-1">
                  <Zap className="h-4 w-4" />
                  This feature is in beta testing. Complex transforms may take time to process.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Tabs defaultValue="original" className="w-full">
              <TabsList className="bg-stone-800 border border-stone-700 mb-4">
                <TabsTrigger value="original">Original</TabsTrigger>
                <TabsTrigger value="magnitude">Magnitude Spectrum</TabsTrigger>
                {showPhase && <TabsTrigger value="phase">Phase Spectrum</TabsTrigger>}
                <TabsTrigger value="reconstructed">Filtered Result</TabsTrigger>
              </TabsList>

              <TabsContent value="original" className="mt-0">
                <div className="border border-stone-700 rounded-lg overflow-hidden bg-stone-900">
                  {loading ? (
                    <div className="flex items-center justify-center h-64">
                      <div className="text-white">Loading image...</div>
                    </div>
                  ) : error ? (
                    <div className="flex items-center justify-center h-64">
                      <div className="text-red-400">{error}</div>
                    </div>
                  ) : (
                    <canvas ref={originalCanvasRef} className="w-full h-auto max-h-[600px] object-contain" />
                  )}
                </div>
              </TabsContent>

              <TabsContent value="magnitude" className="mt-0">
                <div className="border border-stone-700 rounded-lg overflow-hidden bg-stone-900">
                  {processing ? (
                    <div className="flex items-center justify-center h-64">
                      <div className="text-white">Processing transform...</div>
                    </div>
                  ) : (
                    <canvas ref={magnitudeCanvasRef} className="w-full h-auto max-h-[600px] object-contain" />
                  )}
                </div>
              </TabsContent>

              {showPhase && (
                <TabsContent value="phase" className="mt-0">
                  <div className="border border-stone-700 rounded-lg overflow-hidden bg-stone-900">
                    <canvas ref={phaseCanvasRef} className="w-full h-auto max-h-[600px] object-contain" />
                  </div>
                </TabsContent>
              )}

              <TabsContent value="reconstructed" className="mt-0">
                <div className="border border-stone-700 rounded-lg overflow-hidden bg-stone-900">
                  <canvas ref={reconstructedCanvasRef} className="w-full h-auto max-h-[600px] object-contain" />
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            <Card className="bg-stone-800 border-stone-700">
              <CardContent className="p-4 space-y-4">
                <div>
                  <Label htmlFor="file-upload" className="text-sm font-medium text-gray-300 mb-2 block">
                    Upload Image
                  </Label>
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="file-upload"
                      className="flex flex-col items-center justify-center w-full h-24 border-2 border-stone-600 border-dashed rounded-lg cursor-pointer bg-stone-700/50 hover:bg-stone-700 transition-colors"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-2 text-stone-400" />
                        <p className="mb-2 text-sm text-stone-400">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                      </div>
                      <input
                        id="file-upload"
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileInputChange}
                        ref={fileInputRef}
                      />
                    </label>
                  </div>
                </div>

                <div>
                  <Label htmlFor="transform-type" className="text-sm font-medium text-gray-300 mb-2 block">
                    Transform Type
                  </Label>
                  <Select value={transformType} onValueChange={(value) => setTransformType(value as any)}>
                    <SelectTrigger id="transform-type" className="bg-stone-700 border-stone-600">
                      <SelectValue placeholder="Select transform type" />
                    </SelectTrigger>
                    <SelectContent className="bg-stone-700 border-stone-600">
                      <SelectItem value="fft">Fast Fourier Transform (FFT)</SelectItem>
                      <SelectItem value="dct">Discrete Cosine Transform (DCT)</SelectItem>
                      <SelectItem value="wavelet" disabled>
                        Wavelet Transform (Coming Soon)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="filter-type" className="text-sm font-medium text-gray-300 mb-2 block">
                    Filter Type
                  </Label>
                  <Select value={filterType} onValueChange={(value) => setFilterType(value as any)}>
                    <SelectTrigger id="filter-type" className="bg-stone-700 border-stone-600">
                      <SelectValue placeholder="Select filter type" />
                    </SelectTrigger>
                    <SelectContent className="bg-stone-700 border-stone-600">
                      <SelectItem value="none">No Filter</SelectItem>
                      <SelectItem value="lowpass">Low Pass Filter</SelectItem>
                      <SelectItem value="highpass">High Pass Filter</SelectItem>
                      <SelectItem value="bandpass">Band Pass Filter</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="filter-strength" className="text-sm font-medium text-gray-300">
                      Filter Cutoff: {filterStrength}%
                    </Label>
                  </div>
                  <Slider
                    id="filter-strength"
                    min={0}
                    max={100}
                    step={1}
                    value={[filterStrength]}
                    onValueChange={(value) => setFilterStrength(value[0])}
                    className="mt-2"
                    disabled={filterType === "none"}
                  />
                </div>

                <div>
                  <Label htmlFor="colormap" className="text-sm font-medium text-gray-300 mb-2 block">
                    Colormap
                  </Label>
                  <Select value={colormap} onValueChange={(value) => setColormap(value as any)}>
                    <SelectTrigger id="colormap" className="bg-stone-700 border-stone-600">
                      <SelectValue placeholder="Select colormap" />
                    </SelectTrigger>
                    <SelectContent className="bg-stone-700 border-stone-600">
                      <SelectItem value="viridis">Viridis</SelectItem>
                      <SelectItem value="jet">Jet</SelectItem>
                      <SelectItem value="grayscale">Grayscale</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="log-scale" checked={logScale} onCheckedChange={setLogScale} />
                  <Label htmlFor="log-scale" className="text-sm font-medium text-gray-300">
                    Logarithmic Scale
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="show-phase" checked={showPhase} onCheckedChange={setShowPhase} />
                  <Label htmlFor="show-phase" className="text-sm font-medium text-gray-300">
                    Show Phase Information
                  </Label>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button
                    onClick={() => downloadImage(originalCanvasRef.current, "original.png")}
                    className="flex-1 bg-stone-700 hover:bg-stone-600"
                    disabled={!imageLoaded}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Original
                  </Button>
                  <Button
                    onClick={() => downloadImage(reconstructedCanvasRef.current, "filtered.png")}
                    className="flex-1 bg-stone-700 hover:bg-stone-600"
                    disabled={!imageLoaded}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Result
                  </Button>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={() => downloadImage(magnitudeCanvasRef.current, "magnitude-spectrum.png")}
                    className="flex-1 bg-stone-700 hover:bg-stone-600"
                    disabled={!imageLoaded || transformData.magnitude.length === 0}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Magnitude
                  </Button>
                  {showPhase && (
                    <Button
                      onClick={() => downloadImage(phaseCanvasRef.current, "phase-spectrum.png")}
                      className="flex-1 bg-stone-700 hover:bg-stone-600"
                      disabled={!imageLoaded || transformData.phase.length === 0}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Phase
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-stone-800 border-stone-700">
              <CardContent className="p-4">
                <h3 className="font-medium text-gray-200 mb-2">Mathematical Background</h3>
                <p className="text-sm text-gray-300 mb-2">
                  The Fourier Transform decomposes an image into its sine and cosine components, revealing the frequency
                  content.
                </p>
                <p className="text-sm text-gray-300">For a 2D image f(x,y), the Discrete Fourier Transform is:</p>
                <div className="bg-stone-900 p-3 rounded-md my-2 overflow-x-auto">
                  <code className="text-green-400 text-sm">F(u,v) = ∑∑ f(x,y) * e^(-j2π(ux/M + vy/N))</code>
                </div>
                <p className="text-sm text-gray-300">
                  Where F(u,v) is the frequency domain representation, with u and v as frequency variables.
                </p>

                <div className="mt-4 p-3 bg-stone-900 rounded-md">
                  <h4 className="text-sm font-medium text-yellow-400 mb-1">Performance Notes:</h4>
                  <ul className="text-xs text-gray-400 space-y-1">
                    <li>• Images are resized to power-of-2 dimensions for FFT efficiency</li>
                    <li>• Maximum processing size is 512×512 for performance</li>
                    <li>• Complex transforms may take several seconds</li>
                    <li>• Windowing is applied to reduce spectral leakage</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
