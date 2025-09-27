import { useEffect, useRef } from 'react'
import { getGlobalLenis } from '@/components/lenis-provider'

export function useLenis() {
  const lenisRef = useRef<ReturnType<typeof getGlobalLenis> | null>(null)

  useEffect(() => {
    // Get the global Lenis instance
    const globalLenis = getGlobalLenis()
    
    if (globalLenis) {
      lenisRef.current = globalLenis
    }
  }, [])

  const scrollTo = (target: number | string | HTMLElement, options?: any) => {
    const globalLenis = getGlobalLenis()
    
    if (globalLenis) {
      globalLenis.scrollTo(target, {
        offset: -80, // Adjust for fixed headers if needed
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing
        ...options,
      })
    }
  }

  return { lenis: lenisRef.current, scrollTo }
}