import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Személyi kölcsön – Keszthelyi Consulting",
  description:
    "Személyi kölcsön több bank ajánlatának összehasonlításával. Ismerd meg a lehetőségeket, feltételeket és találd meg a számodra megfelelő finanszírozást.",

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
        url: "/finance-card-szemelyi-kolcson.png",
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