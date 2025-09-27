"use client"

import CardNav, { type CardNavItem } from "@/components/card-nav"

const cardNavItems: CardNavItem[] = [
  {
    label: "Products",
    bgColor: "hsl(var(--primary))",
    textColor: "hsl(var(--primary-foreground))",
    links: [
      { label: "All Products", href: "/products", ariaLabel: "View all products" },
      { label: "Headphones", href: "/categories/headphones", ariaLabel: "View headphones category" },
      { label: "Smartphones", href: "/categories/smartphones", ariaLabel: "View smartphones category" },
      { label: "Laptops", href: "/categories/laptops", ariaLabel: "View laptops category" },
    ],
  },
  {
    label: "Reviews",
    bgColor: "hsl(var(--accent))",
    textColor: "hsl(var(--accent-foreground))",
    links: [
      { label: "Latest Reviews", href: "/reviews", ariaLabel: "View latest reviews" },
      { label: "Video Reviews", href: "https://youtube.com/@TECHWISER", ariaLabel: "Watch video reviews on YouTube" },
      { label: "Buying Guides", href: "/categories", ariaLabel: "View buying guides" },
    ],
  },
  {
    label: "About",
    bgColor: "hsl(var(--muted))",
    textColor: "hsl(var(--muted-foreground))",
    links: [
      { label: "About Us", href: "/about", ariaLabel: "Learn about TECHWISER" },
      { label: "Contact", href: "/contact", ariaLabel: "Contact TECHWISER" },
      { label: "Affiliate Disclosure", href: "/affiliate-disclosure", ariaLabel: "View affiliate disclosure" },
    ],
  },
]

export function SharedCardNav() {
  return (
    <CardNav
      logo="/techwiser-logo.jpg"
      logoAlt="TECHWISER Logo"
      items={cardNavItems}
      baseColor="hsl(var(--background))"
      menuColor="hsl(var(--foreground))"
      buttonBgColor="hsl(var(--accent))"
      buttonTextColor="hsl(var(--accent-foreground))"
    />
  )
}
