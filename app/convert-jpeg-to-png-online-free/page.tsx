import JpgToPngVariantPage, {
  buildJpgToPngVariantMetadata,
} from "@/components/JpgToPngVariantPage";
import { getJpgToPngVariant } from "@/lib/jpg-to-png-variants";

const variant = getJpgToPngVariant("convert-jpeg-to-png-online-free")!;

export const metadata = buildJpgToPngVariantMetadata(variant);

export default function ConvertJpegToPngOnlineFreePage() {
  return <JpgToPngVariantPage variant={variant} />;
}
