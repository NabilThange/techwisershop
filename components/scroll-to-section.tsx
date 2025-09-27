"use client"

import { useLenis } from '@/hooks/use-lenis'
import { Button } from '@/components/ui/button'

export function ScrollToSection() {
  const { scrollTo } = useLenis()

  const handleScrollToTop = () => {
    scrollTo(0)
  }

  const handleScrollToBottom = () => {
    scrollTo(document.body.scrollHeight)
  }

  return (
    <div className="fixed bottom-4 right-4 flex flex-col gap-2 z-50">
      <Button 
        onClick={handleScrollToTop}
        className="bg-orange-500 hover:bg-orange-600 text-white rounded-full w-12 h-12 p-0"
        aria-label="Scroll to top"
      >
        ↑
      </Button>
      <Button 
        onClick={handleScrollToBottom}
        className="bg-orange-500 hover:bg-orange-600 text-white rounded-full w-12 h-12 p-0"
        aria-label="Scroll to bottom"
      >
        ↓
      </Button>
    </div>
  )
}