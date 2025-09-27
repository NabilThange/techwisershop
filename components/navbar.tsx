"use client"

import type React from "react"
import { useLayoutEffect, useRef, useState, useEffect } from "react"
import { gsap } from "gsap"
import { Menu, X, ExternalLink } from "lucide-react"
import Link from "next/link"

type NavLink = {
  label: string
  href: string
  external?: boolean
}

type NavItem = {
  label: string
  bgColor: string
  textColor: string
  links: NavLink[]
}

interface NavbarProps {
  className?: string
}

const Navbar: React.FC<NavbarProps> = ({ className = "" }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const navRef = useRef<HTMLDivElement | null>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])
  const tlRef = useRef<gsap.core.Timeline | null>(null)

  const navItems: NavItem[] = [
    {
      label: "PRODUCTS",
      bgColor: "bg-neutral-900", // Dark Gray
      textColor: "text-white", // Pure White
      links: [
        { label: "ALL PRODUCTS", href: "/products" },
        { label: "CATEGORIES", href: "/categories" },
        { label: "LATEST REVIEWS", href: "/reviews" },
      ],
    },
    {
      label: "ABOUT",
      bgColor: "bg-black", // Pure Black
      textColor: "text-white", // Pure White
      links: [
        { label: "ABOUT US", href: "/about" },
        { label: "CONTACT US", href: "/contact" },
      ],
    },
    {
      label: "CONTACT",
      bgColor: "bg-neutral-700", // Medium Gray
      textColor: "text-white", // Pure White
      links: [
        { label: "YOUTUBE", href: "https://youtube.com", external: true },
        { label: "INSTAGRAM", href: "https://instagram.com", external: true },
        { label: "TWITTER", href: "https://twitter.com", external: true },
      ],
    },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setIsScrolled(scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const calculateHeight = () => {
    const navEl = navRef.current
    if (!navEl) return 280

    const isMobile = window.matchMedia("(max-width: 768px)").matches
    if (isMobile) {
      const contentEl = navEl.querySelector(".navbar-content") as HTMLElement
      if (contentEl) {
        const wasVisible = contentEl.style.visibility
        const wasPointerEvents = contentEl.style.pointerEvents
        const wasPosition = contentEl.style.position
        const wasHeight = contentEl.style.height

        contentEl.style.visibility = "visible"
        contentEl.style.pointerEvents = "auto"
        contentEl.style.position = "static"
        contentEl.style.height = "auto"

        contentEl.offsetHeight

        const topBar = isScrolled ? 56 : 64
        const padding = 16
        const contentHeight = contentEl.scrollHeight

        contentEl.style.visibility = wasVisible
        contentEl.style.pointerEvents = wasPointerEvents
        contentEl.style.position = wasPosition
        contentEl.style.height = wasHeight

        return topBar + contentHeight + padding
      }
    }
    return 280
  }

  const createTimeline = () => {
    const navEl = navRef.current
    if (!navEl) return null

    const initialHeight = isScrolled ? 56 : 64
    gsap.set(navEl, { height: initialHeight, overflow: "hidden" })
    gsap.set(cardsRef.current, { y: 50, opacity: 0 })

    const tl = gsap.timeline({ paused: true })

    tl.to(navEl, {
      height: calculateHeight,
      duration: 0.4,
      ease: "power3.out",
    })

    tl.to(
      cardsRef.current,
      {
        y: 0,
        opacity: 1,
        duration: 0.4,
        ease: "power3.out",
        stagger: 0.08,
      },
      "-=0.1",
    )

    return tl
  }

  useLayoutEffect(() => {
    const tl = createTimeline()
    tlRef.current = tl

    return () => {
      tl?.kill()
      tlRef.current = null
    }
  }, [isScrolled])

  const toggleMenu = () => {
    const tl = tlRef.current
    if (!tl) return

    if (!isExpanded) {
      setIsMenuOpen(true)
      setIsExpanded(true)
      tl.play(0)
    } else {
      setIsMenuOpen(false)
      tl.eventCallback("onReverseComplete", () => setIsExpanded(false))
      tl.reverse()
    }
  }

  const setCardRef = (i: number) => (el: HTMLDivElement | null) => {
    if (el) cardsRef.current[i] = el
  }

  const handleSubscribeClick = () => {
    window.open("https://youtube.com", "_blank")
  }

  return (
    <>
      <div className={`fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 ${className}`}>
        <nav
          ref={navRef}
          className={`navbar ${isExpanded ? "open" : ""} w-full max-w-4xl rounded shadow-lg relative overflow-hidden transition-all duration-300 bg-neutral-900 border border-neutral-700 ${
            isScrolled ? "h-14" : "h-16"
          }`}
        >
          <div
            className={`navbar-top absolute inset-x-0 top-0 flex items-center justify-between px-4 z-10 transition-all duration-300 ${
              isScrolled ? "h-14" : "h-16"
            }`}
          >
            <button
              className={`hamburger-menu ${isMenuOpen ? "open" : ""} flex flex-col items-center justify-center cursor-pointer gap-1.5 p-2 transition-all duration-300 hover:opacity-75`}
              onClick={toggleMenu}
              aria-label={isExpanded ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
            </button>

            <Link
              href="/"
              className={`logo-container font-bold font-mono tracking-wider transition-all duration-300 text-white hover:text-orange-500 ${
                isScrolled ? "text-lg" : "text-lg"
              }`}
            >
              TECHWISER
            </Link>

            <button
              onClick={handleSubscribeClick}
              className={`subscribe-button font-medium font-mono rounded transition-all duration-300 bg-orange-500 border-2 border-orange-500 text-white hover:bg-orange-500/90 hover:border-orange-500/90 ${
                isScrolled ? "px-3 py-1.5 text-xs" : "px-3 py-2 text-xs"
              }`}
            >
              SUBSCRIBE
            </button>
          </div>

          <div
            className={`navbar-content absolute left-0 right-0 bottom-0 p-6 flex flex-col gap-6 md:flex-row md:gap-6 ${
              isExpanded ? "visible pointer-events-auto" : "invisible pointer-events-none"
            }`}
            style={{ top: isScrolled ? "56px" : "64px" }}
            aria-hidden={!isExpanded}
          >
            {navItems.map((item, idx) => (
              <div
                key={`${item.label}-${idx}`}
                className={`nav-card relative flex flex-col gap-4 p-6 rounded min-h-[120px] flex-1 ${item.bgColor} ${item.textColor} border border-neutral-700`}
                ref={setCardRef(idx)}
              >
                <div className="nav-card-label font-bold text-sm tracking-wide font-mono">{item.label}</div>
                <div className="nav-card-links flex flex-col gap-2">
                  {item.links.map((link, i) =>
                    link.external ? (
                      <a
                        key={`${link.label}-${i}`}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="nav-card-link inline-flex items-center gap-2 transition-colors duration-300 text-xs text-neutral-400 hover:text-white font-mono"
                      >
                        <ExternalLink className="w-4 h-4" />
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        key={`${link.label}-${i}`}
                        href={link.href}
                        className="nav-card-link inline-flex items-center gap-2 transition-colors duration-300 text-xs text-neutral-400 hover:text-white font-mono"
                        onClick={() => {
                          setIsMenuOpen(false)
                          setIsExpanded(false)
                          tlRef.current?.reverse()
                        }}
                      >
                        <ExternalLink className="w-4 h-4" />
                        {link.label}
                      </Link>
                    ),
                  )}
                </div>
              </div>
            ))}
          </div>
        </nav>
      </div>

      <div className={`transition-all duration-300 ${isScrolled ? "h-20" : "h-24"}`} />
    </>
  )
}

export { Navbar }
