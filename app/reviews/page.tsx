import Link from "next/link"
import { Calendar, Clock, Star, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { getAllProducts } from "@/data/mock-products"

export default async function ReviewsPage() {
  const products = await getAllProducts()
  
  // Mock review data - in a real app, this would come from a CMS or database
  const reviews = products.map((product: any, index: number) => ({
    id: product.id,
    title: `${product.title} Review: Is It Worth It?`,
    excerpt: `Our comprehensive review of the ${product.title}, covering performance, build quality, and value for money.`,
    publishDate: new Date(2025, 0, 15 - index).toISOString(),
    readTime: Math.floor(Math.random() * 5) + 3,
    rating: product.rating,
    category: product.category,
    slug: product.slug,
    image: product.image,
    videoId: product.youtubeVideoId,
  }))

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8 pt-32">
        {/* Page Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-3xl font-bold">Latest Reviews</h1>
          <p className="text-muted-foreground">
            Stay updated with our latest product reviews, unboxings, and tech insights
          </p>
        </div>

        {/* Featured Review */}
        <section className="mb-12">
          <Card className="overflow-hidden">
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="aspect-video bg-muted lg:aspect-auto">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${reviews[0].videoId}`}
                  title={reviews[0].title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full"
                ></iframe>
              </div>
              <CardContent className="p-6 lg:p-8">
                <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">Featured Review</Badge>
                <h2 className="mb-4 text-2xl font-bold text-balance">{reviews[0].title}</h2>
                <p className="mb-4 text-muted-foreground">{reviews[0].excerpt}</p>
                <div className="mb-6 flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(reviews[0].publishDate).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {reviews[0].readTime} min read
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-primary text-primary" />
                    {reviews[0].rating}/5
                  </div>
                </div>
                <Button asChild>
                  <Link href={`/products/${reviews[0].slug}`}>Read Full Review</Link>
                </Button>
              </CardContent>
            </div>
          </Card>
        </section>

        {/* All Reviews */}
        <section>
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold">All Reviews</h2>
            <div className="flex gap-2">
              <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                All
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                Audio
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                Mobile
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                Laptop
              </Badge>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {reviews.slice(1).map((review: any) => (
              <Card key={review.id} className="group overflow-hidden transition-all duration-300 hover:shadow-lg">
                <div className="aspect-video overflow-hidden bg-muted">
                  <div className="relative h-full w-full bg-gradient-to-br from-muted to-muted-foreground/20">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Play className="h-12 w-12 text-primary opacity-80 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {review.category}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-primary text-primary" />
                      <span className="text-xs font-medium">{review.rating}</span>
                    </div>
                  </div>
                  <h3 className="mb-2 line-clamp-2 font-semibold group-hover:text-primary transition-colors">
                    {review.title}
                  </h3>
                  <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">{review.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(review.publishDate).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {review.readTime} min
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="mt-3 w-full bg-transparent" asChild>
                    <Link href={`/products/${review.slug}`}>Read Review</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button variant="outline" size="lg">
              Load More Reviews
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export const metadata = {
  title: "Latest Tech Reviews - In-Depth Product Analysis | TECHWISER",
  description:
    "Read our latest tech product reviews with detailed analysis, pros & cons, and honest recommendations. Stay updated with the newest gadgets and electronics.",
  keywords: "tech reviews, product reviews, gadget reviews, electronics reviews, latest reviews",
}