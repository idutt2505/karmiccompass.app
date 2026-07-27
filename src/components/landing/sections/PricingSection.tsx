"use client";

import { SectionReveal } from "../SectionReveal";
import { SmartExternalLink } from "../SmartExternalLink";
import {
  TRIAL_DAYS,
  TRIAL_AI_PER_DAY,
  COMPASS_AI_PER_DAY,
  TRIAL_JOURNAL_PER_DAY,
  COMPASS_JOURNAL_PER_DAY,
  COMPASS_PRICE_DISPLAY,
  COMPASS_PERIOD_DISPLAY,
  PRICE_CAVEAT,
  RENEWAL_DISCLOSURE,
  TRIAL_END_DISCLOSURE,
  TERMS_URL,
  SECTION_IDS,
  APP_STORE_URL,
  PLAY_STORE_URL,
} from "@/lib/constants";
import { motion, useReducedMotion } from "framer-motion";


function Check() {
  return (
    <span className="mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-accent/15 border border-accent/25">
      <svg width="8" height="8" viewBox="0 0 12 12" fill="none" aria-hidden>
        <path d="M2.5 6l2.5 2.5 4.5-5" stroke="#C9824A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </span>
  );
}

const trialFeatures = [
  "Journal (text + voice) with Karma Engine scoring",
  `Arya mentor \u2014 ${TRIAL_AI_PER_DAY} messages/day`,
  "Karma & dharma gauges + monthly chart",
  "All 5 Align practices (quiz, breath, memory, yoga, audio)",
  "Stars astrology tab",
  "Realm virtue progression (all 7 levels)",
];

// [truth] These are the ONLY things that change when you pay. This list used to
// sell Deep Memory, Incognito Mode, Extended Summaries and full chat history &
// search as what the subscription buys — all four are already available during
// the trial (MentorScreen.js gates them `(!p.premium || isBasic || isTrial)`),
// which is an App Store 3.1.2 problem, not a copy nit. The real differences are
// kc-mobile/src/constants.js COMPASS_PERKS: the two daily allowances.
const compassFeatures = [
  "Everything in the trial — nothing is feature-locked",
  `Arya messages · ${TRIAL_AI_PER_DAY} → ${COMPASS_AI_PER_DAY} a day`,
  `Journal reflections · ${TRIAL_JOURNAL_PER_DAY} → ${COMPASS_JOURNAL_PER_DAY} a day`,
  "Keeps your access once the trial ends",
];

export function PricingSection() {
  const reduce = useReducedMotion();

  return (
    <section
      id={SECTION_IDS.pricing}
      className="section-y section-y-tight-top scroll-mt-20 border-b border-white/[0.04]"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionReveal className="text-center">
          {/* [truth] Was "Start free. Go deeper when you are ready." above a card
              headed "Free · N days", which reads as a persistent free tier. There
              isn't one — functions/index.js sets DAILY_AI_LIMIT_NONE = 0 and
              LegalScreen.js §5 says access is suspended until you subscribe. */}
          <h2 className="font-serif text-[2.1rem] font-light leading-[1.1] tracking-[-0.02em] text-ink sm:text-[2.6rem]">
            Everything free for {TRIAL_DAYS} days.<br />
            <span className="italic text-accent">Then decide.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-muted">
            {TRIAL_END_DISCLOSURE}
          </p>
        </SectionReveal>

        <div className="mt-12 grid gap-4 lg:grid-cols-2 max-w-4xl mx-auto">

          {/* ── Free Trial ── */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 12 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.035] to-transparent p-7"
          >
            <p className="text-[0.65rem] uppercase tracking-[0.22em] text-muted">Trial</p>
            <div className="mt-2 flex items-end gap-2">
              <p className="font-serif text-4xl font-light text-ink">Free</p>
              <p className="mb-1 text-sm text-muted">· {TRIAL_DAYS} days</p>
            </div>
            <p className="mt-2 text-[0.8125rem] leading-relaxed text-muted">
              No payment method required, and the trial does not convert on its
              own. When the {TRIAL_DAYS} days are up, access is suspended until
              you subscribe.
            </p>

            <ul className="mt-6 flex-1 space-y-3">
              {trialFeatures.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <Check />
                  <span className="text-sm leading-snug text-body">{f}</span>
                </li>
              ))}
            </ul>

            <div className="mt-7 flex flex-col gap-2">
              <div className="grid grid-cols-2 gap-2">
                <SmartExternalLink
                  href={APP_STORE_URL}
                  className="flex items-center justify-center gap-2 rounded-xl border border-white/[0.14] py-3 text-center text-sm font-medium text-body transition hover:border-white/[0.28] hover:bg-white/[0.05] hover:text-ink"
                  label="Download KarmicCompass on the App Store"
                >
                  <svg width="11" height="13" viewBox="0 0 13 16" fill="currentColor" aria-hidden>
                    <path d="M10.94 8.53c-.02-2.09 1.71-3.1 1.79-3.15-1-1.44-2.54-1.64-3.09-1.66-1.31-.13-2.58.76-3.25.76-.67 0-1.69-.74-2.79-.72C2.16 3.78 .8 4.57.06 5.82-1.43 8.39-.41 12.18.99 14.07c.69.99 1.51 2.09 2.59 2.05 1.04-.04 1.43-.66 2.69-.66 1.26 0 1.61.66 2.7.64 1.12-.02 1.83-1 2.51-1.99.8-1.14 1.12-2.26 1.14-2.32-.02-.01-2.19-.85-2.69-3.29zM8.83 2.17C9.4 1.48 9.8.52 9.7-.5c-.87.04-1.92.58-2.54 1.27-.56.62-1.05 1.61-.92 2.55.97.08 1.96-.48 2.59-1.15z"/>
                  </svg>
                  App Store
                </SmartExternalLink>
                <SmartExternalLink
                  href={PLAY_STORE_URL}
                  className="flex items-center justify-center gap-2 rounded-xl border border-white/[0.14] py-3 text-center text-sm font-medium text-body transition hover:border-white/[0.28] hover:bg-white/[0.05] hover:text-ink"
                  label="Download KarmicCompass on Google Play"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M3.18 23.76c.37.2.8.2 1.2 0l11-6.35-2.84-2.84-9.36 9.19zM.5 1.58A1.5 1.5 0 000 2.75v18.5a1.5 1.5 0 00.5 1.17l.07.06 10.36-10.36v-.24L.57 1.52.5 1.58zM20.65 10.34l-2.96-1.71-3.18 3.18 3.18 3.18 2.99-1.73a1.51 1.51 0 000-2.92zM4.38.24L15.37 6.6l-2.84 2.84L3.18.24A1.35 1.35 0 014.38.24z"/>
                  </svg>
                  Google Play
                </SmartExternalLink>
              </div>
            </div>
          </motion.div>

          {/* ── Compass ── */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 12 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex flex-col overflow-hidden rounded-2xl border border-accent/28 bg-gradient-to-b from-accent/[0.09] to-transparent p-7"
          >
            {/* Glow */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(201,130,74,0.1),transparent_60%)]" aria-hidden />

            {/* Recommended badge */}
            <div className="absolute right-5 top-5 rounded-full border border-accent/30 bg-accent/12 px-2.5 py-0.5 text-[0.6rem] font-medium uppercase tracking-[0.18em] text-accent-light">
              Recommended
            </div>

            <p className="text-[0.65rem] font-medium uppercase tracking-[0.22em] text-accent-light">Compass</p>
            <div className="mt-2 flex items-end gap-2">
              <p className="font-mono text-4xl font-light text-ink">{COMPASS_PRICE_DISPLAY}</p>
              <p className="mb-1 text-sm text-muted">/ {COMPASS_PERIOD_DISPLAY}</p>
            </div>
            {/* [truth] A recurring price must state that it recurs, how to stop
                it, and link the terms it is sold under. */}
            <p className="mt-2 text-[0.8125rem] leading-relaxed text-muted">
              {RENEWAL_DISCLOSURE} {PRICE_CAVEAT}{" "}
              <a
                href={TERMS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-light underline decoration-accent/40 underline-offset-2 transition hover:decoration-accent-light"
              >
                Terms of Service
              </a>
              .
            </p>

            <ul className="mt-6 flex-1 space-y-3">
              {compassFeatures.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <Check />
                  <span className="text-sm leading-snug text-body">{f}</span>
                </li>
              ))}
            </ul>

            <div className="mt-7 flex flex-col gap-2">
              <div className="grid grid-cols-2 gap-2">
                <SmartExternalLink
                  href={APP_STORE_URL}
                  className="flex items-center justify-center gap-2 rounded-xl bg-accent py-3 text-center text-sm font-semibold text-on-accent shadow-[0_8px_32px_-8px_rgba(201,130,74,0.5)] transition hover:bg-accent-light"
                  label="Download KarmicCompass on the App Store"
                >
                  <svg width="11" height="13" viewBox="0 0 13 16" fill="currentColor" aria-hidden>
                    <path d="M10.94 8.53c-.02-2.09 1.71-3.1 1.79-3.15-1-1.44-2.54-1.64-3.09-1.66-1.31-.13-2.58.76-3.25.76-.67 0-1.69-.74-2.79-.72C2.16 3.78 .8 4.57.06 5.82-1.43 8.39-.41 12.18.99 14.07c.69.99 1.51 2.09 2.59 2.05 1.04-.04 1.43-.66 2.69-.66 1.26 0 1.61.66 2.7.64 1.12-.02 1.83-1 2.51-1.99.8-1.14 1.12-2.26 1.14-2.32-.02-.01-2.19-.85-2.69-3.29zM8.83 2.17C9.4 1.48 9.8.52 9.7-.5c-.87.04-1.92.58-2.54 1.27-.56.62-1.05 1.61-.92 2.55.97.08 1.96-.48 2.59-1.15z"/>
                  </svg>
                  App Store
                </SmartExternalLink>
                <SmartExternalLink
                  href={PLAY_STORE_URL}
                  className="flex items-center justify-center gap-2 rounded-xl bg-accent py-3 text-center text-sm font-semibold text-on-accent shadow-[0_8px_32px_-8px_rgba(201,130,74,0.5)] transition hover:bg-accent-light"
                  label="Download KarmicCompass on Google Play"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M3.18 23.76c.37.2.8.2 1.2 0l11-6.35-2.84-2.84-9.36 9.19zM.5 1.58A1.5 1.5 0 000 2.75v18.5a1.5 1.5 0 00.5 1.17l.07.06 10.36-10.36v-.24L.57 1.52.5 1.58zM20.65 10.34l-2.96-1.71-3.18 3.18 3.18 3.18 2.99-1.73a1.51 1.51 0 000-2.92zM4.38.24L15.37 6.6l-2.84 2.84L3.18.24A1.35 1.35 0 014.38.24z"/>
                  </svg>
                  Google Play
                </SmartExternalLink>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
