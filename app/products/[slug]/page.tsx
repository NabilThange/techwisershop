import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Star, ExternalLink, Share2, Heart, ShoppingCart, Check, X, Youtube, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { StructuredData, generateProductFAQ } from "@/components/structured-data"
import { getProductBySlug, getProductsByCategory } from "@/data/mock-products"
import { YouTubeEmbed } from "@/components/youtube-embed"
import type { Product } from "@/data/mock-products"

interface ProductPageProps {
  params: {
    slug: string
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductBySlug(params.slug)

  if (!product) {
    notFound()
  }

  const relatedProducts = await getProductsByCategory(product.category)
  // Create a proper Product object for the FAQ generator
  const productForFAQ: any = {
    id: product.id,
    slug: product.slug,
    title: product.title,
    price: product.price,
    originalPrice: product.originalPrice,
    currency: product.currency,
    image: product.image,
    images: product.images,
    amazonLink: product.amazonLink,
    flipkartLink: product.flipkartLink,
    rating: product.rating,
    reviewCount: product.reviewCount,
    shortDescription: product.shortDescription,
    description: product.description,
    category: product.category,
    brand: product.brand,
    specs: product.specs,
    pros: product.pros,
    cons: product.cons,
    youtubeVideoId: product.youtubeVideoId,
    inStock: product.inStock,
    featured: product.featured,
    tags: product.tags
  }
  const productFAQ = generateProductFAQ(productForFAQ as Product)

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  const breadcrumbData = [
    { name: "Home", url: "https://techwiser.shop" },
    { name: "Products", url: "https://techwiser.shop/products" },
    { name: product.category, url: `https://techwiser.shop/categories/${product.category.toLowerCase()}` },
    { name: product.title, url: `https://techwiser.shop/products/${product.slug}` },
  ]

  return (
    <div className="min-h-screen bg-black">
      <StructuredData type="product" data={product} />
      <StructuredData type="breadcrumb" data={breadcrumbData} />
      <StructuredData type="faq" data={productFAQ} />

      <Navbar />

      <main className="container mx-auto px-4 pt-32 pb-8">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center space-x-2 text-sm text-neutral-400 font-mono">
          <Link href="/" className="hover:text-orange-500 transition-colors">
            HOME
          </Link>
          <span>/</span>
          <Link href="/products" className="hover:text-orange-500 transition-colors">
            PRODUCTS
          </Link>
          <span>/</span>
          <Link
            href={`/categories/${product.category.toLowerCase()}`}
            className="hover:text-orange-500 transition-colors"
          >
            {product.category.toUpperCase()}
          </Link>
          <span>/</span>
          <span className="text-white">{product.title.toUpperCase()}</span>
        </nav>

        {/* Back Button */}
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="mb-6 text-neutral-400 hover:text-white hover:bg-neutral-800 font-mono text-xs font-bold"
        >
          <Link href="/products">
            <ArrowLeft className="mr-2 h-4 w-4" />
            BACK TO TACTICAL INTEL
          </Link>
        </Button>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg bg-neutral-900 border border-neutral-700">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.title}
                width={600}
                height={600}
                className="h-full w-full object-cover"
                priority
              />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {product.images.map((image: string, index: number) => (
                <div
                  key={index}
                  className="aspect-square overflow-hidden rounded-md bg-neutral-900 border border-neutral-700"
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.title} view ${index + 1}`}
                    width={200}
                    height={200}
                    className="h-full w-full object-cover cursor-pointer hover:opacity-80"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <Badge className="border border-orange-500 text-orange-500 bg-transparent hover:bg-orange-500/10 font-mono text-xs font-bold">
                  {product.category.toUpperCase()}
                </Badge>
                <Badge className="border border-neutral-700 text-neutral-400 bg-transparent hover:bg-neutral-800 font-mono text-xs font-bold">
                  {product.brand.toUpperCase()}
                </Badge>
                {!product.inStock && (
                  <Badge className="bg-red-500 text-white font-mono text-xs font-bold">OUT OF STOCK</Badge>
                )}
              </div>

              <h1 className="mb-4 text-3xl font-bold text-balance text-white font-mono">
                {product.title.toUpperCase()}
              </h1>

              <div className="mb-4 flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating) ? "fill-orange-500 text-orange-500" : "text-neutral-600"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm font-medium text-white font-mono">{product.rating}</span>
                </div>
                <span className="text-sm text-neutral-400 font-mono">({product.reviewCount} TACTICAL REVIEWS)</span>
              </div>

              <p className="text-neutral-400 font-mono text-sm">{product.description}</p>
            </div>

            {/* Pricing */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold text-white font-mono">
                  ₹{product.price.toLocaleString("en-IN")}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-neutral-500 line-through font-mono">
                      ₹{product.originalPrice.toLocaleString("en-IN")}
                    </span>
                    <Badge className="bg-orange-500 text-white font-mono text-xs font-bold">
                      -{discountPercentage}% OFF
                    </Badge>
                  </>
                )}
              </div>

              <p className="text-sm text-neutral-400 font-mono">
                INCLUSIVE OF ALL TAXES. FREE SHIPPING AVAILABLE IN INDIA.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <Button size="lg" className="bg-orange-500 hover:bg-orange-500/90 font-mono text-xs font-bold" asChild>
                  <a
                    href={product.amazonLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    BUY ON AMAZON
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-neutral-700 text-neutral-400 hover:bg-neutral-800 hover:text-white font-mono text-xs font-bold"
                  asChild
                >
                  <a
                    href={product.flipkartLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    BUY ON FLIPKART
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-transparent border-neutral-700 text-neutral-400 hover:bg-neutral-800 hover:text-white font-mono text-xs font-bold"
                >
                  <Heart className="mr-2 h-4 w-4" />
                  SAVE
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-transparent border-neutral-700 text-neutral-400 hover:bg-neutral-800 hover:text-white font-mono text-xs font-bold"
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  SHARE
                </Button>
              </div>
            </div>

            {/* Affiliate Disclosure */}
            <div className="rounded-lg bg-neutral-900 border border-neutral-700 p-4 text-sm text-neutral-400 font-mono">
              <p>
                <strong className="text-orange-500">AFFILIATE DISCLOSURE:</strong> WE MAY EARN A COMMISSION WHEN YOU
                PURCHASE THROUGH OUR AFFILIATE LINKS. THIS DOESN'T AFFECT OUR HONEST REVIEWS OR RECOMMENDATIONS.
              </p>
            </div>
          </div>
        </div>

        {/* Product Details Sections */}
        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {/* Specifications */}
          <Card className="bg-neutral-900 border-neutral-700">
            <CardHeader>
              <CardTitle className="text-white font-mono">TACTICAL SPECIFICATIONS</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {Object.entries(product.specs).map(([key, value]) => (
                <div key={key} className="flex justify-between">
                  <span className="text-neutral-400 font-mono text-sm">{key.toUpperCase()}</span>
                  <span className="font-medium text-white font-mono text-sm">{value as string}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Pros */}
          <Card className="bg-neutral-900 border-neutral-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-500 font-mono">
                <Check className="h-5 w-5" />
                TACTICAL ADVANTAGES
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {product.pros.map((pro: string, index: number) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 text-green-500 flex-shrink-0" />
                    <span className="text-sm text-neutral-400 font-mono">{pro}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Cons */}
          <Card className="bg-neutral-900 border-neutral-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-500 font-mono">
                <X className="h-5 w-5" />
                TACTICAL LIMITATIONS
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {product.cons.map((con: string, index: number) => (
                  <li key={index} className="flex items-start gap-2">
                    <X className="mt-0.5 h-4 w-4 text-red-500 flex-shrink-0" />
                    <span className="text-sm text-neutral-400 font-mono">{con}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Video Review */}
        <div className="mt-12">
          <Card className="bg-neutral-900 border-neutral-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white font-mono">
                <Youtube className="h-5 w-5 text-red-600" />
                TACTICAL BRIEFING VIDEO
              </CardTitle>
            </CardHeader>
            <CardContent>
              <YouTubeEmbed videoId={product.youtubeVideoId} title={`${product.title} Review`} />
            </CardContent>
          </Card>
        </div>

        <div className="mt-12">
          <Card className="bg-neutral-900 border-neutral-700">
            <CardHeader>
              <CardTitle className="text-white font-mono">MISSION BRIEFING FAQ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {productFAQ.map((faq: any, index: number) => (
                <div key={index}>
                  <h3 className="mb-2 font-semibold text-white font-mono">{faq.question}</h3>
                  <p className="text-sm text-neutral-400 font-mono">{faq.answer}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="mb-6 text-2xl font-bold text-white font-mono">RELATED TACTICAL GEAR</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProducts.slice(0, 3).map((relatedProduct: any) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}

export async function generateMetadata({ params }: ProductPageProps) {
  const product = await getProductBySlug(params.slug)

  if (!product) {
    return {
      title: "Product Not Found",
    }
  }

  return {
    title: `${product.title} Review: Is It Worth It? | TECHWISER`,
    description: `${product.description} Read our detailed review with pros, cons, specifications, and where to buy at the best price in India.`,
    keywords: `${product.title}, ${product.brand}, ${product.category}, review, specs, price, buy online, India`,
    openGraph: {
      title: `${product.title} Review | TECHWISER`,
      description: product.description,
      images: [
        {
          url: product.image,
          width: 600,
          height: 600,
          alt: product.title,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.title} Review | TECHWISER`,
      description: product.description,
      images: [product.image],
    },
    alternates: {
      canonical: `https://techwiser.shop/products/${product.slug}`,
    },
  }
}