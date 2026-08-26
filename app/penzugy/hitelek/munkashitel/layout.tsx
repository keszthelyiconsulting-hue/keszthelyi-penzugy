import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Munkáshitel – Keszthelyi Consulting",
  description:
    "Munkáshitel fiatal munkavállalóknak, közérthetően. Ismerd meg a lehetőségeket, a legfontosabb feltételeket és a finanszírozás részleteit.",

  openGraph: {
    title: "Munkáshitel – Keszthelyi Consulting",
    description:
      "Munkáshitel fiatal munkavállalóknak. Ismerd meg a lehetőségeket és a legfontosabb feltételeket.",
    url: "https://www.keszthelyiconsulting.com/penzugy/hitelek/munkashitel",
    siteName: "Keszthelyi Consulting",
    type: "website",
    locale: "hu_HU",
    images: [
      {
        url: "/finance-card-munkashitel.png",
        alt: "Munkáshitel – Keszthelyi Consulting",
      },
    ],
  },
};

export default function MunkashitelLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}