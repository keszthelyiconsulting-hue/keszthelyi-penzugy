import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Footer from "./components/Footer";
export const metadata = {
  title: "Keszthelyi Ingatlan",
  description: "Prémium ingatlanközvetítés",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hu">
     <body>
  {children}

  <Footer />

  <Analytics />
  <SpeedInsights />
</body>
    </html>
  );
}