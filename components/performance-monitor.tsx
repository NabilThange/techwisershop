"use client"

import { useEffect } from "react"

export function PerformanceMonitor() {
  useEffect(() => {
    // Monitor Core Web Vitals
    if (typeof window !== "undefined" && "performance" in window) {
      // Largest Contentful Paint
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === "largest-contentful-paint") {
            console.log("[v0] LCP:", entry.startTime)
          }
          if (entry.entryType === "first-input") {
            console.log("[v0] FID:", entry.processingStart - entry.startTime)
          }
          if (entry.entryType === "layout-shift") {
            if (!entry.hadRecentInput) {
              console.log("[v0] CLS:", entry.value)
            }
          }
        }
      })

      try {
        observer.observe({ entryTypes: ["largest-contentful-paint", "first-input", "layout-shift"] })
      } catch (e) {
        // Fallback for browsers that don't support all entry types
        console.log("[v0] Performance monitoring not fully supported")
      }

      return () => observer.disconnect()
    }
  }, [])

  return null
}
