import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Influencer Monitoring',
  description: 'Monitor and analyze influencer performance across social media platforms',
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  )
}
