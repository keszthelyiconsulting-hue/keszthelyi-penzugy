import Footer from "../components/Footer";
import FacebookShareButton from "../components/FacebookShareButton";

export default function PenzugyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}

      <Footer />

      <FacebookShareButton />
    </>
  );
}