"use client";

import { useEffect, useState } from "react";
import { APP_NAME, SECTION_IDS } from "@/lib/constants";

/**
 * The logo is two-tone: the first word in ink, the second in accent. APP_NAME
 * is a single camel-case word ("KarmicCompass"), so this splits at the internal
 * capital. It previously used `APP_NAME.split(" ")[1]`, which is `undefined`
 * for a one-word name — the accent half rendered as an empty <span> and the
 * logo lost its two-tone treatment without anything appearing broken.
 */
const brandMatch = APP_NAME.match(/^(.*?)([A-Z][a-z]+)$/);
const BRAND_HEAD = brandMatch ? brandMatch[1] : APP_NAME;
const BRAND_TAIL = brandMatch ? brandMatch[2] : "";

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-white/[0.07] bg-[#0a0a0f]/92 shadow-[0_4px_32px_-8px_rgba(0,0,0,0.6)] backdrop-blur-2xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-5 sm:h-16 sm:px-8">
        {/* Logo */}
        <a
          href={`#${SECTION_IDS.hero}`}
          className="group flex items-center gap-2.5 py-2"
          onClick={(e) => { e.preventDefault(); scrollToId(SECTION_IDS.hero); }}
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent/15 border border-accent/25 transition group-hover:bg-accent/25">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
              <circle cx="12" cy="12" r="9" stroke="#C9824A" strokeWidth="1.5"/>
              <path d="M12 3c0 4.97-4.03 9-9 9" stroke="#C9824A" strokeWidth="1.5"/>
              <path d="M12 21c0-4.97 4.03-9 9-9" stroke="#C9824A" strokeWidth="1.5"/>
              <circle cx="7.5" cy="12" r="1.5" fill="#C9824A"/>
              <circle cx="16.5" cy="12" r="1.5" fill="#C9824A"/>
            </svg>
          </span>
          <span className="font-serif text-[1.05rem] tracking-tight text-ink">
            {BRAND_HEAD}
            <span className="text-accent">{BRAND_TAIL}</span>
          </span>
        </a>

        {/* CTA */}
        <a
          href={`#${SECTION_IDS.pricing}`}
          className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-accent/35 bg-accent/8 px-5 text-[0.72rem] font-medium tracking-wide text-accent-light transition hover:border-accent/60 hover:bg-accent/18"
          onClick={(e) => { e.preventDefault(); scrollToId(SECTION_IDS.pricing); }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent motion-safe:animate-pulse" />
          Get access
        </a>
      </div>
    </header>
  );
}
