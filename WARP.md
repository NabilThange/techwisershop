# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

Project overview
- Framework: Next.js (App Router) with TypeScript and Tailwind CSS
- UI: Radix primitives + shadcn-style components in components/ui
- Data: Supabase client (lib/supabase-client.ts) used in both server-side data helpers (data/mock-products.ts) and client-side search
- Notable routes: app/page.tsx (home), app/products (list and [slug] detail), app/categories (list and [slug]), app/search (client-side search), app/robots.ts, app/sitemap.ts, app/manifest.ts
- Global layout/providers: app/layout.tsx wires ThemeProvider, LenisProvider, StructuredData, Vercel Analytics + Speed Insights

Environment and configuration
- Required environment variables (client-exposed):
  - NEXT_PUBLIC_SUPABASE_URL
  - NEXT_PUBLIC_SUPABASE_ANON_KEY
- Where they are used: lib/supabase-client.ts and all data helpers in data/mock-products.ts; search relies on these at runtime in app/search/SearchPageClient.tsx.
- Suggested local setup:
  - Create a .env.local file at the repo root with the two variables above

Common commands
- Install dependencies
  - This repo contains both pnpm-lock.yaml and package-lock.json. Pick one package manager to avoid conflicts. If using pnpm, remove package-lock.json; if using npm, remove pnpm-lock.yaml.
  - pnpm: pnpm install
  - npm: npm install
- Develop
  - pnpm: pnpm dev
  - npm: npm run dev
- Build
  - pnpm: pnpm build
  - npm: npm run build
- Start production server (after build)
  - pnpm: pnpm start
  - npm: npm run start
- Lint
  - pnpm: pnpm lint
  - npm: npm run lint
  - With autofix: add “-- --fix”, e.g. pnpm lint -- --fix or npm run lint -- --fix
- Tests: No test scripts or configs are present in this repo at the moment.

Important Next.js config notes (next.config.mjs)
- Builds ignore ESLint and TypeScript errors (eslint.ignoreDuringBuilds = true, typescript.ignoreBuildErrors = true). Lint and type-check locally to catch issues early; the build will not fail on them by default.
- Image optimization is set with images.unoptimized = true and additional headers/caching.
- Rewrites map /sitemap.xml and /robots.txt to /api/*, but this repo implements app/sitemap.ts and app/robots.ts (file-based metadata). Prefer the file-based routes; the rewrite targets do not currently exist as API handlers.

TypeScript config
- Path alias @/* maps to the repo root (see tsconfig.json). Use imports like import { something } from "@/lib/utils".

Architecture, at a glance
- Routing and rendering
  - App Router under app/: server components by default, with explicit "use client" where needed (e.g., performance monitor and search client page).
  - Home and product pages fetch data on the server via helpers in data/mock-products.ts (which themselves call Supabase) and render UI with components from components/ and components/ui.
  - Search is handled on the client in app/search/SearchPageClient.tsx using the Supabase JS client directly, with simple sort and filter handling via URLSearchParams.
- Data layer
  - lib/supabase-client.ts initializes the browser-safe Supabase client from NEXT_PUBLIC_* env vars.
  - data/mock-products.ts provides server-side helpers (getFeaturedProducts, getFeaturedProduct, getProductBySlug, getProductsByCategory, getAllProducts, getCategories) that transform Supabase rows into the UI’s product shape.
- SEO and structured data
  - app/layout.tsx defines site-wide Metadata and injects JSON-LD for organization/website via components/structured-data.tsx.
  - Product pages add JSON-LD for Product, Breadcrumb, and FAQ based on product data.
- UI system
  - Tailwind CSS (globals at app/globals.css) with a design token setup and utility layers.
  - Reusable components in components/ui (buttons, cards, inputs, etc.) and higher-level site components (navbar, footer, product-card, search-bar, etc.).

Developing effectively here
- Ensure required Supabase env vars are set before running dev; the search page and data helpers depend on them.
- Use the @/* path alias to keep imports concise and avoid deep relative paths.
- When adding new pages/routes, prefer App Router conventions (server components by default; use client only where interactivity is required).
- Be aware that build won’t fail on lint/type errors due to next.config.mjs. Run lint locally when making changes.
