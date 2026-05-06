import {
  APP_NAME,
  CONTACT_EMAIL,
  MAILTO_CONTACT,
  PRIVACY_URL,
  TERMS_URL,
  X_SOCIAL_URL,
} from "@/lib/constants";
import { FooterClientLinks } from "./SiteFooterClient";


export function SiteFooter() {
  return (
    <footer className="border-t border-white/[0.05] bg-[#06060a]">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        {/* Top: brand + nav columns */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">

          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#C9824A]/15 border border-[#C9824A]/25">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <circle cx="12" cy="12" r="9" stroke="#C9824A" strokeWidth="1.5"/>
                  <path d="M12 3c0 4.97-4.03 9-9 9" stroke="#C9824A" strokeWidth="1.5"/>
                  <path d="M12 21c0-4.97 4.03-9 9-9" stroke="#C9824A" strokeWidth="1.5"/>
                  <circle cx="7.5" cy="12" r="1.5" fill="#C9824A"/>
                  <circle cx="16.5" cy="12" r="1.5" fill="#C9824A"/>
                </svg>
              </span>
              <span className="font-serif text-base text-white/60">
                {APP_NAME.split(" ")[0]}{" "}
                <span className="text-[#C9824A]">{APP_NAME.split(" ")[1]}</span>
              </span>
            </div>
            <p className="mt-3 max-w-[220px] text-sm leading-relaxed text-white/28">
              Built for people who want fewer tabs and more room to think.
            </p>
          </div>

          {/* Legal */}
          <div>
            <p className="text-[0.65rem] font-medium uppercase tracking-[0.2em] text-white/28">
              Legal & privacy
            </p>
            <div className="mt-4">
              <FooterClientLinks
                privacyHref={PRIVACY_URL}
                termsHref={TERMS_URL}
                xHref={X_SOCIAL_URL}
              />
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="text-[0.65rem] font-medium uppercase tracking-[0.2em] text-white/28">
              Contact
            </p>
            <div className="mt-4 space-y-2">
              <a
                href={MAILTO_CONTACT}
                className="block text-sm text-white/38 transition hover:text-[#C9824A]"
              >
                {CONTACT_EMAIL}
              </a>
              <p className="text-xs leading-relaxed text-white/20">
                Questions, feedback, or data requests — we read every email.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/[0.04] pt-7 sm:flex-row sm:items-center">
          <p className="text-xs text-white/18">
            © {new Date().getFullYear()} KarmicCompass Private Limited. All rights reserved.
          </p>
          <p className="max-w-sm text-right text-xs leading-relaxed text-white/15">
            Not a medical, therapeutic, or crisis service.
          </p>
        </div>
      </div>
    </footer>
  );
}
