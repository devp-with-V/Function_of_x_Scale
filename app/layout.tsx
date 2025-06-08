import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'F(x)-Scale',
  description: 'Created by the F(x)-Scale team',
  keywords: ['F(x)-Scale', 'Next.js', 'React'],
  authors: [{ name: 'F(x)-Scale Team', url: ' ' }],
  creator: 'F(x)-Scale Team'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
