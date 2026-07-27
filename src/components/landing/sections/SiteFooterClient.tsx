"use client";

import { SmartExternalLink } from "../SmartExternalLink";

type Props = {
  privacyHref: string;
  termsHref: string;
  deleteAccountHref: string;
  xHref: string;
  instagramHref: string;
};

export function FooterClientLinks({
  privacyHref,
  termsHref,
  deleteAccountHref,
  xHref,
  instagramHref,
}: Props) {
  // These were `text-xs text-white/28` — measured 2.36:1, and 16px tall, so they
  // failed both the AA floor and the 44px touch minimum. The legal links in
  // particular are the ones a store reviewer and a buyer need to be able to find.
  const linkClass =
    "tap-target text-left text-xs text-muted transition hover:text-ink";

  return (
    <div className="flex flex-wrap items-center gap-y-1">
      {/* Legal */}
      <div className="flex gap-x-6">
        <SmartExternalLink
          href={privacyHref}
          className={linkClass}
          label="Open Privacy Policy"
        >
          Privacy Policy
        </SmartExternalLink>
        <SmartExternalLink
          href={termsHref}
          className={linkClass}
          label="Open Terms of Service"
        >
          Terms of Service
        </SmartExternalLink>
        <SmartExternalLink
          href={deleteAccountHref}
          className={linkClass}
          label="Delete your account"
        >
          Delete account
        </SmartExternalLink>
      </div>

      {/* Divider */}
      <span className="mx-8 h-3 w-px bg-white/20" aria-hidden />

      {/* Social */}
      <div className="flex gap-x-6">
        <SmartExternalLink
          href={xHref}
          className={linkClass}
          label="Follow KarmicCompass on X"
        >
          X
        </SmartExternalLink>
        <SmartExternalLink
          href={instagramHref}
          className={linkClass}
          label="Follow KarmicCompass on Instagram"
        >
          Instagram
        </SmartExternalLink>
      </div>
    </div>
  );
}
