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
    
    // Initialize Lenis with subtle smooth scrolling only if not already initialized
    if (!globalLenis) {
      globalLenis = new Lenis({
        autoRaf: true,
        lerp: 0.08, // Subtle smoothness (default is 0.1)
        wheelMultiplier: 0.9, // Slightly slower scroll speed
        touchMultiplier: 0.9,
        syncTouch: true, // Better mobile experience
        syncTouchLerp: 0.075,
        touchInertiaExponent: 1.5,
        gestureOrientation: 'vertical',
        orientation: 'vertical',
      })
    }

    lenisRef.current = globalLenis

    // Optional: Log scroll events (remove in production)
    // globalLenis.on('scroll', (e) => {
    //   console.log('Scrolling:', e.scroll)
    // })

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