import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hosszú távú megtakarítás – Keszthelyi Consulting",
  description:
    "Hosszú távú megtakarítási megoldások a jövő tudatos pénzügyi tervezéséhez. Ismerje meg a lehetőségeket és válasszon céljaihoz illeszkedő megtakarítást.",

  openGraph: {
    title: "Hosszú távú megtakarítás – Keszthelyi Consulting",
    description:
      "Tervezzen tudatosan hosszú távra. Ismerje meg a céljaihoz illeszkedő megtakarítási lehetőségeket.",
    url: "https://www.keszthelyiconsulting.com/penzugy/megtakaritasok/hosszu-tavu-megtakaritas",
    siteName: "Keszthelyi Consulting",
    type: "website",
    locale: "hu_HU",
    images: [
      {
        url: "/finance-card-hosszu-tavu-megtakaritas.png",
        alt: "Hosszú távú megtakarítás – Keszthelyi Consulting",
      },
    ],
  },
};

export default function HosszuTavuMegtakaritasLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}