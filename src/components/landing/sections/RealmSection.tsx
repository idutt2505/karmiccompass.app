"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SectionReveal } from "../SectionReveal";

/* ── Virtue level data (exact from app) ────────────────────── */

const LEVELS = [
  {
    name: "Seeker",
    xp: "0 XP",
    color: "#7a9e7e",
    desc: "Everyone begins here. You\u2019ve taken the first step by showing up \u2014 that alone is powerful.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden width="20" height="20">
        <line x1="12" y1="18" x2="12" y2="10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
        <ellipse cx="9.8" cy="10.5" rx="3" ry="1.7" fill="currentColor" opacity="0.7"/>
        <ellipse cx="14.2" cy="8.5" rx="3" ry="1.7" fill="currentColor" opacity="0.7"/>
        <circle cx="12" cy="18" r="1.4" fill="currentColor" opacity="0.5"/>
      </svg>
    ),
  },
  {
    name: "Contemplator",
    xp: "500 XP",
    color: "#a8c5ac",
    desc: "You\u2019ve built the habit of looking inward. Reflection is becoming part of who you are.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden width="20" height="20">
        <circle cx="12" cy="12" r="2.5" fill="currentColor" opacity="0.9"/>
        <circle cx="12" cy="12" r="5" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
        <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.28"/>
      </svg>
    ),
  },
  {
    name: "Practitioner",
    xp: "1,500 XP",
    color: "#c9824a",
    desc: "You\u2019re actively doing the work \u2014 not just noticing patterns but consciously changing them.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden width="20" height="20">
        <circle cx="12" cy="12" r="7" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.2"/>
        <circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.25"/>
        <circle cx="12" cy="12" r="1.5" fill="currentColor" opacity="0.9"/>
        <circle cx="12" cy="5" r="1.5" fill="currentColor"/>
      </svg>
    ),
    featured: true,
  },
  {
    name: "Guide",
    xp: "3,500 XP",
    color: "#e8a97a",
    desc: "Your inner work is starting to show on the outside. You lead by example, not by words.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden width="20" height="20">
        <path d="M12 18 C9 15 7 11 12 6 C17 11 15 15 12 18Z" fill="currentColor" opacity="0.85"/>
        <path d="M12 16 C10.5 14 9.5 12 12 9 C14.5 12 13.5 14 12 16Z" fill="rgba(255,220,150,0.9)"/>
      </svg>
    ),
  },
  {
    name: "Sage",
    xp: "7,000 XP",
    color: "#c9a84a",
    desc: "You\u2019ve logged hundreds of honest reflections. Your values and your actions are in sync.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden width="20" height="20">
        {Array.from({ length: 10 }).map((_, i) => {
          const a = (i / 10) * Math.PI * 2;
          return (
            <circle
              key={i}
              cx={12 + 7 * Math.cos(a)}
              cy={12 + 7 * Math.sin(a)}
              r={i % 2 === 0 ? 1.4 : 0.9}
              fill="currentColor"
              opacity={i % 2 === 0 ? 0.9 : 0.4}
            />
          );
        })}
        <circle cx="12" cy="12" r="2.4" fill="currentColor" opacity="0.8"/>
      </svg>
    ),
  },
  {
    name: "Dharma Master",
    xp: "15,000 XP",
    color: "#7a9abf",
    desc: "Fewer than 1 in 1,000 users ever reach this. Your presence itself has become a source of guidance.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden width="20" height="20">
        <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.25"/>
        <circle cx="12" cy="12" r="6" fill="none" stroke="currentColor" strokeWidth="0.7" opacity="0.4"/>
        <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="0.9" opacity="0.6"/>
        <circle cx="12" cy="12" r="1.2" fill="currentColor" opacity="0.9"/>
        {[0,1,2,3,4,5,6,7].map((_, i) => {
          const a = (i / 8) * Math.PI * 2;
          return <circle key={i} cx={12 + 6 * Math.cos(a)} cy={12 + 6 * Math.sin(a)} r="0.8" fill="currentColor" opacity="0.7"/>;
        })}
      </svg>
    ),
  },
  {
    name: "Karma Architect",
    xp: "20,000 XP",
    color: "#C9824A",
    desc: "The absolute pinnacle. You no longer chase good karma \u2014 you simply live it.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden width="20" height="20">
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i / 8) * Math.PI * 2;
          return (
            <line
              key={i}
              x1="12" y1="12"
              x2={12 + 9 * Math.cos(a)}
              y2={12 + 9 * Math.sin(a)}
              stroke="currentColor"
              strokeWidth={i % 2 === 0 ? "1.2" : "0.6"}
              strokeLinecap="round"
              opacity={i % 2 === 0 ? 0.9 : 0.4}
            />
          );
        })}
        <circle cx="12" cy="12" r="2.5" fill="currentColor" opacity="0.9"/>
      </svg>
    ),
  },
];

export function RealmSection() {
  const reduce = useReducedMotion();

  return (
    <section className="scroll-mt-20 border-b border-white/[0.04] py-24 sm:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Header */}
        <SectionReveal className="max-w-2xl mx-auto text-center">
          <p className="text-[0.65rem] uppercase tracking-[0.28em] text-[#C9824A]">
            The Realm
          </p>
          <h2 className="mt-3 font-serif text-[2.25rem] font-light leading-[1.1] tracking-[-0.02em] text-[#f5f2ed] sm:text-[2.8rem]">
            Your journey through<br />
            <span className="italic text-[#C9824A]">seven virtue levels.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-white/42">
            Every journal entry, quiz, and practice earns Karma XP. Rise from Seeker to Karma Architect — each level a genuine milestone in your inner life.
          </p>
        </SectionReveal>

        {/* Levels */}
        <div className="mt-16 relative">
          {/* Connecting spine */}
          <div
            className="absolute left-6 top-8 bottom-8 w-px bg-gradient-to-b from-transparent via-white/[0.07] to-transparent hidden sm:block"
            aria-hidden
          />

          <div className="space-y-3">
            {LEVELS.map((level, i) => (
              <motion.div
                key={level.name}
                initial={reduce ? false : { opacity: 0, x: -16 }}
                whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className={`group relative flex items-start gap-5 rounded-2xl border px-5 py-4 transition-all duration-300 ${
                  level.featured
                    ? "border-[#C9824A]/20 bg-gradient-to-r from-[#C9824A]/[0.06] to-transparent hover:border-[#C9824A]/35"
                    : "border-white/[0.05] bg-white/[0.02] hover:bg-white/[0.035] hover:border-white/[0.09]"
                }`}
              >
                {/* Level number + icon bubble */}
                <div
                  className="relative shrink-0 flex h-11 w-11 items-center justify-center rounded-full border-2 transition-all duration-300"
                  style={{
                    borderColor: `${level.color}44`,
                    background: `${level.color}14`,
                    color: level.color,
                  }}
                >
                  {level.icon}
                  {/* Spine dot */}
                  <div
                    className="absolute -left-[1.85rem] top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full hidden sm:block"
                    style={{ background: level.color, opacity: 0.6 }}
                    aria-hidden
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <h3
                      className="font-serif text-base font-light"
                      style={{ color: level.color }}
                    >
                      {level.name}
                    </h3>
                    <span
                      className="font-mono text-[0.6rem] tracking-widest px-1.5 py-0.5 rounded border"
                      style={{
                        color: `${level.color}aa`,
                        borderColor: `${level.color}22`,
                        background: `${level.color}0a`,
                      }}
                    >
                      {level.xp}
                    </span>
                    {i === 0 && (
                      <span className="text-[0.6rem] uppercase tracking-[0.18em] text-white/28 px-1.5 py-0.5 rounded border border-white/[0.06]">
                        Starting level
                      </span>
                    )}
                    {level.featured && (
                      <span className="text-[0.6rem] uppercase tracking-[0.18em] text-[#C9824A]/70 px-1.5 py-0.5 rounded border border-[#C9824A]/20 bg-[#C9824A]/[0.06]">
                        Most reach here
                      </span>
                    )}
                    {i >= 5 && (
                      <span className="text-[0.6rem] uppercase tracking-[0.18em] text-white/28 px-1.5 py-0.5 rounded border border-white/[0.06]">
                        Rare
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-white/35 group-hover:text-white/48 transition-colors duration-200">
                    {level.desc}
                  </p>
                </div>

                {/* Index number — decorative */}
                <div
                  className="shrink-0 font-mono text-4xl font-bold opacity-[0.04] group-hover:opacity-[0.07] transition-opacity duration-300 select-none hidden md:block"
                  aria-hidden
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer note */}
        <SectionReveal className="mt-12 text-center">
          <p className="text-sm text-white/28 max-w-md mx-auto">
            Karma XP is earned through daily journaling, the Karma Quiz, breathing exercises, memory games, yoga, and mindful audio sessions.
          </p>
        </SectionReveal>
      </div>
    </section>
  );
}
