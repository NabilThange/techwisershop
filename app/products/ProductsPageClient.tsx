"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { Filter, Grid, List, SortAsc } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ProductCard } from "@/components/product-card"
import { getCategories, getProducts } from "@/data/mock-products"

// Client-only Products page: fetches from Supabase and updates UI without navigation
export function ProductsPageClient() {
  type SortKey = "newest" | "price-low" | "price-high" | "rating"
  type ViewMode = "grid" | "list"

  const [products, setProducts] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined)
  const [sort, setSort] = useState<SortKey>("newest")
  const [view, setView] = useState<ViewMode>("grid")
  const [min, setMin] = useState<string>("")
  const [max, setMax] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(true)

  const minPrice = useMemo(() => (min.trim() === "" ? undefined : Number(min)), [min])
  const maxPrice = useMemo(() => (max.trim() === "" ? undefined : Number(max)), [max])

  // Fetch categories + initial products
  useEffect(() => {
    let cancelled = false
    async function init() {
      setLoading(true)
      const [cats, prods] = await Promise.all([
        getCategories(),
        getProducts({ sort }),
      ])
      if (!cancelled) {
        setCategories(cats || [])
        setProducts(prods || [])
        setLoading(false)
      }
    }
    init()
    return () => {
      cancelled = true
    }
  }, [])

  // Fetch when filters/sort change (debounce price)
  useEffect(() => {
    let cancelled = false
    setLoading(true)

    const handle = setTimeout(async () => {
      const prods = await getProducts({
        category: selectedCategory,
        sort,
        minPrice,
        maxPrice,
      })
      if (!cancelled) {
        setProducts(prods || [])
        setLoading(false)
      }
    }, 300)

    return () => {
      cancelled = true
      clearTimeout(handle)
    }
  }, [selectedCategory, sort, minPrice, maxPrice])

  return (
    <div>
      {/* Filters and Sort - client side only */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          <Badge
            className={`cursor-pointer font-mono text-xs font-bold ${!selectedCategory ? "bg-orange-500 text-white hover:bg-orange-500/90" : "border border-neutral-700 text-neutral-400 hover:bg-neutral-800 hover:text-white"}`}
            onClick={() => setSelectedCategory(undefined)}
          >
            ALL CATEGORIES
          </Badge>
          {categories.map((cat: any) => (
            <Badge
              key={cat.id}
              variant={selectedCategory === cat.name ? "default" : "outline"}
              className={`cursor-pointer font-mono text-xs font-bold ${selectedCategory === cat.name ? "bg-orange-500 text-white hover:bg-orange-500/90" : "border border-neutral-700 text-neutral-400 hover:bg-neutral-800 hover:text-white"}`}
              onClick={() => setSelectedCategory(cat.name)}
            >
              {String(cat.name).toUpperCase()}
            </Badge>
          ))}
        </div>

        {/* Price + Sort + View */}
        <div className="flex items-center gap-3">
          {/* Price range (no submit, debounced) */}
          <div className="flex items-center gap-2">
            <Input
              type="number"
              inputMode="numeric"
              placeholder="Min ₹"
              value={min}
              onChange={(e) => setMin(e.target.value)}
              className="w-28 bg-neutral-900 border-neutral-700 text-white placeholder:text-neutral-500 font-mono text-xs"
            />
            <Input
              type="number"
              inputMode="numeric"
              placeholder="Max ₹"
              value={max}
              onChange={(e) => setMax(e.target.value)}
              className="w-28 bg-neutral-900 border-neutral-700 text-white placeholder:text-neutral-500 font-mono text-xs"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="bg-transparent border-neutral-700 text-neutral-400 font-mono text-xs font-bold"
              onClick={() => { setMin(""); setMax("") }}
            >
              <Filter className="mr-2 h-4 w-4" />
              CLEAR
            </Button>
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="rounded-md border border-neutral-700 bg-neutral-900 px-3 py-2 text-xs text-neutral-200 font-mono"
            >
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="bg-transparent border-neutral-700 text-neutral-400 font-mono text-xs font-bold"
              onClick={() => setSort("newest")}
            >
              <SortAsc className="mr-2 h-4 w-4" />
              RESET
            </Button>
          </div>

          {/* View toggle */}
          <div className="flex rounded-md border border-neutral-700">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className={`rounded-r-none ${view === "grid" ? "text-white bg-neutral-800" : "text-neutral-400 hover:text-white hover:bg-neutral-800"}`}
              aria-pressed={view === "grid"}
              onClick={() => setView("grid")}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className={`rounded-l-none ${view === "list" ? "text-white bg-neutral-800" : "text-neutral-400 hover:text-white hover:bg-neutral-800"}`}
              aria-pressed={view === "list"}
              onClick={() => setView("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Results */}
      {loading ? (
        <ProductsGridSkeleton />
      ) : products.length === 0 ? (
        <div className="text-center text-neutral-400">No products found.</div>
      ) : view === "list" ? (
        <div className="space-y-4">
          {products.map((product: any) => (
            <ListProductItem key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product: any) => (
            <div key={product.id} className="min-w-0">
              <ProductCard key={product.id} product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function ListProductItem({ product }: { product: any }) {
  return (
    <Card className="overflow-hidden bg-neutral-900 border-neutral-700">
      <CardContent className="p-4">
        <div className="flex gap-4">
          <div className="w-28 h-28 overflow-hidden rounded bg-neutral-800 flex-shrink-0">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.title}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <Link href={`/products/${product.slug}`} className="block">
              <h3 className="text-base font-semibold text-white line-clamp-2">{product.title}</h3>
            </Link>
            <div className="mt-1 text-sm text-neutral-400 line-clamp-2">{product.shortDescription}</div>
            <div className="mt-2 flex items-center justify-between">
              <div className="text-lg font-semibold text-white">₹{Number(product.price).toLocaleString('en-IN')}</div>
              <Button
                asChild
                size="sm"
                className="bg-orange-500 text-white hover:bg-orange-600 font-medium rounded-lg"
              >
                <a href={product.amazonLink} target="_blank" rel="noopener noreferrer">
                  Buy
                </a>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function ProductsGridSkeleton() {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {[...Array(8)].map((_, i) => (
        <Card key={i} className="overflow-hidden bg-neutral-900 border-neutral-700">
          <div className="aspect-square bg-neutral-800 animate-pulse" />
          <CardContent className="p-4">
            <div className="space-y-2">
              <div className="h-4 bg-neutral-800 rounded animate-pulse" />
              <div className="h-4 bg-neutral-800 rounded w-3/4 animate-pulse" />
              <div className="h-6 bg-neutral-800 rounded w-1/2 animate-pulse" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
