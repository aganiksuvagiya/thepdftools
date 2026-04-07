import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";

const PdfToExcelClient = dynamic(() => import("./PdfToExcelClient"), {
  loading: () => <div className="card animate-pulse h-64 bg-gray-50" />,
  ssr: false,
});

export const metadata: Metadata = {
  title: "Free PDF to Excel Converter Online — Convert PDF to XLSX Instantly",
  description:
    "Convert PDF files to Excel spreadsheets for free online. Extract tables from PDFs and download as .xlsx files. No upload, no signup — runs entirely in your browser.",
  keywords: [
    "pdf to excel",
    "convert pdf to excel",
    "pdf to xlsx",
    "pdf to spreadsheet",
    "pdf to excel converter free",
    "extract table from pdf",
    "pdf table extractor",
    "pdf data extraction",
    "pdf to excel online",
    "free pdf to xlsx converter",
  ],
  openGraph: {
    title: "Free PDF to Excel Converter Online — Convert PDF to XLSX Instantly",
    description:
      "Convert PDF files to Excel spreadsheets for free online. Extract tables from PDFs and download as .xlsx files. No upload, no signup — runs entirely in your browser.",
    url: "https://thepdftools.site/pdf-to-excel",
    images: [{ url: "https://thepdftools.site/og-image.png" }],
  },
  alternates: {
    canonical: "https://thepdftools.site/pdf-to-excel",
  },
};

export default function PdfToExcelPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "Free PDF to Excel Converter",
        url: "https://thepdftools.site/pdf-to-excel",
        applicationCategory: "UtilityApplication",
        operatingSystem: "Any",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        description:
          "Convert PDF files to Excel spreadsheets for free online. Extract tables and download as .xlsx — runs entirely in your browser.",
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Is it safe to convert PDFs to Excel here?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, completely safe. Your PDF files never leave your browser. All table extraction and conversion is done client-side using JavaScript, so no data is uploaded to any server.",
            },
          },
          {
            "@type": "Question",
            name: "What kind of PDFs work best for Excel conversion?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "This tool works best with text-based PDFs that contain structured tabular data such as invoices, financial reports, and data tables. Scanned PDFs (images) will not produce extractable data.",
            },
          },
          {
            "@type": "Question",
            name: "Will the table structure be preserved?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The tool detects rows and columns from text positioning in the PDF and organizes them into spreadsheet cells. Simple tables with consistent spacing are extracted most accurately.",
            },
          },
          {
            "@type": "Question",
            name: "What format is the output file?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The output is a .xlsx file that can be opened in Microsoft Excel, Google Sheets, LibreOffice Calc, and other spreadsheet applications.",
            },
          },
          {
            "@type": "Question",
            name: "Is there a file size limit?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "There is no server-imposed file size limit. Since processing happens locally in your browser, the practical limit depends on your device's available memory. Files up to 100 MB typically work without issues.",
            },
          },
        ],
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://thepdftools.site" },
          { "@type": "ListItem", "position": 2, "name": "PDF to Excel", "item": "https://thepdftools.site/pdf-to-excel" },
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
        {/* HERO CARD */}
        <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] shadow-[0_24px_90px_-44px_rgba(79,70,229,0.18)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(79,70,229,0.1),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.08),transparent_24%)]" />
          <div className="relative px-6 py-10 sm:px-10 sm:py-12">
            <div className="mx-auto max-w-3xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700 shadow-sm ring-1 ring-brand-100">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
                PDF to Excel
              </div>

              <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl lg:text-[3.6rem] lg:leading-[1.02]">
                Convert PDF to Excel
                <span className="block bg-gradient-to-r from-brand-600 via-secondary-600 to-tertiary-500 bg-clip-text text-transparent">
                  spreadsheets instantly
                </span>
              </h1>

              <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
                Extract tables and data from PDF files and convert them to editable
                Excel spreadsheets. Everything runs in your browser — no upload, no
                server, completely private.
              </p>
            </div>

            <div className="mt-8">
              <PdfToExcelClient />
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                { title: "Best for data", text: "Extract tables, invoices, and structured data from PDFs into organized spreadsheets." },
                { title: "Best for reports", text: "Convert financial statements, analytics reports, and summaries into editable Excel files." },
                { title: "Best for privacy", text: "All conversion happens in your browser using JavaScript — no files leave your device." },
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
              <li>Works best with text-based PDFs that contain structured tables.</li>
              <li>Tables with consistent column spacing produce the most accurate results.</li>
              <li>Review extracted data in the preview before downloading the Excel file.</li>
            </ul>
          </div>
          <aside className="rounded-[1.75rem] border border-brand-100 bg-brand-50 p-6">
            <h2 className="text-lg font-semibold text-slate-900">Best For</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Invoices & receipts", "Financial reports", "Data tables", "Price lists"].map((item) => (
                <span key={item} className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-brand-700 shadow-sm">{item}</span>
              ))}
            </div>
          </aside>
        </div>

        <div className="mt-14 space-y-8">
          {/* How-to */}
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">How to Convert PDF to Excel Online</h2>
            <ol className="mt-3 list-inside list-decimal space-y-2 text-sm text-slate-600">
              <li>Upload your PDF file by clicking the upload area or dragging it in.</li>
              <li>The tool automatically extracts tabular data from your PDF document.</li>
              <li>Preview the extracted rows and columns in the data table to verify accuracy.</li>
              <li>Click the download button to save your Excel (.xlsx) spreadsheet file.</li>
              <li>Open the file in Microsoft Excel, Google Sheets, or LibreOffice Calc to edit.</li>
            </ol>
          </div>

          {/* Why section */}
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Why Use Our PDF to Excel Converter?</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Smart Table Detection</h3>
                <p className="mt-1 text-sm text-slate-500">Automatically detects rows and columns from text positioning in your PDF, organizing data into a clean spreadsheet structure.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Editable Output</h3>
                <p className="mt-1 text-sm text-slate-500">The output .xlsx file is fully editable in Microsoft Excel, Google Sheets, LibreOffice Calc, and other popular spreadsheet apps.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">No Signup Required</h3>
                <p className="mt-1 text-sm text-slate-500">Start converting immediately without creating an account, providing an email address, or installing any software.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-medium text-slate-900">Fast Conversion</h3>
                <p className="mt-1 text-sm text-slate-500">Processing runs locally in your browser using JavaScript, delivering results in seconds without waiting for server-side processing.</p>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-[2rem] font-bold tracking-tight text-slate-900">Frequently Asked Questions</h2>
            <div className="mt-5 divide-y divide-slate-100">
              {[
                { q: "Is it safe to convert PDFs to Excel here?", a: "Yes, completely safe. Your PDF files never leave your browser. All table extraction and conversion is done client-side using JavaScript, so no data is uploaded to any server." },
                { q: "What kind of PDFs work best for Excel conversion?", a: "This tool works best with text-based PDFs that contain structured tabular data such as invoices, financial reports, and data tables. Scanned PDFs (images) will not produce extractable data." },
                { q: "Will the table structure be preserved?", a: "The tool detects rows and columns from text positioning in the PDF and organizes them into spreadsheet cells. Simple tables with consistent spacing are extracted most accurately." },
                { q: "Can I convert large PDF files?", a: "Yes. There is no server-imposed size limit. Since conversion runs in your browser, very large files may take longer depending on your device's processing power and available memory." },
                { q: "Is this tool completely free?", a: "Yes, 100% free with no hidden costs, no trial period, and no premium tier. Convert as many PDFs to Excel as you like without any restrictions." },
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
            <p className="text-[15px] leading-8 text-slate-500">Convert PDF to Excel online for free with our browser-based PDF to XLSX converter. Extract tables, data, and structured content from PDF documents and download editable Excel spreadsheets instantly. This free PDF to Excel converter is perfect for extracting invoices, financial reports, price lists, and tabular data from PDF files. No server upload, no signup, no watermark — your files stay private on your device. Our smart table detection automatically identifies rows and columns, making it easy to turn static PDF tables into dynamic spreadsheets you can sort, filter, and analyze.</p>
          </div>

          {/* Related tools */}
          <div>
            <h2 className="text-[2rem] font-bold tracking-tight text-slate-900">Related PDF Tools</h2>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/pdf-to-word" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">PDF to Word</Link>
              <Link href="/pdf-merge" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">PDF Merge</Link>
              <Link href="/pdf-split" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">PDF Split</Link>
              <Link href="/excel-to-pdf" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-700">Excel to PDF</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
