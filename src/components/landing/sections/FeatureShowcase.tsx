"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SectionReveal } from "../SectionReveal";
import { SECTION_IDS } from "@/lib/constants";
import type { ReactNode } from "react";

/* ── Icons ─────────────────────────────────────────────────── */

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden>
      <path d="M3 12L12 3l9 9"/>
      <path d="M5 10v9a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1v-9"/>
    </svg>
  );
}

function JournalIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden>
      <rect x="4" y="2" width="16" height="20" rx="2"/>
      <path d="M8 7h8M8 11h8M8 15h5"/>
      <circle cx="19" cy="19" r="4" fill="none"/>
      <path d="M17.5 19h3M19 17.5v3" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function MentorIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden>
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
      <circle cx="8.5" cy="10" r="1" fill="currentColor" stroke="none"/>
      <circle cx="12" cy="10" r="1" fill="currentColor" stroke="none"/>
      <circle cx="15.5" cy="10" r="1" fill="currentColor" stroke="none"/>
    </svg>
  );
}

function AlignIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden>
      <circle cx="12" cy="12" r="9"/>
      <circle cx="12" cy="12" r="3"/>
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3"/>
      <path d="M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"/>
    </svg>
  );
}

function StarsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden>
      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
      <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" opacity="0.4"/>
    </svg>
  );
}

function RealmIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden>
      <path d="M12 2L2 7l10 5 10-5-10-5z"/>
      <path d="M2 17l10 5 10-5"/>
      <path d="M2 12l10 5 10-5"/>
    </svg>
  );
}

/* ── Data ───────────────────────────────────────────────────── */

const features: {
  icon: ReactNode;
  tag: string;
  t: string;
  d: string;
  bullets: string[];
  accent: string;
  featured?: boolean;
}[] = [
  {
    icon: <HomeIcon />,
    tag: "Dashboard",
    t: "Karma & Dharma tracker",
    d: "Your living score. Worm gauges show karma and dharma in real time. Monthly trend charts reveal the arc of your inner life. AI-generated life reports give you the full picture.",
    bullets: ["Real-time karma & dharma gauges", "Monthly trend charts", "AI-generated insight reports"],
    accent: "#C9824A",
    featured: true,
  },
  {
    icon: <JournalIcon />,
    tag: "Journal",
    t: "AI-scored journal",
    d: "Write or speak your reflections. The Gemini-powered Karma Engine scores every entry across karma, dharma, emotion, and dimensions — with a clarification round for contradictions. Screen privacy on by default.",
    bullets: ["Voice or text input", "Karma + dharma scoring per entry", "Streak tracking, screen capture blocked"],
    accent: "#7a9e7e",
  },
  {
    icon: <MentorIcon />,
    tag: "Mentor",
    t: "Arya, your AI mentor",
    d: "A dharmic companion who remembers your commitments, tracks your mood arc, and adjusts the conversation to meet you where you are. Not a chatbot — a presence.",
    bullets: ["Memory of commitments & moods", "Image attachments via Gemini Vision", "Weekly & monthly summaries"],
    accent: "#a8c5ac",
  },
  {
    icon: <AlignIcon />,
    tag: "Align",
    t: "Five mindful practices",
    d: "A full toolkit inside one app: daily Karma Quiz (moral dilemmas that shape your score), 4·7·8 Breathing, Memory Focus game, 86 Yoga poses across 6 categories, and guided Mindful Audio with a dharma wheel visualizer.",
    bullets: ["Karma Quiz · 4·7·8 Breath · Memory Focus", "86 yoga poses across 6 categories", "Mindful audio + dharma wheel visualizer"],
    accent: "#4adbc9",
  },
  {
    icon: <StarsIcon />,
    tag: "Stars",
    t: "AI-personalized astrology",
    d: "Zodiac traits, compatibility, and affirmations — all personalized to your birth profile by Gemini. The cosmos, mapped to your inner journey.",
    bullets: ["Personalized to your DOB", "Compatibility insights", "AI-generated affirmations"],
    accent: "#c9a84a",
  },
  {
    icon: <RealmIcon />,
    tag: "Realm",
    t: "Virtue progression",
    d: "Every journal entry, quiz, and practice earns Karma XP. Rise through seven virtue levels — from Seeker to Karma Architect — each with its own cosmic milestone and description.",
    bullets: ["7 levels: Seeker → Karma Architect", "XP from journals, quizzes & practices", "Badges and milestone unlocks"],
    accent: "#e8a97a",
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
            Everything inside
          </p>
          <h2 className="mt-3 font-serif text-[2.25rem] font-light leading-[1.1] tracking-[-0.02em] text-[#f5f2ed] sm:text-[2.8rem]">
            Six tools. One daily practice.<br />
            <span className="italic text-[#C9824A]">Infinite self-knowledge.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-white/42">
            KarmicCompass is a complete spiritual operating system — journal, mentor, practices, astrology, and progression, all in one place.
          </p>
        </SectionReveal>

        {/* Cards grid */}
        <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.article
              key={f.t}
              initial={reduce ? false : { opacity: 0, y: 14 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.12 }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              whileHover={reduce ? undefined : { y: -4, transition: { duration: 0.22 } }}
              className={`group relative flex flex-col overflow-hidden rounded-2xl border p-6 transition-shadow duration-300 ${
                f.featured
                  ? "border-[#C9824A]/22 bg-gradient-to-br from-[#C9824A]/[0.07] to-transparent hover:shadow-[0_20px_60px_-20px_rgba(201,130,74,0.22)]"
                  : "border-white/[0.06] bg-gradient-to-b from-white/[0.03] to-transparent hover:shadow-[0_20px_60px_-20px_rgba(201,130,74,0.1)]"
              }`}
              style={f.featured ? {} : {}}
            >
              {f.featured && (
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(201,130,74,0.08),transparent_60%)]" aria-hidden />
              )}

              {/* Tag */}
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="text-[0.6rem] uppercase tracking-[0.22em] font-medium px-2 py-0.5 rounded-full border"
                  style={{
                    color: f.accent,
                    borderColor: `${f.accent}33`,
                    background: `${f.accent}10`,
                  }}
                >
                  {f.tag}
                </span>
              </div>

              {/* Icon */}
              <div
                className="flex h-10 w-10 items-center justify-center rounded-xl border transition-colors duration-200"
                style={{
                  borderColor: `${f.accent}33`,
                  background: `${f.accent}12`,
                  color: f.accent,
                }}
              >
                <div className="h-5 w-5">{f.icon}</div>
              </div>

              {/* Text */}
              <h3 className="mt-4 font-serif text-lg font-light text-white/85 group-hover:text-white transition-colors duration-200">
                {f.t}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/38 group-hover:text-white/50 transition-colors duration-200">
                {f.d}
              </p>

              {/* Bullets */}
              <ul className="mt-4 flex-1 space-y-1.5">
                {f.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-xs text-white/30 group-hover:text-white/40 transition-colors duration-200">
                    <span
                      className="mt-[3px] h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ background: f.accent, opacity: 0.7 }}
                    />
                    {b}
                  </li>
                ))}
              </ul>

              {/* Hover line */}
              <div
                className="mt-5 h-px transition-all duration-300 group-hover:opacity-80"
                style={{
                  background: `linear-gradient(to right, ${f.accent}55, transparent)`,
                }}
              />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
