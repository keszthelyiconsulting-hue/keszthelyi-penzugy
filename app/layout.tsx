import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata = {
  title: "Keszthelyi Consulting",
  description: "Pénzügyi és ingatlan megoldások",
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

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}