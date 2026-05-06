"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SectionReveal } from "../SectionReveal";
import { SECTION_IDS } from "@/lib/constants";

const steps = [
  {
    n: "Journal",
    p: "Speak or type what happened. The Karma Engine scores every entry across karma, dharma, intent, emotion, and virtue — turning your words into honest self-data.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden>
        <rect x="4" y="2" width="16" height="20" rx="2"/>
        <path d="M8 7h8M8 11h8M8 15h5"/>
      </svg>
    ),
  },
  {
    n: "Mentor",
    p: "Arya reads your journal, remembers your commitments, and meets you where you are. Share a photo, request a weekly letter, or just talk. Not a chatbot — a presence.",
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
    p: "Face moral dilemmas, breathe, move through yoga, train your memory, or settle into mindful audio. Every practice earns Karma XP and sharpens your score.",
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
    p: "Karma XP accumulates across every entry and practice. Your virtue level rises — from Seeker to Karma Architect — as your Home dashboard charts the arc of your inner life.",
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
            <span className="italic text-[#C9824A]">Reflect. Realign. Return.</span>
          </h2>
        </SectionReveal>

        {/* Steps */}
        <div className="relative mt-16">
          <ol className="grid list-none gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <li key={s.t}>
                <motion.div
                  initial={reduce ? false : { opacity: 0, y: 18 }}
                  whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative flex h-full flex-col rounded-2xl border border-white/[0.06] bg-gradient-to-b from-white/[0.035] to-transparent p-7 transition-shadow duration-300 hover:border-white/[0.1] hover:shadow-[0_20px_60px_-20px_rgba(201,130,74,0.1)]"
                >
                  {/* Background tab name */}
                  <div
                    className="pointer-events-none absolute right-4 top-3 font-serif text-[2.2rem] font-light leading-none text-[#C9824A]/[0.18] select-none transition-colors duration-300 group-hover:text-[#C9824A]/[0.32]"
                    aria-hidden
                  >
                    {s.n}
                  </div>

                  {/* Icon */}
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#C9824A]/20 bg-[#C9824A]/[0.07] text-[#C9824A]/60 transition-colors duration-200 group-hover:border-[#C9824A]/40 group-hover:text-[#C9824A]">
                    <div className="h-5 w-5">{s.icon}</div>
                  </div>

                  <p className="mt-5 flex-1 text-sm leading-relaxed text-white/38">
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
            <p className="font-serif text-xl font-light italic leading-relaxed text-white/35 sm:text-2xl">
              &ldquo;Small steps. Lasting change.&rdquo;
            </p>
          </blockquote>
        </SectionReveal>
      </div>
    </section>
  );
}
