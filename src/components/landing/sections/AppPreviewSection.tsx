"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SectionReveal } from "../SectionReveal";
import { SECTION_IDS } from "@/lib/constants";

const conversation = [
  {
    role: "user" as const,
    text: "I keep putting off the honest conversation with my team. I don't know why.",
  },
  {
    role: "arya" as const,
    text: "What do you imagine happening if you said exactly what's true?",
  },
  {
    role: "user" as const,
    text: "Probably awkwardness. Maybe pushback. It feels easier to wait.",
  },
  {
    role: "arya" as const,
    text: "Easier until it isn't. What would 'kind and direct' look like in one sentence?",
  },
];

export function AppPreviewSection() {
  const reduce = useReducedMotion();
  return (
    <section
      id={SECTION_IDS.preview}
      className="scroll-mt-20 border-b border-white/[0.04] bg-gradient-to-b from-[#0a0a0f] via-[#0c0c14] to-[#0a0a0f] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center lg:gap-24">

          {/* ── Left: Arya chat demo ── */}
          <SectionReveal>
            <p className="text-[0.65rem] uppercase tracking-[0.28em] text-[#C9824A]">
              Meet Arya
            </p>
            <h2 className="mt-3 font-serif text-[2.1rem] font-light leading-[1.1] tracking-[-0.02em] text-[#f5f2ed] sm:text-[2.6rem]">
              An AI mentor that<br />
              <span className="italic text-[#C9824A]">actually listens.</span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/42">
              Arya doesn&apos;t just respond &mdash; she holds context across sessions, notices what you keep circling back to, and asks the question you weren&apos;t quite ready to ask yourself.
            </p>

            {/* Feature list */}
            <ul className="mt-6 space-y-3">
              {[
    "Remembers what matters across sessions",
              "Asks questions, not just gives answers",
              "Grounded in your journal \u2014 not generic advice",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#C9824A]/30 bg-[#C9824A]/10">
                    <svg width="8" height="8" viewBox="0 0 12 12" fill="none" aria-hidden>
                      <path d="M2 6l3 3 5-5" stroke="#C9824A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  <span className="text-sm leading-relaxed text-white/50">{item}</span>
                </li>
              ))}
            </ul>

            <a
              href={`#${SECTION_IDS.features}`}
              onClick={(e) => { e.preventDefault(); document.getElementById(SECTION_IDS.features)?.scrollIntoView({ behavior: "smooth" }); }}
              className="mt-7 inline-flex items-center gap-2 text-sm text-[#C9824A] hover:gap-3 transition-all duration-200"
            >
              All features
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </SectionReveal>

          {/* ── Right: conversation UI ── */}
          <SectionReveal delay={0.1}>
            <div className="relative">
              {/* Glow */}
              <div className="pointer-events-none absolute -inset-6 bg-[radial-gradient(ellipse_at_center,rgba(201,130,74,0.08),transparent_70%)]" aria-hidden />

              <div className="relative rounded-2xl border border-white/[0.08] bg-[#0e0e18]/80 p-5 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)] backdrop-blur-sm">
                {/* Chat header */}
                <div className="mb-4 flex items-center gap-3 border-b border-white/[0.05] pb-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#C9824A]/25 bg-[#C9824A]/12">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <circle cx="12" cy="12" r="9" stroke="#C9824A" strokeWidth="1.5"/>
                      <path d="M12 3c0 4.97-4.03 9-9 9" stroke="#C9824A" strokeWidth="1.2"/>
                      <path d="M12 21c0-4.97 4.03-9 9-9" stroke="#C9824A" strokeWidth="1.2"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white/80">Arya</p>
                    <p className="text-[0.6rem] text-white/30">Your AI mentor</p>
                  </div>
                  <div className="ml-auto flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/60" />
                    <span className="text-[0.6rem] text-white/30">Active</span>
                  </div>
                </div>

                {/* Messages */}
                <div className="space-y-3" role="log" aria-label="Example conversation with Arya">
                  {conversation.map((msg, i) => (
                    <motion.div
                      key={i}
                      initial={reduce ? false : { opacity: 0, y: 8 }}
                      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.1 + i * 0.12 }}
                      className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[82%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                          msg.role === "user"
                            ? "rounded-br-sm bg-white/[0.07] text-white/65"
                            : "rounded-bl-sm border border-[#C9824A]/18 bg-[#C9824A]/[0.08] text-white/75"
                        }`}
                      >
                        {msg.text}
                      </div>
                    </motion.div>
                  ))}

                  {/* Typing indicator */}
                  <motion.div
                    className="flex justify-start"
                    initial={reduce ? false : { opacity: 0 }}
                    whileInView={reduce ? undefined : { opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7 }}
                  >
                    <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm border border-[#C9824A]/15 bg-[#C9824A]/[0.06] px-4 py-2.5">
                      {[0, 0.2, 0.4].map((d) => (
                        <motion.span
                          key={d}
                          className="h-1.5 w-1.5 rounded-full bg-[#C9824A]/50"
                          animate={reduce ? {} : { y: [0, -4, 0] }}
                          transition={{ duration: 0.8, repeat: Infinity, delay: d, ease: "easeInOut" }}
                        />
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Input bar */}
                <div className="mt-4 flex items-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-2.5">
                  <span className="flex-1 text-sm text-white/20">Reply to Arya…</span>
                  <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#C9824A]/20">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#C9824A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M12 5v14M5 12l7 7 7-7"/>
                    </svg>
                  </div>
                </div>

                <p className="mt-3 text-center text-[0.58rem] text-white/20">
                  Sample conversation · Arya remembers context across sessions
                </p>
              </div>
            </div>
          </SectionReveal>
        </div>

        {/* Bottom stat strip */}
        <div className="mt-16 grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-white/[0.05] bg-white/[0.02]">
          {[
            { label: "Journal entries", stat: "Daily" },
            { label: "Karma tracking", stat: "Weekly" },
            { label: "Arya sessions", stat: "Unlimited*" },
          ].map((item) => (
            <div key={item.label} className="px-6 py-5 text-center">
              <p className="font-serif text-xl text-white/75">{item.stat}</p>
              <p className="mt-1 text-[0.65rem] text-white/30">{item.label}</p>
            </div>
          ))}
        </div>
        <p className="mt-2 text-center text-[0.6rem] text-white/18">* Subject to plan limits where applicable</p>
      </div>
    </section>
  );
}
