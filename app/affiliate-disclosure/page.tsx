import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AffiliateDisclosurePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8 pt-32">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8">
            <h1 className="mb-4 text-3xl font-bold">Affiliate Disclosure</h1>
            <p className="text-muted-foreground">
              Transparency is important to us. Here's how we handle affiliate relationships and monetization.
            </p>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>What Are Affiliate Links?</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none dark:prose-invert">
                <p>
                  Affiliate links are special URLs that allow us to earn a small commission when you purchase products
                  through them. These links don't cost you anything extra - the price remains the same whether you use
                  our link or go directly to the retailer.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Our Affiliate Partners</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none dark:prose-invert">
                <p>We participate in affiliate programs with the following retailers:</p>
                <ul>
                  <li>Amazon India Associates Program</li>
                  <li>Flipkart Affiliate Program</li>
                  <li>Other select electronics retailers</li>
                </ul>
                <p>
                  When you click on product links and make a purchase, we may receive a commission. This helps support
                  our channel and allows us to continue creating honest, detailed reviews.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Our Editorial Independence</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none dark:prose-invert">
                <p>
                  <strong>Our reviews are not influenced by affiliate relationships.</strong> We maintain complete
                  editorial independence and provide honest opinions based on our testing and experience.
                </p>
                <ul>
                  <li>We purchase most products with our own money for testing</li>
                  <li>Our ratings and recommendations are based solely on product merit</li>
                  <li>We clearly distinguish between sponsored content and regular reviews</li>
                  <li>Negative reviews are published when products don't meet our standards</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>How We Use Affiliate Revenue</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none dark:prose-invert">
                <p>Revenue from affiliate links helps us:</p>
                <ul>
                  <li>Purchase new products for testing and review</li>
                  <li>Maintain and improve our website and video production quality</li>
                  <li>Keep our content free for all users</li>
                  <li>Invest in better testing equipment and tools</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>FTC Compliance</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none dark:prose-invert">
                <p>
                  In accordance with FTC guidelines, we clearly disclose our affiliate relationships. You'll see
                  affiliate disclosures:
                </p>
                <ul>
                  <li>On product pages near affiliate buttons</li>
                  <li>In video descriptions on YouTube</li>
                  <li>In social media posts containing affiliate links</li>
                  <li>On this dedicated disclosure page</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Your Trust Matters</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none dark:prose-invert">
                <p>
                  We've built TECHWISER on trust and transparency. Our goal is to help you make informed buying
                  decisions, not to maximize affiliate revenue. If you ever have questions about our recommendations or
                  affiliate relationships, please don't hesitate to contact us.
                </p>
                <p>
                  <strong>Remember:</strong> You're never obligated to use our affiliate links. We're grateful when you
                  do, as it supports our work, but our primary goal is providing valuable, honest reviews regardless of
                  how you choose to purchase products.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 rounded-lg bg-muted/50 p-6">
            <p className="text-sm text-muted-foreground">
              <strong>Last Updated:</strong> January 2025. This disclosure may be updated periodically to reflect
              changes in our affiliate partnerships or policies.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export const metadata = {
  title: "Affiliate Disclosure - TECHWISER",
  description:
    "Learn about TECHWISER's affiliate relationships, how we maintain editorial independence, and our commitment to transparency in product recommendations.",
  keywords: "affiliate disclosure, transparency, editorial independence, FTC compliance",
}
