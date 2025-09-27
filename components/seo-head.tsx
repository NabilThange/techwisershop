import Head from "next/head"

interface SEOHeadProps {
  title: string
  description: string
  canonical?: string
  image?: string
  type?: string
  jsonLd?: object
}

export function SEOHead({
  title,
  description,
  canonical,
  image = "/og-image.jpg",
  type = "website",
  jsonLd,
}: SEOHeadProps) {
  const fullTitle = title.includes("TECHWISER") ? title : `${title} | TECHWISER`

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow" />

      {canonical && <link rel="canonical" href={canonical} />}

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="TECHWISER" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@TECHWISER" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* JSON-LD Structured Data */}
      {jsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />}
    </Head>
  )
}
