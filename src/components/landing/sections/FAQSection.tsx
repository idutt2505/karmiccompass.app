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
