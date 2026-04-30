# Karmic Compass landing — full source for review

Next.js 15 (App Router) + Tailwind CSS v4 + Framer Motion. Path alias: `@/*` → `./src/*`.

---

## `package.json`

```json
{
  "name": "karmic-compass-landing",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build --turbopack",
    "start": "next start",
    "lint": "eslint"
  },
  "dependencies": {
    "framer-motion": "^12.38.0",
    "next": "15.5.15",
    "react": "19.1.0",
    "react-dom": "19.1.0"
  },
  "devDependencies": {
    "@eslint/eslintrc": "^3",
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "15.5.15",
    "tailwindcss": "^4",
    "typescript": "^5"
  }
}
```

---

## `postcss.config.mjs`

```js
const config = {
  plugins: ["@tailwindcss/postcss"],
};

export default config;
```

---

## `next.config.ts`

```ts
import type { NextConfig } from "next";
import * as path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  turbopack: { root: __dirname },
};

export default nextConfig;
```

---

## `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

---

## `src/app/globals.css`

```css
@import "tailwindcss";

@theme inline {
  --color-background: #0a0a0f;
  --color-foreground: #f5f2ed;
  --font-sans: var(--font-sans), system-ui, sans-serif;
  --font-serif: var(--font-display), ui-serif, Georgia, serif;
  --font-mono: var(--font-mono), ui-monospace, monospace;
}

@layer base {
  html {
    scroll-behavior: smooth;
  }
  @media (prefers-reduced-motion: reduce) {
    html {
      scroll-behavior: auto;
    }
  }
  body {
    background: var(--color-background);
    color: var(--color-foreground);
    font-family: var(--font-sans);
  }
  h1, h2, h3, .font-serif {
    font-family: var(--font-serif);
  }
  .font-mono, code {
    font-family: var(--font-mono);
  }
}
```

---

## `src/app/layout.tsx`

```tsx
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
```

---

## `src/app/page.tsx`

```tsx
import { LandingPage } from "@/components/landing/LandingPage";

export default function Home() {
  return <LandingPage />;
}
```

---

## `src/lib/constants.ts`

```ts
/**
 * Replace empty strings with real URLs before launch.
 * Empty external URLs will open the “link coming soon” flow instead of dead hrefs.
 */
export const APP_NAME = "Karmic Compass" as const;

export const CONTACT_EMAIL = "app.karmiccompass@gmail.com" as const;
export const MAILTO_CONTACT = `mailto:${CONTACT_EMAIL}` as const;

/** Set when your public privacy policy is hosted (e.g. on karmiccompass.app). */
export const PRIVACY_URL = "" as const;

/** Set when your public terms of service is hosted. */
export const TERMS_URL = "" as const;

/** iOS App Store product page. */
export const APP_STORE_URL = "" as const;

/** TestFlight or beta invite URL. */
export const TESTFLIGHT_URL = "" as const;

export const X_SOCIAL_URL = "https://twitter.com/CompassKarmic" as const;

export const SECTION_IDS = {
  hero: "section-hero",
  features: "section-features",
  preview: "section-preview",
  how: "section-how",
  trust: "section-trust",
  pricing: "section-pricing",
  faq: "section-faq",
} as const;

export type SectionId = (typeof SECTION_IDS)[keyof typeof SECTION_IDS];

export function isExternalUrlReady(
  value: string | null | undefined,
): value is string {
  return typeof value === "string" && value.trim().length > 0;
}
```

---

## `src/components/landing/LandingPage.tsx`

```tsx
import { Header } from "./Header";
import { HeroSection } from "./sections/HeroSection";
import { FeatureShowcase } from "./sections/FeatureShowcase";
import { AppPreviewSection } from "./sections/AppPreviewSection";
import { HowItWorksSection } from "./sections/HowItWorksSection";
import { TrustSection } from "./sections/TrustSection";
import { PricingSection } from "./sections/PricingSection";
import { FAQSection } from "./sections/FAQSection";
import { SiteFooter } from "./sections/SiteFooter";
import { ComingSoonProvider } from "./ComingSoonContext";
import { ComingSoonModal } from "./ComingSoonModal";
import { ScrollProgress } from "./ScrollProgress";

export function LandingPage() {
  return (
    <ComingSoonProvider>
      <div className="min-h-screen bg-[#0a0a0f] text-[#f5f2ed]">
        <ScrollProgress />
        <Header />
        <main>
          <HeroSection />
          <FeatureShowcase />
          <AppPreviewSection />
          <HowItWorksSection />
          <TrustSection />
          <PricingSection />
          <FAQSection />
        </main>
        <SiteFooter />
        <ComingSoonModal />
      </div>
    </ComingSoonProvider>
  );
}
```

---

## `src/components/landing/ComingSoonContext.tsx`

```tsx
"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type Ctx = {
  open: boolean;
  setOpen: (v: boolean) => void;
  openComingSoon: () => void;
};

const ComingSoonContext = createContext<Ctx | null>(null);

export function ComingSoonProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const openComingSoon = useCallback(() => setOpen(true), []);
  const value = useMemo(
    () => ({ open, setOpen, openComingSoon }),
    [open, openComingSoon],
  );
  return (
    <ComingSoonContext.Provider value={value}>
      {children}
    </ComingSoonContext.Provider>
  );
}

export function useComingSoon() {
  const ctx = useContext(ComingSoonContext);
  if (!ctx) {
    throw new Error("useComingSoon must be used within ComingSoonProvider");
  }
  return ctx;
}
```

---

## `src/components/landing/ComingSoonModal.tsx`

```tsx
"use client";

import { useEffect, useId, useRef } from "react";
import { useComingSoon } from "./ComingSoonContext";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { CONTACT_EMAIL, MAILTO_CONTACT } from "@/lib/constants";

export function ComingSoonModal() {
  const { open, setOpen } = useComingSoon();
  const reduce = useReducedMotion();
  const titleId = useId();
  const firstBtn = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    firstBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  return (
    <AnimatePresence>
      {open && (
        <div
          className="fixed inset-0 z-[200] flex items-end justify-center p-4 sm:items-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
        >
          <motion.button
            type="button"
            className="absolute inset-0 cursor-default bg-black/60"
            aria-label="Close"
            onClick={() => setOpen(false)}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.2 }}
          />
          <motion.div
            ref={panelRef}
            role="document"
            className="relative w-full max-w-sm rounded-2xl border border-white/10 bg-[#12121a] p-6 text-[#f5f2ed] shadow-2xl"
            initial={reduce ? false : { opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? undefined : { opacity: 0, y: 8, scale: 0.98 }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
          >
            <h2 id={titleId} className="font-serif text-xl font-light tracking-tight">
              Link coming soon
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/55">
              We&rsquo;re finalising this destination. In the meantime, you can
              reach us at{" "}
              <a
                className="text-[#C9824A] underline decoration-[#C9824A]/40 underline-offset-2 transition hover:decoration-[#C9824A]"
                href={MAILTO_CONTACT}
              >
                {CONTACT_EMAIL}
              </a>
              .
            </p>
            <div className="mt-6 flex justify-end">
              <button
                ref={firstBtn}
                type="button"
                className="rounded-lg bg-[#C9824A] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#E8A97A]"
                onClick={() => setOpen(false)}
              >
                OK
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
```

---

## `src/components/landing/SmartExternalLink.tsx`

```tsx
"use client";

import { useComingSoon } from "./ComingSoonContext";
import { isExternalUrlReady } from "@/lib/constants";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type SmartLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  label: string;
} & Omit<ComponentPropsWithoutRef<"a">, "href" | "children">;

/**
 * Renders a real anchor when `href` is set; otherwise a button that opens
 * the coming-soon modal (no dead links).
 */
export function SmartExternalLink({
  href,
  children,
  className,
  label,
  ...rest
}: SmartLinkProps) {
  const { openComingSoon } = useComingSoon();
  if (isExternalUrlReady(href)) {
    return (
      <a
        href={href}
        className={className}
        target="_blank"
        rel="noopener noreferrer"
        {...rest}
      >
        {children}
      </a>
    );
  }
  return (
    <button
      type="button"
      className={className}
      onClick={openComingSoon}
      aria-label={label}
    >
      {children}
    </button>
  );
}
```

---

## `src/components/landing/SectionReveal.tsx`

```tsx
"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export function SectionReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) {
    return <div className={className}>{children}</div>;
  }
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
```

---

## `src/components/landing/ScrollProgress.tsx`

```tsx
"use client";

import { useEffect, useState } from "react";

export function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const el = document.documentElement;
    const on = () => {
      const t = el.scrollTop;
      const h = el.scrollHeight - el.clientHeight;
      setP(h > 0 ? (t / h) * 100 : 0);
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <div
      className="pointer-events-none fixed top-0 left-0 z-[100] h-0.5 w-full bg-transparent"
      aria-hidden
    >
      <div
        className="h-full bg-[#C9824A] will-change-[width]"
        style={{ width: `${p}%` }}
      />
    </div>
  );
}
```

---

## `src/components/landing/PhoneFrame.tsx`

```tsx
"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SectionReveal } from "./SectionReveal";

/** Decorative phone frame with CSS-only “screens” – no stock imagery. */
export function PhoneFrame() {
  const reduce = useReducedMotion();
  return (
    <SectionReveal>
      <motion.div
        className="relative mx-auto aspect-[9/19] w-full max-w-[min(100%,360px)] rounded-[2.2rem] border border-white/12 bg-gradient-to-b from-white/[0.08] to-transparent p-2 shadow-[0_24px_80px_-20px_rgba(201,130,74,0.15)] backdrop-blur-sm"
        animate={
          reduce
            ? undefined
            : { y: [0, -7, 0] }
        }
        transition={
          reduce
            ? undefined
            : { duration: 5.5, repeat: Infinity, ease: "easeInOut" }
        }
      >
        <div
          className="flex h-full w-full flex-col overflow-hidden rounded-[1.6rem] bg-gradient-to-b from-[#0e0e14] to-[#0a0a0f] ring-1 ring-white/5"
          role="img"
          aria-label="Karmic Compass app preview: stylised interface panels"
        >
          <div className="flex shrink-0 items-center justify-between px-5 pt-3 pb-2 text-[0.6rem] tracking-[0.2em] text-white/30">
            <span>9:41</span>
            <div className="h-1.5 w-16 rounded-full bg-white/10" aria-hidden />
          </div>
          <div className="px-5">
            <p className="font-serif text-lg font-light tracking-tight text-[#f5f2ed]">
              <span className="text-white/90">Karmic</span>{" "}
              <span className="text-[#C9824A]">Compass</span>
            </p>
            <p className="mt-0.5 text-xs text-white/40">Home · this week</p>
          </div>
          <div className="mt-4 mx-4 rounded-xl border border-white/[0.07] bg-gradient-to-br from-white/[0.04] to-transparent p-3">
            <div className="flex items-end justify-between gap-2">
              <div>
                <p className="text-[0.55rem] uppercase tracking-[0.2em] text-[#C9824A]/90">
                  Karma
                </p>
                <p className="font-serif text-3xl font-light text-white">78</p>
              </div>
              <div className="h-10 w-10 rounded-full border border-[#C9824A]/25 bg-[#C9824A]/5" />
            </div>
            <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-white/5">
              <div
                className="h-full w-3/4 rounded-full bg-[#C9824A]/50"
                aria-hidden
              />
            </div>
          </div>
          <div className="mt-3 flex flex-1 flex-col gap-2 px-4 pb-5">
            <div className="rounded-lg border border-white/[0.05] bg-white/[0.02] px-3 py-2">
              <p className="text-[0.5rem] uppercase tracking-[0.16em] text-white/30">
                Dharma focus
              </p>
              <p className="text-sm text-white/60">Clarity in daily action</p>
            </div>
            <div className="flex-1 rounded-lg border border-white/[0.05] bg-gradient-to-b from-white/[0.02] to-transparent p-3">
              <p className="text-[0.5rem] uppercase tracking-[0.16em] text-white/30">
                Journal
              </p>
              <div className="mt-1 space-y-1.5">
                <div className="h-1.5 w-full rounded bg-white/10" />
                <div className="h-1.5 w-4/5 rounded bg-white/8" />
                <div className="h-1.5 w-3/5 rounded bg-white/6" />
              </div>
            </div>
            <div className="h-8 rounded-lg border border-white/[0.06] bg-white/[0.02]" />
          </div>
        </div>
        <div
          className="absolute bottom-1.5 left-1/2 h-1 w-24 -translate-x-1/2 rounded-full bg-white/15"
          aria-hidden
        />
      </motion.div>
    </SectionReveal>
  );
}
```

---

## `src/components/landing/Header.tsx`

```tsx
"use client";

import { useState } from "react";
import { APP_NAME, SECTION_IDS } from "@/lib/constants";

const nav = [
  { label: "Features", id: SECTION_IDS.features },
  { label: "Preview", id: SECTION_IDS.preview },
  { label: "How it works", id: SECTION_IDS.how },
  { label: "Trust", id: SECTION_IDS.trust },
  { label: "Pricing", id: SECTION_IDS.pricing },
  { label: "FAQ", id: SECTION_IDS.faq },
] as const;

function scrollToId(id: string) {
  const el = document.getElementById(id);
  el?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.06] bg-[#0a0a0f]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:h-16 sm:px-6">
        <a
          href={`#${SECTION_IDS.hero}`}
          className="font-serif text-lg tracking-tight text-[#f5f2ed] sm:text-xl"
          onClick={(e) => {
            e.preventDefault();
            scrollToId(SECTION_IDS.hero);
            setOpen(false);
          }}
        >
          {APP_NAME.split(" ")[0]}{" "}
          <span className="text-[#C9824A]">{APP_NAME.split(" ")[1]}</span>
        </a>
        <nav
          className="hidden items-center gap-8 md:flex"
          aria-label="Primary"
        >
          {nav.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="text-[0.7rem] uppercase tracking-[0.16em] text-white/40 transition hover:text-white/80"
              onClick={(e) => {
                e.preventDefault();
                scrollToId(item.id);
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href={`#${SECTION_IDS.pricing}`}
            className="hidden rounded-full border border-[#C9824A]/40 bg-[#C9824A]/10 px-4 py-1.5 text-xs font-medium text-[#E8A97A] transition hover:border-[#C9824A] hover:bg-[#C9824A]/20 sm:inline-block"
            onClick={(e) => {
              e.preventDefault();
              scrollToId(SECTION_IDS.pricing);
            }}
          >
            Get access
          </a>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-white/70 md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Menu</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
              {open ? (
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              ) : (
                <path
                  d="M4 7h16M4 12h16M4 17h8"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              )}
            </svg>
          </button>
        </div>
      </div>
      {open && (
        <div
          id="mobile-nav"
          className="border-t border-white/[0.06] bg-[#0a0a0f] px-4 py-3 md:hidden"
        >
          <ul className="flex flex-col gap-1">
            {nav.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="block rounded-lg py-2.5 text-sm text-white/70"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToId(item.id);
                    setOpen(false);
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={`#${SECTION_IDS.pricing}`}
                className="mt-1 block rounded-lg bg-[#C9824A]/15 py-2.5 text-center text-sm text-[#E8A97A]"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToId(SECTION_IDS.pricing);
                  setOpen(false);
                }}
              >
                Get access
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
```

---

## `src/components/landing/sections/HeroSection.tsx`

```tsx
"use client";

import { SectionReveal } from "../SectionReveal";
import { PhoneFrame } from "../PhoneFrame";
import { SECTION_IDS } from "@/lib/constants";

function scrollToId(id: string) {
  if (typeof document === "undefined") return;
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export function HeroSection() {
  return (
    <section
      id={SECTION_IDS.hero}
      className="relative min-h-screen scroll-mt-0 border-b border-white/[0.04] bg-gradient-to-b from-[#0c0c12] via-[#0a0a0f] to-[#08080c] pt-24 sm:pt-28"
    >
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden
      >
        <div className="absolute -top-40 left-1/2 h-[min(80vh,500px)] w-[min(100%,900px)] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(201,130,74,0.12),transparent_75%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(250,247,242,0.02)_1px,transparent_1px)] bg-size-[100%_48px] mask-[radial-gradient(closest-side,transparent,transparent,transparent)] opacity-0 sm:opacity-40" />
      </div>
      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 pb-24 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-16 lg:pb-32">
        <SectionReveal>
          <p className="text-xs uppercase tracking-[0.28em] text-[#C9824A]">
            Journaling · self-awareness
          </p>
          <h1 className="mt-4 font-serif text-4xl font-light leading-[1.05] tracking-[-0.02em] text-[#f5f2ed] sm:text-5xl lg:text-[3.25rem] lg:leading-[1.02]">
            Where your day meets{" "}
            <span className="text-[#C9824A]">karma and dharma</span>
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-white/50 sm:text-lg">
            A calm space to write, see patterns in your choices, and get gentle
            guidance from an AI mentor — built for modern life, not for noise.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              type="button"
              className="rounded-xl bg-[#C9824A] px-6 py-3 text-sm font-medium text-white shadow-[0_8px_32px_-8px_rgba(201,130,74,0.45)] transition hover:bg-[#E8A97A] focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-[#C9824A]"
              onClick={() => scrollToId(SECTION_IDS.pricing)}
            >
              View plans
            </button>
            <a
              href={`#${SECTION_IDS.preview}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToId(SECTION_IDS.preview);
              }}
              className="rounded-xl border border-white/15 bg-white/[0.03] px-6 py-3 text-sm text-white/70 transition hover:border-white/25 hover:bg-white/[0.06] focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-white/20"
            >
              See the app
            </a>
          </div>
          <p className="mt-6 text-xs text-white/25">
            A wellness companion for reflection — not a substitute for
            professional care.
          </p>
        </SectionReveal>
        <PhoneFrame />
      </div>
    </section>
  );
}
```

---

## `src/components/landing/sections/FeatureShowcase.tsx`

```tsx
"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SectionReveal } from "../SectionReveal";
import { SECTION_IDS } from "@/lib/constants";

const items = [
  {
    t: "Karma & dharma",
    d: "See a living score and weekly focus that reflect the intentions behind your days — not punishment, but perspective.",
  },
  {
    t: "AI mentor",
    d: "Ask what’s on your mind. Arya helps you reframe, plan small steps, and hold continuity across sessions — without performative chat.",
  },
  {
    t: "Daily journal",
    d: "Short entries, consistent rhythm. The app patterns your writing into themes you can actually use.",
  },
  {
    t: "Reports & insight",
    d: "Read summaries of your weeks: mood, effort, and the virtues you keep returning to — as understanding, not grades.",
  },
  {
    t: "Voice reflection",
    d: "Speak when typing feels wrong. Your voice is transcribed for you to keep or refine.",
  },
  {
    t: "Mindfulness tools",
    d: "Breath, gentle prompts, and check-ins you can do between meetings — in the same app as your journal.",
  },
] as const;

export function FeatureShowcase() {
  const reduce = useReducedMotion();
  return (
    <section
      id={SECTION_IDS.features}
      className="scroll-mt-20 border-b border-white/[0.04] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionReveal>
          <p className="text-center text-xs uppercase tracking-[0.25em] text-[#C9824A]">
            Inside the app
          </p>
          <h2 className="mt-3 text-center font-serif text-3xl font-light text-[#f5f2ed] sm:text-4xl">
            What you can actually do
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-sm text-white/45 sm:text-base">
            Familiar ideas —{" "}
            <em className="not-italic text-white/50">journaling and growth</em>{" "}
            — with structure that helps you return to yourself, not a feed.
          </p>
        </SectionReveal>
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((f, i) => (
            <motion.article
              key={f.t}
              initial={reduce ? false : { opacity: 0, y: 10 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              whileHover={
                reduce
                  ? undefined
                  : { y: -4, transition: { duration: 0.2 } }
              }
              className="group rounded-2xl border border-white/[0.06] bg-gradient-to-b from-white/[0.04] to-transparent p-5 transition-shadow hover:shadow-[0_20px_50px_-24px_rgba(201,130,74,0.12)]"
            >
              <h3 className="font-serif text-lg text-[#e8e4de] group-hover:text-white">
                {f.t}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/45">
                {f.d}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

## `src/components/landing/sections/AppPreviewSection.tsx`

```tsx
import { SectionReveal } from "../SectionReveal";
import { SECTION_IDS } from "@/lib/constants";

export function AppPreviewSection() {
  return (
    <section
      id={SECTION_IDS.preview}
      className="scroll-mt-20 border-b border-white/[0.04] bg-gradient-to-b from-[#0a0a0f] to-[#0c0c10] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionReveal>
          <h2 className="text-center font-serif text-3xl font-light text-[#f5f2ed] sm:text-4xl">
            A calmer way to look at the week
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-center text-sm text-white/45">
            The interface is built to reduce friction: write, see your line of
            thought, and open guidance when you are ready. The panels below are
            stylised mockups, not final screenshots.
          </p>
        </SectionReveal>
        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          <SectionReveal className="rounded-2xl border border-white/[0.08] bg-[#0e0e16]/80 p-5 shadow-inner backdrop-blur-sm">
            <p className="text-[0.6rem] uppercase tracking-[0.2em] text-white/30">
              Mentor
            </p>
            <div className="mt-3 space-y-2">
              <div className="rounded-lg bg-white/5 p-2 text-sm text-white/50">
                I keep postponing the honest conversation&hellip;
              </div>
              <div className="rounded-lg border border-[#C9824A]/15 bg-[#C9824A]/[0.08] p-2 text-sm text-white/70">
                What would be kind and clear in one sentence? Start there.
              </div>
            </div>
            <a
              href={`#${SECTION_IDS.features}`}
              className="mt-3 inline-block text-xs text-[#C9824A] underline decoration-[#C9824A]/30 underline-offset-2 hover:decoration-[#C9824A]"
            >
              See how mentor fits the rest of the app
            </a>
          </SectionReveal>
          <SectionReveal
            className="rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.04] p-5 backdrop-blur-sm"
            delay={0.06}
          >
            <p className="text-[0.6rem] uppercase tracking-[0.2em] text-white/30">
              This week
            </p>
            <div className="mt-4 h-2 w-3/4 rounded-full bg-white/10" />
            <div className="mt-2 h-2 w-1/2 rounded-full bg-white/5" />
            <ul className="mt-4 space-y-2 text-sm text-white/50">
              <li className="flex justify-between">
                <span>Reflections</span>
                <span className="text-white/35">5</span>
              </li>
              <li className="flex justify-between">
                <span>Score (illustrative)</span>
                <span className="text-[#C9824A]">+3</span>
              </li>
            </ul>
            <a
              href={`#${SECTION_IDS.pricing}`}
              className="mt-4 block text-center text-xs text-white/40 transition hover:text-white/60"
            >
              Deeper period reports in Premium
            </a>
          </SectionReveal>
          <SectionReveal
            className="rounded-2xl border border-white/[0.08] bg-[#0e0e16]/80 p-5 backdrop-blur-sm"
            delay={0.1}
          >
            <p className="text-[0.6rem] uppercase tracking-[0.2em] text-white/30">
              Voice
            </p>
            <p className="mt-2 font-serif text-lg text-white/70">
              Let it out first. Edit second.
            </p>
            <div className="mt-3 flex h-20 items-end rounded-xl bg-gradient-to-t from-white/5 to-transparent p-2">
              <div className="h-6 w-full rounded-md bg-white/10" />
            </div>
            <p className="mt-2 text-xs text-white/35">Illustration only</p>
            <a
              href={`#${SECTION_IDS.faq}`}
              className="mt-3 text-xs text-[#C9824A]/80 hover:underline"
            >
              How voice and text are used
            </a>
          </SectionReveal>
        </div>
        <p className="mt-8 text-center text-xs text-white/30">
          Visuals are a preview; production UI may change.
        </p>
      </div>
    </section>
  );
}
```

---

## `src/components/landing/sections/HowItWorksSection.tsx`

```tsx
import { SectionReveal } from "../SectionReveal";
import { SECTION_IDS } from "@/lib/constants";

const steps = [
  {
    n: "01",
    t: "Reflect",
    p: "Capture what happened and how it felt — in a few lines, or with your voice. No performance, no perfect sentences.",
  },
  {
    n: "02",
    t: "Understand",
    p: "The app surfaces themes in your week: what you return to, what you avoid, and how that maps to the virtues you care about.",
  },
  {
    n: "03",
    t: "Grow",
    p: "Use short guidance and small practices to nudge the next day — not a transformation promise, a direction you choose.",
  },
] as const;

export function HowItWorksSection() {
  return (
    <section
      id={SECTION_IDS.how}
      className="scroll-mt-20 border-b border-white/[0.04] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionReveal>
          <h2 className="text-center font-serif text-3xl font-light text-[#f5f2ed] sm:text-4xl">
            How it works
          </h2>
          <p className="mx-auto mt-2 max-w-md text-center text-sm text-white/40">
            Three steps you repeat. Consistency over intensity.
          </p>
        </SectionReveal>
        <ol className="mt-14 grid list-none gap-6 sm:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.t}>
              <SectionReveal delay={i * 0.05}>
                <div className="relative h-full rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6">
                  <span className="font-mono text-xs text-[#C9824A]/80">
                    {s.n}
                  </span>
                  <h3 className="mt-2 font-serif text-xl text-white/90">
                    {s.t}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/45">
                    {s.p}
                  </p>
                </div>
              </SectionReveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
```

---

## `src/components/landing/sections/TrustSection.tsx`

```tsx
import { SectionReveal } from "../SectionReveal";
import {
  SECTION_IDS,
  MAILTO_CONTACT,
  PRIVACY_URL,
  TERMS_URL,
  isExternalUrlReady,
} from "@/lib/constants";

function DocLink() {
  const p = isExternalUrlReady(PRIVACY_URL);
  const t = isExternalUrlReady(TERMS_URL);
  if (p && t) {
    return (
      <p className="text-sm text-white/45">
        Read the{" "}
        <a
          className="text-[#C9824A] underline decoration-[#C9824A]/30 underline-offset-2 hover:decoration-[#C9824A]"
          href={PRIVACY_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          privacy policy
        </a>{" "}
        and{" "}
        <a
          className="text-[#C9824A] underline decoration-[#C9824A]/30 underline-offset-2 hover:decoration-[#C9824A]"
          href={TERMS_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          terms of service
        </a>
        .
      </p>
    );
  }
  if (p || t) {
    return (
      <p className="text-sm text-white/45">
        {p && (
          <a
            className="text-[#C9824A] underline"
            href={PRIVACY_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Privacy policy
          </a>
        )}
        {p && t ? " · " : " "}
        {t && (
          <a
            className="text-[#C9824A] underline"
            href={TERMS_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Terms
          </a>
        )}
      </p>
    );
  }
  return (
    <p className="text-sm text-white/45">
      Add public policy URLs in{" "}
      <code className="rounded bg-white/10 px-1 py-0.5 text-xs">constants.ts</code>{" "}
      when they are live, or contact{" "}
      <a className="text-[#C9824A] underline" href={MAILTO_CONTACT}>
        {MAILTO_CONTACT.replace("mailto:", "")}
      </a>{" "}
      for data questions.
    </p>
  );
}

export function TrustSection() {
  return (
    <section
      id={SECTION_IDS.trust}
      className="scroll-mt-20 border-b border-white/[0.04] bg-[#0c0c10] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
        <SectionReveal>
          <h2 className="font-serif text-3xl font-light text-[#f5f2ed] sm:text-4xl">
            Your inner life, handled with care
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/50">
            Karmic Compass is a tool for <strong className="font-medium text-white/60">emotional self-awareness</strong>{" "}
            and private journaling. It is not a medical, therapeutic, or crisis
            service, and it does not diagnose or treat any condition. If you are
            in immediate danger, contact local emergency services.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-white/45">
            We take privacy seriously: you control your words. Where features use
            cloud or AI, data is processed to deliver the product — not to resell
            your journal. Specific retention and processing details belong in
            your published policy.
          </p>
          <div className="mt-4">
            <DocLink />
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
```

---

## `src/components/landing/sections/PricingSection.tsx`

```tsx
"use client";

import { SectionReveal } from "../SectionReveal";
import { SmartExternalLink } from "../SmartExternalLink";
import {
  SECTION_IDS,
  APP_STORE_URL,
  TESTFLIGHT_URL,
  isExternalUrlReady,
} from "@/lib/constants";
import { motion, useReducedMotion } from "framer-motion";

function scrollToFaq() {
  document
    .getElementById(SECTION_IDS.faq)
    ?.scrollIntoView({ behavior: "smooth" });
}

export function PricingSection() {
  const reduce = useReducedMotion();
  return (
    <section
      id={SECTION_IDS.pricing}
      className="scroll-mt-20 border-b border-white/[0.04] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <SectionReveal>
          <h2 className="text-center font-serif text-3xl font-light text-[#f5f2ed] sm:text-4xl">
            Premium, when you are ready
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-center text-sm text-white/45">
            A free experience lets you explore. Premium deepens the loop:
            longer reports, richer mentor context, and voice when you need it
            more often.
          </p>
        </SectionReveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 8 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4 }}
            whileHover={reduce ? undefined : { y: -2 }}
            className="flex flex-col rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6"
          >
            <p className="text-xs uppercase tracking-[0.16em] text-white/30">
              Trial
            </p>
            <p className="mt-1 font-serif text-3xl text-white/90">Free</p>
            <p className="mt-1 text-sm text-white/40">11 days, full app surface</p>
            <ul className="mt-4 flex-1 space-y-1.5 text-sm text-white/50">
              <li>— Journal and core reflection</li>
              <li>— Mentor in standard mode</li>
              <li>— Karma / dharma overview (illustrative in UI)</li>
            </ul>
            <div className="mt-4 flex flex-col gap-2">
              <SmartExternalLink
                href={APP_STORE_URL}
                className="block w-full rounded-xl border border-white/15 py-2.5 text-center text-sm text-white/70 transition hover:bg-white/5"
                label="Open App Store"
              >
                {isExternalUrlReady(APP_STORE_URL) ? "Open in App Store" : "App Store link (soon)"}
              </SmartExternalLink>
              <button
                type="button"
                className="w-full rounded-xl border border-transparent py-2 text-center text-sm text-white/40 hover:text-white/60"
                onClick={scrollToFaq}
              >
                How billing works
              </button>
            </div>
          </motion.div>
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 8 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            whileHover={reduce ? undefined : { y: -2 }}
            className="flex flex-col rounded-2xl border border-[#C9824A]/30 bg-gradient-to-b from-[#C9824A]/[0.1] to-transparent p-6"
          >
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#E8A97A]">
              Basic · from $11 / mo
            </p>
            <p className="mt-2 font-serif text-2xl text-white/95">Deeper path</p>
            <p className="mt-1 text-sm text-white/50">
              Premium reporting, long-form mentor memory, voice sessions, and
              advanced guidance flows — as shipped in the product.
            </p>
            <ul className="mt-3 flex-1 space-y-1.5 text-sm text-white/55">
              <li>— Longer “period” insight reports</li>
              <li>— Deeper Arya context and conversation history (per app)</li>
              <li>— Full voice &amp; advanced mode where enabled</li>
            </ul>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
              <SmartExternalLink
                href={APP_STORE_URL}
                className="flex-1 min-w-[140px] rounded-xl bg-[#C9824A] py-2.5 text-center text-sm font-medium text-white transition hover:bg-[#E8A97A]"
                label="Download on the App Store"
              >
                App Store
              </SmartExternalLink>
              <SmartExternalLink
                href={TESTFLIGHT_URL}
                className="flex-1 min-w-[140px] rounded-xl border border-white/20 py-2.5 text-center text-sm text-white/75 transition hover:bg-white/5"
                label="Join TestFlight"
              >
                {isExternalUrlReady(TESTFLIGHT_URL)
                  ? "TestFlight"
                  : "TestFlight (soon)"}
              </SmartExternalLink>
              <a
                href={`#${SECTION_IDS.faq}`}
                className="flex-1 min-w-full rounded-xl border border-white/15 py-2.5 text-center text-sm text-white/55 transition hover:bg-white/5 sm:min-w-0"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToFaq();
                }}
              >
                Plan &amp; billing questions
              </a>
            </div>
          </motion.div>
        </div>
        <p className="mt-6 text-center text-xs text-white/30">
          Pricing and entitlements in the app may vary by platform and region.
        </p>
      </div>
    </section>
  );
}
```

---

## `src/components/landing/sections/FAQSection.tsx`

```tsx
"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { SectionReveal } from "../SectionReveal";
import { SECTION_IDS } from "@/lib/constants";

const FAQ_ITEMS = [
  {
    q: "Is this therapy or medical advice?",
    a: "No. Karmic Compass is a self-reflection and journaling product. It does not provide medical, psychological, or crisis care. If you are in danger or in need of professional support, contact qualified providers or emergency services in your area.",
  },
  {
    q: "What does “karma” mean in the app?",
    a: "In the app, it is a structured way to notice patterns in your actions and priorities over time — not a religious verdict. You can see it as feedback on how you are living relative to the virtues you care about, not a score to optimize.",
  },
  {
    q: "How is my journal used?",
    a: "Your entries are part of the product: they power summarisation, themes, and optional AI guidance, according to the permissions you give in the app. Replace this sentence with the exact data practices from your published privacy policy when it is live.",
  },
  {
    q: "What is different in Premium?",
    a: "Premium generally includes deeper period reports, extended mentor context and history (where the app supports it), and expanded voice and guidance modes. Exact entitlements are defined in the app and may change as the product evolves.",
  },
] as const;

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();
  const base = useId();

  return (
    <section
      id={SECTION_IDS.faq}
      className="scroll-mt-20 border-b border-white/[0.04] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <SectionReveal>
          <h2 className="text-center font-serif text-3xl font-light text-[#f5f2ed] sm:text-4xl">
            Questions, answered plainly
          </h2>
        </SectionReveal>
        <ul className="mt-10 space-y-2" role="list">
          {FAQ_ITEMS.map((item, i) => {
            const expanded = open === i;
            const panelId = `${base}-panel-${i}`;
            const btnId = `${base}-btn-${i}`;
            return (
              <li
                key={item.q}
                className="overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.02]"
              >
                <h3>
                  <button
                    type="button"
                    id={btnId}
                    aria-controls={panelId}
                    aria-expanded={expanded}
                    onClick={() => setOpen((v) => (v === i ? null : i))}
                    className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left text-sm font-medium text-white/85 transition hover:bg-white/[0.03] sm:px-5"
                  >
                    {item.q}
                    <span
                      className="shrink-0 text-[#C9824A] transition"
                      aria-hidden
                    >
                      {expanded ? "−" : "+"}
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {expanded && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={btnId}
                      initial={reduce ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={reduce ? undefined : { height: 0, opacity: 0 }}
                      transition={{ duration: reduce ? 0 : 0.3, ease: "easeInOut" }}
                      className="border-t border-white/[0.05] bg-black/10"
                    >
                      <p className="px-4 py-4 text-sm leading-relaxed text-white/50 sm:px-5 sm:py-4">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
```

---

## `src/components/landing/sections/SiteFooter.tsx`

```tsx
import {
  APP_NAME,
  CONTACT_EMAIL,
  MAILTO_CONTACT,
  PRIVACY_URL,
  TERMS_URL,
  X_SOCIAL_URL,
  isExternalUrlReady,
} from "@/lib/constants";
import { SectionReveal } from "../SectionReveal";
import { FooterClientLinks } from "./SiteFooterClient";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#06060a] py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 sm:px-6 sm:flex-row sm:items-end sm:justify-between">
        <SectionReveal>
          <p className="font-serif text-lg text-white/50">
            {APP_NAME.split(" ")[0]}{" "}
            <span className="text-[#C9824A]">{APP_NAME.split(" ")[1]}</span>
          </p>
          <p className="mt-1 max-w-sm text-sm text-white/30">
            Built for people who want fewer tabs and more room to think.
          </p>
        </SectionReveal>
        <FooterClientLinks
          hasPrivacy={isExternalUrlReady(PRIVACY_URL)}
          hasTerms={isExternalUrlReady(TERMS_URL)}
          privacyHref={PRIVACY_URL}
          termsHref={TERMS_URL}
          xHref={X_SOCIAL_URL}
        />
        <div className="text-right text-xs text-white/20">
          <a className="hover:text-white/35" href={MAILTO_CONTACT}>
            {CONTACT_EMAIL}
          </a>
        </div>
      </div>
    </footer>
  );
}
```

---

## `src/components/landing/sections/SiteFooterClient.tsx`

```tsx
"use client";

import { SmartExternalLink } from "../SmartExternalLink";

type Props = {
  hasPrivacy: boolean;
  hasTerms: boolean;
  privacyHref: string;
  termsHref: string;
  xHref: string;
};

export function FooterClientLinks({
  hasPrivacy,
  hasTerms,
  privacyHref,
  termsHref,
  xHref,
}: Props) {
  return (
    <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Footer">
      {hasPrivacy ? (
        <a
          className="text-xs uppercase tracking-[0.14em] text-white/35 transition hover:text-white/55"
          href={privacyHref}
          target="_blank"
          rel="noopener noreferrer"
        >
          Privacy
        </a>
      ) : (
        <SmartExternalLink
          href=""
          className="text-xs uppercase tracking-[0.14em] text-white/35 transition hover:text-white/55"
          label="Privacy policy coming soon"
        >
          Privacy
        </SmartExternalLink>
      )}
      {hasTerms ? (
        <a
          className="text-xs uppercase tracking-[0.14em] text-white/35 transition hover:text-white/55"
          href={termsHref}
          target="_blank"
          rel="noopener noreferrer"
        >
          Terms
        </a>
      ) : (
        <SmartExternalLink
          href=""
          className="text-xs uppercase tracking-[0.14em] text-white/35 transition hover:text-white/55"
          label="Terms of service coming soon"
        >
          Terms
        </SmartExternalLink>
      )}
      <a
        className="text-xs uppercase tracking-[0.14em] text-white/35 transition hover:text-white/55"
        href={xHref}
        target="_blank"
        rel="noopener noreferrer"
      >
        Updates
      </a>
    </nav>
  );
}
```

---

## File list (landing-related)

| Path |
|------|
| `src/app/globals.css` |
| `src/app/layout.tsx` |
| `src/app/page.tsx` |
| `src/lib/constants.ts` |
| `src/components/landing/LandingPage.tsx` |
| `src/components/landing/ComingSoonContext.tsx` |
| `src/components/landing/ComingSoonModal.tsx` |
| `src/components/landing/SmartExternalLink.tsx` |
| `src/components/landing/SectionReveal.tsx` |
| `src/components/landing/ScrollProgress.tsx` |
| `src/components/landing/PhoneFrame.tsx` |
| `src/components/landing/Header.tsx` |
| `src/components/landing/sections/HeroSection.tsx` |
| `src/components/landing/sections/FeatureShowcase.tsx` |
| `src/components/landing/sections/AppPreviewSection.tsx` |
| `src/components/landing/sections/HowItWorksSection.tsx` |
| `src/components/landing/sections/TrustSection.tsx` |
| `src/components/landing/sections/PricingSection.tsx` |
| `src/components/landing/sections/FAQSection.tsx` |
| `src/components/landing/sections/SiteFooter.tsx` |
| `src/components/landing/sections/SiteFooterClient.tsx` |

Also: `next-env.d.ts` (Next-generated types), ESLint config if present in repo root.

---

*Generated from repo `kc-landing`. Copy this file path: `kc-landing/LANDING_CODE_REVIEW.md`.*
