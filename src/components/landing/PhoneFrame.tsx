"use client";

import { motion, useReducedMotion, useInView } from "framer-motion";
import { useRef } from "react";

export function PhoneFrame() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });

  // SVG karma ring: r=20, circumference≈125.66. 78% fill → offset≈27.6
  const circ = 125.66;
  const filledOffset = circ * (1 - 0.78);

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-[280px] sm:max-w-[310px]">
      {/* Ambient glow behind the phone */}
      <div
        className="pointer-events-none absolute -inset-10 rounded-full opacity-60"
        style={{
          background: "radial-gradient(ellipse at center, rgba(201,130,74,0.22) 0%, transparent 70%)",
        }}
        aria-hidden
      />

      {/* Phone shell */}
      <motion.div
        animate={reduce ? undefined : { y: [0, -12, 0] }}
        transition={reduce ? undefined : { duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="relative"
      >
        {/* Outer bezel */}
        <div
          className="relative rounded-[2.8rem] p-[2px]"
          style={{
            background: "linear-gradient(160deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.03) 100%)",
            boxShadow: "0 40px 120px -20px rgba(0,0,0,0.85), 0 0 0 1px rgba(255,255,255,0.05), inset 0 1px 0 rgba(255,255,255,0.08)",
          }}
          role="img"
          aria-label="Karmic Compass app: karma score 78, dharma focus, and Arya mentor chat"
        >
          {/* Screen */}
          <div className="flex h-full flex-col overflow-hidden rounded-[2.65rem] bg-[#08080d]">

            {/* ── Status bar ── */}
            <div className="flex shrink-0 items-center justify-between px-6 pb-1 pt-3.5">
              <span className="text-[0.52rem] font-semibold tracking-wider text-white/35">9:41</span>
              <div className="flex items-center gap-1.5">
                {/* Signal bars */}
                <div className="flex items-end gap-px h-2.5">
                  {[4, 6, 8, 10, 10].map((h, i) => (
                    <div
                      key={i}
                      className={`w-[3px] rounded-[1px] ${i < 3 ? "bg-white/30" : "bg-white/10"}`}
                      style={{ height: `${h}px` }}
                    />
                  ))}
                </div>
                {/* WiFi */}
                <svg width="11" height="9" viewBox="0 0 16 12" fill="none" className="text-white/30" aria-hidden>
                  <path d="M8 10a1 1 0 110 2 1 1 0 010-2zM3.5 6.5a6.5 6.5 0 019 0M.5 3.5a11 11 0 0115 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
                {/* Battery */}
                <div className="relative flex h-2.5 w-5 items-center rounded-[2px] border border-white/25 px-[2px]">
                  <div className="h-1.5 w-3/4 rounded-[1px] bg-white/45" />
                  <div className="absolute -right-[3px] top-1/2 h-1 w-[2px] -translate-y-1/2 rounded-r-[1px] bg-white/20" />
                </div>
              </div>
            </div>

            {/* ── App header ── */}
            <div className="flex items-center justify-between px-5 pt-1.5 pb-3">
              <div>
                <p className="font-serif text-[0.95rem] font-light leading-tight text-white/90">
                  Karmic <span className="text-[#C9824A]">Compass</span>
                </p>
                <p className="mt-0.5 text-[0.5rem] text-white/30 tracking-wide">Thursday · Week 18</p>
              </div>
              <div className="flex h-7 w-7 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.04]">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/40" aria-hidden>
                  <circle cx="12" cy="8" r="4"/>
                  <path d="M4 20c0-4 3.58-7 8-7s8 3 8 7"/>
                </svg>
              </div>
            </div>

            {/* ── Karma card ── */}
            <div className="mx-4 rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.055] to-white/[0.01] p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[0.47rem] uppercase tracking-[0.24em] text-[#C9824A]/75">Karma Score</p>
                  <p className="mt-0.5 font-serif text-[2.6rem] font-light leading-none text-white">78</p>
                  <div className="mt-1.5 flex items-center gap-1">
                    <svg width="9" height="9" viewBox="0 0 12 12" fill="none" aria-hidden>
                      <path d="M6 9V3M3 6l3-3 3 3" stroke="#C9824A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <p className="text-[0.5rem] text-[#C9824A]/70">+3 this week</p>
                  </div>
                </div>

                {/* Animated circular karma ring */}
                <svg viewBox="0 0 48 48" className="h-14 w-14 -rotate-90" aria-hidden>
                  <circle cx="24" cy="24" r="20" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="2.5" />
                  <motion.circle
                    cx="24" cy="24" r="20"
                    fill="none"
                    stroke="#C9824A"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeDasharray={circ}
                    initial={{ strokeDashoffset: circ }}
                    animate={inView ? { strokeDashoffset: filledOffset } : { strokeDashoffset: circ }}
                    transition={{ duration: 2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  />
                  {/* subtle glow ring */}
                  <circle cx="24" cy="24" r="20" fill="none" stroke="rgba(201,130,74,0.08)" strokeWidth="6" />
                </svg>
              </div>

              {/* Progress bar */}
              <div className="mt-3 h-0.5 w-full overflow-hidden rounded-full bg-white/[0.05]">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-[#C9824A]/60 to-[#C9824A]"
                  initial={{ width: "0%" }}
                  animate={inView ? { width: "78%" } : { width: "0%" }}
                  transition={{ duration: 1.8, delay: 0.5, ease: "easeOut" }}
                />
              </div>
            </div>

            {/* ── Dharma focus ── */}
            <div className="mx-4 mt-2.5 rounded-xl border border-white/[0.05] bg-white/[0.025] px-3.5 py-2.5">
              <p className="text-[0.44rem] uppercase tracking-[0.2em] text-white/22">Dharma Focus · This Week</p>
              <p className="mt-0.5 text-[0.75rem] text-white/60">Clarity in daily action</p>
            </div>

            {/* ── Arya chat bubble ── */}
            <div className="mx-4 mt-2.5 rounded-xl border border-[#C9824A]/15 bg-gradient-to-b from-[#C9824A]/[0.07] to-[#C9824A]/[0.02] p-3.5">
              <div className="flex items-center gap-1.5 mb-2">
                <div className="flex h-4 w-4 items-center justify-center rounded-full bg-[#C9824A]/20 border border-[#C9824A]/25">
                  <svg width="7" height="7" viewBox="0 0 12 12" fill="none" aria-hidden>
                    <circle cx="6" cy="6" r="4" stroke="#C9824A" strokeWidth="1.5"/>
                    <path d="M6 2c0 2.21-1.79 4-4 4" stroke="#C9824A" strokeWidth="1"/>
                    <path d="M6 10c0-2.21 1.79-4 4-4" stroke="#C9824A" strokeWidth="1"/>
                  </svg>
                </div>
                <p className="text-[0.48rem] font-medium uppercase tracking-[0.2em] text-[#C9824A]/70">Arya</p>
              </div>
              <p className="text-[0.68rem] leading-[1.55] text-white/55">
                &ldquo;You&rsquo;ve mentioned clarity three times this week. What would it look like tomorrow?&rdquo;
              </p>
              {/* Typing dots */}
              <div className="mt-2 flex gap-1">
                {[0, 160, 320].map((delay) => (
                  <div
                    key={delay}
                    className="h-1 w-1 rounded-full bg-[#C9824A]/45"
                    style={{ animation: `bounce 1.2s ease-in-out ${delay}ms infinite` }}
                  />
                ))}
              </div>
            </div>

            {/* ── Journal placeholder ── */}
            <div className="mx-4 mt-2.5 mb-5 rounded-xl border border-white/[0.04] bg-white/[0.015] p-3">
              <p className="text-[0.44rem] uppercase tracking-[0.2em] text-white/18">Today&rsquo;s Journal</p>
              <div className="mt-2 space-y-1.5">
                <div className="h-[5px] w-full rounded-full bg-white/[0.07]" />
                <div className="h-[5px] w-4/5 rounded-full bg-white/[0.05]" />
                <div className="h-[5px] w-3/5 rounded-full bg-white/[0.04]" />
              </div>
            </div>
          </div>

          {/* Home indicator */}
          <div className="absolute bottom-2 left-1/2 h-[3px] w-20 -translate-x-1/2 rounded-full bg-white/15" aria-hidden />
        </div>
      </motion.div>
    </div>
  );
}
