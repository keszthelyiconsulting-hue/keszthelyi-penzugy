import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hitelfedezeti védelem – Keszthelyi Consulting",
  description:
    "Hitelfedezeti védelem a meglévő vagy új hitel mellé. Ismerje meg, hogyan segíthet a biztosítás a törlesztés biztonságának fenntartásában váratlan élethelyzetek esetén.",

  openGraph: {
    title: "Hitelfedezeti védelem – Keszthelyi Consulting",
    description:
      "Hitelfedezeti védelem a hitel biztonságáért. Ismerje meg, hogyan segíthet váratlan élethelyzetek esetén a törlesztés fenntartásában.",
    url: "https://www.keszthelyiconsulting.com/penzugy/biztositasok/hitelfedezeti-vedelem",
    siteName: "Keszthelyi Consulting",
    type: "website",
    locale: "hu_HU",
    images: [
      {
        url: "/finance-card-hitel-fedezeti-vedelem.png",
        alt: "Hitelfedezeti védelem – Keszthelyi Consulting",
      },
    ],
  },
};

export default function HitelfedezetiVedelemLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}