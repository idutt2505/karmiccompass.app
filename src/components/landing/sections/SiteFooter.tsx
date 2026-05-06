import {
  CONTACT_EMAIL,
  MAILTO_CONTACT,
  PRIVACY_URL,
  TERMS_URL,
  X_SOCIAL_URL,
  INSTAGRAM_URL,
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
            xHref={X_SOCIAL_URL}
            instagramHref={INSTAGRAM_URL}
          />

          {/* Contact */}
          <a
            href={MAILTO_CONTACT}
            className="text-sm text-white/38 transition hover:text-[#C9824A]"
          >
            {CONTACT_EMAIL}
          </a>

          {/* Copyright */}
          <p className="text-xs text-white/18 sm:text-right">
            © {new Date().getFullYear()} KarmicCompass Private Limited
          </p>
        </div>

      </div>
    </footer>
  );
}
