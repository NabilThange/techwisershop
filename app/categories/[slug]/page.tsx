import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { getCategories, getProductsByCategory } from "@/data/mock-products"

interface CategoryPageProps {
  params: {
    slug: string
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const categories = await getCategories()
  const category = categories.find((c: any) => c.slug === params.slug)

  if (!category) {
    notFound()
  }

  const products = await getProductsByCategory(category.name)

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center space-x-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          <span>/</span>
          <Link href="/categories" className="hover:text-foreground">
            Categories
          </Link>
          <span>/</span>
          <span className="text-foreground">{category.name}</span>
        </nav>

        {/* Back Button */}
        <Button variant="ghost" size="sm" asChild className="mb-6">
          <Link href="/categories">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Categories
          </Link>
        </Button>

        <div className="mb-8">
          <h1 className="mb-4 text-3xl font-bold">{category.name} Products</h1>
          <p className="text-muted-foreground">
            Explore our curated selection of {category.name.toLowerCase()} products with detailed reviews and honest
            recommendations
          </p>
        </div>

        {products.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No products found in this category.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const categories = await getCategories()
  const category = categories.find((c: any) => c.slug === params.slug)

  if (!category) {
    return {
      title: "Category Not Found",
    }
  }

  return {
    title: `Best ${category.name} Products 2025 - Reviews & Buying Guide | TECHWISER`,
    description: `Discover the best ${category.name.toLowerCase()} products with detailed reviews, comparisons, and buying guides. Find the perfect ${category.name.toLowerCase()} for your needs.`,
    keywords: `${category.name}, best ${category.name.toLowerCase()}, ${category.name.toLowerCase()} reviews, buying guide`,
  }
}

export async function generateStaticParams() {
  const categories = await getCategories()
  return categories.map((category: any) => ({
    slug: category.slug,
  }))
}