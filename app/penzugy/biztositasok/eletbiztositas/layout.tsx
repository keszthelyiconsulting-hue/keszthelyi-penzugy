import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Életbiztosítás – Keszthelyi Consulting",
  description:
    "Életbiztosítási megoldások az Ön és családja pénzügyi biztonságáért. Ismerje meg a lehetőségeket, és válasszon az élethelyzetéhez illeszkedő védelem közül.",

  openGraph: {
    title: "Életbiztosítás – Keszthelyi Consulting",
    description:
      "Életbiztosítási megoldások az Ön és családja pénzügyi biztonságáért. Ismerje meg az élethelyzetéhez illeszkedő lehetőségeket.",
    url: "https://www.keszthelyiconsulting.com/penzugy/biztositasok/eletbiztositas",
    siteName: "Keszthelyi Consulting",
    type: "website",
    locale: "hu_HU",
    images: [
      {
        url: "/finance-card-eletbiztositas.png",
        alt: "Életbiztosítás – Keszthelyi Consulting",
      },
    ],
  },
};

export default function EletbiztositasLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}