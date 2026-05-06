"use client";

import { motion, useReducedMotion, useInView } from "framer-motion";
import { useRef } from "react";

/* Tab icons matching the real app: Home, Journal, Mentor, Align, Stars, Realm, Profile */
function TabIcon({ type, active }: { type: string; active?: boolean }) {
  const col = active ? "#C9824A" : "rgba(255,255,255,0.22)";
  const sw = "1.5";
  switch (type) {
    case "home":
      return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M3 12L12 3l9 9" stroke={col} strokeWidth={sw} strokeLinecap="round"/>
          <path d="M5 10v9a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1v-9" stroke={col} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    case "journal":
      return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
          <rect x="4" y="2" width="16" height="20" rx="2" stroke={col} strokeWidth={sw}/>
          <path d="M8 7h8M8 11h8M8 15h5" stroke={col} strokeWidth={sw} strokeLinecap="round"/>
        </svg>
      );
    case "mentor":
      return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke={col} strokeWidth={sw} strokeLinejoin="round"/>
        </svg>
      );
    case "align":
      return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="12" cy="12" r="9" stroke={col} strokeWidth={sw}/>
          <circle cx="12" cy="12" r="3" stroke={col} strokeWidth={sw}/>
          <path d="M12 3v3M12 18v3M3 12h3M18 12h3" stroke={col} strokeWidth={sw} strokeLinecap="round"/>
        </svg>
      );
    case "stars":
      return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" stroke={col} strokeWidth={sw} strokeLinejoin="round"/>
        </svg>
      );
    case "realm":
      return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M12 2L2 7l10 5 10-5-10-5z" stroke={col} strokeWidth={sw} strokeLinejoin="round"/>
          <path d="M2 17l10 5 10-5" stroke={col} strokeWidth={sw} strokeLinecap="round"/>
          <path d="M2 12l10 5 10-5" stroke={col} strokeWidth={sw} strokeLinecap="round"/>
        </svg>
      );
    default:
      return null;
  }
}

export function PhoneFrame() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });

  // Karma ring: r=18, circ≈113.1
  const circ = 113.1;
  const karmaOffset = circ * (1 - 0.76);   // 76% karma
  const dharmaOffset = circ * (1 - 0.62);  // 62% dharma

  const tabs = ["home", "journal", "mentor", "align", "stars", "realm"];

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-[280px] sm:max-w-[310px]">
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute -inset-10 rounded-full opacity-60"
        style={{ background: "radial-gradient(ellipse at center, rgba(201,130,74,0.22) 0%, transparent 70%)" }}
        aria-hidden
      />

      {/* Phone shell */}
      <motion.div
        animate={reduce ? undefined : { y: [0, -12, 0] }}
        transition={reduce ? undefined : { duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="relative"
      >
        <div
          className="relative rounded-[2.8rem] p-[2px]"
          style={{
            background: "linear-gradient(160deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.03) 100%)",
            boxShadow: "0 40px 120px -20px rgba(0,0,0,0.85), 0 0 0 1px rgba(255,255,255,0.05), inset 0 1px 0 rgba(255,255,255,0.08)",
          }}
          role="img"
          aria-label="KarmicCompass app: Home screen showing karma score 76, dharma score 62, virtue level Practitioner, and six tabs: Home, Journal, Mentor, Align, Stars, Realm"
        >
          <div className="flex h-full flex-col overflow-hidden rounded-[2.65rem] bg-[#080e1c]">

            {/* Status bar */}
            <div className="flex shrink-0 items-center justify-between px-6 pb-1 pt-3.5">
              <span className="text-[0.52rem] font-semibold tracking-wider text-white/35">9:41</span>
              <div className="flex items-center gap-1.5">
                <div className="flex items-end gap-px h-2.5">
                  {[4, 6, 8, 10, 10].map((h, i) => (
                    <div key={i} className={`w-[3px] rounded-[1px] ${i < 4 ? "bg-white/35" : "bg-white/12"}`} style={{ height: `${h}px` }} />
                  ))}
                </div>
                <svg width="11" height="9" viewBox="0 0 16 12" fill="none" className="text-white/30" aria-hidden>
                  <path d="M8 10a1 1 0 110 2 1 1 0 010-2zM3.5 6.5a6.5 6.5 0 019 0M.5 3.5a11 11 0 0115 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
                <div className="relative flex h-2.5 w-5 items-center rounded-[2px] border border-white/25 px-[2px]">
                  <div className="h-1.5 w-3/4 rounded-[1px] bg-white/45" />
                  <div className="absolute -right-[3px] top-1/2 h-1 w-[2px] -translate-y-1/2 rounded-r-[1px] bg-white/20" />
                </div>
              </div>
            </div>

            {/* App header */}
            <div className="flex items-center justify-between px-5 pt-1 pb-2">
              <div>
                <p className="font-serif text-[0.88rem] font-light leading-tight text-white/90">
                  KarmicCompass
                </p>
                <p className="mt-0.5 text-[0.46rem] text-white/28 tracking-wide uppercase">Home · Thursday</p>
              </div>
              <div className="flex items-center gap-1.5">
                {/* Virtue badge */}
                <div className="flex items-center gap-1 rounded-full border border-[#c9824a]/25 bg-[#c9824a]/10 px-2 py-0.5">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#c9824a]" />
                  <span className="text-[0.44rem] text-[#c9824a]/80 tracking-wide">Practitioner</span>
                </div>
              </div>
            </div>

            {/* Dual gauge card */}
            <div className="mx-4 rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.05] to-white/[0.01] p-4">
              <p className="text-[0.44rem] uppercase tracking-[0.22em] text-white/22 mb-3">Your Scores</p>
              <div className="flex items-center justify-around">
                {/* Karma gauge */}
                <div className="flex flex-col items-center gap-1.5">
                  <svg viewBox="0 0 48 48" className="h-14 w-14 -rotate-90" aria-hidden>
                    <circle cx="24" cy="24" r="18" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="3" />
                    <motion.circle
                      cx="24" cy="24" r="18"
                      fill="none" stroke="#C9824A" strokeWidth="3" strokeLinecap="round"
                      strokeDasharray={circ}
                      initial={{ strokeDashoffset: circ }}
                      animate={inView ? { strokeDashoffset: karmaOffset } : { strokeDashoffset: circ }}
                      transition={{ duration: 1.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </svg>
                  <div className="text-center" style={{ marginTop: "-3.2rem" }}>
                    <p className="font-serif text-[1.4rem] font-light leading-none text-white">76</p>
                  </div>
                  <div style={{ marginTop: "1.2rem" }}>
                    <p className="text-[0.44rem] uppercase tracking-[0.2em] text-[#C9824A]/65">Karma</p>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-10 w-px bg-white/[0.06]" aria-hidden />

                {/* Dharma gauge */}
                <div className="flex flex-col items-center gap-1.5">
                  <svg viewBox="0 0 48 48" className="h-14 w-14 -rotate-90" aria-hidden>
                    <circle cx="24" cy="24" r="18" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="3" />
                    <motion.circle
                      cx="24" cy="24" r="18"
                      fill="none" stroke="#7a9e7e" strokeWidth="3" strokeLinecap="round"
                      strokeDasharray={circ}
                      initial={{ strokeDashoffset: circ }}
                      animate={inView ? { strokeDashoffset: dharmaOffset } : { strokeDashoffset: circ }}
                      transition={{ duration: 1.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </svg>
                  <div className="text-center" style={{ marginTop: "-3.2rem" }}>
                    <p className="font-serif text-[1.4rem] font-light leading-none text-white">62</p>
                  </div>
                  <div style={{ marginTop: "1.2rem" }}>
                    <p className="text-[0.44rem] uppercase tracking-[0.2em] text-[#7a9e7e]/65">Dharma</p>
                  </div>
                </div>
              </div>

              {/* Trend labels */}
              <div className="mt-3 flex justify-around">
                <div className="flex items-center gap-1">
                  <svg width="7" height="7" viewBox="0 0 12 12" fill="none" aria-hidden>
                    <path d="M6 9V3M3 6l3-3 3 3" stroke="#C9824A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <p className="text-[0.44rem] text-[#C9824A]/60">+3 this week</p>
                </div>
                <div className="flex items-center gap-1">
                  <svg width="7" height="7" viewBox="0 0 12 12" fill="none" aria-hidden>
                    <path d="M6 9V3M3 6l3-3 3 3" stroke="#7a9e7e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <p className="text-[0.44rem] text-[#7a9e7e]/60">steady</p>
                </div>
              </div>
            </div>

            {/* Arya insight */}
            <div className="mx-4 mt-2.5 rounded-xl border border-[#C9824A]/15 bg-gradient-to-b from-[#C9824A]/[0.07] to-[#C9824A]/[0.02] p-3">
              <div className="flex items-center gap-1.5 mb-1.5">
                <div className="flex h-4 w-4 items-center justify-center rounded-full bg-[#C9824A]/20 border border-[#C9824A]/25">
                  <svg width="7" height="7" viewBox="0 0 12 12" fill="none" aria-hidden>
                    <circle cx="6" cy="6" r="4" stroke="#C9824A" strokeWidth="1.5"/>
                    <path d="M6 2c0 2.21-1.79 4-4 4" stroke="#C9824A" strokeWidth="1"/>
                    <path d="M6 10c0-2.21 1.79-4 4-4" stroke="#C9824A" strokeWidth="1"/>
                  </svg>
                </div>
                <p className="text-[0.45rem] font-medium uppercase tracking-[0.2em] text-[#C9824A]/65">Arya · Daily Insight</p>
              </div>
              <p className="text-[0.65rem] leading-[1.5] text-white/52">
                &ldquo;You&rsquo;ve mentioned clarity three times this week. What would it look like tomorrow?&rdquo;
              </p>
            </div>

            {/* Journal teaser */}
            <div className="mx-4 mt-2 mb-3 rounded-xl border border-white/[0.04] bg-white/[0.015] p-3">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[0.44rem] uppercase tracking-[0.18em] text-white/20">Journal · 24 entries</p>
                <div className="flex items-center gap-0.5">
                  {[1,1,1,1,0,1,1].map((v, i) => (
                    <div
                      key={i}
                      className="h-2 w-1.5 rounded-[1px]"
                      style={{ background: v ? "#C9824A" : "rgba(255,255,255,0.06)", opacity: v ? (0.4 + i * 0.08) : 1 }}
                    />
                  ))}
                </div>
              </div>
              <div className="space-y-1">
                <div className="h-[4px] w-full rounded-full bg-white/[0.06]" />
                <div className="h-[4px] w-4/5 rounded-full bg-white/[0.045]" />
                <div className="h-[4px] w-3/5 rounded-full bg-white/[0.03]" />
              </div>
            </div>

            {/* Tab bar */}
            <div className="border-t border-white/[0.05] bg-[#050810] px-1 pb-5 pt-2.5">
              <div className="flex justify-around items-center">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    className="flex flex-col items-center gap-0.5 focus:outline-none px-0.5"
                    tabIndex={-1}
                    aria-hidden
                  >
                    <TabIcon type={tab} active={tab === "home"} />
                    <span
                      className="text-[0.34rem] capitalize"
                      style={{ color: tab === "home" ? "#C9824A" : "rgba(255,255,255,0.22)" }}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Home indicator */}
          <div className="absolute bottom-[3px] left-1/2 h-[3px] w-20 -translate-x-1/2 rounded-full bg-white/15" aria-hidden />
        </div>
      </motion.div>
    </div>
  );
}
