import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gyors segítség – Keszthelyi Consulting",
  description:
    "Nagyértékű diagnosztikai vizsgálatok és egynapos műtéti térítési lehetőségek. Személyre szabott biztosítási megoldások a Keszthelyi Consultingtól.",
};

export default function GyorsSegitsegLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}