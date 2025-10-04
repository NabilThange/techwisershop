import { Product, ProductWithCategory, Category } from '@/types/database'
import { getProducts, getProductBySlug, getCategoryBySlug, getCategories, searchProducts } from '@/lib/supabase-client'

// Re-export types for backward compatibility
export type { Product, ProductWithCategory, Category }

// Fetch featured products using new schema
export async function getFeaturedProducts(): Promise<ProductWithCategory[]> {
  const { data, error } = await getProducts({
    featured: true,
    is_published: true,
    limit: 10
  })

  if (error) {
    console.error('Error fetching featured products:', error)
    return []
  }

  return data || []
}

// Fetch the latest featured product for the Hero section
export async function getFeaturedProduct(): Promise<ProductWithCategory | null> {
  const { data, error } = await getProducts({
    featured: true,
    is_published: true,
    limit: 1
  })

  if (error || !data || data.length === 0) {
    console.error('Error fetching featured product:', error)
    return null
  }

  return data[0]
}

// Fetch a single product by slug - re-export from lib
export { getProductBySlug }

// Fetch products by category slug
export async function getProductsByCategory(categorySlug: string): Promise<ProductWithCategory[]> {
  try {
    // First get the category by slug
    const { data: category, error: categoryError } = await getCategoryBySlug(categorySlug)
    
    if (categoryError || !category) {
      console.error('Error fetching category:', categoryError)
      return []
    }

    // Then get products for that category
    const { data, error } = await getProducts({
      category_id: category.id,
      is_published: true
    })

    if (error) {
      console.error('Error fetching products by category:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Error in getProductsByCategory:', error)
    return []
  }
}

// Fetch all published products
export async function getAllProducts(): Promise<ProductWithCategory[]> {
  const { data, error } = await getProducts({
    is_published: true
  })

  if (error) {
    console.error('Error fetching all products:', error)
    return []
  }

  return data || []
}

// Product query options for backward compatibility
export type ProductQueryOptions = {
  category?: string
  sort?: 'newest' | 'price-low' | 'price-high' | 'rating'
  minPrice?: number
  maxPrice?: number
  inStock?: boolean
}

// Legacy function that wraps the new getProducts implementation
export async function getProductsWithOptions(options: ProductQueryOptions = {}): Promise<ProductWithCategory[]> {
  const { category, sort = 'newest', minPrice, maxPrice, inStock } = options
  
  let categoryId: string | undefined
  if (category) {
    const { data: categoryData } = await getCategoryBySlug(category)
    categoryId = categoryData?.id
  }

  const { data, error } = await getProducts({
    category_id: categoryId,
    is_published: true,
    in_stock: inStock
  })

  if (error) {
    console.error('Error fetching products with options:', error)
    return []
  }

  let filteredProducts = data || []

  // Apply price filters
  if (typeof minPrice === 'number') {
    filteredProducts = filteredProducts.filter(p => p.price >= minPrice)
  }
  if (typeof maxPrice === 'number') {
    filteredProducts = filteredProducts.filter(p => p.price <= maxPrice)
  }

  // Apply sorting
  switch (sort) {
    case 'price-low':
      filteredProducts.sort((a, b) => a.price - b.price)
      break
    case 'price-high':
      filteredProducts.sort((a, b) => b.price - a.price)
      break
    case 'rating':
      filteredProducts.sort((a, b) => b.rating - a.rating)
      break
    case 'newest':
    default:
      filteredProducts.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      break
  }

  return filteredProducts
}

// Re-export categories function from lib
export { getCategories, getCategoryBySlug, searchProducts }

// Mock data for development/fallback (simplified structure matching new schema)
export const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Smartphones',
    slug: 'smartphones',
    description: 'Latest smartphones and mobile devices',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Laptops',
    slug: 'laptops', 
    description: 'High-performance laptops and notebooks',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
]

export const mockProducts: Product[] = [
  {
    id: '1',
    slug: 'iphone-15-pro-max',
    title: 'iPhone 15 Pro Max',
    short_description: 'The most advanced iPhone yet with titanium design',
    description: 'Detailed review of the iPhone 15 Pro Max...',
    price: 134900,
    original_price: 139900,
    currency: 'INR',
    main_image_url: 'https://example.com/iphone15.jpg',
    additional_images: ['https://example.com/iphone15-2.jpg'],
    affiliate_url: 'https://amzn.to/iphone15promax',
    brand_name: 'Apple',
    rating: 4.5,
    review_count: 250,
    youtube_video_id: 'dQw4w9WgXcQ',
    specifications: {
      'Display': '6.7-inch Super Retina XDR',
      'Processor': 'A17 Pro chip',
      'Storage': '256GB'
    },
    pros: ['Excellent camera', 'Premium design', 'Fast performance'],
    cons: ['Very expensive', 'Heavy weight'],
    in_stock: true,
    featured: true,
    is_published: true,
    category_id: '1',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
]
