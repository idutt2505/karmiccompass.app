import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans, DM_Mono } from "next/font/google";
import "./globals.css";
import { APP_NAME } from "@/lib/constants";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
});

const sans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "500"],
});

const mono = DM_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["300", "400"],
});

export const metadata: Metadata = {
  title: `${APP_NAME} — Journaling, reflection & gentle guidance`,
  description:
    "Karmic Compass helps you journal, notice patterns, and get calm AI mentor guidance. Built for privacy-conscious emotional wellness — not a substitute for care.",
  openGraph: {
    title: `${APP_NAME}`,
    description:
      "Journaling, karma and dharma insight, AI mentor, and reflection — in one focused app.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body className="font-sans font-light antialiased">{children}</body>
    </html>
  );
}
