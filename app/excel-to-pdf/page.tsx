import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import ToolSeoGrowth from "@/components/ToolSeoGrowth";

const ExcelToPdfClient = dynamic(() => import("./ExcelToPdfClient"), {
  loading: () => <div className="card animate-pulse h-64 bg-gray-50" />,
  ssr: false,
});

export const metadata: Metadata = {
  title: "Excel To PDF Online Free No Upload",
  description:
    "Use Excel To PDF online free with no upload required. Fast browser-based tool for secure file processing on desktop and mobile.",
  keywords: [
    "excel to pdf",
    "xlsx to pdf",
    "spreadsheet to pdf",
    "convert excel to pdf free",
    "excel to pdf online free no upload",
    "xlsx to pdf converter no signup",
    "convert spreadsheet to pdf online",
    "csv to pdf online free",
    "xls to pdf",
    "csv to pdf",
    "excel to pdf converter",
    "convert xlsx to pdf online",
  ],
  openGraph: {
    title: "Excel To PDF Online Free No Upload",
    description:
    "Use Excel To PDF online free with no upload required. Fast browser-based tool for secure file processing on desktop and mobile.",
    url: "https://thepdftools.site/excel-to-pdf",
    images: [{ url: "https://thepdftools.site/opengraph-image" }],
  },
  alternates: {
    canonical: "https://thepdftools.site/excel-to-pdf",
  },
};

export default function ExcelToPdfPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "Free Excel to PDF Converter",
        url: "https://thepdftools.site/excel-to-pdf",
        applicationCategory: "UtilityApplication",
        operatingSystem: "Any",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        description:
          "Convert Excel spreadsheets to PDF format free online. No signup, no upload — runs in your browser.",
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Is it safe to convert Excel files here?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, completely safe. Your Excel files never leave your browser. All conversion is done client-side using JavaScript, so no data is uploaded to any server.",
            },
          },
          {
            "@type": "Question",
            name: "What Excel formats are supported?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "XLSX (Excel 2007+) and CSV files are supported for free online Excel to PDF conversion. XLSX files provide the best results with full cell data extraction.",
            },
          },
          {
            "@type": "Question",
            name: "Does this preserve cell formatting?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "This converter extracts cell data and renders it as a formatted table in the PDF. Colors, merged cells, and formulas are not preserved. For full formatting, export directly from Excel.",
            },
          },
          {
            "@type": "Question",
            name: "Can I convert large spreadsheets?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. The tool handles large spreadsheets by auto-paginating the table across multiple PDF pages. Performance depends on your device's memory.",
            },
          },
        ],
      },
    ],
  };

  return (
    <div className="bg-[#f8fafc] py-10 sm:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] shadow-[0_24px_90px_-44px_rgba(79,70,229,0.18)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(79,70,229,0.1),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.08),transparent_24%)]" />
          <div className="relative px-6 py-10 sm:px-10 sm:py-12">
            <div className="mx-auto max-w-3xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700 shadow-sm ring-1 ring-brand-100">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0112 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M10.875 12h-1.5m1.5 0c.621 0 1.125.504 1.125 1.125M12 12h7.5m-7.5 0c0 .621.504 1.125 1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 0v1.5c0 .621-.504 1.125-1.125 1.125" />
                </svg>
                Excel to PDF
              </div>

              <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl lg:text-[3.6rem] lg:leading-[1.02]">
                Convert Excel to PDF
                <span className="block bg-gradient-to-r from-brand-600 via-secondary-600 to-tertiary-500 bg-clip-text text-transparent">
                  with table formatting
                </span>
              </h1>

              <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
                Upload an XLSX or CSV file and convert it to a formatted PDF table
                instantly in your browser. This free Excel to PDF converter works
                with no signup and no server upload, so your data stays private.
              </p>
            </div>

            <div className="mt-8">
              <ExcelToPdfClient />
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                { title: "Best for reports", text: "Convert spreadsheet data into shareable PDF reports with clean table formatting." },
                { title: "Best for printing", text: "PDF preserves table layout and column widths for professional printing." },
                { title: "Best for privacy", text: "Everything runs locally in your browser — your spreadsheet data never leaves your device." },
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
              <li>XLSX files produce the best results with full cell data extraction.</li>
              <li>CSV files are parsed directly — ensure comma-separated format.</li>
              <li>The first row is treated as a header row and displayed in bold in the PDF.</li>
            </ul>
          </div>
          <aside className="rounded-[1.75rem] border border-brand-100 bg-brand-50 p-6">
            <h2 className="text-lg font-semibold text-slate-900">Best For</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Financial reports", "Data tables", "Inventory lists", "Grade sheets"].map((item) => (
                <span key={item} className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-brand-700 shadow-sm">{item}</span>
              ))}
            </div>
          </aside>
        </div>

        <div className="mt-14 space-y-8">
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">How to Convert Excel to PDF Online</h2>
            <ol className="mt-3 list-inside list-decimal space-y-2 text-sm text-slate-600">
              <li>Upload your Excel file by dragging and dropping or clicking the upload area. XLSX and CSV formats are supported.</li>
              <li>Preview the extracted table data to verify the content looks correct.</li>
              <li>Click &quot;Convert to PDF&quot; to generate a formatted PDF with table borders and column sizing.</li>
              <li>Download your PDF instantly. The converted file is ready for sharing or printing.</li>
            </ol>
          </div>

          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Why Use Our Excel to PDF Converter?</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Table Formatting</h3>
                <p className="mt-1 text-sm text-slate-500">Cell data is rendered as a clean table with borders, headers in bold, and auto-sized columns for optimal readability in the PDF.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Multiple Formats</h3>
                <p className="mt-1 text-sm text-slate-500">Supports XLSX and CSV files. Upload your spreadsheet and get a formatted PDF table with your data.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Data Preview</h3>
                <p className="mt-1 text-sm text-slate-500">Preview your spreadsheet data in an HTML table before converting to PDF. Verify the content is correct before downloading.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">No Signup Required</h3>
                <p className="mt-1 text-sm text-slate-500">Start converting immediately without creating an account, providing an email address, or installing any software.</p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-[2rem] font-bold tracking-tight text-slate-900">Frequently Asked Questions</h2>
            <div className="mt-5 divide-y divide-slate-100">
              {[
                { q: "Is it safe to convert Excel files here?", a: "Absolutely. Your Excel files never leave your browser. All conversion runs client-side using JavaScript, so no data is uploaded to any server. Your spreadsheet data remains completely private on your device." },
                { q: "What Excel formats are supported?", a: "XLSX (Excel 2007+) and CSV (comma-separated values) files are supported. XLSX files provide the best results with full cell data extraction." },
                { q: "Will cell formatting be preserved?", a: "This converter extracts cell values and renders them as a formatted table in the PDF with borders and headers. Cell colors, merged cells, formulas, and charts are not preserved. For full visual fidelity, export directly from Microsoft Excel." },
                { q: "Can I convert large spreadsheets?", a: "Yes. The tool auto-paginates large tables across multiple PDF pages. Performance depends on your device's memory and processing power. Most spreadsheets convert smoothly." },
                { q: "Does it support multiple sheets?", a: "Currently the tool converts the first sheet (Sheet1) of your workbook. For multi-sheet workbooks, you can convert each sheet separately or combine them in a PDF merger tool." },
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

          {/* SEO Content */}
          <div className="mt-12 space-y-6 text-sm text-gray-500 leading-relaxed">
            <h2 className="text-lg font-semibold text-gray-900">About This Tool</h2>
            <p>Our free Excel to PDF converter transforms XLSX and CSV spreadsheets into clean, formatted PDF documents directly in your browser. The tool parses the internal XML structure of Excel files to extract cell data, shared strings, and sheet layout, then renders the content as a professional table in your PDF with borders, bold headers, and auto-sized columns. No data ever leaves your device.</p>
            <h2 className="text-lg font-semibold text-gray-900">Key Features</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Supports XLSX and CSV spreadsheet formats</li>
              <li>Renders data as formatted tables with borders and bold headers</li>
              <li>Auto-pagination for large spreadsheets across multiple PDF pages</li>
              <li>Live data preview before conversion</li>
            </ul>
            <p className="text-xs text-gray-400">Convert excel to pdf, xlsx to pdf converter, free online excel to pdf tool, spreadsheet to pdf no upload, convert csv to pdf, excel file to pdf format, xlsx to pdf free online converter, excel to pdf browser based, convert xls to pdf instantly, spreadsheet to pdf without installing software.</p>
          </div>

          <div className="rounded-[2rem] border border-dashed border-slate-200 bg-white p-8">
            <p className="text-[15px] leading-8 text-slate-500">
              Converting Excel spreadsheets to PDF is essential for sharing data in a universally viewable format. Whether you need to share financial reports with stakeholders, print inventory lists, distribute grade sheets, or archive data tables, our free online Excel to PDF converter handles it efficiently. The tool runs entirely in your browser using JavaScript, so your sensitive spreadsheet data never leaves your computer. It extracts cell values from the XML structure of XLSX files, parses CSV data directly, and generates a clean PDF with properly formatted tables, making your data presentation-ready instantly.
            </p>
          </div>

          <div>
            <h2 className="text-[2rem] font-bold tracking-tight text-slate-900">Related Document Tools</h2>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/word-to-pdf" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">Word to PDF</Link>
              <Link href="/pdf-merge" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">PDF Merge</Link>
              <Link href="/pdf-split" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">PDF Split</Link>
              <Link href="/html-to-pdf" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">HTML to PDF</Link>
              <Link href="/ppt-to-pdf" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">PPT to PDF</Link>
            </div>
          </div>
          <ToolSeoGrowth slug="excel-to-pdf" />
        </div>
      </div>
    </div>
  );
}
