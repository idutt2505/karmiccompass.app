"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SectionReveal } from "../SectionReveal";
import { SECTION_IDS } from "@/lib/constants";
import type { ReactNode } from "react";

/* ── Icons ─────────────────────────────────────────────────── */

function KarmaIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden>
      <circle cx="12" cy="12" r="9"/>
      <path d="M12 3c0 4.97-4.03 9-9 9"/>
      <path d="M12 21c0-4.97 4.03-9 9-9"/>
      <circle cx="7.5" cy="12" r="1.8" fill="currentColor" stroke="none"/>
      <circle cx="16.5" cy="12" r="1.8" fill="currentColor" stroke="none"/>
    </svg>
  );
}

function MentorIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden>
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
      <path d="M8 10h.01M12 10h.01M16 10h.01" strokeWidth="2.2" strokeLinecap="round"/>
    </svg>
  );
}

function JournalIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden>
      <rect x="4" y="2" width="16" height="20" rx="2"/>
      <path d="M8 7h8M8 11h8M8 15h5"/>
    </svg>
  );
}

function ReportsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden>
      <path d="M3 20h18M3 20V8l6-4 6 4 6-4v12"/>
      <path d="M9 20v-5h6v5"/>
    </svg>
  );
}

function VoiceIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden>
      <rect x="9" y="2" width="6" height="11" rx="3"/>
      <path d="M5 10a7 7 0 0014 0M12 19v3M9 22h6"/>
    </svg>
  );
}

function MindfulnessIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden>
      <path d="M12 2C9 6 4 8 4 13a8 8 0 0016 0c0-5-5-7-8-11z"/>
      <path d="M12 2c0 0 0 8 0 11"/>
      <path d="M8 15c1-1 2.5-1.5 4-1.5s3 .5 4 1.5"/>
    </svg>
  );
}

/* ── Data ───────────────────────────────────────────────────── */

const features: {
  icon: ReactNode;
  t: string;
  d: string;
  featured?: boolean;
}[] = [
  {
    icon: <KarmaIcon />,
    t: "Karma & Dharma",
    d: "A living score that reflects the intentions behind your days — not judgment, but perspective. Paired with a weekly dharma focus to keep you grounded.",
    featured: true,
  },
  {
    icon: <MentorIcon />,
    t: "Arya, your AI mentor",
    d: "Ask what's on your mind. Arya helps you reframe situations, plan small steps, and hold the thread across every session — without performative chat.",
  },
  {
    icon: <JournalIcon />,
    t: "Daily journal",
    d: "Short entries, consistent rhythm. The app surfaces patterns in your writing you'd never spot alone.",
  },
  {
    icon: <ReportsIcon />,
    t: "Insight reports",
    d: "Weekly summaries of mood, effort, and the virtues you keep returning to — as understanding, not grades.",
  },
  {
    icon: <VoiceIcon />,
    t: "Voice reflection",
    d: "Speak when typing feels wrong. Your voice is transcribed, ready to keep or refine.",
  },
  {
    icon: <MindfulnessIcon />,
    t: "Mindfulness tools",
    d: "Breath prompts and check-ins you can do between meetings — in the same app as your journal.",
  },
];

/* ── Component ──────────────────────────────────────────────── */

export function FeatureShowcase() {
  const reduce = useReducedMotion();

  return (
    <section
      id={SECTION_IDS.features}
      className="scroll-mt-20 border-b border-white/[0.04] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Header */}
        <SectionReveal className="max-w-2xl mx-auto text-center">
          <p className="text-[0.65rem] uppercase tracking-[0.28em] text-[#C9824A]">
            Inside the app
          </p>
          <h2 className="mt-3 font-serif text-[2.25rem] font-light leading-[1.1] tracking-[-0.02em] text-[#f5f2ed] sm:text-[2.8rem]">
            Everything you need to<br />
            <span className="italic text-[#C9824A]">know yourself better.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-white/42">
            Familiar ideas — journaling and growth — with structure that helps you return to yourself, not a feed.
          </p>
        </SectionReveal>

        {/* Cards grid */}
        <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.article
              key={f.t}
              initial={reduce ? false : { opacity: 0, y: 14 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: i * 0.055, ease: [0.22, 1, 0.36, 1] }}
              whileHover={reduce ? undefined : { y: -4, transition: { duration: 0.22 } }}
              className={`group relative flex flex-col overflow-hidden rounded-2xl border p-6 transition-shadow duration-300 hover:shadow-[0_20px_60px_-20px_rgba(201,130,74,0.14)] ${
                f.featured
                  ? "border-[#C9824A]/22 bg-gradient-to-br from-[#C9824A]/[0.07] to-transparent"
                  : "border-white/[0.06] bg-gradient-to-b from-white/[0.03] to-transparent"
              }`}
            >
              {f.featured && (
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(201,130,74,0.08),transparent_60%)]" aria-hidden />
              )}

              {/* Icon */}
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-colors duration-200 ${
                f.featured
                  ? "border-[#C9824A]/30 bg-[#C9824A]/12 text-[#C9824A] group-hover:border-[#C9824A]/45 group-hover:bg-[#C9824A]/18"
                  : "border-white/[0.08] bg-white/[0.04] text-white/40 group-hover:border-[#C9824A]/25 group-hover:text-[#C9824A]/80"
              }`}>
                <div className="h-5 w-5">{f.icon}</div>
              </div>

              {/* Text */}
              <h3 className={`mt-4 font-serif text-lg font-light transition-colors duration-200 ${
                f.featured
                  ? "text-[#f0ebe4] group-hover:text-white"
                  : "text-white/75 group-hover:text-white/95"
              }`}>
                {f.t}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-white/38 group-hover:text-white/48 transition-colors duration-200">
                {f.d}
              </p>

              {/* Hover line */}
              <div className={`mt-4 h-px transition-all duration-300 ${
                f.featured
                  ? "bg-gradient-to-r from-[#C9824A]/40 to-transparent group-hover:from-[#C9824A]/65"
                  : "bg-gradient-to-r from-white/8 to-transparent group-hover:from-[#C9824A]/30"
              }`} />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
