"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SectionReveal } from "./SectionReveal";

/** Decorative phone frame with CSS-only “screens” – no stock imagery. */
export function PhoneFrame() {
  const reduce = useReducedMotion();
  return (
    <SectionReveal>
      <motion.div
        className="relative mx-auto aspect-[9/19] w-full max-w-[min(100%,360px)] rounded-[2.2rem] border border-white/12 bg-gradient-to-b from-white/[0.08] to-transparent p-2 shadow-[0_24px_80px_-20px_rgba(201,130,74,0.15)] backdrop-blur-sm"
        animate={
          reduce
            ? undefined
            : { y: [0, -7, 0] }
        }
        transition={
          reduce
            ? undefined
            : { duration: 5.5, repeat: Infinity, ease: "easeInOut" }
        }
      >
        <div
          className="flex h-full w-full flex-col overflow-hidden rounded-[1.6rem] bg-gradient-to-b from-[#0e0e14] to-[#0a0a0f] ring-1 ring-white/5"
          role="img"
          aria-label="Karmic Compass app preview: stylised interface panels"
        >
          {/* “status” */}
          <div className="flex shrink-0 items-center justify-between px-5 pt-3 pb-2 text-[0.6rem] tracking-[0.2em] text-white/30">
            <span>9:41</span>
            <div className="h-1.5 w-16 rounded-full bg-white/10" aria-hidden />
          </div>
          {/* mini header */}
          <div className="px-5">
            <p className="font-serif text-lg font-light tracking-tight text-[#f5f2ed]">
              <span className="text-white/90">Karmic</span>{" "}
              <span className="text-[#C9824A]">Compass</span>
            </p>
            <p className="mt-0.5 text-xs text-white/40">Home · this week</p>
          </div>
          {/* karma card */}
          <div className="mt-4 mx-4 rounded-xl border border-white/[0.07] bg-gradient-to-br from-white/[0.04] to-transparent p-3">
            <div className="flex items-end justify-between gap-2">
              <div>
                <p className="text-[0.55rem] uppercase tracking-[0.2em] text-[#C9824A]/90">
                  Karma
                </p>
                <p className="font-serif text-3xl font-light text-white">78</p>
              </div>
              <div className="h-10 w-10 rounded-full border border-[#C9824A]/25 bg-[#C9824A]/5" />
            </div>
            <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-white/5">
              <div
                className="h-full w-3/4 rounded-full bg-[#C9824A]/50"
                aria-hidden
              />
            </div>
          </div>
          {/* dharma + journal rows */}
          <div className="mt-3 flex flex-1 flex-col gap-2 px-4 pb-5">
            <div className="rounded-lg border border-white/[0.05] bg-white/[0.02] px-3 py-2">
              <p className="text-[0.5rem] uppercase tracking-[0.16em] text-white/30">
                Dharma focus
              </p>
              <p className="text-sm text-white/60">Clarity in daily action</p>
            </div>
            <div className="flex-1 rounded-lg border border-white/[0.05] bg-gradient-to-b from-white/[0.02] to-transparent p-3">
              <p className="text-[0.5rem] uppercase tracking-[0.16em] text-white/30">
                Journal
              </p>
              <div className="mt-1 space-y-1.5">
                <div className="h-1.5 w-full rounded bg-white/10" />
                <div className="h-1.5 w-4/5 rounded bg-white/8" />
                <div className="h-1.5 w-3/5 rounded bg-white/6" />
              </div>
            </div>
            <div className="h-8 rounded-lg border border-white/[0.06] bg-white/[0.02]" />
          </div>
        </div>
        {/* home indicator */}
        <div
          className="absolute bottom-1.5 left-1/2 h-1 w-24 -translate-x-1/2 rounded-full bg-white/15"
          aria-hidden
        />
      </motion.div>
    </SectionReveal>
  );
}
