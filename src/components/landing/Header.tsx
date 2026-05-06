"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { APP_NAME, SECTION_IDS } from "@/lib/constants";

const nav: { label: string; id: string }[] = [];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const reduce = useReducedMotion();

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
          className="group flex items-center gap-2.5"
          onClick={(e) => { e.preventDefault(); scrollToId(SECTION_IDS.hero); }}
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#C9824A]/15 border border-[#C9824A]/25 transition group-hover:bg-[#C9824A]/25">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
              <circle cx="12" cy="12" r="9" stroke="#C9824A" strokeWidth="1.5"/>
              <path d="M12 3c0 4.97-4.03 9-9 9" stroke="#C9824A" strokeWidth="1.5"/>
              <path d="M12 21c0-4.97 4.03-9 9-9" stroke="#C9824A" strokeWidth="1.5"/>
              <circle cx="7.5" cy="12" r="1.5" fill="#C9824A"/>
              <circle cx="16.5" cy="12" r="1.5" fill="#C9824A"/>
            </svg>
          </span>
          <span className="font-serif text-[1.05rem] tracking-tight text-[#f5f2ed]">
            {APP_NAME.split(" ")[0]}{" "}
            <span className="text-[#C9824A]">{APP_NAME.split(" ")[1]}</span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {nav.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="relative text-[0.7rem] uppercase tracking-[0.18em] text-white/40 transition-colors duration-200 hover:text-white/75 after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-[#C9824A]/50 after:transition-all after:duration-300 hover:after:w-full"
              onClick={(e) => { e.preventDefault(); scrollToId(item.id); }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA + mobile toggle */}
        <div className="flex items-center gap-3">
          <a
            href={`#${SECTION_IDS.pricing}`}
            className="inline-flex items-center gap-1.5 rounded-full border border-[#C9824A]/35 bg-[#C9824A]/8 px-4 py-1.5 text-[0.72rem] font-medium tracking-wide text-[#E8A97A] transition hover:border-[#C9824A]/60 hover:bg-[#C9824A]/18"
            onClick={(e) => { e.preventDefault(); scrollToId(SECTION_IDS.pricing); }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#C9824A] animate-pulse" />
            Get access
          </a>
        </div>
      </div>

    </header>
  );
}
