import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://thepdftools.site";

  const routes: Array<{
    path: string;
    changeFrequency: "daily" | "weekly" | "monthly";
    priority: number;
    date: string;
  }> = [
    // Homepage
    { path: "", changeFrequency: "daily", priority: 1, date: "2026-05-30" },

    // Category hub pages — newly created, highest priority after homepage
    { path: "/pdf-tools", changeFrequency: "weekly", priority: 0.98, date: "2026-05-30" },
    { path: "/image-tools", changeFrequency: "weekly", priority: 0.97, date: "2026-05-30" },
    { path: "/developer-tools", changeFrequency: "weekly", priority: 0.96, date: "2026-05-30" },
    { path: "/generators", changeFrequency: "weekly", priority: 0.95, date: "2026-05-30" },
    { path: "/document-tools", changeFrequency: "weekly", priority: 0.95, date: "2026-05-30" },
    { path: "/utility-tools", changeFrequency: "weekly", priority: 0.94, date: "2026-05-30" },

    // Core PDF tools
    { path: "/pdf-merge", changeFrequency: "weekly", priority: 0.97, date: "2026-05-19" },
    { path: "/pdf-compress", changeFrequency: "weekly", priority: 0.97, date: "2026-05-19" },
    { path: "/pdf-split", changeFrequency: "weekly", priority: 0.96, date: "2026-05-19" },
    { path: "/pdf-to-word", changeFrequency: "weekly", priority: 0.96, date: "2026-05-19" },
    { path: "/pdf-to-jpg", changeFrequency: "weekly", priority: 0.95, date: "2026-05-19" },
    { path: "/jpg-to-pdf", changeFrequency: "weekly", priority: 0.95, date: "2026-05-19" },
    { path: "/pdf-to-excel", changeFrequency: "weekly", priority: 0.94, date: "2026-05-19" },
    { path: "/image-to-pdf", changeFrequency: "weekly", priority: 0.94, date: "2026-05-19" },
    { path: "/word-to-pdf", changeFrequency: "weekly", priority: 0.94, date: "2026-05-30" },
    { path: "/pdf-sign", changeFrequency: "weekly", priority: 0.93, date: "2026-05-19" },
    { path: "/pdf-highlight", changeFrequency: "weekly", priority: 0.93, date: "2026-05-19" },
    { path: "/pdf-editor", changeFrequency: "weekly", priority: 0.93, date: "2026-05-19" },
    { path: "/pdf-to-image", changeFrequency: "weekly", priority: 0.92, date: "2026-05-19" },
    { path: "/pdf-unlock", changeFrequency: "weekly", priority: 0.92, date: "2026-05-19" },
    { path: "/pdf-protect", changeFrequency: "weekly", priority: 0.91, date: "2026-05-19" },
    { path: "/pdf-ocr", changeFrequency: "weekly", priority: 0.91, date: "2026-05-19" },
    { path: "/pdf-to-ppt", changeFrequency: "weekly", priority: 0.9, date: "2026-05-19" },
    { path: "/ppt-to-pdf", changeFrequency: "weekly", priority: 0.9, date: "2026-05-19" },
    { path: "/pdf-form-filler", changeFrequency: "weekly", priority: 0.9, date: "2026-05-19" },
    { path: "/pdf-rotate", changeFrequency: "weekly", priority: 0.89, date: "2026-05-19" },
    { path: "/pdf-watermark", changeFrequency: "weekly", priority: 0.89, date: "2026-05-19" },
    { path: "/pdf-page-numbers", changeFrequency: "weekly", priority: 0.88, date: "2026-05-19" },
    { path: "/pdf-redaction", changeFrequency: "weekly", priority: 0.88, date: "2026-05-19" },
    { path: "/pdf-compare", changeFrequency: "weekly", priority: 0.87, date: "2026-05-19" },
    { path: "/scanned-pdf-to-searchable-pdf", changeFrequency: "weekly", priority: 0.91, date: "2026-05-19" },
    { path: "/excel-to-pdf", changeFrequency: "weekly", priority: 0.88, date: "2026-05-30" },
    { path: "/html-to-pdf", changeFrequency: "weekly", priority: 0.87, date: "2026-05-30" },
    { path: "/markdown-to-pdf", changeFrequency: "weekly", priority: 0.86, date: "2026-05-19" },
    { path: "/text-to-pdf", changeFrequency: "weekly", priority: 0.86, date: "2026-05-19" },
    { path: "/screenshot-to-pdf", changeFrequency: "weekly", priority: 0.86, date: "2026-05-19" },

    // PDF long-tail pages
    { path: "/compress-pdf-to-100kb", changeFrequency: "weekly", priority: 0.9, date: "2026-05-19" },
    { path: "/compress-pdf-to-200kb", changeFrequency: "weekly", priority: 0.9, date: "2026-05-30" },
    { path: "/compress-pdf-for-govt-exam", changeFrequency: "weekly", priority: 0.9, date: "2026-05-19" },
    { path: "/reduce-pdf-size-online-free", changeFrequency: "weekly", priority: 0.91, date: "2026-05-19" },
    { path: "/compress-image-to-100kb", changeFrequency: "weekly", priority: 0.9, date: "2026-05-30" },

    // Core image tools
    { path: "/image-compressor", changeFrequency: "weekly", priority: 0.92, date: "2026-05-19" },
    { path: "/jpg-to-png", changeFrequency: "weekly", priority: 0.91, date: "2026-05-19" },
    { path: "/png-to-jpg", changeFrequency: "weekly", priority: 0.91, date: "2026-05-19" },
    { path: "/image-resizer", changeFrequency: "weekly", priority: 0.9, date: "2026-05-19" },
    { path: "/background-remover", changeFrequency: "weekly", priority: 0.9, date: "2026-05-19" },
    { path: "/heic-to-jpg", changeFrequency: "weekly", priority: 0.9, date: "2026-05-19" },
    { path: "/image-cropper", changeFrequency: "weekly", priority: 0.88, date: "2026-05-19" },
    { path: "/image-upscaler", changeFrequency: "weekly", priority: 0.87, date: "2026-05-19" },
    { path: "/image-to-webp", changeFrequency: "weekly", priority: 0.87, date: "2026-05-19" },
    { path: "/image-watermark", changeFrequency: "weekly", priority: 0.86, date: "2026-05-19" },
    { path: "/image-rotate", changeFrequency: "weekly", priority: 0.85, date: "2026-05-19" },
    { path: "/svg-to-png", changeFrequency: "weekly", priority: 0.84, date: "2026-05-19" },
    { path: "/video-to-gif", changeFrequency: "weekly", priority: 0.85, date: "2026-05-19" },

    // Image variant pages
    { path: "/convert-jpeg-to-png-online-free", changeFrequency: "weekly", priority: 0.87, date: "2026-05-19" },
    { path: "/jpg-to-png-no-upload", changeFrequency: "weekly", priority: 0.86, date: "2026-05-19" },
    { path: "/jpg-to-png-for-logos", changeFrequency: "weekly", priority: 0.84, date: "2026-05-19" },
    { path: "/convert-png-to-jpg-online-free", changeFrequency: "weekly", priority: 0.87, date: "2026-05-19" },
    { path: "/png-to-jpg-for-photos", changeFrequency: "weekly", priority: 0.84, date: "2026-05-19" },
    { path: "/png-to-jpg-white-background", changeFrequency: "weekly", priority: 0.83, date: "2026-05-19" },

    // Document & productivity tools
    { path: "/invoice-generator", changeFrequency: "weekly", priority: 0.88, date: "2026-05-19" },
    { path: "/resume-builder", changeFrequency: "weekly", priority: 0.88, date: "2026-06-14" },
    { path: "/ai-invoice-extractor", changeFrequency: "weekly", priority: 0.87, date: "2026-05-19" },
    { path: "/signature-generator", changeFrequency: "weekly", priority: 0.86, date: "2026-05-19" },
    { path: "/qr-generator", changeFrequency: "weekly", priority: 0.82, date: "2026-05-19" },
    { path: "/barcode-generator", changeFrequency: "weekly", priority: 0.82, date: "2026-05-19" },
    { path: "/favicon-generator", changeFrequency: "weekly", priority: 0.82, date: "2026-05-19" },

    // New high-traffic tools
    { path: "/password-generator", changeFrequency: "weekly", priority: 0.88, date: "2026-05-30" },
    { path: "/timestamp-converter", changeFrequency: "weekly", priority: 0.86, date: "2026-05-30" },
    { path: "/url-encoder", changeFrequency: "weekly", priority: 0.85, date: "2026-05-30" },
    { path: "/regex-tester", changeFrequency: "weekly", priority: 0.85, date: "2026-05-30" },
    { path: "/text-case-converter", changeFrequency: "weekly", priority: 0.82, date: "2026-05-30" },

    // Developer & utility tools
    { path: "/json-formatter", changeFrequency: "weekly", priority: 0.76, date: "2026-05-19" },
    { path: "/csv-to-json", changeFrequency: "weekly", priority: 0.76, date: "2026-05-19" },
    { path: "/base64", changeFrequency: "weekly", priority: 0.74, date: "2026-05-19" },
    { path: "/word-counter", changeFrequency: "weekly", priority: 0.74, date: "2026-05-19" },
    { path: "/lorem-ipsum", changeFrequency: "monthly", priority: 0.68, date: "2026-05-19" },
    { path: "/color-picker", changeFrequency: "weekly", priority: 0.72, date: "2026-05-19" },
    { path: "/color-gradient", changeFrequency: "weekly", priority: 0.72, date: "2026-05-19" },
    { path: "/tailwind-colors", changeFrequency: "weekly", priority: 0.7, date: "2026-05-19" },

    // Comparison pages
    { path: "/smallpdf-vs-thepdftools", changeFrequency: "monthly", priority: 0.85, date: "2026-05-19" },
    { path: "/ilovepdf-alternative", changeFrequency: "monthly", priority: 0.85, date: "2026-05-19" },

    // Blog
    { path: "/blog", changeFrequency: "weekly", priority: 0.85, date: "2026-05-30" },
    { path: "/blog/create-resume-online-free", changeFrequency: "monthly", priority: 0.78, date: "2026-06-14" },
    { path: "/blog/how-to-sign-pdf-online-free", changeFrequency: "monthly", priority: 0.78, date: "2026-06-14" },
    { path: "/blog/extract-text-from-scanned-pdf-ocr", changeFrequency: "monthly", priority: 0.78, date: "2026-06-14" },
    { path: "/blog/how-to-create-qr-code-online-free", changeFrequency: "monthly", priority: 0.78, date: "2026-06-14" },
    { path: "/blog/password-protect-and-unlock-pdf", changeFrequency: "monthly", priority: 0.78, date: "2026-06-14" },
    { path: "/blog/add-watermark-to-image-online-free", changeFrequency: "monthly", priority: 0.78, date: "2026-05-30" },
    { path: "/blog/compress-pdf-for-email-online", changeFrequency: "monthly", priority: 0.78, date: "2026-05-30" },
    { path: "/blog/convert-ppt-to-pdf-online-free", changeFrequency: "monthly", priority: 0.78, date: "2026-05-30" },
    { path: "/blog/how-to-compress-images-for-web", changeFrequency: "monthly", priority: 0.75, date: "2026-04-20" },
    { path: "/blog/jpg-vs-png-vs-webp-which-format", changeFrequency: "monthly", priority: 0.75, date: "2026-04-18" },
    { path: "/blog/how-to-merge-pdf-files-online", changeFrequency: "monthly", priority: 0.75, date: "2026-04-10" },
    { path: "/blog/remove-image-background-with-ai", changeFrequency: "monthly", priority: 0.75, date: "2026-04-08" },
    { path: "/blog/optimize-images-for-seo", changeFrequency: "monthly", priority: 0.75, date: "2026-04-05" },
    { path: "/blog/convert-word-to-pdf-free", changeFrequency: "monthly", priority: 0.75, date: "2026-03-28" },
    { path: "/blog/best-free-online-tools-for-students-2026", changeFrequency: "monthly", priority: 0.8, date: "2026-03-25" },
    { path: "/blog/best-free-pdf-tools-india", changeFrequency: "monthly", priority: 0.78, date: "2026-03-20" },
    { path: "/blog/free-image-tools-for-designers-uk", changeFrequency: "monthly", priority: 0.78, date: "2026-03-18" },
    { path: "/blog/free-online-tools-small-business", changeFrequency: "monthly", priority: 0.78, date: "2026-03-15" },
    { path: "/blog/compress-images-for-website-speed", changeFrequency: "monthly", priority: 0.78, date: "2026-03-10" },
    { path: "/blog/convert-heic-to-jpg-free", changeFrequency: "monthly", priority: 0.78, date: "2026-03-08" },
    { path: "/blog/convert-pdf-to-excel-free", changeFrequency: "monthly", priority: 0.78, date: "2026-03-05" },
    { path: "/blog/convert-video-to-gif-free", changeFrequency: "monthly", priority: 0.78, date: "2026-03-02" },
    { path: "/blog/free-invoice-generator-freelancers", changeFrequency: "monthly", priority: 0.78, date: "2026-02-28" },
    { path: "/blog/compress-pdf-files-free", changeFrequency: "monthly", priority: 0.78, date: "2026-02-25" },

    // Static pages
    { path: "/about", changeFrequency: "monthly", priority: 0.6, date: "2026-05-19" },
    { path: "/privacy", changeFrequency: "monthly", priority: 0.5, date: "2026-05-19" },
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date(route.date),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
