import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Családfővédelem – Keszthelyi Consulting",
  description:
    "Családfővédelem a család pénzügyi biztonságáért. Ismerje meg, hogyan segíthet egy megfelelő biztosítás váratlan élethelyzetek esetén.",

  openGraph: {
    title: "Családfővédelem – Keszthelyi Consulting",
    description:
      "Családfővédelem a család pénzügyi biztonságáért. Gondoskodjon előre a szerettei anyagi védelméről.",
    url: "https://www.keszthelyiconsulting.com/penzugy/biztositasok/csaladfo-vedelem",
    siteName: "Keszthelyi Consulting",
    type: "website",
    locale: "hu_HU",
    images: [
      {
        url: "/finance-card-csaladfo-vedelem.png",
        alt: "Családfővédelem – Keszthelyi Consulting",
      },
    ],
  },
};

export default function CsaladfoVedelemLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}