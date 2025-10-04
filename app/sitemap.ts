import type { MetadataRoute } from "next"
import { getAllProducts, getCategories } from "@/data/mock-products"
import { getProducts } from "@/lib/supabase-client"
import { ProductWithCategory, Category } from "@/types/database"

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
  let products: ProductWithCategory[] = []
  let categories: Category[] = []
  
  try {
    const { data: productsData, error: productsError } = await getProducts({ is_published: true })
    if (!productsError && productsData) {
      products = productsData
    }
  } catch (error) {
    console.error("Error fetching products for sitemap:", error)
  }
  
  try {
    const { data: categoriesData, error: categoriesError } = await getCategories()
    if (!categoriesError && categoriesData) {
      categories = categoriesData
    }
  } catch (error) {
    console.error("Error fetching categories for sitemap:", error)
  }

  // Product pages
  const productPages: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: new Date(product.updated_at),
    changeFrequency: "weekly",
    priority: product.featured ? 0.95 : 0.85,
  }))

  // Category pages
  const categoryPages: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${baseUrl}/categories/${category.slug}`,
    lastModified: new Date(category.updated_at),
    changeFrequency: "weekly",
    priority: 0.7,
  }))

  return [...staticPages, ...productPages, ...categoryPages]
}