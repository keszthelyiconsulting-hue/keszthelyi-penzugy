import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kritikus betegségek elleni védelem | Keszthelyi Consulting",
  description:
    "Személyre szabható biztosítási védelem súlyos betegségek és egészségi állapotok esetére.",
};

export default function KritikusBetegsegekLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}