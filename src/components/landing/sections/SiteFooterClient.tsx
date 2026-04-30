"use client";

import { SmartExternalLink } from "../SmartExternalLink";

type Props = {
  privacyHref: string;
  termsHref: string;
  xHref: string;
};

export function FooterClientLinks({ privacyHref, termsHref, xHref }: Props) {
  return (
    <div className="flex flex-wrap gap-x-6 gap-y-2">
      <SmartExternalLink
        href={privacyHref}
        className="text-left text-xs text-white/28 transition hover:text-white/55"
        label="Open Privacy Policy"
      >
        Privacy Policy
      </SmartExternalLink>
      <SmartExternalLink
        href={termsHref}
        className="text-left text-xs text-white/28 transition hover:text-white/55"
        label="Open Terms of Service"
      >
        Terms of Service
      </SmartExternalLink>
      <SmartExternalLink
        href={xHref}
        className="text-left text-xs text-white/28 transition hover:text-white/55"
        label="Follow Karmic Compass on X"
      >
        X / Twitter
      </SmartExternalLink>
    </div>
  );
}
