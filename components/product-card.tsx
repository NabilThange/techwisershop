import Link from "next/link"
import { ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { LazyImage } from "@/components/lazy-image"
import { ProductWithCategory } from "@/types/database"

interface ProductCardProps {
  product: ProductWithCategory
  className?: string
  priority?: boolean
}

export function ProductCard({ product, className = "", priority = false }: ProductCardProps) {
  const finalPrice = product.original_price && product.original_price > product.price ? product.price : product.price

  const hasDiscount = typeof product.original_price === "number" && product.original_price > product.price
  const discountPercent = hasDiscount ? Math.round(100 - (product.price / (product.original_price as number)) * 100) : 0

  return (
    <Card
      className={`group relative rounded-2xl border border-neutral-800 bg-black/90 transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-neutral-950 hover:shadow-xl focus-within:ring-2 focus-within:ring-orange-500/60 h-full flex flex-col ${className}`}
      role="article"
      aria-labelledby={`product-${product.slug}-title`}
    >
      {/* Image Section */}
      <div className="relative overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900/70">
        <Link href={`/products/${product.slug}`} className="block outline-none focus-visible:ring-0">
          <div className="aspect-square overflow-hidden">
            <LazyImage
              src={product.main_image_url || "/placeholder.svg"}
              alt={`${product.title} - ${product.short_description || product.title}`}
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
          product.in_stock && (
            <span
              className="absolute left-3 top-3 rounded-md bg-neutral-700 px-2 py-1 text-[12px] font-medium text-white shadow-sm"
              aria-label="In stock"
            >
              In stock
            </span>
          )
        )}
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-1 p-3">
        <div className="flex-1">
          <Link href={`/products/${product.slug}`} className="block">
            <h3
              id={`product-${product.slug}-title`}
              className="text-sm font-medium leading-tight text-balance transition-colors duration-200 line-clamp-2 text-foreground md:group-hover:text-orange-400"
            >
              {product.title}
            </h3>
          </Link>
        </div>

        {/* Price and Button Section */}
        <div className="mt-2">
          <div className="flex items-center justify-between gap-2">
            <div className="flex flex-col min-w-0">
              <span
                className="text-lg font-semibold text-foreground truncate"
                aria-label={`Price: ₹${finalPrice.toLocaleString("en-IN")}`}
              >
                ₹{finalPrice.toLocaleString("en-IN")}
              </span>
              {hasDiscount && (
                <span className="text-sm text-muted-foreground line-through truncate">
                  ₹{(product.original_price as number).toLocaleString("en-IN")}
                </span>
              )}
            </div>

            <Button
              asChild
              size="sm"
              className="shrink-0 bg-orange-500 text-white hover:bg-orange-600 font-medium transition-transform duration-200 hover:-translate-y-0.5 rounded-lg focus-visible:ring-2 focus-visible:ring-orange-500/60 whitespace-nowrap text-xs min-w-[90px]"
              disabled={!product.in_stock}
            >
              <a
                href={product.affiliate_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1"
                aria-label={`Buy ${product.title}`}
              >
                {product.in_stock ? (
                  <>
                    <span className="hidden xs:inline">Buy</span>
                    <span className="xs:hidden">B</span>
                    <ExternalLink className="h-3 w-3" aria-hidden="true" />
                  </>
                ) : (
                  "Out of Stock"
                )}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}