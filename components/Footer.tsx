import Link from "next/link";
import Image from "next/image";
import AdsterraZone from "@/components/AdsterraZone";

const allTools = [
  { href: "/image-compressor", label: "Image Compressor" },
  { href: "/jpg-to-png", label: "JPG to PNG" },
  { href: "/png-to-jpg", label: "PNG to JPG" },
  { href: "/image-to-webp", label: "Image to WebP" },
  { href: "/image-cropper", label: "Image Cropper" },
  { href: "/image-resizer", label: "Image Resizer" },
  { href: "/image-watermark", label: "Image Watermark" },
  { href: "/image-rotate", label: "Rotate & Flip" },
  { href: "/background-remover", label: "BG Remover" },
  { href: "/pdf-merge", label: "PDF Merge" },
  { href: "/word-to-pdf", label: "Word to PDF" },
  { href: "/excel-to-pdf", label: "Excel to PDF" },
  { href: "/html-to-pdf", label: "HTML to PDF" },
];

const popularSearchLinks = [
  { href: "/compress-pdf-to-100kb", label: "Compress PDF to 100KB" },
  { href: "/compress-pdf-for-govt-exam", label: "Compress PDF for Govt Exam" },
  { href: "/reduce-pdf-size-online-free", label: "Reduce PDF Size Online Free" },
  { href: "/convert-jpeg-to-png-online-free", label: "Convert JPEG to PNG" },
  { href: "/jpg-to-png-no-upload", label: "JPG to PNG No Upload" },
  { href: "/jpg-to-png-for-logos", label: "JPG to PNG for Logos" },
];

export default function Footer() {
  const shouldShowAds =
    process.env.NODE_ENV === "production" ||
    process.env.NEXT_PUBLIC_SHOW_ADS === "true";

  return (
    <footer className="border-t border-slate-200 bg-[#f8fafc] text-slate-600">
      <div className="mx-auto max-w-6xl px-5 py-14">
        {shouldShowAds ? (
          <div className="mb-10 grid gap-4 lg:grid-cols-2">
            <AdsterraZone
              className="rounded-[1.75rem] border border-slate-200/90 bg-white/90 p-3 shadow-sm"
              optionsScript={`atOptions = {
  'key' : 'cc4425738f06f5ed0d6a50f38827eacf',
  'format' : 'iframe',
  'height' : 90,
  'width' : 728,
  'params' : {}
};`}
              scriptSrc="https://www.highperformanceformat.com/cc4425738f06f5ed0d6a50f38827eacf/invoke.js"
            />
            <AdsterraZone
              className="rounded-[1.75rem] border border-slate-200/90 bg-white/90 p-3 shadow-sm"
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
        ) : null}

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-5">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
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
            <p className="mt-1 max-w-[200px] text-[13px] leading-relaxed text-slate-500">
              Free browser-based tools. Your files never leave your device.
            </p>
          </div>

          {/* Tools col 1 */}
          <div>
            <h4 className="text-[12px] font-semibold uppercase tracking-wider text-slate-700">Image tools</h4>
            <ul className="mt-3 space-y-2">
              {allTools.slice(0, 5).map((t) => (
                <li key={t.href}>
                  <Link href={t.href} className="text-[13px] text-slate-500 transition-colors hover:text-brand-700">{t.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools col 2 */}
          <div>
            <h4 className="text-[12px] font-semibold uppercase tracking-wider text-slate-700">More tools</h4>
            <ul className="mt-3 space-y-2">
              {allTools.slice(5).map((t) => (
                <li key={t.href}>
                  <Link href={t.href} className="text-[13px] text-slate-500 transition-colors hover:text-brand-700">{t.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-[12px] font-semibold uppercase tracking-wider text-slate-700">Resources</h4>
            <ul className="mt-3 space-y-2">
              <li><Link href="/blog" className="text-[13px] text-slate-500 transition-colors hover:text-brand-700">Blog</Link></li>
              <li><Link href="/about" className="text-[13px] text-slate-500 transition-colors hover:text-brand-700">About</Link></li>
              <li><Link href="/privacy" className="text-[13px] text-slate-500 transition-colors hover:text-brand-700">Privacy Policy</Link></li>
              <li className="text-[13px] text-slate-500">Free forever</li>
            </ul>
          </div>

          <div className="col-span-2 sm:col-span-1">
            <h4 className="text-[12px] font-semibold uppercase tracking-wider text-slate-700">Popular searches</h4>
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
          <span>100% client-side processing</span>
        </div>
      </div>
    </footer>
  );
}
