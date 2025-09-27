import Link from "next/link"
import { Youtube, Instagram, Facebook, Twitter, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
  return (
    <footer className="border-t border-neutral-700 bg-neutral-900">
      <div className="container-8px container-wrapper">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-6 sm:col-span-2 lg:col-span-1">
            <div className="text-lg font-bold text-white font-mono">TACTICAL OPS</div>
            <p className="text-xs text-neutral-400 text-pretty font-mono">
              MISSION-CRITICAL TECH INTELLIGENCE. HONEST REVIEWS. TACTICAL RECOMMENDATIONS. OPERATIONAL EXCELLENCE.
            </p>

            <div className="flex space-x-2">
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="touch-target text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
              >
                <a
                  href="https://youtube.com/@TECHWISER"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube Channel"
                >
                  <Youtube className="h-4 w-4" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="touch-target text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
              >
                <a
                  href="https://instagram.com/TECHWISER"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <Instagram className="h-4 w-4" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="touch-target text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
              >
                <a
                  href="https://facebook.com/TECHWISER"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                >
                  <Facebook className="h-4 w-4" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="touch-target text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
              >
                <a href="https://twitter.com/TECHWISER" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  <Twitter className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-sm font-bold text-white font-mono">QUICK LINKS</h3>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <Link href="/products" className="text-neutral-400 hover:text-white transition-colors">
                  ALL PRODUCTS
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-neutral-400 hover:text-white transition-colors">
                  CATEGORIES
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="text-neutral-400 hover:text-white transition-colors">
                  LATEST REVIEWS
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-neutral-400 hover:text-white transition-colors">
                  ABOUT US
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="text-sm font-bold text-white font-mono">CATEGORIES</h3>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <Link href="/categories/audio" className="text-neutral-400 hover:text-white transition-colors">
                  AUDIO
                </Link>
              </li>
              <li>
                <Link href="/categories/mobile" className="text-neutral-400 hover:text-white transition-colors">
                  MOBILE
                </Link>
              </li>
              <li>
                <Link href="/categories/laptop" className="text-neutral-400 hover:text-white transition-colors">
                  LAPTOPS
                </Link>
              </li>
              <li>
                <Link href="/categories/accessories" className="text-neutral-400 hover:text-white transition-colors">
                  ACCESSORIES
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="text-sm font-bold text-white font-mono">INTEL UPDATES</h3>
            <p className="text-xs text-neutral-400 text-pretty font-mono">
              RECEIVE CLASSIFIED PRODUCT INTEL AND TACTICAL TECH BRIEFINGS.
            </p>

            <div className="flex flex-col gap-2">
              <Input
                type="email"
                placeholder="ENTER EMAIL ADDRESS"
                className="flex-1 bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-500 font-mono text-xs"
              />
              <Button
                size="sm"
                className="touch-target bg-orange-500 hover:bg-orange-500/90 text-white font-mono text-xs font-medium"
              >
                <Mail className="h-4 w-4 mr-2" />
                SUBSCRIBE
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-6 border-t border-neutral-700 pt-6">
          <div className="flex flex-col items-center justify-between space-y-4 lg:flex-row lg:space-y-0">
            <div className="flex flex-wrap justify-center gap-4 lg:gap-6 text-xs text-neutral-400 font-mono">
              <Link href="/privacy" className="hover:text-white transition-colors">
                PRIVACY POLICY
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                TERMS OF SERVICE
              </Link>
              <Link href="/affiliate-disclosure" className="hover:text-white transition-colors">
                AFFILIATE DISCLOSURE
              </Link>
              <Link href="/contact" className="hover:text-white transition-colors">
                CONTACT
              </Link>
            </div>
            <p className="text-xs text-neutral-400 font-mono">© 2025 TACTICAL OPS. ALL RIGHTS RESERVED.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
