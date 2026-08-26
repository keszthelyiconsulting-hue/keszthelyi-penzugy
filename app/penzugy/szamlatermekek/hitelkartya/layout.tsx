import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hitelkártya – Keszthelyi Consulting",
  description:
    "Hitelkártya lehetőségek közérthetően, egy helyen. Ismerje meg a használat, a visszafizetés és a kapcsolódó feltételek legfontosabb tudnivalóit.",

  openGraph: {
    title: "Hitelkártya – Keszthelyi Consulting",
    description:
      "Hitelkártya lehetőségek közérthetően, egy helyen. Ismerje meg a legfontosabb feltételeket és tudnivalókat.",
    url: "https://www.keszthelyiconsulting.com/penzugy/szamlatermekek/hitelkartya",
    siteName: "Keszthelyi Consulting",
    type: "website",
    locale: "hu_HU",
    images: [
      {
        url: "/finance-card-hitelkartya.png",
        alt: "Hitelkártya – Keszthelyi Consulting",
      },
    ],
  },
};

export default function HitelkartyaLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}