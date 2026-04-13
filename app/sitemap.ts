import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://thepdftools.site";
  const lastModified = new Date("2026-04-13");

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
    { path: "/excel-to-pdf", changeFrequency: "weekly", priority: 0.84 },
    { path: "/html-to-pdf", changeFrequency: "weekly", priority: 0.84 },
    { path: "/screenshot-to-pdf", changeFrequency: "weekly", priority: 0.84 },
    { path: "/pdf-compress", changeFrequency: "weekly", priority: 0.95 },
    { path: "/pdf-unlock", changeFrequency: "weekly", priority: 0.84 },
    { path: "/image-to-pdf", changeFrequency: "weekly", priority: 0.9 },
    { path: "/text-to-pdf", changeFrequency: "weekly", priority: 0.84 },
    { path: "/svg-to-png", changeFrequency: "weekly", priority: 0.86 },
    { path: "/csv-to-json", changeFrequency: "weekly", priority: 0.82 },
    { path: "/pdf-to-excel", changeFrequency: "weekly", priority: 0.9 },
    { path: "/heic-to-jpg", changeFrequency: "weekly", priority: 0.9 },
    { path: "/video-to-gif", changeFrequency: "weekly", priority: 0.88 },
    { path: "/markdown-to-pdf", changeFrequency: "weekly", priority: 0.84 },
    { path: "/invoice-generator", changeFrequency: "weekly", priority: 0.88 },
    { path: "/qr-generator", changeFrequency: "weekly", priority: 0.82 },
    { path: "/color-picker", changeFrequency: "weekly", priority: 0.8 },
    { path: "/base64", changeFrequency: "weekly", priority: 0.78 },
    { path: "/json-formatter", changeFrequency: "weekly", priority: 0.78 },
    { path: "/word-counter", changeFrequency: "weekly", priority: 0.78 },
    { path: "/lorem-ipsum", changeFrequency: "monthly", priority: 0.72 },
    { path: "/blog", changeFrequency: "weekly", priority: 0.85 },
    { path: "/blog/how-to-compress-images-for-web", changeFrequency: "monthly", priority: 0.75 },
    { path: "/blog/jpg-vs-png-vs-webp-which-format", changeFrequency: "monthly", priority: 0.75 },
    { path: "/blog/how-to-merge-pdf-files-online", changeFrequency: "monthly", priority: 0.75 },
    { path: "/blog/remove-image-background-with-ai", changeFrequency: "monthly", priority: 0.75 },
    { path: "/blog/optimize-images-for-seo", changeFrequency: "monthly", priority: 0.75 },
    { path: "/blog/convert-word-to-pdf-free", changeFrequency: "monthly", priority: 0.75 },
    { path: "/blog/best-free-online-tools-for-students-2026", changeFrequency: "monthly", priority: 0.8 },
    { path: "/blog/best-free-pdf-tools-india", changeFrequency: "monthly", priority: 0.78 },
    { path: "/blog/free-image-tools-for-designers-uk", changeFrequency: "monthly", priority: 0.78 },
    { path: "/blog/free-online-tools-small-business", changeFrequency: "monthly", priority: 0.78 },
    { path: "/blog/compress-images-for-website-speed", changeFrequency: "monthly", priority: 0.78 },
    { path: "/blog/convert-heic-to-jpg-free", changeFrequency: "monthly", priority: 0.78 },
    { path: "/blog/convert-pdf-to-excel-free", changeFrequency: "monthly", priority: 0.78 },
    { path: "/blog/convert-video-to-gif-free", changeFrequency: "monthly", priority: 0.78 },
    { path: "/blog/free-invoice-generator-freelancers", changeFrequency: "monthly", priority: 0.78 },
    { path: "/blog/compress-pdf-files-free", changeFrequency: "monthly", priority: 0.78 },
    { path: "/pdf-editor", changeFrequency: "weekly", priority: 0.9 },
    { path: "/about", changeFrequency: "monthly", priority: 0.6 },
    { path: "/privacy", changeFrequency: "monthly", priority: 0.5 },
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
