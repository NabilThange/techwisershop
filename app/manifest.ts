import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "TECHWISER - Tech Product Reviews",
    short_name: "TECHWISER",
    description: "Discover the best tech products with honest reviews from TECHWISER",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#393E41",
    icons: [
      {
        src: "/icon-192x192.jpg",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512x512.jpg",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    categories: ["shopping", "technology", "reviews"],
    lang: "en",
    orientation: "portrait-primary",
  }
}
