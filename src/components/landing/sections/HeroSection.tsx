"use client";

import { motion, useReducedMotion } from "framer-motion";
import dynamic from "next/dynamic";
import { SECTION_IDS } from "@/lib/constants";

const DharmaWheel = dynamic(
  () => import("../DharmaWheel").then((m) => m.DharmaWheel),
  { ssr: false }
);

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
      className="relative overflow-hidden scroll-mt-0 pt-20 sm:pt-24"
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
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="w-[340px] h-[340px] sm:w-[420px] sm:h-[420px] lg:w-full lg:h-full lg:max-w-[560px] lg:max-h-[560px] lg:aspect-square">
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

          </motion.div>

        </div>
      </div>

    </section>
  );
}
