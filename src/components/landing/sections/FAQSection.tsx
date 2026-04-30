"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { SectionReveal } from "../SectionReveal";
import { SECTION_IDS } from "@/lib/constants";

const FAQ_ITEMS = [
  {
    q: "Is this therapy or medical advice?",
    a: "No. Karmic Compass is a self-reflection and journaling product. It does not provide medical, psychological, or crisis care. If you are in danger or need professional support, please contact qualified providers or emergency services in your area.",
  },
  {
    q: "What does \u201ckarma\u201d mean in the app?",
    a: "In the app, karma is a structured way to notice patterns in your actions and priorities over time — not a religious verdict. Think of it as feedback on how you are living relative to the virtues you care about, not a score to optimize.",
  },
  {
    q: "How is my journal used?",
    a: "Journal entries are used to provide app features such as summaries, insights, and optional AI guidance. Full processing and retention details will be available in the published Privacy Policy.",
  },
  {
    q: "What does the Basic subscription include?",
    a: "After your free trial, the paid tier is Basic — $11/month (pricing may vary by platform and region). It includes longer insight reports, deeper Arya context and conversation history, voice reflection, and expanded guidance modes. Exact entitlements are shown in the app and may evolve with updates.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. Subscriptions are managed through your platform's native store (App Store on iOS, Google Play on Android) and can be cancelled at any time from your device's subscription settings. No hidden steps, no emails required.",
  },
  {
    q: "Who is Arya?",
    a: "Arya is the AI mentor built into Karmic Compass. She draws from your journal entries and session history to ask useful questions and offer perspective — she doesn't give advice she isn't grounded in. Arya is not a replacement for human connection or professional care.",
  },
] as const;

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();
  const base = useId();

  return (
    <section
      id={SECTION_IDS.faq}
      className="scroll-mt-20 border-b border-white/[0.04] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <SectionReveal className="text-center">
          <p className="text-[0.65rem] uppercase tracking-[0.28em] text-[#C9824A]">FAQ</p>
          <h2 className="mt-3 font-serif text-[2.1rem] font-light leading-[1.1] tracking-[-0.02em] text-[#f5f2ed] sm:text-[2.6rem]">
            Questions,{" "}
            <span className="italic text-[#C9824A]">answered plainly.</span>
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
                className={`overflow-hidden rounded-2xl border transition-colors duration-200 ${
                  expanded
                    ? "border-[#C9824A]/20 bg-gradient-to-b from-[#C9824A]/[0.05] to-transparent"
                    : "border-white/[0.06] bg-white/[0.02]"
                }`}
              >
                <h3>
                  <button
                    type="button"
                    id={btnId}
                    aria-controls={panelId}
                    aria-expanded={expanded}
                    onClick={() => setOpen((v) => (v === i ? null : i))}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-medium text-white/80 transition hover:text-white/95 sm:px-6"
                  >
                    <span>{item.q}</span>
                    <span
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                        expanded
                          ? "border-[#C9824A]/40 bg-[#C9824A]/15 text-[#C9824A]"
                          : "border-white/[0.1] bg-white/[0.04] text-white/40"
                      }`}
                      aria-hidden
                    >
                      <svg
                        width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                        className={`transition-transform duration-300 ${expanded ? "rotate-180" : "rotate-0"}`}
                      >
                        <path d="M6 9l6 6 6-6"/>
                      </svg>
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
                      transition={{ duration: reduce ? 0 : 0.28, ease: "easeInOut" }}
                      className="border-t border-white/[0.05]"
                    >
                      <p className="px-5 py-4 text-sm leading-relaxed text-white/48 sm:px-6">
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
