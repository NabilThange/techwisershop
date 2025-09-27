# Supabase Integration Guide

This document explains how the Supabase integration works in the Techwiser Shop project.

## Setup Instructions

1. Create a Supabase project at https://supabase.com/
2. Get your project URL and anon key from the Supabase dashboard (Settings > API)
3. Update the `.env.local` file with your Supabase credentials:

```
NEXT_PUBLIC_SUPABASE_URL=your_actual_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_actual_supabase_anon_key
```

## Database Schema

The project uses the following tables:

1. `categories` - Product categories
2. `brands` - Product brands
3. `products` - Main product information
4. `product_images` - Multiple images per product
5. `product_specs` - Product specifications
6. `product_pros_cons` - Product pros and cons
7. `tags` - Product tags
8. `product_tags` - Junction table for product-tag relationships
9. `users` - User accounts (for future features)
10. `saved_products` - Saved products/wishlist
11. `search_queries` - Search query tracking

## How the Integration Works

1. **Supabase Client**: The client is initialized in `lib/supabase-client.ts`
2. **Data Fetching**: All data fetching functions are in `data/mock-products.ts` (renamed from mock data)
3. **Server Components**: Pages use async/await to fetch data on the server side
4. **Real-time Updates**: The app is ready for real-time subscriptions (not implemented yet)

## Key Features

- Server-side data fetching for better SEO
- Type-safe data access with TypeScript
- Proper error handling
- Loading states
- Responsive design
- Search functionality with Supabase full-text search

## Environment Variables

Make sure to set the following environment variables:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Troubleshooting

If you encounter issues:

1. Check that your Supabase credentials are correct
2. Verify that your database tables match the schema
3. Ensure Row Level Security (RLS) policies are properly configured
4. Check the browser console and server logs for error messages