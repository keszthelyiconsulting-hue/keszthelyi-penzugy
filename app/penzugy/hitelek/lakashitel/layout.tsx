import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lakáshitel – Keszthelyi Consulting",
  description:
    "Lakáshitel vásárláshoz, építéshez vagy más lakáscélhoz. Ismerd meg a finanszírozási lehetőségeket és a legfontosabb feltételeket.",

  openGraph: {
    title: "Lakáshitel – Keszthelyi Consulting",
    description:
      "Lakáshitel érthetően, egy helyen. Ismerd meg a finanszírozási lehetőségeket és találd meg a céljaidhoz megfelelő megoldást.",
    url: "https://www.keszthelyiconsulting.com/penzugy/hitelek/lakashitel",
    siteName: "Keszthelyi Consulting",
    type: "website",
    locale: "hu_HU",
    images: [
      {
        url: "/finance-card-lakashitel.png",
        alt: "Lakáshitel – Keszthelyi Consulting",
      },
    ],
  },
};

export default function LakashitelLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}