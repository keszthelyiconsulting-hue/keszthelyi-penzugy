import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lakossági folyószámla – Keszthelyi Consulting",
  description:
    "Lakossági folyószámla lehetőségek közérthetően, egy helyen. Ismerje meg a számlacsomagok legfontosabb jellemzőit és válasszon pénzügyi szokásaihoz illeszkedő megoldást.",

  openGraph: {
    title: "Lakossági folyószámla – Keszthelyi Consulting",
    description:
      "Lakossági folyószámla lehetőségek közérthetően, egy helyen. Ismerje meg a legfontosabb feltételeket és számlamegoldásokat.",
    url: "https://www.keszthelyiconsulting.com/penzugy/szamlatermekek/lakossagi-folyoszamla",
    siteName: "Keszthelyi Consulting",
    type: "website",
    locale: "hu_HU",
    images: [
      {
        url: "/finance-card-lakossagi-folyoszamla.png",
        alt: "Lakossági folyószámla – Keszthelyi Consulting",
      },
    ],
  },
};

export default function LakossagiFolyoszamlaLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}