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
