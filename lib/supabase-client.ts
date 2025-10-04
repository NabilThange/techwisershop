import { createClient } from '@supabase/supabase-js'
import { Database } from '../types/database'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Create typed Supabase client
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

// Helper functions for common queries
export const getProducts = async (filters?: {
  category_id?: string;
  featured?: boolean;
  is_published?: boolean;
  in_stock?: boolean;
  limit?: number;
  offset?: number;
}) => {
  let query = supabase
    .from('products')
    .select(`
      *,
      category:categories(*)
    `)
    .order('created_at', { ascending: false })

  if (filters) {
    if (filters.category_id) {
      query = query.eq('category_id', filters.category_id)
    }
    if (filters.featured !== undefined) {
      query = query.eq('featured', filters.featured)
    }
    if (filters.is_published !== undefined) {
      query = query.eq('is_published', filters.is_published)
    }
    if (filters.in_stock !== undefined) {
      query = query.eq('in_stock', filters.in_stock)
    }
    if (filters.limit) {
      query = query.limit(filters.limit)
    }
    if (filters.offset) {
      query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1)
    }
  }

  return query
}

export const getProductBySlug = async (slug: string) => {
  return supabase
    .from('products')
    .select(`
      *,
      category:categories(*)
    `)
    .eq('slug', slug)
    .eq('is_published', true)
    .single()
}

export const getCategories = async () => {
  return supabase
    .from('categories')
    .select('*')
    .order('name')
}

export const getCategoryBySlug = async (slug: string) => {
  return supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .single()
}

export const searchProducts = async (query: string, filters?: {
  category_id?: string;
  min_price?: number;
  max_price?: number;
}) => {
  let searchQuery = supabase
    .from('products')
    .select(`
      *,
      category:categories(*)
    `)
    .eq('is_published', true)
    .or(`title.ilike.%${query}%,description.ilike.%${query}%,brand_name.ilike.%${query}%`)

  if (filters) {
    if (filters.category_id) {
      searchQuery = searchQuery.eq('category_id', filters.category_id)
    }
    if (filters.min_price) {
      searchQuery = searchQuery.gte('price', filters.min_price)
    }
    if (filters.max_price) {
      searchQuery = searchQuery.lte('price', filters.max_price)
    }
  }

  return searchQuery
}
