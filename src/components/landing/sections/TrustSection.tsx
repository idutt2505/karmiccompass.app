import { SectionReveal } from "../SectionReveal";
import {
  SECTION_IDS,
  MAILTO_CONTACT,
  PRIVACY_URL,
  TERMS_URL,
  isExternalUrlReady,
} from "@/lib/constants";

function DocLink() {
  const p = isExternalUrlReady(PRIVACY_URL);
  const t = isExternalUrlReady(TERMS_URL);
  if (p && t) {
    return (
      <p className="text-sm text-white/45">
        Read the{" "}
        <a
          className="text-[#C9824A] underline decoration-[#C9824A]/30 underline-offset-2 hover:decoration-[#C9824A]"
          href={PRIVACY_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          privacy policy
        </a>{" "}
        and{" "}
        <a
          className="text-[#C9824A] underline decoration-[#C9824A]/30 underline-offset-2 hover:decoration-[#C9824A]"
          href={TERMS_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          terms of service
        </a>
        .
      </p>
    );
  }
  if (p || t) {
    return (
      <p className="text-sm text-white/45">
        {p && (
          <a
            className="text-[#C9824A] underline"
            href={PRIVACY_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Privacy policy
          </a>
        )}
        {p && t ? " · " : " "}
        {t && (
          <a
            className="text-[#C9824A] underline"
            href={TERMS_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Terms
          </a>
        )}
      </p>
    );
  }
  return (
    <p className="text-sm text-white/45">
      Add public policy URLs in{" "}
      <code className="rounded bg-white/10 px-1 py-0.5 text-xs">constants.ts</code>{" "}
      when they are live, or contact{" "}
      <a className="text-[#C9824A] underline" href={MAILTO_CONTACT}>
        {MAILTO_CONTACT.replace("mailto:", "")}
      </a>{" "}
      for data questions.
    </p>
  );
}

export function TrustSection() {
  return (
    <section
      id={SECTION_IDS.trust}
      className="scroll-mt-20 border-b border-white/[0.04] bg-[#0c0c10] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
        <SectionReveal>
          <h2 className="font-serif text-3xl font-light text-[#f5f2ed] sm:text-4xl">
            Your inner life, handled with care
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/50">
            Karmic Compass is a tool for <strong className="font-medium text-white/60">emotional self-awareness</strong>{" "}
            and private journaling. It is not a medical, therapeutic, or crisis
            service, and it does not diagnose or treat any condition. If you are
            in immediate danger, contact local emergency services.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-white/45">
            We take privacy seriously: you control your words. Where features use
            cloud or AI, data is processed to deliver the product — not to resell
            your journal. Specific retention and processing details belong in
            your published policy.
          </p>
          <div className="mt-4">
            <DocLink />
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
