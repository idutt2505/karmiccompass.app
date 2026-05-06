"use client";

import { motion, useReducedMotion } from "framer-motion";
import { DharmaWheel } from "../DharmaWheel";
import { SmartExternalLink } from "../SmartExternalLink";
import { SECTION_IDS, APP_STORE_URL, PLAY_STORE_URL } from "@/lib/constants";

function scrollToId(id: string) {
  if (typeof document === "undefined") return;
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.05 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

export function HeroSection() {
  const reduce = useReducedMotion();

  return (
    <section
      id={SECTION_IDS.hero}
      className="relative min-h-screen overflow-hidden scroll-mt-0 pt-20 sm:pt-24"
    >
      {/* ── Layered background ── */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {/* fine grid */}
        <div
          className="absolute inset-0 opacity-[0.028]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(245,242,237,1) 1px, transparent 1px), linear-gradient(90deg, rgba(245,242,237,1) 1px, transparent 1px)",
            backgroundSize: "68px 68px",
          }}
        />
        {/* primary amber glow top-center */}
        <div className="absolute -top-48 left-1/2 h-[780px] w-[1000px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(201,130,74,0.17),transparent_65%)]" />
        {/* warm gold left glow */}
        <div className="absolute top-1/4 -left-24 h-[500px] w-[600px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(180,100,45,0.08),transparent_70%)]" />
        {/* cool purple-blue right glow */}
        <div className="absolute bottom-0 right-0 h-[500px] w-[700px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(90,60,160,0.07),transparent_68%)]" />
        {/* bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#0a0a0f] to-transparent" />
      </div>

      {/* ── Main grid ── */}
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-8 pb-20 lg:grid-cols-2 lg:gap-20 lg:pb-32 xl:gap-28">

          {/* ── Left (desktop) / Below (mobile): dharma wheel ── */}
          <motion.div
            className="flex justify-center items-center order-1 lg:order-1 lg:self-stretch"
            initial={reduce ? false : { opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] lg:w-full lg:h-full lg:max-w-[560px] lg:max-h-[560px] lg:aspect-square">
              <DharmaWheel />
            </div>
          </motion.div>

          {/* ── Right (desktop) / Below (mobile): copy ── */}
          <motion.div
            className="order-2 lg:order-2 text-center lg:text-left"
            variants={reduce ? undefined : stagger}
            initial={reduce ? false : "hidden"}
            animate="show"
          >
            {/* Tagline */}
            <motion.div
              variants={reduce ? undefined : fadeUp}
              className="mt-5 flex items-center justify-center lg:justify-start gap-4"
            >
              <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#C9824A]" />
              <span className="font-mono text-[0.72rem] uppercase tracking-[0.5em] text-[#C9824A] drop-shadow-[0_0_12px_rgba(201,130,74,0.6)]">
                Chaos to Clarity
              </span>
              <span className="h-px w-10 bg-gradient-to-l from-transparent to-[#C9824A]" />
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={reduce ? undefined : fadeUp}
              className="mt-7 font-serif font-light leading-[1.03] tracking-[-0.03em] text-[#f5f2ed]"
              style={{ fontSize: "clamp(2rem, 3.8vw, 4.2rem)" }}
            >
              Where reflection becomes<br />
              <span className="italic text-[#C9824A]">direction.</span>
            </motion.h1>

            {/* Sub */}
            <motion.p
              variants={reduce ? undefined : fadeUp}
              className="mt-7 max-w-[440px] mx-auto lg:mx-0 text-[1.05rem] leading-[1.75] text-white/48 sm:text-lg"
            >
              A private space to write, reflect, and understand the patterns shaping your life.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={reduce ? undefined : fadeUp}
              className="mt-9 flex flex-wrap items-center justify-center lg:justify-start gap-3"
            >
              {/* iOS */}
              <SmartExternalLink
                href={APP_STORE_URL}
                className="inline-flex items-center gap-2.5 rounded-xl bg-[#C9824A] px-6 py-3.5 text-sm font-medium text-white shadow-[0_12px_40px_-10px_rgba(201,130,74,0.55)] transition duration-200 hover:bg-[#D9925A] hover:shadow-[0_12px_40px_-10px_rgba(201,130,74,0.7)] active:scale-[0.98]"
                label="Download Karmic Compass on the App Store"
              >
                <svg width="13" height="16" viewBox="0 0 13 16" fill="currentColor" aria-hidden>
                  <path d="M10.94 8.53c-.02-2.09 1.71-3.1 1.79-3.15-1-1.44-2.54-1.64-3.09-1.66-1.31-.13-2.58.76-3.25.76-.67 0-1.69-.74-2.79-.72C2.16 3.78 .8 4.57.06 5.82-1.43 8.39-.41 12.18.99 14.07c.69.99 1.51 2.09 2.59 2.05 1.04-.04 1.43-.66 2.69-.66 1.26 0 1.61.66 2.7.64 1.12-.02 1.83-1 2.51-1.99.8-1.14 1.12-2.26 1.14-2.32-.02-.01-2.19-.85-2.69-3.29zM8.83 2.17C9.4 1.48 9.8.52 9.7-.5c-.87.04-1.92.58-2.54 1.27-.56.62-1.05 1.61-.92 2.55.97.08 1.96-.48 2.59-1.15z"/>
                </svg>
                App Store
              </SmartExternalLink>

              {/* Android */}
              <SmartExternalLink
                href={PLAY_STORE_URL}
                className="inline-flex items-center gap-2.5 rounded-xl border border-white/[0.12] bg-white/[0.04] px-6 py-3.5 text-sm font-medium text-white/70 transition duration-200 hover:border-white/[0.2] hover:bg-white/[0.07] hover:text-white/90 active:scale-[0.98]"
                label="Download Karmic Compass on Google Play"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M3.18 23.76c.37.2.8.2 1.2 0l11-6.35-2.84-2.84-9.36 9.19zM.5 1.58A1.5 1.5 0 000 2.75v18.5a1.5 1.5 0 00.5 1.17l.07.06 10.36-10.36v-.24L.57 1.52.5 1.58zM20.65 10.34l-2.96-1.71-3.18 3.18 3.18 3.18 2.99-1.73a1.51 1.51 0 000-2.92zM4.38.24L15.37 6.6l-2.84 2.84L3.18.24A1.35 1.35 0 014.38.24z"/>
                </svg>
                Google Play
              </SmartExternalLink>

              <button
                type="button"
                onClick={() => scrollToId(SECTION_IDS.features)}
                className="inline-flex items-center gap-2 rounded-xl border border-white/[0.08] bg-transparent px-5 py-3.5 text-sm text-white/45 transition duration-200 hover:border-white/[0.15] hover:text-white/70"
              >
                Explore features
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M6 9l6 6 6-6"/>
                </svg>
              </button>
            </motion.div>

          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/20"
        initial={reduce ? false : { opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.6 }}
      >
        <span className="text-[0.6rem] uppercase tracking-[0.25em]">Scroll</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
          <path d="M12 5v14M5 12l7 7 7-7"/>
        </svg>
      </motion.div>
    </section>
  );
}
