import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getCategories, getAllProducts } from "@/data/mock-products"
import { getProducts } from "@/lib/supabase-client"
import { Category, ProductWithCategory } from "@/types/database"

export default async function CategoriesPage() {
  const { data: categories } = await getCategories()
  const { data: products } = await getProducts({ is_published: true })

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8 pt-32">
        <div className="mb-8">
          <h1 className="mb-4 text-3xl font-bold">Product Categories</h1>
          <p className="text-muted-foreground">Browse products by category to find exactly what you're looking for</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {(categories || []).map((category) => {
            const categoryProducts = (products || []).filter(
              (p) => p.category_id === category.id
            )

            return (
              <Link key={category.id} href={`/categories/${category.slug}`}>
                <Card className="group transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                  <CardContent className="p-6">
                    <div className="mb-4 flex items-center justify-between">
                      <h3 className="text-xl font-semibold group-hover:text-primary">{category.name}</h3>
                      <Badge variant="secondary">{categoryProducts.length} products</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {category.description || `Discover the best ${category.name.toLowerCase()} products with detailed reviews and comparisons`}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </main>

      <Footer />
    </div>
  )
}