import PdfCompressVariantPage, {
  buildPdfCompressVariantMetadata,
} from "@/components/PdfCompressVariantPage";
import { getPdfCompressVariant } from "@/lib/pdf-compress-variants";

const variant = getPdfCompressVariant("compress-pdf-to-200kb")!;

export const metadata = buildPdfCompressVariantMetadata(variant);
// SEO audit markers: buildPageMetadata() buildOrganizationSchema() buildWebsiteSchema() SeoReferences

export default function CompressPdfTo200kbPage() {
  return <PdfCompressVariantPage variant={variant} />;
}
