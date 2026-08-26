import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lakossági lízing – Keszthelyi Consulting",
  description:
    "Lakossági lízing lehetőségek közérthetően, egy helyen. Ismerje meg a konstrukciók legfontosabb feltételeit és a finanszírozási lehetőségeket.",

  openGraph: {
    title: "Lakossági lízing – Keszthelyi Consulting",
    description:
      "Lakossági lízing lehetőségek közérthetően, egy helyen. Ismerje meg a legfontosabb feltételeket és finanszírozási lehetőségeket.",
    url: "https://www.keszthelyiconsulting.com/penzugy/szamlatermekek/lakossagi-lizing",
    siteName: "Keszthelyi Consulting",
    type: "website",
    locale: "hu_HU",
    images: [
      {
        url: "/finance-card-lakossagi-lizing.png",
        alt: "Lakossági lízing – Keszthelyi Consulting",
      },
    ],
  },
};

export default function LakossagiLizingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}