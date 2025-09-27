import Link from "next/link"
import { Filter, Grid, List, SortAsc, Search, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Input } from "@/components/ui/input"
import { ProductsPageClient } from "./ProductsPageClient"

type ProductsSearchParams = {
  category?: string
  sort?: 'newest' | 'price-low' | 'price-high' | 'rating'
  min?: string
  max?: string
  inStock?: string
  view?: 'grid' | 'list'
}

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <main className="container mx-auto px-4 pb-8">
        {/* Page Header */}
        <div className="mb-8 text-center">
          <div className="mb-6 flex items-center justify-center gap-3">
            <TrendingUp className="h-5 w-5 text-orange-500" />
            <Badge className="border border-orange-500 text-orange-500 bg-transparent hover:bg-orange-500/10 font-mono text-xs font-bold">
              TACTICAL INTEL
            </Badge>
          </div>
          <h1 className="mb-4 text-3xl font-bold text-white font-mono">ALL TACTICAL PRODUCTS</h1>
          <p className="text-neutral-400 font-mono text-sm">
            DISCOVER OUR COMPLETE COLLECTION OF REVIEWED TECH PRODUCTS
          </p>
        </div>

        <div className="mb-6">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 h-4 w-4" />
            <Input
              type="search"
              placeholder="SEARCH PRODUCTS..."
              className="pl-10 bg-neutral-900 border-neutral-700 text-white placeholder:text-neutral-500 font-mono text-sm"
            />
          </div>
        </div>

        {/* Client-only controls and results */}
        <ProductsPageClient />
      </main>

      <Footer />
    </div>
  )
}



