import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://thepdftools.site";
  const lastModified = new Date();

  const routes: Array<{
    path: string;
    changeFrequency: "daily" | "weekly" | "monthly" | "yearly";
    priority: number;
  }> = [
    { path: "", changeFrequency: "daily", priority: 1 },
    { path: "/image-compressor", changeFrequency: "weekly", priority: 0.95 },
    { path: "/pdf-merge", changeFrequency: "weekly", priority: 0.95 },
    { path: "/background-remover", changeFrequency: "weekly", priority: 0.95 },
    { path: "/jpg-to-png", changeFrequency: "weekly", priority: 0.9 },
    { path: "/png-to-jpg", changeFrequency: "weekly", priority: 0.9 },
    { path: "/image-to-webp", changeFrequency: "weekly", priority: 0.9 },
    { path: "/image-cropper", changeFrequency: "weekly", priority: 0.9 },
    { path: "/image-resizer", changeFrequency: "weekly", priority: 0.9 },
    { path: "/image-watermark", changeFrequency: "weekly", priority: 0.85 },
    { path: "/image-rotate", changeFrequency: "weekly", priority: 0.85 },
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
