import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gyermekcélú megtakarítás – Keszthelyi Consulting",
  description:
    "Gyermekcélú megtakarítás a gyermek jövőjének tudatos pénzügyi megalapozásához. Ismerje meg a hosszú távú megtakarítási lehetőségeket.",

  openGraph: {
    title: "Gyermekcélú megtakarítás – Keszthelyi Consulting",
    description:
      "Tervezzen előre gyermeke jövőjére. Ismerje meg a gyermekcélú megtakarítási lehetőségeket.",
    url: "https://www.keszthelyiconsulting.com/penzugy/megtakaritasok/gyermekcelu-megtakaritas",
    siteName: "Keszthelyi Consulting",
    type: "website",
    locale: "hu_HU",
    images: [
      {
        url: "/finance-card-gyermek-megtakaritas.png",
        alt: "Gyermekcélú megtakarítás – Keszthelyi Consulting",
      },
    ],
  },
};

export default function GyermekceluMegtakaritasLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}