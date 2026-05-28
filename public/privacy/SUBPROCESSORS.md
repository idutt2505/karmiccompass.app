# Sub-Processor Register

**Controller:** Diksha Dutt (operating as KarmicCompass, sole proprietor, Panchkula, Haryana, India)
**Version:** v2.2
**Effective from:** 2026-05-28
**Maintainer:** privacy@karmiccompass.app
**Update policy:** users will be notified of any new sub-processor at least 7 days before processing begins, via in-app notice or email (Privacy Policy §16).

This register is the authoritative version of Privacy Policy §8. Where the two diverge, this register controls (and §8 will be updated).

---

## Active sub-processors

| # | Provider | Entity | Service | Purpose | Data shared | Location | Transfer mechanism | Added |
|---|---|---|---|---|---|---|---|---|
| 1 | Firebase / Google Cloud | Google LLC | Firebase Auth, Firestore, Cloud Storage, Cloud Run, Cloud Functions, App Check | Core infrastructure: authentication, primary database, file storage, server-side compute, abuse protection | All profile, journal, chat, AI inference, wellness, preference, subscription, feedback, deletion-OTP, and abuse-prevention IP-hash data | us-central1 (United States) | Google Cloud Standard Contractual Clauses (SCCs) — cloud.google.com/terms/data-processing-addendum | 2025 (initial) |
| 2 | Google Cloud Vertex AI | Google LLC | Vertex AI (Gemini family models) | Primary AI provider — chat responses, journal analysis, voice transcription, image (Vision) analysis, daily insights, weekly narratives, life reports, memory updates, horoscopes, quiz generation | Transient prompt content per Privacy Policy §4. Customer content excluded from Google model training per Google Cloud DPA | us-central1 (United States) | Google Cloud SCCs | 2025 |
| 3 | Google Gemini Developer API | Google LLC | Gemini Developer API | **Fallback** AI provider when Vertex AI is unavailable | Same as #2 | United States | Google API Services User Data Policy / Google's standard terms | 2025 |
| 4 | RevenueCat | RevenueCat, Inc. | Subscription management & entitlement verification | Process subscription events from Apple/Google; expose entitlement state; restore-purchases | Firebase UID (as RevenueCat app user ID); receipt data from Apple App Store / Google Play; subscription status | United States | RevenueCat DPA + SCCs — revenuecat.com/dpa | 2025 |
| 5 | Sentry | Functional Software, Inc. (d/b/a Sentry) | Crash & error monitoring | Triage app stability; debug regressions | SHA-256-pseudonymised Firebase UID (16 hex chars); stack traces with sensitive-key redaction (~25 patterns); truncated error messages (≤120 chars). **Never:** journal content, chat messages, audio, images | United States | Sentry DPA + SCCs — sentry.io/legal/dpa/ | 2025 |
| 6 | Expo Push Notification Service | Expo, Inc. | Push notification relay | Deliver Compass push notifications to APNs (iOS) / FCM (Android) | Expo Push Token (opaque per-install ID); notification title and body (generic copy, no personal content) | United States | Expo Terms of Service + SCCs — expo.dev/terms | 2026-05-28 (formalised) |
| 7 | Gmail / Google Workspace SMTP | Google LLC | Server-side outbound email | Send account-deletion OTP emails; send support correspondence | User's registered email address; OTP code; message text | United States | Google Workspace DPA + SCCs — workspace.google.com/terms/dpa_terms.html | 2025 |
| 8 | Apple App Store In-App Purchase | Apple Inc. | iOS distribution & billing | Process iOS subscriptions; deliver app updates | Per Apple's terms (we do not see card details) | Per Apple's privacy policy | Apple Developer Program License Agreement & Apple's privacy policy | 2025 |
| 9 | Google Play In-App Billing | Google LLC | Android distribution & billing | Process Android subscriptions; deliver app updates | Per Google Play terms (we do not see card details) | Per Google | Google Play Developer Distribution Agreement | 2025 |

### Auxiliary providers (not handling personal data beyond device IP / network metadata)

| Provider | Entity | Service | Purpose | Location |
|---|---|---|---|---|
| Google Fonts CDN | Google LLC | Web font CDN | Deliver app fonts at startup | United States |
| Google Sign-In | Google LLC | OAuth | Optional sign-in | United States |
| Apple Sign-In | Apple Inc. | OAuth | Optional sign-in (iOS) | per Apple |

---

## Inactive / removed sub-processors

*(none as of 2026-05-28)*

---

## Pending additions (not yet active)

| Provider | Service | Notes |
|---|---|---|
| EU/UK Art. 27 representative | GDPR representative | **TODO:** appoint Prighter, VeraSafe, or equivalent before EU launch |

---

## Change log

### 2026-05-28 — v2.2
- Formalised Expo Push Service entry (previously implicit in Privacy Policy §8).
- Added Gmail/Google Workspace SMTP as explicit sub-processor (previously footnoted).
- Separated Google Cloud Vertex AI (primary) from Google Gemini Developer API (fallback) — they have different terms.
- Added Apple App Store IAP and Google Play IAB as explicit independent controllers / billing processors.
- Aligned column structure to GDPR Art. 30(2) processor requirements.

### 2025 — initial register
- Firebase, Vertex AI, Gemini Developer API, RevenueCat, Sentry, Apple App Store, Google Play, Google Fonts, Google Sign-In, Apple Sign-In.

---

*Maintained at karmiccompass.app/privacy/SUBPROCESSORS. Source of truth for Privacy Policy §8.*
