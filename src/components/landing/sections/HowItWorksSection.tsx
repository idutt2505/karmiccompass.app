"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SectionReveal } from "../SectionReveal";
import { SECTION_IDS } from "@/lib/constants";

const steps = [
  {
    n: "Journal",
    p: "Speak or type what happened. The Karma Engine scores every entry across karma, dharma, intent, emotion, and virtue — turning your words into honest self-reflection.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden>
        <rect x="4" y="2" width="16" height="20" rx="2"/>
        <path d="M8 7h8M8 11h8M8 15h5"/>
      </svg>
    ),
  },
  {
    n: "Mentor",
    p: "Arya reads your journal, remembers your commitments, and responds to your moment. Share a photo, request a weekly letter, or just talk. Wisdom without judgment.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden>
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
        <circle cx="8.5" cy="10" r="1" fill="currentColor" stroke="none"/>
        <circle cx="12" cy="10" r="1" fill="currentColor" stroke="none"/>
        <circle cx="15.5" cy="10" r="1" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    n: "Align",
    p: "Face moral dilemmas, breathe, move through yoga, train your memory, or settle into mindful audio. Earn Karma XP and sharpen your score.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden>
        <circle cx="12" cy="12" r="9"/>
        <circle cx="12" cy="12" r="3"/>
        <path d="M12 3v3M12 18v3M3 12h3M18 12h3"/>
      </svg>
    ),
  },
  {
    n: "Realm",
    p: "Every reflection moves you forward. Rise from Seeker to Karma Architect as your Home dashboard turns your inner growth into a clear, visible journey.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden>
        <path d="M12 2L2 7l10 5 10-5-10-5z"/>
        <path d="M2 17l10 5 10-5"/>
        <path d="M2 12l10 5 10-5"/>
      </svg>
    ),
  },
] as const;

export function HowItWorksSection() {
  const reduce = useReducedMotion();

  return (
    <section
      id={SECTION_IDS.how}
      className="section-y scroll-mt-20"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionReveal className="text-center">
          <h2 className="font-serif text-[2.1rem] font-light leading-[1.1] tracking-[-0.02em] text-ink sm:text-[2.6rem]">
            A daily loop that compounds.
            <br />
            <span className="italic text-accent">Reflect. Realign. Return.</span>
          </h2>
        </SectionReveal>

        {/* Steps */}
        <div className="relative mt-16">
          <ol className="grid list-none gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <li key={s.n}>
                <motion.div
                  initial={reduce ? false : { opacity: 0, y: 18 }}
                  whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative flex h-full flex-col rounded-2xl border border-white/[0.06] bg-gradient-to-b from-white/[0.035] to-transparent p-7 transition-shadow duration-300 hover:border-white/[0.1] hover:shadow-[0_20px_60px_-20px_rgba(201,130,74,0.1)]"
                >
                  {/* Icon left, step name right — the name fills the space beside
                      the icon instead of leaving the top band empty.

                      This was originally a 2.2rem watermark at accent/18: 1.28:1
                      against the card, and aria-hidden, so it read as texture
                      rather than a label and the card had no heading at all. Same
                      placement, but it is now a real <h3> at a contrast that can
                      actually be read (4.0:1 — large-text AA is 3:1). */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-accent/20 bg-accent/[0.07] text-accent/60 transition-colors duration-200 group-hover:border-accent/40 group-hover:text-accent">
                      <div className="h-5 w-5">{s.icon}</div>
                    </div>

                    <h3 className="min-w-0 truncate font-serif text-[1.6rem] font-light leading-tight tracking-tight text-accent-light/60 transition-colors duration-300 group-hover:text-accent-light/90 sm:text-[1.9rem]">
                      {s.n}
                    </h3>
                  </div>

                  <p className="mt-6 flex-1 text-sm leading-relaxed text-muted">
                    {s.p}
                  </p>
                </motion.div>
              </li>
            ))}
          </ol>
        </div>

        {/* Bottom quote */}
        <SectionReveal delay={0.2} className="mt-14 text-center">
          <blockquote className="mx-auto max-w-lg">
            <p className="font-serif text-xl font-light italic leading-relaxed text-muted sm:text-2xl">
              &ldquo;Small steps. Lasting change.&rdquo;
            </p>
          </blockquote>
        </SectionReveal>
      </div>
    </section>
  );
}
