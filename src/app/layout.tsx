import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Cannabis & Fahren - Sichere Wartezeit berechnen",
  description: "Berechnen Sie Ihre sichere Wartezeit nach Cannabiskonsum basierend auf deutschen Gesetzen (§24a StVG) und wissenschaftlichen Erkenntnissen zur THC-Elimination. DSGVO-konform und datenschutzfreundlich.",
  keywords: "Cannabis, Fahren, THC, Wartezeit, Deutschland, §24a StVG, Sicherheit, Datenschutz",
  authors: [{ name: "Cannabis & Fahren Calculator" }],
  robots: "noindex, nofollow", // Privacy-focused app
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body
        className={`${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
