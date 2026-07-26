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

export const SECTION_IDS = {
  hero: "section-hero",
  features: "section-features",
  preview: "section-preview",
  how: "section-how",
  trust: "section-trust",
  pricing: "section-pricing",
  faq: "section-faq",
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

// Compass is a single monthly SKU. The store is authoritative for the actual
// charged amount and currency — always defer to it in copy that quotes a price.
export const COMPASS_PRICE_DISPLAY = "$11" as const;
export const COMPASS_PERIOD_DISPLAY = "month" as const;
