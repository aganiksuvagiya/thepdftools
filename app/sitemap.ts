import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://thepdftools.site";
  const lastModified = new Date();

  const routes: Array<{
    path: string;
    changeFrequency: "daily" | "weekly" | "monthly";
    priority: number;
  }> = [
    { path: "", changeFrequency: "daily", priority: 1 },
    { path: "/image-compressor", changeFrequency: "weekly", priority: 0.95 },
    { path: "/background-remover", changeFrequency: "weekly", priority: 0.95 },
    { path: "/pdf-merge", changeFrequency: "weekly", priority: 0.95 },
    { path: "/image-resizer", changeFrequency: "weekly", priority: 0.92 },
    { path: "/image-cropper", changeFrequency: "weekly", priority: 0.92 },
    { path: "/image-upscaler", changeFrequency: "weekly", priority: 0.92 },
    { path: "/jpg-to-png", changeFrequency: "weekly", priority: 0.9 },
    { path: "/png-to-jpg", changeFrequency: "weekly", priority: 0.9 },
    { path: "/image-to-webp", changeFrequency: "weekly", priority: 0.9 },
    { path: "/image-rotate", changeFrequency: "weekly", priority: 0.86 },
    { path: "/image-watermark", changeFrequency: "weekly", priority: 0.86 },
    { path: "/pdf-split", changeFrequency: "weekly", priority: 0.9 },
    { path: "/pdf-to-image", changeFrequency: "weekly", priority: 0.9 },
    { path: "/pdf-to-word", changeFrequency: "weekly", priority: 0.88 },
    { path: "/ppt-to-pdf", changeFrequency: "weekly", priority: 0.84 },
    { path: "/word-to-pdf", changeFrequency: "weekly", priority: 0.88 },
    { path: "/screenshot-to-pdf", changeFrequency: "weekly", priority: 0.84 },
    { path: "/qr-generator", changeFrequency: "weekly", priority: 0.82 },
    { path: "/color-picker", changeFrequency: "weekly", priority: 0.8 },
    { path: "/base64", changeFrequency: "weekly", priority: 0.78 },
    { path: "/json-formatter", changeFrequency: "weekly", priority: 0.78 },
    { path: "/word-counter", changeFrequency: "weekly", priority: 0.78 },
    { path: "/lorem-ipsum", changeFrequency: "monthly", priority: 0.72 },
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
