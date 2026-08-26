import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kulcsember-védelem – Keszthelyi Consulting",
  description:
    "Kulcsember-védelem vállalkozások számára. Pénzügyi védelem arra az esetre, ha a vállalkozás működésében meghatározó személyt váratlan esemény éri.",

  openGraph: {
    title: "Kulcsember-védelem – Keszthelyi Consulting",
    description:
      "Védje vállalkozását egy kulcsfontosságú munkatárs vagy vezető váratlan kiesésének pénzügyi következményeitől.",
    url: "https://www.keszthelyiconsulting.com/penzugy/vallalkozasok/kulcsember-vedelem",
    siteName: "Keszthelyi Consulting",
    type: "website",
    locale: "hu_HU",
    images: [
      {
        url: "/finance-card-kulcsember-vedelem.png",
        alt: "Kulcsember-védelem – Keszthelyi Consulting",
      },
    ],
  },
};

export default function KulcsemberVedelemLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}