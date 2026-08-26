import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Babaváró – Keszthelyi Consulting",
  description:
    "Babaváró támogatás és finanszírozás közérthetően, egy helyen. Ismerd meg a lehetőségeket és a legfontosabb feltételeket.",

  openGraph: {
    title: "Babaváró – Keszthelyi Consulting",
    description:
      "Babaváró támogatás és finanszírozás közérthetően, egy helyen. Ismerd meg a lehetőségeket és a legfontosabb feltételeket.",
    url: "https://www.keszthelyiconsulting.com/penzugy/otthonteremtes/babavaro",
    siteName: "Keszthelyi Consulting",
    type: "website",
    locale: "hu_HU",
    images: [
      {
        url: "/finance-card-babavaro.png",
        alt: "Babaváró – Keszthelyi Consulting",
      },
    ],
  },
};

export default function BabavaroLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}