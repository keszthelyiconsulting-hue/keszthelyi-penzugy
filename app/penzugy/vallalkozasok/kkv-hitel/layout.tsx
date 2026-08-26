import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KKV hitel – Keszthelyi Consulting",
  description:
    "KKV hitel és vállalkozói finanszírozási lehetőségek. Ismerje meg a vállalkozása működéséhez, fejlesztéséhez és beruházásaihoz elérhető megoldásokat.",

  openGraph: {
    title: "KKV hitel – Keszthelyi Consulting",
    description:
      "Finanszírozási lehetőségek vállalkozások működéséhez, fejlesztéséhez és beruházásaihoz. Ismerje meg a KKV hitel lehetőségeit.",
    url: "https://www.keszthelyiconsulting.com/penzugy/vallalkozasok/kkv-hitel",
    siteName: "Keszthelyi Consulting",
    type: "website",
    locale: "hu_HU",
    images: [
      {
        url: "/finance-card-kkv-hitel.png",
        alt: "KKV hitel – Keszthelyi Consulting",
      },
    ],
  },
};

export default function KkvHitelLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}