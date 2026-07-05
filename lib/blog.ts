export const SITE_URL = "https://thepdftools.site";
export const BLOG_PATH = "/blog";
export const BLOG_URL = `${SITE_URL}${BLOG_PATH}`;

export type BlogCategory =
  | "PDF Tools"
  | "Image Tools"
  | "Business"
  | "SEO"
  | "Productivity"
  | "Career"
  | "Security"
  | "Design"
  | "Education"
  | "Video Tools";

export type BlogFaq = {
  question: string;
  answer: string;
};

export type BlogReference = {
  label: string;
  href: string;
};

export type BlogToolLink = {
  href: string;
  label: string;
};

export type BlogPostEntry = {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  publishedAt: string;
  updatedAt: string;
  readTime: string;
  category: BlogCategory;
  tags: string[];
  keywords: string[];
  toolLinks: BlogToolLink[];
  references: BlogReference[];
  faq: BlogFaq[];
  popular?: boolean;
};

const defaults = {
  references: [
    { label: "Google Search Central: Search Essentials", href: "https://developers.google.com/search/docs/fundamentals/creating-helpful-content" },
    { label: "Google Search Central: Structured data guidelines", href: "https://developers.google.com/search/docs/appearance/structured-data/sd-policies" },
  ],
  faq: [
    {
      question: "Does this workflow run in the browser?",
      answer: "Yes. The recommended tool on this page runs directly in your browser, so you can finish the task without uploading files to a remote server.",
    },
    {
      question: "What should I open after finishing this task?",
      answer: "Use the related tool links on this page to continue the same workflow, such as compressing, converting, editing, or sharing the finished file.",
    },
  ],
} satisfies Pick<BlogPostEntry, "references" | "faq">;

function buildPost(entry: Omit<BlogPostEntry, "updatedAt" | "references" | "faq"> & Partial<Pick<BlogPostEntry, "updatedAt" | "references" | "faq">>): BlogPostEntry {
  return {
    ...entry,
    updatedAt: entry.updatedAt ?? entry.publishedAt,
    references: entry.references ?? defaults.references,
    faq: entry.faq ?? defaults.faq,
  };
}

export const blogPosts: BlogPostEntry[] = [
  buildPost({
    slug: "create-resume-online-free",
    title: "How to Create a Resume Online for Free (No Signup, No Watermark)",
    description: "Build a professional, ATS-friendly resume online for free and download it as a PDF. Templates, formatting tips, and a step-by-step walkthrough.",
    excerpt: "Build a professional, ATS-friendly resume online for free and download it as a PDF. Templates, formatting tips, and a step-by-step walkthrough.",
    publishedAt: "2026-06-14",
    readTime: "11 min read",
    category: "Career",
    tags: ["Career", "Resume Builder"],
    keywords: ["create resume online free", "resume builder free", "ATS resume PDF", "resume builder no signup", "online resume maker"],
    toolLinks: [
      { href: "/resume-builder", label: "Resume Builder" },
      { href: "/pdf-to-word", label: "PDF to Word" },
      { href: "/word-to-pdf", label: "Word to PDF" },
    ],
    popular: true,
    faq: [
      {
        question: "Can I create a resume online for free without signing up?",
        answer: "Yes. You can build the resume in the browser, format sections clearly, and export it as a PDF without creating an account.",
      },
      {
        question: "Why does an ATS-friendly resume matter?",
        answer: "ATS-friendly formatting helps recruiting systems read your headings, dates, experience, and skills correctly before a human reviews the application.",
      },
    ],
  }),
  buildPost({
    slug: "how-to-sign-pdf-online-free",
    title: "How to Sign a PDF Online for Free (eSignature Guide 2026)",
    description: "Add a legally usable electronic signature to any PDF for free. Type, draw, or upload your signature and download instantly.",
    excerpt: "Add a legally usable electronic signature to any PDF for free. Type, draw, or upload your signature and download instantly.",
    publishedAt: "2026-06-14",
    readTime: "10 min read",
    category: "PDF Tools",
    tags: ["PDF Tools", "eSignature"],
    keywords: ["sign PDF online free", "esign PDF", "electronic signature PDF", "draw signature PDF", "upload signature to PDF"],
    toolLinks: [
      { href: "/pdf-sign", label: "PDF Sign" },
      { href: "/signature-generator", label: "Signature Generator" },
      { href: "/pdf-protect", label: "Protect PDF" },
    ],
    popular: true,
  }),
  buildPost({
    slug: "extract-text-from-scanned-pdf-ocr",
    title: "How to Extract Text from Scanned PDFs with OCR (Free Guide)",
    description: "Turn scanned PDFs and image-based documents into searchable, selectable text using free OCR. Learn how it works and how to use it.",
    excerpt: "Turn scanned PDFs and image-based documents into searchable, selectable text using free OCR. Learn how it works and how to use it.",
    publishedAt: "2026-06-14",
    readTime: "11 min read",
    category: "PDF Tools",
    tags: ["PDF Tools", "OCR"],
    keywords: ["extract text from scanned PDF", "OCR PDF online free", "searchable scanned PDF", "PDF OCR browser", "scan to text"],
    toolLinks: [
      { href: "/pdf-ocr", label: "PDF OCR" },
      { href: "/scanned-pdf-to-searchable-pdf", label: "Scanned PDF to Searchable PDF" },
      { href: "/pdf-to-word", label: "PDF to Word" },
    ],
    popular: true,
  }),
  buildPost({
    slug: "how-to-create-qr-code-online-free",
    title: "How to Create a QR Code Online for Free (Full Guide 2026)",
    description: "Generate a free, high-resolution QR code for a URL, Wi-Fi network, contact card, or text with custom colors and logos.",
    excerpt: "Generate a free, high-resolution QR code for a URL, Wi-Fi network, contact card, or text with custom colors and logos.",
    publishedAt: "2026-06-14",
    readTime: "10 min read",
    category: "Business",
    tags: ["Generators", "QR Codes"],
    keywords: ["create QR code online free", "QR code generator", "WiFi QR code", "URL QR code", "custom QR code"],
    toolLinks: [
      { href: "/qr-generator", label: "QR Generator" },
      { href: "/barcode-generator", label: "Barcode Generator" },
      { href: "/image-resizer", label: "Image Resizer" },
    ],
    popular: true,
  }),
  buildPost({
    slug: "password-protect-and-unlock-pdf",
    title: "How to Password Protect & Unlock a PDF Online for Free",
    description: "Add a password to keep a PDF private, or remove a password from a PDF you own. Learn PDF encryption basics and step-by-step workflows.",
    excerpt: "Add a password to keep a PDF private, or remove a password from a PDF you own. Learn PDF encryption basics and step-by-step workflows.",
    publishedAt: "2026-06-14",
    readTime: "10 min read",
    category: "Security",
    tags: ["PDF Tools", "Security"],
    keywords: ["password protect PDF", "unlock PDF online free", "remove PDF password", "encrypt PDF free", "lock PDF file"],
    toolLinks: [
      { href: "/pdf-protect", label: "Protect PDF" },
      { href: "/pdf-unlock", label: "Unlock PDF" },
      { href: "/password-generator", label: "Password Generator" },
    ],
    popular: true,
  }),
  buildPost({
    slug: "add-watermark-to-image-online-free",
    title: "How to Add Watermark to Image Online Free - No Upload",
    description: "Add a text watermark to JPG, PNG, and WebP images online for free. No upload, no signup, and no watermark from us.",
    excerpt: "Add a text watermark to JPG, PNG, and WebP images online for free. No upload, no signup, and no watermark from us.",
    publishedAt: "2026-04-14",
    readTime: "5 min read",
    category: "Image Tools",
    tags: ["Image Editing", "Watermark"],
    keywords: ["add watermark to image online free", "watermark image online", "watermark JPG online", "watermark PNG online", "photo watermark"],
    toolLinks: [
      { href: "/image-watermark", label: "Image Watermark" },
      { href: "/background-remover", label: "Background Remover" },
      { href: "/image-resizer", label: "Image Resizer" },
    ],
  }),
  buildPost({
    slug: "compress-pdf-for-email-online",
    title: "How to Compress PDF for Email Online Free",
    description: "Reduce PDF file size for Gmail, Outlook, portals, and forms. Free PDF compression with no upload, no signup, and no watermark.",
    excerpt: "Reduce PDF file size for Gmail, Outlook, portals, and forms. Free PDF compression with no upload, no signup, and no watermark.",
    publishedAt: "2026-04-14",
    readTime: "5 min read",
    category: "PDF Tools",
    tags: ["PDF Tools", "Compression"],
    keywords: ["compress PDF for email", "reduce PDF size for Gmail", "compress PDF online free", "small PDF attachment", "PDF file size email"],
    toolLinks: [
      { href: "/pdf-compress", label: "Compress PDF" },
      { href: "/compress-pdf-to-100kb", label: "Compress PDF to 100KB" },
      { href: "/reduce-pdf-size-online-free", label: "Reduce PDF Size" },
    ],
  }),
  buildPost({
    slug: "convert-ppt-to-pdf-online-free",
    title: "How to Convert PPT to PDF Online Free - No Signup",
    description: "Convert PowerPoint PPTX presentations to PDF online for free. No upload, no signup, and no watermark.",
    excerpt: "Convert PowerPoint PPTX presentations to PDF online for free. No upload, no signup, and no watermark.",
    publishedAt: "2026-04-14",
    readTime: "4 min read",
    category: "PDF Tools",
    tags: ["PDF Conversion", "PowerPoint"],
    keywords: ["convert PPT to PDF online free", "PPTX to PDF", "PowerPoint to PDF", "presentation to PDF", "PPT PDF converter"],
    toolLinks: [
      { href: "/ppt-to-pdf", label: "PPT to PDF" },
      { href: "/pdf-compress", label: "Compress PDF" },
      { href: "/pdf-page-numbers", label: "PDF Page Numbers" },
    ],
  }),
  buildPost({
    slug: "convert-heic-to-jpg-free",
    title: "How to Convert HEIC to JPG on Any Device - Free & No Upload",
    description: "Learn how to convert iPhone HEIC photos to JPG format for free on Windows, Mac, and mobile without uploading files.",
    excerpt: "Learn how to convert iPhone HEIC photos to JPG format for free on Windows, Mac, and mobile without uploading files.",
    publishedAt: "2026-04-07",
    readTime: "6 min read",
    category: "Image Tools",
    tags: ["Image Conversion", "HEIC to JPG"],
    keywords: ["convert HEIC to JPG free", "iPhone HEIC to JPG", "HEIC converter online", "HEIC no upload", "HEIC browser converter"],
    toolLinks: [
      { href: "/heic-to-jpg", label: "HEIC to JPG" },
      { href: "/image-compressor", label: "Image Compressor" },
      { href: "/image-to-webp", label: "Image to WebP" },
    ],
  }),
  buildPost({
    slug: "convert-pdf-to-excel-free",
    title: "How to Convert PDF to Excel Online - Extract Tables from PDF",
    description: "Extract tables and data from PDF files into Excel spreadsheets for free without upload. Convert PDF to XLSX in the browser.",
    excerpt: "Extract tables and data from PDF files into Excel spreadsheets for free without upload. Convert PDF to XLSX in the browser.",
    publishedAt: "2026-04-07",
    readTime: "5 min read",
    category: "PDF Tools",
    tags: ["PDF Tools", "Data Extraction"],
    keywords: ["convert PDF to Excel free", "extract tables from PDF", "PDF to XLSX", "PDF spreadsheet conversion", "PDF table extractor"],
    toolLinks: [
      { href: "/pdf-to-excel", label: "PDF to Excel" },
      { href: "/pdf-ocr", label: "PDF OCR" },
      { href: "/csv-to-json", label: "CSV to JSON" },
    ],
  }),
  buildPost({
    slug: "convert-video-to-gif-free",
    title: "How to Convert Video to GIF Online - Free MP4 to GIF Converter",
    description: "Convert MP4, WebM, and MOV videos to animated GIFs for free with control over FPS, size, and duration.",
    excerpt: "Convert MP4, WebM, and MOV videos to animated GIFs for free with control over FPS, size, and duration.",
    publishedAt: "2026-04-07",
    readTime: "5 min read",
    category: "Video Tools",
    tags: ["Video Tools", "GIF"],
    keywords: ["convert video to GIF free", "MP4 to GIF", "WebM to GIF", "animated GIF converter", "browser GIF maker"],
    toolLinks: [
      { href: "/video-to-gif", label: "Video to GIF" },
      { href: "/image-resizer", label: "Image Resizer" },
      { href: "/image-compressor", label: "Image Compressor" },
    ],
  }),
  buildPost({
    slug: "free-invoice-generator-freelancers",
    title: "Free Invoice Generator for Freelancers & Small Business",
    description: "Create professional PDF invoices for free online. Add items, taxes, discounts, and download instantly with no signup.",
    excerpt: "Create professional PDF invoices for free online. Add items, taxes, discounts, and download instantly with no signup.",
    publishedAt: "2026-04-07",
    readTime: "6 min read",
    category: "Business",
    tags: ["Business", "Invoicing"],
    keywords: ["free invoice generator", "freelancer invoice PDF", "small business invoice template", "online invoice maker", "invoice without signup"],
    toolLinks: [
      { href: "/invoice-generator", label: "Invoice Generator" },
      { href: "/pdf-sign", label: "PDF Sign" },
      { href: "/qr-generator", label: "QR Generator" },
    ],
    popular: true,
  }),
  buildPost({
    slug: "compress-pdf-files-free",
    title: "How to Compress PDF Files Online - Reduce PDF Size for Free",
    description: "Reduce PDF file size for free without losing quality. Compress PDFs for email, sharing, and storage in your browser.",
    excerpt: "Reduce PDF file size for free without losing quality. Compress PDFs for email, sharing, and storage in your browser.",
    publishedAt: "2026-04-07",
    readTime: "5 min read",
    category: "PDF Tools",
    tags: ["PDF Tools", "Compression"],
    keywords: ["compress PDF files free", "reduce PDF size", "PDF compression online", "small PDF online", "compress PDF browser"],
    toolLinks: [
      { href: "/pdf-compress", label: "Compress PDF" },
      { href: "/compress-pdf-to-200kb", label: "Compress PDF to 200KB" },
      { href: "/pdf-merge", label: "Merge PDF" },
    ],
    popular: true,
  }),
  buildPost({
    slug: "best-free-online-tools-for-students-2026",
    title: "15 Best Free Online Tools Every Student Needs in 2026",
    description: "Discover the best free online tools for students worldwide: compress images, merge PDFs, convert files, generate QR codes, and more.",
    excerpt: "Discover the best free online tools for students worldwide: compress images, merge PDFs, convert files, generate QR codes, and more.",
    publishedAt: "2026-04-07",
    readTime: "12 min read",
    category: "Education",
    tags: ["Productivity", "Students"],
    keywords: ["free online tools for students", "best free student tools 2026", "PDF tools for students", "study productivity tools", "free browser tools"],
    toolLinks: [
      { href: "/image-compressor", label: "Image Compressor" },
      { href: "/pdf-merge", label: "PDF Merge" },
      { href: "/word-counter", label: "Word Counter" },
    ],
    popular: true,
  }),
  buildPost({
    slug: "best-free-pdf-tools-india",
    title: "Best Free PDF Tools in India 2026 - No Signup Required",
    description: "Free PDF and image tools for Indian students, businesses, and professionals. Mobile-friendly, no signup, and works on slower connections.",
    excerpt: "Free PDF and image tools for Indian students, businesses, and professionals. Mobile-friendly, no signup, and works on slower connections.",
    publishedAt: "2026-04-05",
    readTime: "10 min read",
    category: "PDF Tools",
    tags: ["PDF Tools", "India"],
    keywords: ["free PDF tools India", "best online tools India", "merge PDF free India", "compress image India", "PDF tools no signup India"],
    toolLinks: [
      { href: "/pdf-merge", label: "PDF Merge" },
      { href: "/pdf-compress", label: "Compress PDF" },
      { href: "/image-compressor", label: "Image Compressor" },
    ],
    popular: true,
  }),
  buildPost({
    slug: "free-image-tools-for-designers-uk",
    title: "10 Free Image Tools Every UK Designer Needs in 2026",
    description: "The ultimate list of free online image tools for UK designers. Compress, crop, resize, remove backgrounds, and convert formats without Photoshop.",
    excerpt: "The ultimate list of free online image tools for UK designers. Compress, crop, resize, remove backgrounds, and convert formats without Photoshop.",
    publishedAt: "2026-04-04",
    readTime: "9 min read",
    category: "Design",
    tags: ["Image Tools", "Design"],
    keywords: ["free image tools for designers", "UK designer tools", "image compressor designer", "online image editor", "design workflow tools"],
    toolLinks: [
      { href: "/image-compressor", label: "Image Compressor" },
      { href: "/image-cropper", label: "Image Cropper" },
      { href: "/image-to-webp", label: "Image to WebP" },
    ],
    popular: true,
  }),
  buildPost({
    slug: "free-online-tools-small-business",
    title: "Free Online Tools for Small Businesses - Save Money in 2026",
    description: "Free online tools for PDFs, images, QR codes, and more, built for small businesses that want lower software costs and faster workflows.",
    excerpt: "Free online tools for PDFs, images, QR codes, and more, built for small businesses that want lower software costs and faster workflows.",
    publishedAt: "2026-04-03",
    readTime: "10 min read",
    category: "Business",
    tags: ["Business", "Productivity"],
    keywords: ["free online tools small business", "business PDF tools", "invoice QR PDF tools", "small business productivity tools", "free business software alternatives"],
    toolLinks: [
      { href: "/invoice-generator", label: "Invoice Generator" },
      { href: "/pdf-sign", label: "PDF Sign" },
      { href: "/qr-generator", label: "QR Generator" },
    ],
    popular: true,
  }),
  buildPost({
    slug: "compress-images-for-website-speed",
    title: "How to Compress Images for Faster Website Speed - Complete Guide",
    description: "A complete guide to image compression for web performance, covering formats, compression ratios, Core Web Vitals, lazy loading, and delivery strategy.",
    excerpt: "A complete guide to image compression for web performance, covering formats, compression ratios, Core Web Vitals, lazy loading, and delivery strategy.",
    publishedAt: "2026-04-02",
    readTime: "12 min read",
    category: "SEO",
    tags: ["Web Performance", "Image Compression"],
    keywords: ["compress images for website speed", "image compression guide", "Core Web Vitals images", "web performance images", "LCP image optimization"],
    toolLinks: [
      { href: "/image-compressor", label: "Image Compressor" },
      { href: "/image-to-webp", label: "Image to WebP" },
      { href: "/image-resizer", label: "Image Resizer" },
    ],
    popular: true,
    faq: [
      {
        question: "What image format is best for website speed?",
        answer: "WebP is usually the best default for web delivery because it keeps visual quality high at smaller file sizes than older formats in many common use cases.",
      },
      {
        question: "Should I resize images before uploading them?",
        answer: "Yes. Serving oversized images wastes bandwidth and slows rendering, so resize to the display dimensions first and then compress the final asset.",
      },
    ],
  }),
  buildPost({
    slug: "how-to-compress-images-for-web",
    title: "How to Compress Images for Web Without Losing Quality",
    description: "Learn best practices for compressing JPG, PNG, and WebP images to improve page speed and Core Web Vitals without sacrificing visual quality.",
    excerpt: "Learn best practices for compressing JPG, PNG, and WebP images to improve page speed and Core Web Vitals without sacrificing visual quality.",
    publishedAt: "2026-04-01",
    readTime: "5 min read",
    category: "SEO",
    tags: ["Image Compression", "Web Performance"],
    keywords: ["compress images for web", "image compression without losing quality", "JPG PNG WebP optimization", "website image optimization", "reduce image size for web"],
    toolLinks: [
      { href: "/image-compressor", label: "Image Compressor" },
      { href: "/image-to-webp", label: "Image to WebP" },
      { href: "/image-resizer", label: "Image Resizer" },
    ],
    popular: true,
  }),
  buildPost({
    slug: "jpg-vs-png-vs-webp-which-format",
    title: "JPG vs PNG vs WebP - Which Image Format Should You Use?",
    description: "A complete guide to choosing the right image format for photography, graphics, web performance, transparency, and modern delivery.",
    excerpt: "A complete guide to choosing the right image format for photography, graphics, web performance, transparency, and modern delivery.",
    publishedAt: "2026-03-28",
    readTime: "7 min read",
    category: "Image Tools",
    tags: ["Image Formats", "Web Development"],
    keywords: ["JPG vs PNG vs WebP", "best image format", "PNG transparency", "WebP for websites", "JPG photo format"],
    toolLinks: [
      { href: "/jpg-to-png", label: "JPG to PNG" },
      { href: "/png-to-jpg", label: "PNG to JPG" },
      { href: "/image-to-webp", label: "Image to WebP" },
    ],
    popular: true,
  }),
  buildPost({
    slug: "how-to-merge-pdf-files-online",
    title: "How to Merge PDF Files Online for Free - Step by Step Guide",
    description: "Combine multiple PDF documents into one file without installing software. Learn how to merge contracts, invoices, and reports securely in your browser.",
    excerpt: "Combine multiple PDF documents into one file without installing software. Learn how to merge contracts, invoices, and reports securely in your browser.",
    publishedAt: "2026-03-25",
    readTime: "4 min read",
    category: "PDF Tools",
    tags: ["PDF Tools", "Productivity"],
    keywords: ["merge PDF files online free", "combine PDFs", "PDF merger browser", "join PDF documents", "merge reports into one PDF"],
    toolLinks: [
      { href: "/pdf-merge", label: "PDF Merge" },
      { href: "/pdf-split", label: "PDF Split" },
      { href: "/pdf-compress", label: "Compress PDF" },
    ],
    popular: true,
  }),
  buildPost({
    slug: "remove-image-background-with-ai",
    title: "How to Remove Image Backgrounds with AI - Free Online Tool",
    description: "Remove backgrounds from product photos, headshots, and logos instantly using AI. Learn how browser-based background removal works and get better results.",
    excerpt: "Remove backgrounds from product photos, headshots, and logos instantly using AI. Learn how browser-based background removal works and get better results.",
    publishedAt: "2026-03-22",
    readTime: "4 min read",
    category: "Image Tools",
    tags: ["AI Tools", "Image Editing"],
    keywords: ["remove image background", "AI background remover", "transparent background", "product photo background removal", "browser background remover"],
    toolLinks: [
      { href: "/background-remover", label: "Background Remover" },
      { href: "/image-upscaler", label: "Image Upscaler" },
      { href: "/image-watermark", label: "Image Watermark" },
    ],
    popular: true,
  }),
  buildPost({
    slug: "optimize-images-for-seo",
    title: "Image Optimization for SEO - Complete Guide for 2026",
    description: "Boost search visibility with properly optimized images. Learn about compression, alt text, lazy loading, next-gen formats, and Core Web Vitals.",
    excerpt: "Boost search visibility with properly optimized images. Learn about compression, alt text, lazy loading, next-gen formats, and Core Web Vitals.",
    publishedAt: "2026-03-18",
    readTime: "8 min read",
    category: "SEO",
    tags: ["SEO", "Web Performance"],
    keywords: ["image optimization for SEO", "image SEO guide", "compress images for Google", "Core Web Vitals images", "alt text best practices"],
    toolLinks: [
      { href: "/image-compressor", label: "Image Compressor" },
      { href: "/image-to-webp", label: "Image to WebP" },
      { href: "/background-remover", label: "Background Remover" },
    ],
    popular: true,
    faq: [
      {
        question: "Do image filenames and alt text affect SEO?",
        answer: "Yes. Descriptive filenames and helpful alt text give search engines stronger context about what the image shows and how it relates to the page topic.",
      },
      {
        question: "Should every image on a page be lazy-loaded?",
        answer: "No. Above-the-fold images should load eagerly when they contribute to the initial experience, while below-the-fold images should usually be lazy-loaded.",
      },
    ],
  }),
  buildPost({
    slug: "convert-word-to-pdf-free",
    title: "How to Convert Word Documents to PDF for Free Online",
    description: "Convert DOC and DOCX files to PDF without Microsoft Office. Keep formatting intact and share universally readable documents.",
    excerpt: "Convert DOC and DOCX files to PDF without Microsoft Office. Keep formatting intact and share universally readable documents.",
    publishedAt: "2026-03-15",
    readTime: "3 min read",
    category: "PDF Tools",
    tags: ["PDF Tools", "Document Conversion"],
    keywords: ["convert Word to PDF free", "DOCX to PDF online", "Word document PDF", "Word to PDF no Office", "document conversion browser"],
    toolLinks: [
      { href: "/word-to-pdf", label: "Word to PDF" },
      { href: "/pdf-to-word", label: "PDF to Word" },
      { href: "/pdf-compress", label: "Compress PDF" },
    ],
  }),
];

export const blogPostsBySlug = new Map(blogPosts.map((post) => [post.slug, post]));

export const blogPostsSorted = [...blogPosts].sort((a, b) =>
  b.publishedAt.localeCompare(a.publishedAt)
);

export function getBlogPost(slug: string) {
  return blogPostsBySlug.get(slug);
}

export function getBlogPostUrl(slug: string) {
  return `${BLOG_URL}/${slug}`;
}

export function getCategorySlug(category: string) {
  return category.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function getCategoryUrl(category: string) {
  return `${BLOG_URL}/category/${getCategorySlug(category)}`;
}

export const blogCategories = Array.from(
  new Map(blogPosts.map((post) => [getCategorySlug(post.category), post.category])).entries()
).map(([slug, name]) => ({ slug, name }));

export function getPostsByCategory(categorySlug: string) {
  return blogPostsSorted.filter((post) => getCategorySlug(post.category) === categorySlug);
}

export function getRelatedPosts(slug: string, limit = 3) {
  const current = getBlogPost(slug);
  if (!current) return [];

  return blogPostsSorted
    .filter((post) => post.slug !== slug)
    .map((post) => {
      let score = 0;
      if (post.category === current.category) score += 3;
      score += post.tags.filter((tag) => current.tags.includes(tag)).length * 2;
      score += post.keywords.filter((keyword) => current.keywords.includes(keyword)).length;
      if (post.popular) score += 1;
      return { post, score };
    })
    .sort((a, b) => b.score - a.score || b.post.publishedAt.localeCompare(a.post.publishedAt))
    .slice(0, limit)
    .map(({ post }) => post);
}

export function getPreviousAndNextPosts(slug: string) {
  const index = blogPostsSorted.findIndex((post) => post.slug === slug);
  if (index === -1) return { previous: null, next: null };
  return {
    previous: blogPostsSorted[index + 1] ?? null,
    next: blogPostsSorted[index - 1] ?? null,
  };
}

export function getLatestPosts(limit = 4) {
  return blogPostsSorted.slice(0, limit);
}

export function getPopularPosts(limit = 4) {
  return blogPostsSorted.filter((post) => post.popular).slice(0, limit);
}
