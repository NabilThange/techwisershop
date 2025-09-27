import { supabase } from '@/lib/supabase-client'

export interface Product {
  id: string
  slug: string
  title: string
  price: number
  original_price?: number
  currency: string
  main_image_url: string
  images: string[]
  // These would be separate tables in Supabase but we'll keep them for compatibility
  amazon_link: string
  flipkart_link: string
  rating: number
  review_count: number
  short_description: string
  description: string
  category: string
  brand: string
  specs: Record<string, string>
  pros: string[]
  cons: string[]
  youtube_video_id: string
  in_stock: boolean
  featured: boolean
  tags: string[]
  created_at: string
}

// Updated function to fetch products from Supabase
export async function getFeaturedProducts() {
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      categories (name),
      brands (name),
      product_images (image_url),
      product_specs (spec_key, spec_value),
      product_pros_cons (content, type)
    `)
    .eq('featured', true)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching featured products:', error)
    return []
  }

  // Transform the data to match the expected format
  return data.map((product: any) => ({
    id: product.id,
    slug: product.slug,
    title: product.title,
    price: product.price,
    originalPrice: product.original_price,
    currency: product.currency,
    image: product.main_image_url,
    images: product.product_images?.map((img: any) => img.image_url) || [product.main_image_url],
    amazonLink: product.amazon_link,
    flipkartLink: product.flipkart_link,
    rating: product.rating,
    reviewCount: product.review_count,
    shortDescription: product.short_description,
    description: product.description,
    category: product.categories?.name || product.category,
    brand: product.brands?.name || product.brand,
    specs: product.product_specs?.reduce((acc: any, spec: any) => {
      acc[spec.spec_key] = spec.spec_value
      return acc
    }, {}) || {},
    pros: product.product_pros_cons
      ?.filter((item: any) => item.type === 'pro')
      .map((item: any) => item.content) || [],
    cons: product.product_pros_cons
      ?.filter((item: any) => item.type === 'con')
      .map((item: any) => item.content) || [],
    youtubeVideoId: product.youtube_video_id,
    inStock: product.in_stock,
    featured: product.featured,
    tags: product.tags || [],
    createdAt: product.created_at
  }))
}

// New function to fetch the latest featured product for the Hero section
export async function getFeaturedProduct() {
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      categories (name),
      brands (name)
    `)
    .eq('featured', true)
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  if (error) {
    console.error('Error fetching featured product:', error)
    return null
  }

  // Transform the data to match the expected format
  return {
    id: data.id,
    slug: data.slug,
    title: data.title,
    price: data.price,
    originalPrice: data.original_price,
    currency: data.currency,
    image: data.main_image_url,
    images: [data.main_image_url],
    amazonLink: data.amazon_link,
    flipkartLink: data.flipkart_link,
    rating: data.rating,
    reviewCount: data.review_count,
    shortDescription: data.short_description,
    description: data.description,
    category: data.categories?.name || data.category,
    brand: data.brands?.name || data.brand,
    specs: {},
    pros: [],
    cons: [],
    youtubeVideoId: data.youtube_video_id,
    inStock: data.in_stock,
    featured: data.featured,
    tags: data.tags || [],
    createdAt: data.created_at
  }
}

// Updated function to fetch a single product by slug
export async function getProductBySlug(slug: string) {
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      categories (name),
      brands (name),
      product_images (image_url),
      product_specs (spec_key, spec_value),
      product_pros_cons (content, type)
    `)
    .eq('slug', slug)
    .single()

  if (error) {
    console.error('Error fetching product by slug:', error)
    return null
  }

  // Transform the data to match the expected format
  return {
    id: data.id,
    slug: data.slug,
    title: data.title,
    price: data.price,
    originalPrice: data.original_price,
    currency: data.currency,
    image: data.main_image_url,
    images: data.product_images?.map((img: any) => img.image_url) || [data.main_image_url],
    amazonLink: data.amazon_link,
    flipkartLink: data.flipkart_link,
    rating: data.rating,
    reviewCount: data.review_count,
    shortDescription: data.short_description,
    description: data.description,
    category: data.categories?.name || data.category,
    brand: data.brands?.name || data.brand,
    specs: data.product_specs?.reduce((acc: any, spec: any) => {
      acc[spec.spec_key] = spec.spec_value
      return acc
    }, {}) || {},
    pros: data.product_pros_cons
      ?.filter((item: any) => item.type === 'pro')
      .map((item: any) => item.content) || [],
    cons: data.product_pros_cons
      ?.filter((item: any) => item.type === 'con')
      .map((item: any) => item.content) || [],
    youtubeVideoId: data.youtube_video_id,
    inStock: data.in_stock,
    featured: data.featured,
    tags: data.tags || [],
    createdAt: data.created_at
  }
}

// Updated function to fetch products by category
export async function getProductsByCategory(category: string) {
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      categories (name),
      brands (name),
      product_images (image_url)
    `)
    .eq('categories.name', category)

  if (error) {
    console.error('Error fetching products by category:', error)
    return []
  }

  // Transform the data to match the expected format
  return data.map((product: any) => ({
    id: product.id,
    slug: product.slug,
    title: product.title,
    price: product.price,
    originalPrice: product.original_price,
    currency: product.currency,
    image: product.main_image_url,
    images: product.product_images?.map((img: any) => img.image_url) || [product.main_image_url],
    amazonLink: product.amazon_link,
    flipkartLink: product.flipkart_link,
    rating: product.rating,
    reviewCount: product.review_count,
    shortDescription: product.short_description,
    description: product.description,
    category: product.categories?.name || product.category,
    brand: product.brands?.name || product.brand,
    specs: {},
    pros: [],
    cons: [],
    youtubeVideoId: product.youtube_video_id,
    inStock: product.in_stock,
    featured: product.featured,
    tags: product.tags || [],
    createdAt: product.created_at
  }))
}

// Updated function to fetch all products
export async function getAllProducts() {
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      categories (name),
      brands (name),
      product_images (image_url)
    `)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching all products:', error)
    return []
  }

  // Transform the data to match the expected format
  return data.map((product: any) => ({
    id: product.id,
    slug: product.slug,
    title: product.title,
    price: product.price,
    originalPrice: product.original_price,
    currency: product.currency,
    image: product.main_image_url,
    images: product.product_images?.map((img: any) => img.image_url) || [product.main_image_url],
    amazonLink: product.amazon_link,
    flipkartLink: product.flipkart_link,
    rating: product.rating,
    reviewCount: product.review_count,
    shortDescription: product.short_description,
    description: product.description,
    category: product.categories?.name || product.category,
    brand: product.brands?.name || product.brand,
    specs: {},
    pros: [],
    cons: [],
    youtubeVideoId: product.youtube_video_id,
    inStock: product.in_stock,
    featured: product.featured,
    tags: product.tags || [],
    createdAt: product.created_at
  }))
}

// Updated function to fetch categories
export async function getCategories() {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name')

  if (error) {
    console.error('Error fetching categories:', error)
    return []
  }

  return data.map((category: any) => ({
    id: category.id,
    name: category.name,
    slug: category.slug
  }))
}

// Keep the original mock data for reference but comment it out
/*
export const mockProducts: Product[] = [
  // ... original mock data
]

export const categories = [
  // ... original categories
]
*/