// "use client"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import {
//   FileText,
//   ImageIcon,
//   Braces,
//   Palette,
//   FileIcon as FileVector,
//   Type,
//   WavesIcon as WaveSine,
//   Code,
//   Lightbulb,
//   Cpu,
//   Zap,
// } from "lucide-react"

// export default function DocsPage() {
//   return (
//     <div className="container mx-auto py-8 px-4">
//       <div className="text-center mb-8">
//         <h1 className="text-3xl font-bold mb-2">Documentation</h1>
//         <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
//           Learn about the technical details and algorithms behind our image converters
//         </p>
//       </div>

//       <Tabs defaultValue="ascii" className="max-w-4xl mx-auto">
//         <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-4">
//           <TabsTrigger value="ascii">ASCII Art</TabsTrigger>
//           <TabsTrigger value="pixel">Pixel Art</TabsTrigger>
//           <TabsTrigger value="braille">Braille Art</TabsTrigger>
//           <TabsTrigger value="text-portrait">Text Portrait</TabsTrigger>
//           <TabsTrigger value="color">Color Palette</TabsTrigger>
//           <TabsTrigger value="svg">SVG Trace</TabsTrigger>
//           <TabsTrigger value="fourier">Fourier Transform</TabsTrigger>
//         </TabsList>

//         {/* ASCII Art Documentation */}
//         <TabsContent value="ascii">
//           <Card>
//             <CardHeader>
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-2">
//                   <FileText className="h-6 w-6" />
//                   <CardTitle>ASCII Art Converter</CardTitle>
//                 </div>
//               </div>
//               <CardDescription>
//                 Converting images to text using character density mapping
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <section>
//                 <h3 className="text-lg font-medium mb-2">Technical Overview</h3>
//                 <p className="text-sm text-gray-500 dark:text-gray-400">
//                   The ASCII Art Converter transforms images into text representations by mapping pixel brightness values to ASCII characters of varying visual density.
//                 </p>
//               </section>

//               <section>
//                 <h3 className="text-lg font-medium mb-2">Algorithm Details</h3>
//                 <div className="space-y-2">
//                   <div className="bg-muted p-4 rounded-md">
//                     <h4 className="font-medium flex items-center gap-2 mb-1">
//                       <Code className="h-4 w-4" /> Luminance Calculation
//                     </h4>
//                     <p className="text-sm">
//                       For each pixel, we calculate its luminance (brightness) using the formula:
//                     </p>
//                     <pre className="text-xs bg-black/20 p-2 rounded mt-1 overflow-x-auto">
//                       luminance = 0.299 * R + 0.587 * G + 0.114 * B
//                     </pre>
//                     <p className="text-sm mt-2">
//                       This formula accounts for human perception of color channels, with green contributing most to perceived brightness.
//                     </p>
//                   </div>

//                   <div className="bg-muted p-4 rounded-md">
//                     <h4 className="font-medium flex items-center gap-2 mb-1">
//                       <Lightbulb className="h-4 w-4" /> Character Density Mapping
//                     </h4>
//                     <p className="text-sm">
//                       We map luminance values to characters from a predefined set, ordered by visual density:
//                     </p>
//                     <pre className="text-xs bg-black/20 p-2 rounded mt-1 overflow-x-auto">
//                       const charSet = " .,:;i1tfLCG08@"
//                       const index = Math.floor(luminance * (charSet.length - 1))
//                       const asciiChar = charSet[index]
//                     </pre>
//                   </div>

//                   <div className="bg-muted p-4 rounded-md">
//                     <h4 className="font-medium flex items-center gap-2 mb-1">
//                       <Cpu className="h-4 w-4" /> Aspect Ratio Correction
//                     </h4>
//                     <p className="text-sm">
//                       Since characters in a monospace font are taller than they are wide, we sample the image at different rates for width and height:
//                     </p>
//                     <pre className="text-xs bg-black/20 p-2 rounded mt-1 overflow-x-auto">
//                       const aspectRatio = originalHeight / originalWidth
//                       const outputWidth = desiredWidth
//                       const outputHeight = Math.floor(desiredWidth * aspectRatio * 0.5)
//                     </pre>
//                     <p className="text-sm mt-2">
//                       The 0.5 factor compensates for character aspect ratio in typical monospace fonts.
//                     </p>
//                   </div>
//                 </div>
//               </section>

//               <section>
//                 <h3 className="text-lg font-medium mb-2">Color Mode Processing</h3>
//                 <p className="text-sm text-gray-500 dark:text-gray-400">
//                   In color mode, we preserve the original color information by applying ANSI color codes to each character:
//                 </p>
//                 <pre className="text-xs bg-black/20 p-3 rounded mt-1 overflow-x-auto">
//                   function rgbToAnsi(r, g, b) {\
//                     return `\x1b[38;2;${r};${g};${b}m${asciiChar}\x1b[0m`
//                   }
//                 </pre>
//               </section>
//             </CardContent>
//           </Card>
//         </TabsContent>

//         {/* Pixel Art Documentation */}
//         <TabsContent value="pixel">
//           <Card>
//             <CardHeader>
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-2">
//                   <ImageIcon className="h-6 w-6" />
//                   <CardTitle>Pixel Art Converter</CardTitle>
//                 </div>
//               </div>
//               <CardDescription>
//                 Converting images to pixel art with color quantization and scaling
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <section>
//                 <h3 className="text-lg font-medium mb-2">Technical Overview</h3>
//                 <p className="text-sm text-gray-500 dark:text-gray-400">
//                   The Pixel Art Converter transforms images into low-resolution pixel art by downsampling and applying color quantization algorithms.
//                 </p>
//               </section>

//               <section>
//                 <h3 className="text-lg font-medium mb-2">Algorithm Details</h3>
//                 <div className="space-y-2">
//                   <div className="bg-muted p-4 rounded-md">
//                     <h4 className="font-medium flex items-center gap-2 mb-1">
//                       <Code className="h-4 w-4" /> Median Cut Quantization
//                     </h4>
//                     <p className="text-sm">
//                       We use the Median Cut algorithm to reduce the color palette:
//                     </p>
//                     <ol className="text-sm list-decimal list-inside mt-1 space-y-1">
//                       <li>Create a 3D histogram of all colors in RGB space</li>
//                       <li>Find the color channel with the largest range</li>
//                       <li>Sort colors along that channel and split the set in half</li>
//                       <li>Recursively repeat until we have the desired number of color buckets</li>
//                       <li>Average the colors in each bucket to create the final palette</li>
//                     </ol>
//                   </div>

//                   <div className="bg-muted p-4 rounded-md">
//                     <h4 className="font-medium flex items-center gap-2 mb-1">
//                       <Lightbulb className="h-4 w-4" /> Floyd-Steinberg Dithering
//                     </h4>
//                     <p className="text-sm">
//                       We apply error diffusion dithering to create the illusion of more colors:
//                     </p>
//                     <pre className="text-xs bg-black/20 p-2 rounded mt-1 overflow-x-auto">
//                       for each y from top to bottom:
//                         for each x from left to right:
//                           oldPixel = pixel[x][y]
//                           newPixel = findClosestPaletteColor(oldPixel)
//                           pixel[x][y] = newPixel
//                           error = oldPixel - newPixel
                          
//                           pixel[x+1][y  ] += error * 7/16
//                           pixel[x-1][y+1] += error * 3/16
//                           pixel[x  ][y+1] += error * 5/16
//                           pixel[x+1][y+1] += error * 1/16
//                     </pre>
//                   </div>

//                   <div className="bg-muted p-4 rounded-md">
//                     <h4 className="font-medium flex items-center gap-2 mb-1">
//                       <Cpu className="h-4 w-4" /> Nearest-Neighbor Upscaling
//                     </h4>
//                     <p className="text-sm">
//                       After downsampling, we use nearest-neighbor interpolation to create the blocky pixel art effect:
//                     </p>
//                     <pre className="text-xs bg-black/20 p-2 rounded mt-1 overflow-x-auto">
//                       function nearestNeighbor(src, scale) {
//                         const dest = document.createElement('canvas').getContext('2d').createImageData(src.width * scale, src.height * scale);
//                         for (let y = 0; y < dest.height; y++) {
//                           for (let x = 0; x < dest.width; x++) {
//                             const srcX = Math.floor(x / scale)
//                             const srcY = Math.floor(y / scale)
//                             dest.data[(y * dest.width + x) * 4 + 0] = src.data[(srcY * src.width + srcX) * 4 + 0];
//                             dest.data[(y * dest.width + x) * 4 + 1] = src.data[(srcY * src.width + srcX) * 4 + 1];
//                             dest.data[(y * dest.width + x) * 4 + 2] = src.data[(srcY * src.width + srcX) * 4 + 2];
//                             dest.data[(y * dest.width + x) * 4 + 3] = src.data[(srcY * src.width + srcX) * 4 + 3];
//                           }
//                         }
//                         return dest
//                       }
//                     </pre>
//                   </div>
//                 </div>
//               </section>
//             </CardContent>
//           </Card>
//         </TabsContent>

//         {/* Braille Art Documentation */}
//         <TabsContent value="braille">
//           <Card>
//             <CardHeader>
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-2">
//                   <Braces className="h-6 w-6" />
//                   <CardTitle>Braille Art Converter</CardTitle>
//                 </div>
//               </div>
//               <CardDescription>
//                 Converting images to Braille patterns using Unicode characters
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <section>
//                 <h3 className="text-lg font-medium mb-2">Technical Overview</h3>
//                 <p className="text-sm text-gray-500 dark:text-gray-400">
//                   The Braille Art Converter transforms images into patterns of Braille characters, which are Unicode symbols originally designed for tactile reading by the visually impaired.
//                 </p>
//               </section>

//               <section>
//                 <h3 className="text-lg font-medium mb-2">Algorithm Details</h3>
//                 <div className="space-y-2">
//                   <div className="bg-muted p-4 rounded-md">
//                     <h4 className="font-medium flex items-center gap-2 mb-1">
//                       <Code className="h-4 w-4" /> Braille Cell Structure
//                     </h4>
//                     <p className="text-sm">
//                       Each Braille character represents a 2×4 dot matrix. In Unicode, Braille patterns start at U+2800:
//                     </p>
//                     <pre className="text-xs bg-black/20 p-2 rounded mt-1 overflow-x-auto">
//                       Dot positions:
//                       1 4
//                       2 5
//                       3 6
//                       7 8
                      
//                       Each dot position corresponds to a bit in an 8-bit pattern.
//                     </pre>
//                   </div>

//                   <div className="bg-muted p-4 rounded-md">
//                     <h4 className="font-medium flex items-center gap-2 mb-1">
//                       <Lightbulb className="h-4 w-4" /> Bit Pattern Mapping
//                     </h4>
//                     <p className="text-sm">
//                       We process the image in 2×4 blocks, determining which dots should be raised:
//                     </p>
//                     <pre className="text-xs bg-black/20 p-2 rounded mt-1 overflow-x-auto">
//                       function getBraillePattern(block) {
//                         let pattern = 0
//                         const dotPositions = [0, 1, 2, 6, 3, 4, 5, 7] // Mapping to bit positions
                        
//                         for (let i = 0; i < 8; i++) {
//                           const x = i % 2
//                           const y = Math.floor(i / 2)
//                           if (block[y][x] < threshold) { // Dark pixel = raised dot
//                             pattern |= (1 << dotPositions[i])
//                           }
//                         }
                        
//                         return String.fromCharCode(0x2800 + pattern)
//                       }
//                     </pre>
//                   </div>

//                   <div className="bg-muted p-4 rounded-md">
//                     <h4 className="font-medium flex items-center gap-2 mb-1">
//                       <Cpu className="h-4 w-4" /> Threshold Determination
//                     </h4>
//                     <p className="text-sm">
//                       We convert each pixel to grayscale and apply a threshold to determine if a dot should be raised:
//                     </p>
//                     <pre className="text-xs bg-black/20 p-2 rounded mt-1 overflow-x-auto">
//                       function isPixelDark(r, g, b) {
//                         const luminance = 0.299 * r + 0.587 * g + 0.114 * b
//                         return luminance < threshold
//                       }
//                     </pre>
//                     <p className="text-sm mt-2">
//                       The threshold can be adjusted to control the density of dots in the final output.
//                     </p>
//                   </div>
//                 </div>
//               </section>
//             </CardContent>
//           </Card>
//         </TabsContent>

//         {/* Text Portrait Documentation */}
//         <TabsContent value="text-portrait">
//           <Card>
//             <CardHeader>
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-2">
//                   <Type className="h-6 w-6" />
//                   <CardTitle>Text Portrait Generator</CardTitle>
//                   <Badge variant="outline" className="bg-yellow-900/30 text-yellow-500 border-yellow-500/50">
//                     Beta
//                   </Badge>
//                 </div>
//               </div>
//               <CardDescription>
//                 Creating portraits using custom text and typography
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <section>
//                 <h3 className="text-lg font-medium mb-2">Technical Overview</h3>
//                 <p className="text-sm text-gray-500 dark:text-gray-400">
//                   The Text Portrait Generator creates images composed entirely of text characters, where the characters follow patterns based on the original image's brightness values.
//                 </p>
//                 <div className="flex items-center gap-1 mt-2 text-yellow-500 text-sm">
//                   <Zap className="h-4 w-4" />
//                   <span>This feature is currently in beta testing.</span>
//                 </div>
//               </section>

//               <section>
//                 <h3 className="text-lg font-medium mb-2">Algorithm Details</h3>
//                 <div className="space-y-2">
//                   <div className="bg-muted p-4 rounded-md">
//                     <h4 className="font-medium flex items-center gap-2 mb-1">
//                       <Code className="h-4 w-4" /> Directional Text Algorithms
//                     </h4>
//                     <p className="text-sm">
//                       Characters can be arranged in different patterns:
//                     </p>
//                     <pre className="text-xs bg-black/20 p-2 rounded mt-1 overflow-x-auto">
//                       function getCharacterAtPosition(x, y, text) {
//                         switch (textDirection) {
//                           case "horizontal":
//                             return text[x % text.length]
//                           case "vertical":
//                             return text[y % text.length]
//                           case "diagonal":
//                             return text[(x + y) % text.length]
//                           case "circular":
//                             const angle = Math.atan2(y - centerY, x - centerX)
//                             const normalizedAngle = (angle + Math.PI) / (2 * Math.PI)
//                             return text[Math.floor(normalizedAngle * text.length)]
//                         }
//                       }
//                     </pre>
//                   </div>

//                   <div className="bg-muted p-4 rounded-md">
//                     <h4 className="font-medium flex items-center gap-2 mb-1">
//                       <Lightbulb className="h-4 w-4" /> Variable Font Sizing
//                     </h4>
//                     <p className="text-sm">
//                       Font size can vary based on pixel brightness:
//                     </p>
//                     <pre className="text-xs bg-black/20 p-2 rounded mt-1 overflow-x-auto">
//                       function calculateFontSize(brightness, baseFontSize) {
//                         if (!variableFontSize) return baseFontSize
                        
//                         const minSize = baseFontSize * 0.5
//                         const maxSize = baseFontSize * 1.5
//                         return minSize + (maxSize - minSize) * brightness
//                       }
//                     </pre>
//                   </div>

//                   <div className="bg-muted p-4 rounded-md">
//                     <h4 className="font-medium flex items-center gap-2 mb-1">
//                       <Cpu className="h-4 w-4" /> Color Processing
//                     </h4>
//                     <p className="text-sm">
//                       In colored mode, we adjust the brightness of the original pixel color:
//                     </p>
//                     <pre className="text-xs bg-black/20 p-2 rounded mt-1 overflow-x-auto">
//                       function adjustColorBrightness(r, g, b, factor) {
//                         const minBrightness = 40
//                         r = Math.max(Math.min(Math.round(r * factor), 255), minBrightness)
//                         g = Math.max(Math.min(Math.round(g * factor), 255), minBrightness)
//                         b = Math.max(Math.min(Math.round(b * factor), 255), minBrightness)
//                         return `rgb(${r}, ${g}, ${b})`
//                       }
//                     </pre>
//                   </div>
//                 </div>
//               </section>

//               <section>
//                 <h3 className="text-lg font-medium mb-2">Canvas Rendering</h3>
//                 <p className="text-sm text-gray-500 dark:text-gray-400">
//                   The final output can be rendered to a canvas for high-quality export:
//                 </p>
//                 <pre className="text-xs bg-black/20 p-3 rounded mt-1 overflow-x-auto">
//                   function renderToCanvas() {
//                     // Set canvas dimensions based on text size and count
//                     const canvas = document.createElement('canvas');
//                     const ctx = canvas.getContext('2d');
//                     const maxRowLength = 100;
//                     const fontSize = 12;
//                     const letterSpacing = 1;
//                     const lineHeight = 1.2;
//                     const fontFamily = 'Arial';
//                     const coloredTextPortrait = [[]];

//                     canvas.width = maxRowLength * fontSize * letterSpacing
//                     canvas.height = coloredTextPortrait.length * fontSize * lineHeight
                    
//                     // For each character in the text portrait
//                     coloredTextPortrait.forEach((row, rowIndex) => {
//                       row.forEach((col, colIndex) => {
//                         ctx.font = `${col.fontSize}px ${fontFamily}`
//                         ctx.fillStyle = col.color
//                         const x = colIndex * fontSize * letterSpacing
//                         const y = rowIndex * fontSize * lineHeight
//                         ctx.fillText(col.char, x, y)
//                       })
//                     })
//                   }
//                 </pre>
//               </section>
//             </CardContent>
//           </Card>
//         </TabsContent>

//         {/* Color Palette Documentation */}
//         <TabsContent value="color">
//           <Card>
//             <CardHeader>
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-2">
//                   <Palette className="h-6 w-6" />
//                   <CardTitle>Color Palette Extractor</CardTitle>
//                 </div>
//               </div>
//               <CardDescription>
//                 Extracting dominant colors and creating harmonious palettes
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <section>
//                 <h3 className="text-lg font-medium mb-2">Technical Overview</h3>
//                 <p className="text-sm text-gray-500 dark:text-gray-400">
//                   The Color Palette Extractor analyzes images to identify dominant colors and create harmonious color schemes using clustering algorithms.
//                 </p>
//               </section>

//               <section>
//                 <h3 className="text-lg font-medium mb-2">Algorithm Details</h3>
//                 <div className="space-y-2">
//                   <div className="bg-muted p-4 rounded-md">
//                     <h4 className="font-medium flex items-center gap-2 mb-1">
//                       <Code className="h-4 w-4" /> K-Means Clustering
//                     </h4>
//                     <p className="text-sm">
//                       We use K-Means clustering to find dominant colors:
//                     </p>
//                     <ol className="text-sm list-decimal list-inside mt-1 space-y-1">
//                       <li>Initialize K cluster centers randomly from the pixel data</li>
//                       <li>Assign each pixel to the nearest cluster center</li>
//                       <li>Recalculate each cluster center as the mean of all pixels in that cluster</li>
//                       <li>Repeat steps 2-3 until convergence or max iterations</li>
//                       <li>The final cluster centers represent the dominant colors</li>
//                     </ol>
//                   </div>

//                   <div className="bg-muted p-4 rounded-md">
//                     <h4 className="font-medium flex items-center gap-2 mb-1">
//                       <Lightbulb className="h-4 w-4" /> Median Cut Quantization
//                     </h4>
//                     <p className="text-sm">
//                       As an alternative to K-Means, we also implement Median Cut:
//                     </p>
//                     <pre className="text-xs bg-black/20 p-2 rounded mt-1 overflow-x-auto">
//                       function medianCut(pixels, depth, maxDepth) {
//                         if (depth === maxDepth || pixels.length === 0) {
//                           return averageColor(pixels)
//                         }
                        
//                         // Find the color channel with the largest range
//                         const channelRanges = findChannelRanges(pixels)
//                         const channelIndex = channelRanges.indexOf(Math.max(...channelRanges))
                        
//                         // Sort pixels by that channel
//                         pixels.sort((a, b) => a[channelIndex] - b[channelIndex])
                        
//                         // Split the pixels in half
//                         const mid = Math.floor(pixels.length / 2)
//                         const left = pixels.slice(0, mid)
//                         const right = pixels.slice(mid)
                        
//                         // Recursively process each half
//                         return [
//                           medianCut(left, depth + 1, maxDepth),
//                           medianCut(right, depth + 1, maxDepth)
//                         ].flat()
//                       }
//                     </pre>
//                   </div>

//                   <div className="bg-muted p-4 rounded-md">
//                     <h4 className="font-medium flex items-center gap-2 mb-1">
//                       <Cpu className="h-4 w-4" /> Color Space Conversion
//                     </h4>
//                     <p className="text-sm">
//                       We convert between RGB and HSL color spaces for better color manipulation:
//                     </p>
//                     <pre className="text-xs bg-black/20 p-2 rounded mt-1 overflow-x-auto">
//                       function rgbToHsl(r, g, b) {
//                         r /= 255, g /= 255, b /= 255
//                         const max = Math.max(r, g, b), min = Math.min(r, g, b)
//                         let h, s, l = (max + min) / 2
                        
//                         if (max === min) {
//                           h = s = 0 // achromatic
//                         } else {
//                           const d = max - min
//                           s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
                          
//                           switch (max) {
//                             case r: h = (g - b) / d + (g < b ? 6 : 0); break
//                             case g: h = (b - r) / d + 2; break
//                             case b: h = (r - g) / d + 4; break
//                           }
                          
//                           h /= 6
//                         }
                        
//                         return [h, s, l]
//                       }
//                     </pre>
//                   </div>
//                 </div>
//               </section>

//               <section>
//                 <h3 className="text-lg font-medium mb-2">Palette Generation</h3>
//                 <p className="text-sm text-gray-500 dark:text-gray-400">
//                   From the dominant colors, we can generate harmonious palettes:
//                 </p>
//                 <ul className="text-sm list-disc list-inside mt-1 space-y-1">
//                   <li>Monochromatic: Variations in lightness and saturation of a single hue</li>
//                   <li>Complementary: Colors opposite each other on the color wheel</li>
//                   <li>Analogous: Colors adjacent to each other on the color wheel</li>
//                   <li>Triadic: Three colors evenly spaced around the color wheel</li>
//                   <li>Tetradic: Four colors arranged in two complementary pairs</li>
//                 </ul>
//               </section>
//             </CardContent>
//           </Card>
//         </TabsContent>

//         {/* SVG Trace Documentation */}
//         <TabsContent value="svg">
//           <Card>
//             <CardHeader>
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-2">
//                   <FileVector className="h-6 w-6" />
//                   <CardTitle>SVG Trace Converter</CardTitle>
//                 </div>
//               </div>
//               <CardDescription>
//                 Converting raster images to scalable vector graphics
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <section>
//                 <h3 className="text-lg font-medium mb-2">Technical Overview</h3>
//                 <p className="text-sm text-gray-500 dark:text-gray-400">
//                   The SVG Trace Converter transforms raster images into scalable vector graphics by detecting edges and creating paths that follow the contours of the image.
//                 </p>
//               </section>

//               <section>
//                 <h3 className="text-lg font-medium mb-2">Algorithm Details</h3>
//                 <div className="space-y-2">
//                   <div className="bg-muted p-4 rounded-md">
//                     <h4 className="font-medium flex items-center gap-2 mb-1">
//                       <Code className="h-4 w-4" /> Marching Squares Algorithm
//                     </h4>
//                     <p className="text-sm">
//                       We use the Marching Squares algorithm to detect contours:
//                     </p>
//                     <ol className="text-sm list-decimal list-inside mt-1 space-y-1">
//                       <li>Convert the image to grayscale and apply a threshold</li>
//                       <li>For each 2×2 cell in the image, determine its configuration (0-15)</li>
//                       <li>Based on the configuration, add line segments to the contour</li>
//                       <li>Connect the line segments to form complete contours</li>
//                     </ol>
//                     <p className="text-sm mt-2">
//                       The algorithm identifies how contour lines pass through each cell based on which corners are above or below the threshold.
//                     </p>
//                   </div>

//                   <div className="bg-muted p-4 rounded-md">
//                     <h4 className="font-medium flex items-center gap-2 mb-1">
//                       <Lightbulb className="h-4 w-4" /> Contour Tracing
//                     </h4>
//                     <p className="text-sm">
//                       After identifying contour segments, we trace complete contours:
//                     </p>
//                     <pre className="text-xs bg-black/20 p-2 rounded mt-1 overflow-x-auto">
//                       function traceContour(startX, startY, threshold) {
//                         const contour = []
//                         let x = startX, y = startY
//                         let direction = 0 // 0: right, 1: down, 2: left, 3: up
                        
//                         do {
//                           contour.push([x, y])
                          
//                           // Try to turn left first, then straight, then right
//                           for (let i = 0; i < 4; i++) {
//                             const newDir = (direction - 1 + i) % 4
//                             const [nx, ny] = getNextCoordinates(x, y, newDir)
                            
//                             if (isEdge(nx, ny, threshold)) {
//                               x = nx
//                               y = ny
//                               direction = newDir
//                               break
//                             }
//                           }
//                         } while (x !== startX || y !== startY)
                        
//                         return contour
//                       }
//                     </pre>
//                   </div>

//                   <div className="bg-muted p-4 rounded-md">
//                     <h4 className="font-medium flex items-center gap-2 mb-1">
//                       <Cpu className="h-4 w-4" /> Path Simplification
//                     </h4>
//                     <p className="text-sm">
//                       We use the Ramer-Douglas-Peucker algorithm to simplify contours:
//                     </p>
//                     <pre className="text-xs bg-black/20 p-2 rounded mt-1 overflow-x-auto">
//                       function simplifyPath(points, epsilon) {
//                         if (points.length <= 2) return points
                        
//                         // Find the point with the maximum distance
//                         let maxDistance = 0
//                         let index = 0
                        
//                         for (let i = 1; i < points.length - 1; i++) {
//                           const distance = perpendicularDistance(
//                             points[i], 
//                             points[0], 
//                             points[points.length - 1]
//                           )
                          
//                           if (distance > maxDistance) {
//                             index = i
//                             maxDistance = distance
//                           }
//                         }
                        
//                         // If max distance is greater than epsilon, recursively simplify
//                         if (maxDistance > epsilon) {
//                           const left = simplifyPath(points.slice(0, index + 1), epsilon)
//                           const right = simplifyPath(points.slice(index), epsilon)
                          
//                           return left.slice(0, -1).concat(right)
//                         } else {
//                           return [points[0], points[points.length - 1]]
//                         }
//                       }
//                     </pre>
//                   </div>
//                 </div>
//               </section>

//               <section>
//                 <h3 className="text-lg font-medium mb-2">SVG Generation</h3>
//                 <p className="text-sm text-gray-500 dark:text-gray-400">
//                   The final step converts the simplified contours to SVG paths:
//                 </p>
//                 <pre className="text-xs bg-black/20 p-3 rounded mt-1 overflow-x-auto">
//                   function generateSVGPath(contour) {
//                     if (contour.length === 0) return ""
                    
//                     let path = `M ${contour[0][0]} ${contour[0][1]}`
                    
//                     for (let i = 1; i < contour.length; i++) {
//                       path += ` L ${contour[i][0]} ${contour[i][1]}`
//                     }
                    
//                     path += " Z" // Close the path
//                     return path
//                   }
//                 </pre>
//               </section>
//             </CardContent>
//           </Card>
//         </TabsContent>

//         {/* Fourier Transform Documentation */}
//         <TabsContent value="fourier">
//           <Card>
//             <CardHeader>
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-2">
//                   <WaveSine className="h-6 w-6" />
//                   <CardTitle>Fourier Transform Analyzer</CardTitle>
//                   <Badge variant="outline" className="bg-yellow-900/30 text-yellow-500 border-yellow-500/50">
//                     Beta
//                   </Badge>
//                 </div>
//               </div>
//               <CardDescription>
//                 Analyzing and manipulating images in the frequency domain
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <section>
//                 <h3 className="text-lg font-medium mb-2">Technical Overview</h3>
//                 <p className="text-sm text-gray-500 dark:text-gray-400">
//                   The Fourier Transform Analyzer converts images from the spatial domain to the frequency domain, allowing for advanced filtering and analysis techniques.
//                 </p>
//                 <div className="flex items-center gap-1 mt-2 text-yellow-500 text-sm">
//                   <Zap className="h-4 w-4" />
//                   <span>This feature is currently in beta testing and uses simplified implementations.</span>
//                 </div>
//               </section>

//               <section>
//                 <h3 className="text-lg font-medium mb-2">Mathematical Foundation</h3>
//                 <div className="space-y-2">
//                   <div className="bg-muted p-4 rounded-md">
//                     <h4 className="font-medium flex items-center gap-2 mb-1">
//                       <Code className="h-4 w-4" /> 2D Discrete Fourier Transform
//                     </h4>
//                     <p className="text-sm">
//                       For a 2D image f(x,y), the Discrete Fourier Transform is defined as:
//                     </p>
//                     <pre className="text-xs bg-black/20 p-2 rounded mt-1 overflow-x-auto">
//                       {`F(u,v) = (1/MN) * ∑∑ f(x,y) * e^(-j2π(ux/M + vy/N))
//                                        x=0 y=0

// Where:
// - F(u,v) is the frequency domain representation
// - f(x,y) is the spatial domain image
// - M, N are the image dimensions
// - u, v are frequency variables`}
//                     </pre>
//                   </div>

//                   <div className="bg-muted p-4 rounded-md">
//                     <h4 className="font-medium flex items-center gap-2 mb-1">
//                       <Lightbulb className="h-4 w-4" /> Fast Fourier Transform (FFT)
//                     </h4>
//                     <p className="text-sm">
//                       The FFT algorithm reduces the computational complexity from O(N²) to O(N log N):
//                     </p>
//                     <pre className="text-xs bg-black/20 p-2 rounded mt-1 overflow-x-auto">
//                       function fft(x) {
//                         const N = x.length
//                         if (N <= 1) return x
                        
//                         // Divide
//                         const even = fft(x.filter((_, i) => i % 2 === 0))
//                         const odd = fft(x.filter((_, i) => i % 2 === 1))
                        
//                         // Conquer
//                         const T = []
//                         for (let k = 0; k < N/2; k++) {
//                           const t = complex.multiply(
//                             complex.exp(-2 * Math.PI * k / N),
//                             odd[k]
//                           )
//                           T[k] = t
//                         }
                        
//                         // Combine
//                         const result = []
//                         for (let k = 0; k < N/2; k++) {
//                           result[k] = complex.add(even[k], T[k])
//                           result[k + N/2] = complex.subtract(even[k], T[k])
//                         }
                        
//                         return result
//                       }
//                     </pre>
//                   </div>

//                   <div className="bg-muted p-4 rounded-md">
//                     <h4 className="font-medium flex items-center gap-2 mb-1">
//                       <Cpu className="h-4 w-4" /> Frequency Domain Filtering
//                     </h4>
//                     <p className="text-sm">
//                       Different filters can be applied in the frequency domain:
//                     </p>
//                     <ul className="text-sm list-disc list-inside mt-1 space-y-1">
//                       <li><strong>Low-pass filter:</strong> Removes high frequencies (smoothing/blurring)</li>
//                       <li><strong>High-pass filter:</strong> Removes low frequencies (edge enhancement)</li>
//                       <li><strong>Band-pass filter:</strong> Keeps only a specific frequency range</li>
//                       <li><strong>Notch filter:</strong> Removes specific frequencies (noise reduction)</li>
//                     </ul>
//                     <pre className="text-xs bg-black/20 p-2 rounded mt-1 overflow-x-auto">
//                       {`function applyFilter(spectrum, filterType, cutoff) {
//   const [height, width] = spectrum.shape
//   const centerX = width / 2
//   const centerY = height / 2
  
//   for (let v = 0; v < height; v++) {
//     for (let u = 0; u < width; u++) {
//       const distance = Math.sqrt(
//         (u - centerX) * (u - centerX) + (v - centerY) * (v - centerY)
//       )
      
//       let filterValue = 1
//       switch (filterType) {
//         case 'lowpass':
//           filterValue = distance <= cutoff ? 1 : 0
//           break
//         case 'highpass':
//           filterValue = distance > cutoff ? 1 : 0
//           break
//         case 'bandpass':
//           filterValue = Math.abs(distance - cutoff) <= bandwidth ? 1 : 0
//           break
//       }
      
//       spectrum[v][u] = complex.multiply(spectrum[v][u], filterValue)
//     }
//   }
  
//   return spectrum
// }`}
//                     </pre>
//                   </div>
//                 </div>
//               </section>

//               <section>
//                 <h3 className="text-lg font-medium mb-2">Alternative Transforms</h3>
//                 <div className="space-y-2">
//                   <div className="bg-muted p-4 rounded-md">
//                     <h4 className="font-medium mb-1">Discrete Cosine Transform (DCT)</h4>
//                     <p className="text-sm">
//                       Used in JPEG compression, the DCT represents images using cosine functions:
//                     </p>
//                     <pre className="text-xs bg-black/20 p-2 rounded mt-1 overflow-x-auto">
//                       {`F(u,v) = (2/√(MN)) * C(u) * C(v) * ∑∑ f(x,y) * 
//                                                          x=0 y=0
//                                cos((2x+1)uπ/2M) * cos((2y+1)vπ/2N)`}
//                     </pre>
//                   </div>

//                   <div className="bg-muted p-4 rounded-md">
//                     <h4 className="font-medium mb-1">Wavelet Transform</h4>
//                     <p className="text-sm">
//                       Provides both frequency and spatial localization, useful for multi-resolution analysis:
//                     </p>
//                     <pre className="text-xs bg-black/20 p-2 rounded mt-1 overflow-x-auto">
//                       {`W(a,b) = (1/√a) * ∫ f(x) * ψ*((x-b)/a) dx
                      
// Where:
// - ψ is the mother wavelet
// - a is the scale parameter
// - b is the translation parameter`}
//                     </pre>
//                   </div>
//                 </div>
//               </section>

//               <section>
//                 <h3 className="text-lg font-medium mb-2">Applications</h3>
//                 <p className="text-sm text-gray-500 dark:text-gray-400">
//                   Frequency domain analysis enables various image processing techniques:
//                 </p>
//                 <ul className="text-sm list-disc list-inside mt-1 space-y-1">
//                   <li>Noise reduction by filtering specific frequency ranges</li>
//                   <li>Image compression by removing less important frequencies</li>
//                   <li>Pattern recognition by analyzing frequency signatures</li>
//                   <li>Image enhancement through selective frequency amplification</li>
//                   <li>Watermarking by embedding information in specific frequencies</li>
//                 </ul>
//               </section>
//             </CardContent>
//           </Card>
//         </TabsContent>
//       </Tabs>
//     </div>
//   )
// }


"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Book, Palette, Zap, Download, Upload, Code, Grid3X3, Type, ImageIcon } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function DocsPage() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)


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
            {/* Desktop Nav */}
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
            {/* Hamburger Button for Mobile */}
            <button
              className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded hover:bg-stone-800 transition"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Open menu"
            >
              <span className={`block h-0.5 w-6 bg-white mb-1 transition-all ${mobileMenuOpen ? "rotate-45 translate-y-2" : ""}`}></span>
              <span className={`block h-0.5 w-6 bg-white mb-1 transition-all ${mobileMenuOpen ? "opacity-0" : ""}`}></span>
              <span className={`block h-0.5 w-6 bg-white transition-all ${mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
            </button>
          </div>
          {/* Mobile Dropdown Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-2 bg-stone-900 rounded-lg shadow-lg py-2 px-4">
              <Link
                href="/"
                className={`block py-2 font-mono ${
                  pathname === "/"
                    ? "text-white font-bold"
                    : "text-stone-300 hover:text-white"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/converter"
                className={`block py-2 font-mono ${
                  pathname === "/converter"
                    ? "text-white font-bold"
                    : "text-stone-300 hover:text-white"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Converter
              </Link>
              <Link
                href="/about"
                className={`block py-2 font-mono ${
                  pathname === "/about"
                    ? "text-white font-bold"
                    : "text-stone-300 hover:text-white"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/gallery"
                className={`block py-2 font-mono ${
                  pathname === "/gallery"
                    ? "text-white font-bold"
                    : "text-stone-300 hover:text-white"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Gallery
              </Link>
              <Link
                href="/docs"
                className={`block py-2 font-mono ${
                  pathname === "/docs"
                    ? "text-white font-bold"
                    : "text-stone-300 hover:text-white"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Docs
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold font-mono mb-6">
              <Book className="inline-block h-12 w-12 mr-4 text-stone-400" />
              Documentation
            </h1>
            <p className="text-xl text-stone-300 max-w-2xl mx-auto">
              Complete technical guide to F(x) scale converters and their algorithms
            </p>
          </div>

          {/* Getting Started */}
          <Card className="bg-stone-900 border-stone-700 mb-8">
            <CardContent className="p-8">
              <h2 className="text-2xl font-mono text-white mb-6 flex items-center">
                <Upload className="h-6 w-6 mr-3 text-stone-400" />
                Getting Started
              </h2>
              <div className="space-y-4 text-stone-300">
                <div>
                  <h3 className="text-lg font-mono text-white mb-2">1. Upload Your Image</h3>
                  <p className="mb-4">
                    Start by uploading an image to convert. F(x) scale supports all common image formats:
                  </p>
                  <ul className="ml-6 space-y-1">
                    <li>• JPEG (.jpg, .jpeg)</li>
                    <li>• PNG (.png)</li>
                    <li>• GIF (.gif)</li>
                    <li>• WebP (.webp)</li>
                    <li>• BMP (.bmp)</li>
                  </ul>
                  <p className="mt-4">
                    You can upload images by clicking the upload button or simply dragging and dropping them onto the
                    converter area.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-mono text-white mb-2">2. Adjust Settings</h3>
                  <p>
                    Fine-tune your output using the control panel. Each setting affects the final output in different
                    ways based on the converter's algorithm.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-mono text-white mb-2">3. Export Your Art</h3>
                  <p>
                    Once you're happy with the result, copy to clipboard, download as text, or export as an image file.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* ASCII Art Converter Technical Details */}
          <Card className="bg-stone-900 border-stone-700 mb-8">
            <CardContent className="p-8">
              <h2 className="text-2xl font-mono text-white mb-6 flex items-center">
                <Type className="h-6 w-6 mr-3 text-stone-400" />
                ASCII Art Converter
              </h2>
              <div className="space-y-6 text-stone-300">
                <div>
                  <h3 className="text-lg font-mono text-white mb-2">Algorithm Overview</h3>
                  <p className="mb-4">
                    The ASCII Art Converter uses luminance-based character mapping to transform images into text art.
                  </p>
                  <div className="bg-stone-800 p-4 rounded-lg">
                    <h4 className="font-mono text-white mb-2">Process Steps:</h4>
                    <ol className="list-decimal ml-6 space-y-2">
                      <li>Image is loaded into HTML5 Canvas and scaled based on resolution setting</li>
                      <li>
                        Pixel data is extracted using <code className="bg-stone-700 px-1 rounded">getImageData()</code>
                      </li>
                      <li>
                        For each pixel, luminance is calculated using:{" "}
                        <code className="bg-stone-700 px-1 rounded">L = 0.299×R + 0.587×G + 0.114×B</code>
                      </li>
                      <li>Luminance values are normalized to [0,1] range</li>
                      <li>Characters are mapped based on density: darker characters for higher luminance</li>
                      <li>Font aspect ratio correction is applied (0.5 ratio for monospace fonts)</li>
                    </ol>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-mono text-white mb-2">Character Sets</h3>
                  <div className="space-y-3">
                    <div>
                      <p>
                        <strong>Standard:</strong>{" "}
                        <code className="bg-stone-800 px-2 py-1 rounded text-sm"> .:-=+*#%@</code>
                      </p>
                      <p className="text-sm text-stone-400">10 characters, linear density progression</p>
                    </div>
                    <div>
                      <p>
                        <strong>Detailed:</strong>{" "}
                        <code className="bg-stone-800 px-2 py-1 rounded text-sm"> .,:;i1tfLCG08@</code>
                      </p>
                      <p className="text-sm text-stone-400">14 characters, fine-grained luminance mapping</p>
                    </div>
                    <div>
                      <p>
                        <strong>Blocks:</strong> <code className="bg-stone-800 px-2 py-1 rounded text-sm"> ░▒▓█</code>
                      </p>
                      <p className="text-sm text-stone-400">Unicode block elements for solid fill appearance</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-mono text-white mb-2">Color Mode Processing</h3>
                  <ul className="ml-6 space-y-2">
                    <li>
                      • <strong>Grayscale:</strong> Uses standard luminance formula for character selection
                    </li>
                    <li>
                      • <strong>Color:</strong> Preserves RGB values while applying brightness-based character density
                    </li>
                    <li>
                      • <strong>Inversion:</strong> Applies{" "}
                      <code className="bg-stone-700 px-1 rounded">brightness = 1 - brightness</code> transformation
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pixel Art Converter Technical Details */}
          <Card className="bg-stone-900 border-stone-700 mb-8">
            <CardContent className="p-8">
              <h2 className="text-2xl font-mono text-white mb-6 flex items-center">
                <Grid3X3 className="h-6 w-6 mr-3 text-stone-400" />
                Pixel Art Converter
              </h2>
              <div className="space-y-6 text-stone-300">
                <div>
                  <h3 className="text-lg font-mono text-white mb-2">Algorithm Overview</h3>
                  <p className="mb-4">
                    The Pixel Art Converter uses color quantization and spatial downsampling to create retro-style pixel
                    art.
                  </p>
                  <div className="bg-stone-800 p-4 rounded-lg">
                    <h4 className="font-mono text-white mb-2">Process Steps:</h4>
                    <ol className="list-decimal ml-6 space-y-2">
                      <li>Image is downsampled to target pixel dimensions</li>
                      <li>Color palette is extracted using Median Cut quantization algorithm</li>
                      <li>Each pixel is mapped to nearest color in reduced palette</li>
                      <li>Optional dithering is applied using Floyd-Steinberg error diffusion</li>
                      <li>Result is upscaled with nearest-neighbor interpolation</li>
                      <li>
                        Canvas rendering uses{" "}
                        <code className="bg-stone-700 px-1 rounded">imageSmoothingEnabled = false</code>
                      </li>
                    </ol>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-mono text-white mb-2">Color Quantization</h3>
                  <div className="bg-stone-800 p-4 rounded-lg">
                    <h4 className="font-mono text-white mb-2">Median Cut Algorithm:</h4>
                    <ol className="list-decimal ml-6 space-y-1">
                      <li>Extract all unique pixel colors from image</li>
                      <li>Find color channel with greatest range (R, G, or B)</li>
                      <li>Sort colors by that channel value</li>
                      <li>Split at median point</li>
                      <li>Recursively apply to each half until target color count reached</li>
                      <li>Calculate average color for each final bucket</li>
                    </ol>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-mono text-white mb-2">Dithering Techniques</h3>
                  <ul className="ml-6 space-y-2">
                    <li>
                      • <strong>Floyd-Steinberg:</strong> Distributes quantization error to neighboring pixels
                    </li>
                    <li>
                      • <strong>Error Distribution:</strong> Right: 7/16, Below-left: 3/16, Below: 5/16, Below-right:
                      1/16
                    </li>
                    <li>
                      • <strong>Ordered Dithering:</strong> Uses Bayer matrix for consistent pattern
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Text Portrait Generator Technical Details */}
          <Card className="bg-stone-900 border-stone-700 mb-8">
            <CardContent className="p-8">
              <h2 className="text-2xl font-mono text-white mb-6 flex items-center">
                <ImageIcon className="h-6 w-6 mr-3 text-stone-400" />
                Text Portrait Generator
              </h2>
              <div className="space-y-6 text-stone-300">
                <div>
                  <h3 className="text-lg font-mono text-white mb-2">Algorithm Overview</h3>
                  <p className="mb-4">
                    The Text Portrait Generator creates images using custom text strings positioned based on image
                    brightness and directional patterns.
                  </p>
                  <div className="bg-stone-800 p-4 rounded-lg">
                    <h4 className="font-mono text-white mb-2">Process Steps:</h4>
                    <ol className="list-decimal ml-6 space-y-2">
                      <li>Image is sampled at intervals determined by text density setting</li>
                      <li>For each sample point, luminance is calculated</li>
                      <li>
                        Character selection follows directional pattern (horizontal, vertical, diagonal, circular)
                      </li>
                      <li>Font size varies based on brightness when variable sizing is enabled</li>
                      <li>Characters are placed only where brightness exceeds threshold</li>
                      <li>Color information is preserved in non-grayscale mode</li>
                    </ol>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-mono text-white mb-2">Text Direction Algorithms</h3>
                  <div className="space-y-3">
                    <div>
                      <p>
                        <strong>Horizontal:</strong>{" "}
                        <code className="bg-stone-800 px-2 py-1 rounded text-sm">char = text[x % text.length]</code>
                      </p>
                      <p className="text-sm text-stone-400">Characters repeat horizontally across image</p>
                    </div>
                    <div>
                      <p>
                        <strong>Vertical:</strong>{" "}
                        <code className="bg-stone-800 px-2 py-1 rounded text-sm">char = text[y % text.length]</code>
                      </p>
                      <p className="text-sm text-stone-400">Characters repeat vertically down image</p>
                    </div>
                    <div>
                      <p>
                        <strong>Diagonal:</strong>{" "}
                        <code className="bg-stone-800 px-2 py-1 rounded text-sm">
                          char = text[(x + y) % text.length]
                        </code>
                      </p>
                      <p className="text-sm text-stone-400">Characters follow diagonal pattern</p>
                    </div>
                    <div>
                      <p>
                        <strong>Circular:</strong>{" "}
                        <code className="bg-stone-800 px-2 py-1 rounded text-sm">
                          angle = atan2(y-center, x-center)
                        </code>
                      </p>
                      <p className="text-sm text-stone-400">Characters radiate from image center</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-mono text-white mb-2">Variable Font Sizing</h3>
                  <div className="bg-stone-800 p-4 rounded-lg">
                    <p className="mb-2">Font size calculation:</p>
                    <code className="bg-stone-700 px-2 py-1 rounded text-sm block">
                      fontSize = minSize + (maxSize - minSize) × brightness
                      <br />
                      where minSize = baseFontSize × 0.5
                      <br />
                      and maxSize = baseFontSize × 1.5
                    </code>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Braille Art Converter Technical Details */}
          <Card className="bg-stone-900 border-stone-700 mb-8">
            <CardContent className="p-8">
              <h2 className="text-2xl font-mono text-white mb-6 flex items-center">
                <Code className="h-6 w-6 mr-3 text-stone-400" />
                Braille Art Converter
              </h2>
              <div className="space-y-6 text-stone-300">
                <div>
                  <h3 className="text-lg font-mono text-white mb-2">Algorithm Overview</h3>
                  <p className="mb-4">
                    The Braille Art Converter maps image regions to 6-dot Braille patterns, creating tactile-readable
                    art.
                  </p>
                  <div className="bg-stone-800 p-4 rounded-lg">
                    <h4 className="font-mono text-white mb-2">Braille Cell Structure (2×4 dots):</h4>
                    <pre className="text-sm">
                      {`Dot positions:    Bit values:
1 • • 4           1   8
2 • • 5           2  16  
3 • • 6           4  32
7 • • 8          64 128`}
                    </pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-mono text-white mb-2">Conversion Process</h3>
                  <div className="bg-stone-800 p-4 rounded-lg">
                    <ol className="list-decimal ml-6 space-y-2">
                      <li>Image is divided into 2×4 pixel blocks</li>
                      <li>Each pixel's brightness is compared to threshold</li>
                      <li>Bright pixels set corresponding Braille dot bits</li>
                      <li>Bit pattern maps to Unicode Braille character (U+2800-U+28FF)</li>
                      <li>Characters are assembled into final Braille representation</li>
                    </ol>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-mono text-white mb-2">Dot Density Control</h3>
                  <ul className="ml-6 space-y-2">
                    <li>
                      • <strong>Low Density:</strong> Threshold = 0.7 (only brightest pixels become dots)
                    </li>
                    <li>
                      • <strong>Medium Density:</strong> Threshold = 0.5 (balanced representation)
                    </li>
                    <li>
                      • <strong>High Density:</strong> Threshold = 0.3 (more detailed patterns)
                    </li>
                    <li>
                      • <strong>Ultra High:</strong> Threshold = 0.1 (maximum detail preservation)
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Color Palette Extractor Technical Details */}
          <Card className="bg-stone-900 border-stone-700 mb-8">
            <CardContent className="p-8">
              <h2 className="text-2xl font-mono text-white mb-6 flex items-center">
                <Palette className="h-6 w-6 mr-3 text-stone-400" />
                Color Palette Extractor
              </h2>
              <div className="space-y-6 text-stone-300">
                <div>
                  <h3 className="text-lg font-mono text-white mb-2">Algorithm Overview</h3>
                  <p className="mb-4">
                    The Color Palette Extractor uses advanced clustering algorithms to identify and extract dominant
                    colors from images.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-mono text-white mb-2">Extraction Methods</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-mono text-white mb-2">K-Means Clustering</h4>
                      <div className="bg-stone-800 p-4 rounded-lg">
                        <ol className="list-decimal ml-6 space-y-1">
                          <li>Initialize k random centroids in RGB color space</li>
                          <li>Assign each pixel to nearest centroid using Euclidean distance</li>
                          <li>Update centroids to cluster means</li>
                          <li>Repeat until convergence (max 10 iterations)</li>
                          <li>Calculate color percentages based on cluster sizes</li>
                        </ol>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-mono text-white mb-2">Median Cut Quantization</h4>
                      <div className="bg-stone-800 p-4 rounded-lg">
                        <ol className="list-decimal ml-6 space-y-1">
                          <li>Start with all pixels in single bucket</li>
                          <li>Find color channel with greatest range</li>
                          <li>Sort pixels by that channel, split at median</li>
                          <li>Recursively split until desired color count</li>
                          <li>Average colors in each final bucket</li>
                        </ol>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-mono text-white mb-2">Dominant Colors</h4>
                      <div className="bg-stone-800 p-4 rounded-lg">
                        <ol className="list-decimal ml-6 space-y-1">
                          <li>Round RGB values to reduce unique colors</li>
                          <li>Count frequency of each rounded color</li>
                          <li>Sort by frequency (prominence)</li>
                          <li>Return top N most frequent colors</li>
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-mono text-white mb-2">Color Space Calculations</h3>
                  <div className="bg-stone-800 p-4 rounded-lg">
                    <h4 className="font-mono text-white mb-2">RGB to HSL Conversion:</h4>
                    <code className="text-sm block">
                      max = max(r, g, b), min = min(r, g, b)
                      <br />l = (max + min) / 2<br />s = (max - min) / (2 - max - min) if l {">"} 0.5
                      <br />h = calculated based on which channel is max
                    </code>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* SVG Trace Converter Technical Details */}
          <Card className="bg-stone-900 border-stone-700 mb-8">
            <CardContent className="p-8">
              <h2 className="text-2xl font-mono text-white mb-6 flex items-center">
                <Zap className="h-6 w-6 mr-3 text-stone-400" />
                SVG Trace Converter
              </h2>
              <div className="space-y-6 text-stone-300">
                <div>
                  <h3 className="text-lg font-mono text-white mb-2">Algorithm Overview</h3>
                  <p className="mb-4">
                    The SVG Trace Converter implements contour tracing algorithms to convert raster images into scalable
                    vector graphics.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-mono text-white mb-2">Contour Tracing Process</h3>
                  <div className="bg-stone-800 p-4 rounded-lg">
                    <h4 className="font-mono text-white mb-2">Marching Squares Algorithm:</h4>
                    <ol className="list-decimal ml-6 space-y-2">
                      <li>Convert image to binary using threshold value</li>
                      <li>Scan for edge pixels (black pixels adjacent to white)</li>
                      <li>Follow contour using directional rules (right-hand rule)</li>
                      <li>Record path coordinates as vector points</li>
                      <li>Apply Ramer-Douglas-Peucker simplification</li>
                      <li>Convert to SVG path commands (M, L, Z)</li>
                    </ol>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-mono text-white mb-2">Path Simplification</h3>
                  <div className="bg-stone-800 p-4 rounded-lg">
                    <h4 className="font-mono text-white mb-2">Ramer-Douglas-Peucker Algorithm:</h4>
                    <ol className="list-decimal ml-6 space-y-1">
                      <li>Find point with maximum distance from line segment</li>
                      <li>If distance {">"} epsilon, recursively simplify segments</li>
                      <li>Otherwise, approximate with straight line</li>
                      <li>Epsilon parameter controls smoothing level</li>
                    </ol>
                    <p className="mt-2 text-sm">
                      Distance calculation:{" "}
                      <code className="bg-stone-700 px-1 rounded">d = |ax + by + c| / √(a² + b²)</code>
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-mono text-white mb-2">Color Mode Processing</h3>
                  <ul className="ml-6 space-y-2">
                    <li>
                      • <strong>Monochrome:</strong> Single threshold creates binary mask for tracing
                    </li>
                    <li>
                      • <strong>Grayscale:</strong> Multiple thresholds create layered paths
                    </li>
                    <li>
                      • <strong>Color:</strong> Separate color layers traced independently
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Technical Performance */}
          <Card className="bg-stone-900 border-stone-700 mb-8">
            <CardContent className="p-8">
              <h2 className="text-2xl font-mono text-white mb-6">Performance & Optimization</h2>
              <div className="space-y-4 text-stone-300">
                <div>
                  <h3 className="text-lg font-mono text-white mb-2">Client-Side Processing</h3>
                  <ul className="ml-6 space-y-1">
                    <li>• All image processing happens in browser using Canvas API</li>
                    <li>• No server uploads required - complete privacy</li>
                    <li>• Real-time preview updates using requestAnimationFrame</li>
                    <li>• Web Workers could be implemented for heavy computations</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-mono text-white mb-2">Memory Management</h3>
                  <ul className="ml-6 space-y-1">
                    <li>• ImageData objects are reused when possible</li>
                    <li>• Canvas dimensions are optimized based on resolution settings</li>
                    <li>• Large images are automatically downsampled for processing</li>
                    <li>• Garbage collection is triggered after heavy operations</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-mono text-white mb-2">Browser Compatibility</h3>
                  <ul className="ml-6 space-y-1">
                    <li>• Requires Canvas API support (IE9+)</li>
                    <li>• Uses modern JavaScript features (ES6+)</li>
                    <li>• Clipboard API for copy functionality (modern browsers)</li>
                    <li>• File API for drag-and-drop uploads</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Export Options */}
          <Card className="bg-stone-900 border-stone-700">
            <CardContent className="p-8">
              <h2 className="text-2xl font-mono text-white mb-6 flex items-center">
                <Download className="h-6 w-6 mr-3 text-stone-400" />
                Export Options
              </h2>
              <div className="space-y-4 text-stone-300">
                <div>
                  <h3 className="text-lg font-mono text-white mb-2">Text-Based Exports</h3>
                  <ul className="ml-6 space-y-1">
                    <li>
                      • <strong>Plain Text:</strong> Raw character output with line breaks preserved
                    </li>
                    <li>
                      • <strong>Clipboard Copy:</strong> Direct copy to system clipboard using Clipboard API
                    </li>
                    <li>
                      • <strong>UTF-8 Encoding:</strong> Supports Unicode characters (Braille, blocks)
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-mono text-white mb-2">Image Exports</h3>
                  <ul className="ml-6 space-y-1">
                    <li>
                      • <strong>PNG Format:</strong> Lossless compression with transparency support
                    </li>
                    <li>
                      • <strong>Canvas toDataURL:</strong> Base64 encoded image data
                    </li>
                    <li>
                      • <strong>High Resolution:</strong> Exports at full canvas resolution
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-mono text-white mb-2">Vector Exports</h3>
                  <ul className="ml-6 space-y-1">
                    <li>
                      • <strong>SVG Format:</strong> Scalable vector graphics with embedded styling
                    </li>
                    <li>
                      • <strong>Path Optimization:</strong> Minimized file size through path simplification
                    </li>
                    <li>
                      • <strong>Color Preservation:</strong> Maintains original color information
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-mono text-white mb-2">Palette Exports</h3>
                  <ul className="ml-6 space-y-1">
                    <li>
                      • <strong>Multiple Formats:</strong> HEX, RGB, HSL, JSON, CSS Variables
                    </li>
                    <li>
                      • <strong>Structured Data:</strong> Includes color percentages and metadata
                    </li>
                    <li>
                      • <strong>Developer-Friendly:</strong> Ready-to-use in design workflows
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
