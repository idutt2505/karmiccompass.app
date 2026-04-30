"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { APP_NAME, SECTION_IDS } from "@/lib/constants";

const nav = [
  { label: "Features", id: SECTION_IDS.features },
  { label: "How it works", id: SECTION_IDS.how },
  { label: "Trust", id: SECTION_IDS.trust },
  { label: "Pricing", id: SECTION_IDS.pricing },
  { label: "FAQ", id: SECTION_IDS.faq },
] as const;

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || open
          ? "border-b border-white/[0.07] bg-[#0a0a0f]/92 shadow-[0_4px_32px_-8px_rgba(0,0,0,0.6)] backdrop-blur-2xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-5 sm:h-16 sm:px-8">
        {/* Logo */}
        <a
          href={`#${SECTION_IDS.hero}`}
          className="group flex items-center gap-2.5"
          onClick={(e) => { e.preventDefault(); scrollToId(SECTION_IDS.hero); setOpen(false); }}
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
            className="hidden rounded-full border border-[#C9824A]/35 bg-[#C9824A]/8 px-4 py-1.5 text-[0.72rem] font-medium tracking-wide text-[#E8A97A] transition hover:border-[#C9824A]/60 hover:bg-[#C9824A]/18 sm:inline-flex items-center gap-1.5"
            onClick={(e) => { e.preventDefault(); scrollToId(SECTION_IDS.pricing); }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#C9824A] animate-pulse" />
            Get access
          </a>
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-white/60 transition hover:border-white/20 hover:text-white/80 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
              <motion.path
                animate={open ? { d: "M6 6l12 12" } : { d: "M4 6h16" }}
                stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"
                transition={{ duration: reduce ? 0 : 0.2 }}
              />
              <motion.path
                animate={open ? { opacity: 0 } : { opacity: 1, d: "M4 12h16" }}
                d="M4 12h16"
                stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"
                transition={{ duration: reduce ? 0 : 0.15 }}
              />
              <motion.path
                animate={open ? { d: "M18 6L6 18" } : { d: "M4 18h10" }}
                stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"
                transition={{ duration: reduce ? 0 : 0.2 }}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={reduce ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="border-t border-white/[0.06] bg-[#0a0a0f] px-5 pb-5 pt-3 lg:hidden"
          >
            <ul className="flex flex-col gap-0.5">
              {nav.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="block rounded-xl px-3 py-3 text-sm text-white/65 transition hover:bg-white/[0.04] hover:text-white/85"
                    onClick={(e) => { e.preventDefault(); scrollToId(item.id); setOpen(false); }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li className="mt-2">
                <a
                  href={`#${SECTION_IDS.pricing}`}
                  className="block rounded-xl bg-[#C9824A]/12 border border-[#C9824A]/25 py-3 text-center text-sm font-medium text-[#E8A97A] transition hover:bg-[#C9824A]/20"
                  onClick={(e) => { e.preventDefault(); scrollToId(SECTION_IDS.pricing); setOpen(false); }}
                >
                  Get access
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
