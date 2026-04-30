"use client";

import { SectionReveal } from "../SectionReveal";
import { SmartExternalLink } from "../SmartExternalLink";
import {
  SECTION_IDS,
  APP_STORE_URL,
  TESTFLIGHT_URL,
  isExternalUrlReady,
} from "@/lib/constants";
import { motion, useReducedMotion } from "framer-motion";

function scrollToFaq() {
  document
    .getElementById(SECTION_IDS.faq)
    ?.scrollIntoView({ behavior: "smooth" });
}

export function PricingSection() {
  const reduce = useReducedMotion();
  return (
    <section
      id={SECTION_IDS.pricing}
      className="scroll-mt-20 border-b border-white/[0.04] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <SectionReveal>
          <h2 className="text-center font-serif text-3xl font-light text-[#f5f2ed] sm:text-4xl">
            Premium, when you are ready
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-center text-sm text-white/45">
            A free experience lets you explore. Premium deepens the loop:
            longer reports, richer mentor context, and voice when you need it
            more often.
          </p>
        </SectionReveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 8 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4 }}
            whileHover={reduce ? undefined : { y: -2 }}
            className="flex flex-col rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6"
          >
            <p className="text-xs uppercase tracking-[0.16em] text-white/30">
              Trial
            </p>
            <p className="mt-1 font-serif text-3xl text-white/90">Free</p>
            <p className="mt-1 text-sm text-white/40">11 days, full app surface</p>
            <ul className="mt-4 flex-1 space-y-1.5 text-sm text-white/50">
              <li>— Journal and core reflection</li>
              <li>— Mentor in standard mode</li>
              <li>— Karma / dharma overview (illustrative in UI)</li>
            </ul>
            <div className="mt-4 flex flex-col gap-2">
              <SmartExternalLink
                href={APP_STORE_URL}
                className="block w-full rounded-xl border border-white/15 py-2.5 text-center text-sm text-white/70 transition hover:bg-white/5"
                label="Open App Store"
              >
                {isExternalUrlReady(APP_STORE_URL) ? "Open in App Store" : "App Store link (soon)"}
              </SmartExternalLink>
              <button
                type="button"
                className="w-full rounded-xl border border-transparent py-2 text-center text-sm text-white/40 hover:text-white/60"
                onClick={scrollToFaq}
              >
                How billing works
              </button>
            </div>
          </motion.div>
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 8 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            whileHover={reduce ? undefined : { y: -2 }}
            className="flex flex-col rounded-2xl border border-[#C9824A]/30 bg-gradient-to-b from-[#C9824A]/[0.1] to-transparent p-6"
          >
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#E8A97A]">
              Basic · from $11 / mo
            </p>
            <p className="mt-2 font-serif text-2xl text-white/95">Deeper path</p>
            <p className="mt-1 text-sm text-white/50">
              Premium reporting, long-form mentor memory, voice sessions, and
              advanced guidance flows — as shipped in the product.
            </p>
            <ul className="mt-3 flex-1 space-y-1.5 text-sm text-white/55">
              <li>— Longer “period” insight reports</li>
              <li>— Deeper Arya context and conversation history (per app)</li>
              <li>— Full voice &amp; advanced mode where enabled</li>
            </ul>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
              <SmartExternalLink
                href={APP_STORE_URL}
                className="flex-1 min-w-[140px] rounded-xl bg-[#C9824A] py-2.5 text-center text-sm font-medium text-white transition hover:bg-[#E8A97A]"
                label="Download on the App Store"
              >
                App Store
              </SmartExternalLink>
              <SmartExternalLink
                href={TESTFLIGHT_URL}
                className="flex-1 min-w-[140px] rounded-xl border border-white/20 py-2.5 text-center text-sm text-white/75 transition hover:bg-white/5"
                label="Join TestFlight"
              >
                {isExternalUrlReady(TESTFLIGHT_URL)
                  ? "TestFlight"
                  : "TestFlight (soon)"}
              </SmartExternalLink>
              <a
                href={`#${SECTION_IDS.faq}`}
                className="flex-1 min-w-full rounded-xl border border-white/15 py-2.5 text-center text-sm text-white/55 transition hover:bg-white/5 sm:min-w-0"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToFaq();
                }}
              >
                Plan &amp; billing questions
              </a>
            </div>
          </motion.div>
        </div>
        <p className="mt-6 text-center text-xs text-white/30">
          Pricing and entitlements in the app may vary by platform and region.
        </p>
      </div>
    </section>
  );
}
