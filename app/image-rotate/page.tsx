import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import ToolSeoGrowth from "@/components/ToolSeoGrowth";
import Breadcrumb from "@/components/Breadcrumb";

const ImageRotateClient = dynamic(() => import("./ImageRotateClient"), {
  loading: () => <div className="card animate-pulse h-64 bg-gray-50" />,
  ssr: false,
});

export const metadata: Metadata = {
  title: "Image Rotate Online Free No Upload",
  description:
    "Rotate and flip images online free — rotate by 90°, 180°, or custom angle. Flip horizontally or vertically. Supports JPG, PNG, WebP. No upload, no signup required.",
  keywords: [
    "image rotate",
    "rotate image online",
    "flip image",
    "mirror image",
    "rotate jpg",
    "rotate png",
    "free image rotate",
    "image flip tool",
  ],
  openGraph: {
    title: "Image Rotate Online Free No Upload",
    description:
    "Rotate and flip images online free — rotate by 90°, 180°, or custom angle. Flip horizontally or vertically. Supports JPG, PNG, WebP. No upload, no signup required.",
    url: "https://thepdftools.site/image-rotate",
    images: [
      {
        url: "https://thepdftools.site/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Free Image Rotate & Flip Tool - thepdftools.site",
      },
    ],
  },
  alternates: {
    canonical: "https://thepdftools.site/image-rotate",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Free Image Rotate & Flip Tool",
      url: "https://thepdftools.site/image-rotate",
      description:
        "Rotate and flip JPG, PNG, and WebP images for free online. Rotate 90°, 180°, custom angles, flip horizontally or vertically.",
      applicationCategory: "MultimediaApplication",
      operatingSystem: "Any",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      browserRequirements: "Requires a modern web browser with JavaScript enabled",
    },
    
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://thepdftools.site" },
        { "@type": "ListItem", "position": 2, "name": "Image Tools", "item": "https://thepdftools.site/image-tools" },
        { "@type": "ListItem", "position": 3, "name": "Image Rotate", "item": "https://thepdftools.site/image-rotate" },
      ],
    },
  ],
};

export default function ImageRotatePage() {
  return (
    <div className="bg-[#f8fafc] py-10 sm:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[
          { label: "Home", href: "/" },
          { label: "Image Tools", href: "/image-tools" },
          { label: "Rotate & Flip" },
        ]} />
        {/* HERO CARD */}
        <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] shadow-[0_24px_90px_-44px_rgba(79,70,229,0.18)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(79,70,229,0.1),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.08),transparent_24%)]" />
          <div className="relative px-6 py-10 sm:px-10 sm:py-12">
            <div className="mx-auto max-w-3xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700 shadow-sm ring-1 ring-brand-100">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Image Rotate
              </div>

              <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl lg:text-[3.6rem] lg:leading-[1.02]">
                Rotate images
                <span className="block bg-gradient-to-r from-brand-600 via-secondary-600 to-tertiary-500 bg-clip-text text-transparent">
                  to any angle
                </span>
              </h1>

              <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
                Rotate JPG, PNG, and WebP images by any angle, flip horizontally or
                vertically — all instantly in your browser. No upload, no server,
                completely private.
              </p>
            </div>

            <div className="mt-8">
              <ImageRotateClient />
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                { title: "Best for orientation", text: "Fix sideways or upside-down photos with precise rotation controls." },
                { title: "Best for creativity", text: "Rotate images to any custom angle for unique compositions and layouts." },
                { title: "Best for privacy", text: "All rotation happens in your browser — images never leave your device." },
              ].map((item) => (
                <div key={item.title} className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">{item.title}</div>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_320px]">
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Quick Tips</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
              <li>Use 90° rotations to fix portrait/landscape orientation.</li>
              <li>Fine-tune rotation angle for precise alignment.</li>
              <li>Preview the result before downloading.</li>
            </ul>
          </div>
          <aside className="rounded-[1.75rem] border border-brand-100 bg-brand-50 p-6">
            <h2 className="text-lg font-semibold text-slate-900">Best For</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Photo correction", "Social media content", "Document scanning", "Creative projects"].map((item) => (
                <span key={item} className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-brand-700 shadow-sm">{item}</span>
              ))}
            </div>
          </aside>
        </div>

        <div className="mt-14 space-y-8">
          {/* How-to */}
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">How to Rotate or Flip an Image Online</h2>
            <ol className="mt-3 list-inside list-decimal space-y-2 text-sm text-slate-600">
              <li>Upload your image by dragging it into the drop zone or clicking to browse. JPG, PNG, and WebP formats are supported.</li>
              <li>Use the quick-rotate buttons to rotate your image 90 degrees clockwise or counter-clockwise, or enter any custom angle from 0 to 360 degrees.</li>
              <li>Flip the image horizontally to create a mirror image, or flip vertically to turn it upside down. Combine flips with rotation for any orientation.</li>
              <li>Preview the transformed image in real time — adjustments are applied instantly so you can fine-tune the angle before downloading.</li>
              <li>Click download to save the rotated or flipped image. Choose your preferred output format and quality level.</li>
            </ol>
          </div>

          {/* Why section */}
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Why Use Our Image Rotate &amp; Flip Tool?</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Any Angle Rotation</h3>
                <p className="mt-1 text-sm text-slate-500">Go beyond the standard 90-degree increments. Enter any custom angle from 0 to 360 degrees to straighten horizons, correct tilted scans, or create artistic compositions with pixel-level precision.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Flip Horizontal &amp; Vertical</h3>
                <p className="mt-1 text-sm text-slate-500">Mirror your image along the horizontal or vertical axis with a single click. Perfect for creating reflections, correcting selfie-mode flips, or preparing images for print transfers.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Real-Time Preview</h3>
                <p className="mt-1 text-sm text-slate-500">Every rotation and flip is rendered instantly in your browser so you can see the exact result before downloading. No guesswork, no waiting — adjust until the image looks perfect.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">No Quality Loss</h3>
                <p className="mt-1 text-sm text-slate-500">Rotations at 90, 180, and 270 degrees are lossless. Custom-angle rotations use high-quality canvas rendering to preserve maximum detail. You control the output format and compression level.</p>
              </div>
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-brand-100 bg-gradient-to-br from-brand-50 via-white to-secondary-50 p-8 shadow-sm">
            <div className="max-w-4xl">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">Featured Snippet</div>
              <h2 className="mt-3 text-2xl font-semibold text-slate-900">Rotate Image Online Free</h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                Rotate image online free by uploading your file, choosing a 90 degree, 180 degree, or custom angle, previewing the corrected orientation, and downloading the result instantly. This is the fastest way to fix sideways photos, scanned documents, social media uploads, and product images before you <Link href="/image-compressor" className="font-medium text-brand-700 underline decoration-brand-200 underline-offset-4 transition-colors hover:text-brand-800">compress image after rotating</Link>, <Link href="/image-cropper" className="font-medium text-brand-700 underline decoration-brand-200 underline-offset-4 transition-colors hover:text-brand-800">crop image after rotation</Link>, or <Link href="/png-to-jpg" className="font-medium text-brand-700 underline decoration-brand-200 underline-offset-4 transition-colors hover:text-brand-800">convert PNG to JPG</Link>.
              </p>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">Quick Answer</h2>
              <ol className="mt-4 list-inside list-decimal space-y-2 text-sm leading-7 text-slate-600">
                <li>Upload your JPG, PNG, or WebP image into the rotate tool.</li>
                <li>Choose a quick 90 degree turn or enter a custom angle to straighten the image.</li>
                <li>Preview the new orientation and make any flip or alignment adjustments.</li>
                <li>Download the final file, then <Link href="/jpg-to-png" className="font-medium text-brand-700 underline decoration-brand-200 underline-offset-4 transition-colors hover:text-brand-800">convert JPG back to PNG</Link> or <Link href="/image-tools" className="font-medium text-brand-700 underline decoration-brand-200 underline-offset-4 transition-colors hover:text-brand-800">explore all image tools</Link> if you need another edit.</li>
              </ol>
            </div>
            <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-8 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">Best Next Steps</h2>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
                <li>Use <Link href="/png-to-jpg" className="font-medium text-brand-700 underline decoration-brand-200 underline-offset-4 transition-colors hover:text-brand-800">convert PNG to JPG</Link> when you want a lighter photo export.</li>
                <li>Use <Link href="/image-compressor" className="font-medium text-brand-700 underline decoration-brand-200 underline-offset-4 transition-colors hover:text-brand-800">compress image after rotating</Link> for faster uploads and better page speed.</li>
                <li>Use <Link href="/image-cropper" className="font-medium text-brand-700 underline decoration-brand-200 underline-offset-4 transition-colors hover:text-brand-800">crop image after rotation</Link> to remove empty corners or improve framing.</li>
                <li>Use <Link href="/image-tools" className="font-medium text-brand-700 underline decoration-brand-200 underline-offset-4 transition-colors hover:text-brand-800">explore all image tools</Link> if rotation is one step in a bigger workflow.</li>
              </ul>
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Image Rotation Comparison Table</h2>
            <div className="mt-5 overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200 text-left text-sm text-slate-600">
                <thead>
                  <tr className="text-slate-900">
                    <th className="px-4 py-3 font-semibold">Method</th>
                    <th className="px-4 py-3 font-semibold">Ease of Use</th>
                    <th className="px-4 py-3 font-semibold">Speed</th>
                    <th className="px-4 py-3 font-semibold">Installation Required</th>
                    <th className="px-4 py-3 font-semibold">Best For</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="px-4 py-3 font-medium text-slate-900">Rotate Image Online</td>
                    <td className="px-4 py-3">Very easy</td>
                    <td className="px-4 py-3">Instant</td>
                    <td className="px-4 py-3">No</td>
                    <td className="px-4 py-3">Fast fixes for product photos, uploads, and everyday edits</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-slate-900">Rotate in Photoshop</td>
                    <td className="px-4 py-3">Moderate</td>
                    <td className="px-4 py-3">Fast after setup</td>
                    <td className="px-4 py-3">Yes</td>
                    <td className="px-4 py-3">Advanced design workflows and layered editing</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-slate-900">Rotate on Mobile</td>
                    <td className="px-4 py-3">Easy</td>
                    <td className="px-4 py-3">Fast</td>
                    <td className="px-4 py-3">No extra installation in most cases</td>
                    <td className="px-4 py-3">Quick photo corrections directly on a phone</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-slate-900">Rotate with Windows Photos</td>
                    <td className="px-4 py-3">Easy</td>
                    <td className="px-4 py-3">Fast</td>
                    <td className="px-4 py-3">No</td>
                    <td className="px-4 py-3">Basic desktop edits for local image files</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">Why Images Rotate Incorrectly</h2>
              <div className="mt-4 space-y-4 text-sm leading-7 text-slate-600">
                <p>
                  Images often rotate incorrectly because many devices save EXIF data instead of permanently rotating the pixels. That EXIF orientation tag tells apps how the image should be displayed, but not every browser, website, or editor reads it the same way.
                </p>
                <p>
                  Mobile camera orientation also affects how photos are stored. If you capture a picture in portrait mode, landscape mode, or at an odd angle, the device may rely on metadata to describe the correct view rather than rewriting the image data itself.
                </p>
                <p>
                  Social media uploads and website uploads can strip or ignore metadata, which is why a photo that looks correct on your phone may suddenly appear sideways online. Metadata issues are especially common when images are edited, exported, converted, or passed through multiple apps before publishing.
                </p>
              </div>
            </div>
            <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">When Should You Rotate an Image?</h2>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
                <li>Rotate product photography so listings look consistent across catalogs and marketplaces.</li>
                <li>Rotate blog images when screenshots, diagrams, or header graphics appear sideways.</li>
                <li>Rotate social media visuals before posting so reels, stories, and feed images display cleanly.</li>
                <li>Rotate documents when scanned pages, forms, or photographed notes are hard to read.</li>
                <li>Rotate marketing materials so banners, flyers, and campaign graphics align correctly before publishing.</li>
              </ul>
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Real World Use Cases</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              {[
                { title: "Product photos", text: "Align storefront images so products appear upright and consistent." },
                { title: "Instagram posts", text: "Correct portrait and square assets before publishing to social feeds." },
                { title: "Website banners", text: "Level hero images and promotional graphics for cleaner layouts." },
                { title: "Portfolio images", text: "Present case study visuals and gallery shots in the intended orientation." },
                { title: "Scanned documents", text: "Make photographed forms and paper scans easier to read and share." },
                { title: "School assignments", text: "Fix notebook photos, diagrams, and submitted screenshots quickly." },
                { title: "PDF screenshots", text: "Correct exported pages or clipped PDF images before reuse in slides." },
                { title: "Social media uploads", text: "Avoid sideways uploads caused by metadata or mobile orientation." },
                { title: "Ecommerce listings", text: "Keep catalog thumbnails uniform across product grids and ads." },
                { title: "Business documents", text: "Straighten receipts, reports, and internal reference images for teams." },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl bg-slate-50 p-5">
                  <h3 className="text-sm font-medium text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-500">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">Common Mistakes</h2>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
                <li>Trusting only the phone gallery preview without checking the file after upload.</li>
                <li>Rotating by a custom angle when a simple 90 degree turn is the cleaner fix.</li>
                <li>Ignoring EXIF and metadata problems that can reintroduce orientation issues later.</li>
                <li>Forgetting to preview the final image before downloading.</li>
                <li>Publishing rotated images without removing empty corners afterward.</li>
                <li>Mirroring images that contain readable text or logos.</li>
                <li>Rotating first in one app, then exporting through another app that strips metadata differently.</li>
                <li>Skipping compression when the rotated image is meant for websites or email.</li>
                <li>Using the wrong format when transparency or photo file size matters.</li>
                <li>Not testing the final image in the destination platform such as a CMS, marketplace, or social app.</li>
              </ul>
            </div>
            <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">Expert Tips</h2>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
                <li>Rotate before cropping, resizing, or compressing so every later edit uses the correct frame.</li>
                <li>Use 90 degree steps whenever possible for the cleanest orientation correction.</li>
                <li>Use custom-angle rotation for horizon lines, screenshots, and scanned paperwork that need fine alignment.</li>
                <li>Preview the image at full size to catch subtle tilt before downloading.</li>
                <li>Crop after rotation to remove blank corners created by straightening.</li>
                <li>Choose JPG for lightweight photos and PNG when you need crisp graphics or transparency support.</li>
                <li>Keep a copy of the original if you are testing multiple orientations for design layouts.</li>
                <li>Check text direction after using horizontal flip on selfies, labels, or signs.</li>
                <li>After rotation, <Link href="/image-compressor" className="font-medium text-brand-700 underline decoration-brand-200 underline-offset-4 transition-colors hover:text-brand-800">compress image after rotating</Link> to improve upload speed.</li>
                <li>Build a faster workflow by chaining rotation with <Link href="/image-cropper" className="font-medium text-brand-700 underline decoration-brand-200 underline-offset-4 transition-colors hover:text-brand-800">crop image after rotation</Link> and format conversion when needed.</li>
              </ul>
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">People Also Ask</h2>
            <div className="mt-5 space-y-4">
              {[
                { q: "How do I rotate an image online for free?", a: "Upload the image, choose a 90 degree or custom angle rotation, preview the result, and download the corrected file." },
                { q: "Why does my image upload sideways?", a: "This usually happens when the original file relies on EXIF orientation data and the upload destination ignores or strips that metadata." },
                { q: "Can I rotate a JPG, PNG, or WebP image online?", a: "Yes. The tool supports common image formats including JPG, PNG, and WebP." },
                { q: "Does rotating an image reduce quality?", a: "Standard 90 degree rotations are typically clean, while custom-angle adjustments may need light cropping but still preserve strong visual quality." },
                { q: "Should I rotate before cropping an image?", a: "Yes. Rotating first gives you the right frame, then cropping helps remove empty edges and improve composition." },
                { q: "Can I fix a sideways phone photo online?", a: "Yes. Sideways mobile photos are one of the most common use cases for online image rotation tools." },
                { q: "What is the best way to rotate product photos?", a: "Use a browser-based rotation tool first, then crop and optimize the file so every listing stays consistent." },
                { q: "Can I rotate an image without installing software?", a: "Yes. Browser-based rotation tools let you correct image orientation without downloading desktop apps." },
                { q: "Why do screenshots sometimes need rotation?", a: "Screenshots taken from tablets, scanned pages, or exported documents can inherit awkward orientation and need quick adjustment." },
                { q: "Can I rotate and flip an image together?", a: "Yes. You can combine rotation with horizontal or vertical flip for mirror corrections and layout needs." },
                { q: "What should I do after rotating an image?", a: "Common next steps are cropping empty corners, compressing the file, or converting it into a different format." },
                { q: "When should I convert PNG to JPG after rotating?", a: "Convert PNG to JPG after rotating when you want smaller file sizes for photos, websites, or marketplaces." },
                { q: "Can social media apps change image orientation?", a: "Yes. Social platforms sometimes handle metadata differently, which can make correctly viewed photos appear rotated after upload." },
                { q: "Is rotating images useful for scanned documents?", a: "Yes. Rotating scanned pages makes forms, notes, and business paperwork much easier to read and share." },
                { q: "How can I avoid image rotation problems in the future?", a: "Rotate the actual image before uploading and test the final file in the destination platform instead of relying only on metadata." },
              ].map((item) => (
                <div key={item.q} className="rounded-2xl bg-slate-50 p-5">
                  <h3 className="text-sm font-medium text-slate-900">{item.q}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{item.a}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Trust &amp; Security</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-4">
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Browser-based processing</h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">Rotation happens in your browser, which keeps the workflow fast and avoids unnecessary transfers.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Privacy</h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">Personal photos, product shots, documents, and internal assets stay on your device during editing.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">No software installation</h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">You can fix orientation without installing desktop tools, signing up, or switching devices mid-task.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Fast workflow</h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">After rotation, you can <Link href="/png-to-jpg" className="font-medium text-brand-700 underline decoration-brand-200 underline-offset-4 transition-colors hover:text-brand-800">convert PNG to JPG</Link>, <Link href="/jpg-to-png" className="font-medium text-brand-700 underline decoration-brand-200 underline-offset-4 transition-colors hover:text-brand-800">convert JPG back to PNG</Link>, or <Link href="/image-tools" className="font-medium text-brand-700 underline decoration-brand-200 underline-offset-4 transition-colors hover:text-brand-800">explore all image tools</Link> in one flow.</p>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-[2rem] font-bold tracking-tight text-slate-900">Frequently Asked Questions</h2>
            <div className="mt-5 divide-y divide-slate-100">
              {[
                { q: "Can I rotate by a custom angle instead of just 90 degrees?", a: "Yes. In addition to the quick 90-degree and 180-degree preset buttons, you can enter any custom angle from 0 to 360 degrees using the angle slider or the numeric input field. The preview updates in real time so you can fine-tune the rotation until the horizon is perfectly level or the composition looks exactly right." },
                { q: "Does rotating an image reduce its quality?", a: "Rotations at exact 90-degree increments (90, 180, 270) are lossless because they simply rearrange pixels without any interpolation. Custom-angle rotations require sub-pixel rendering, but our tool uses high-quality bicubic-equivalent canvas rendering to preserve as much detail as possible. You can also choose your output format and compression level for full control." },
                { q: "Can I flip and rotate an image at the same time?", a: "Absolutely. You can combine any rotation angle with a horizontal flip, a vertical flip, or both. All transformations are composited together and previewed in real time before you download, so you always know exactly what the final image will look like." },
                { q: "What image formats are supported?", a: "The rotate and flip tool supports JPG, PNG, and WebP images. You can upload any of these formats and download the result in the same format or convert to a different supported format during the process. This flexibility makes it easy to rotate a photo and change its format in a single step." },
              ].map((item) => (
                <details key={item.q} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-[15px] font-medium text-slate-900 transition-colors hover:text-brand-700 [&::-webkit-details-marker]:hidden">
                    <span>{item.q}</span>
                    <svg className="h-5 w-5 shrink-0 text-slate-400 transition-transform duration-200 group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-500">{item.a}</p>
                </details>
              ))}
            </div>
          </div>

          {/* SEO paragraph */}
          <div className="rounded-[2rem] border border-dashed border-slate-200 bg-white p-8">
            <p className="text-[15px] leading-8 text-slate-500">Our free online image rotate and flip tool gives you complete control over image orientation without installing any software. Whether you need to rotate a photo 90 degrees to fix a sideways smartphone picture, straighten a slightly tilted scan by a few degrees, mirror a selfie that was taken in front-facing mode, or flip an image vertically for a creative project, this tool handles it all instantly inside your browser. The entire process runs locally using the HTML Canvas API, meaning your images never leave your device and are never uploaded to any external server. This makes the tool completely private and suitable for sensitive personal photos, confidential business documents, and professional photography work. The real-time preview lets you see every adjustment as you make it, eliminating guesswork and saving time. For photographers, the custom-angle rotation is invaluable for correcting horizon lines and composition tilt. For graphic designers, the flip function creates mirror images needed for print layouts, symmetrical designs, and reflection effects. For e-commerce sellers, rotating product photos to a consistent orientation improves the visual consistency of your listings. The tool supports JPG, PNG, and WebP formats with full control over output quality and format selection. There are no watermarks added to your images, no daily usage limits, and no account signup required. It works on every modern browser across Windows, macOS, Linux, iOS, and Android devices. Rotate images online, flip photos horizontally, mirror images vertically, and download the results in seconds — completely free.</p>
          </div>

          {/* Related tools */}
          <div>
            <h2 className="text-[2rem] font-bold tracking-tight text-slate-900">Related Image Tools</h2>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/image-compressor" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">Image Compressor</Link>
              <Link href="/image-resizer" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">Image Resizer</Link>
              <Link href="/image-to-webp" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">Image to WebP</Link>
              <Link href="/image-watermark" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">Image Watermark</Link>
            </div>
          </div>
          <ToolSeoGrowth slug="image-rotate" />
        </div>
      </div>
    </div>
  );
}
