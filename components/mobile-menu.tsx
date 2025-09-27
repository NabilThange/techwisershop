"use client"

import { useState } from "react"
import { Menu, X, Home, Package, Info, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Link from "next/link"

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)

  const menuItems = [
    { href: "/", label: "HOME", icon: Home },
    { href: "/products", label: "PRODUCTS", icon: Package },
    { href: "/categories", label: "CATEGORIES", icon: Package },
    { href: "/about", label: "ABOUT", icon: Info },
    { href: "/contact", label: "CONTACT", icon: MessageCircle },
  ]

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-neutral-400 hover:text-white hover:bg-neutral-800"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80 p-0 bg-neutral-900 border-neutral-700">
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between p-6 border-b border-neutral-700">
            <Link href="/" className="text-lg font-bold font-mono text-white" onClick={() => setIsOpen(false)}>
              TACTICAL OPS
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-neutral-400 hover:text-white hover:bg-neutral-800"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <nav className="flex-1 p-6">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="flex items-center gap-3 rounded px-3 py-3 text-xs font-medium font-mono transition-colors text-neutral-400 hover:bg-neutral-800 hover:text-white"
                      onClick={() => setIsOpen(false)}
                    >
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="border-t border-neutral-700 p-6">
            <p className="text-xs text-neutral-400 font-mono">FOLLOW US FOR TACTICAL TECH INTELLIGENCE</p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
