import type { Metadata, Viewport } from "next";
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
  variable: "--font-dm-sans",
  display: "swap",
  weight: ["300", "400", "500"],
});

const mono = DM_Mono({
  subsets: ["latin"],
  variable: "--font-dm-mono",
  display: "swap",
  weight: ["300", "400"],
});

const SITE_URL = "https://karmiccompass.app";
const DESCRIPTION =
  "KarmicCompass helps you journal, notice patterns, and get calm AI mentor guidance. Built for privacy-conscious emotional wellness — not a substitute for care.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: `${APP_NAME} — Journaling, reflection & gentle guidance`,
  description: DESCRIPTION,
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: APP_NAME,
    description:
      "Journaling, karma and dharma insight, AI mentor, and reflection — in one focused app.",
    type: "website",
    url: SITE_URL,
    siteName: APP_NAME,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: APP_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: APP_NAME,
    description:
      "Journaling, karma and dharma insight, AI mentor, and reflection — in one focused app.",
    images: ["/og-image.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  // Must match --color-background in globals.css. This was #0f0e17 while the
  // page renders #0a0a0f, so mobile browser chrome sat a visible shade off the
  // page it framed.
  themeColor: "#0a0a0f",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: APP_NAME,
  applicationCategory: "HealthApplication",
  operatingSystem: "iOS, Android",
  description: DESCRIPTION,
  url: SITE_URL,
  publisher: {
    "@type": "Organization",
    name: APP_NAME,
    url: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <head>
        {/*
          Framer's `initial` state is serialised into the SSR markup, so 13
          elements — the hero headline, every How-it-works card and both
          pricing cards — ship as inline `opacity:0` and only become visible
          once hydration runs the entrance animation. The copy is in the DOM
          (crawlers read it fine), but with JS blocked or hydration failed the
          page body renders blank above the footer.

          A reveal must enhance an already-visible default, never gate it. This
          is the safety net for the no-JS case; the animations are untouched for
          everyone else.
        */}
        <noscript>
          <style>{`[style*="opacity:0"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="font-sans font-light antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
