import Image from "next/image"
import { Youtube, Instagram, Twitter, Users, Award, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="mb-16 text-center">
          <div className="mx-auto max-w-3xl">
            <Badge className="mb-6 bg-primary/10 text-primary hover:bg-primary/20">About TECHWISER</Badge>
            <h1 className="mb-6 text-4xl font-bold text-balance md:text-5xl">Your Trusted Tech Review Partner</h1>
            <p className="text-lg text-muted-foreground text-pretty">
              Since 2020, TECHWISER has been helping tech enthusiasts make informed buying decisions through honest,
              detailed reviews and comprehensive product comparisons.
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="mb-16">
          <div className="grid gap-8 md:grid-cols-3">
            <Card>
              <CardContent className="p-6 text-center">
                <Users className="mx-auto mb-4 h-12 w-12 text-primary" />
                <div className="mb-2 text-3xl font-bold">500K+</div>
                <div className="text-sm text-muted-foreground">YouTube Subscribers</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Award className="mx-auto mb-4 h-12 w-12 text-primary" />
                <div className="mb-2 text-3xl font-bold">1000+</div>
                <div className="text-sm text-muted-foreground">Products Reviewed</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <TrendingUp className="mx-auto mb-4 h-12 w-12 text-primary" />
                <div className="mb-2 text-3xl font-bold">50M+</div>
                <div className="text-sm text-muted-foreground">Total Video Views</div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Our Story */}
        <section className="mb-16">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="mb-6 text-3xl font-bold">Our Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  TECHWISER started as a passion project in 2020 when we realized the tech review space was filled with
                  biased opinions and sponsored content that didn't truly help consumers make the right choices.
                </p>
                <p>
                  Our mission is simple: provide honest, unbiased reviews that help you understand not just what a
                  product does, but whether it's right for your specific needs and budget.
                </p>
                <p>
                  Today, we've grown into a trusted community of tech enthusiasts who rely on our detailed reviews,
                  buying guides, and product comparisons to make informed decisions.
                </p>
              </div>
            </div>
            <div className="aspect-video overflow-hidden rounded-lg bg-muted">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="TECHWISER team at work"
                width={600}
                height={400}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* What We Do */}
        <section className="mb-16">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">What We Do</h2>
            <p className="text-muted-foreground">
              We provide comprehensive tech reviews and buying guidance across multiple platforms
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardContent className="p-6">
                <Youtube className="mb-4 h-8 w-8 text-red-600" />
                <h3 className="mb-2 text-xl font-semibold">Video Reviews</h3>
                <p className="text-sm text-muted-foreground">
                  In-depth video reviews on YouTube covering unboxing, testing, and real-world usage scenarios.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <Award className="mb-4 h-8 w-8 text-primary" />
                <h3 className="mb-2 text-xl font-semibold">Product Testing</h3>
                <p className="text-sm text-muted-foreground">
                  Rigorous testing methodology to evaluate performance, build quality, and value for money.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <TrendingUp className="mb-4 h-8 w-8 text-primary" />
                <h3 className="mb-2 text-xl font-semibold">Buying Guides</h3>
                <p className="text-sm text-muted-foreground">
                  Comprehensive buying guides to help you choose the right product for your needs and budget.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Our Values */}
        <section className="mb-16">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">Our Values</h2>
            <p className="text-muted-foreground">The principles that guide everything we do</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardContent className="p-6">
                <h3 className="mb-3 text-lg font-semibold">Honesty & Transparency</h3>
                <p className="text-sm text-muted-foreground">
                  We provide unbiased reviews and clearly disclose any affiliate relationships or sponsorships.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="mb-3 text-lg font-semibold">Thorough Testing</h3>
                <p className="text-sm text-muted-foreground">
                  Every product goes through extensive real-world testing before we share our verdict.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="mb-3 text-lg font-semibold">Consumer First</h3>
                <p className="text-sm text-muted-foreground">
                  Our recommendations are based on what's best for consumers, not what generates the most revenue.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="mb-3 text-lg font-semibold">Continuous Learning</h3>
                <p className="text-sm text-muted-foreground">
                  We stay updated with the latest technology trends to provide relevant and timely advice.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Connect With Us */}
        <section className="mb-16">
          <Card className="bg-primary text-primary-foreground">
            <CardContent className="p-8 text-center md:p-12">
              <h2 className="mb-4 text-3xl font-bold">Connect With Us</h2>
              <p className="mb-6 text-primary-foreground/80">
                Follow us on social media for the latest reviews, tech news, and behind-the-scenes content.
              </p>
              <div className="flex justify-center space-x-4">
                <Button variant="secondary" size="lg" asChild>
                  <a
                    href="https://youtube.com/@TECHWISER"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <Youtube className="h-5 w-5" />
                    YouTube
                  </a>
                </Button>
                <Button variant="secondary" size="lg" asChild>
                  <a
                    href="https://instagram.com/TECHWISER"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <Instagram className="h-5 w-5" />
                    Instagram
                  </a>
                </Button>
                <Button variant="secondary" size="lg" asChild>
                  <a
                    href="https://twitter.com/TECHWISER"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <Twitter className="h-5 w-5" />
                    Twitter
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export const metadata = {
  title: "About TECHWISER - Your Trusted Tech Review Partner",
  description:
    "Learn about TECHWISER's mission to provide honest, unbiased tech reviews. Discover our story, values, and commitment to helping you make informed buying decisions.",
  keywords: "about TECHWISER, tech reviews, honest reviews, unbiased reviews, tech channel",
}
