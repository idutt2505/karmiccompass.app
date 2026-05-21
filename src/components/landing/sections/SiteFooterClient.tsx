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
  return (
    <div className="flex flex-wrap items-center gap-y-2">
      {/* Legal */}
      <div className="flex gap-x-6">
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
          href={deleteAccountHref}
          className="text-left text-xs text-white/28 transition hover:text-white/55"
          label="Delete your account"
        >
          Delete account
        </SmartExternalLink>
      </div>

      {/* Divider */}
      <span className="mx-8 h-3 w-px bg-white/15" />

      {/* Social */}
      <div className="flex gap-x-6">
        <SmartExternalLink
          href={xHref}
          className="text-left text-xs text-white/28 transition hover:text-white/55"
          label="Follow KarmicCompass on X"
        >
          X
        </SmartExternalLink>
        <SmartExternalLink
          href={instagramHref}
          className="text-left text-xs text-white/28 transition hover:text-white/55"
          label="Follow KarmicCompass on Instagram"
        >
          Instagram
        </SmartExternalLink>
      </div>
    </div>
  );
}
