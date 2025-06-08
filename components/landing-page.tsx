// "use client"

// import { useEffect } from "react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent } from "@/components/ui/card"
// import { ArrowRight, Palette, Zap, Sparkles } from "lucide-react"
// import Link from "next/link"
// import { usePathname } from "next/navigation"

// export default function LandingPage() {
//   const pathname = usePathname()

//   useEffect(() => {
//     // Set document background to black
//     if (typeof document !== "undefined") {
//       document.documentElement.style.backgroundColor = "black"
//       document.body.style.backgroundColor = "black"
//     }

//     return () => {
//       // Clean up when component unmounts
//       if (typeof document !== "undefined") {
//         document.documentElement.style.backgroundColor = ""
//         document.body.style.backgroundColor = ""
//       }
//     }
//   }, [])

//   return (
//     <div className="min-h-screen bg-black text-white">
//       {/* Navigation Bar */}
//       <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-stone-800">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             <Link
//               href="/"
//               className="text-xl font-mono font-bold text-white relative group transition-all duration-300"
//             >
//               <span className="relative z-10">F(x) scale</span>
//               <div className="absolute inset-0 bg-stone-700/20 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 -m-2"></div>
//             </Link>
//             <div className="hidden md:flex space-x-8">
//               <Link
//                 href="/"
//                 className={`font-mono transition-all duration-300 relative ${
//                   pathname === "/"
//                     ? "text-white shadow-[0_0_10px_rgba(168,162,158,0.5)]"
//                     : "text-stone-300 hover:text-white"
//                 }`}
//               >
//                 Home
//               </Link>
//               <Link
//                 href="/converter"
//                 className={`font-mono transition-all duration-300 relative ${
//                   pathname === "/converter"
//                     ? "text-white shadow-[0_0_10px_rgba(168,162,158,0.5)]"
//                     : "text-stone-300 hover:text-white"
//                 }`}
//               >
//                 Converter
//               </Link>
//               <Link
//                 href="/about"
//                 className={`font-mono transition-all duration-300 relative ${
//                   pathname === "/about"
//                     ? "text-white shadow-[0_0_10px_rgba(168,162,158,0.5)]"
//                     : "text-stone-300 hover:text-white"
//                 }`}
//               >
//                 About
//               </Link>
//               <Link
//                 href="/gallery"
//                 className={`font-mono transition-all duration-300 relative ${
//                   pathname === "/gallery"
//                     ? "text-white shadow-[0_0_10px_rgba(168,162,158,0.5)]"
//                     : "text-stone-300 hover:text-white"
//                 }`}
//               >
//                 Gallery
//               </Link>
//               <Link
//                 href="/docs"
//                 className={`font-mono transition-all duration-300 relative ${
//                   pathname === "/docs"
//                     ? "text-white shadow-[0_0_10px_rgba(168,162,158,0.5)]"
//                     : "text-stone-300 hover:text-white"
//                 }`}
//               >
//                 Docs
//               </Link>
//             </div>
//             <div className="md:hidden">
//               <Button variant="ghost" size="sm" className="text-stone-300 hover:text-white">
//                 <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//                 </svg>
//               </Button>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <section className="relative overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-br from-stone-900/20 to-black"></div>
//         <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
//           <div className="text-center">
//             <h1 className="text-6xl md:text-8xl font-bold font-mono mb-6">
//               <span className="text-white">F(</span>
//               <span className="text-stone-400">x</span>
//               <span className="text-white">) scale</span>
//             </h1>
//             <p className="text-xl md:text-2xl text-stone-300 mb-8 max-w-3xl mx-auto leading-relaxed">
//               Transform any image into stunning ASCII art with precision control over resolution, character sets, and
//               color modes.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
//               <Link href="/converter">
//                 <Button
//                   size="lg"
//                   className="bg-stone-700 hover:bg-stone-600 text-white border-stone-600 px-8 py-3 text-lg font-mono group"
//                 >
//                   Start Converting
//                   <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
//                 </Button>
//               </Link>
//               <p className="text-stone-400 text-sm font-mono">No signup required • Free to use</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="py-16 border-t border-stone-800">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl md:text-4xl font-bold font-mono text-white mb-4">Powerful Features</h2>
//             <p className="text-stone-300 text-lg max-w-2xl mx-auto">
//               Fine-tune every aspect of your ASCII art conversion
//             </p>
//           </div>

//           <div className="grid md:grid-cols-3 gap-8">
//             <Card className="bg-stone-900 border-stone-700 hover:border-stone-600 transition-colors">
//               <CardContent className="p-6">
//                 <div className="flex items-center mb-4">
//                   <Zap className="h-8 w-8 text-stone-400 mr-3" />
//                   <h3 className="text-xl font-mono text-white">Adjustable Resolution</h3>
//                 </div>
//                 <p className="text-stone-300">
//                   Control the detail level of your ASCII art with precision resolution scaling from 0.05x to 0.3x.
//                 </p>
//               </CardContent>
//             </Card>

//             <Card className="bg-stone-900 border-stone-700 hover:border-stone-600 transition-colors">
//               <CardContent className="p-6">
//                 <div className="flex items-center mb-4">
//                   <Palette className="h-8 w-8 text-stone-400 mr-3" />
//                   <h3 className="text-xl font-mono text-white">Multiple Character Sets</h3>
//                 </div>
//                 <p className="text-stone-300">
//                   Choose from standard, detailed, block, or minimal character sets to match your artistic vision.
//                 </p>
//               </CardContent>
//             </Card>

//             <Card className="bg-stone-900 border-stone-700 hover:border-stone-600 transition-colors">
//               <CardContent className="p-6">
//                 <div className="flex items-center mb-4">
//                   <Sparkles className="h-8 w-8 text-stone-400 mr-3" />
//                   <h3 className="text-xl font-mono text-white">Color & Grayscale</h3>
//                 </div>
//                 <p className="text-stone-300">
//                   Toggle between full color ASCII art and classic grayscale modes with inversion options.
//                 </p>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </section>

//       {/* How It Works Section */}
//       <section className="py-16 border-t border-stone-800">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl md:text-4xl font-bold font-mono text-white mb-4">How It Works</h2>
//             <p className="text-stone-300 text-lg max-w-2xl mx-auto">Simple steps to create your ASCII masterpiece</p>
//           </div>

//           <div className="grid md:grid-cols-3 gap-8">
//             <div className="text-center">
//               <div className="w-16 h-16 bg-stone-700 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <span className="text-2xl font-mono font-bold text-white">1</span>
//               </div>
//               <h3 className="text-xl font-mono text-white mb-2">Upload Image</h3>
//               <p className="text-stone-300">Drag and drop or click to upload any image file from your device.</p>
//             </div>

//             <div className="text-center">
//               <div className="w-16 h-16 bg-stone-700 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <span className="text-2xl font-mono font-bold text-white">2</span>
//               </div>
//               <h3 className="text-xl font-mono text-white mb-2">Customize Settings</h3>
//               <p className="text-stone-300">
//                 Adjust resolution, character set, colors, and other parameters to your liking.
//               </p>
//             </div>

//             <div className="text-center">
//               <div className="w-16 h-16 bg-stone-700 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <span className="text-2xl font-mono font-bold text-white">3</span>
//               </div>
//               <h3 className="text-xl font-mono text-white mb-2">Export & Share</h3>
//               <p className="text-stone-300">Copy to clipboard or download your ASCII art as a text file.</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-16 border-t border-stone-800">
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <h2 className="text-3xl md:text-4xl font-bold font-mono text-white mb-4">Ready to Create ASCII Art?</h2>
//           <p className="text-stone-300 text-lg mb-8 max-w-2xl mx-auto">
//             Transform your images into stunning text-based art in seconds. No installation required.
//           </p>
//           <Link href="/converter">
//             <Button
//               size="lg"
//               className="bg-stone-700 hover:bg-stone-600 text-white border-stone-600 px-8 py-3 text-lg font-mono group"
//             >
//               Launch F(x) scale
//               <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
//             </Button>
//           </Link>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="border-t border-stone-800 py-8">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center">
//             <p className="text-stone-400 font-mono">F(x) scale - Transform images into ASCII art</p>
//             <p className="text-stone-500 text-sm mt-2">Built with precision and creativity</p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   )
// }

// "use client"

// import { useEffect } from "react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent } from "@/components/ui/card"
// import { ArrowRight, Palette, Zap, Sparkles } from "lucide-react"
// import Link from "next/link"
// import { usePathname } from "next/navigation"

// export default function LandingPage() {
//   const pathname = usePathname()

//   useEffect(() => {
//     // Set document background to black
//     if (typeof document !== "undefined") {
//       document.documentElement.style.backgroundColor = "black"
//       document.body.style.backgroundColor = "black"
//     }

//     return () => {
//       // Clean up when component unmounts
//       if (typeof document !== "undefined") {
//         document.documentElement.style.backgroundColor = ""
//         document.body.style.backgroundColor = ""
//       }
//     }
//   }, [])

//   return (
//     <div className="min-h-screen bg-black text-white">
//       {/* Navigation Bar */}
//       <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-stone-800">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             <Link
//               href="/"
//               className="text-xl font-mono font-bold text-white relative group transition-all duration-300"
//             >
//               <span className="relative z-10">F(x) scale</span>
//               <div className="absolute inset-0 bg-stone-700/20 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 -m-2"></div>
//             </Link>
//             <div className="hidden md:flex space-x-8">
//               <Link
//                 href="/"
//                 className={`font-mono transition-all duration-300 relative ${
//                   pathname === "/"
//                     ? "text-white shadow-[0_0_10px_rgba(168,162,158,0.5)]"
//                     : "text-stone-300 hover:text-white"
//                 }`}
//               >
//                 Home
//               </Link>
//               <Link
//                 href="/converter"
//                 className={`font-mono transition-all duration-300 relative ${
//                   pathname === "/converter"
//                     ? "text-white shadow-[0_0_10px_rgba(168,162,158,0.5)]"
//                     : "text-stone-300 hover:text-white"
//                 }`}
//               >
//                 Converter
//               </Link>
//               <Link
//                 href="/about"
//                 className={`font-mono transition-all duration-300 relative ${
//                   pathname === "/about"
//                     ? "text-white shadow-[0_0_10px_rgba(168,162,158,0.5)]"
//                     : "text-stone-300 hover:text-white"
//                 }`}
//               >
//                 About
//               </Link>
//               <Link
//                 href="/gallery"
//                 className={`font-mono transition-all duration-300 relative ${
//                   pathname === "/gallery"
//                     ? "text-white shadow-[0_0_10px_rgba(168,162,158,0.5)]"
//                     : "text-stone-300 hover:text-white"
//                 }`}
//               >
//                 Gallery
//               </Link>
//               <Link
//                 href="/docs"
//                 className={`font-mono transition-all duration-300 relative ${
//                   pathname === "/docs"
//                     ? "text-white shadow-[0_0_10px_rgba(168,162,158,0.5)]"
//                     : "text-stone-300 hover:text-white"
//                 }`}
//               >
//                 Docs
//               </Link>
//             </div>
//             <div className="md:hidden">
//               <Button variant="ghost" size="sm" className="text-stone-300 hover:text-white">
//                 <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//                 </svg>
//               </Button>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <section className="relative overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-br from-stone-900/20 to-black"></div>

//         {/* Animated background elements */}
//         <div className="absolute inset-0 overflow-hidden">
//           <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-stone-600 rounded-full animate-pulse opacity-30"></div>
//           <div
//             className="absolute top-1/3 right-1/3 w-1 h-1 bg-stone-500 rounded-full animate-ping opacity-20"
//             style={{ animationDelay: "1s" }}
//           ></div>
//           <div
//             className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-stone-400 rounded-full animate-pulse opacity-25"
//             style={{ animationDelay: "2s" }}
//           ></div>
//           <div
//             className="absolute top-1/2 right-1/4 w-1 h-1 bg-stone-600 rounded-full animate-ping opacity-15"
//             style={{ animationDelay: "3s" }}
//           ></div>
//         </div>

//         <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
//           <div className="text-center">
//             <h1 className="text-6xl md:text-8xl font-bold font-mono mb-6 animate-fade-in">
//               <span className="text-white">F(</span>
//               <span className="text-stone-400 animate-pulse">x</span>
//               <span className="text-white">) scale</span>
//             </h1>
//             <p
//               className="text-xl md:text-2xl text-stone-300 mb-8 max-w-3xl mx-auto leading-relaxed animate-slide-up opacity-0"
//               style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}
//             >
//               Transform images into <span className="text-white font-semibold">ASCII art</span>,{" "}
//               <span className="text-white font-semibold">Braille patterns</span>,{" "}
//               <span className="text-white font-semibold">pixel art</span>,{" "}
//               <span className="text-white font-semibold">color palettes</span>, and more with advanced mathematical
//               precision.
//             </p>
//             <div
//               className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up opacity-0"
//               style={{ animationDelay: "1s", animationFillMode: "forwards" }}
//             >
//               <Link href="/converter">
//                 <Button
//                   size="lg"
//                   className="bg-stone-700 hover:bg-stone-600 text-white border-stone-600 px-8 py-3 text-lg font-mono group transform hover:scale-105 transition-all duration-300"
//                 >
//                   Explore Converters
//                   <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
//                 </Button>
//               </Link>
//               <p className="text-stone-400 text-sm font-mono">7 Converters • No signup required • Free to use</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="py-16 border-t border-stone-800">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl md:text-4xl font-bold font-mono text-white mb-4 animate-fade-in">
//               Multiple Converters
//             </h2>
//             <p
//               className="text-stone-300 text-lg max-w-2xl mx-auto animate-slide-up opacity-0"
//               style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
//             >
//               Choose from our collection of specialized image transformation tools
//             </p>
//           </div>

//           <div className="grid md:grid-cols-3 gap-8">
//             <Card
//               className="bg-stone-900 border-stone-700 hover:border-stone-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-stone-700/20 animate-slide-up opacity-0"
//               style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}
//             >
//               <CardContent className="p-6">
//                 <div className="flex items-center mb-4">
//                   <Zap className="h-8 w-8 text-stone-400 mr-3 animate-pulse" />
//                   <h3 className="text-xl font-mono text-white">ASCII & Braille Art</h3>
//                 </div>
//                 <p className="text-stone-300">
//                   Convert images to ASCII characters or Braille patterns with adjustable resolution and character sets.
//                 </p>
//               </CardContent>
//             </Card>

//             <Card
//               className="bg-stone-900 border-stone-700 hover:border-stone-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-stone-700/20 animate-slide-up opacity-0"
//               style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
//             >
//               <CardContent className="p-6">
//                 <div className="flex items-center mb-4">
//                   <Palette className="h-8 w-8 text-stone-400 mr-3 animate-pulse" style={{ animationDelay: "0.5s" }} />
//                   <h3 className="text-xl font-mono text-white">Color & Pixel Art</h3>
//                 </div>
//                 <p className="text-stone-300">
//                   Extract color palettes, create pixel art, or generate SVG traces from your images.
//                 </p>
//               </CardContent>
//             </Card>

//             <Card
//               className="bg-stone-900 border-stone-700 hover:border-stone-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-stone-700/20 animate-slide-up opacity-0"
//               style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}
//             >
//               <CardContent className="p-6">
//                 <div className="flex items-center mb-4">
//                   <Sparkles className="h-8 w-8 text-stone-400 mr-3 animate-pulse" style={{ animationDelay: "1s" }} />
//                   <h3 className="text-xl font-mono text-white">Advanced Analysis</h3>
//                 </div>
//                 <p className="text-stone-300">
//                   Text portraits, Fourier transforms, and mathematical image analysis tools.
//                 </p>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </section>

//       {/* How It Works Section */}
//       <section className="py-16 border-t border-stone-800">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl md:text-4xl font-bold font-mono text-white mb-4 animate-fade-in">How It Works</h2>
//             <p
//               className="text-stone-300 text-lg max-w-2xl mx-auto animate-slide-up opacity-0"
//               style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
//             >
//               Simple steps to transform your images
//             </p>
//           </div>

//           <div className="grid md:grid-cols-3 gap-8">
//             <div
//               className="text-center animate-slide-up opacity-0"
//               style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
//             >
//               <div className="w-16 h-16 bg-stone-700 rounded-full flex items-center justify-center mx-auto mb-4 transform hover:scale-110 transition-transform duration-300 hover:bg-stone-600">
//                 <span className="text-2xl font-mono font-bold text-white">1</span>
//               </div>
//               <h3 className="text-xl font-mono text-white mb-2">Choose Converter</h3>
//               <p className="text-stone-300">
//                 Select from ASCII, Braille, Pixel Art, Color Palette, SVG Trace, Text Portrait, or Fourier Transform.
//               </p>
//             </div>

//             <div
//               className="text-center animate-slide-up opacity-0"
//               style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
//             >
//               <div className="w-16 h-16 bg-stone-700 rounded-full flex items-center justify-center mx-auto mb-4 transform hover:scale-110 transition-transform duration-300 hover:bg-stone-600">
//                 <span className="text-2xl font-mono font-bold text-white">2</span>
//               </div>
//               <h3 className="text-xl font-mono text-white mb-2">Upload & Customize</h3>
//               <p className="text-stone-300">Upload your image and adjust settings specific to each converter type.</p>
//             </div>

//             <div
//               className="text-center animate-slide-up opacity-0"
//               style={{ animationDelay: "0.6s", animationFillMode: "forwards" }}
//             >
//               <div className="w-16 h-16 bg-stone-700 rounded-full flex items-center justify-center mx-auto mb-4 transform hover:scale-110 transition-transform duration-300 hover:bg-stone-600">
//                 <span className="text-2xl font-mono font-bold text-white">3</span>
//               </div>
//               <h3 className="text-xl font-mono text-white mb-2">Export Results</h3>
//               <p className="text-stone-300">
//                 Download your transformed image, copy text output, or save analysis data.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-16 border-t border-stone-800">
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <h2 className="text-3xl md:text-4xl font-bold font-mono text-white mb-4 animate-fade-in">
//             Ready to Transform Images?
//           </h2>
//           <p
//             className="text-stone-300 text-lg mb-8 max-w-2xl mx-auto animate-slide-up opacity-0"
//             style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
//           >
//             Explore 7 different converters and transform your images with mathematical precision. No installation
//             required.
//           </p>
//           <Link href="/converter">
//             <Button
//               size="lg"
//               className="bg-stone-700 hover:bg-stone-600 text-white border-stone-600 px-8 py-3 text-lg font-mono group transform hover:scale-105 transition-all duration-300 animate-slide-up opacity-0"
//               style={{ animationDelay: "0.6s", animationFillMode: "forwards" }}
//             >
//               Launch F(x) scale
//               <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
//             </Button>
//           </Link>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="border-t border-stone-800 py-8">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center">
//             <p className="text-stone-400 font-mono">F(x) scale - Transform images into ASCII art</p>
//             <p className="text-stone-500 text-sm mt-2">Built with precision and creativity</p>
//           </div>
//         </div>
//       </footer>
//       <style jsx>{`
//         @keyframes fade-in {
//           from {
//             opacity: 0;
//             transform: translateY(20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         @keyframes slide-up {
//           from {
//             opacity: 0;
//             transform: translateY(30px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         .animate-fade-in {
//           animation: fade-in 1s ease-out forwards;
//         }

//         .animate-slide-up {
//           animation: slide-up 0.8s ease-out forwards;
//         }
//       `}</style>
//     </div>
//   )
// }



// "use client"

// import { useEffect } from "react"
// import { Button } from "@/components/ui/button"
// import { ArrowRight, Palette, Sparkles } from "lucide-react"
// import Link from "next/link"
// import { usePathname } from "next/navigation"

// export default function LandingPage() {
//   const pathname = usePathname()

//   useEffect(() => {
//     // Set document background to black
//     if (typeof document !== "undefined") {
//       document.documentElement.style.backgroundColor = "black"
//       document.body.style.backgroundColor = "black"
//     }

//     return () => {
//       // Clean up when component unmounts
//       if (typeof document !== "undefined") {
//         document.documentElement.style.backgroundColor = ""
//         document.body.style.backgroundColor = ""
//       }
//     }
//   }, [])

//   return (
//     <div className="min-h-screen bg-black text-white">
//       {/* Navigation Bar */}
//       <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-stone-800">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             <Link
//               href="/"
//               className="text-xl font-mono font-bold text-white relative group transition-all duration-300"
//             >
//               <span className="relative z-10">F(x) scale</span>
//               <div className="absolute inset-0 bg-stone-700/20 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 -m-2"></div>
//             </Link>
//             <div className="hidden md:flex space-x-8">
//               <Link
//                 href="/"
//                 className={`font-mono transition-all duration-300 relative ${
//                   pathname === "/"
//                     ? "text-white shadow-[0_0_10px_rgba(168,162,158,0.5)]"
//                     : "text-stone-300 hover:text-white"
//                 }`}
//               >
//                 Home
//               </Link>
//               <Link
//                 href="/converter"
//                 className={`font-mono transition-all duration-300 relative ${
//                   pathname === "/converter"
//                     ? "text-white shadow-[0_0_10px_rgba(168,162,158,0.5)]"
//                     : "text-stone-300 hover:text-white"
//                 }`}
//               >
//                 Converter
//               </Link>
//               <Link
//                 href="/about"
//                 className={`font-mono transition-all duration-300 relative ${
//                   pathname === "/about"
//                     ? "text-white shadow-[0_0_10px_rgba(168,162,158,0.5)]"
//                     : "text-stone-300 hover:text-white"
//                 }`}
//               >
//                 About
//               </Link>
//               <Link
//                 href="/gallery"
//                 className={`font-mono transition-all duration-300 relative ${
//                   pathname === "/gallery"
//                     ? "text-white shadow-[0_0_10px_rgba(168,162,158,0.5)]"
//                     : "text-stone-300 hover:text-white"
//                 }`}
//               >
//                 Gallery
//               </Link>
//               <Link
//                 href="/docs"
//                 className={`font-mono transition-all duration-300 relative ${
//                   pathname === "/docs"
//                     ? "text-white shadow-[0_0_10px_rgba(168,162,158,0.5)]"
//                     : "text-stone-300 hover:text-white"
//                 }`}
//               >
//                 Docs
//               </Link>
//             </div>
//             <div className="md:hidden">
//               <Button variant="ghost" size="sm" className="text-stone-300 hover:text-white">
//                 <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//                 </svg>
//               </Button>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <section className="relative overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-br from-stone-900/20 to-black"></div>

//         {/* Animated background elements */}
//         <div className="absolute inset-0 overflow-hidden">
//           <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-stone-600 rounded-full animate-pulse opacity-30"></div>
//           <div
//             className="absolute top-1/3 right-1/3 w-1 h-1 bg-stone-500 rounded-full animate-ping opacity-20"
//             style={{ animationDelay: "1s" }}
//           ></div>
//           <div
//             className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-stone-400 rounded-full animate-pulse opacity-25"
//             style={{ animationDelay: "2s" }}
//           ></div>
//           <div
//             className="absolute top-1/2 right-1/4 w-1 h-1 bg-stone-600 rounded-full animate-ping opacity-15"
//             style={{ animationDelay: "3s" }}
//           ></div>
//         </div>

//         <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
//           <div className="text-center">
//             <h1 className="text-6xl md:text-8xl font-bold font-mono mb-6 animate-fade-in">
//               <span className="text-white">F(</span>
//               <span className="text-stone-400 animate-pulse">x</span>
//               <span className="text-white">) scale</span>
//             </h1>
//             <p
//               className="text-xl md:text-2xl text-stone-300 mb-8 max-w-3xl mx-auto leading-relaxed animate-slide-up opacity-0"
//               style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}
//             >
//               Transform images into <span className="text-white font-semibold">ASCII art</span>,{" "}
//               <span className="text-white font-semibold">Braille patterns</span>,{" "}
//               <span className="text-white font-semibold">pixel art</span>,{" "}
//               <span className="text-white font-semibold">color palettes</span>, and more with advanced mathematical
//               precision.
//             </p>
//             <div
//               className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up opacity-0"
//               style={{ animationDelay: "1s", animationFillMode: "forwards" }}
//             >
//               <Link href="/converter">
//                 <Button
//                   size="lg"
//                   className="bg-stone-700 hover:bg-stone-600 text-white border-stone-600 px-8 py-3 text-lg font-mono group transform hover:scale-105 transition-all duration-300"
//                 >
//                   Explore Converters
//                   <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
//                 </Button>
//               </Link>
//               <p className="text-stone-400 text-sm font-mono">7 Converters • No signup required • Free to use</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Multiple Converters Section */}
//       <section className="py-16 border-t border-stone-800 overflow-hidden">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl md:text-4xl font-bold font-mono text-white mb-4 animate-fade-in">
//               Multiple Converters
//             </h2>
//             <p
//               className="text-stone-300 text-lg max-w-2xl mx-auto animate-slide-up opacity-0"
//               style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
//             >
//               Choose from our collection of specialized image transformation tools
//             </p>
//           </div>

//           {/* Converter Tiles */}
//           <div className="converter-tiles-container relative">
//             <div className="converter-tiles grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 perspective-1000">
//               {/* ASCII Art Converter */}
//               <Link href="/converter/ascii-art" className="converter-tile group">
//                 <div className="tile-content bg-gradient-to-br from-stone-900 to-stone-800 border border-stone-700 rounded-lg p-6 h-full transition-all duration-500 transform-gpu">
//                   <div className="tile-icon mb-4">
//                     <div className="w-12 h-12 bg-stone-700 rounded-lg flex items-center justify-center">
//                       <span className="text-xl font-mono text-white">#</span>
//                     </div>
//                   </div>
//                   <h3 className="text-lg font-mono text-white mb-2">ASCII Art</h3>
//                   <p className="text-stone-300 text-sm mb-4">
//                     Convert images to ASCII characters with precision control
//                   </p>
//                   <div className="tile-features text-xs text-stone-400 space-y-1">
//                     <div>• Adjustable resolution</div>
//                     <div>• Multiple character sets</div>
//                     <div>• Color & grayscale modes</div>
//                   </div>
//                   <div className="tile-arrow absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                     <ArrowRight className="h-4 w-4 text-stone-400" />
//                   </div>
//                 </div>
//               </Link>

//               {/* Braille Art Converter */}
//               <Link href="/converter/braille-art" className="converter-tile group">
//                 <div className="tile-content bg-gradient-to-br from-stone-900 to-stone-800 border border-stone-700 rounded-lg p-6 h-full transition-all duration-500 transform-gpu">
//                   <div className="tile-icon mb-4">
//                     <div className="w-12 h-12 bg-stone-700 rounded-lg flex items-center justify-center">
//                       <span className="text-xl font-mono text-white">⠿</span>
//                     </div>
//                   </div>
//                   <h3 className="text-lg font-mono text-white mb-2">Braille Art</h3>
//                   <p className="text-stone-300 text-sm mb-4">Transform images into tactile Braille patterns</p>
//                   <div className="tile-features text-xs text-stone-400 space-y-1">
//                     <div>• Braille Unicode patterns</div>
//                     <div>• High detail preservation</div>
//                     <div>• Accessibility focused</div>
//                   </div>
//                   <div className="tile-arrow absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                     <ArrowRight className="h-4 w-4 text-stone-400" />
//                   </div>
//                 </div>
//               </Link>

//               {/* Pixel Art Converter */}
//               <Link href="/converter/pixel-art" className="converter-tile group">
//                 <div className="tile-content bg-gradient-to-br from-stone-900 to-stone-800 border border-stone-700 rounded-lg p-6 h-full transition-all duration-500 transform-gpu">
//                   <div className="tile-icon mb-4">
//                     <div className="w-12 h-12 bg-stone-700 rounded-lg flex items-center justify-center">
//                       <div className="grid grid-cols-2 gap-0.5">
//                         <div className="w-1.5 h-1.5 bg-white rounded-sm"></div>
//                         <div className="w-1.5 h-1.5 bg-stone-400 rounded-sm"></div>
//                         <div className="w-1.5 h-1.5 bg-stone-400 rounded-sm"></div>
//                         <div className="w-1.5 h-1.5 bg-white rounded-sm"></div>
//                       </div>
//                     </div>
//                   </div>
//                   <h3 className="text-lg font-mono text-white mb-2">Pixel Art</h3>
//                   <p className="text-stone-300 text-sm mb-4">Create retro-style pixelated artwork</p>
//                   <div className="tile-features text-xs text-stone-400 space-y-1">
//                     <div>• Customizable pixel size</div>
//                     <div>• Color quantization</div>
//                     <div>• Retro gaming style</div>
//                   </div>
//                   <div className="tile-arrow absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                     <ArrowRight className="h-4 w-4 text-stone-400" />
//                   </div>
//                 </div>
//               </Link>

//               {/* Color Palette Extractor */}
//               <Link href="/converter/color-palette" className="converter-tile group">
//                 <div className="tile-content bg-gradient-to-br from-stone-900 to-stone-800 border border-stone-700 rounded-lg p-6 h-full transition-all duration-500 transform-gpu">
//                   <div className="tile-icon mb-4">
//                     <div className="w-12 h-12 bg-stone-700 rounded-lg flex items-center justify-center">
//                       <Palette className="h-6 w-6 text-white" />
//                     </div>
//                   </div>
//                   <h3 className="text-lg font-mono text-white mb-2">Color Palette</h3>
//                   <p className="text-stone-300 text-sm mb-4">Extract dominant colors from images</p>
//                   <div className="tile-features text-xs text-stone-400 space-y-1">
//                     <div>• K-means clustering</div>
//                     <div>• Hex & RGB values</div>
//                     <div>• Export palettes</div>
//                   </div>
//                   <div className="tile-arrow absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                     <ArrowRight className="h-4 w-4 text-stone-400" />
//                   </div>
//                 </div>
//               </Link>

//               {/* SVG Trace Converter */}
//               <Link href="/converter/svg-trace" className="converter-tile group">
//                 <div className="tile-content bg-gradient-to-br from-stone-900 to-stone-800 border border-stone-700 rounded-lg p-6 h-full transition-all duration-500 transform-gpu">
//                   <div className="tile-icon mb-4">
//                     <div className="w-12 h-12 bg-stone-700 rounded-lg flex items-center justify-center">
//                       <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5H9a2 2 0 00-2 2v12a4 4 0 004 4h6a2 2 0 002-2V7a2 2 0 00-2-2z"
//                         />
//                       </svg>
//                     </div>
//                   </div>
//                   <h3 className="text-lg font-mono text-white mb-2">SVG Trace</h3>
//                   <p className="text-stone-300 text-sm mb-4">Convert images to scalable vector graphics</p>
//                   <div className="tile-features text-xs text-stone-400 space-y-1">
//                     <div>• Edge detection</div>
//                     <div>• Vector paths</div>
//                     <div>• Scalable output</div>
//                   </div>
//                   <div className="tile-arrow absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                     <ArrowRight className="h-4 w-4 text-stone-400" />
//                   </div>
//                 </div>
//               </Link>

//               {/* Text Portrait Generator */}
//               <Link href="/converter/text-portrait" className="converter-tile group">
//                 <div className="tile-content bg-gradient-to-br from-stone-900 to-stone-800 border border-stone-700 rounded-lg p-6 h-full transition-all duration-500 transform-gpu">
//                   <div className="tile-icon mb-4">
//                     <div className="w-12 h-12 bg-stone-700 rounded-lg flex items-center justify-center">
//                       <span className="text-lg font-mono text-white">Aa</span>
//                     </div>
//                   </div>
//                   <h3 className="text-lg font-mono text-white mb-2">Text Portrait</h3>
//                   <p className="text-stone-300 text-sm mb-4">Create portraits using custom text</p>
//                   <div className="tile-features text-xs text-stone-400 space-y-1">
//                     <div>• Custom text input</div>
//                     <div>• Font size control</div>
//                     <div>• Artistic typography</div>
//                   </div>
//                   <div className="tile-arrow absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                     <ArrowRight className="h-4 w-4 text-stone-400" />
//                   </div>
//                 </div>
//               </Link>

//               {/* Fourier Transform Analyzer */}
//               <Link href="/converter/fourier-transform" className="converter-tile group">
//                 <div className="tile-content bg-gradient-to-br from-stone-900 to-stone-800 border border-stone-700 rounded-lg p-6 h-full transition-all duration-500 transform-gpu">
//                   <div className="tile-icon mb-4">
//                     <div className="w-12 h-12 bg-stone-700 rounded-lg flex items-center justify-center">
//                       <Sparkles className="h-6 w-6 text-white" />
//                     </div>
//                   </div>
//                   <h3 className="text-lg font-mono text-white mb-2">Fourier Transform</h3>
//                   <p className="text-stone-300 text-sm mb-4">Advanced frequency domain analysis</p>
//                   <div className="tile-features text-xs text-stone-400 space-y-1">
//                     <div>• FFT & DCT analysis</div>
//                     <div>• Frequency filtering</div>
//                     <div>• Mathematical precision</div>
//                   </div>
//                   <div className="tile-arrow absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                     <ArrowRight className="h-4 w-4 text-stone-400" />
//                   </div>
//                 </div>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* How It Works Section */}
//       <section className="py-16 border-t border-stone-800">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl md:text-4xl font-bold font-mono text-white mb-4 animate-fade-in">How It Works</h2>
//             <p
//               className="text-stone-300 text-lg max-w-2xl mx-auto animate-slide-up opacity-0"
//               style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
//             >
//               Simple steps to transform your images
//             </p>
//           </div>

//           <div className="grid md:grid-cols-3 gap-8">
//             <div
//               className="text-center animate-slide-up opacity-0"
//               style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
//             >
//               <div className="w-16 h-16 bg-stone-700 rounded-full flex items-center justify-center mx-auto mb-4 transform hover:scale-110 transition-transform duration-300 hover:bg-stone-600">
//                 <span className="text-2xl font-mono font-bold text-white">1</span>
//               </div>
//               <h3 className="text-xl font-mono text-white mb-2">Choose Converter</h3>
//               <p className="text-stone-300">
//                 Select from ASCII, Braille, Pixel Art, Color Palette, SVG Trace, Text Portrait, or Fourier Transform.
//               </p>
//             </div>

//             <div
//               className="text-center animate-slide-up opacity-0"
//               style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
//             >
//               <div className="w-16 h-16 bg-stone-700 rounded-full flex items-center justify-center mx-auto mb-4 transform hover:scale-110 transition-transform duration-300 hover:bg-stone-600">
//                 <span className="text-2xl font-mono font-bold text-white">2</span>
//               </div>
//               <h3 className="text-xl font-mono text-white mb-2">Upload & Customize</h3>
//               <p className="text-stone-300">Upload your image and adjust settings specific to each converter type.</p>
//             </div>

//             <div
//               className="text-center animate-slide-up opacity-0"
//               style={{ animationDelay: "0.6s", animationFillMode: "forwards" }}
//             >
//               <div className="w-16 h-16 bg-stone-700 rounded-full flex items-center justify-center mx-auto mb-4 transform hover:scale-110 transition-transform duration-300 hover:bg-stone-600">
//                 <span className="text-2xl font-mono font-bold text-white">3</span>
//               </div>
//               <h3 className="text-xl font-mono text-white mb-2">Export Results</h3>
//               <p className="text-stone-300">
//                 Download your transformed image, copy text output, or save analysis data.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-16 border-t border-stone-800">
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <h2 className="text-3xl md:text-4xl font-bold font-mono text-white mb-4 animate-fade-in">
//             Ready to Transform Images?
//           </h2>
//           <p
//             className="text-stone-300 text-lg mb-8 max-w-2xl mx-auto animate-slide-up opacity-0"
//             style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
//           >
//             Explore 7 different converters and transform your images with mathematical precision. No installation
//             required.
//           </p>
//           <Link href="/converter">
//             <Button
//               size="lg"
//               className="bg-stone-700 hover:bg-stone-600 text-white border-stone-600 px-8 py-3 text-lg font-mono group transform hover:scale-105 transition-all duration-300 animate-slide-up opacity-0"
//               style={{ animationDelay: "0.6s", animationFillMode: "forwards" }}
//             >
//               Launch F(x) scale
//               <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
//             </Button>
//           </Link>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="border-t border-stone-800 py-8">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center">
//             <p className="text-stone-400 font-mono">F(x) scale - Transform images into ASCII art</p>
//             <p className="text-stone-500 text-sm mt-2">Built with precision and creativity</p>
//           </div>
//         </div>
//       </footer>
//       <style jsx>{`
//         @keyframes fade-in {
//           from {
//             opacity: 0;
//             transform: translateY(20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         @keyframes slide-up {
//           from {
//             opacity: 0;
//             transform: translateY(30px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         .animate-fade-in {
//           animation: fade-in 1s ease-out forwards;
//         }

//         .animate-slide-up {
//           animation: slide-up 0.8s ease-out forwards;
//         }

//         .perspective-1000 {
//           perspective: 1000px;
//         }

//         .converter-tile {
//           display: block;
//           position: relative;
//           transform-style: preserve-3d;
//           transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
//         }

//         .tile-content {
//           position: relative;
//           height: 200px;
//           transform-origin: center center;
//           backface-visibility: hidden;
//           will-change: transform;
//         }

//         .converter-tiles:hover .converter-tile:not(:hover) .tile-content {
//           transform: scale(0.95) rotateX(5deg) translateY(10px);
//           opacity: 0.7;
//           filter: blur(1px);
//         }

//         .converter-tile:hover .tile-content {
//           transform: scale(1.08) rotateX(-2deg) translateY(-8px) translateZ(20px);
//           box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3), 0 0 20px rgba(168, 162, 158, 0.1);
//           border-color: rgba(168, 162, 158, 0.5);
//           background: linear-gradient(135deg, #292524 0%, #1c1917 100%);
//         }

//         .converter-tile:hover .tile-icon {
//           transform: scale(1.1) rotateY(5deg);
//         }

//         .converter-tile:hover h3 {
//           color: #f5f5f4;
//           text-shadow: 0 0 10px rgba(245, 245, 244, 0.3);
//         }

//         .tile-content::before {
//           content: '';
//           position: absolute;
//           top: 0;
//           left: 0;
//           right: 0;
//           bottom: 0;
//           background: linear-gradient(135deg, transparent 0%, rgba(168, 162, 158, 0.05) 100%);
//           border-radius: inherit;
//           opacity: 0;
//           transition: opacity 0.3s ease;
//         }

//         .converter-tile:hover .tile-content::before {
//           opacity: 1;
//         }

//         .tile-icon {
//           transition: transform 0.3s ease;
//         }

//         .converter-tiles {
//           animation: slide-in-tiles 1s ease-out forwards;
//         }

//         @keyframes slide-in-tiles {
//           from {
//             opacity: 0;
//             transform: translateX(-50px);
//           }
//           to {
//             opacity: 1;
//             transform: translateX(0);
//           }
//         }

//         .converter-tile:nth-child(1) { animation-delay: 0.1s; }
//         .converter-tile:nth-child(2) { animation-delay: 0.2s; }
//         .converter-tile:nth-child(3) { animation-delay: 0.3s; }
//         .converter-tile:nth-child(4) { animation-delay: 0.4s; }
//         .converter-tile:nth-child(5) { animation-delay: 0.5s; }
//         .converter-tile:nth-child(6) { animation-delay: 0.6s; }
//         .converter-tile:nth-child(7) { animation-delay: 0.7s; }

//         @media (max-width: 768px) {
//           .converter-tiles:hover .converter-tile:not(:hover) .tile-content {
//             transform: none;
//             opacity: 1;
//             filter: none;
//           }
          
//           .converter-tile:hover .tile-content {
//             transform: scale(1.02) translateY(-2px);
//           }
//         }
//       `}</style>
//     </div>
//   )
// }




"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Palette, Sparkles } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function LandingPage() {
  const pathname = usePathname()

  useEffect(() => {
    // Set document background to black
    if (typeof document !== "undefined") {
      document.documentElement.style.backgroundColor = "black"
      document.body.style.backgroundColor = "black"
    }

    return () => {
      // Clean up when component unmounts
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
            <div className="md:hidden">
              <Button variant="ghost" size="sm" className="text-stone-300 hover:text-white">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-stone-900/20 to-black"></div>

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-stone-600 rounded-full animate-pulse opacity-30"></div>
          <div
            className="absolute top-1/3 right-1/3 w-1 h-1 bg-stone-500 rounded-full animate-ping opacity-20"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-stone-400 rounded-full animate-pulse opacity-25"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute top-1/2 right-1/4 w-1 h-1 bg-stone-600 rounded-full animate-ping opacity-15"
            style={{ animationDelay: "3s" }}
          ></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
          <div className="text-center">
            <h1 className="text-6xl md:text-8xl font-bold font-mono mb-6 animate-fade-in">
              <span className="text-white">F(</span>
              <span className="text-stone-400 animate-pulse">x</span>
              <span className="text-white">) scale</span>
            </h1>
            <p
              className="text-xl md:text-2xl text-stone-300 mb-8 max-w-3xl mx-auto leading-relaxed animate-slide-up opacity-0"
              style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}
            >
              Transform images into <span className="text-white font-semibold">ASCII art</span>,{" "}
              <span className="text-white font-semibold">Braille patterns</span>,{" "}
              <span className="text-white font-semibold">pixel art</span>,{" "}
              <span className="text-white font-semibold">color palettes</span>, and more with advanced mathematical
              precision.
            </p>
            <div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up opacity-0"
              style={{ animationDelay: "1s", animationFillMode: "forwards" }}
            >
              <Link href="/converter">
                <Button
                  size="lg"
                  className="bg-stone-700 hover:bg-stone-600 text-white border-stone-600 px-8 py-3 text-lg font-mono group transform hover:scale-105 transition-all duration-300"
                >
                  Explore Converters
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <p className="text-stone-400 text-sm font-mono">7 Converters • No signup required • Free to use</p>
            </div>
          </div>
        </div>
      </section>

      {/* Multiple Converters Section */}
      <section className="py-16 border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-mono text-white mb-4 animate-fade-in">
              Multiple Converters
            </h2>
            <p
              className="text-stone-300 text-lg max-w-2xl mx-auto animate-slide-up opacity-0"
              style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
            >
              Scroll horizontally to explore our specialized image transformation tools
            </p>
          </div>

          {/* Horizontal Scrolling Converter Tiles */}
          <div className="converter-scroll-container relative">
            {/* Scroll indicators */}
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-gradient-to-r from-black via-black to-transparent w-8 h-full pointer-events-none"></div>
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-gradient-to-l from-black via-black to-transparent w-8 h-full pointer-events-none"></div>

            <div className="converter-tiles-horizontal overflow-x-auto scrollbar-hide pb-4">
              <div className="flex space-x-6 px-4" style={{ width: "max-content" }}>
                {/* ASCII Art Converter */}
                <Link href="/converter/ascii-art" className="converter-tile-horizontal group flex-shrink-0">
                  <div className="tile-content-horizontal bg-gradient-to-br from-stone-900 to-stone-800 border border-stone-700 rounded-lg p-6 transition-all duration-500 transform-gpu">
                    <div className="tile-icon mb-4">
                      <div className="w-12 h-12 bg-stone-700 rounded-lg flex items-center justify-center">
                        <span className="text-xl font-mono text-white">#</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-mono text-white mb-2">ASCII Art</h3>
                    <p className="text-stone-300 text-sm mb-4">
                      Convert images to ASCII characters with precision control
                    </p>
                    <div className="tile-features text-xs text-stone-400 space-y-1">
                      <div>• Adjustable resolution</div>
                      <div>• Multiple character sets</div>
                      <div>• Color & grayscale modes</div>
                    </div>
                    <div className="tile-arrow absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ArrowRight className="h-4 w-4 text-stone-400" />
                    </div>
                  </div>
                </Link>

                {/* Braille Art Converter */}
                <Link href="/converter/braille-art" className="converter-tile-horizontal group flex-shrink-0">
                  <div className="tile-content-horizontal bg-gradient-to-br from-stone-900 to-stone-800 border border-stone-700 rounded-lg p-6 transition-all duration-500 transform-gpu">
                    <div className="tile-icon mb-4">
                      <div className="w-12 h-12 bg-stone-700 rounded-lg flex items-center justify-center">
                        <span className="text-xl font-mono text-white">⠿</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-mono text-white mb-2">Braille Art</h3>
                    <p className="text-stone-300 text-sm mb-4">Transform images into tactile Braille patterns</p>
                    <div className="tile-features text-xs text-stone-400 space-y-1">
                      <div>• Braille Unicode patterns</div>
                      <div>• High detail preservation</div>
                      <div>• Accessibility focused</div>
                    </div>
                    <div className="tile-arrow absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ArrowRight className="h-4 w-4 text-stone-400" />
                    </div>
                  </div>
                </Link>

                {/* Pixel Art Converter */}
                <Link href="/converter/pixel-art" className="converter-tile-horizontal group flex-shrink-0">
                  <div className="tile-content-horizontal bg-gradient-to-br from-stone-900 to-stone-800 border border-stone-700 rounded-lg p-6 transition-all duration-500 transform-gpu">
                    <div className="tile-icon mb-4">
                      <div className="w-12 h-12 bg-stone-700 rounded-lg flex items-center justify-center">
                        <div className="grid grid-cols-2 gap-0.5">
                          <div className="w-1.5 h-1.5 bg-white rounded-sm"></div>
                          <div className="w-1.5 h-1.5 bg-stone-400 rounded-sm"></div>
                          <div className="w-1.5 h-1.5 bg-stone-400 rounded-sm"></div>
                          <div className="w-1.5 h-1.5 bg-white rounded-sm"></div>
                        </div>
                      </div>
                    </div>
                    <h3 className="text-lg font-mono text-white mb-2">Pixel Art</h3>
                    <p className="text-stone-300 text-sm mb-4">Create retro-style pixelated artwork</p>
                    <div className="tile-features text-xs text-stone-400 space-y-1">
                      <div>• Customizable pixel size</div>
                      <div>• Color quantization</div>
                      <div>• Retro gaming style</div>
                    </div>
                    <div className="tile-arrow absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ArrowRight className="h-4 w-4 text-stone-400" />
                    </div>
                  </div>
                </Link>

                {/* Color Palette Extractor */}
                <Link href="/converter/color-palette" className="converter-tile-horizontal group flex-shrink-0">
                  <div className="tile-content-horizontal bg-gradient-to-br from-stone-900 to-stone-800 border border-stone-700 rounded-lg p-6 transition-all duration-500 transform-gpu">
                    <div className="tile-icon mb-4">
                      <div className="w-12 h-12 bg-stone-700 rounded-lg flex items-center justify-center">
                        <Palette className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <h3 className="text-lg font-mono text-white mb-2">Color Palette</h3>
                    <p className="text-stone-300 text-sm mb-4">Extract dominant colors from images</p>
                    <div className="tile-features text-xs text-stone-400 space-y-1">
                      <div>• K-means clustering</div>
                      <div>• Hex & RGB values</div>
                      <div>• Export palettes</div>
                    </div>
                    <div className="tile-arrow absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ArrowRight className="h-4 w-4 text-stone-400" />
                    </div>
                  </div>
                </Link>

                {/* SVG Trace Converter */}
                <Link href="/converter/svg-trace" className="converter-tile-horizontal group flex-shrink-0">
                  <div className="tile-content-horizontal bg-gradient-to-br from-stone-900 to-stone-800 border border-stone-700 rounded-lg p-6 transition-all duration-500 transform-gpu">
                    <div className="tile-icon mb-4">
                      <div className="w-12 h-12 bg-stone-700 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5H9a2 2 0 00-2 2v12a4 4 0 004 4h6a2 2 0 002-2V7a2 2 0 00-2-2z"
                          />
                        </svg>
                      </div>
                    </div>
                    <h3 className="text-lg font-mono text-white mb-2">SVG Trace</h3>
                    <p className="text-stone-300 text-sm mb-4">Convert images to scalable vector graphics</p>
                    <div className="tile-features text-xs text-stone-400 space-y-1">
                      <div>• Edge detection</div>
                      <div>• Vector paths</div>
                      <div>• Scalable output</div>
                    </div>
                    <div className="tile-arrow absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ArrowRight className="h-4 w-4 text-stone-400" />
                    </div>
                  </div>
                </Link>

                {/* Text Portrait Generator */}
                <Link href="/converter/text-portrait" className="converter-tile-horizontal group flex-shrink-0">
                  <div className="tile-content-horizontal bg-gradient-to-br from-stone-900 to-stone-800 border border-stone-700 rounded-lg p-6 transition-all duration-500 transform-gpu">
                    <div className="tile-icon mb-4">
                      <div className="w-12 h-12 bg-stone-700 rounded-lg flex items-center justify-center">
                        <span className="text-lg font-mono text-white">Aa</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-mono text-white mb-2">Text Portrait</h3>
                    <p className="text-stone-300 text-sm mb-4">Create portraits using custom text</p>
                    <div className="tile-features text-xs text-stone-400 space-y-1">
                      <div>• Custom text input</div>
                      <div>• Font size control</div>
                      <div>• Artistic typography</div>
                    </div>
                    <div className="tile-arrow absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ArrowRight className="h-4 w-4 text-stone-400" />
                    </div>
                  </div>
                </Link>

                {/* Fourier Transform Analyzer */}
                <Link href="/converter/fourier-transform" className="converter-tile-horizontal group flex-shrink-0">
                  <div className="tile-content-horizontal bg-gradient-to-br from-stone-900 to-stone-800 border border-stone-700 rounded-lg p-6 transition-all duration-500 transform-gpu">
                    <div className="tile-icon mb-4">
                      <div className="w-12 h-12 bg-stone-700 rounded-lg flex items-center justify-center">
                        <Sparkles className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <h3 className="text-lg font-mono text-white mb-2">Fourier Transform</h3>
                    <p className="text-stone-300 text-sm mb-4">Advanced frequency domain analysis</p>
                    <div className="tile-features text-xs text-stone-400 space-y-1">
                      <div>• FFT & DCT analysis</div>
                      <div>• Frequency filtering</div>
                      <div>• Mathematical precision</div>
                    </div>
                    <div className="tile-arrow absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ArrowRight className="h-4 w-4 text-stone-400" />
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-mono text-white mb-4 animate-fade-in">How It Works</h2>
            <p
              className="text-stone-300 text-lg max-w-2xl mx-auto animate-slide-up opacity-0"
              style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
            >
              Simple steps to transform your images
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div
              className="text-center animate-slide-up opacity-0"
              style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
            >
              <div className="w-16 h-16 bg-stone-700 rounded-full flex items-center justify-center mx-auto mb-4 transform hover:scale-110 transition-transform duration-300 hover:bg-stone-600">
                <span className="text-2xl font-mono font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-mono text-white mb-2">Choose Converter</h3>
              <p className="text-stone-300">
                Select from ASCII, Braille, Pixel Art, Color Palette, SVG Trace, Text Portrait, or Fourier Transform.
              </p>
            </div>

            <div
              className="text-center animate-slide-up opacity-0"
              style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
            >
              <div className="w-16 h-16 bg-stone-700 rounded-full flex items-center justify-center mx-auto mb-4 transform hover:scale-110 transition-transform duration-300 hover:bg-stone-600">
                <span className="text-2xl font-mono font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-mono text-white mb-2">Upload & Customize</h3>
              <p className="text-stone-300">Upload your image and adjust settings specific to each converter type.</p>
            </div>

            <div
              className="text-center animate-slide-up opacity-0"
              style={{ animationDelay: "0.6s", animationFillMode: "forwards" }}
            >
              <div className="w-16 h-16 bg-stone-700 rounded-full flex items-center justify-center mx-auto mb-4 transform hover:scale-110 transition-transform duration-300 hover:bg-stone-600">
                <span className="text-2xl font-mono font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-mono text-white mb-2">Export Results</h3>
              <p className="text-stone-300">
                Download your transformed image, copy text output, or save analysis data.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 border-t border-stone-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-mono text-white mb-4 animate-fade-in">
            Ready to Transform Images?
          </h2>
          <p
            className="text-stone-300 text-lg mb-8 max-w-2xl mx-auto animate-slide-up opacity-0"
            style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
          >
            Explore 7 different converters and transform your images with mathematical precision. No installation
            required.
          </p>
          <Link href="/converter">
            <Button
              size="lg"
              className="bg-stone-700 hover:bg-stone-600 text-white border-stone-600 px-8 py-3 text-lg font-mono group transform hover:scale-105 transition-all duration-300 animate-slide-up opacity-0"
              style={{ animationDelay: "0.6s", animationFillMode: "forwards" }}
            >
              Launch F(x) scale
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-stone-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-stone-400 font-mono">F(x) scale - Transform images into ASCII art</p>
            <p className="text-stone-500 text-sm mt-2">Built with precision and creativity</p>
          </div>
        </div>
      </footer>
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease-out forwards;
        }

        /* Horizontal Scrolling Tiles */
        .converter-scroll-container {
          position: relative;
        }

        .converter-tiles-horizontal {
          overflow-x: auto;
          overflow-y: hidden;
          scrollbar-width: none;
          -ms-overflow-style: none;
          scroll-behavior: smooth;
        }

        .converter-tiles-horizontal::-webkit-scrollbar {
          display: none;
        }

        .scrollbar-hide {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        .converter-tile-horizontal {
          display: block;
          position: relative;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          transform-origin: center center;
        }

        .tile-content-horizontal {
          width: 280px;
          height: 240px;
          position: relative;
          transform-origin: center center;
          will-change: transform;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .converter-tile-horizontal:hover .tile-content-horizontal {
          transform: scale(1.15) translateY(-8px);
          box-shadow: 
            0 25px 50px rgba(0, 0, 0, 0.4),
            0 0 30px rgba(168, 162, 158, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
          border-color: rgba(168, 162, 158, 0.6);
          background: linear-gradient(135deg, #2c2925 0%, #1f1e1a 100%);
          z-index: 10;
        }

        .converter-tile-horizontal:hover .tile-icon {
          transform: scale(1.1) rotateY(5deg);
        }

        .converter-tile-horizontal:hover h3 {
          color: #f5f5f4;
          text-shadow: 0 0 15px rgba(245, 245, 244, 0.4);
        }

        .tile-content-horizontal::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, transparent 0%, rgba(168, 162, 158, 0.08) 100%);
          border-radius: inherit;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .converter-tile-horizontal:hover .tile-content-horizontal::before {
          opacity: 1;
        }

        .tile-icon {
          transition: transform 0.3s ease;
        }

        /* Fade edges for scroll indication */
        .converter-scroll-container::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 40px;
          background: linear-gradient(to right, black, transparent);
          z-index: 5;
          pointer-events: none;
        }

        .converter-scroll-container::after {
          content: '';
          position: absolute;
          right: 0;
          top: 0;
          bottom: 0;
          width: 40px;
          background: linear-gradient(to left, black, transparent);
          z-index: 5;
          pointer-events: none;
        }

        /* Mobile adjustments */
        @media (max-width: 768px) {
          .tile-content-horizontal {
            width: 240px;
            height: 200px;
          }
          
          .converter-tile-horizontal:hover .tile-content-horizontal {
            transform: scale(1.05) translateY(-4px);
          }
        }

        /* Smooth scrolling for touch devices */
        @media (hover: none) and (pointer: coarse) {
          .converter-tiles-horizontal {
            -webkit-overflow-scrolling: touch;
          }
        }
      `}</style>
    </div>
  )
}
