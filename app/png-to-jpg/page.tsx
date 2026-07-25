import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import SeoReferences from "@/components/SeoReferences";
import { buildOrganizationSchema, buildPageMetadata, buildWebsiteSchema } from "@/lib/seo-page";
import { getLastUpdated } from "@/lib/last-updated";

const PngToJpgClient = dynamic(() => import("./PngToJpgClient"), {
  loading: () => <div className="card h-64 animate-pulse bg-gray-50" />,
  ssr: false,
});

const pageTitle = "PNG to JPG Converter Free Online";
const pageDescription =
  "Convert PNG to JPG online free in seconds. Fast PNG to JPEG converter with white background support, quality control, and no signup.";

const faqs = [
  {
    q: "How do I convert PNG to JPG online for free?",
    a: "Upload your PNG image, choose the JPG quality level, and click convert. The tool creates a JPG version in your browser and lets you download it instantly.",
  },
  {
    q: "Is this a free PNG to JPG converter?",
    a: "Yes. You can use the PNG to JPG converter for free with no signup, no watermark, and no forced account creation.",
  },
  {
    q: "What happens to transparent PNG backgrounds?",
    a: "JPG does not support transparency, so transparent areas are placed on a white background during conversion.",
  },
  {
    q: "Can I control JPG quality before downloading?",
    a: "Yes. Use the quality slider to choose a balance between smaller file size and higher image quality.",
  },
  {
    q: "Is my PNG image uploaded to a server?",
    a: "No. The converter runs in your browser, so the image stays on your device during the conversion process.",
  },
  {
    q: "What is the difference between PNG and JPG?",
    a: "PNG is a lossless image format that supports transparency. JPG uses lossy compression, which usually creates much smaller files that are better for sharing, uploads, and websites.",
  },
  {
    q: "When should I convert PNG to JPG?",
    a: "Convert PNG to JPG when you want a smaller file size, do not need transparency, and want faster uploads or better page speed.",
  },
  {
    q: "Does converting PNG to JPG reduce image quality?",
    a: "It can, because JPG uses compression. In most everyday use cases, a high-quality JPG still looks very good while saving a lot of space.",
  },
  {
    q: "Can I convert screenshots from PNG to JPG?",
    a: "Yes. Screenshots can be converted, though text-heavy screenshots may stay sharper as PNG if perfect edge clarity matters more than file size.",
  },
  {
    q: "Can I use this PNG to JPEG converter on mobile?",
    a: "Yes. The page works on modern mobile browsers, including Android and iPhone devices.",
  },
  {
    q: "Will the converted JPG be smaller than the original PNG?",
    a: "In many cases, yes. JPG usually produces smaller files than PNG, especially for photos and large image exports.",
  },
  {
    q: "Can I convert PNG to JPG for website uploads?",
    a: "Yes. This is one of the most common reasons to use a PNG to JPG online converter, especially when you need smaller images for blogs, landing pages, or CMS uploads.",
  },
  {
    q: "What if I need transparency after conversion?",
    a: "If you need transparency, keep the image as PNG or consider WebP. JPG cannot preserve transparent areas.",
  },
  {
    q: "Is PNG to JPG better for email attachments?",
    a: "Usually yes, because JPG files are often much smaller and easier to send as attachments.",
  },
  {
    q: "Which related tools should I use after converting PNG to JPG?",
    a: "Common next steps are JPG to PNG for reverse conversion, Image Compressor for more size reduction, Image Rotate for orientation fixes, Image Cropper for trimming, and Image Tools for other edits.",
  },
] as const;

const peopleAlsoAsk = [
  "How can I convert PNG to JPG without losing too much quality?",
  "Is PNG or JPG better for websites?",
  "Why does PNG become smaller as JPG?",
  "Can I convert a transparent PNG to JPG?",
  "What is the best free PNG to JPG converter online?",
] as const;

const semanticKeywords = [
  "png to jpg free",
  "png to jpg converter free",
  "convert png to jpg online",
  "png to jpg online",
  "png to jpeg converter",
  "free png to jpg converter",
  "online png to jpg converter",
  "png to jpg without upload",
  "convert png image to jpg",
  "png to jpeg online free",
] as const;

const longTailKeywords = [
  "convert png to jpg online free without losing quality",
  "free png to jpg converter with white background",
  "how to convert transparent png to jpg online",
  "best png to jpeg converter for website images",
  "convert png screenshot to jpg online free",
  "png to jpg converter no signup no watermark",
  "reduce png file size by converting to jpg",
  "convert png to jpg for email attachment",
] as const;

const relatedTools = [
  {
    href: "/jpg-to-png",
    label: "JPG to PNG",
    text: "Convert JPG images back to PNG when you need lossless output or transparency-friendly workflows.",
  },
  {
    href: "/image-compressor",
    label: "Image Compressor",
    text: "Shrink JPG, PNG, and WebP files even more after conversion for websites, email, and portal uploads.",
  },
  {
    href: "/image-rotate",
    label: "Image Rotate",
    text: "Fix sideways photos or rotate converted images before publishing or sharing them.",
  },
  {
    href: "/image-cropper",
    label: "Image Cropper",
    text: "Trim unwanted edges, resize framing, and prepare your JPG for social, web, or marketplace use.",
  },
  {
    href: "/image-tools",
    label: "All Image Tools",
    text: "Explore the full image toolkit for format conversion, resizing, compression, rotation, and more.",
  },
] as const;

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  url: "https://thepdftools.site/png-to-jpg",
  keywords: [...semanticKeywords, ...longTailKeywords],
  imageAlt: "PNG to JPG Converter Free Online",
});

export default function PngToJpgPage() {
  const lastUpdated = getLastUpdated("app/png-to-jpg/page.tsx");
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.a,
          },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://thepdftools.site",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Image Tools",
            item: "https://thepdftools.site/image-tools",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "PNG to JPG",
            item: "https://thepdftools.site/png-to-jpg",
          },
        ],
      },
      {
        "@type": "WebApplication",
        name: "PNG to JPG Converter Free Online",
        url: "https://thepdftools.site/png-to-jpg",
        applicationCategory: "MultimediaApplication",
        operatingSystem: "Any",
        browserRequirements: "Requires a modern browser with JavaScript enabled.",
        isAccessibleForFree: true,
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        featureList: [
          "Convert PNG to JPG online free",
          "Adjust JPG quality before download",
          "Handle transparent PNG files with white background output",
          "Browser-based conversion with no signup",
          "Preview original and converted image side by side",
        ],
        description: pageDescription,
      },
      buildOrganizationSchema(),
      buildWebsiteSchema(),
    ],
  };

  return (
    <div className="bg-[#f8fafc] py-10 sm:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Image Tools", href: "/image-tools" },
            { label: "PNG to JPG" },
          ]}
        />

        <section className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] shadow-[0_24px_90px_-44px_rgba(79,70,229,0.18)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(79,70,229,0.1),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.08),transparent_24%)]" />
          <div className="relative px-6 py-10 sm:px-10 sm:py-12">
            <div className="mx-auto max-w-4xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700 shadow-sm ring-1 ring-brand-100">
                Image Tool • Free PNG to JPG Converter
              </div>

              <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl lg:text-[3.6rem] lg:leading-[1.02]">
                PNG to JPG Converter
                <span className="block bg-gradient-to-r from-brand-600 via-secondary-600 to-tertiary-500 bg-clip-text text-transparent">
                  Free Online
                </span>
              </h1>
              <div className="mt-3 flex flex-wrap items-center justify-center gap-3 text-sm text-slate-500">
                <span>thepdftools Editorial Team</span>
                <span className="h-1 w-1 rounded-full bg-slate-300" />
                <time dateTime={lastUpdated.date}>Updated {lastUpdated.formatted}</time>
              </div>

              <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
                Convert PNG to JPG online free in seconds. Reduce file size, replace
                transparent areas with a clean white background, and download a
                browser-generated JPG without signup or server upload.
              </p>
            </div>

            <div className="mt-8">
              <PngToJpgClient />
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                {
                  title: "Best for smaller files",
                  text: "JPG usually creates lighter images than PNG, which helps with uploads, email attachments, and web performance.",
                },
                {
                  title: "Best for web publishing",
                  text: "Convert design exports, screenshots, and product photos into a more web-friendly format.",
                },
                {
                  title: "Best for private conversion",
                  text: "Your image is processed locally in the browser, so the conversion stays fast and simple.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">
                    {item.title}
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Featured Snippet</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              A PNG to JPG converter free tool changes PNG images into smaller JPG
              files online. It is useful when you want faster uploads, easier
              sharing, and better website performance without installing software.
              If the PNG has transparency, the JPG version usually replaces it with
              a white background.
            </p>
          </div>

          <div className="rounded-[1.75rem] border border-brand-100 bg-brand-50 p-6">
            <h2 className="text-lg font-semibold text-slate-900">Quick Answer</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Use this PNG to JPG online converter when you need a lighter image for
              websites, forms, email attachments, product listings, or content
              uploads. It keeps the process simple: upload the PNG, choose quality,
              convert, and download the JPG in seconds.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {[
                "Website images",
                "Email attachments",
                "Blog uploads",
                "Product photos",
                "CMS uploads",
                "Fast sharing",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-brand-700 shadow-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            PNG vs JPG Comparison
          </h2>
          <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200">
            <div className="grid grid-cols-3 bg-slate-50 text-sm font-semibold text-slate-900">
              <div className="border-r border-slate-200 px-4 py-3">Feature</div>
              <div className="border-r border-slate-200 px-4 py-3">PNG</div>
              <div className="px-4 py-3">JPG</div>
            </div>
            {[
              ["Compression", "Lossless and usually larger", "Lossy and usually smaller"],
              ["Transparency", "Supports transparent backgrounds", "Does not support transparency"],
              ["Best for", "Logos, UI graphics, layered exports", "Photos, web uploads, sharing"],
              ["File size", "Often heavier for full-color images", "Usually lighter for daily use"],
              ["Website use", "Good when sharp edges matter", "Better when speed and size matter"],
            ].map((row) => (
              <div key={row[0]} className="grid grid-cols-3 border-t border-slate-200 text-sm text-slate-600">
                <div className="border-r border-slate-200 px-4 py-3 font-medium text-slate-900">
                  {row[0]}
                </div>
                <div className="border-r border-slate-200 px-4 py-3">{row[1]}</div>
                <div className="px-4 py-3">{row[2]}</div>
              </div>
            ))}
          </div>
          <p className="mt-5 text-sm leading-7 text-slate-600">
            If you want the image to load faster or send more easily, JPG is usually
            the better choice. If you need transparency or perfectly lossless output,
            keep the file as PNG.
          </p>
        </section>

        <section className="mt-8 rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            People Also Ask
          </h2>
          <div className="mt-5 divide-y divide-slate-100">
            {peopleAlsoAsk.map((question) => (
              <div key={question} className="py-4">
                <h3 className="text-[15px] font-semibold text-slate-900">{question}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  This converter helps by turning PNG files into lighter JPG images
                  with adjustable quality, simple browser-based processing, and a
                  cleaner workflow for uploads, sharing, and website publishing.
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Trust &amp; Security
          </h2>
          <div className="mt-4 space-y-5 text-[15px] leading-8 text-slate-600">
            <p>
              This PNG to JPG converter is built for quick, low-friction image tasks.
              The workflow is simple, the interface stays focused, and the output is
              easy to verify before you download. That matters when you are preparing
              product photos, blog assets, screenshots, or client uploads and want a
              result you can trust.
            </p>
            <p>
              After conversion, you may want to{" "}
              <Link href="/image-compressor" className="font-semibold text-brand-700 underline decoration-brand-200 underline-offset-4">
                compress the JPG further
              </Link>
              ,{" "}
              <Link href="/jpg-to-png" className="font-semibold text-brand-700 underline decoration-brand-200 underline-offset-4">
                convert JPG back to PNG
              </Link>
              , or{" "}
              <Link href="/image-rotate" className="font-semibold text-brand-700 underline decoration-brand-200 underline-offset-4">
                rotate image after conversion
              </Link>
              .
            </p>
            <p>
              If the image framing needs cleanup, you can{" "}
              <Link href="/image-cropper" className="font-semibold text-brand-700 underline decoration-brand-200 underline-offset-4">
                crop image after converting PNG to JPG
              </Link>
              . If you are working across multiple formats and edits,{" "}
              <Link href="/image-tools" className="font-semibold text-brand-700 underline decoration-brand-200 underline-offset-4">
                explore more image tools
              </Link>
              {" "}to keep the rest of the workflow in one place.
            </p>
          </div>
        </section>

        <div className="mt-14 space-y-8">
          <section className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              What is PNG to JPG Converter?
            </h2>
            <div className="mt-4 space-y-5 text-[15px] leading-8 text-slate-600">
              <p>
                A PNG to JPG converter is a tool that turns PNG image files into JPG
                or JPEG files. People use it when they want a lighter image that is
                easier to upload, quicker to share, and more practical for websites,
                marketplaces, CMS platforms, and email attachments. PNG is excellent
                for transparency, crisp graphics, and lossless editing, but it can be
                larger than necessary for daily use. JPG trades some image data for a
                smaller, more portable file size.
              </p>
              <p>
                That is why search intent around terms like <strong>png to jpg free</strong>,
                <strong> png to jpg converter free</strong>, and <strong>convert png to jpg online</strong>
                is so strong. Users usually already have a PNG file in hand and need a
                fast result, not an explanation-heavy design app. They want to upload
                one file, convert it, download it, and move on with their work.
              </p>
              <p>
                This page is built for that exact job. It lets you convert a PNG to
                JPG online inside the browser, control output quality, and preview the
                result before downloading. If the source PNG contains transparent
                areas, the converter places them on a white background so the final
                JPG looks clean and consistent. That matters for logos on white pages,
                exported designs, e-commerce images, and screenshots prepared for
                blogs or presentations.
              </p>
              <p>
                A strong <strong>free PNG to JPG converter</strong> should not just
                change the file extension. It should explain the tradeoff between PNG
                and JPG, let the user control quality, and make the result easier to
                trust. That is also what helps this page perform well in Google Search,
                AI Overviews, ChatGPT-style assistants, Gemini answers, and Perplexity
                summaries: the page solves a narrow problem clearly and explains the
                practical workflow around it.
              </p>
            </div>
          </section>

          <section className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Why Convert PNG to JPG?
            </h2>
            <div className="mt-4 grid gap-5 md:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-base font-semibold text-slate-900">Smaller file size</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  The biggest reason to convert PNG to JPG is file size. JPG usually
                  produces much smaller images, especially for photos and full-color
                  graphics. Smaller files upload faster, load faster, and save storage.
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-base font-semibold text-slate-900">Better for websites</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  Many site owners convert PNG images to JPG before publishing them to
                  blogs, landing pages, or product listings because lighter images can
                  help performance and reduce bandwidth.
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-base font-semibold text-slate-900">Faster sharing</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  If a PNG feels too heavy for email, forms, or chat apps, converting
                  it to JPG is often the fastest way to make it easier to send.
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-base font-semibold text-slate-900">Cleaner workflow for photos</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  PNG is not always the best choice for photographs. JPG is usually
                  more natural for camera-style images, visual previews, and web-ready
                  exports where transparency is not needed.
                </p>
              </div>
            </div>
            <div className="mt-5 space-y-5 text-[15px] leading-8 text-slate-600">
              <p>
                People also convert PNG to JPG because some platforms are stricter than
                they look. A portal might accept PNG in theory, but in practice the
                file may be too large, too slow to upload, or awkward to preview. A
                JPG version often solves that instantly. This is common with product
                dashboards, website builders, CMS systems, form uploads, internal
                documentation, and presentation tools.
              </p>
              <p>
                The main thing to remember is that JPG is the better format when you
                want efficiency, while PNG is the better format when you need
                transparency or lossless detail. That simple distinction is at the
                core of nearly every search for <strong>png to jpg online</strong> and
                <strong> png to jpeg converter</strong>.
              </p>
            </div>
          </section>

          <section className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              How to Convert PNG to JPG Online?
            </h2>
            <div className="mt-5 grid gap-5 md:grid-cols-2">
              {[
                "Upload your PNG image using the drop zone. The page accepts PNG files and loads a preview instantly.",
                "Adjust the JPG quality slider to choose how much compression you want before downloading.",
                "Preview the converted JPG side by side so you can compare the original PNG and the new output.",
                "Download the JPG file once the conversion is complete. Use it for websites, email, uploads, or everyday sharing.",
                "If you need more size reduction after conversion, open Image Compressor next and shrink the JPG further.",
              ].map((step, index) => (
                <div key={step} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">
                    {index + 1}
                  </div>
                  <p className="mt-4 text-sm leading-7 text-slate-600">{step}</p>
                </div>
              ))}
            </div>
            <p className="mt-5 text-[15px] leading-8 text-slate-600">
              This process is intentionally simple because most users already know what
              they need: a free PNG to JPG converter that works fast, keeps image
              quality acceptable, and does not put unnecessary steps between upload and
              download. That direct workflow is what also makes the page strong for AI
              answer engines and featured-snippet style summaries.
            </p>
          </section>

          <section className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Features
            </h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {[
                {
                  title: "Free browser-based conversion",
                  text: "Convert PNG to JPG online free without account setup or extra software.",
                },
                {
                  title: "Quality slider",
                  text: "Choose a larger cleaner image or a smaller more compressed JPG depending on your goal.",
                },
                {
                  title: "Transparent PNG handling",
                  text: "Transparent areas are flattened onto a white background so the JPG output stays clean.",
                },
                {
                  title: "Preview before download",
                  text: "See the original PNG and converted JPG side by side before saving the result.",
                },
                {
                  title: "Fast single-file workflow",
                  text: "Perfect for people who need a quick answer rather than a complex editor or asset manager.",
                },
                {
                  title: "Useful companion links",
                  text: "Move directly into compression, rotation, cropping, or reverse conversion after the image is ready.",
                },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl bg-slate-50 p-5">
                  <h3 className="text-base font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{item.text}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Benefits
            </h2>
            <div className="mt-4 space-y-5 text-[15px] leading-8 text-slate-600">
              <p>
                The clearest benefit of converting PNG to JPG is speed. Smaller images
                move faster through every part of the workflow: upload, send, preview,
                publish, and store. If your goal is practical output instead of design
                preservation, JPG is often the more useful format.
              </p>
              <p>
                There is also a usability benefit. Many people do not realize they are
                carrying large PNG files into systems that only need a visual result.
                A blog thumbnail, product photo, CMS header, email attachment, or
                marketplace listing often does not need transparency or lossless data.
                In those situations, JPG gives you a lighter asset with less friction.
              </p>
              <p>
                Another benefit is consistency. When transparent PNG artwork is used in
                the wrong place, it can produce awkward backgrounds or unpredictable
                rendering. Converting it to JPG with a white fill makes the output more
                stable for general sharing and publishing.
              </p>
              <p>
                From a search and visibility angle, lighter images can also support
                faster page experiences when they are published on websites. That does
                not guarantee rankings by itself, but it helps create cleaner, faster
                pages. For site owners, content teams, store managers, and bloggers,
                that is a practical reason to keep a <strong>free PNG to JPG converter</strong>
                close at hand.
              </p>
            </div>
          </section>

          <section className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              How This Page Competes With iLovePDF, Smallpdf, and Adobe
            </h2>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 p-5">
                <h3 className="text-base font-semibold text-slate-900">Against iLovePDF</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  iLovePDF is strong on PDF workflows, but for a focused image-format
                  job like PNG to JPG, users often prefer a simpler page with fewer
                  extra steps and a clearer image-first experience.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 p-5">
                <h3 className="text-base font-semibold text-slate-900">Against Smallpdf</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  Smallpdf has brand recognition, but smaller niche pages can still win
                  long-tail searches by matching exact intent, using clearer headings,
                  and building tighter internal links around image conversion topics.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 p-5">
                <h3 className="text-base font-semibold text-slate-900">Against Adobe</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  Adobe has trust and authority, so the ranking path here is not about
                  out-branding Adobe. It is about winning more specific searches with a
                  direct tool page, simpler copy, and faster task completion.
                </p>
              </div>
            </div>
            <p className="mt-5 text-[15px] leading-8 text-slate-600">
              In practical SEO terms, this page should not try to beat those brands on
              broad authority. It should beat them on relevance for targeted queries
              like <strong>png to jpg converter free</strong>, <strong>convert png to
              jpg online</strong>, and <strong>free png to jpg converter</strong>. That
              means tight metadata, exact-match headings, strong FAQs, useful internal
              links, and a better answer to the small but high-intent questions users
              actually ask before converting an image.
            </p>
          </section>

          <section className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Related Tools
            </h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {relatedTools.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition-colors hover:border-brand-200 hover:bg-brand-50"
                >
                  <h3 className="text-base font-semibold text-slate-900">{tool.label}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{tool.text}</p>
                </Link>
              ))}
            </div>
          </section>

          <section className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Search Topics This Page Covers
            </h2>
            <div className="mt-5">
              <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
                Semantic Keywords
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {semanticKeywords.map((keyword) => (
                  <span
                    key={keyword}
                    className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-6">
              <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
                Long-Tail Keywords
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {longTailKeywords.map((keyword) => (
                  <span
                    key={keyword}
                    className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-[2rem] font-bold tracking-tight text-slate-900">
              Frequently Asked Questions
            </h2>
            <div className="mt-5 divide-y divide-slate-100">
              {faqs.map((item) => (
                <details key={item.q} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-[15px] font-medium text-slate-900 transition-colors hover:text-brand-700 [&::-webkit-details-marker]:hidden">
                    <span>{item.q}</span>
                    <svg
                      className="h-5 w-5 shrink-0 text-slate-400 transition-transform duration-200 group-open:rotate-180"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-500">{item.a}</p>
                </details>
              ))}
            </div>
          </section>

          <SeoReferences
            links={[
              { href: "https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API", label: "MDN: Canvas API reference" },
              { href: "https://developer.mozilla.org/en-US/docs/Web/API/File", label: "MDN: File API reference" },
              { href: "https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types", label: "MDN: Image format guide" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
