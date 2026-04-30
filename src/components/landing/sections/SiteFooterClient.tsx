"use client";

import { SmartExternalLink } from "../SmartExternalLink";

type Props = {
  hasPrivacy: boolean;
  hasTerms: boolean;
  privacyHref: string;
  termsHref: string;
  xHref: string;
};

export function FooterClientLinks({
  hasPrivacy,
  hasTerms,
  privacyHref,
  termsHref,
  xHref,
}: Props) {
  return (
    <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Footer">
      {hasPrivacy ? (
        <a
          className="text-xs uppercase tracking-[0.14em] text-white/35 transition hover:text-white/55"
          href={privacyHref}
          target="_blank"
          rel="noopener noreferrer"
        >
          Privacy
        </a>
      ) : (
        <SmartExternalLink
          href=""
          className="text-xs uppercase tracking-[0.14em] text-white/35 transition hover:text-white/55"
          label="Privacy policy coming soon"
        >
          Privacy
        </SmartExternalLink>
      )}
      {hasTerms ? (
        <a
          className="text-xs uppercase tracking-[0.14em] text-white/35 transition hover:text-white/55"
          href={termsHref}
          target="_blank"
          rel="noopener noreferrer"
        >
          Terms
        </a>
      ) : (
        <SmartExternalLink
          href=""
          className="text-xs uppercase tracking-[0.14em] text-white/35 transition hover:text-white/55"
          label="Terms of service coming soon"
        >
          Terms
        </SmartExternalLink>
      )}
      <a
        className="text-xs uppercase tracking-[0.14em] text-white/35 transition hover:text-white/55"
        href={xHref}
        target="_blank"
        rel="noopener noreferrer"
      >
        Updates
      </a>
    </nav>
  );
}
