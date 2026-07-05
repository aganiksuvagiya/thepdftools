import { promises as fs } from "fs";
import path from "path";
import { MetadataRoute } from "next";
import { blogCategories, blogPostsSorted, getCategoryUrl } from "@/lib/blog";

const BASE_URL = "https://thepdftools.site";
const APP_DIR = path.join(process.cwd(), "app");
const EXCLUDED_ROUTES = new Set([
  "/convert-jpeg-to-png-online-free",
  "/convert-png-to-jpg-online-free",
]);

export const revalidate = 3600;

type ChangeFrequency = "daily" | "weekly" | "monthly";

type RouteRule = {
  changeFrequency: ChangeFrequency;
  priority: number;
};

const EXACT_RULES: Record<string, RouteRule> = {
  "": { changeFrequency: "daily", priority: 1 },
  "/pdf-tools": { changeFrequency: "weekly", priority: 0.98 },
  "/image-tools": { changeFrequency: "weekly", priority: 0.97 },
  "/developer-tools": { changeFrequency: "weekly", priority: 0.96 },
  "/generators": { changeFrequency: "weekly", priority: 0.95 },
  "/document-tools": { changeFrequency: "weekly", priority: 0.95 },
  "/utility-tools": { changeFrequency: "weekly", priority: 0.94 },
  "/blog": { changeFrequency: "weekly", priority: 0.85 },
  "/site-map": { changeFrequency: "weekly", priority: 0.83 },
  "/smallpdf-vs-thepdftools": { changeFrequency: "monthly", priority: 0.85 },
  "/ilovepdf-alternative": { changeFrequency: "monthly", priority: 0.85 },
  "/about": { changeFrequency: "monthly", priority: 0.6 },
  "/privacy": { changeFrequency: "monthly", priority: 0.5 },
};

const PDF_ROUTE_PATTERNS = new Set([
  "/word-counter",
  "/word-to-pdf",
  "/excel-to-pdf",
  "/ppt-to-pdf",
  "/html-to-pdf",
  "/markdown-to-pdf",
  "/text-to-pdf",
  "/screenshot-to-pdf",
  "/image-to-pdf",
  "/jpg-to-pdf",
  "/scanned-pdf-to-searchable-pdf",
  "/compress-pdf-to-100kb",
  "/compress-pdf-to-200kb",
  "/compress-pdf-for-govt-exam",
  "/reduce-pdf-size-online-free",
]);

const IMAGE_ROUTE_PATTERNS = new Set([
  "/png-to-jpg",
  "/png-to-jpg-for-photos",
  "/png-to-jpg-white-background",
  "/convert-png-to-jpg-online-free",
  "/jpg-to-png",
  "/jpg-to-png-no-upload",
  "/jpg-to-png-for-logos",
  "/convert-jpeg-to-png-online-free",
  "/image-compressor",
  "/image-resizer",
  "/image-cropper",
  "/image-rotate",
  "/image-watermark",
  "/image-upscaler",
  "/image-to-webp",
  "/background-remover",
  "/svg-to-png",
  "/heic-to-jpg",
  "/video-to-gif",
  "/compress-image-to-100kb",
]);

const DEVELOPER_ROUTE_PATTERNS = new Set([
  "/json-formatter",
  "/csv-to-json",
  "/base64",
  "/url-encoder",
  "/regex-tester",
  "/timestamp-converter",
  "/tailwind-colors",
  "/color-picker",
  "/color-gradient",
  "/favicon-generator",
]);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pageFiles = await collectPageFiles(APP_DIR);

  const pageEntries = await Promise.all(
    pageFiles
      .filter((filePath) => !EXCLUDED_ROUTES.has(toRoutePath(filePath)))
      .map(async (filePath) => {
      const routePath = toRoutePath(filePath);
      const routeDir = path.dirname(filePath);
      const lastModified = await getLatestModifiedAt(routeDir);
      const rule = resolveRouteRule(routePath);

      return {
        url: `${BASE_URL}${routePath}`,
        lastModified,
        changeFrequency: rule.changeFrequency,
        priority: rule.priority,
      };
    })
  );

  const blogEntries: MetadataRoute.Sitemap = blogPostsSorted.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(`${post.updatedAt}T00:00:00Z`),
    changeFrequency: "monthly",
    priority: 0.82,
  }));

  const categoryEntries: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/blog/category`,
      lastModified: new Date(`${blogPostsSorted[0]?.updatedAt ?? "2026-01-01"}T00:00:00Z`),
      changeFrequency: "weekly",
      priority: 0.74,
    },
    ...blogCategories.map((category) => ({
      url: getCategoryUrl(category.name),
      lastModified: new Date(
        `${blogPostsSorted.find((post) => post.category === category.name)?.updatedAt ?? "2026-01-01"}T00:00:00Z`
      ),
      changeFrequency: "weekly" as const,
      priority: 0.72,
    })),
  ];

  const entries = dedupeByUrl([
    ...pageEntries,
    ...blogEntries,
    ...categoryEntries,
  ]);

  return entries.sort((a, b) => {
    if (a.url === `${BASE_URL}`) return -1;
    if (b.url === `${BASE_URL}`) return 1;
    return a.url.localeCompare(b.url);
  });
}

async function collectPageFiles(dir: string): Promise<string[]> {
  const dirents = await fs.readdir(dir, { withFileTypes: true });
  const files: string[] = [];

  for (const dirent of dirents) {
    const fullPath = path.join(dir, dirent.name);

    if (dirent.isDirectory()) {
      if (shouldSkipDirectory(dirent.name)) continue;
      files.push(...(await collectPageFiles(fullPath)));
      continue;
    }

    if (dirent.isFile() && dirent.name === "page.tsx") {
      files.push(fullPath);
    }
  }

  return files;
}

function shouldSkipDirectory(name: string) {
  return name.startsWith("_") || name.startsWith("@") || (name.startsWith("[") && name.endsWith("]"));
}

function toRoutePath(filePath: string) {
  const relative = path.relative(APP_DIR, filePath).replace(/\\/g, "/");
  const withoutPage = relative.replace(/\/page\.tsx$/, "").replace(/^page\.tsx$/, "");
  const cleanSegments = withoutPage
    .split("/")
    .filter(Boolean)
    .filter((segment) => !segment.startsWith("(") && !segment.endsWith(")"));

  return cleanSegments.length ? `/${cleanSegments.join("/")}` : "";
}

async function getLatestModifiedAt(dir: string): Promise<Date> {
  let latest = new Date(0);
  const dirents = await fs.readdir(dir, { withFileTypes: true });

  for (const dirent of dirents) {
    const fullPath = path.join(dir, dirent.name);

    if (dirent.isDirectory()) {
      if (shouldSkipDirectory(dirent.name)) continue;
      const nested = await getLatestModifiedAt(fullPath);
      if (nested > latest) latest = nested;
      continue;
    }

    if (!dirent.isFile()) continue;

    const stats = await fs.stat(fullPath);
    const modifiedAt = stats.mtime;
    if (modifiedAt > latest) latest = modifiedAt;
  }

  return latest;
}

function resolveRouteRule(routePath: string): RouteRule {
  const exactRule = EXACT_RULES[routePath];
  if (exactRule) return exactRule;

  if (routePath.startsWith("/blog/")) {
    return { changeFrequency: "monthly", priority: 0.78 };
  }

  if (isPdfRoute(routePath)) {
    return { changeFrequency: "weekly", priority: 0.88 };
  }

  if (isImageRoute(routePath)) {
    return { changeFrequency: "weekly", priority: 0.84 };
  }

  if (isDeveloperRoute(routePath)) {
    return { changeFrequency: "weekly", priority: 0.76 };
  }

  return { changeFrequency: "monthly", priority: 0.7 };
}

function isPdfRoute(routePath: string) {
  return (
    routePath.startsWith("/pdf-") ||
    routePath.endsWith("-to-pdf") ||
    PDF_ROUTE_PATTERNS.has(routePath)
  );
}

function isImageRoute(routePath: string) {
  return (
    routePath.startsWith("/image-") ||
    routePath.includes("png") ||
    routePath.includes("jpg") ||
    routePath.includes("jpeg") ||
    routePath.includes("webp") ||
    routePath.includes("svg") ||
    routePath.includes("heic") ||
    routePath.includes("gif") ||
    routePath.includes("background") ||
    routePath.includes("watermark") ||
    IMAGE_ROUTE_PATTERNS.has(routePath)
  );
}

function isDeveloperRoute(routePath: string) {
  return (
    DEVELOPER_ROUTE_PATTERNS.has(routePath) ||
    routePath.includes("json") ||
    routePath.includes("base64") ||
    routePath.includes("regex") ||
    routePath.includes("timestamp") ||
    routePath.includes("url-encoder") ||
    routePath.includes("tailwind") ||
    routePath.includes("color-")
  );
}

function dedupeByUrl(entries: MetadataRoute.Sitemap) {
  const unique = new Map<string, MetadataRoute.Sitemap[number]>();

  for (const entry of entries) {
    unique.set(entry.url, entry);
  }

  return Array.from(unique.values());
}
