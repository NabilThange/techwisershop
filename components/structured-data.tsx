import type { ProductWithCategory } from "@/types/database"

interface StructuredDataProps {
  type: "product" | "organization" | "website" | "breadcrumb" | "faq"
  data: any
}

export function StructuredData({ type, data }: StructuredDataProps) {
  let jsonLd: any = {}

  switch (type) {
    case "product":
      const product = data as ProductWithCategory
      
      // Build image array
      const images = [product.main_image_url]
      if (product.additional_images) {
        images.push(...product.additional_images)
      }
      
      jsonLd = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.title,
        description: product.description || product.short_description,
        ...(product.brand_name && {
          brand: {
            "@type": "Brand",
            name: product.brand_name,
          },
        }),
        ...(product.category && {
          category: product.category.name,
        }),
        sku: product.id,
        image: images.filter(img => img),
        ...(product.specifications && {
          additionalProperty: Object.entries(product.specifications).map(([key, value]) => ({
            "@type": "PropertyValue",
            name: key,
            value: value,
          })),
        }),
        offers: {
          "@type": "Offer",
          priceCurrency: product.currency,
          price: product.price,
          ...(product.original_price && { 
            priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] 
          }),
          availability: product.in_stock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
          url: product.affiliate_url,
          seller: {
            "@type": "Organization",
            name: "Affiliate Partner",
            url: product.affiliate_url,
          },
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: product.rating,
          reviewCount: product.review_count,
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
          reviewBody: product.description || product.short_description,
          ...(product.pros && product.pros.length > 0 && {
            positiveNotes: product.pros.join(", "),
          }),
          ...(product.cons && product.cons.length > 0 && {
            negativeNotes: product.cons.join(", "),
          }),
        },
        ...(product.youtube_video_id && {
          video: {
            "@type": "VideoObject",
            name: `${product.title} Review`,
            description: `Detailed review of ${product.title} by TECHWISER`,
            thumbnailUrl: `https://img.youtube.com/vi/${product.youtube_video_id}/maxresdefault.jpg`,
            embedUrl: `https://www.youtube.com/embed/${product.youtube_video_id}`,
            uploadDate: product.created_at,
            duration: "PT10M",
          },
        }),
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
export function generateProductFAQ(product: ProductWithCategory) {
  const faqs = []
  
  // Worth buying FAQ
  let worthBuyingAnswer = `Based on our testing, the ${product.title}`
  if (product.pros && product.pros.length > 0) {
    worthBuyingAnswer += ` offers ${product.pros.slice(0, 3).join(", ")}`
  }
  if (product.cons && product.cons.length > 0) {
    worthBuyingAnswer += `. However, consider that it ${product.cons.slice(0, 2).join(", ")}`
  }
  worthBuyingAnswer += `. With a rating of ${product.rating}/5, it's ${product.rating >= 4.5 ? "highly recommended" : product.rating >= 4 ? "recommended" : "decent"} for most users.`
  
  faqs.push({
    question: `Is the ${product.title} worth buying?`,
    answer: worthBuyingAnswer,
  })
  
  // Key features FAQ
  if (product.specifications && Object.keys(product.specifications).length > 0) {
    faqs.push({
      question: `What are the key features of ${product.title}?`,
      answer: `The ${product.title} features ${Object.entries(product.specifications)
        .slice(0, 4)
        .map(([key, value]) => `${key}: ${value}`)
        .join(", ")}.`,
    })
  }
  
  // Where to buy FAQ
  faqs.push({
    question: `Where can I buy ${product.title} at the best price?`,
    answer: `You can buy the ${product.title} from our affiliate partners. Current price is ₹${product.price.toLocaleString("en-IN")}${product.original_price ? ` (down from ₹${product.original_price.toLocaleString("en-IN")})` : ""}. All retailers offer genuine products with warranty.`,
  })
  
  // Pros and cons FAQ
  if ((product.pros && product.pros.length > 0) || (product.cons && product.cons.length > 0)) {
    let prosConsAnswer = ""
    if (product.pros && product.pros.length > 0) {
      prosConsAnswer += `Pros: ${product.pros.join(", ")}`
    }
    if (product.cons && product.cons.length > 0) {
      if (prosConsAnswer) prosConsAnswer += ". "
      prosConsAnswer += `Cons: ${product.cons.join(", ")}`
    }
    prosConsAnswer += `. Overall, it's rated ${product.rating}/5 by users.`
    
    faqs.push({
      question: `What are the pros and cons of ${product.title}?`,
      answer: prosConsAnswer,
    })
  }
  
  return faqs
}
