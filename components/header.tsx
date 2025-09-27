"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Youtube } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { label: "PRODUCTS", href: "/products" },
    { label: "CATEGORIES", href: "/categories" },
    { label: "REVIEWS", href: "/reviews" },
    { label: "ABOUT", href: "/about" },
    { label: "CONTACT", href: "/contact" },
  ]

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-700 bg-neutral-900/95 backdrop-blur supports-[backdrop-filter]:bg-neutral-900/60">
      <div className="container-8px">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-lg font-bold text-white font-mono">TACTICAL OPS</span>
          </Link>

          <nav className="hidden md:flex items-center gap-3">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-xs font-medium text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors px-3 py-3 rounded font-mono"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center">
            <Button
              asChild
              className="bg-orange-500 hover:bg-orange-500/90 text-white font-mono text-xs font-medium px-3 py-3 rounded transition-colors"
            >
              <a
                href="https://youtube.com/@TECHWISER"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Youtube className="h-4 w-4" />
                SUBSCRIBE
              </a>
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden border-t border-neutral-700 bg-neutral-900">
            <nav className="container-wrapper py-6 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="block px-3 py-3 text-xs font-medium text-neutral-400 hover:text-white hover:bg-neutral-800 rounded transition-colors font-mono"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              <div className="pt-6 border-t border-neutral-700">
                <Button
                  asChild
                  className="w-full bg-orange-500 hover:bg-orange-500/90 text-white font-mono text-xs font-medium"
                >
                  <a
                    href="https://youtube.com/@TECHWISER"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Youtube className="h-4 w-4" />
                    SUBSCRIBE
                  </a>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
