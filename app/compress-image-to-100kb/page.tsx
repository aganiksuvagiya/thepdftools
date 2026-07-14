import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import SeoReferences from "@/components/SeoReferences";
import ToolSeoGrowth from "@/components/ToolSeoGrowth";
import { buildOrganizationSchema, buildPageMetadata, buildWebsiteSchema } from "@/lib/seo-page";
import { getLastUpdated } from "@/lib/last-updated";

const ImageCompressorClient = dynamic(
  () => import("../image-compressor/ImageCompressorClient"),
  { ssr: false, loading: () => <div className="h-64 animate-pulse rounded-xl bg-slate-100" /> }
);

const SITE_URL = "https://thepdftools.site";
const PAGE_URL = `${SITE_URL}/compress-image-to-100kb`;

export const metadata: Metadata = buildPageMetadata({
  title: "Compress Image to 100KB Online Free — Reduce Image Size",
  description:
    "Compress image to under 100KB online free. Reduce JPG, PNG, and WebP file size for form uploads, email attachments, and ID submissions. No signup, no upload.",
  url: PAGE_URL,
  keywords: [
    "compress image to 100kb",
    "reduce image size to 100kb",
    "image compressor under 100kb",
    "compress photo to 100kb online free",
    "resize image to 100kb",
    "compress image for form upload",
    "jpg to 100kb online free",
    "reduce image file size to 100kb",
  ],
});

const faqItems = [
  { q: "Can I compress an image to exactly 100KB?", a: "The compressor reduces file size based on quality settings. Adjust the quality slider to get close to 100KB. Lower quality = smaller file. Check the output size before downloading." },
  { q: "What image formats can be compressed to 100KB?", a: "JPG, JPEG, PNG, and WebP are supported. JPG and WebP typically reach smaller file sizes than PNG for photo content." },
  { q: "Why does the portal or form require images under 100KB?", a: "Government portals, job applications, and college admissions often enforce file size limits to reduce storage costs and ensure fast uploads on slow connections." },
  { q: "Does compressing to 100KB affect image quality?", a: "At 60–70% quality, most images compress well below 100KB while still appearing sharp for document verification purposes. Avoid going below 40% quality for ID photos." },
  { q: "Is there a file size limit?", a: "There is no strict upload limit. The tool processes images in your browser — large original files may take a few extra seconds." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      name: "Compress Image to 100KB Online Free",
      url: PAGE_URL,
      description: "Reduce image file size to under 100KB for form uploads, email attachments, and submissions.",
    },
    {
      "@type": "HowTo",
      name: "How to Compress an Image to Under 100KB",
      description: "Reduce JPG, PNG, or WebP image file size to under 100KB online for free.",
      step: [
        { "@type": "HowToStep", position: 1, name: "Open the image compressor", text: `Go to ${PAGE_URL} and open the free image compressor.` },
        { "@type": "HowToStep", position: 2, name: "Upload your image", text: "Click the upload area or drag and drop your JPG, PNG, or WebP image." },
        { "@type": "HowToStep", position: 3, name: "Adjust quality", text: "Use the quality slider to reduce file size. Start at 70% and lower if needed." },
        { "@type": "HowToStep", position: 4, name: "Check output size", text: "The tool shows the compressed file size. Ensure it is under 100KB." },
        { "@type": "HowToStep", position: 5, name: "Download the image", text: "Click Download to save the compressed image to your device." },
      ],
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
        { "@type": "ListItem", position: 2, name: "Image Tools", item: `${SITE_URL}/image-tools` },
        { "@type": "ListItem", position: 3, name: "Compress Image to 100KB", item: PAGE_URL },
      ],
    },
    buildOrganizationSchema(),
    buildWebsiteSchema(),
  ],
};

export default function CompressImageTo100kbPage() {
  const lastUpdated = getLastUpdated("app/compress-image-to-100kb/page.tsx");
  return (
    <div className="bg-[#f8fafc] py-10 sm:py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[
          { label: "Home", href: "/" },
          { label: "Image Tools", href: "/image-tools" },
          { label: "Compress Image to 100KB" },
        ]} />

        <div className="rounded-2xl border border-slate-200 bg-white p-8 sm:p-10 shadow-sm">
          <p className="inline-flex rounded-lg bg-rose-50 px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-rose-700">
            100KB Target Workflow
          </p>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
            Compress Image to 100KB Online Free
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-slate-500">
            <span>thepdftools Editorial Team</span>
            <span className="h-1 w-1 rounded-full bg-slate-300" />
            <time dateTime={lastUpdated.date}>Updated {lastUpdated.formatted}</time>
          </div>
          <p className="mt-3 text-base leading-7 text-slate-600">
            Reduce JPG, PNG, or WebP images to under 100KB for government form uploads, job applications, college admissions, and email attachments. No upload to any server — runs entirely in your browser.
          </p>

          <div className="mt-6">
            <ImageCompressorClient />
          </div>
        </div>

        {/* Guide */}
        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-slate-950">How to Get Your Image Under 100KB</h2>
          <div className="mt-4 space-y-4 text-[15px] leading-8 text-slate-600">
            <p>
              The 100KB limit is common on government portals, visa applications, scholarship forms, and HR systems. Most smartphone photos are 2–8MB — far too large. Here is how to get them under 100KB while keeping the image readable.
            </p>

            <h3 className="text-base font-bold text-slate-900 mt-4">Step-by-step guide</h3>
            <ol className="list-inside list-decimal space-y-2">
              <li>Upload your JPG, PNG, or WebP image using the tool above</li>
              <li>Start at 70% quality — this reduces most photos to 100–200KB</li>
              <li>Check the output file size shown by the tool</li>
              <li>If still above 100KB, reduce quality to 50–60%</li>
              <li>Download and verify the image looks acceptable before submitting</li>
            </ol>

            <h3 className="text-base font-bold text-slate-900 mt-4">Quality settings guide</h3>
            <div className="overflow-hidden rounded-xl border border-slate-200">
              <table className="w-full text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-2.5 text-left font-semibold text-slate-700">Quality</th>
                    <th className="px-4 py-2.5 text-left font-semibold text-slate-700">Best For</th>
                    <th className="px-4 py-2.5 text-left font-semibold text-slate-700">Typical Result</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    ["80–90%", "Web images, email sharing", "200–500KB"],
                    ["60–75%", "Form uploads, portals", "80–150KB ✓"],
                    ["40–60%", "Very strict size limits", "40–80KB ✓"],
                    ["Below 40%", "Not recommended", "Visible quality loss"],
                  ].map(([q, use, size]) => (
                    <tr key={q} className="even:bg-slate-50/50">
                      <td className="px-4 py-2.5 font-mono text-slate-800">{q}</td>
                      <td className="px-4 py-2.5 text-slate-600">{use}</td>
                      <td className="px-4 py-2.5 text-slate-500 text-[13px]">{size}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-slate-950 mb-4">Frequently Asked Questions</h2>
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
        </section>

        {/* Related */}
        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-slate-950 mb-4">Related Tools</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { href: "/image-compressor", label: "Image Compressor" },
              { href: "/image-resizer", label: "Resize Image" },
              { href: "/compress-pdf-to-100kb", label: "Compress PDF to 100KB" },
              { href: "/jpg-to-png", label: "JPG to PNG" },
              { href: "/image-tools", label: "All Image Tools →" },
            ].map((t) => (
              <Link key={t.href} href={t.href} className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-brand-300 hover:text-brand-700">
                {t.label}
              </Link>
            ))}
          </div>
        </section>

        <ToolSeoGrowth slug="compress-image-to-100kb" />

        <SeoReferences
          links={[
            { href: "https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types", label: "MDN: image format types" },
            { href: "https://developer.mozilla.org/en-US/docs/Web/API/File", label: "MDN: browser file handling" },
            { href: "https://web.dev/learn/images/", label: "web.dev: image optimization fundamentals" },
          ]}
        />
      </main>
    </div>
  );
}
