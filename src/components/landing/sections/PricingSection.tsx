"use client";

import { SectionReveal } from "../SectionReveal";
import { SmartExternalLink } from "../SmartExternalLink";
import { SECTION_IDS, APP_STORE_URL, TESTFLIGHT_URL } from "@/lib/constants";
import { motion, useReducedMotion } from "framer-motion";

function scrollToFaq() {
  document.getElementById(SECTION_IDS.faq)?.scrollIntoView({ behavior: "smooth" });
}

function Check() {
  return (
    <span className="mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-[#C9824A]/15 border border-[#C9824A]/25">
      <svg width="8" height="8" viewBox="0 0 12 12" fill="none" aria-hidden>
        <path d="M2.5 6l2.5 2.5 4.5-5" stroke="#C9824A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </span>
  );
}

const trialFeatures = [
  "Journal and core reflection",
  "Arya mentor in standard mode",
  "Karma and dharma overview",
  "Daily prompts and check-ins",
];

const basicFeatures = [
  "Everything in the free trial",
  "Longer period insight reports",
  "Deep Arya context & conversation history",
  "Voice reflection and transcription",
  "Advanced guidance flows",
  "Priority support",
];

export function PricingSection() {
  const reduce = useReducedMotion();

  return (
    <section
      id={SECTION_IDS.pricing}
      className="scroll-mt-20 border-b border-white/[0.04] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionReveal className="text-center">
          <p className="text-[0.65rem] uppercase tracking-[0.28em] text-[#C9824A]">
            Pricing
          </p>
          <h2 className="mt-3 font-serif text-[2.1rem] font-light leading-[1.1] tracking-[-0.02em] text-[#f5f2ed] sm:text-[2.6rem]">
            Start free. Go deeper<br />
            <span className="italic text-[#C9824A]">when you are ready.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-white/40">
            An 11-day free trial gives you the full surface of the app. Upgrade to Basic when the depth is worth it.
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
            <p className="text-[0.65rem] uppercase tracking-[0.22em] text-white/30">Free trial</p>
            <div className="mt-2 flex items-end gap-2">
              <p className="font-serif text-4xl font-light text-white/90">Free</p>
              <p className="mb-1 text-sm text-white/35">· 11 days</p>
            </div>
            <p className="mt-1 text-sm text-white/35">Full app surface. No credit card.</p>

            <ul className="mt-6 flex-1 space-y-3">
              {trialFeatures.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <Check />
                  <span className="text-sm leading-snug text-white/50">{f}</span>
                </li>
              ))}
            </ul>

            <div className="mt-7 flex flex-col gap-2">
              <SmartExternalLink
                href={APP_STORE_URL}
                className="block w-full rounded-xl border border-white/[0.12] py-3 text-center text-sm font-medium text-white/65 transition hover:border-white/[0.2] hover:bg-white/[0.04] hover:text-white/85"
                label="Download Karmic Compass on the App Store"
              >
                Download on the App Store
              </SmartExternalLink>
              <button
                type="button"
                onClick={scrollToFaq}
                className="w-full py-2 text-center text-sm text-white/28 transition hover:text-white/50"
              >
                Billing questions →
              </button>
            </div>
          </motion.div>

          {/* ── Basic ── */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 12 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex flex-col overflow-hidden rounded-2xl border border-[#C9824A]/28 bg-gradient-to-b from-[#C9824A]/[0.09] to-transparent p-7"
          >
            {/* Glow */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(201,130,74,0.1),transparent_60%)]" aria-hidden />

            {/* Recommended badge */}
            <div className="absolute right-5 top-5 rounded-full border border-[#C9824A]/30 bg-[#C9824A]/12 px-2.5 py-0.5 text-[0.58rem] font-medium uppercase tracking-[0.18em] text-[#E8A97A]">
              Recommended
            </div>

            <p className="text-[0.65rem] font-medium uppercase tracking-[0.22em] text-[#E8A97A]">Basic</p>
            <div className="mt-2 flex items-end gap-2">
              <p className="font-serif text-4xl font-light text-white/95">$11</p>
              <p className="mb-1 text-sm text-white/45">/ month</p>
            </div>
            <p className="mt-1 text-sm text-white/40">After trial. App Store pricing by region.</p>

            <ul className="mt-6 flex-1 space-y-3">
              {basicFeatures.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <Check />
                  <span className="text-sm leading-snug text-white/58">{f}</span>
                </li>
              ))}
            </ul>

            <div className="mt-7 flex flex-col gap-2">
              <SmartExternalLink
                href={APP_STORE_URL}
                className="block w-full rounded-xl bg-[#C9824A] py-3 text-center text-sm font-semibold text-white shadow-[0_8px_32px_-8px_rgba(201,130,74,0.5)] transition hover:bg-[#D9925A] hover:shadow-[0_8px_32px_-8px_rgba(201,130,74,0.65)]"
                label="Download Karmic Compass on the App Store"
              >
                Start free trial
              </SmartExternalLink>
              <SmartExternalLink
                href={TESTFLIGHT_URL}
                className="block w-full rounded-xl border border-white/[0.12] py-3 text-center text-sm font-medium text-white/55 transition hover:border-white/[0.2] hover:bg-white/[0.03] hover:text-white/75"
                label="Join the Karmic Compass TestFlight beta"
              >
                Join TestFlight beta
              </SmartExternalLink>
            </div>
          </motion.div>
        </div>

        <p className="mt-6 text-center text-[0.65rem] text-white/22">
          Pricing and entitlements may vary by platform and region · Managed via Apple In-App Purchases
        </p>
      </div>
    </section>
  );
}
