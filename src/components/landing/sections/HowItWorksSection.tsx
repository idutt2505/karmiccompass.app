"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SectionReveal } from "../SectionReveal";
import { SECTION_IDS } from "@/lib/constants";

const steps = [
  {
    n: "01",
    t: "Journal daily — by voice or text",
    p: "Write or speak your reflection. The Karma Engine scores every entry across karma, dharma, emotion, and multiple life dimensions. Your streak builds momentum.",
    sub: "Journal tab · voice input · Karma Engine",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden>
        <rect x="4" y="2" width="16" height="20" rx="2"/>
        <path d="M8 7h8M8 11h8M8 15h5"/>
      </svg>
    ),
  },
  {
    n: "02",
    t: "Train with Arya & Align practices",
    p: "Talk to Arya, who cross-references your journal and holds your commitments. Complete the daily Karma Quiz, breathing exercises, memory games, yoga, or mindful audio — each earns Karma XP.",
    sub: "Mentor tab · Align tab · 5 practices",
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
    n: "03",
    t: "Rise through the Realm",
    p: "Your Karma XP accumulates across every practice. Watch your virtue level climb — from Seeker through to Karma Architect — as your Home dashboard reflects the arc of your inner life.",
    sub: "Home dashboard · Realm tab · 7 virtue levels",
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
      className="scroll-mt-20 border-b border-white/[0.04] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionReveal className="text-center">
          <h2 className="font-serif text-[2.1rem] font-light leading-[1.1] tracking-[-0.02em] text-[#f5f2ed] sm:text-[2.6rem]">
            A daily loop that compounds.
            <br />
            <span className="italic text-[#C9824A]">Consistency over intensity.</span>
          </h2>
        </SectionReveal>

        {/* Steps */}
        <div className="relative mt-16">
          {/* Connecting line (desktop) */}
          <div className="pointer-events-none absolute top-[3.25rem] left-0 right-0 hidden lg:block" aria-hidden>
            <div className="mx-auto flex max-w-4xl items-center px-5">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>
          </div>

          <ol className="grid list-none gap-6 lg:grid-cols-3">
            {steps.map((s, i) => (
              <li key={s.t}>
                <motion.div
                  initial={reduce ? false : { opacity: 0, y: 18 }}
                  whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative flex h-full flex-col rounded-2xl border border-white/[0.06] bg-gradient-to-b from-white/[0.035] to-transparent p-7 transition-shadow duration-300 hover:border-white/[0.1] hover:shadow-[0_20px_60px_-20px_rgba(201,130,74,0.1)]"
                >
                  {/* Step number (large bg) */}
                  <div
                    className="pointer-events-none absolute right-5 top-4 font-serif text-[5rem] font-light leading-none text-white/[0.025] select-none transition-colors duration-300 group-hover:text-[#C9824A]/[0.05]"
                    aria-hidden
                  >
                    {s.n}
                  </div>

                  {/* Icon + step badge */}
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] text-white/45 transition-colors duration-200 group-hover:border-[#C9824A]/25 group-hover:text-[#C9824A]/80">
                      <div className="h-5 w-5">{s.icon}</div>
                    </div>
                    <span className="font-mono text-[0.62rem] tracking-[0.22em] text-[#C9824A]/60">
                      {s.n}
                    </span>
                  </div>

                  <h3 className="mt-5 font-serif text-[1.2rem] font-light leading-snug text-white/88 transition-colors group-hover:text-white">
                    {s.t}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-white/38">
                    {s.p}
                  </p>
                  {/* Bottom accent line */}
                  <div className="mt-6 h-px w-full rounded-full bg-gradient-to-r from-[#C9824A]/0 via-[#C9824A]/0 to-transparent transition-all duration-500 group-hover:from-[#C9824A]/25 group-hover:via-[#C9824A]/15" />
                </motion.div>
              </li>
            ))}
          </ol>
        </div>

        {/* Bottom quote */}
        <SectionReveal delay={0.2} className="mt-14 text-center">
          <blockquote className="mx-auto max-w-lg">
            <p className="font-serif text-xl font-light italic leading-relaxed text-white/35 sm:text-2xl">
              &ldquo;Small consistent steps compound into genuine change.&rdquo;
            </p>
          </blockquote>
        </SectionReveal>
      </div>
    </section>
  );
}
