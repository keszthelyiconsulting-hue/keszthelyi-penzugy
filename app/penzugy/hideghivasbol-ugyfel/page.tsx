import { permanentRedirect } from "next/navigation";
import { bookDetails } from "../../components/bookDetails";

export default function LegacyBookPage() {
  permanentRedirect(bookDetails.href);
}
