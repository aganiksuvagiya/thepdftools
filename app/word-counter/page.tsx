import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import SeoReferences from "@/components/SeoReferences";
import { buildOrganizationSchema, buildPageMetadata, buildWebsiteSchema } from "@/lib/seo-page";
import { getLastUpdated } from "@/lib/last-updated";

const WordCounterClient = dynamic(() => import("./WordCounterClient"), {
  loading: () => <div className="card h-64 animate-pulse bg-gray-50" />,
  ssr: false,
});

const pageTitle = "PDF Word Count Tool - Count Words in PDF Online Free";
const pageDescription =
  "Count words in PDF online free. Get accurate PDF word count, character count, reading time, page count, and OCR help for scanned PDFs in your browser.";

const faqs = [
  {
    q: "What is a PDF word counter?",
    a: "A PDF word counter is a tool that extracts text from a PDF and totals the words, characters, pages, and other text metrics so you can measure document length accurately.",
  },
  {
    q: "How do I count words in a PDF online?",
    a: "Upload a text-based PDF, let the tool read the text layer, and review the total word count, character count, and page-by-page breakdown. If the file is scanned, use OCR first.",
  },
  {
    q: "Does this free PDF word counter work for scanned PDFs?",
    a: "Scanned PDFs often need OCR because they store text as images instead of selectable text. This page supports that workflow by flagging image-only files and guiding you toward OCR.",
  },
  {
    q: "Can I count characters in a PDF too?",
    a: "Yes. Along with total words, the tool reports character count, characters without spaces, paragraphs, reading time, and page count.",
  },
  {
    q: "Why is my PDF word count lower than expected?",
    a: "The most common causes are scanned pages, missing text layers, unusual fonts, text embedded inside images, or extraction restrictions. OCR or a searchable version of the file usually fixes the issue.",
  },
  {
    q: "Can I count words in a multi-page PDF?",
    a: "Yes. The full document is analyzed and the tool can show page-level previews so you can see where the text is concentrated.",
  },
  {
    q: "Is this better than copying PDF text into a normal word counter?",
    a: "Usually yes, because copying text manually can miss headers, page content, hidden spacing, or entire pages. A dedicated PDF word counter measures the document closer to its source structure.",
  },
  {
    q: "Can I use this for essays, reports, contracts, or research PDFs?",
    a: "Yes. A PDF word count is useful for academic submissions, business documents, legal drafts, policy manuals, proposals, and any file where total text length matters.",
  },
  {
    q: "Is this page only for word count or also for PDF text extraction?",
    a: "The main job is PDF word counting, but the page also previews extracted text so you can validate the count before you trust it.",
  },
  {
    q: "What is the difference between PDF word count and PDF OCR?",
    a: "PDF word count measures text that already exists in the file. OCR is used when the PDF is scanned and the visible words need to be recognized before they can be counted.",
  },
  {
    q: "Will my PDF be uploaded to a server?",
    a: "The site is built around browser-first workflows, which keeps the experience simpler and more privacy-friendly for users handling business, school, or personal documents.",
  },
  {
    q: "Can I use a PDF word counter on mobile?",
    a: "Yes. As long as your device can open the page and process the file in a modern browser, you can count PDF words on desktop or mobile.",
  },
  {
    q: "How accurate is online PDF word count?",
    a: "It is usually accurate for text-based PDFs. Accuracy depends on whether the file contains a readable text layer and whether the extraction reflects the visible layout correctly.",
  },
  {
    q: "What if I need to edit the PDF after counting words?",
    a: "A common next step is to open PDF to Word for editing, PDF Editor for direct changes, or PDF OCR if the source file is scanned.",
  },
  {
    q: "Which related tools should I use after counting words in PDF?",
    a: "The strongest follow-up tools are PDF OCR, PDF to Word, PDF Editor, PDF Highlight, and the main PDF Tools hub.",
  },
] as const;

const peopleAlsoAsk = [
  {
    q: "How can I count words in a PDF for free?",
    a: "Upload a text-based PDF, let the tool extract the text layer, and review the total words, characters, pages, and reading time. This gives a more reliable result than copying text manually because the count comes from the document itself.",
  },
  {
    q: "Can I count characters in a PDF online?",
    a: "Yes. A PDF character count tool can total characters with spaces and without spaces after extracting the text from the file. That is useful for publishing fields, abstract limits, portal restrictions, and metadata-heavy workflows.",
  },
  {
    q: "How do I get a word count from a scanned PDF?",
    a: "Run OCR first. A scanned PDF usually stores each page as an image, so the words are not machine-readable until optical character recognition creates a searchable text layer that can be counted accurately.",
  },
  {
    q: "Is there a PDF word counter that works without copying text?",
    a: "Yes. A PDF-specific counter reads the file directly, which is faster and usually more accurate than copy-paste counting, especially for multi-page reports, contracts, assignments, and research papers.",
  },
  {
    q: "What is the best way to count words in a long PDF document?",
    a: "Use a PDF word count tool that shows total words, page count, extracted-text preview, and page-level summaries. That combination helps you verify the result instead of trusting one number with no context.",
  },
  {
    q: "Why is my PDF word count lower than expected?",
    a: "The file may be scanned, missing a clean text layer, or using fonts and layout structures that extract poorly. Check the preview first. If the text looks incomplete, OCR or a cleaner export is usually the fix.",
  },
  {
    q: "Can I count words in a password-protected PDF?",
    a: "Only after the file is accessible for reading. If the PDF is locked, unlock it first, then run the word count so the browser can access the text layer on each page.",
  },
  {
    q: "Does PDF word count work on mobile?",
    a: "Usually yes. Modern mobile browsers can analyze PDFs, but very large or scanned files may be easier to process on desktop because OCR and long multi-page analysis use more device memory and CPU time.",
  },
  {
    q: "What is the difference between PDF word count and Microsoft Word word count?",
    a: "Microsoft Word counts the editable source file. PDF word count measures the exported document. Those totals can differ if the PDF includes hidden layout changes, missing pages, image-only content, or export-related text issues.",
  },
  {
    q: "Can Adobe PDF files always be counted accurately?",
    a: "Not always. Adobe PDF is a container format, not a guarantee that the file has clean selectable text. Accuracy still depends on whether the PDF contains a usable text layer and whether extraction matches the visible content.",
  },
  {
    q: "How does reading time for a PDF work?",
    a: "Reading time is estimated from total words, often using a standard reading-speed baseline. It is useful for review planning, teaching materials, client handoffs, onboarding documents, and long-form research PDFs.",
  },
  {
    q: "Can I count words in a research paper PDF?",
    a: "Yes. PDF word count is useful for journal drafts, conference papers, appendices, and literature reviews. It helps verify submission length after export, which matters because the PDF can differ from the source document.",
  },
  {
    q: "Can teachers use PDF word count for assignments?",
    a: "Yes. Teachers can review assignment length, estimate grading time, and spot unusually short or long submissions. It is especially helpful when students submit only PDFs instead of editable documents.",
  },
  {
    q: "Does the count include headers and footers?",
    a: "Usually yes if those areas are stored as real text in the PDF. That is another reason a PDF-specific counter is better than manual copy-paste, which may miss repeating page elements.",
  },
  {
    q: "Can a PDF word counter analyze contracts?",
    a: "Yes. Contracts, statements of work, policy files, and legal exhibits are common use cases because word count and page-level preview help teams estimate review scope before markup or approval begins.",
  },
  {
    q: "Does OCR change the original PDF file?",
    a: "OCR does not have to change the original source document in place. In most workflows, it creates readable text output or a searchable version that makes counting, searching, copying, and reviewing much easier.",
  },
  {
    q: "Can I count words in image-heavy PDFs?",
    a: "Yes, but results depend on how much real text exists in the file. If a page is mostly images or screenshots, OCR may be required to extract the visible text before the count becomes meaningful.",
  },
  {
    q: "What is document analysis in a PDF workflow?",
    a: "Document analysis means measuring and reviewing document properties such as word count, character count, page count, reading time, text extraction quality, and page-by-page distribution before the file moves to editing or review.",
  },
  {
    q: "Can I use PDF word count for publishing?",
    a: "Yes. Publishers and editorial teams use it to validate body-copy volume, compare proofs, estimate reading time, and check whether the final exported PDF still reflects the expected amount of text.",
  },
  {
    q: "Why do scanned assignments often show zero words?",
    a: "Because the pages are images, not text. The assignment may look readable to a person but still contain no machine-readable words until OCR converts the page images into searchable text.",
  },
  {
    q: "Is browser-based PDF word count private?",
    a: "It is more privacy-friendly than server upload workflows because the analysis can happen in the browser. That is useful for resumes, legal drafts, academic work, and internal business documents where content sensitivity matters.",
  },
  {
    q: "Does this tool store my PDF after counting words?",
    a: "The workflow is designed around browser processing, so the document does not need to be stored on an application server for word counting. Resetting or closing the session clears the locally processed file from the page state.",
  },
  {
    q: "How does HTTPS help with PDF tools?",
    a: "HTTPS encrypts the connection used to load the page and its assets. When the file itself is processed in the browser rather than uploaded, you also avoid unnecessary transmission of the PDF contents to a remote server.",
  },
  {
    q: "Can I compare two PDFs by word count?",
    a: "Yes. Comparing total words, characters, and page distribution can quickly show whether two drafts differ in length before you move into a deeper comparison or redlining workflow.",
  },
  {
    q: "What file types usually produce the most accurate PDF word count?",
    a: "Text-based PDFs exported from Microsoft Word, Google Docs, Pages, and similar editors usually perform best because the text layer is already embedded in a readable form.",
  },
  {
    q: "Can metadata affect PDF word count?",
    a: "Metadata usually does not matter as much as the text layer itself, but export settings, embedded structure, accessibility tagging, and font encoding can influence how reliably the visible text is extracted.",
  },
  {
    q: "What if my PDF mixes typed text and scanned pages?",
    a: "Mixed PDFs can still be analyzed, but some pages may count accurately while scanned pages undercount. Page summaries and text preview help you spot which sections need OCR.",
  },
  {
    q: "Can businesses use PDF statistics for reports?",
    a: "Yes. Teams use PDF statistics to estimate review time, compare draft size, audit client deliverables, and decide whether a report needs editing, splitting, or conversion before it moves forward.",
  },
  {
    q: "What is the fastest way to verify a PDF word count result?",
    a: "Check the extracted text preview, scan the page-by-page summaries, and confirm that the PDF is text-based. Those three checks usually reveal whether the count is trustworthy within seconds.",
  },
  {
    q: "Should I count the PDF or the original Word file?",
    a: "Count the version you will actually submit, publish, share, or review. If the final deliverable is a PDF, the PDF should be measured because exported layouts and scanned pages can change the real count.",
  },
  {
    q: "Can I estimate speaking time from a PDF word count?",
    a: "Yes. Once you know the total words, you can estimate speaking time for presentations, lectures, or recorded narration. Speaking speed is usually slower than reading speed, so it is best treated as a planning estimate rather than an exact duration.",
  },
  {
    q: "Does PDF word count include sentence count?",
    a: "Sentence count is a related text statistic, but it depends on punctuation quality, abbreviations, and extraction cleanliness. Even when a page focuses on word count first, sentence count is still useful for readability and editing workflows.",
  },
  {
    q: "Can I use PDF word count for books or manuscripts?",
    a: "Yes. Long PDFs such as books, manuscripts, manuals, and training documents benefit from page-level summaries, reading-time estimates, and OCR checks because even small extraction issues can affect totals across hundreds of pages.",
  },
  {
    q: "What happens with encrypted PDFs?",
    a: "Encrypted or restricted PDFs may block text access until the file is unlocked. If the browser cannot read the text layer, the document has to be opened or unlocked before a reliable word count can happen.",
  },
  {
    q: "Does language detection matter for PDF text statistics?",
    a: "Language detection can matter in multilingual or OCR-heavy workflows because punctuation, token patterns, and recognition quality vary by language. For straightforward English PDFs, basic word and character counting is usually enough.",
  },
  {
    q: "Can I count paragraphs in a PDF?",
    a: "Yes, paragraph count can be estimated from the extracted text structure. It is useful for academic writing, editing, readability review, and layout checks, especially when long documents need structural analysis beyond one total word count.",
  },
  {
    q: "Can I use PDF word count for business reports and board packs?",
    a: "Yes. Business teams use PDF statistics to estimate review effort, compare revisions, and see whether a final report, proposal, or board pack has grown significantly before approval or distribution.",
  },
] as const;

const howToSteps = [
  "Upload your PDF file into the PDF word count tool.",
  "Run the analyzer to read the text layer across all pages.",
  "Review total words, characters, characters without spaces, paragraphs, page count, and reading time.",
  "Check the extracted text preview and page summaries to confirm the result looks accurate.",
  "If the PDF is scanned or image-based, run OCR first and then count the words again.",
] as const;

const semanticKeywords = [
  "pdf word counter",
  "word counter pdf",
  "online pdf word count",
  "count words in pdf",
  "pdf word count online",
  "free pdf word counter",
  "count characters in pdf",
  "scanned pdf word count",
  "pdf character count",
  "count text in pdf",
] as const;

const longTailKeywords = [
  "how to count words in a pdf online free",
  "best free pdf word counter for scanned documents",
  "count characters in pdf without copying text",
  "online pdf word count for multi page document",
  "how to get word count from scanned pdf using ocr",
  "free pdf word counter with page count and reading time",
  "count words in pdf report before submission",
  "pdf word count online for essays and research papers",
] as const;

const relatedTools = [
  {
    href: "/pdf-ocr",
    label: "PDF OCR",
    text: "Turn scanned PDFs into readable text before running a full word count.",
  },
  {
    href: "/pdf-to-word",
    label: "PDF to Word",
    text: "Extract editable text after measuring PDF length and content volume.",
  },
  {
    href: "/pdf-editor",
    label: "PDF Editor",
    text: "Revise headings, delete filler text, and update sections after checking document size.",
  },
  {
    href: "/pdf-highlight",
    label: "PDF Highlighter",
    text: "Review important sections once you know where the text is concentrated inside the file.",
  },
  {
    href: "/pdf-tools",
    label: "All PDF Tools",
    text: "Open the full PDF toolkit for OCR, editing, conversion, compression, and text extraction workflows.",
  },
] as const;

const quickLinks = [
  { href: "#quick-answers", label: "Quick answers" },
  { href: "#what-is-pdf-word-count", label: "What is PDF word count" },
  { href: "#how-pdf-word-count-works", label: "How it works" },
  { href: "#benefits-of-pdf-word-count", label: "Benefits" },
  { href: "#best-practices", label: "Best practices" },
  { href: "#who-uses-this-tool", label: "Who uses it" },
  { href: "#ocr-for-scanned-pdfs", label: "OCR and scanned PDFs" },
  { href: "#accuracy-and-supported-pdfs", label: "Accuracy and supported PDFs" },
  { href: "#privacy-security-performance", label: "Privacy, security, performance" },
  { href: "#people-also-ask", label: "People also ask" },
  { href: "#faq", label: "FAQ" },
] as const;

const audienceGroups = [
  {
    title: "Students",
    text: "Students use PDF word count tools to check essay limits, scholarship submissions, coursework exports, and dissertation chapters before uploading final PDFs.",
  },
  {
    title: "Teachers",
    text: "Teachers and instructors use PDF statistics to review assignment length, compare student submissions, and estimate reading time across multiple documents.",
  },
  {
    title: "Researchers",
    text: "Researchers use document word count data to measure papers, appendices, reports, literature reviews, and multi-page PDFs before submission or peer review.",
  },
  {
    title: "Businesses",
    text: "Business teams use a PDF analyzer to audit proposals, reports, SOPs, policy files, and onboarding documents without moving text into another app.",
  },
  {
    title: "Authors",
    text: "Authors and editors use PDF word counter workflows to compare drafts, estimate reading time, and verify how much content made it into a final exported PDF.",
  },
  {
    title: "Legal Professionals",
    text: "Legal teams use PDF text statistics when reviewing agreements, statements, filings, exhibits, and scanned records where document length affects review effort.",
  },
  {
    title: "Publishers",
    text: "Publishers and production teams use PDF character count and word count checks to validate page-heavy layouts, proof files, and submission packages.",
  },
] as const;

const supportedPdfTypes = [
  "Text-based PDFs exported from Word, Google Docs, Pages, LibreOffice, and similar editors.",
  "PDF reports, manuals, essays, proposals, contracts, and research papers with selectable text.",
  "Multi-page PDFs where page-level summaries help verify where text appears.",
  "Scanned or photographed PDFs after OCR has created a searchable text layer.",
  "Mixed PDFs that contain both real text and image-based pages, where previewing extraction helps catch gaps.",
] as const;

const accuracyFactors = [
  "Text-based PDFs are usually the most accurate because the words already exist as machine-readable text.",
  "Scanned PDFs need OCR before a final word count is trustworthy.",
  "Tables, unusual fonts, layered exports, and broken encoding can affect extraction quality.",
  "Page previews and extracted-text review help catch missing or malformed sections before you trust the totals.",
  "Rechecking after edits or re-exports helps ensure you are measuring the latest version of the document.",
] as const;

const privacySecurityPoints = [
  {
    title: "Privacy",
    text: "Browser-first PDF analysis reduces unnecessary handoffs and is a better fit for resumes, contracts, academic files, and internal business documents.",
  },
  {
    title: "Security",
    text: "Previewing extracted text before reuse gives you a quick validation step, which is especially helpful when the source file is sensitive or accuracy matters.",
  },
  {
    title: "Performance",
    text: "Small text-based PDFs are usually quick to analyze, while long or scanned files may take more time because the browser has to process every page or run OCR.",
  },
] as const;

const snippetAnswers = [
  {
    title: "What is PDF word count?",
    text: "PDF word count is the total number of machine-readable words inside a PDF document. A good PDF word counter also reports characters, pages, paragraphs, reading time, and warns when OCR is needed for scanned files.",
  },
  {
    title: "How do you count words in a PDF?",
    text: "Upload the PDF, read its text layer, total the words across all pages, then verify the result with text preview and page summaries. If the file is scanned, run OCR first for an accurate count.",
  },
  {
    title: "Why do some PDFs show zero words?",
    text: "A PDF can show zero or very low words when it stores each page as an image instead of text. In those cases, OCR is required before the document can be counted reliably.",
  },
] as const;

const didYouKnowFacts = [
  "A PDF can look perfectly readable on screen and still contain no selectable text at all.",
  "The final PDF can have a different word count from the original Microsoft Word file after export, layout changes, or scanning.",
  "Character count is often more useful than word count for submission portals, publishing systems, and metadata fields with strict limits.",
] as const;

const warningBoxes = [
  {
    title: "Warning: scanned PDFs can undercount badly",
    text: "If the preview is empty or broken, do not trust the first result. OCR is the correct next step for image-only PDFs, photographed pages, archived records, and many classroom scans.",
  },
  {
    title: "Warning: count the final file, not the source draft",
    text: "If the document will be submitted or shared as a PDF, measure the PDF version. Export changes, missing pages, and image-based content can make the final count differ from the source document.",
  },
] as const;

const bestPractices = [
  "Count the final PDF version you will actually submit, publish, or review.",
  "Check extracted text preview before trusting the number on high-stakes documents.",
  "Run OCR on scanned, photographed, or archive PDFs before making decisions from the count.",
  "Review both word count and character count when a system may enforce either limit.",
  "Recount the document after edits, conversions, or a new export from Adobe PDF or Microsoft Word.",
] as const;

const checklistItems = [
  "Confirm you are counting the final PDF, not an older source draft.",
  "Verify the file is text-based or run OCR if it is scanned.",
  "Review the extracted text preview for missing or broken sections.",
  "Check page count, word count, and character count together.",
  "Recount after edits, conversions, or a new export before submission.",
] as const;

const entityCards = [
  {
    title: "PDF text extraction",
    text: "Text extraction reads the machine-readable layer inside a PDF so the document can be counted, searched, copied, and reviewed.",
  },
  {
    title: "OCR",
    text: "OCR converts scanned page images into readable text, which is essential for word count on image-only PDFs.",
  },
  {
    title: "Reading time",
    text: "Reading time turns total word count into a planning metric for reviews, assignments, training packs, and long reports.",
  },
  {
    title: "Metadata and export structure",
    text: "Export settings, accessibility tags, font encoding, and page structure can influence how faithfully text is extracted from a PDF.",
  },
  {
    title: "Sentence and paragraph statistics",
    text: "Sentence count and paragraph count help reviewers understand structure, readability, and writing density beyond one raw word total.",
  },
  {
    title: "Speaking time and reading speed",
    text: "Reading-time and speaking-time estimates turn document statistics into planning signals for teaching, presenting, reviewing, and publishing workflows.",
  },
  {
    title: "Encrypted and restricted PDFs",
    text: "Locked or encrypted PDFs may prevent reliable text extraction until the file is unlocked, which is why access status matters before trusting any count.",
  },
  {
    title: "Language detection and OCR quality",
    text: "Language patterns can affect OCR quality and text segmentation, especially in multilingual, scanned, or symbol-heavy documents.",
  },
] as const;

const relatedGuides = [
  {
    href: "/blog/extract-text-from-scanned-pdf-ocr",
    label: "How to extract text from scanned PDF with OCR",
    text: "A step-by-step guide for turning image-based PDFs into searchable text before counting words.",
  },
  {
    href: "/blog/convert-word-to-pdf-free",
    label: "How to convert Word to PDF free",
    text: "Helpful when you want to compare the source document with the exported PDF version you will actually share.",
  },
  {
    href: "/blog/best-free-online-tools-for-students-2026",
    label: "Best free online tools for students",
    text: "Useful for assignment workflows where PDF submissions, word count checks, and OCR often appear together.",
  },
] as const;

const popularPdfTools = [
  { href: "/pdf-ocr", label: "Extract text with PDF OCR" },
  { href: "/pdf-to-word", label: "Convert PDF to Word" },
  { href: "/pdf-editor", label: "Edit the PDF after counting" },
  { href: "/pdf-compare", label: "Compare two PDF drafts" },
  { href: "/pdf-highlight", label: "Highlight important sections" },
  { href: "/pdf-tools", label: "Browse all PDF tools" },
] as const;

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  url: "https://thepdftools.site/word-counter",
  keywords: [
    ...semanticKeywords,
    ...longTailKeywords,
    "pdf word count",
    "pdf word count tool",
    "word count pdf online",
    "pdf statistics",
    "document analysis",
    "pdf text extraction",
    "reading time pdf",
    "academic writing pdf word count",
    "research paper pdf word count",
    "adobe pdf word count",
    "microsoft word vs pdf word count",
  ],
  imageAlt: "PDF Word Count tool for counting words, characters, pages, and reading time in PDF files",
});

export default function WordCounterPage() {
  const lastUpdated = getLastUpdated("app/word-counter/page.tsx");
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FAQPage",
        mainEntity: [...faqs, ...peopleAlsoAsk].map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.a,
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
            name: "Utility Tools",
            item: "https://thepdftools.site/utility-tools",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "PDF Word Counter",
            item: "https://thepdftools.site/word-counter",
          },
        ],
      },
      {
        "@type": "WebApplication",
        name: "PDF Word Count Tool",
        applicationCategory: "UtilityApplication",
        operatingSystem: "Any",
        browserRequirements: "Requires JavaScript and a modern browser.",
        isAccessibleForFree: true,
        mainEntityOfPage: "https://thepdftools.site/word-counter",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        featureList: [
          "Count words in PDF files online",
          "Count characters in PDF documents",
          "Show page count and page-level previews",
          "Preview extracted PDF text before trusting the result",
          "Support scanned PDF workflows with OCR guidance",
        ],
        description: pageDescription,
        url: "https://thepdftools.site/word-counter",
      },
      {
        "@type": "HowTo",
        name: "How to count words in a PDF online",
        description:
          "A simple workflow for getting PDF word count, character count, page count, and reading time from a PDF file.",
        step: howToSteps.map((step, index) => ({
          "@type": "HowToStep",
          position: index + 1,
          name: `Step ${index + 1}`,
          text: step,
        })),
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
            { label: "Utility Tools", href: "/utility-tools" },
            { label: "PDF Word Counter" },
          ]}
        />

        <section className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] shadow-[0_24px_90px_-44px_rgba(79,70,229,0.18)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(79,70,229,0.1),transparent_26%),radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.08),transparent_22%)]" />
          <div className="relative px-6 py-10 sm:px-10 sm:py-12">
            <div className="mx-auto max-w-4xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700 ring-1 ring-brand-100">
                PDF Tool • Free PDF Word Counter
              </div>
              <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl lg:text-[3.55rem] lg:leading-[1.02]">
                PDF Word Counter
                <span className="block bg-gradient-to-r from-brand-600 via-secondary-600 to-tertiary-500 bg-clip-text text-transparent">
                  Count Words and Characters in PDF
                </span>
              </h1>
              <div className="mt-3 flex flex-wrap items-center justify-center gap-3 text-sm text-slate-500">
                <span>thepdftools Editorial Team</span>
                <span className="h-1 w-1 rounded-full bg-slate-300" />
                <time dateTime={lastUpdated.date}>Updated {lastUpdated.formatted}</time>
              </div>
              <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
                Count words in PDF files online free. Measure PDF word count,
                character count, page count, paragraphs, and reading time. If
                the file is scanned, this page helps you move into the right OCR
                workflow instead of giving you a misleading total.
              </p>
            </div>

            <div className="mt-8">
              <WordCounterClient />
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                {
                  title: "Best for essays and reports",
                  text: "Check submission length before sending a PDF to a teacher, client, reviewer, or portal.",
                },
                {
                  title: "Best for contracts and policies",
                  text: "Measure document size before review, markup, approval, or editing.",
                },
                {
                  title: "Best for scanned PDF workflows",
                  text: "Know when a file needs OCR before you trust the final word count.",
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
              A PDF word counter counts the words, characters, and pages inside a
              PDF file without copying text into another app. It works best on
              text-based PDFs. If the document is scanned or image-based, OCR is
              usually required before the word count becomes accurate.
            </p>
          </div>

          <aside className="rounded-[1.75rem] border border-brand-100 bg-brand-50 p-6">
            <h2 className="text-lg font-semibold text-slate-900">Quick Answer</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Upload the PDF, extract its text layer, and review the total words,
              characters, and page count. This is faster and more reliable than
              manual copy-paste counting, especially for long reports, essays,
              contracts, and research files.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {[
                "Academic PDFs",
                "Business reports",
                "Contracts",
                "Manuals",
                "Research papers",
                "Submission checks",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-brand-700 shadow-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </aside>
        </section>

        <section className="mt-8 rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">On This Page</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {quickLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                aria-label={`Jump to ${link.label}`}
                className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
              >
                {link.label}
              </a>
            ))}
          </div>
        </section>

        <div className="mt-8 grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)] xl:grid-cols-[300px_minmax(0,1fr)]">
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-4">
              <nav
                aria-label="Sticky table of contents"
                className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm"
              >
                <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Sticky Table of Contents
                </h2>
                <div className="mt-4 space-y-2">
                  {quickLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      aria-label={`Jump to ${link.label}`}
                      className="block rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-brand-50 hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </nav>

              <div className="rounded-[1.5rem] border border-brand-100 bg-brand-50 p-5">
                <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-700">
                  Quick Summary
                </h2>
                <p className="mt-3 text-sm leading-7 text-slate-700">
                  Best results come from text-based PDFs. If the preview looks empty
                  or broken, the file likely needs OCR before the word count is
                  reliable.
                </p>
              </div>

              <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
                <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Popular Next Steps
                </h2>
                <div className="mt-4 space-y-2">
                  {popularPdfTools.slice(0, 4).map((tool) => (
                    <Link
                      key={tool.href}
                      href={tool.href}
                      className="block rounded-xl bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-brand-50 hover:text-brand-700"
                    >
                      {tool.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          <div className="space-y-8">
            <section
              id="quick-answers"
              className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm"
            >
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                Quick Answers for Search and AI Overviews
              </h2>
              <p className="mt-3 max-w-3xl text-[15px] leading-8 text-slate-600">
                These short answers are designed to satisfy immediate search intent,
                featured snippet patterns, and AI overview summarization while staying
                useful for real readers.
              </p>
              <div className="mt-5 grid gap-4 md:grid-cols-3">
                {snippetAnswers.map((item) => (
                  <div key={item.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                    <h3 className="text-base font-semibold text-slate-900">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{item.text}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                Real-World Use Cases
              </h2>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {[
                  "Check whether a PDF essay stays within a submission word limit before uploading it.",
                  "Measure client reports before review so teams know how much content they need to read.",
                  "Compare contract versions and spot whether one draft has become much longer than another.",
                  "Estimate reading time for policy manuals, onboarding packs, and staff documentation.",
                  "Audit research papers before journal submission or internal review.",
                  "Review RFP responses and proposals when document length affects scoring or effort.",
                  "Verify whether exported PDF brochures contain the expected amount of body copy.",
                  "Measure grant applications or compliance documentation before final handoff.",
                  "Check scanned archival PDFs after OCR to confirm the extracted text is complete enough to trust.",
                  "Count characters in PDF files when a portal or publishing workflow has strict text-length limits.",
                ].map((item) => (
                  <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                    <p className="text-sm leading-7 text-slate-600">{item}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                Common Mistakes
              </h2>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {[
                  "Trusting a word count from a scanned PDF before checking whether the file has a real text layer.",
                  "Copying text manually from the PDF and assuming headers, footers, tables, and hidden sections were all captured.",
                  "Ignoring extraction previews even when the PDF contains broken characters or missing lines.",
                  "Using a generic text counter instead of a PDF-specific workflow for long multi-page documents.",
                  "Assuming a visible page always contains machine-readable text.",
                  "Skipping OCR on image-based PDFs and then wondering why the total looks too low.",
                  "Comparing two PDF counts without making sure both files were exported from the latest version.",
                  "Relying only on total words when character count or page-level review is also required.",
                  "Counting a locked, damaged, or partial PDF and treating the first result as final.",
                  "Forgetting to recheck the count after editing or converting the document.",
                ].map((item) => (
                  <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                    <p className="text-sm leading-7 text-slate-600">{item}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                Expert Tips
              </h2>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {[
                  "Use text-based exports whenever possible because native PDFs are far easier to count accurately than scanned copies.",
                  "Check the extracted text preview before trusting the final number on any important document.",
                  "Run OCR first on historical scans, phone-captured PDFs, and image-heavy records.",
                  "Review page-level summaries to spot blank, broken, or undercounted pages quickly.",
                  "Count both words and characters when a submission portal could enforce either limit.",
                  "Recalculate after edits so the latest version is the one you actually submit or review.",
                  "Use PDF to Word when you need to revise content after measuring the document length.",
                  "Keep OCR and counting in the same workflow for scanned contracts, forms, and reports.",
                  "Check unusual fonts or symbol-heavy PDFs carefully because extraction quality can vary.",
                  "Use related PDF tools after counting so you can edit, highlight, convert, or validate the same file without starting over.",
                ].map((item) => (
                  <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                    <p className="text-sm leading-7 text-slate-600">{item}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                Warning Boxes and Pro Tips
              </h2>
              <div className="mt-5 space-y-4">
                {warningBoxes.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-amber-200 bg-amber-50 p-5"
                    role="note"
                    aria-label={item.title}
                  >
                    <h3 className="text-base font-semibold text-amber-950">{item.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-amber-900">{item.text}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
                <h3 className="text-base font-semibold text-emerald-950">Pro Tip</h3>
                <p className="mt-2 text-sm leading-7 text-emerald-900">
                  If you are checking an academic paper, assignment, research PDF,
                  or publishing proof, compare the extracted text preview with a few
                  visible paragraphs from the document before trusting the total.
                  This takes seconds and prevents bad decisions from incomplete extraction.
                </p>
              </div>
            </section>

            <section className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                Did You Know?
              </h2>
              <div className="mt-5 grid gap-4 md:grid-cols-3">
                {didYouKnowFacts.map((fact) => (
                  <div key={fact} className="rounded-2xl border border-sky-200 bg-sky-50 p-5">
                    <p className="text-sm leading-7 text-sky-950">{fact}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                Why Some PDFs Show Incorrect Word Counts
              </h2>
              <div className="mt-4 space-y-5 text-[15px] leading-8 text-slate-600">
                <p>
                  Some PDFs look like normal documents but do not contain selectable
                  text. That usually happens with scanned PDFs, photographed pages,
                  or image-based exports where each page is stored as an image rather
                  than real text. In those cases, a word counter can only measure the
                  text layer that exists, which may be empty or incomplete.
                </p>
                <p>
                  OCR solves that problem by recognizing the words inside those page
                  images and rebuilding a searchable text layer. If your count looks
                  too low or the preview shows little to no extracted text, the right
                  next step is to{" "}
                  <Link
                    href="/pdf-ocr"
                    className="font-semibold text-brand-700 underline decoration-brand-200 underline-offset-4"
                  >
                    run OCR on a scanned PDF
                  </Link>
                  . Once OCR finishes, the document becomes much easier to measure
                  accurately.
                </p>
                <p>
                  OCR also improves downstream workflows. You can{" "}
                  <Link
                    href="/pdf-to-word"
                    className="font-semibold text-brand-700 underline decoration-brand-200 underline-offset-4"
                  >
                    convert PDF to Word for editing
                  </Link>
                  ,{" "}
                  <Link
                    href="/pdf-editor"
                    className="font-semibold text-brand-700 underline decoration-brand-200 underline-offset-4"
                  >
                    edit the PDF after counting words
                  </Link>
                  , or{" "}
                  <Link
                    href="/pdf-highlight"
                    className="font-semibold text-brand-700 underline decoration-brand-200 underline-offset-4"
                  >
                    highlight important PDF sections
                  </Link>
                  {" "}once the text is searchable and easier to review.
                </p>
              </div>
            </section>

            <div className="space-y-8">
          <section
            id="what-is-pdf-word-count"
            className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm"
          >
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              What is a PDF Word Counter?
            </h2>
            <div className="mt-4 space-y-5 text-[15px] leading-8 text-slate-600">
              <p>
                A PDF word counter is a tool built specifically to measure text
                inside PDF files. Instead of asking you to copy and paste text
                into a generic counter, it opens the PDF, reads the text layer,
                and calculates the total words, characters, pages, paragraphs,
                and related text metrics from the document itself. That matters
                because a PDF is not the same as plain text. It has pages,
                formatting, layout, headers, footers, tables, and sometimes
                scanned images that look like text but are not actually machine
                readable.
              </p>
              <p>
                That is the reason search queries like <strong>pdf word counter</strong>,
                <strong> word counter pdf</strong>, <strong>online pdf word count</strong>,
                and <strong>count words in pdf</strong> exist as their own intent
                cluster. Users are not looking for a writing tool in the abstract.
                They already have a finished document and need a direct answer for
                that file. The usual triggers are practical: a university essay
                limit, a business report review, a legal draft comparison, a
                research submission, or a long PDF that needs to be audited
                quickly.
              </p>
              <p>
                A strong <strong>free PDF word counter</strong> should do more than
                show one total. It should tell you whether the PDF actually
                contains selectable text, whether the extraction looks trustworthy,
                how many pages were measured, and whether the file needs OCR
                before the count can be trusted. That is especially important
                for scanned PDFs, photographed pages, exported scans, and
                image-heavy records where the visible words are not stored as
                real text.
              </p>
              <p>
                This page is designed around that exact search intent. It helps
                users count words in PDF files online, count characters in PDF
                files without copying text manually, and detect scanned-PDF
                limitations early. That makes it useful not only for Google
                Search but also for AI Overviews, ChatGPT, Gemini, and Perplexity,
                all of which reward narrow, answer-rich pages that explain both
                the workflow and the limitations clearly.
              </p>
            </div>
          </section>

          <section
            id="how-pdf-word-count-works"
            className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm"
          >
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              How to Count Words in a PDF?
            </h2>
            <div className="mt-5 grid gap-5 md:grid-cols-2">
              {[
                "Upload the PDF file you want to analyze. This works best for text-based PDFs exported from Word, Docs, Excel, PowerPoint, or other document tools.",
                "Start the scan so the tool reads the text layer on each page and totals the document length.",
                "Review the PDF word count, character count, page count, paragraph count, and reading-time estimate.",
                "Check the extracted text preview and page-by-page summary so you can verify that the file was read correctly.",
                "If the file is scanned or image-based, run OCR first and then measure the PDF again for a more complete result.",
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
              The reason this process beats manual counting is simple: it works
              from the file itself. You do not need to guess how much text sits
              inside the PDF or whether your copy-and-paste method skipped hidden
              spacing, page content, or entire sections. For users searching
              <strong> pdf word count online</strong>, that directness is the
              real value proposition.
            </p>
          </section>

          <section
            id="benefits-of-pdf-word-count"
            className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm"
          >
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Why Use a PDF Word Counter?
            </h2>
            <div className="mt-4 space-y-5 text-[15px] leading-8 text-slate-600">
              <p>
                A standard text counter is not enough when the actual job is
                document measurement. PDFs are shared precisely because the layout
                is fixed, but that fixed layout hides the most basic metric many
                users need: total text length. A PDF word counter solves that
                without asking you to move content into another app.
              </p>
              <p>
                This is useful for students checking essays, researchers measuring
                paper length, compliance teams reviewing handbooks, editors
                auditing long documents, service teams inspecting client files,
                and anyone comparing one PDF against another. Even when the final
                output is not judged by strict word limits, knowing the document
                size helps with editing, reading-time estimates, summarization
                planning, and review effort.
              </p>
              <p>
                There is also a trust benefit. A dedicated PDF word counter can
                tell you when the file is not really countable yet because it is
                scanned. That avoids false confidence. A generic text tool cannot
                do that because it never sees the structure of the PDF itself.
              </p>
              <p>
                For SEO and AI-search behavior, this page also addresses the real
                follow-up questions behind the query. Users do not only want the
                count. They want to know whether scanned PDFs work, how to count
                characters in PDF files, whether OCR is needed, and whether a
                page-level view is available. Those answer blocks are exactly what
                help with modern search surfaces.
              </p>
            </div>
          </section>

          <section className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Features
            </h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {[
                {
                  title: "PDF word count",
                  text: "Measure total words in a PDF without copying content into a separate editor.",
                },
                {
                  title: "Count characters in PDF",
                  text: "See total characters and characters without spaces for a more detailed text audit.",
                },
                {
                  title: "Page count and page previews",
                  text: "Review how much text appears on each page instead of relying only on one total number.",
                },
                {
                  title: "Extracted text preview",
                  text: "Validate whether the PDF was read correctly before you trust the word count result.",
                },
                {
                  title: "Scanned PDF detection",
                  text: "Know when the file needs OCR before a full PDF word count can be considered reliable.",
                },
                {
                  title: "Reading-time estimate",
                  text: "Turn document length into a quick estimate for review, presentation, or handoff planning.",
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
                The biggest benefit is accuracy relative to the workflow. When you
                count from the PDF itself, you reduce the chance of missing text,
                trimming sections accidentally, or measuring the wrong version of
                a document. That is a better fit for real-world files than manual
                copying.
              </p>
              <p>
                Another benefit is time savings. A long report or contract can
                span dozens of pages. A PDF word counter gives you a quick
                baseline without needing to open a desktop suite, export content,
                or do page-by-page estimation by hand.
              </p>
              <p>
                There is also a workflow benefit for scanned documents. Instead of
                pretending an image-only PDF has no real issue, the tool points
                you toward OCR. That makes the page more useful and more honest
                than simple counters that cannot explain why the total looks wrong.
              </p>
              <p>
                For teams publishing or reviewing content, document length also
                becomes an operational signal. It helps estimate read time, effort
                to revise, effort to summarize, and whether a file needs splitting,
                editing, or conversion to another format before work continues.
              </p>
            </div>
          </section>

          <section className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              PDF Word Count vs Manual Counting
            </h2>
            <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200">
              <div className="grid grid-cols-3 bg-slate-50 text-sm font-semibold text-slate-900">
                <div className="border-r border-slate-200 px-4 py-3">Factor</div>
                <div className="border-r border-slate-200 px-4 py-3">Manual Counting</div>
                <div className="px-4 py-3">PDF Word Counter</div>
              </div>
              {[
                ["Speed", "Slow on long files", "Fast across multi-page PDFs"],
                ["Accuracy", "Easy to miss text during copy-paste", "Reads the PDF text layer directly"],
                ["Scanned PDFs", "Usually fails without extra work", "Flags OCR needs before trusting totals"],
                ["Page visibility", "No page-level review built in", "Can show page summaries and previews"],
                ["Best use", "Short simple documents only", "Essays, reports, contracts, manuals, research"],
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
            <p className="mt-5 text-[15px] leading-8 text-slate-600">
              Manual counting can work on short plain text, but it becomes slow
              and error-prone once a document is exported to PDF. A dedicated
              PDF word count tool keeps the workflow tied to the actual file,
              which is exactly what matters when you are validating a submission,
              review packet, report, contract, or research document.
            </p>
          </section>

          <section
            id="who-uses-this-tool"
            className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm"
          >
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Who Uses This Tool
            </h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {audienceGroups.map((group) => (
                <div key={group.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <h3 className="text-base font-semibold text-slate-900">{group.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{group.text}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Reading Time, Word Count, and Character Count
            </h2>
            <div className="mt-4 space-y-5 text-[15px] leading-8 text-slate-600">
              <p>
                Word count answers one question: how many words are inside the
                document. Character count answers a different one: how much raw
                text volume is present, with or without spaces. Reading time adds
                another practical layer by estimating how long a person may need
                to review the document. Together, these metrics turn a simple PDF
                analyzer into a much better planning tool.
              </p>
              <p>
                This matters when the document is heading into a portal, review
                workflow, or publishing pipeline. Some systems care about words.
                Others care about characters. Editors and managers often care
                more about reading time and page distribution because those
                numbers help estimate effort. That is why a strong PDF word count
                tool should report more than one total.
              </p>
            </div>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-base font-semibold text-slate-900">Word count</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  Best for essays, reports, journal submissions, proposals, and
                  any workflow where a specific word limit applies.
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-base font-semibold text-slate-900">Character count</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  Useful when a CMS, metadata field, or publishing workflow sets
                  hard limits based on total characters rather than words.
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-base font-semibold text-slate-900">Characters without spaces</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  Helpful when teams need a tighter measure of content volume for
                  text-entry or publishing constraints.
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-base font-semibold text-slate-900">Reading time</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  Useful for internal reviews, approvals, client handoffs,
                  teaching materials, and long-form documentation.
                </p>
              </div>
            </div>
          </section>

          <section
            id="best-practices"
            className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm"
          >
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Best Practices
            </h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {bestPractices.map((item, index) => (
                <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">
                    {index + 1}
                  </div>
                  <p className="mt-4 text-sm leading-7 text-slate-600">{item}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Quick Validation Checklist
            </h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {checklistItems.map((item) => (
                <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                      <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path
                          fillRule="evenodd"
                          d="M16.704 5.29a1 1 0 010 1.42l-7.2 7.2a1 1 0 01-1.415 0l-3-3a1 1 0 111.415-1.42l2.293 2.294 6.493-6.494a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="text-sm leading-7 text-slate-600">{item}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Core Entities and Concepts
            </h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {entityCards.map((item) => (
                <div key={item.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <h3 className="text-base font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{item.text}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Related Document Statistics
            </h2>
            <div className="mt-4 space-y-5 text-[15px] leading-8 text-slate-600">
              <p>
                Word count is usually the first metric people check, but it is not
                the only useful document statistic. Character count, paragraph count,
                sentence count, reading time, and even speaking-time estimates can
                all help when the real goal is document analysis rather than one raw
                number.
              </p>
              <p>
                For example, academic writing often benefits from paragraph and
                sentence awareness, while publishing and CMS workflows may care more
                about character count. Presenters, teachers, and trainers may use
                word count to estimate speaking time. Long books, manuscripts, legal
                files, and business reports often need several of these signals
                together before teams can judge scope and effort confidently.
              </p>
            </div>
          </section>

          <section
            id="ocr-for-scanned-pdfs"
            className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm"
          >
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              OCR for Scanned PDFs
            </h2>
            <div className="mt-4 space-y-5 text-[15px] leading-8 text-slate-600">
              <p>
                OCR stands for optical character recognition. It is the process
                that reads words from page images and turns them into machine-readable
                text. If a PDF came from a scanner, phone camera, photocopier,
                archive system, or image export, the visible words may not exist
                as real text yet. In that situation, a normal PDF word count can
                only measure what is actually readable inside the file, which may
                be little to nothing.
              </p>
              <p>
                The fastest way to diagnose that problem is to review the extracted
                text preview. If the preview is empty, incomplete, or clearly
                broken, the PDF likely needs OCR. That is why this page guides
                you toward{" "}
                <Link
                  href="/pdf-ocr"
                  className="font-semibold text-brand-700 underline decoration-brand-200 underline-offset-4"
                >
                  PDF OCR
                </Link>{" "}
                and{" "}
                <Link
                  href="/scanned-pdf-to-searchable-pdf"
                  className="font-semibold text-brand-700 underline decoration-brand-200 underline-offset-4"
                >
                  searchable scanned PDF conversion
                </Link>
                {" "}instead of letting you trust a misleading result.
              </p>
            </div>
          </section>

          <section
            id="accuracy-and-supported-pdfs"
            className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm"
          >
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Accuracy and Supported PDFs
            </h2>
            <div className="mt-5 grid gap-6 lg:grid-cols-2">
              <div>
                <h3 className="text-base font-semibold text-slate-900">Supported PDFs</h3>
                <div className="mt-3 space-y-3">
                  {supportedPdfTypes.map((item) => (
                    <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <p className="text-sm leading-7 text-slate-600">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-base font-semibold text-slate-900">What affects accuracy</h3>
                <div className="mt-3 space-y-3">
                  {accuracyFactors.map((item) => (
                    <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <p className="text-sm leading-7 text-slate-600">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section
            id="privacy-security-performance"
            className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm"
          >
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Privacy, Security, and Performance
            </h2>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {privacySecurityPoints.map((item) => (
                <div key={item.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <h3 className="text-base font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{item.text}</p>
                </div>
              ))}
            </div>
            <p className="mt-5 text-[15px] leading-8 text-slate-600">
              If the document needs more work after counting, you can continue
              into{" "}
              <Link
                href="/pdf-editor"
                className="font-semibold text-brand-700 underline decoration-brand-200 underline-offset-4"
              >
                PDF editing
              </Link>
              ,{" "}
              <Link
                href="/pdf-to-word"
                className="font-semibold text-brand-700 underline decoration-brand-200 underline-offset-4"
              >
                PDF to Word conversion
              </Link>
              , or the full{" "}
              <Link
                href="/pdf-tools"
                className="font-semibold text-brand-700 underline decoration-brand-200 underline-offset-4"
              >
                PDF tools collection
              </Link>
              {" "}without leaving the wider workflow.
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="text-base font-semibold text-slate-900">Encryption and transport</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  Page assets load over HTTPS, which encrypts the connection between
                  the browser and the site. Because the PDF word count itself is
                  designed for in-browser processing, the document does not need to
                  be transmitted to an application server just to be counted.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="text-base font-semibold text-slate-900">No upload storage and automatic clearing</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  The working file stays in the browser session while you analyze
                  it. Replacing the PDF, resetting the tool, or leaving the page
                  clears that local session state, which is a better fit for sensitive
                  academic, legal, and business documents.
                </p>
              </div>
            </div>
          </section>

          <section
            id="people-also-ask"
            className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm"
          >
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              People Also Ask
            </h2>
            <div className="mt-5 divide-y divide-slate-100">
              {peopleAlsoAsk.map((item) => (
                <div key={item.q} className="py-4">
                  <h3 className="text-[15px] font-semibold text-slate-900">{item.q}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{item.a}</p>
                </div>
              ))}
            </div>
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
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition-colors hover:border-brand-200 hover:bg-brand-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
                >
                  <h3 className="text-base font-semibold text-slate-900">{tool.label}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{tool.text}</p>
                </Link>
              ))}
            </div>
          </section>

          <section className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Popular PDF Tools
            </h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {popularPdfTools.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm font-semibold text-slate-800 transition-colors hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
                >
                  {tool.label}
                </Link>
              ))}
            </div>
          </section>

          <section className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Related Guides
            </h2>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {relatedGuides.map((guide) => (
                <Link
                  key={guide.href}
                  href={guide.href}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition-colors hover:border-brand-200 hover:bg-brand-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
                >
                  <h3 className="text-base font-semibold text-slate-900">{guide.label}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{guide.text}</p>
                </Link>
              ))}
            </div>
          </section>

          <section className="rounded-[1.75rem] border border-brand-100 bg-gradient-to-br from-brand-50 via-white to-secondary-50 p-8 shadow-sm">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Continue Your PDF Workflow
            </h2>
            <p className="mt-3 max-w-3xl text-[15px] leading-8 text-slate-600">
              Word count is often only the first step. After measuring the document,
              you may need to extract text, compare versions, edit content, highlight
              sections, or convert the PDF back into an editable format for revision.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/pdf-ocr"
                className="rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
              >
                Open PDF OCR
              </Link>
              <Link
                href="/pdf-to-word"
                className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 transition-colors hover:border-brand-200 hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
              >
                Convert PDF to Word
              </Link>
              <Link
                href="/pdf-tools"
                className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 transition-colors hover:border-brand-200 hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
              >
                Explore All PDF Tools
              </Link>
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

          <section
            id="faq"
            className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm"
          >
            <h2 className="text-[2rem] font-bold tracking-tight text-slate-900">
              Frequently Asked Questions
            </h2>
            <div className="mt-5 divide-y divide-slate-100">
              {faqs.map((item) => (
                <details key={item.q} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 rounded-xl text-[15px] font-medium text-slate-900 transition-colors hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 [&::-webkit-details-marker]:hidden">
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
              { href: "https://mozilla.github.io/pdf.js/", label: "PDF.js project documentation" },
              { href: "https://developer.mozilla.org/en-US/docs/Web/API/File", label: "MDN: File API reference" },
              { href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/length", label: "MDN: character counting basics" },
              { href: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview", label: "MDN: HTTPS and secure transport overview" },
            ]}
          />
        </div>
        </div>
      </div>
      </div>
    </div>
  );
}
