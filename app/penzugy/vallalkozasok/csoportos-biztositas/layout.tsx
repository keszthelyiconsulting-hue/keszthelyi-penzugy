import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Csoportos biztosítás – Keszthelyi Consulting",
  description:
    "Csoportos biztosítási megoldások vállalkozások és munkáltatók számára. Ismerje meg a dolgozói védelem és a vállalati juttatások lehetőségeit.",

  openGraph: {
    title: "Csoportos biztosítás – Keszthelyi Consulting",
    description:
      "Csoportos biztosítási megoldások vállalkozások és munkáltatók számára. Ismerje meg a dolgozói védelem lehetőségeit.",
    url: "https://www.keszthelyiconsulting.com/penzugy/vallalkozasok/csoportos-biztositas",
    siteName: "Keszthelyi Consulting",
    type: "website",
    locale: "hu_HU",
    images: [
      {
        url: "/finance-card-csoportos-biztositas.png",
        alt: "Csoportos biztosítás – Keszthelyi Consulting",
      },
    ],
  },
};

export default function CsoportosBiztositasLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}