export const APP_NAME = "Karmic Compass" as const;

export const CONTACT_EMAIL = "app.karmiccompass@gmail.com" as const;
export const MAILTO_CONTACT = `mailto:${CONTACT_EMAIL}` as const;

export const PRIVACY_URL = "https://karmiccompass.app/privacy" as const;
export const TERMS_URL = "https://karmiccompass.app/terms" as const;
export const APP_STORE_URL = "" as const;
export const PLAY_STORE_URL = "" as const;
export const TESTFLIGHT_URL = "" as const;

export const X_SOCIAL_URL = "https://x.com/CompassKarmic" as const;
export const INSTAGRAM_URL = "https://instagram.com/karmiccompass" as const;

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
