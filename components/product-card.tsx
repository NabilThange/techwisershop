import Link from "next/link"
import { ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { LazyImage } from "@/components/lazy-image"

interface Product {
  id: string
  slug: string
  title: string
  price: number
  originalPrice?: number
  currency: string
  image: string
  images: string[]
  amazonLink: string
  flipkartLink: string
  rating: number
  reviewCount: number
  shortDescription: string
  description: string
  category: string
  brand: string
  specs: Record<string, string>
  pros: string[]
  cons: string[]
  youtubeVideoId: string
  inStock: boolean
  featured: boolean
  tags: string[]
  createdAt?: string
}

interface ProductCardProps {
  product: Product
  className?: string
  priority?: boolean
}

export function ProductCard({ product, className = "", priority = false }: ProductCardProps) {
  const finalPrice = product.originalPrice && product.originalPrice > product.price ? product.price : product.price

  const hasDiscount = typeof product.originalPrice === "number" && product.originalPrice > product.price
  const discountPercent = hasDiscount ? Math.round(100 - (product.price / (product.originalPrice as number)) * 100) : 0

  return (
    <Card
      className={`group relative h-full rounded-2xl border border-neutral-800 bg-black/90 p-3 transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-neutral-950 hover:shadow-xl focus-within:ring-2 focus-within:ring-orange-500/60 ${className}`}
      role="article"
      aria-labelledby={`product-${product.slug}-title`}
    >
      <div className="relative overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900/70">
        <Link href={`/products/${product.slug}`} className="block outline-none focus-visible:ring-0">
          <div className="aspect-square overflow-hidden">
            <LazyImage
              src={product.image || "/placeholder.svg"}
              alt={`${product.title} - ${product.shortDescription}`}
              width={400}
              height={400}
              className="h-full w-full object-cover transition-transform duration-300 ease-out motion-safe:group-hover:scale-105"
              priority={priority}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          </div>
        </Link>

        {hasDiscount ? (
          <span
            className="absolute left-3 top-3 rounded-md bg-orange-500 px-2 py-1 text-[12px] font-medium text-black shadow-sm"
            aria-label={`${discountPercent}% off`}
          >
            {discountPercent}% OFF
          </span>
        ) : (
          product.inStock && (
            <span
              className="absolute left-3 top-3 rounded-md bg-neutral-700 px-2 py-1 text-[12px] font-medium text-white shadow-sm"
              aria-label="In stock"
            >
              In stock
            </span>
          )
        )}
      </div>

      <div className="px-3 pt-3">
        <Link href={`/products/${product.slug}`} className="block">
          <h3
            id={`product-${product.slug}-title`}
            className="text-sm font-medium leading-tight text-balance transition-colors duration-200 line-clamp-2 text-foreground md:group-hover:text-orange-400"
          >
            {product.title}
          </h3>
        </Link>
      </div>

      <CardContent className="px-3 pb-3 bg-transparent">
        <div className="mt-2 flex items-center justify-between gap-3">
          <div className="flex items-baseline gap-2">
            <span
              className="text-lg font-semibold text-foreground"
              aria-label={`Price: ₹${finalPrice.toLocaleString("en-IN")}`}
            >
              ₹{finalPrice.toLocaleString("en-IN")}
            </span>
            {hasDiscount && (
              <span className="text-sm text-muted-foreground line-through">
                ₹{(product.originalPrice as number).toLocaleString("en-IN")}
              </span>
            )}
          </div>

          <Button
            asChild
            size="sm"
            className="shrink-0 bg-orange-500 text-white hover:bg-orange-600 font-medium transition-transform duration-200 hover:-translate-y-0.5 rounded-lg focus-visible:ring-2 focus-visible:ring-orange-500/60"
            disabled={!product.inStock}
          >
            <a
              href={product.amazonLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2"
              aria-label={`Buy ${product.title}`}
            >
              {product.inStock ? "Buy Now" : "Out of Stock"}
              {product.inStock && <ExternalLink className="h-4 w-4" aria-hidden="true" />}
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}