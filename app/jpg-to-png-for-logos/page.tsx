import JpgToPngVariantPage, {
  buildJpgToPngVariantMetadata,
} from "@/components/JpgToPngVariantPage";
import { getJpgToPngVariant } from "@/lib/jpg-to-png-variants";

const variant = getJpgToPngVariant("jpg-to-png-for-logos")!;

export const metadata = buildJpgToPngVariantMetadata(variant);

export default function JpgToPngForLogosPage() {
  return <JpgToPngVariantPage variant={variant} />;
}
