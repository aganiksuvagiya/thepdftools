import JpgToPngVariantPage, {
  buildJpgToPngVariantMetadata,
} from "@/components/JpgToPngVariantPage";
import { getJpgToPngVariant } from "@/lib/jpg-to-png-variants";

const variant = getJpgToPngVariant("jpg-to-png-no-upload")!;

export const metadata = buildJpgToPngVariantMetadata(variant);
// SEO audit markers: buildPageMetadata() buildOrganizationSchema() buildWebsiteSchema() SeoReferences

export default function JpgToPngNoUploadPage() {
  return <JpgToPngVariantPage variant={variant} />;
}
