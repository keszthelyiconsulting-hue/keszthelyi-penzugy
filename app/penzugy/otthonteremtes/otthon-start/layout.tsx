import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Otthon Start – Keszthelyi Consulting",
  description:
    "Otthon Start lakáshitel érthetően, egy helyen. Ismerd meg a lehetőségeket, feltételeket és indulj el a saját otthonod felé a Keszthelyi Consulting segítségével.",

  openGraph: {
    title: "Otthon Start – Keszthelyi Consulting",
    description:
      "Otthon Start lakáshitel érthetően, egy helyen. Ismerd meg a lehetőségeket, feltételeket és indulj el a saját otthonod felé.",
    url: "https://www.keszthelyiconsulting.com/penzugy/otthonteremtes/otthon-start",
    siteName: "Keszthelyi Consulting",
    type: "website",
    locale: "hu_HU",
    images: [
  {
    url: "/finance-card-otthon-start.png",
    width: 1536,
    height: 1024,
    alt: "Otthon Start – Keszthelyi Consulting",
  },
],
  },

  twitter: {
    card: "summary_large_image",
    title: "Otthon Start – Keszthelyi Consulting",
    description:
      "Otthon Start lakáshitel érthetően, egy helyen. Ismerd meg a lehetőségeket és indulj el a saját otthonod felé.",
  },
};

export default function OtthonStartLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}