import type { MetadataRoute } from "next"
import { getAllProducts, getCategories } from "@/data/mock-products"

interface SitemapProduct {
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
  createdAt: string
}

interface SitemapCategory {
  id: string
  name: string
  slug: string
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.SITE_URL || "https://techwiser.shop"

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/categories`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/reviews`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/affiliate-disclosure`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ]

  // Fetch products and categories with error handling
  let products: SitemapProduct[] = []
  let categories: SitemapCategory[] = []
  
  try {
    products = await getAllProducts()
  } catch (error) {
    console.error("Error fetching products for sitemap:", error)
  }
  
  try {
    categories = await getCategories()
  } catch (error) {
    console.error("Error fetching categories for sitemap:", error)
  }

  // Product pages
  const productPages: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  }))

  // Category pages
  const categoryPages: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${baseUrl}/categories/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }))

  return [...staticPages, ...productPages, ...categoryPages]
}