import Link from "next/link";
import Image from "next/image";
import AdsterraZone from "@/components/AdsterraZone";
import { getLatestPosts } from "@/lib/blog";

const pdfToolLinks = [
  { href: "/pdf-merge", label: "Merge PDF" },
  { href: "/pdf-split", label: "Split PDF" },
  { href: "/pdf-compress", label: "Compress PDF" },
  { href: "/pdf-to-word", label: "PDF to Word" },
  { href: "/pdf-to-jpg", label: "PDF to JPG" },
  { href: "/pdf-sign", label: "Sign PDF" },
  { href: "/pdf-editor", label: "PDF Editor" },
  { href: "/pdf-protect", label: "Protect PDF" },
];

const imageToolLinks = [
  { href: "/image-compressor", label: "Compress Image" },
  { href: "/jpg-to-png", label: "JPG to PNG" },
  { href: "/png-to-jpg", label: "PNG to JPG" },
  { href: "/image-resizer", label: "Resize Image" },
  { href: "/background-remover", label: "Remove Background" },
  { href: "/image-cropper", label: "Crop Image" },
  { href: "/heic-to-jpg", label: "HEIC to JPG" },
  { href: "/svg-to-png", label: "SVG to PNG" },
];

const moreToolLinks = [
  { href: "/json-formatter", label: "JSON Formatter" },
  { href: "/csv-to-json", label: "CSV to JSON" },
  { href: "/base64", label: "Base64 Encoder" },
  { href: "/qr-generator", label: "QR Code Generator" },
  { href: "/invoice-generator", label: "Invoice Generator" },
  { href: "/word-counter", label: "Word Counter" },
  { href: "/barcode-generator", label: "Barcode Generator" },
  { href: "/lorem-ipsum", label: "Lorem Ipsum" },
];

const pdfPageToolLinks = [
  { href: "/pdf-converter", label: "PDF Converter" },
  { href: "/pdf-organize-pages", label: "Organize PDF Pages" },
  { href: "/rearrange-pdf-pages", label: "Rearrange PDF Pages" },
  { href: "/delete-pdf-pages", label: "Delete PDF Pages" },
  { href: "/extract-pdf-pages", label: "Extract PDF Pages" },
  { href: "/repair-pdf", label: "Repair PDF" },
  { href: "/flatten-pdf", label: "Flatten PDF" },
  { href: "/pdf-metadata-editor", label: "PDF Metadata Editor" },
  { href: "/png-to-pdf", label: "PNG to PDF" },
  { href: "/scan-to-pdf", label: "Scan to PDF" },
];

const popularSearchLinks = [
  { href: "/compress-pdf-to-100kb", label: "Compress PDF to 100KB" },
  { href: "/compress-pdf-to-200kb", label: "Compress PDF to 200KB" },
  { href: "/compress-pdf-for-govt-exam", label: "Compress PDF for Govt Exam" },
  { href: "/reduce-pdf-size-online-free", label: "Reduce PDF Size Online Free" },
  { href: "/jpg-to-png", label: "Convert JPEG to PNG" },
  { href: "/jpg-to-png-no-upload", label: "JPG to PNG No Upload" },
  { href: "/jpg-to-png-for-logos", label: "JPG to PNG for Logos" },
  { href: "/compress-image-to-100kb", label: "Compress Image to 100KB" },
  { href: "/png-to-jpg-for-photos", label: "PNG to JPG for Photos" },
  { href: "/png-to-jpg-white-background", label: "PNG to JPG White Background" },
  { href: "/ilovepdf-alternative", label: "iLovePDF Alternative" },
  { href: "/smallpdf-vs-thepdftools", label: "Smallpdf vs thepdftools" },
];

const categoryLinks = [
  { href: "/pdf-tools", label: "PDF Tools" },
  { href: "/image-tools", label: "Image Tools" },
  { href: "/developer-tools", label: "Developer Tools" },
  { href: "/generators", label: "Generators" },
  { href: "/document-tools", label: "Document Tools" },
  { href: "/utility-tools", label: "Utility Tools" },
];

const trustBadges = [
  {
    label: "100% client-side",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
    ),
  },
  {
    label: "No sign-up",
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M15 9V6a3 3 0 00-5.907-.75M6.75 9h10.5A1.5 1.5 0 0118.75 10.5v7.5a1.5 1.5 0 01-1.5 1.5H6.75a1.5 1.5 0 01-1.5-1.5v-7.5A1.5 1.5 0 016.75 9z" />,
  },
  {
    label: "No watermarks",
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
  },
];

function TrustBadge({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 text-[12.5px] font-medium text-slate-400">
      <svg className="h-4 w-4 shrink-0 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        {icon}
      </svg>
      {label}
    </div>
  );
}

function FooterColumn({
  title,
  titleHref,
  links,
}: {
  title: string;
  titleHref?: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div>
      <h4 className="text-[11.5px] font-semibold uppercase tracking-wider text-slate-300">
        {titleHref ? (
          <Link href={titleHref} className="transition-colors hover:text-brand-400">
            {title}
          </Link>
        ) : (
          title
        )}
      </h4>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              title={link.label}
              className="line-clamp-2 text-[13px] leading-snug text-slate-400 transition-colors hover:text-brand-400"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  const shouldShowAds =
    process.env.NODE_ENV === "production" ||
    process.env.NEXT_PUBLIC_SHOW_ADS === "true";
  const latestPosts = getLatestPosts(4);

  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-400">
      <div className="mx-auto max-w-6xl px-5 py-14">
        {shouldShowAds ? (
          <div className="mb-10 flex flex-col items-center gap-4">
            {/* Footer Ad 1 – 728×90 leaderboard */}
            <div className="w-full overflow-hidden mx-auto rounded-[1.75rem] border border-slate-800 bg-slate-900/60 p-3">
              <AdsterraZone
                height={90}
                optionsScript={`atOptions = {
  'key' : 'cc4425738f06f5ed0d6a50f38827eacf',
  'format' : 'iframe',
  'height' : 90,
  'width' : 728,
  'params' : {}
};`}
                scriptSrc="https://www.highperformanceformat.com/cc4425738f06f5ed0d6a50f38827eacf/invoke.js"
              />
            </div>
            {/* Footer Ad 2 – 468×60 banner */}
            <div className="w-full overflow-hidden mx-auto rounded-[1.75rem] border border-slate-800 bg-slate-900/60 p-3">
              <AdsterraZone
                height={60}
                optionsScript={`atOptions = {
  'key' : '80a23f387f5024bf62bbe2dccf30a4c5',
  'format' : 'iframe',
  'height' : 60,
  'width' : 468,
  'params' : {}
};`}
                scriptSrc="https://www.highperformanceformat.com/80a23f387f5024bf62bbe2dccf30a4c5/invoke.js"
              />
            </div>
          </div>
        ) : null}

        {/* Category quick links */}
        <div className="mb-10 flex flex-wrap items-center justify-between gap-6 border-b border-slate-800 pb-10">
          <div className="flex flex-wrap gap-2">
            {categoryLinks.map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                className="rounded-full border border-slate-700 bg-slate-900 px-4 py-1.5 text-[12.5px] font-medium text-slate-300 transition-colors hover:border-brand-500/60 hover:text-brand-400"
              >
                {cat.label}
              </Link>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {trustBadges.map((badge) => (
              <TrustBadge key={badge.label} icon={badge.icon} label={badge.label} />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-8">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-1.5">
              <Image
                src="/logo.svg"
                alt="thepdftools browser-based PDF and image tools"
                width={80}
                height={30}
                className="h-7 w-auto"
                style={{ width: "auto", height: "28px" }}
              />
            </Link>
            <p className="mt-3 max-w-[260px] text-[13px] leading-relaxed text-slate-400">
              Free browser-based tools for PDF, images, and developers. Your files never leave your device.
            </p>
            <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 sm:block sm:space-y-2.5">
              <li><Link href="/blog" className="text-[13px] text-slate-400 transition-colors hover:text-brand-400">Blog</Link></li>
              <li><Link href="/site-map" className="text-[13px] text-slate-400 transition-colors hover:text-brand-400">HTML Sitemap</Link></li>
              <li><Link href="/about" className="text-[13px] text-slate-400 transition-colors hover:text-brand-400">About</Link></li>
              <li><Link href="/privacy" className="text-[13px] text-slate-400 transition-colors hover:text-brand-400">Privacy Policy</Link></li>
            </ul>
            <a
              href="https://www.instagram.com/thepdftools.site"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-slate-700 py-1.5 pl-1.5 pr-4 text-[12.5px] font-medium text-slate-300 transition-colors hover:border-brand-500/60 hover:text-brand-400"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-800">
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
                </svg>
              </span>
              Follow us on Instagram
            </a>
          </div>

          <FooterColumn title="PDF Tools" titleHref="/pdf-tools" links={pdfToolLinks} />
          <FooterColumn title="PDF Page Tools" titleHref="/pdf-converter" links={pdfPageToolLinks} />
          <FooterColumn title="Image Tools" titleHref="/image-tools" links={imageToolLinks} />
          <FooterColumn title="More Tools" links={moreToolLinks} />
          <FooterColumn title="Popular Searches" links={popularSearchLinks} />
          <FooterColumn
            title="Latest Blog"
            titleHref="/blog"
            links={latestPosts.map((post) => ({ href: `/blog/${post.slug}`, label: post.title }))}
          />
        </div>

        <div className="mt-12 flex flex-col justify-between gap-2 border-t border-slate-800 pt-6 text-[12px] text-slate-500 sm:flex-row">
          <span>&copy; {new Date().getFullYear()} thepdftools. All rights reserved.</span>
          <span>Made for people who just want their file fixed, fast.</span>
        </div>
      </div>
    </footer>
  );
}
