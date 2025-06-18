"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Code, Zap, Palette, Users, Heart, Github } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function AboutPage() {
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
              About <span className="text-stone-400">F(x) scale</span>
            </h1>
            <p className="text-xl text-stone-300 max-w-2xl mx-auto">
              A powerful, browser-based ASCII art converter that transforms your images into stunning text-based
              artwork.
            </p>
          </div>

          {/* Mission Section */}
          <Card className="bg-stone-900 border-stone-700 mb-12">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <Heart className="h-8 w-8 text-stone-400 mr-4" />
                <h2 className="text-2xl font-mono text-white">Our Mission</h2>
              </div>
              <p className="text-stone-300 text-lg leading-relaxed">
                F(x) scale was created to democratize ASCII art creation. We believe that everyone should have access to
                powerful image conversion tools without the need for complex software installations or technical
                expertise. Our goal is to make ASCII art creation as simple as uploading an image and clicking a button.
              </p>
            </CardContent>
          </Card>

          {/* Technology Section */}
          <Card className="bg-stone-900 border-stone-700 mb-12">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <Code className="h-8 w-8 text-stone-400 mr-4" />
                <h2 className="text-2xl font-mono text-white">Technology</h2>
              </div>
              <div className="space-y-4 text-stone-300">
                <p className="text-lg leading-relaxed">
                  F(x) scale is built using modern web technologies to ensure fast, reliable performance:
                </p>
                <ul className="space-y-2 ml-6">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-stone-400 rounded-full mr-3"></span>
                    <strong>Canvas API:</strong> For precise image processing and pixel manipulation
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-stone-400 rounded-full mr-3"></span>
                    <strong>Client-side Processing:</strong> Your images never leave your browser
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-stone-400 rounded-full mr-3"></span>
                    <strong>Real-time Preview:</strong> See changes instantly as you adjust settings
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-stone-400 rounded-full mr-3"></span>
                    <strong>Responsive Design:</strong> Works seamlessly on desktop and mobile devices
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="bg-stone-900 border-stone-700">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Zap className="h-6 w-6 text-stone-400 mr-3" />
                  <h3 className="text-xl font-mono text-white">Performance</h3>
                </div>
                <p className="text-stone-300">
                  Optimized algorithms ensure fast conversion times even for high-resolution images. All processing
                  happens locally in your browser for maximum speed and privacy.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-stone-900 border-stone-700">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Palette className="h-6 w-6 text-stone-400 mr-3" />
                  <h3 className="text-xl font-mono text-white">Customization</h3>
                </div>
                <p className="text-stone-300">
                  Fine-tune your ASCII art with adjustable resolution, multiple character sets, color modes, and
                  inversion options to achieve the perfect result.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Privacy Section */}
          <Card className="bg-stone-900 border-stone-700 mb-12">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <Users className="h-8 w-8 text-stone-400 mr-4" />
                <h2 className="text-2xl font-mono text-white">Privacy & Security</h2>
              </div>
              <div className="space-y-4 text-stone-300">
                <p className="text-lg leading-relaxed">
                  Your privacy is our priority. F(x) scale processes all images locally in your browser:
                </p>
                <ul className="space-y-2 ml-6">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                    No images are uploaded to our servers
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                    No user data is collected or stored
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                    No registration or login required
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                    Works completely offline after initial load
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Open Source */}
          <Card className="bg-stone-900 border-stone-700">
            <CardContent className="p-8 text-center">
              <Github className="h-12 w-12 text-stone-400 mx-auto mb-4" />
              <h2 className="text-2xl font-mono text-white mb-4">Open Source</h2>
              <p className="text-stone-300 text-lg mb-6">
                F(x) scale is built with transparency in mind. We believe in open-source software and the power of
                community-driven development.
              </p>
              <p className="text-stone-400 text-sm">
                Interested in contributing? Check out our documentation for development guidelines.
              </p>
            </CardContent>
          </Card>
            {/* Google Form Button */}
          <div className="flex justify-center mt-8">
            <a
              href="https://forms.gle/yPcVwdPg8AqGL4ik9"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-black-600 hover:bg-stone-700 text-white font-mono font-semibold rounded-lg shadow transition-all duration-300"
            >
              Fill Out Our Feedback Form
            </a>
          </div>

        </div>
      </div>
    </div>
  )
}
