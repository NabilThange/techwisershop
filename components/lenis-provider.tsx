"use client"

import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

// Create a global Lenis instance
let globalLenis: Lenis | null = null
// Keep track of how many components are using Lenis
let lenisRefCount = 0

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // Increment reference count
    lenisRefCount++
    
    // Check if device is mobile/touch device
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    
    // Initialize Lenis with subtle smooth scrolling only if not already initialized
    if (!globalLenis) {
      if (isTouchDevice) {
        // On mobile: Use native scrolling for better performance
        globalLenis = new Lenis({
          autoRaf: true,
          lerp: 0.1,
          wheelMultiplier: 1,
          touchMultiplier: 2, // Increased for easier mobile scrolling
          syncTouch: false, // Disable smooth scrolling on touch - use native
          touchInertiaMultiplier: 35, // More natural mobile inertia
          gestureOrientation: 'vertical',
          orientation: 'vertical',
          infinite: false,
        })
      } else {
        // On desktop: Smooth scrolling experience
        globalLenis = new Lenis({
          autoRaf: true,
          lerp: 0.08, // Subtle smoothness
          wheelMultiplier: 0.9, // Slightly slower scroll speed
          touchMultiplier: 0.9,
          syncTouch: true,
          syncTouchLerp: 0.075,
          touchInertiaMultiplier: 35,
          gestureOrientation: 'vertical',
          orientation: 'vertical',
        })
      }
    }

    lenisRef.current = globalLenis

    // Cleanup function - only destroy if this is the last instance
    return () => {
      lenisRefCount--
      // Only destroy if no other components are using it
      if (lenisRefCount <= 0 && globalLenis) {
        globalLenis.destroy()
        globalLenis = null
      }
    }
  }, [])

  return <>{children}</>
}

// Export a function to get the global Lenis instance
export function getGlobalLenis() {
  return globalLenis
}