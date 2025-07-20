import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cannabis & Fahren - Sichere Wartezeit berechnen",
  description: "Berechnen Sie Ihre sichere Wartezeit nach Cannabiskonsum basierend auf deutschen Gesetzen (§24a StVG) und wissenschaftlichen Erkenntnissen zur THC-Elimination. DSGVO-konform und datenschutzfreundlich.",
  keywords: "Cannabis, Fahren, THC, Wartezeit, Deutschland, §24a StVG, Sicherheit, Datenschutz",
  authors: [{ name: "Cannabis & Fahren Calculator" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "noindex, nofollow", // Privacy-focused app
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
