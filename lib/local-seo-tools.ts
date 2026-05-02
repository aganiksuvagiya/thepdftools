export const localSeoTools = [
  {
    slug: "merge-pdf",
    label: "Merge PDF",
    route: "/pdf-merge",
    searchTerm: "merge pdf",
    gerund: "merging PDF files",
    useCases: "application sets, invoices, reports, contracts, and scanned document bundles",
  },
  {
    slug: "compress-pdf",
    label: "Compress PDF",
    route: "/pdf-compress",
    searchTerm: "compress pdf",
    gerund: "compressing PDF files",
    useCases: "email attachments, portal uploads, exam forms, and client-ready documents",
  },
  {
    slug: "edit-pdf",
    label: "Edit PDF",
    route: "/pdf-editor",
    searchTerm: "edit pdf",
    gerund: "editing PDF files",
    useCases: "quick corrections, form updates, annotations, and document cleanup",
  },
  {
    slug: "split-pdf",
    label: "Split PDF",
    route: "/pdf-split",
    searchTerm: "split pdf",
    gerund: "splitting PDF files",
    useCases: "extracting pages from contracts, separating reports, and breaking large files into smaller parts",
  },
  {
    slug: "sign-pdf",
    label: "Sign PDF",
    route: "/pdf-sign",
    searchTerm: "sign pdf",
    gerund: "signing PDF documents",
    useCases: "agreements, offer letters, approvals, and client forms",
  },
  {
    slug: "highlight-pdf",
    label: "Highlight PDF",
    route: "/pdf-highlight",
    searchTerm: "highlight pdf",
    gerund: "highlighting clauses, notes, and important sections in PDFs",
    useCases: "study notes, legal review, compliance checks, and team feedback",
  },
] as const;

export type LocalSeoTool = (typeof localSeoTools)[number];

export function getLocalSeoTool(toolSlug: string) {
  return localSeoTools.find((tool) => tool.slug === toolSlug);
}

export function getLocalSeoPageParts(slug: string) {
  for (const tool of localSeoTools) {
    const prefix = `${tool.slug}-in-`;
    if (slug.startsWith(prefix)) {
      return { tool, citySlug: slug.slice(prefix.length) };
    }
  }

  return null;
}
