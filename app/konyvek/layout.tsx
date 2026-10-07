import Footer from "../components/Footer";
import FacebookShareButton from "../components/FacebookShareButton";

export default function BooksLayout({ children }: { children: React.ReactNode }) {
  return <>{children}<Footer /><FacebookShareButton /></>;
}
