import { SectionReveal } from "../SectionReveal";
import { SECTION_IDS } from "@/lib/constants";

export function AppPreviewSection() {
  return (
    <section
      id={SECTION_IDS.preview}
      className="scroll-mt-20 border-b border-white/[0.04] bg-gradient-to-b from-[#0a0a0f] to-[#0c0c10] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionReveal>
          <h2 className="text-center font-serif text-3xl font-light text-[#f5f2ed] sm:text-4xl">
            A calmer way to look at the week
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-center text-sm text-white/45">
            The interface is built to reduce friction: write, see your line of
            thought, and open guidance when you are ready. The panels below are
            stylised mockups, not final screenshots.
          </p>
        </SectionReveal>
        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          <SectionReveal className="rounded-2xl border border-white/[0.08] bg-[#0e0e16]/80 p-5 shadow-inner backdrop-blur-sm">
            <p className="text-[0.6rem] uppercase tracking-[0.2em] text-white/30">
              Mentor
            </p>
            <div className="mt-3 space-y-2">
              <div className="rounded-lg bg-white/5 p-2 text-sm text-white/50">
                I keep postponing the honest conversation&hellip;
              </div>
              <div className="rounded-lg border border-[#C9824A]/15 bg-[#C9824A]/[0.08] p-2 text-sm text-white/70">
                What would be kind and clear in one sentence? Start there.
              </div>
            </div>
            <a
              href={`#${SECTION_IDS.features}`}
              className="mt-3 inline-block text-xs text-[#C9824A] underline decoration-[#C9824A]/30 underline-offset-2 hover:decoration-[#C9824A]"
            >
              See how mentor fits the rest of the app
            </a>
          </SectionReveal>
          <SectionReveal
            className="rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.04] p-5 backdrop-blur-sm"
            delay={0.06}
          >
            <p className="text-[0.6rem] uppercase tracking-[0.2em] text-white/30">
              This week
            </p>
            <div className="mt-4 h-2 w-3/4 rounded-full bg-white/10" />
            <div className="mt-2 h-2 w-1/2 rounded-full bg-white/5" />
            <ul className="mt-4 space-y-2 text-sm text-white/50">
              <li className="flex justify-between">
                <span>Reflections</span>
                <span className="text-white/35">5</span>
              </li>
              <li className="flex justify-between">
                <span>Score (illustrative)</span>
                <span className="text-[#C9824A]">+3</span>
              </li>
            </ul>
            <a
              href={`#${SECTION_IDS.pricing}`}
              className="mt-4 block text-center text-xs text-white/40 transition hover:text-white/60"
            >
              Deeper period reports in Premium
            </a>
          </SectionReveal>
          <SectionReveal
            className="rounded-2xl border border-white/[0.08] bg-[#0e0e16]/80 p-5 backdrop-blur-sm"
            delay={0.1}
          >
            <p className="text-[0.6rem] uppercase tracking-[0.2em] text-white/30">
              Voice
            </p>
            <p className="mt-2 font-serif text-lg text-white/70">
              Let it out first. Edit second.
            </p>
            <div className="mt-3 flex h-20 items-end rounded-xl bg-gradient-to-t from-white/5 to-transparent p-2">
              <div className="h-6 w-full rounded-md bg-white/10" />
            </div>
            <p className="mt-2 text-xs text-white/35">Illustration only</p>
            <a
              href={`#${SECTION_IDS.faq}`}
              className="mt-3 text-xs text-[#C9824A]/80 hover:underline"
            >
              How voice and text are used
            </a>
          </SectionReveal>
        </div>
        <p className="mt-8 text-center text-xs text-white/30">
          Visuals are a preview; production UI may change.
        </p>
      </div>
    </section>
  );
}
