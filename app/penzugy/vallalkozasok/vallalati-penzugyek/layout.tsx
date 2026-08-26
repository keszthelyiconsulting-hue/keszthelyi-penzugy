import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vállalati pénzügyek – Keszthelyi Consulting",
  description:
    "Vállalati pénzügyi megoldások egy helyen. Finanszírozás, megtakarítás és pénzügyi védelem vállalkozások egyedi igényeihez igazítva.",

  openGraph: {
    title: "Vállalati pénzügyek – Keszthelyi Consulting",
    description:
      "Pénzügyi megoldások vállalkozások számára. Finanszírozás, megtakarítás és védelem a vállalkozás céljaihoz igazítva.",
    url: "https://www.keszthelyiconsulting.com/penzugy/vallalkozasok/vallalati-penzugyek",
    siteName: "Keszthelyi Consulting",
    type: "website",
    locale: "hu_HU",
    images: [
      {
        url: "/finance-card-vallalati-penzugyek.png",
        alt: "Vállalati pénzügyek – Keszthelyi Consulting",
      },
    ],
  },
};

export default function VallalatiPenzugyekLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}