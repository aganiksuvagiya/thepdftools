import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import SeoReferences from "@/components/SeoReferences";
import { buildOrganizationSchema, buildPageMetadata, buildWebsiteSchema } from "@/lib/seo-page";
import { getLastUpdated } from "@/lib/last-updated";

const ImageCompressorClient = dynamic(
  () => import("../image-compressor/ImageCompressorClient"),
  { ssr: false, loading: () => <div className="h-64 animate-pulse rounded-xl bg-slate-100" /> }
);

const SITE_URL = "https://thepdftools.site";
const PAGE_URL = `${SITE_URL}/compress-image-to-100kb`;

const pageTitle = "Compress Image to 100KB Online Free — Reduce Image Size";
const pageDescription =
  "Compress a JPG, PNG, or WebP image to under 100KB in your browser. Set an exact target size, resize dimensions, and switch output format — no upload, no signup.";

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
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
    "passport photo size compressor",
    "compress image for government form",
  ],
  imageAlt: "Image compressor tool set to a 100KB target file size",
});

const howToSteps = [
  {
    name: "Add your image",
    text: "Open the compressor above and drop in a JPG, PNG, or WebP file, or click to browse for one.",
  },
  {
    name: "Switch to Target Size mode",
    text: "Select \"Target Size\" instead of \"Quality\" and set the number field to 100 KB — this is the tool's default.",
  },
  {
    name: "Set dimensions if the form also limits pixels",
    text: "If the portal also caps width or height (common for passport and ID photos), enter Max Width / Max Height before compressing.",
  },
  {
    name: "Compress and review",
    text: "Click Compress Image and compare the original and compressed previews, the size badges, and the percentage saved.",
  },
  {
    name: "Download or adjust",
    text: "Download the file if it's under 100KB and still readable. If it's still too large, lower the target size slightly and compress again.",
  },
] as const;

const faqItems = [
  {
    q: "How do I compress an image to exactly 100KB?",
    a: "Use Target Size mode instead of the quality slider. Set the number field to 100 and click Compress Image. The tool works backward from a target file size instead of asking you to guess a quality percentage.",
  },
  {
    q: "Why is my compressed file 98KB one time and 104KB the next?",
    a: "Target Size mode approximates the target — it doesn't guarantee an exact byte count, because compression size depends on the image's own content (detail, noise, color range), not just the setting. If a portal enforces a hard 100KB ceiling, aim slightly under it (85–95KB) rather than exactly at 100.",
  },
  {
    q: "Which image formats can this tool compress?",
    a: "Upload is limited to JPG, JPEG, PNG, and WebP. Output can be JPEG, PNG, WebP, or the original format. GIF, BMP, TIFF, and AVIF are not supported as inputs or outputs by this tool.",
  },
  {
    q: "Should I use Quality mode or Target Size mode?",
    a: "Use Target Size mode when a form or portal states an exact KB limit, like 100KB. Use Quality mode when you just want a smaller file in general and don't have a strict number to hit.",
  },
  {
    q: "Does compressing an image to 100KB ruin the quality?",
    a: "It depends on the source. A high-resolution photo usually still looks sharp at 100KB because there's detail to spare. A small or already-compressed image can show visible blur or blockiness at that size — check the preview before downloading either way.",
  },
  {
    q: "Why do government portals and forms require images under 100KB?",
    a: "Government portals, visa applications, and scholarship or job portals often set small size limits to keep their upload infrastructure fast and cheap at scale across large numbers of applicants, not because a small file is inherently better quality.",
  },
  {
    q: "Can I compress a passport or ID photo to 100KB without losing the required dimensions?",
    a: "Yes. Set Max Width and Max Height to the pixel dimensions your form requires (for example 600x600) before compressing, so the tool resizes and compresses in the same pass instead of only shrinking file size.",
  },
  {
    q: "What's the difference between resizing and compressing?",
    a: "Resizing reduces the pixel dimensions (width and height) of the image. Compressing reduces file size at the same dimensions by simplifying color and detail data. Large photos usually need both to reach 100KB without looking soft.",
  },
  {
    q: "Why does a PNG stay bigger than a JPG at the same quality setting?",
    a: "PNG uses lossless compression, which preserves every pixel exactly and works best for screenshots, logos, and flat-color graphics. JPG uses lossy compression, which discards some detail to shrink photographic images much further. For real photos, JPG or WebP will almost always reach 100KB more easily than PNG.",
  },
  {
    q: "Should I convert my image to WebP to hit 100KB more easily?",
    a: "Yes, if the portal accepts WebP. WebP typically produces a smaller file than JPG at a visually similar quality, so switching the output format to WebP can help when JPG alone won't get under the limit. Many older government and visa portals only accept JPG, so check the requirements first.",
  },
  {
    q: "Does this tool change the aspect ratio of my image?",
    a: "No. Entering only a Max Width or only a Max Height keeps the original aspect ratio and scales proportionally. The image is not stretched or cropped.",
  },
  {
    q: "Is DPI the same thing as the 100KB file size limit?",
    a: "No. DPI (dots per inch) describes print resolution and does not directly control file size on its own. File size limits like 100KB are almost always about the encoded byte size of the file, which this tool controls directly through pixel dimensions and compression quality.",
  },
  {
    q: "Can I compress multiple images to 100KB at once?",
    a: "Not on this page. The tool processes one image at a time. For several files, repeat the same Target Size setting for each one, or use the image resizer first if you also need to batch-adjust dimensions.",
  },
  {
    q: "Does this tool upload my photo to a server?",
    a: "No. Compression runs in your browser using a Web Worker, so the image file itself is never sent over the network to complete the compression. This matters for ID photos, passport scans, and other sensitive images.",
  },
  {
    q: "Is my image stored anywhere after I close the tab?",
    a: "No. The tool keeps the file in the browser's memory for the current session only. Closing or refreshing the tab clears it, and nothing is saved to a server-side account or database.",
  },
  {
    q: "Can I use this on my phone to compress a photo to 100KB?",
    a: "Yes. The tool works in modern mobile browsers. Very high-resolution phone photos (12MP or more) may take a few extra seconds to process because the compression happens on the device itself rather than a remote server.",
  },
  {
    q: "Why does my image still look large after I compress it repeatedly?",
    a: "Recompressing an already-compressed JPG repeatedly causes generation loss — visible artifacts appear with little further size reduction. Always compress from the original, uncompressed source photo rather than re-running the tool on its own output.",
  },
  {
    q: "What's a realistic starting file size for smartphone photos?",
    a: "Modern phone cameras commonly produce photos in the low single-digit megabytes. Reaching 100KB from that size typically requires meaningful compression and often a reduction in pixel dimensions, not just a quality tweak.",
  },
  {
    q: "Will lowering quality below 40% ever be worth it?",
    a: "Rarely for photos with faces or fine detail — visible blockiness usually appears first. It can be acceptable for simple graphics or documents where fine detail doesn't matter as much. Always check the preview rather than assuming a percentage is safe.",
  },
  {
    q: "Why did my file get bigger after I \"compressed\" it?",
    a: "This can happen if the source file was already highly compressed (for example, a JPG re-saved from a screenshot) and you selected a high quality setting or switched to PNG, which doesn't shrink photographic content well. Lower the quality setting or switch to JPG/WebP output instead.",
  },
  {
    q: "Does this tool remove EXIF data like GPS location from my photo?",
    a: "Re-encoding an image during compression typically strips embedded EXIF metadata such as camera model and GPS coordinates, which is a privacy-positive side effect for photos you're submitting to a third-party form. If EXIF removal is the only thing you need, verify the specific metadata fields your use case cares about, since encoders can vary.",
  },
  {
    q: "What image formats are best for reaching 100KB?",
    a: "JPG and WebP compress photographic content most efficiently. PNG is better reserved for graphics, screenshots, and images with transparency, since it will struggle to reach 100KB on a detailed photo without heavy downscaling.",
  },
  {
    q: "Can I compress a screenshot to 100KB the same way as a photo?",
    a: "Yes, but a screenshot with flat colors and text usually compresses well as PNG already. If it's still over 100KB, converting to JPG or WebP with a moderate quality setting will typically shrink it further, at some cost to sharp text edges.",
  },
  {
    q: "What should I do if my form rejects the file even though it shows under 100KB?",
    a: "Some portals check pixel dimensions, file format, or a stricter internal limit in addition to file size. Re-check the form's exact requirements for format (JPG only, for example) and dimensions, and set Max Width/Max Height accordingly before recompressing.",
  },
] as const;

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      name: pageTitle,
      url: PAGE_URL,
      description: pageDescription,
      inLanguage: "en-US",
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
      },
    },
    {
      "@type": "SoftwareApplication",
      name: "Compress Image to 100KB",
      applicationCategory: "MultimediaApplication",
      operatingSystem: "Any",
      browserRequirements: "Requires JavaScript and a modern browser.",
      isAccessibleForFree: true,
      mainEntityOfPage: PAGE_URL,
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "Compress JPG, PNG, or WebP images entirely in the browser",
        "Set an exact target file size in KB, such as 100KB",
        "Adjust a quality percentage as an alternative to a target size",
        "Resize maximum width and height before compression",
        "Convert output between JPEG, PNG, WebP, or keep the original format",
        "Preview the original and compressed image side by side with size and percentage saved",
      ],
      description: pageDescription,
      url: PAGE_URL,
    },
    {
      "@type": "HowTo",
      name: "How to compress an image to under 100KB",
      description: "A workflow for reducing a JPG, PNG, or WebP image to a specific target file size such as 100KB.",
      step: howToSteps.map((step, index) => ({
        "@type": "HowToStep",
        position: index + 1,
        name: step.name,
        text: step.text,
      })),
    },
    {
      "@type": "FAQPage",
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
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
            <span className="h-1 w-1 rounded-full bg-slate-300" />
            <span>Verified against the live compressor</span>
          </div>
          <p className="mt-3 text-base leading-7 text-slate-600">
            Reduce a JPG, PNG, or WebP image to under 100KB for government forms,
            visa and passport photo uploads, job applications, college
            admissions, and email attachments. Set 100 in the tool&apos;s{" "}
            <strong>Target Size</strong> field below and it compresses toward
            that number directly — no need to guess a quality percentage. The
            whole process runs in your browser; the file is never uploaded to a
            server.
          </p>

          <div className="mt-6">
            <ImageCompressorClient />
          </div>
        </div>

        {/* What is this tool */}
        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-slate-950">What This Tool Actually Does</h2>
          <div className="mt-4 space-y-4 text-[15px] leading-8 text-slate-600">
            <p>
              This is the same browser-based image compressor used across
              thepdftools, pre-configured around one specific job: getting a
              photo or graphic under a 100KB ceiling, the single most common
              upload limit on government portals, job application systems, and
              admissions forms. It supports two ways to get there — a quality
              slider for general size reduction, and a <strong>Target Size</strong>{" "}
              mode where you type the exact KB you need and the tool works
              backward from that number. The number field defaults to 100 for
              exactly this reason.
            </p>
            <p>
              You can also set a maximum width and height before compressing,
              which matters for forms that check both file size and pixel
              dimensions (passport and ID photo rules are the most common
              example), and switch the output format between JPEG, PNG, and
              WebP depending on what the destination portal will accept.
            </p>
          </div>
        </section>

        {/* Why use / Features / Benefits */}
        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-slate-950">Why Use a Target-Size Compressor Instead of a Generic One</h2>
          <div className="mt-4 space-y-4 text-[15px] leading-8 text-slate-600">
            <p>
              Most online image compressors only offer a quality percentage,
              which means trial and error: compress, check the size, adjust,
              repeat. When the form's requirement is a specific number — 100KB,
              200KB, 50KB — that back-and-forth wastes time. Setting a target
              size directly removes the guessing step.
            </p>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              { title: "Exact target size", text: "Type 100 (or any KB value) and the tool compresses toward that number instead of an abstract quality percentage." },
              { title: "Quality mode as a fallback", text: "Switch to a manual quality slider when you want general size reduction without a strict number." },
              { title: "Resize before compressing", text: "Set max width/height in the same pass for forms that also enforce pixel dimensions." },
              { title: "Format switching", text: "Output as JPEG, PNG, or WebP — useful when the source format won't reach the limit efficiently." },
              { title: "Side-by-side preview", text: "Compare original vs. compressed image and see the exact size and percentage saved before downloading." },
              { title: "No upload, no signup", text: "Processing happens in a browser Web Worker; the image file is not sent to a server to be compressed." },
            ].map((item) => (
              <div key={item.title} className="rounded-xl bg-slate-50 p-5">
                <h3 className="text-base font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Step-by-step guide */}
        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-slate-950">How to Get Your Image Under 100KB</h2>
          <div className="mt-4 space-y-4 text-[15px] leading-8 text-slate-600">
            <p>
              Most smartphone photos start in the low single-digit megabytes —
              far above 100KB. Here is the fastest accurate path, using the
              tool&apos;s own Target Size mode rather than manual guesswork.
            </p>

            <h3 className="text-base font-bold text-slate-900 mt-4">Step-by-step guide</h3>
            <ol className="list-inside list-decimal space-y-2">
              {howToSteps.map((step) => (
                <li key={step.name}>
                  <strong>{step.name}.</strong> {step.text}
                </li>
              ))}
            </ol>

            <h3 className="text-base font-bold text-slate-900 mt-4">Quality mode reference (if you skip Target Size)</h3>
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-2.5 text-left font-semibold text-slate-700">Quality</th>
                    <th className="px-4 py-2.5 text-left font-semibold text-slate-700">Best For</th>
                    <th className="px-4 py-2.5 text-left font-semibold text-slate-700">Typical Result*</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    ["80–90%", "Web images, email sharing", "200–500KB"],
                    ["60–75%", "Form uploads, portals", "80–150KB"],
                    ["40–60%", "Very strict size limits", "40–80KB"],
                    ["Below 40%", "Rarely worth it for photos", "Visible quality loss"],
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
            <p className="text-xs text-slate-400">
              *Actual results vary by image content and resolution — a busy,
              detailed photo compresses less efficiently than a simple one at
              the same setting. Use Target Size mode if you need a specific
              number rather than an estimate.
            </p>
          </div>
        </section>

        {/* Real-life examples */}
        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-slate-950">Real-World Examples</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {[
              "A 3–5MB phone photo for a visa application portal that caps uploads at 100KB and requires JPG only — set output format to JPEG and Target Size to 100.",
              "A passport-style photo that must be both under 100KB and exactly 600x600 pixels — set Max Width and Max Height to 600 before compressing.",
              "A scanned ID card saved as PNG that's still 400KB after a first pass — switching output format to JPG or WebP usually clears the limit without a second resize.",
              "A product photo for a marketplace listing capped at 100KB where sharpness matters more than for a form photo — start at 75–80% quality mode and check the preview before dropping lower.",
            ].map((item) => (
              <div key={item} className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm leading-7 text-slate-600">{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Common mistakes / Best practices / Expert tips */}
        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
            <h2 className="text-xl font-bold text-slate-950">Common Mistakes</h2>
            <ul className="mt-4 list-inside list-disc space-y-3 text-[15px] leading-7 text-slate-600">
              <li>Using the quality slider and guessing repeatedly instead of switching to Target Size mode.</li>
              <li>Recompressing an already-compressed JPG instead of starting from the original photo, which causes visible artifacts with little size benefit.</li>
              <li>Ignoring a form's pixel-dimension requirement and only checking file size.</li>
              <li>Keeping PNG output for a detailed photo when JPG or WebP would reach 100KB far more easily.</li>
              <li>Assuming exactly 100.0KB is guaranteed — aim slightly under a hard limit to leave margin.</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
            <h2 className="text-xl font-bold text-slate-950">Best Practices &amp; Expert Tips</h2>
            <ul className="mt-4 list-inside list-disc space-y-3 text-[15px] leading-7 text-slate-600">
              <li>Set Target Size to 90–95KB, not exactly 100, when a portal enforces a hard ceiling.</li>
              <li>Check both file size and pixel dimensions before submitting to a government or admissions portal.</li>
              <li>Prefer JPG or WebP over PNG for photographic content when the destination accepts either.</li>
              <li>Compress from the original file, never from a previously compressed output.</li>
              <li>Use the side-by-side preview to catch visible quality loss before downloading, not after submission.</li>
            </ul>
          </div>
        </section>

        {/* Troubleshooting */}
        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-slate-950">Troubleshooting</h2>
          <div className="mt-4 space-y-4 text-[15px] leading-8 text-slate-600">
            <p>
              <strong>Output is still over 100KB:</strong> lower the Target Size
              field further, or reduce Max Width/Max Height — a smaller pixel
              count compresses more easily than a large one at any quality
              setting.
            </p>
            <p>
              <strong>Image looks noticeably blurry or blocky:</strong> the
              source photo may be too small or too detailed to reach 100KB
              cleanly. Try a slightly larger target size first, or confirm
              whether the destination portal actually requires 100KB versus a
              looser limit.
            </p>
            <p>
              <strong>Form rejects the file despite it being under 100KB:</strong>{" "}
              check the required format (many portals only accept JPG, not PNG
              or WebP) and required pixel dimensions — some systems validate
              both, not just file size.
            </p>
            <p>
              <strong>Compression is slow or the tab freezes briefly:</strong>{" "}
              this is more common with very high-resolution source photos
              (12MP+) on older phones, since processing happens on your device.
              Reducing Max Width/Height first can speed this up.
            </p>
          </div>
        </section>

        {/* Use cases */}
        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-slate-950">Who Needs a 100KB Image</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {[
              { title: "Government forms & visas", text: "Passport applications, visa portals, and public-sector uploads frequently cap photo size at 100KB and specify exact pixel dimensions." },
              { title: "Job & college applications", text: "Application portals for jobs, scholarships, and admissions often enforce small photo and document limits to keep infrastructure costs down at scale." },
              { title: "Email attachments", text: "Keeping a photo under 100KB avoids attachment size warnings and bounced messages on strict corporate mail servers." },
              { title: "Website & product listing optimization", text: "Marketplace and e-commerce platforms with size caps benefit from a specific target rather than a rough quality guess." },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="text-base font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Privacy, Security, Limitations, Trust */}
        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
            <h2 className="text-xl font-bold text-slate-950">Privacy &amp; Security</h2>
            <p className="mt-4 text-[15px] leading-8 text-slate-600">
              Compression runs in a browser Web Worker on your own device. The
              image file is not sent to a server as part of the compression
              step, which matters for passport photos, ID scans, and other
              sensitive images. Re-encoding during compression also typically
              strips embedded EXIF metadata such as camera model and GPS
              coordinates.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
            <h2 className="text-xl font-bold text-slate-950">Tool Limitations</h2>
            <ul className="mt-4 list-inside list-disc space-y-2 text-[15px] leading-7 text-slate-600">
              <li>Accepts JPG, PNG, and WebP only — no GIF, BMP, TIFF, or AVIF.</li>
              <li>Processes one image at a time; no batch upload.</li>
              <li>Target Size mode approximates the target closely but cannot guarantee an exact byte count.</li>
              <li>Very large source photos may take longer on older or lower-powered devices.</li>
            </ul>
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-brand-100 bg-brand-50 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-slate-950">Why Trust This Page</h2>
          <p className="mt-3 text-[15px] leading-7 text-slate-600">
            This page is written and maintained by the thepdftools editorial
            team and is checked directly against the live compressor's
            behavior — the feature list, modes, and limitations described here
            match what the tool above actually does, not a generic description
            of image compression in the abstract.
          </p>
        </section>

        {/* FAQ */}
        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm" aria-labelledby="faq-heading">
          <h2 id="faq-heading" className="text-xl font-bold text-slate-950 mb-4">Frequently Asked Questions</h2>
          <div className="divide-y divide-slate-100">
            {faqItems.map((item) => (
              <details key={item.q} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[15px] font-semibold text-slate-900 hover:text-brand-700 [&::-webkit-details-marker]:hidden">
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
              { href: "/image-compressor", label: "Image Compressor (general)" },
              { href: "/image-resizer", label: "Resize Image" },
              { href: "/image-to-webp", label: "Convert Image to WebP" },
              { href: "/jpg-to-png", label: "JPG to PNG" },
              { href: "/png-to-jpg", label: "PNG to JPG" },
              { href: "/compress-pdf-to-100kb", label: "Compress PDF to 100KB" },
              { href: "/image-tools", label: "All Image Tools →" },
            ].map((t) => (
              <Link key={t.href} href={t.href} className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-brand-300 hover:text-brand-700">
                {t.label}
              </Link>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="mt-8 rounded-2xl border border-brand-100 bg-brand-50 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-slate-950">Also Need to Compress a PDF to 100KB?</h2>
          <p className="mt-3 max-w-2xl text-[15px] leading-7 text-slate-600">
            Government and application forms that cap image uploads at 100KB
            often apply the same limit to PDF attachments. Use the PDF
            compressor next if your submission includes both a photo and a
            document.
          </p>
          <Link
            href="/compress-pdf-to-100kb"
            className="mt-5 inline-flex rounded-lg bg-brand-700 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-800"
          >
            Compress PDF to 100KB
          </Link>
        </section>

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
