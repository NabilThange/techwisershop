// TypeScript interfaces for the Supabase database schema
// Based on SUPABASE_INTEGRATION.md

export interface Category {
  id: string; // UUID
  name: string; // Unique category name (e.g., "Smartphones")
  slug: string; // URL-friendly version (e.g., "smartphones")
  description?: string; // Optional description
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
}

export interface Product {
  id: string; // UUID
  slug: string; // URL-friendly identifier (e.g., "iphone-15-pro-max")
  title: string; // Full product name
  short_description?: string; // Brief 1-2 sentence summary
  description?: string; // Full detailed review content

  // Pricing Information
  price: number; // Current selling price
  original_price?: number; // Original price before discount
  currency: string; // Currency code (default: 'INR')

  // Images
  main_image_url: string; // Primary product image URL
  additional_images?: string[]; // Additional images as JSON array

  // Affiliate Information
  affiliate_url: string; // Affiliate tracking URL
  brand_name?: string; // Brand name (e.g., "Apple", "Samsung")

  // Ratings & Reviews
  rating: number; // Product rating out of 5.0
  review_count: number; // Number of reviews

  // YouTube Integration
  youtube_video_id?: string; // YouTube video ID for embedded review

  // Product Details (JSONB fields)
  specifications?: Record<string, string>; // Technical specifications
  pros?: string[]; // List of positive points
  cons?: string[]; // List of negative points

  // Product Status Flags
  in_stock: boolean; // Whether product is available
  featured: boolean; // Whether featured on homepage
  is_published: boolean; // Whether visible to public

  // Relationships
  category_id?: string; // UUID reference to categories table

  // Timestamps
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
}

// Supabase database type for type-safe queries
export interface Database {
  public: {
    Tables: {
      categories: {
        Row: Category;
        Insert: Omit<Category, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Category, 'id' | 'created_at' | 'updated_at'>>;
      };
      products: {
        Row: Product;
        Insert: Omit<Product, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Product, 'id' | 'created_at' | 'updated_at'>>;
      };
    };
  };
}

// Extended types for components
export interface ProductWithCategory extends Product {
  category?: Category;
}

export interface CategoryWithProducts extends Category {
  products?: Product[];
}

// API response types
export interface ProductsResponse {
  products: Product[];
  total: number;
  page: number;
  limit: number;
}

export interface CategoriesResponse {
  categories: Category[];
  total: number;
}

// Search types
export interface SearchFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  featured?: boolean;
  brand?: string;
}

export interface SearchResults {
  products: Product[];
  categories: Category[];
  total: number;
}