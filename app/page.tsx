import Link from "next/link"
import { ArrowRight, Play, Star, TrendingUp, Youtube } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { YouTubeEmbed } from "@/components/youtube-embed"
import { AccessibilitySkipLink } from "@/components/accessibility-skip-link"
import { PerformanceMonitor } from "@/components/performance-monitor"
import { getFeaturedProducts } from "@/data/mock-products"

// Add async to the component to enable server-side data fetching
export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts()

  return (
    <div className="min-h-screen bg-black">
      <AccessibilitySkipLink />
      <PerformanceMonitor />

      <Navbar />

      <main id="main-content">
        <section className="section-gap">
          <div className="container-8px container-wrapper">
            <Card className="relative overflow-hidden border-neutral-700 bg-neutral-900">
              <CardContent className="p-0">
                <div className="grid gap-0 lg:grid-cols-5">
                  <div className="lg:col-span-3 p-12 flex flex-col justify-center">
                    <div className="space-y-8 max-w-lg">
                      <Badge className="w-fit border border-orange-500 text-orange-500 bg-transparent hover:bg-orange-500/10 font-mono text-xs font-bold">
                        MISSION CRITICAL
                      </Badge>

                      <div className="space-y-6">
                        <h1 className="text-4xl font-bold text-balance font-mono text-white">
                          SONY WH-1000XM5
                          <span className="block text-orange-500">TACTICAL AUDIO</span>
                        </h1>

                        <h2 className="text-xl font-bold text-white font-mono">OPERATIONAL EXCELLENCE</h2>

                        <p className="text-neutral-400 text-pretty max-w-md font-mono text-sm">
                          INDUSTRY-LEADING NOISE CANCELLATION WITH EXCEPTIONAL SOUND QUALITY. MISSION-READY AUDIO FOR
                          PROFESSIONALS AND ENTHUSIASTS.
                        </p>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4 pt-6">
                        <Button
                          size="lg"
                          className="touch-target bg-orange-500 hover:bg-orange-500/90 font-mono text-xs font-bold"
                        >
                          <Link href="/products/sony-wh-1000xm5" className="flex items-center gap-2">
                            VIEW INTEL
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        </Button>

                        <Button
                          size="lg"
                          variant="outline"
                          className="touch-target bg-transparent border-neutral-700 text-neutral-400 hover:bg-neutral-800 hover:text-white font-mono text-xs font-bold"
                        >
                          <a
                            href="https://youtube.com/@TECHWISER"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2"
                          >
                            <Play className="h-4 w-4" />
                            WATCH BRIEFING
                          </a>
                        </Button>
                      </div>

                      <div className="flex items-center gap-6 pt-8 text-xs text-neutral-400 font-mono">
                        <span>FOLLOW TACTICAL OPS:</span>
                        <div className="flex items-center gap-4">
                          <a href="#" className="hover:text-orange-500 transition-colors">
                            <Youtube className="h-4 w-4" />
                          </a>
                          <a href="#" className="hover:text-orange-500 transition-colors">
                            <Star className="h-4 w-4" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-2 relative flex items-center justify-center p-12 min-h-[50vh] lg:min-h-[60vh] bg-neutral-900">
                    <div className="relative z-10 transform hover:scale-105 transition-transform duration-300">
                      <img
                        src="https://placehold.co/600x600/171717/ffffff?text=Sony+WH-1000XM5"
                        alt="Sony WH-1000XM5 Premium Headphones"
                        className="w-full max-w-sm h-auto object-contain drop-shadow-lg"
                        loading="eager"
                      />
                    </div>
                  </div>
                </div>
                <div className="absolute left-3 top-3 z-20 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-orange-500" />
                  <Badge
                    variant="outline"
                    className="border-white/80 bg-black/50 text-white font-mono text-xs font-bold backdrop-blur-[2px]"
                  >
                    FEATURED
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="bg-black section-gap">
          <div className="container-8px container-wrapper">
            <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
              <div className="text-center">
                <div className="mb-3 text-3xl font-bold text-orange-500 font-mono">500K+</div>
                <div className="text-xs text-neutral-400 font-mono">YOUTUBE SUBSCRIBERS</div>
              </div>
              <div className="text-center">
                <div className="mb-3 text-3xl font-bold text-orange-500 font-mono">1000+</div>
                <div className="text-xs text-neutral-400 font-mono">PRODUCTS REVIEWED</div>
              </div>
              <div className="text-center sm:col-span-2 lg:col-span-1">
                <div className="mb-3 text-3xl font-bold text-orange-500 font-mono">50M+</div>
                <div className="text-xs text-neutral-400 font-mono">VIEWS ON REVIEWS</div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-gap py-12 md:py-16 mb-16 md:mb-24">
          <div className="container-8px container-wrapper py-6 md:py-8">
            <div className="component-gap text-center">
              <h2 className="mb-6 text-3xl font-bold text-balance text-white font-mono">
                TOP TACTICAL RECOMMENDATIONS
              </h2>
              <p className="text-neutral-400 text-pretty max-w-2xl mx-auto font-mono text-sm">
                MISSION-CRITICAL PRODUCTS BASED ON THOROUGH TESTING AND OPERATIONAL FEEDBACK
              </p>
            </div>

            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {featuredProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} priority={index === 0} />
              ))}
            </div>

            <div className="mt-16 text-center">
              <Button
                size="lg"
                variant="outline"
                asChild
                className="touch-target bg-transparent border-neutral-700 text-neutral-400 hover:bg-neutral-800 hover:text-white font-mono text-xs font-bold"
              >
                <Link href="/products">
                  VIEW ALL INTEL
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="bg-neutral-900 section-gap py-12 md:py-16 mb-16 md:mb-24">
          <div className="container-8px container-wrapper py-6 md:py-8">
            <div className="mx-auto max-w-4xl">
              <div className="component-gap text-center">
                <h2 className="mb-6 text-3xl font-bold text-white font-mono">LATEST TACTICAL BRIEFING</h2>
                <p className="text-neutral-400 font-mono text-sm">WATCH OUR MOST RECENT IN-DEPTH PRODUCT ANALYSIS</p>
              </div>

              <Card className="overflow-hidden bg-neutral-800 border-neutral-700">
                <YouTubeEmbed
                  videoId="dQw4w9WgXcQ"
                  title="Sony WH-1000XM5 Review: The Best Noise Canceling Headphones?"
                />
                <CardContent className="p-8 bg-neutral-800">
                  <h3 className="mb-4 text-xl font-bold text-white font-mono">
                    SONY WH-1000XM5 TACTICAL REVIEW: BEST NOISE CANCELING HEADPHONES?
                  </h3>
                  <p className="mb-6 text-neutral-400 text-pretty font-mono text-sm">
                    COMPREHENSIVE ANALYSIS OF SONY'S LATEST FLAGSHIP HEADPHONES, COVERING SOUND QUALITY, NOISE
                    CANCELLATION, BATTERY LIFE, AND OPERATIONAL VALUE.
                  </p>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 fill-orange-500 text-orange-500" />
                      <span className="text-sm font-bold text-white font-mono">4.6/5</span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="touch-target bg-transparent border-neutral-700 text-neutral-400 hover:bg-neutral-700 hover:text-white font-mono text-xs font-bold"
                    >
                      <a href="https://youtube.com/@TECHWISER" target="_blank" rel="noopener noreferrer">
                        SUBSCRIBE FOR MORE
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="section-gap py-12 md:py-16 mb-16 md:mb-24">
          <div className="container-8px container-wrapper py-6 md:py-8">
            <Card className="bg-orange-500 text-white border-orange-500">
              <CardContent className="p-12 text-center">
                <h2 className="mb-6 text-3xl font-bold font-mono">NEVER MISS A BRIEFING</h2>
                <p className="mb-8 text-white/90 max-w-2xl mx-auto text-pretty font-mono text-sm">
                  SUBSCRIBE TO OUR YOUTUBE CHANNEL AND GET NOTIFIED ABOUT THE LATEST TECH REVIEWS, UNBOXINGS, AND
                  TACTICAL BUYING GUIDES.
                </p>
                <Button
                  size="lg"
                  variant="secondary"
                  asChild
                  className="touch-target bg-white text-orange-500 hover:bg-white/90 font-mono text-xs font-bold"
                >
                  <a
                    href="https://youtube.com/@TECHWISER?sub_confirmation=1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <Youtube className="h-5 w-5" />
                    SUBSCRIBE NOW
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}