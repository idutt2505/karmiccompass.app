export const APP_NAME = "KarmicCompass" as const;

export const CONTACT_EMAIL = "app.karmiccompass@gmail.com" as const;
export const MAILTO_CONTACT = `mailto:${CONTACT_EMAIL}` as const;

export const PRIVACY_URL = "https://karmiccompass.app/privacy" as const;
export const TERMS_URL = "https://karmiccompass.app/terms" as const;
export const DELETE_ACCOUNT_URL = "/delete-account" as const;
export const APP_STORE_URL = "" as const;
export const PLAY_STORE_URL = "" as const;
export const TESTFLIGHT_URL = "" as const;

export const X_SOCIAL_URL = "https://x.com/appkarmic" as const;
export const INSTAGRAM_URL = "https://instagram.com/app.karmiccompass" as const;

// Only the sections the page actually renders. `features`, `preview`, `trust`
// and `faq` were removed along with the components behind them — they had been
// anchors pointing at sections that were never mounted in LandingPage.tsx.
export const SECTION_IDS = {
  hero: "section-hero",
  how: "section-how",
  pricing: "section-pricing",
} as const;

export type SectionId = (typeof SECTION_IDS)[keyof typeof SECTION_IDS];

export function isExternalUrlReady(
  value: string | null | undefined,
): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

// ── PRODUCT FACTS ────────────────────────────────────────────────────────────
// SINGLE SOURCE OF TRUTH for anything this site states about the product.
//
// These MUST match the app and the server. Their authorities are:
//   TRIAL_DAYS            kc-mobile/src/constants.js  TRIAL_DAYS
//                         kc-mobile/functions/index.js TRIAL_DURATION_MS
//   COMPASS_AI_PER_DAY    functions/index.js DAILY_AI_LIMIT_COMPASS
//   TRIAL_AI_PER_DAY      functions/index.js DAILY_AI_LIMIT_TRIAL
//   COMPASS_JOURNAL_PER_DAY / TRIAL_JOURNAL_PER_DAY
//                         functions/index.js DAILY_JOURNAL_COMPASS / _TRIAL
//
// This site previously hardcoded an 11-day trial and 400 messages/day in four
// separate landing sections while the server enforced 7 and 150 — a 250-message
// and 4-day over-promise on the page a buyer reads before paying. Never inline
// these numbers into copy again; import them.
export const TRIAL_DAYS = 7 as const;
export const TRIAL_AI_PER_DAY = 30 as const;
export const COMPASS_AI_PER_DAY = 150 as const;
export const TRIAL_JOURNAL_PER_DAY = 30 as const;
export const COMPASS_JOURNAL_PER_DAY = 150 as const;

// JOURNAL_MAX_CHARS, VIRTUE_LEVELS, LEVEL_THRESHOLDS and COSMIC_SCORE_COUNT
// lived here and were consumed only by FeatureShowcase and RealmSection, which
// were never mounted. They were removed with those components rather than left
// as unreferenced exports. Their reconciled values are preserved in the commit
// that deleted them; re-derive from kc-mobile before reusing, since the point of
// this block is that the numbers must match the app rather than be remembered.

// Compass is a single monthly SKU. The store is authoritative for the actual
// charged amount and currency — always defer to it in copy that quotes a price.
// kc-mobile/src/components/PremiumWall.js refuses to render a hardcoded "$11"
// for exactly this reason (App Store 3.1.1: show the price the user actually
// pays). Any place this site prints the number MUST carry PRICE_CAVEAT.
export const COMPASS_PRICE_DISPLAY = "$11" as const;
export const COMPASS_PERIOD_DISPLAY = "month" as const;
export const PRICE_CAVEAT =
  "Price shown in USD; the actual amount and currency are set by the App Store or Google Play in your region." as const;

// Recurring-billing disclosure. Required wherever a recurring price appears.
// Authority: kc-mobile/src/screens/LegalScreen.js §5 (trial does NOT auto-charge —
// "No payment method is required and you will not be charged automatically at
// the end of the trial") and §6/§5 (store-managed subscription, cancel in store).
export const RENEWAL_DISCLOSURE =
  "Auto-renewing monthly subscription. The free trial does not convert on its own and takes no payment method — you choose to subscribe when it ends. Once subscribed, billing renews every month through your App Store or Google Play account until you cancel it there, at least 24 hours before the next renewal date." as const;

// What actually happens at the end of the trial. Authority: LegalScreen.js §5
// ("your access to the App's features will be suspended until a subscription is
// activated") and functions/index.js DAILY_AI_LIMIT_NONE = 0 — there is no free
// tier to fall back to.
export const TRIAL_END_DISCLOSURE =
  `KarmicCompass has no free tier. When the ${TRIAL_DAYS}-day trial ends, access to the app's features is suspended until you subscribe.` as const;

// The operating entity, exactly as stated in the Terms and Privacy Policy
// (public/terms.html §1, public/privacy.html §1). A sole proprietorship — not
// an incorporated company. Do not print a company suffix it does not hold.
export const LEGAL_ENTITY = "Diksha Dutt (operating as KarmicCompass)" as const;
