"use client"

import { Suspense, useEffect, useState } from "react"
import { notFound, useRouter, useSearchParams } from "next/navigation"
import { Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { SearchBar } from "@/components/search-bar"
import { searchProducts, getCategories } from '@/lib/supabase-client'
import { ProductWithCategory, Category } from '@/types/database'

interface SearchPageProps {
  searchParams: {
    q?: string
    category?: string
    sort?: string
  }
}

export function SearchPageClient() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const category = searchParams.get("category")
  const sort = searchParams.get("sort") || "relevance"
  
  const [filteredProducts, setFilteredProducts] = useState<ProductWithCategory[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!query) {
      notFound()
    }
    
    const fetchSearchResults = async () => {
      setLoading(true)
      
      try {
        // Get category ID if category filter is set
        let categoryId: string | undefined
        if (category) {
          const { data: categoriesData } = await getCategories()
          const categoryMatch = (categoriesData || []).find(
            (cat) => cat.slug === category || cat.name.toLowerCase() === category.toLowerCase()
          )
          categoryId = categoryMatch?.id
        }
        
        // Search products
        const { data: searchData, error: searchError } = await searchProducts(query, {
          category_id: categoryId
        })
        
        if (searchError) {
          console.error('Error fetching search results:', searchError)
          setFilteredProducts([])
        } else {
          setFilteredProducts(searchData || [])
        }
        
        // Fetch categories if not already loaded
        if (categories.length === 0) {
          const { data: categoriesData, error: categoriesError } = await getCategories()
          if (!categoriesError) {
            setCategories(categoriesData || [])
          }
        }
      } catch (error) {
        console.error('Error in search:', error)
        setFilteredProducts([])
      }
      
      setLoading(false)
    }
    
    fetchSearchResults()
  }, [query, category, categories.length])

  // Apply sorting
  useEffect(() => {
    if (filteredProducts.length > 0) {
      const sortedProducts = [...filteredProducts]
      
      switch (sort) {
        case "price-low":
          sortedProducts.sort((a, b) => a.price - b.price)
          break
        case "price-high":
          sortedProducts.sort((a, b) => b.price - a.price)
          break
        case "rating":
          sortedProducts.sort((a, b) => b.rating - a.rating)
          break
        case "newest":
          sortedProducts.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
          break
        default:
          // Relevance - keep original order from search
          break
      }
      
      setFilteredProducts(sortedProducts)
    }
  }, [sort])

  if (!query) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <div className="mb-4 flex items-center gap-2">
            <Search className="h-5 w-5 text-muted-foreground" />
            <h1 className="text-2xl font-bold">Search Results for "{query}"</h1>
          </div>
          <p className="text-muted-foreground">
            Found {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <SearchBar className="max-w-md" />
        </div>

        {/* Filters and Sort */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            <Badge
              variant={!category ? "default" : "outline"}
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
              onClick={() => {
                const params = new URLSearchParams(searchParams)
                params.delete("category")
                router.push(`/search?${params.toString()}`)
              }}
            >
              All Categories
            </Badge>
            {categories.map((cat) => (
              <Badge
                key={cat.id}
                variant={category === cat.slug || category === cat.name.toLowerCase() ? "default" : "outline"}
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                onClick={() => {
                  const params = new URLSearchParams(searchParams)
                  params.set("category", cat.slug)
                  router.push(`/search?${params.toString()}`)
                }}
              >
                {cat.name}
              </Badge>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <select
              value={sort}
              onChange={(e) => {
                const params = new URLSearchParams(searchParams)
                params.set("sort", e.target.value)
                router.push(`/search?${params.toString()}`)
              }}
              className="rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="relevance">Relevance</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest</option>
            </select>
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <SearchResultsSkeleton />
        ) : filteredProducts.length > 0 ? (
          <Suspense fallback={<SearchResultsSkeleton />}>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </Suspense>
        ) : (
          <div className="text-center py-12">
            <Search className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
            <h2 className="mb-2 text-xl font-semibold">No products found</h2>
            <p className="mb-6 text-muted-foreground">Try adjusting your search terms or browse our categories</p>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button variant="outline" asChild>
                <a href="/products">Browse All Products</a>
              </Button>
              <Button variant="outline" asChild>
                <a href="/categories">View Categories</a>
              </Button>
            </div>
          </div>
        )}

        {/* Search Suggestions */}
        {filteredProducts.length === 0 && !loading && (
          <div className="mt-12">
            <h3 className="mb-4 text-lg font-semibold">Popular Searches</h3>
            <div className="flex flex-wrap gap-2">
              {["iPhone", "MacBook", "Sony headphones", "Samsung watch", "Gaming mouse", "4K monitor"].map(
                (suggestion) => (
                  <Badge
                    key={suggestion}
                    variant="outline"
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                    onClick={() => {
                      const params = new URLSearchParams(searchParams)
                      params.set("q", suggestion)
                      router.push(`/search?${params.toString()}`)
                    }}
                  >
                    {suggestion}
                  </Badge>
                ),
              )}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}

function SearchResultsSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {[...Array(8)].map((_, i) => (
        <Card key={i} className="overflow-hidden">
          <div className="aspect-square bg-muted animate-pulse" />
          <CardContent className="p-4">
            <div className="space-y-2">
              <div className="h-4 bg-muted rounded animate-pulse" />
              <div className="h-4 bg-muted rounded w-3/4 animate-pulse" />
              <div className="h-6 bg-muted rounded w-1/2 animate-pulse" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}