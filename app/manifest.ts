import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "thepdftools",
    short_name: "thepdftools",
    description:
      "Free browser-based PDF and image tools to compress, convert, merge, sign, crop, OCR, and edit files with no upload required.",
    start_url: "/",
    display: "standalone",
    background_color: "#f8fafc",
    theme_color: "#0f766e",
    categories: ["productivity", "utilities", "business"],
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
