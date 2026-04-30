import {
  APP_NAME,
  CONTACT_EMAIL,
  MAILTO_CONTACT,
  PRIVACY_URL,
  TERMS_URL,
  X_SOCIAL_URL,
  isExternalUrlReady,
} from "@/lib/constants";
import { SectionReveal } from "../SectionReveal";
import { FooterClientLinks } from "./SiteFooterClient";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#06060a] py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 sm:px-6 sm:flex-row sm:items-end sm:justify-between">
        <SectionReveal>
          <p className="font-serif text-lg text-white/50">
            {APP_NAME.split(" ")[0]}{" "}
            <span className="text-[#C9824A]">{APP_NAME.split(" ")[1]}</span>
          </p>
          <p className="mt-1 max-w-sm text-sm text-white/30">
            Built for people who want fewer tabs and more room to think.
          </p>
        </SectionReveal>
        <FooterClientLinks
          hasPrivacy={isExternalUrlReady(PRIVACY_URL)}
          hasTerms={isExternalUrlReady(TERMS_URL)}
          privacyHref={PRIVACY_URL}
          termsHref={TERMS_URL}
          xHref={X_SOCIAL_URL}
        />
        <div className="text-right text-xs text-white/20">
          <a className="hover:text-white/35" href={MAILTO_CONTACT}>
            {CONTACT_EMAIL}
          </a>
        </div>
      </div>
    </footer>
  );
}
