import { SectionReveal } from "../SectionReveal";
import { SECTION_IDS } from "@/lib/constants";

const steps = [
  {
    n: "01",
    t: "Reflect",
    p: "Capture what happened and how it felt — in a few lines, or with your voice. No performance, no perfect sentences.",
  },
  {
    n: "02",
    t: "Understand",
    p: "The app surfaces themes in your week: what you return to, what you avoid, and how that maps to the virtues you care about.",
  },
  {
    n: "03",
    t: "Grow",
    p: "Use short guidance and small practices to nudge the next day — not a transformation promise, a direction you choose.",
  },
] as const;

export function HowItWorksSection() {
  return (
    <section
      id={SECTION_IDS.how}
      className="scroll-mt-20 border-b border-white/[0.04] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionReveal>
          <h2 className="text-center font-serif text-3xl font-light text-[#f5f2ed] sm:text-4xl">
            How it works
          </h2>
          <p className="mx-auto mt-2 max-w-md text-center text-sm text-white/40">
            Three steps you repeat. Consistency over intensity.
          </p>
        </SectionReveal>
        <ol className="mt-14 grid list-none gap-6 sm:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.t}>
              <SectionReveal delay={i * 0.05}>
                <div className="relative h-full rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6">
                  <span className="font-mono text-xs text-[#C9824A]/80">
                    {s.n}
                  </span>
                  <h3 className="mt-2 font-serif text-xl text-white/90">
                    {s.t}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/45">
                    {s.p}
                  </p>
                </div>
              </SectionReveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
