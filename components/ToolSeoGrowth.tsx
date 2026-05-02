import Link from "next/link";
import { getSeoTool, SITE_URL, type SeoTool } from "@/lib/seo-growth";

const linkClass =
  "rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700";

export default function ToolSeoGrowth({ slug }: { slug: string }) {
  const tool = getSeoTool(slug) ?? createFallbackTool(slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: `${tool.name} - ${tool.primaryKeyword}`,
        url: `${SITE_URL}/${tool.slug}`,
        description: tool.promise,
        mainEntity: { "@id": `${SITE_URL}/${tool.slug}#software` },
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${SITE_URL}/${tool.slug}#software`,
        name: tool.name,
        url: `${SITE_URL}/${tool.slug}`,
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        keywords: [tool.primaryKeyword, ...tool.secondaryKeywords],
        description: tool.promise,
      },
    ],
  };

  return (
    <section className="mt-14 space-y-8" aria-labelledby={`${slug}-seo-guide`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="rounded-[1.5rem] border border-brand-100 bg-white p-6 shadow-sm sm:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-700">
          No Upload Required - 100% Privacy - Instant Processing
        </p>
        <h2
          id={`${slug}-seo-guide`}
          className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
        >
          {tool.name}: private {tool.category.toLowerCase()} for {tool.primaryKeyword}
        </h2>
        <div className="mt-5 grid gap-6 text-[15px] leading-8 text-slate-600 lg:grid-cols-2">
          <p>
            People searching for <strong>{tool.primaryKeyword}</strong> usually
            want a direct result, not a signup form or a slow upload queue. This
            page is built around that intent: open the tool, add your file,
            check the result, and download the finished version. {tool.promise}
          </p>
          <p>
            The workflow is especially useful for {tool.bestFor.join(", ")}.
            It also fits long-tail searches like{" "}
            {tool.secondaryKeywords.map((keyword, index) => (
              <span key={keyword}>
                <strong>{keyword}</strong>
                {index < tool.secondaryKeywords.length - 1 ? ", " : "."}
              </span>
            ))}{" "}
            These are focused keywords with clearer user intent than broad
            head terms, which makes them better targets for steady organic
            growth.
          </p>
          <p>
            This no upload pdf tools strategy matters beyond PDF pages too: the
            site is built around browser-based tools, secure file processing,
            and clear file-task pages. Whether you need a PDF converter, image
            compressor, format changer, document utility, or quick developer
            helper, the page should answer the same search questions quickly:
            is it free, does it require signup, does it upload my file, can I
            use it on mobile, and what related tool should I open next?
          </p>
          <p>
            For SEO, this section gives each tool page a keyword-rich paragraph
            with natural phrasing instead of a stuffed list. It reinforces terms
            such as {tool.primaryKeyword}, {tool.secondaryKeywords[0]},{" "}
            browser-based tools, secure file processing, and no file upload
            required while still explaining the real workflow a visitor came to
            complete.
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_0.85fr]">
        <article className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            100% Privacy - No File Upload Required
          </h2>
          <p className="mt-3 text-[15px] leading-8 text-slate-600">
            This page supports the wider no upload pdf tools strategy across
            thepdftools. The goal is simple: give people browser-based tools
            for secure file processing without making them create an account,
            wait in a server queue, or install extra software. For private
            documents, client files, product images, student work, and business
            assets, a no upload required workflow is faster and easier to trust.
          </p>

          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            How to use {tool.name}
          </h2>
          <ol className="mt-5 space-y-4 text-[15px] leading-7 text-slate-600">
            {[
              `Open the ${tool.name} page and add the file you want to process.`,
              "Use the default setting first, then adjust quality, dimensions, page order, or output format only if the result needs it.",
              "Preview or inspect the output before downloading. Check file size, readability, image clarity, page order, and final format.",
              "Download the finished file to your device. There is no signup step and no forced software installation.",
              "Use a related tool when the file needs another pass, such as compression after conversion or merging after splitting.",
            ].map((step, index) => (
              <li key={step} className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">
                  {index + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>

          <h3 className="mt-8 text-lg font-semibold text-slate-900">
            Why this page targets long-tail traffic
          </h3>
          <p className="mt-3 text-[15px] leading-8 text-slate-600">
            Broad phrases like "PDF tools" and "image converter" are difficult
            because large brands already dominate them. The stronger plan is to
            build topic clusters around specific jobs: {tool.primaryKeyword},{" "}
            {tool.secondaryKeywords.join(", ")}. Visitors who type these
            queries are closer to action, so the page answers privacy, speed,
            signup, and quality questions before they become objections.
          </p>
          <p className="mt-3 text-[15px] leading-8 text-slate-600">
            This also strengthens internal linking. Each page points to related
            tools with descriptive anchor text, so users can move from one file
            task to the next and search engines can understand the PDF, image,
            and utility clusters across the site.
          </p>
        </article>

        <aside className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6">
          <h2 className="text-xl font-bold tracking-tight text-slate-900">
            Best for
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {tool.bestFor.map((item) => (
              <span
                key={item}
                className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-brand-700 shadow-sm"
              >
                {item}
              </span>
            ))}
          </div>

          <h3 className="mt-8 text-sm font-bold uppercase tracking-[0.16em] text-slate-500">
            Related tools
          </h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {tool.related.map((relatedSlug) => (
              <Link key={relatedSlug} href={`/${relatedSlug}`} className={linkClass}>
                {relatedSlug
                  .split("-")
                  .map((word) => word[0].toUpperCase() + word.slice(1))
                  .join(" ")}
              </Link>
            ))}
          </div>
        </aside>
      </div>

      <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          Frequently asked questions
        </h2>
        <div className="mt-5 divide-y divide-slate-100">
          {tool.faq.map((item) => (
            <details key={item.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-[15px] font-semibold text-slate-900 transition-colors hover:text-brand-700 [&::-webkit-details-marker]:hidden">
                <span>{item.q}</span>
                <span className="text-xl leading-none text-slate-400 group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm leading-7 text-slate-600">{item.a}</p>
            </details>
          ))}
        </div>
      </div>

      <div className="rounded-[1.5rem] border border-brand-100 bg-brand-50 p-6 sm:p-8">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          Ready to finish this file?
        </h2>
        <p className="mt-3 max-w-3xl text-[15px] leading-8 text-slate-600">
          Use {tool.name} now for a focused, no-signup workflow. Files stay in a
          privacy-first browser experience wherever client-side processing is
          supported.
        </p>
        <Link
          href={`/${tool.slug}`}
          className="mt-5 inline-flex rounded-lg bg-brand-700 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-800"
        >
          Try Tool Now
        </Link>
      </div>
    </section>
  );
}

function titleFromSlug(slug: string) {
  return slug
    .split("-")
    .map((word) => {
      if (word === "pdf") return "PDF";
      if (word === "jpg") return "JPG";
      if (word === "png") return "PNG";
      if (word === "webp") return "WebP";
      if (word === "svg") return "SVG";
      if (word === "html") return "HTML";
      if (word === "json") return "JSON";
      if (word === "csv") return "CSV";
      if (word === "qr") return "QR";
      if (word === "ppt") return "PPT";
      if (word === "heic") return "HEIC";
      return word[0].toUpperCase() + word.slice(1);
    })
    .join(" ");
}

function categoryForSlug(slug: string): SeoTool["category"] {
  if (slug.includes("pdf") || ["word-to-pdf", "excel-to-pdf", "ppt-to-pdf", "html-to-pdf", "markdown-to-pdf", "text-to-pdf", "screenshot-to-pdf", "invoice-generator"].includes(slug)) {
    return "PDF Tools";
  }

  if (slug.includes("image") || slug.includes("jpg") || slug.includes("png") || slug.includes("webp") || slug.includes("svg") || slug.includes("heic") || slug.includes("gif") || slug.includes("background")) {
    return "Image Tools";
  }

  return "Utilities";
}

function relatedForSlug(slug: string, category: SeoTool["category"]) {
  if (category === "PDF Tools") {
    return ["pdf-compress", "pdf-merge", "pdf-split", "pdf-to-word"].filter(
      (item) => item !== slug
    );
  }

  if (category === "Image Tools") {
    return ["image-compressor", "image-resizer", "jpg-to-png", "image-to-webp"].filter(
      (item) => item !== slug
    );
  }

  return ["json-formatter", "word-counter", "qr-generator", "base64"].filter(
    (item) => item !== slug
  );
}

function createFallbackTool(slug: string): SeoTool {
  const name = titleFromSlug(slug);
  const category = categoryForSlug(slug);
  const lowerName = name.toLowerCase();
  const primaryKeyword = `${lowerName} online free no upload`;

  return {
    slug,
    name,
    category,
    primaryKeyword,
    secondaryKeywords: [
      `${lowerName} no signup`,
      `${lowerName} browser-based tool`,
      `secure ${lowerName} online`,
    ],
    promise: `Use ${name} online free with a focused browser-based workflow for secure file processing, no signup friction, and fast results on desktop or mobile.`,
    bestFor:
      category === "PDF Tools"
        ? ["Documents", "Email attachments", "Reports", "Forms"]
        : category === "Image Tools"
          ? ["Website assets", "Social media", "Product images", "Design files"]
          : ["Quick tasks", "Developer work", "Writing", "Productivity"],
    related: relatedForSlug(slug, category),
    faq: [
      {
        q: `Is this ${name} safe to use?`,
        a: `Yes. This ${name} page is designed around browser-based tools and secure file processing, so the workflow stays simple and privacy-focused.`,
      },
      {
        q: `Does ${name} upload my files?`,
        a: `The no upload strategy means files are processed in the browser wherever the tool supports it, avoiding unnecessary server upload steps.`,
      },
      {
        q: `How do I use ${name} online free?`,
        a: `Open the page, add your file or content, check the output settings, and download the result. No signup is required.`,
      },
      {
        q: `Is this ${lowerName} tool free?`,
        a: `Yes. The tool is free to use with no account gate and no forced software installation.`,
      },
      {
        q: `Can I use ${name} on mobile?`,
        a: `Yes. The page is responsive and works in modern mobile, tablet, and desktop browsers.`,
      },
    ],
  };
}
