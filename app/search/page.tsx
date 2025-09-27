import { SearchPageClient } from "./SearchPageClient"

export async function generateMetadata({ searchParams }: { searchParams: { q?: string } }) {
  const query = searchParams.q || ""

  return {
    title: `Search Results for "${query}" | TECHWISER`,
    description: `Find the best tech products matching "${query}". Browse reviews, specifications, and prices for ${query} on TECHWISER.`,
    keywords: `${query}, search, tech products, reviews, buy online`,
    robots: {
      index: false, // Don't index search result pages
      follow: true,
    },
  }
}

export default function SearchPage() {
  return <SearchPageClient />
}
