import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CSOK Plusz – Keszthelyi Consulting",
  description:
    "CSOK Plusz finanszírozás közérthetően, egy helyen. Ismerd meg a lehetőségeket, a legfontosabb feltételeket és a családtervezéshez kapcsolódó finanszírozást.",

  openGraph: {
    title: "CSOK Plusz – Keszthelyi Consulting",
    description:
      "CSOK Plusz finanszírozás közérthetően, egy helyen. Ismerd meg a lehetőségeket és a legfontosabb feltételeket.",
    url: "https://www.keszthelyiconsulting.com/penzugy/otthonteremtes/csok-plusz",
    siteName: "Keszthelyi Consulting",
    type: "website",
    locale: "hu_HU",
    images: [
      {
        url: "/finance-card-csok-plusz.png",
        alt: "CSOK Plusz – Keszthelyi Consulting",
      },
    ],
  },
};

export default function CsokPluszLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}