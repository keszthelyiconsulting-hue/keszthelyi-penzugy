import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Falusi CSOK – Keszthelyi Consulting",
  description:
    "Falusi CSOK közérthetően, egy helyen. Ismerd meg az otthonteremtési lehetőségeket, a legfontosabb feltételeket és a finanszírozás részleteit.",

  openGraph: {
    title: "Falusi CSOK – Keszthelyi Consulting",
    description:
      "Falusi CSOK közérthetően, egy helyen. Ismerd meg az otthonteremtési lehetőségeket és a legfontosabb feltételeket.",
    url: "https://www.keszthelyiconsulting.com/penzugy/otthonteremtes/falusi-csok",
    siteName: "Keszthelyi Consulting",
    type: "website",
    locale: "hu_HU",
    images: [
      {
        url: "/finance-card-falusi-csok.png",
        alt: "Falusi CSOK – Keszthelyi Consulting",
      },
    ],
  },
};

export default function FalusiCsokLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}