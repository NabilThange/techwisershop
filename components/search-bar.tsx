"use client"

import { useState, useEffect, useRef } from "react"
import { Search, X, TrendingUp } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import { searchProducts } from '@/lib/supabase-client'
import { ProductWithCategory } from '@/types/database'

interface SearchBarProps {
  className?: string
  placeholder?: string
}

export function SearchBar({ className = "", placeholder = "Search products..." }: SearchBarProps) {
  const [query, setQuery] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const [filteredProducts, setFilteredProducts] = useState<ProductWithCategory[]>([])
  const [loading, setLoading] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const saved = localStorage.getItem("recentSearches")
    if (saved) {
      setRecentSearches(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    if (query.length > 2) {
      const fetchSearchResults = async () => {
        setLoading(true)
        try {
          const { data, error } = await searchProducts(query)
          
          if (error) {
            console.error('Error fetching search results:', error)
            setFilteredProducts([])
          } else {
            // Limit to 6 results for dropdown
            setFilteredProducts((data || []).slice(0, 6))
          }
        } catch (error) {
          console.error('Search error:', error)
          setFilteredProducts([])
        }
        setLoading(false)
      }

      const delayDebounceFn = setTimeout(() => {
        fetchSearchResults()
      }, 300)

      return () => clearTimeout(delayDebounceFn)
    } else {
      setFilteredProducts([])
    }
  }, [query])

  const handleSearch = (searchQuery: string) => {
    if (searchQuery.trim()) {
      const newRecentSearches = [searchQuery, ...recentSearches.filter((s) => s !== searchQuery)].slice(0, 5)
      setRecentSearches(newRecentSearches)
      localStorage.setItem("recentSearches", JSON.stringify(newRecentSearches))
      // Navigate to search results page
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`
    }
  }

  const clearSearch = () => {
    setQuery("")
    setIsOpen(false)
  }

  const trendingSearches = ["iPhone 15", "Sony headphones", "MacBook Air", "Samsung watch", "Gaming mouse"]

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder={placeholder}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setIsOpen(true)
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch(query)
            }
          }}
          className="pl-10 pr-10"
        />
        {query && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-1 top-1/2 h-6 w-6 -translate-y-1/2 p-0"
            onClick={clearSearch}
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>

      {isOpen && (
        <Card className="absolute top-full left-0 right-0 z-50 mt-1 max-h-96 overflow-y-auto">
          <CardContent className="p-0">
            {/* Search Results */}
            {filteredProducts.length > 0 && (
              <div className="border-b p-2">
                <div className="mb-2 px-2 text-xs font-medium text-muted-foreground">Products</div>
                {filteredProducts.map((product) => (
                  <Link
                    key={product.id}
                    href={`/products/${product.slug}`}
                    className="flex items-center gap-3 rounded-md p-2 hover:bg-muted"
                    onClick={() => {
                      handleSearch(product.title)
                      setIsOpen(false)
                    }}
                  >
                    <div className="h-10 w-10 overflow-hidden rounded bg-muted flex-shrink-0">
                      <Image
                        src={product.main_image_url || "/placeholder.svg"}
                        alt={product.title}
                        width={40}
                        height={40}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{product.title}</p>
                      <div className="flex items-center gap-2">
                        {product.category && (
                          <Badge variant="outline" className="text-xs">
                            {product.category.name}
                          </Badge>
                        )}
                        <span className="text-xs text-muted-foreground">₹{product.price.toLocaleString("en-IN")}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* Recent Searches */}
            {query.length === 0 && recentSearches.length > 0 && (
              <div className="border-b p-2">
                <div className="mb-2 px-2 text-xs font-medium text-muted-foreground">Recent Searches</div>
                {recentSearches.map((search, index) => (
                  <button
                    key={index}
                    className="flex w-full items-center gap-2 rounded-md p-2 text-left hover:bg-muted"
                    onClick={() => {
                      setQuery(search)
                      handleSearch(search)
                    }}
                  >
                    <Search className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{search}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Trending Searches */}
            {query.length === 0 && (
              <div className="p-2">
                <div className="mb-2 flex items-center gap-1 px-2">
                  <TrendingUp className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs font-medium text-muted-foreground">Trending</span>
                </div>
                {trendingSearches.map((search, index) => (
                  <button
                    key={index}
                    className="flex w-full items-center gap-2 rounded-md p-2 text-left hover:bg-muted"
                    onClick={() => {
                      setQuery(search)
                      handleSearch(search)
                    }}
                  >
                    <TrendingUp className="h-4 w-4 text-primary" />
                    <span className="text-sm">{search}</span>
                  </button>
                ))}
              </div>
            )}

            {/* No Results */}
            {query.length > 2 && filteredProducts.length === 0 && !loading && (
              <div className="p-4 text-center">
                <p className="text-sm text-muted-foreground">No products found for "{query}"</p>
                <Button variant="outline" size="sm" className="mt-2 bg-transparent" onClick={() => handleSearch(query)}>
                  Search anyway
                </Button>
              </div>
            )}
            
            {/* Loading */}
            {loading && (
              <div className="p-4 text-center">
                <p className="text-sm text-muted-foreground">Searching...</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}