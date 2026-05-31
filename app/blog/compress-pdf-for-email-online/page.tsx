import type { Metadata } from "next";
import Link from "next/link";
import BlogFooterLinks from "@/components/BlogFooterLinks";

const SITE_URL = "https://thepdftools.site";
const POST_URL = `${SITE_URL}/blog/compress-pdf-for-email-online`;

export const metadata: Metadata = {
  title: "How to Compress PDF for Email Online Free",
  description:
    "Learn how to compress a PDF for email online for free. Reduce PDF file size under Gmail, Outlook, and portal attachment limits with no upload, no signup.",
  keywords: [
    "compress pdf for email",
    "reduce pdf size for email",
    "compress pdf under 25mb",
    "make pdf smaller for email",
    "pdf compressor online free no upload",
    "compress pdf no signup",
    "pdf too large for email",
    "reduce pdf file size gmail",
  ],
  openGraph: {
    title: "How to Compress PDF for Email Online Free",
    description:
      "Reduce PDF file size for Gmail, Outlook, and upload forms. Free online PDF compression with no upload and no signup.",
    url: POST_URL,
    type: "article",
    publishedTime: "2026-04-14T00:00:00Z",
    authors: ["thepdftools"],
    images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630, alt: "Compress PDF for email online free" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Compress PDF for Email Online Free",
    description: "Reduce PDF size for email with a free browser-based PDF compressor.",
  },
  alternates: { canonical: POST_URL },
};

const toolLink = "font-medium text-brand-600 underline decoration-brand-200 hover:text-brand-700 hover:decoration-brand-400 transition-colors";

const faqItems = [
  { q: "What is the Gmail attachment size limit?", a: "Gmail allows attachments up to 25MB. For files larger than 25MB, Gmail automatically uploads to Google Drive and shares a link instead." },
  { q: "What is the Outlook attachment limit?", a: "Outlook.com allows attachments up to 20MB. Office 365 business accounts may allow up to 150MB depending on admin settings." },
  { q: "How much can I compress a PDF?", a: "A scanned PDF with images can often be compressed 50–80%. A text-only PDF may only compress 10–20% since the content is already efficiently encoded." },
  { q: "Does compressing reduce quality?", a: "Medium compression keeps text sharp and images readable. Maximum compression may reduce image quality slightly but text remains readable." },
  { q: "Is the compressor free?", a: "Yes. The PDF Compressor on thepdftools.site is completely free with no signup, no watermarks, and no file upload to any server." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BlogPosting",
      headline: "How to Compress PDF for Email Online Free",
      description: "Learn how to compress a PDF for email online for free with no upload, no signup, and no watermark.",
      url: POST_URL,
      datePublished: "2026-04-14T00:00:00Z",
      dateModified: "2026-05-30T00:00:00Z",
      author: { "@type": "Organization", name: "thepdftools", url: SITE_URL },
      publisher: { "@type": "Organization", name: "thepdftools", url: SITE_URL },
      mainEntityOfPage: { "@type": "WebPage", "@id": POST_URL },
      articleSection: "PDF Tools",
      keywords: ["compress pdf for email", "reduce pdf size for email", "compress pdf under 25mb"],
    },
    {
      "@type": "FAQPage",
      mainEntity: faqItems.map(({ q, a }) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
        { "@type": "ListItem", position: 3, name: "Compress PDF for Email", item: POST_URL },
      ],
    },
  ],
};

export default function CompressPdfForEmailOnline() {
  return (
    <div className="bg-[#f8fafc] py-10 sm:py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Link href="/blog" className="text-sm font-medium text-brand-600 hover:text-brand-700">
          &larr; Back to Blog
        </Link>

        <article className="mt-6 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            How to Compress PDF for Email Online Free
          </h1>
          <div className="mt-3 flex items-center gap-3 text-sm text-slate-400">
            <time dateTime="2026-04-14">April 14, 2026</time>
            <span className="h-1 w-1 rounded-full bg-slate-300" />
            <span>6 min read</span>
          </div>

          <div className="mt-8 space-y-6 text-[15px] leading-8 text-slate-600">
            <p>
              A large PDF can fail when you attach it to Gmail, Outlook, school portals, job applications, or client emails. The fix is simple: compress the PDF before sending. This guide shows you exactly how to do it in under a minute using a free, browser-based tool — no upload, no signup, no watermark.
            </p>

            <div className="rounded-2xl border border-brand-100 bg-brand-50 p-5">
              <p className="font-semibold text-slate-900">Quick Answer</p>
              <p className="mt-1">Open the <Link href="/pdf-compress" className={toolLink}>free PDF Compressor</Link>, upload your file, choose compression level, and download. The entire process takes under 60 seconds.</p>
            </div>

            <h2 className="text-2xl font-bold text-slate-900">Email Attachment Size Limits by Platform</h2>
            <p>Different email clients have different file size limits. Knowing the limit helps you choose the right compression level:</p>
            <div className="overflow-hidden rounded-xl border border-slate-200">
              <table className="w-full text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-slate-700">Platform</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-700">Attachment Limit</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-700">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    ["Gmail", "25 MB", "Larger files auto-upload to Drive"],
                    ["Outlook.com", "20 MB", "Business accounts may allow more"],
                    ["Yahoo Mail", "25 MB", "Per attachment"],
                    ["WhatsApp", "100 MB", "Documents category"],
                    ["Govt portals", "1–5 MB", "Varies by form — check instructions"],
                    ["Job portals", "2–10 MB", "Varies by ATS system"],
                  ].map(([platform, limit, note]) => (
                    <tr key={platform} className="even:bg-slate-50/50">
                      <td className="px-4 py-3 font-medium text-slate-800">{platform}</td>
                      <td className="px-4 py-3 text-slate-600">{limit}</td>
                      <td className="px-4 py-3 text-slate-500 text-[13px]">{note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2 className="text-2xl font-bold text-slate-900">Why PDFs Get Large</h2>
            <p>Understanding why a PDF is large helps you pick the right solution:</p>
            <ul className="list-inside list-disc space-y-2">
              <li><strong>Scanned documents</strong> — scanner saves each page as a high-res image, making files 5–20MB easily</li>
              <li><strong>Embedded fonts</strong> — full font sets included in the file instead of just the glyphs used</li>
              <li><strong>High-resolution images</strong> — product photos, charts, or screenshots at print quality</li>
              <li><strong>Metadata and revision history</strong> — editing software sometimes stores multiple versions</li>
              <li><strong>Uncompressed layers</strong> — PDFs from design tools like Illustrator or InDesign</li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900">Steps to Compress a PDF for Email</h2>
            <ol className="list-inside list-decimal space-y-3">
              <li>Open the <Link href="/pdf-compress" className={toolLink}>PDF Compressor</Link></li>
              <li>Upload your PDF — the file stays in your browser, nothing is sent to a server</li>
              <li>Choose a compression level:
                <ul className="ml-6 mt-2 list-disc space-y-1 text-[14px]">
                  <li><strong>Medium</strong> — best for most emails (reports, invoices, CVs)</li>
                  <li><strong>Maximum</strong> — use when you must meet a strict size limit (govt portals, job applications)</li>
                  <li><strong>Low</strong> — best for presentations or PDFs with important photos</li>
                </ul>
              </li>
              <li>Download the compressed PDF</li>
              <li>Check the file size — if still too large, run compression again at a higher level</li>
              <li>Attach to your email and send</li>
            </ol>

            <h2 className="text-2xl font-bold text-slate-900">When Compression Is Not Enough</h2>
            <p>
              If the PDF is a very large scanned document or a combined report, consider splitting it first. Use the <Link href="/pdf-split" className={toolLink}>PDF Split tool</Link> to extract specific pages and send only what the recipient needs. Alternatively, use <Link href="/pdf-merge" className={toolLink}>PDF Merge</Link> to combine separate compressed files into one clean document.
            </p>
            <p>
              For very large files (over 50MB), consider converting images to a lower resolution first with the <Link href="/image-compressor" className={toolLink}>Image Compressor</Link> before creating the PDF, or use the <Link href="/pdf-to-jpg" className={toolLink}>PDF to JPG</Link> tool to convert the PDF to images, compress them, and share those instead.
            </p>

            <h2 className="text-2xl font-bold text-slate-900">Frequently Asked Questions</h2>
            <div className="divide-y divide-slate-100">
              {faqItems.map((item) => (
                <details key={item.q} className="group py-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between text-[15px] font-semibold text-slate-900 hover:text-brand-700 [&::-webkit-details-marker]:hidden">
                    <span>{item.q}</span>
                    <span className="text-xl leading-none text-slate-400 transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{item.a}</p>
                </details>
              ))}
            </div>

            <div className="rounded-2xl border border-brand-100 bg-brand-50 p-5">
              <p className="font-semibold text-slate-900">Ready to compress?</p>
              <p className="mt-2">Use the <Link href="/pdf-compress" className={toolLink}>free online PDF Compressor</Link> — no upload, no signup, instant download.</p>
            </div>
          </div>
          <BlogFooterLinks />
        </article>
      </div>
    </div>
  );
}
