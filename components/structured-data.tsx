import type { Product } from "@/data/mock-products"

interface StructuredDataProps {
  type: "product" | "organization" | "website" | "breadcrumb" | "faq"
  data: any
}

export function StructuredData({ type, data }: StructuredDataProps) {
  let jsonLd: any = {}

  switch (type) {
    case "product":
      const product = data as Product
      jsonLd = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.title,
        description: product.description,
        brand: {
          "@type": "Brand",
          name: product.brand,
        },
        category: product.category,
        sku: product.id,
        image: product.images.map((img) => `https://techwiser.shop${img}`),
        offers: {
          "@type": "AggregateOffer",
          priceCurrency: product.currency,
          lowPrice: product.price,
          highPrice: product.originalPrice || product.price,
          availability: product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
          seller: [
            {
              "@type": "Organization",
              name: "Amazon India",
              url: product.amazonLink,
            },
            {
              "@type": "Organization",
              name: "Flipkart",
              url: product.flipkartLink,
            },
          ],
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: product.rating,
          reviewCount: product.reviewCount,
          bestRating: 5,
          worstRating: 1,
        },
        review: {
          "@type": "Review",
          author: {
            "@type": "Organization",
            name: "TECHWISER",
          },
          reviewRating: {
            "@type": "Rating",
            ratingValue: product.rating,
            bestRating: 5,
            worstRating: 1,
          },
          reviewBody: product.description,
        },
        video: {
          "@type": "VideoObject",
          name: `${product.title} Review`,
          description: `Detailed review of ${product.title} by TECHWISER`,
          thumbnailUrl: `https://img.youtube.com/vi/${product.youtubeVideoId}/maxresdefault.jpg`,
          embedUrl: `https://www.youtube.com/embed/${product.youtubeVideoId}`,
          uploadDate: new Date().toISOString(),
          duration: "PT10M",
        },
      }
      break

    case "organization":
      jsonLd = {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "TECHWISER",
        url: "https://techwiser.shop",
        logo: "https://techwiser.shop/logo.png",
        description: "Trusted tech reviews and product recommendations",
        sameAs: [
          "https://youtube.com/@TECHWISER",
          "https://instagram.com/TECHWISER",
          "https://facebook.com/TECHWISER",
          "https://twitter.com/TECHWISER",
        ],
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "Customer Service",
          email: "contact@techwiser.com",
        },
        founder: {
          "@type": "Person",
          name: "TECHWISER Team",
        },
      }
      break

    case "website":
      jsonLd = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "TECHWISER",
        url: "https://techwiser.shop",
        description: "Tech product reviews and recommendations",
        potentialAction: {
          "@type": "SearchAction",
          target: "https://techwiser.shop/search?q={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      }
      break

    case "breadcrumb":
      jsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: data.map((item: any, index: number) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: item.url,
        })),
      }
      break

    case "faq":
      jsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: data.map((faq: any) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      }
      break
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
}

// Helper function to generate product FAQ data for AEO
export function generateProductFAQ(product: Product) {
  return [
    {
      question: `Is the ${product.title} worth buying?`,
      answer: `Based on our testing, the ${product.title} offers ${product.pros.join(", ")}. However, consider that it ${product.cons.join(", ")}. With a rating of ${product.rating}/5, it's ${product.rating >= 4.5 ? "highly recommended" : product.rating >= 4 ? "recommended" : "decent"} for most users.`,
    },
    {
      question: `What are the key features of ${product.title}?`,
      answer: `The ${product.title} features ${Object.entries(product.specs)
        .map(([key, value]) => `${key}: ${value}`)
        .join(", ")}. It's particularly good for ${product.tags.join(", ")}.`,
    },
    {
      question: `Where can I buy ${product.title} at the best price?`,
      answer: `You can buy the ${product.title} from Amazon India or Flipkart. Current price is ₹${product.price.toLocaleString("en-IN")}${product.originalPrice ? ` (down from ₹${product.originalPrice.toLocaleString("en-IN")})` : ""}. Both retailers offer genuine products with warranty.`,
    },
    {
      question: `What are the pros and cons of ${product.title}?`,
      answer: `Pros: ${product.pros.join(", ")}. Cons: ${product.cons.join(", ")}. Overall, it's rated ${product.rating}/5 by users.`,
    },
  ]
}
