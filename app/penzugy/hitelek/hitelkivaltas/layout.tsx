import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hitelkiváltás – Keszthelyi Consulting",
  description:
    "Hitelkiváltási lehetőségek meglévő hitelek rendezéséhez. Ismerd meg, hogyan válthatod ki meglévő tartozásaidat egy kedvezőbb vagy átláthatóbb finanszírozási megoldással.",

  openGraph: {
    title: "Hitelkiváltás – Keszthelyi Consulting",
    description:
      "Meglévő hitelek kiváltása érthetően, egy helyen. Ismerd meg a lehetőségeket és a legfontosabb feltételeket.",
    url: "https://www.keszthelyiconsulting.com/penzugy/hitelek/hitelkivaltas",
    siteName: "Keszthelyi Consulting",
    type: "website",
    locale: "hu_HU",
    images: [
      {
        url: "/finance-card-hitelkivaltas.png",
        alt: "Hitelkiváltás – Keszthelyi Consulting",
      },
    ],
  },
};

export default function HitelkivaltasLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}