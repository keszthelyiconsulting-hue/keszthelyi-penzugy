import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Személyi kölcsön – Keszthelyi Consulting",
  description:
    "Személyi kölcsön több bank ajánlatának összehasonlításával. Ismerd meg a lehetőségeket, feltételeket és találd meg a számodra megfelelő finanszírozást.",

  alternates: {
    canonical:
      "https://www.keszthelyiconsulting.com/penzugy/hitelek/szemelyi-kolcson",
  },

  openGraph: {
    title: "Személyi kölcsön – Keszthelyi Consulting",
    description:
      "Személyi kölcsön több bank ajánlatának összehasonlításával. Ismerd meg a lehetőségeket és a legfontosabb feltételeket.",
    url: "https://www.keszthelyiconsulting.com/penzugy/hitelek/szemelyi-kolcson",
    siteName: "Keszthelyi Consulting",
    type: "website",
    locale: "hu_HU",

    images: [
      {
        url: "https://www.keszthelyiconsulting.com/finance-card-szemelyi-kolcson.png",
        width: 1536,
        height: 1024,
        type: "image/png",
        alt: "Személyi kölcsön – Keszthelyi Consulting",
      },
    ],
  },
};

export default function SzemelyiKolcsonLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}