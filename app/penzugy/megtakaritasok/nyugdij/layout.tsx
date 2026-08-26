import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nyugdíjcélú megtakarítás – Keszthelyi Consulting",
  description:
    "Nyugdíjcélú megtakarítás a hosszú távú pénzügyi biztonságért. Ismerje meg a lehetőségeket és tervezze meg tudatosan a nyugdíjas éveket.",

  openGraph: {
    title: "Nyugdíjcélú megtakarítás – Keszthelyi Consulting",
    description:
      "Tervezze meg tudatosan a nyugdíjas éveket. Ismerje meg a nyugdíjcélú megtakarítási lehetőségeket.",
    url: "https://www.keszthelyiconsulting.com/penzugy/megtakaritasok/nyugdij",
    siteName: "Keszthelyi Consulting",
    type: "website",
    locale: "hu_HU",
    images: [
      {
        url: "/finance-card-nyugdij.png",
        alt: "Nyugdíjcélú megtakarítás – Keszthelyi Consulting",
      },
    ],
  },
};

export default function NyugdijLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}