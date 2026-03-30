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
    <footer className="bg-gray-900 text-gray-400">
      <div className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="h-7 w-7 rounded-md bg-brand-600 flex items-center justify-center">
                <span className="text-white text-xs font-black">P</span>
              </div>
              <span className="text-sm font-bold text-white">thepdftools</span>
            </Link>
            <p className="mt-3 text-[13px] text-gray-500 leading-relaxed max-w-[200px]">
              Free browser-based tools. Your files never leave your device.
            </p>
          </div>

          {/* Tools col 1 */}
          <div>
            <h4 className="text-[12px] font-semibold text-gray-300 uppercase tracking-wider">Image tools</h4>
            <ul className="mt-3 space-y-2">
              {allTools.slice(0, 5).map((t) => (
                <li key={t.href}>
                  <Link href={t.href} className="text-[13px] text-gray-500 hover:text-white transition-colors">{t.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools col 2 */}
          <div>
            <h4 className="text-[12px] font-semibold text-gray-300 uppercase tracking-wider">More tools</h4>
            <ul className="mt-3 space-y-2">
              {allTools.slice(5).map((t) => (
                <li key={t.href}>
                  <Link href={t.href} className="text-[13px] text-gray-500 hover:text-white transition-colors">{t.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-[12px] font-semibold text-gray-300 uppercase tracking-wider">Privacy</h4>
            <ul className="mt-3 space-y-2 text-[13px] text-gray-500">
              <li>No signup needed</li>
              <li>No data collection</li>
              <li>Works on any device</li>
              <li>Free forever</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-gray-800 text-[12px] text-gray-600 flex flex-col sm:flex-row justify-between gap-2">
          <span>&copy; {new Date().getFullYear()} thepdftools. All rights reserved.</span>
          <span>100% client-side processing</span>
        </div>
      </div>
    </footer>
  );
}
