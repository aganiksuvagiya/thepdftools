import Link from "next/link";

const categories = [
  { href: "/pdf-tools", label: "PDF Tools", desc: "Merge, split, compress & convert PDF" },
  { href: "/image-tools", label: "Image Tools", desc: "Compress, resize, convert & edit images" },
  { href: "/developer-tools", label: "Developer Tools", desc: "JSON, Base64, URL encoder & more" },
  { href: "/generators", label: "Generators", desc: "QR codes, passwords, lorem ipsum" },
];

const popularTools = [
  { href: "/pdf-compress", label: "Compress PDF" },
  { href: "/pdf-merge", label: "Merge PDF" },
  { href: "/pdf-to-word", label: "PDF to Word" },
  { href: "/image-compressor", label: "Compress Image" },
  { href: "/jpg-to-png", label: "JPG to PNG" },
  { href: "/qr-generator", label: "QR Code Generator" },
];

export default function BlogFooterLinks() {
  return (
    <div className="mt-12 space-y-8">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
        <h2 className="text-lg font-bold text-slate-900">Browse Tool Categories</h2>
        <p className="mt-1 text-sm text-slate-500">Free tools for PDF, images, and developers — no sign-up required.</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {categories.map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              className="group flex flex-col rounded-xl border border-slate-100 bg-slate-50 p-4 transition-all hover:border-brand-200 hover:bg-white"
            >
              <span className="text-[14px] font-semibold text-slate-900 group-hover:text-brand-700">{cat.label} →</span>
              <span className="mt-0.5 text-[12px] text-slate-500">{cat.desc}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
        <h2 className="text-lg font-bold text-slate-900">Popular Free Tools</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {popularTools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-brand-300 hover:text-brand-700"
            >
              {tool.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
