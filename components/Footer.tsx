import Link from "next/link";

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
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-[#f8fafc] text-slate-600">
      <div className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-brand-600 via-secondary-600 to-tertiary-500 shadow-[0_12px_28px_-16px_rgba(79,70,229,0.65)]">
                <span className="text-white text-xs font-black">P</span>
              </div>
              <span className="text-sm font-bold text-slate-900">thepdftools</span>
            </Link>
            <p className="mt-3 max-w-[200px] text-[13px] leading-relaxed text-slate-500">
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
            <h4 className="text-[12px] font-semibold uppercase tracking-wider text-slate-700">Privacy</h4>
            <ul className="mt-3 space-y-2 text-[13px] text-slate-500">
              <li>No signup needed</li>
              <li>No data collection</li>
              <li>Works on any device</li>
              <li>Free forever</li>
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
