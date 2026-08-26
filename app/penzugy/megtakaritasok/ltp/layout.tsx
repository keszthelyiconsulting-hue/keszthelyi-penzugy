import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lakástakarék – LTP | Keszthelyi Consulting",
  description:
    "Lakástakarék-megtakarítás lakáscélok megvalósításához. Ismerje meg az LTP lehetőségeit és tervezze meg tudatosan jövőbeli lakáscéljait.",

  openGraph: {
    title: "Lakástakarék – LTP | Keszthelyi Consulting",
    description:
      "Lakástakarék-megtakarítás lakáscélok megvalósításához. Ismerje meg az LTP lehetőségeit.",
    url: "https://www.keszthelyiconsulting.com/penzugy/megtakaritasok/ltp",
    siteName: "Keszthelyi Consulting",
    type: "website",
    locale: "hu_HU",
    images: [
      {
        url: "/finance-card-ltp.png",
        alt: "Lakástakarék – LTP | Keszthelyi Consulting",
      },
    ],
  },
};

export default function LtpLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}