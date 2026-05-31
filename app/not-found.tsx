import Link from "next/link";

const popularTools = [
  { href: "/pdf-compress", label: "Compress PDF" },
  { href: "/pdf-merge", label: "Merge PDF" },
  { href: "/pdf-split", label: "Split PDF" },
  { href: "/pdf-to-word", label: "PDF to Word" },
  { href: "/image-compressor", label: "Compress Image" },
  { href: "/jpg-to-png", label: "JPG to PNG" },
  { href: "/qr-generator", label: "QR Code Generator" },
  { href: "/json-formatter", label: "JSON Formatter" },
];

const categories = [
  { href: "/pdf-tools", label: "PDF Tools", count: "30+" },
  { href: "/image-tools", label: "Image Tools", count: "18+" },
  { href: "/developer-tools", label: "Developer Tools", count: "7+" },
  { href: "/generators", label: "Generators", count: "6+" },
  { href: "/document-tools", label: "Document Tools", count: "11+" },
  { href: "/utility-tools", label: "Utility Tools", count: "5+" },
];

export default function NotFound() {
  return (
    <div className="bg-[#f8fafc] py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-50 text-2xl font-black text-brand-400">
          404
        </div>
        <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-slate-900">
          Page not found
        </h1>
        <p className="mt-3 text-base text-slate-500">
          This page doesn&apos;t exist or has been moved. Find the tool you need below.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand-700 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-800"
        >
          Go to Homepage
        </Link>
      </div>

      <div className="mx-auto mt-16 max-w-4xl px-4 sm:px-6">
        <h2 className="text-center text-lg font-bold text-slate-900">Popular Tools</h2>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          {popularTools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700"
            >
              {tool.label}
            </Link>
          ))}
        </div>

        <h2 className="mt-12 text-center text-lg font-bold text-slate-900">Browse by Category</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {categories.map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:border-brand-300 hover:shadow-md"
            >
              <span className="text-[14px] font-semibold text-slate-900 group-hover:text-brand-700">{cat.label}</span>
              <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-semibold text-slate-500">{cat.count}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
