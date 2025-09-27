import { Mail, MessageSquare, Youtube, Instagram, Facebook, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 text-center">
            <h1 className="mb-4 text-3xl font-bold">Get In Touch</h1>
            <p className="text-muted-foreground">
              Have questions about our reviews? Want to suggest a product? We'd love to hear from you.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle>Send Us a Message</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="text-sm font-medium">
                      Name
                    </label>
                    <Input id="name" placeholder="Your name" />
                  </div>
                  <div>
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input id="email" type="email" placeholder="your@email.com" />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="text-sm font-medium">
                    Subject
                  </label>
                  <Input id="subject" placeholder="What's this about?" />
                </div>
                <div>
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <Textarea id="message" placeholder="Tell us more..." rows={5} />
                </div>
                <Button className="w-full">
                  <Mail className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
              </CardContent>
            </Card>

            {/* Contact Info & Social */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Other Ways to Reach Us</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-medium">Email</div>
                      <div className="text-sm text-muted-foreground">contact@techwiser.com</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-medium">Response Time</div>
                      <div className="text-sm text-muted-foreground">Usually within 24-48 hours</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Follow Us</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Button variant="outline" asChild>
                      <a
                        href="https://youtube.com/@TECHWISER"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <Youtube className="h-4 w-4 text-red-600" />
                        YouTube
                      </a>
                    </Button>
                    <Button variant="outline" asChild>
                      <a
                        href="https://instagram.com/TECHWISER"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <Instagram className="h-4 w-4" />
                        Instagram
                      </a>
                    </Button>
                    <Button variant="outline" asChild>
                      <a
                        href="https://facebook.com/TECHWISER"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <Facebook className="h-4 w-4" />
                        Facebook
                      </a>
                    </Button>
                    <Button variant="outline" asChild>
                      <a
                        href="https://twitter.com/TECHWISER"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <Twitter className="h-4 w-4" />
                        Twitter
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Frequently Asked</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <div className="font-medium">Product Review Requests</div>
                    <div className="text-sm text-muted-foreground">
                      We consider all product suggestions but can't guarantee reviews for every request.
                    </div>
                  </div>
                  <div>
                    <div className="font-medium">Business Inquiries</div>
                    <div className="text-sm text-muted-foreground">
                      For partnerships and collaborations, please use the contact form above.
                    </div>
                  </div>
                  <div>
                    <div className="font-medium">Technical Support</div>
                    <div className="text-sm text-muted-foreground">
                      We provide product recommendations, not technical support for specific devices.
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export const metadata = {
  title: "Contact TECHWISER - Get In Touch",
  description:
    "Have questions about our tech reviews? Want to suggest a product for review? Contact TECHWISER through our contact form or social media channels.",
  keywords: "contact TECHWISER, product suggestions, tech review requests, business inquiries",
}
