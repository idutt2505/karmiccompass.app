/**
 * Replace empty strings with real URLs before launch.
 * Empty external URLs will open the “link coming soon” flow instead of dead hrefs.
 */
export const APP_NAME = "Karmic Compass" as const;

export const CONTACT_EMAIL = "app.karmiccompass@gmail.com" as const;
export const MAILTO_CONTACT = `mailto:${CONTACT_EMAIL}` as const;

/** Set when your public privacy policy is hosted (e.g. on karmiccompass.app). */
export const PRIVACY_URL = "" as const;

/** Set when your public terms of service is hosted. */
export const TERMS_URL = "" as const;

/** iOS App Store product page. */
export const APP_STORE_URL = "" as const;

/** TestFlight or beta invite URL. */
export const TESTFLIGHT_URL = "" as const;

export const X_SOCIAL_URL = "https://twitter.com/CompassKarmic" as const;

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
