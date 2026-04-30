"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SectionReveal } from "../SectionReveal";
import { SECTION_IDS } from "@/lib/constants";

const items = [
  {
    t: "Karma & dharma",
    d: "See a living score and weekly focus that reflect the intentions behind your days — not punishment, but perspective.",
  },
  {
    t: "AI mentor",
    d: "Ask what’s on your mind. Arya helps you reframe, plan small steps, and hold continuity across sessions — without performative chat.",
  },
  {
    t: "Daily journal",
    d: "Short entries, consistent rhythm. The app patterns your writing into themes you can actually use.",
  },
  {
    t: "Reports & insight",
    d: "Read summaries of your weeks: mood, effort, and the virtues you keep returning to — as understanding, not grades.",
  },
  {
    t: "Voice reflection",
    d: "Speak when typing feels wrong. Your voice is transcribed for you to keep or refine.",
  },
  {
    t: "Mindfulness tools",
    d: "Breath, gentle prompts, and check-ins you can do between meetings — in the same app as your journal.",
  },
] as const;

export function FeatureShowcase() {
  const reduce = useReducedMotion();
  return (
    <section
      id={SECTION_IDS.features}
      className="scroll-mt-20 border-b border-white/[0.04] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionReveal>
          <p className="text-center text-xs uppercase tracking-[0.25em] text-[#C9824A]">
            Inside the app
          </p>
          <h2 className="mt-3 text-center font-serif text-3xl font-light text-[#f5f2ed] sm:text-4xl">
            What you can actually do
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-sm text-white/45 sm:text-base">
            Familiar ideas —{" "}
            <em className="not-italic text-white/50">journaling and growth</em>{" "}
            — with structure that helps you return to yourself, not a feed.
          </p>
        </SectionReveal>
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((f, i) => (
            <motion.article
              key={f.t}
              initial={reduce ? false : { opacity: 0, y: 10 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              whileHover={
                reduce
                  ? undefined
                  : { y: -4, transition: { duration: 0.2 } }
              }
              className="group rounded-2xl border border-white/[0.06] bg-gradient-to-b from-white/[0.04] to-transparent p-5 transition-shadow hover:shadow-[0_20px_50px_-24px_rgba(201,130,74,0.12)]"
            >
              <h3 className="font-serif text-lg text-[#e8e4de] group-hover:text-white">
                {f.t}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/45">
                {f.d}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
