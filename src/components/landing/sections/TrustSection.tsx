"use client";

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
      <p className="text-sm text-white/38">
        Read the{" "}
        <a className="text-[#C9824A] underline decoration-[#C9824A]/30 underline-offset-2 hover:decoration-[#C9824A]" href={PRIVACY_URL} target="_blank" rel="noopener noreferrer">Privacy Policy</a>
        {" "}and{" "}
        <a className="text-[#C9824A] underline decoration-[#C9824A]/30 underline-offset-2 hover:decoration-[#C9824A]" href={TERMS_URL} target="_blank" rel="noopener noreferrer">Terms of Service</a>.
      </p>
    );
  }
  return (
    <p className="text-sm text-white/38">
      Privacy Policy and Terms will be available before public launch. For data questions,{" "}
      <a className="text-[#C9824A] underline decoration-[#C9824A]/30 underline-offset-2 hover:decoration-[#C9824A]" href={MAILTO_CONTACT}>
        contact us
      </a>.
    </p>
  );
}

const pillars = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden>
        <rect x="3" y="11" width="18" height="11" rx="2"/>
        <path d="M7 11V7a5 5 0 0110 0v4"/>
      </svg>
    ),
    t: "Your words stay yours",
    d: "Your journal is not a product. Data is processed to deliver the app's features — never resold, never used to train models outside the product.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden>
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z"/>
      </svg>
    ),
    t: "Honest, not therapeutic",
    d: "KarmicCompass is a journaling and self-reflection tool. It is not a substitute for medical, psychological, or crisis care. If you need professional support, please reach out to a qualified provider.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden>
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
    t: "AI that knows its limits",
    d: "Arya surfaces questions and perspective — she doesn't claim to know the answer. The wisdom is yours. Arya just helps you hear it.",
  },
] as const;

export function TrustSection() {
  return (
    <section
      id={SECTION_IDS.trust}
      className="scroll-mt-20 border-b border-white/[0.04] bg-gradient-to-b from-[#0c0c12] to-[#0a0a0f] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionReveal className="text-center">
          <p className="text-[0.65rem] uppercase tracking-[0.28em] text-[#C9824A]">
            Built with care
          </p>
          <h2 className="mt-3 font-serif text-[2.1rem] font-light leading-[1.1] tracking-[-0.02em] text-[#f5f2ed] sm:text-[2.6rem]">
            Your inner life,<br />
            <span className="italic text-[#C9824A]">handled with integrity.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-white/40">
            We believe deep self-reflection deserves a trustworthy home.
          </p>
        </SectionReveal>

        {/* Three pillars */}
        <div className="mt-14 grid gap-4 sm:grid-cols-3">
          {pillars.map((p, i) => (
            <SectionReveal key={p.t} delay={i * 0.07}>
              <div className="group flex h-full flex-col rounded-2xl border border-white/[0.06] bg-gradient-to-b from-white/[0.03] to-transparent p-6 transition-shadow duration-300 hover:border-white/[0.1] hover:shadow-[0_20px_60px_-20px_rgba(201,130,74,0.09)]">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] text-white/40 transition-colors duration-200 group-hover:border-[#C9824A]/22 group-hover:text-[#C9824A]/70">
                  <div className="h-5 w-5">{p.icon}</div>
                </div>
                <h3 className="mt-4 font-serif text-lg font-light text-white/80 transition-colors group-hover:text-white/95">
                  {p.t}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-white/38">
                  {p.d}
                </p>
              </div>
            </SectionReveal>
          ))}
        </div>

        {/* Legal footnote */}
        <SectionReveal delay={0.15} className="mt-10 rounded-2xl border border-white/[0.05] bg-white/[0.015] px-6 py-5">
          <DocLink />
        </SectionReveal>
      </div>
    </section>
  );
}
