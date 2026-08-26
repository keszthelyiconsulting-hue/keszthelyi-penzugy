import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gyermekbiztosítás – Keszthelyi Consulting",
  description:
    "Gyermekbiztosítási lehetőségek baleset, betegség és kórházi ellátás esetére. Személyre szabott pénzügyi és biztosítási megoldások a Keszthelyi Consultingtól.",
};

export default function GyermekbiztositasLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}