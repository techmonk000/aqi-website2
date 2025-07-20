import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AQI Dashboard',
  description: 'Air Quality Index Monitoring Dashboard',
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
