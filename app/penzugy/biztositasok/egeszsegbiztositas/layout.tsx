import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Egészségbiztosítás – Keszthelyi Consulting",
  description:
    "Egészségbiztosítási megoldások az egészségügyi ellátás kiszámíthatóbbá és gyorsabban elérhetővé tételéhez. Ismerd meg a lehetőségeket.",

  openGraph: {
    title: "Egészségbiztosítás – Keszthelyi Consulting",
    description:
      "Egészségbiztosítási megoldások az egészségügyi ellátás kiszámíthatóbbá és gyorsabban elérhetővé tételéhez. Ismerd meg a lehetőségeket.",
    url: "https://www.keszthelyiconsulting.com/penzugy/biztositasok/egeszsegbiztositas",
    siteName: "Keszthelyi Consulting",
    type: "website",
    locale: "hu_HU",
    images: [
      {
        url: "/finance-card-egeszsegbiztositas.png",
        alt: "Egészségbiztosítás – Keszthelyi Consulting",
      },
    ],
  },
};

export default function EgeszsegbiztositasLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}