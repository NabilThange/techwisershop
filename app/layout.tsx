import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css"
import { Suspense } from "react"
import { StructuredData } from "@/components/structured-data"
import { ThemeProvider } from "@/components/theme-provider"
import { ScrollToTop } from "@/components/scroll-to-top"

export const metadata: Metadata = {
  title: {
    default: "TECHWISER - Tech Product Reviews & Recommendations",
    template: "%s | TECHWISER",
  },
  description:
    "Discover the best tech products with honest reviews from TECHWISER. Find detailed specs, pros & cons, and buy through trusted affiliate links. Available in India.",
  keywords: [
    "tech reviews",
    "product recommendations",
    "gadgets",
    "electronics",
    "TECHWISER",
    "affiliate",
    "India",
    "buying guide",
    "honest reviews",
    "unbiased reviews",
  ],
  authors: [{ name: "TECHWISER", url: "https://techwiser.shop" }],
  creator: "TECHWISER",
  publisher: "TECHWISER",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://techwiser.shop",
    siteName: "TECHWISER",
    title: "TECHWISER - Tech Product Reviews & Recommendations",
    description:
      "Discover the best tech products with honest reviews from TECHWISER. Available in India with detailed buying guides.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "TECHWISER - Tech Product Reviews",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@TECHWISER",
    creator: "@TECHWISER",
    title: "TECHWISER - Tech Product Reviews & Recommendations",
    description: "Discover the best tech products with honest reviews from TECHWISER.",
    images: ["/og-image.jpg"],
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
  alternates: {
    canonical: "https://techwiser.shop",
  },
  category: "technology",
  themeColor: "#000000",
  viewport: "width=device-width, initial-scale=1, viewport-fit=cover",
  other: {
    "preconnect-fonts": "https://fonts.googleapis.com",
    "preconnect-gstatic": "https://fonts.gstatic.com",
    "preconnect-youtube": "https://www.youtube.com",
    "preconnect-ytimg": "https://i.ytimg.com",
  },
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body 
        className={`font-mono`}
        style={{ 
          // @ts-ignore
          "--font-geist-sans": GeistSans.style.fontFamily,
          // @ts-ignore
          "--font-geist-mono": GeistMono.style.fontFamily,
        } as React.CSSProperties}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <StructuredData type="organization" data={{}} />
          <StructuredData type="website" data={{}} />
          <ScrollToTop />
          <Suspense>
            {children}
            <Analytics />
            <SpeedInsights />
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  )
}