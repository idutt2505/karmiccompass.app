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
