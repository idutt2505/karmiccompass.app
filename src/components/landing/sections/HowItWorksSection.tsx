"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SectionReveal } from "../SectionReveal";
import { SECTION_IDS } from "@/lib/constants";

const steps = [
  {
    n: "01",
    t: "Write freely",
    p: "Capture what happened and how it felt — in a few lines or with your voice. No performance, no perfect sentences. Just you.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden>
        <path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/>
      </svg>
    ),
  },
  {
    n: "02",
    t: "See patterns",
    p: "The app surfaces what you keep returning to, what you avoid, and how your actions map to the virtues you care about.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden>
        <circle cx="12" cy="12" r="9"/>
        <path d="M8.5 14.5s1.5-2 3.5-2 3.5 2 3.5 2M9 9h.01M15 9h.01"/>
      </svg>
    ),
  },
  {
    n: "03",
    t: "Grow, one day at a time",
    p: "Arya gives you a small, concrete practice — not a transformation promise, just a direction you choose to move in.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden>
        <path d="M12 2C9 6 4 8 4 13a8 8 0 0016 0c0-5-5-7-8-11z"/>
        <path d="M12 13c0 2.21-1.79 4-4 4"/>
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
          <p className="text-[0.65rem] uppercase tracking-[0.28em] text-[#C9824A]">
            The loop
          </p>
          <h2 className="mt-3 font-serif text-[2.1rem] font-light leading-[1.1] tracking-[-0.02em] text-[#f5f2ed] sm:text-[2.6rem]">
            Three steps you repeat.
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
