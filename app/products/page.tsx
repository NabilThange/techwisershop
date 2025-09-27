import { Suspense } from "react"
import { Filter, Grid, List, SortAsc, Search, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { getAllProducts, getCategories } from "@/data/mock-products"
import { Input } from "@/components/ui/input"

export default async function ProductsPage() {
  const products = await getAllProducts()
  const categories = await getCategories()

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

        {/* Filters and Sort */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            <Badge className="cursor-pointer bg-orange-500 text-white hover:bg-orange-500/90 font-mono text-xs font-bold">
              ALL CATEGORIES
            </Badge>
            {categories.map((category: any) => (
              <Badge
                key={category.id}
                variant="outline"
                className="cursor-pointer border-neutral-700 text-neutral-400 hover:bg-neutral-800 hover:text-white font-mono text-xs font-bold"
              >
                {category.name.toUpperCase()}
              </Badge>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="bg-transparent border-neutral-700 text-neutral-400 hover:bg-neutral-800 hover:text-white font-mono text-xs font-bold"
            >
              <Filter className="mr-2 h-4 w-4" />
              FILTER
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-transparent border-neutral-700 text-neutral-400 hover:bg-neutral-800 hover:text-white font-mono text-xs font-bold"
            >
              <SortAsc className="mr-2 h-4 w-4" />
              SORT
            </Button>
            <div className="flex rounded-md border border-neutral-700">
              <Button
                variant="ghost"
                size="sm"
                className="rounded-r-none text-neutral-400 hover:text-white hover:bg-neutral-800"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="rounded-l-none text-neutral-400 hover:text-white hover:bg-neutral-800"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <Suspense fallback={<ProductsGridSkeleton />}>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product: any) => (
              <div key={product.id} className="min-w-0">
                <ProductCard key={product.id} product={product} />
              </div>
            ))}
          </div>
        </Suspense>

        {/* Load More */}
        <div className="mt-12 text-center">
          <Button
            variant="outline"
            size="lg"
            className="bg-transparent border-neutral-700 text-neutral-400 hover:bg-neutral-800 hover:text-white font-mono text-xs font-bold"
          >
            LOAD MORE TACTICAL GEAR
          </Button>
        </div>
      </main>

      <Footer />
    </div>
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