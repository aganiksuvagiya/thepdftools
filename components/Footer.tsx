import Link from "next/link";
import Image from "next/image";
import AdsterraZone from "@/components/AdsterraZone";

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

const popularSearchLinks = [
  { href: "/compress-pdf-to-100kb", label: "Compress PDF to 100KB" },
  { href: "/compress-pdf-for-govt-exam", label: "Compress PDF for Govt Exam" },
  { href: "/reduce-pdf-size-online-free", label: "Reduce PDF Size Online Free" },
  { href: "/convert-jpeg-to-png-online-free", label: "Convert JPEG to PNG" },
  { href: "/jpg-to-png-no-upload", label: "JPG to PNG No Upload" },
  { href: "/jpg-to-png-for-logos", label: "JPG to PNG for Logos" },
];

const categoryLinks = [
  { href: "/pdf-tools", label: "PDF Tools" },
  { href: "/image-tools", label: "Image Tools" },
  { href: "/developer-tools", label: "Developer Tools" },
  { href: "/generators", label: "Generators" },
  { href: "/document-tools", label: "Document Tools" },
  { href: "/utility-tools", label: "Utility Tools" },
];

export default function Footer() {
  const shouldShowAds =
    process.env.NODE_ENV === "production" ||
    process.env.NEXT_PUBLIC_SHOW_ADS === "true";

  return (
    <footer className="border-t border-slate-200 bg-[#f8fafc] text-slate-600">
      <div className="mx-auto max-w-6xl px-5 py-14">
        {shouldShowAds ? (
          <div className="mb-10 flex flex-col items-center gap-4">
            {/* Footer Ad 1 – 728×90 leaderboard */}
            <div className="w-full overflow-hidden mx-auto rounded-[1.75rem] border border-slate-200/90 bg-white/90 p-3 shadow-sm">
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
            <div className="w-full overflow-hidden mx-auto rounded-[1.75rem] border border-slate-200/90 bg-white/90 p-3 shadow-sm">
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
        <div className="mb-10 flex flex-wrap gap-2">
          {categoryLinks.map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              className="rounded-full border border-slate-200 bg-white px-4 py-1.5 text-[12.5px] font-medium text-slate-600 transition-colors hover:border-brand-300 hover:text-brand-700"
            >
              {cat.label}
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-6">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-2">
            <Link href="/" className="inline-flex items-center gap-1.5">
              <Image
                src="/logo.svg"
                alt="thepdftools browser-based PDF and image tools"
                width={80}
                height={30}
                className="h-7 w-auto"
                style={{ width: "auto", height: "28px" }}
              />
              <span className="text-sm font-bold text-slate-900"></span>
            </Link>
            <p className="mt-2 max-w-[220px] text-[13px] leading-relaxed text-slate-500">
              Free browser-based tools for PDF, images, and developers. Your files never leave your device.
            </p>
            <ul className="mt-4 space-y-1.5">
              <li><Link href="/blog" className="text-[13px] text-slate-500 transition-colors hover:text-brand-700">Blog</Link></li>
              <li><Link href="/about" className="text-[13px] text-slate-500 transition-colors hover:text-brand-700">About</Link></li>
              <li><Link href="/privacy" className="text-[13px] text-slate-500 transition-colors hover:text-brand-700">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* PDF Tools */}
          <div>
            <h4 className="text-[12px] font-semibold uppercase tracking-wider text-slate-700">
              <Link href="/pdf-tools" className="hover:text-brand-700 transition-colors">PDF Tools</Link>
            </h4>
            <ul className="mt-3 space-y-2">
              {pdfToolLinks.map((t) => (
                <li key={t.href}>
                  <Link href={t.href} className="text-[13px] text-slate-500 transition-colors hover:text-brand-700">{t.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Image Tools */}
          <div>
            <h4 className="text-[12px] font-semibold uppercase tracking-wider text-slate-700">
              <Link href="/image-tools" className="hover:text-brand-700 transition-colors">Image Tools</Link>
            </h4>
            <ul className="mt-3 space-y-2">
              {imageToolLinks.map((t) => (
                <li key={t.href}>
                  <Link href={t.href} className="text-[13px] text-slate-500 transition-colors hover:text-brand-700">{t.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More Tools */}
          <div>
            <h4 className="text-[12px] font-semibold uppercase tracking-wider text-slate-700">More Tools</h4>
            <ul className="mt-3 space-y-2">
              {moreToolLinks.map((t) => (
                <li key={t.href}>
                  <Link href={t.href} className="text-[13px] text-slate-500 transition-colors hover:text-brand-700">{t.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular searches */}
          <div>
            <h4 className="text-[12px] font-semibold uppercase tracking-wider text-slate-700">Popular Searches</h4>
            <ul className="mt-3 space-y-2">
              {popularSearchLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[13px] text-slate-500 transition-colors hover:text-brand-700">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col justify-between gap-2 border-t border-slate-200 pt-6 text-[12px] text-slate-400 sm:flex-row">
          <span>&copy; {new Date().getFullYear()} thepdftools. All rights reserved.</span>
          <span>100% client-side processing · No sign-up · No watermarks</span>
        </div>
      </div>
    </footer>
  );
}
