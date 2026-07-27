import {
  CONTACT_EMAIL,
  MAILTO_CONTACT,
  PRIVACY_URL,
  TERMS_URL,
  DELETE_ACCOUNT_URL,
  X_SOCIAL_URL,
  INSTAGRAM_URL,
  LEGAL_ENTITY,
} from "@/lib/constants";
import { FooterClientLinks } from "./SiteFooterClient";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/[0.05] bg-[#06060a]">
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-12">

        {/* Single row: legal + contact + copyright */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

          {/* Legal links */}
          <FooterClientLinks
            privacyHref={PRIVACY_URL}
            termsHref={TERMS_URL}
            deleteAccountHref={DELETE_ACCOUNT_URL}
            xHref={X_SOCIAL_URL}
            instagramHref={INSTAGRAM_URL}
          />

          {/* Contact */}
          <a
            href={MAILTO_CONTACT}
            className="tap-target text-sm text-body transition hover:text-accent-light"
          >
            {CONTACT_EMAIL}
          </a>

          {/* Copyright */}
          {/* [truth] Was "KarmicCompass Private Limited". No such company exists:
              public/terms.html §1 and public/privacy.html §1 both state the app is
              operated by Diksha Dutt (operating as KarmicCompass), and the Privacy
              Policy §25 identifies the controller as a sole proprietor. The buyer
              must be able to see who they are actually contracting with. */}
          {/* Was text-white/18 — 1.61:1, the least readable text on the site.
              This is the line telling a buyer who they are actually contracting
              with, so it is the last thing that should be near-invisible. */}
          <p className="text-xs text-muted sm:text-right">
            © {new Date().getFullYear()} {LEGAL_ENTITY}
          </p>
        </div>

      </div>
    </footer>
  );
}
