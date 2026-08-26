import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KKV betét – Keszthelyi Consulting",
  description:
    "KKV betéti megoldások vállalkozások számára. Ismerje meg a vállalati megtakarítási és lekötési lehetőségeket, valamint a legfontosabb feltételeket.",

  openGraph: {
    title: "KKV betét – Keszthelyi Consulting",
    description:
      "KKV betéti megoldások vállalkozások számára. Ismerje meg a megtakarítási és lekötési lehetőségeket.",
    url: "https://www.keszthelyiconsulting.com/penzugy/vallalkozasok/kkv-betet",
    siteName: "Keszthelyi Consulting",
    type: "website",
    locale: "hu_HU",
    images: [
      {
        url: "/finance-card-kkv-betet.png",
        alt: "KKV betét – Keszthelyi Consulting",
      },
    ],
  },
};

export default function KkvBetetLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}