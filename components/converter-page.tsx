"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  FileText,
  ImageIcon,
  Braces,
  Palette,
  FileIcon as FileVector,
  Type,
  WavesIcon as WaveSine,
  ArrowRight,
} from "lucide-react"

export default function ConverterPage() {
  const [activeTab, setActiveTab] = useState("all")
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

  const converters = [
    {
      id: "ascii-art",
      title: "ASCII Art Converter",
      description: "Convert images to ASCII art using character density mapping",
      icon: <FileText className="h-6 w-6" />,
      href: "/converter/ascii-art",
      category: "text",
      status: "stable",
      features: ["Multiple character sets", "Color & grayscale modes", "Adjustable resolution"],
    },
    {
      id: "braille-art",
      title: "Braille Art Converter",
      description: "Transform images into Braille patterns for unique tactile art",
      icon: <Braces className="h-6 w-6" />,
      href: "/converter/braille-art",
      category: "text",
      status: "stable",
      features: ["Braille character mapping", "High detail preservation", "Accessibility focused"],
    },
    {
      id: "pixel-art",
      title: "Pixel Art Converter",
      description: "Convert images to pixel art with customizable resolution and palette",
      icon: <ImageIcon className="h-6 w-6" />,
      href: "/converter/pixel-art",
      category: "image",
      status: "stable",
      features: ["Variable pixel sizes", "Color palette reduction", "Dithering options"],
    },
    {
      id: "color-palette",
      title: "Color Palette Extractor",
      description: "Extract dominant colors and create harmonious palettes from images",
      icon: <Palette className="h-6 w-6" />,
      href: "/converter/color-palette",
      category: "color",
      status: "stable",
      features: ["Dominant color extraction", "Palette visualization", "Export formats"],
    },
    {
      id: "svg-trace",
      title: "SVG Trace Converter",
      description: "Convert raster images to scalable vector graphics with path tracing",
      icon: <FileVector className="h-6 w-6" />,
      href: "/converter/svg-trace",
      category: "vector",
      status: "beta",
      features: ["Vector tracing", "Path optimization", "SVG export"],
    },
    {
      id: "text-portrait",
      title: "Text Portrait Generator",
      description: "Create portraits using custom text and typography",
      icon: <Type className="h-6 w-6" />,
      href: "/converter/text-portrait",
      category: "text",
      status: "beta",
      features: ["Custom text input", "Font selection", "Text density control"],
    },
    {
      id: "fourier-transform",
      title: "Fourier Transform Analyzer",
      description: "Analyze and manipulate images in the frequency domain",
      icon: <WaveSine className="h-6 w-6" />,
      href: "/converter/fourier-transform",
      category: "math",
      status: "beta",
      features: ["FFT/DCT/Wavelet transforms", "Frequency filtering", "Mathematical analysis"],
    },
  ]

  const filteredConverters =
    activeTab === "all" ? converters : converters.filter((converter) => converter.category === activeTab)

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation Bar */}
      {/* <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-stone-800">
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
      </nav> */}

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold font-mono mb-6">
              Converter <span className="text-stone-400">Suite</span>
            </h1>
            <p className="text-xl text-stone-300 max-w-2xl mx-auto">
              Choose from our collection of image conversion tools to transform your images in unique ways
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex justify-center mb-8">
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="bg-stone-800 border border-stone-700">
                <TabsTrigger value="all" className="data-[state=active]:bg-stone-700 data-[state=active]:text-white">
                  All
                </TabsTrigger>
                <TabsTrigger value="text" className="data-[state=active]:bg-stone-700 data-[state=active]:text-white">
                  Text Art
                </TabsTrigger>
                <TabsTrigger value="image" className="data-[state=active]:bg-stone-700 data-[state=active]:text-white">
                  Pixel Art
                </TabsTrigger>
                <TabsTrigger value="color" className="data-[state=active]:bg-stone-700 data-[state=active]:text-white">
                  Color
                </TabsTrigger>
                <TabsTrigger value="vector" className="data-[state=active]:bg-stone-700 data-[state=active]:text-white">
                  Vector
                </TabsTrigger>
                <TabsTrigger value="math" className="data-[state=active]:bg-stone-700 data-[state=active]:text-white">
                  Mathematical
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Converters Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredConverters.map((converter) => {
              const isAvailable = converter.status === "stable"
              const isBeta = converter.status === "beta"

              return (
                <Card
                  key={converter.id}
                  className={`bg-stone-900 border-stone-700 transition-all duration-300 ${
                    isAvailable || isBeta
                      ? "hover:border-stone-600 hover:shadow-lg cursor-pointer"
                      : "opacity-75 cursor-not-allowed"
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-stone-400">{converter.icon}</div>
                      <div className="flex gap-2">
                        {isBeta && (
                          <Badge variant="outline" className="bg-yellow-900/30 text-yellow-500 border-yellow-500/50">
                            Beta
                          </Badge>
                        )}
                        {isAvailable && (
                          <Badge variant="outline" className="bg-green-900/30 text-green-400 border-green-700/50">
                            Available
                          </Badge>
                        )}
                      </div>
                    </div>

                    <h3 className="text-xl font-mono text-white mb-2">{converter.title}</h3>

                    <p className="text-stone-300 text-sm mb-4 leading-relaxed">{converter.description}</p>

                    <div className="space-y-2 mb-6">
                      {converter.features.map((feature, index) => (
                        <div key={index} className="flex items-center text-xs text-stone-400">
                          <span className="w-1.5 h-1.5 bg-stone-500 rounded-full mr-2"></span>
                          {feature}
                        </div>
                      ))}
                    </div>

                    {isAvailable || isBeta ? (
                      <Link href={converter.href}>
                        <Button className="w-full bg-stone-700 hover:bg-stone-600 text-white group">
                          {isBeta ? "Try Beta" : "Launch Converter"}
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    ) : (
                      <Button disabled className="w-full bg-stone-800 text-stone-500 cursor-not-allowed">
                        Coming Soon
                      </Button>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <Card className="bg-stone-900 border-stone-700 max-w-2xl mx-auto">
              <CardContent className="p-8">
                <h2 className="text-2xl font-mono text-white mb-4">Ready to Start Converting?</h2>
                <p className="text-stone-300 mb-6">
                  Explore our complete suite of conversion tools to transform your images in unique and creative ways.
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                  <Link href="/converter/ascii-art">
                    <Button className="bg-stone-700 hover:bg-stone-600 text-white px-4 py-2 font-mono">
                      ASCII Art
                    </Button>
                  </Link>
                  <Link href="/converter/pixel-art">
                    <Button className="bg-stone-700 hover:bg-stone-600 text-white px-4 py-2 font-mono">
                      Pixel Art
                    </Button>
                  </Link>
                  <Link href="/converter/text-portrait">
                    <Button className="bg-stone-700 hover:bg-stone-600 text-white px-4 py-2 font-mono">
                      Text Portrait
                    </Button>
                  </Link>
                  <Link href="/converter/braille-art">
                    <Button className="bg-stone-700 hover:bg-stone-600 text-white px-4 py-2 font-mono">
                      Braille Art
                    </Button>
                  </Link>
                  <Link href="/converter/color-palette">
                    <Button className="bg-stone-700 hover:bg-stone-600 text-white px-4 py-2 font-mono">
                      Color Palette
                    </Button>
                  </Link>
                  <Link href="/converter/svg-trace">
                    <Button className="bg-stone-700 hover:bg-stone-600 text-white px-4 py-2 font-mono">
                      SVG Trace
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
