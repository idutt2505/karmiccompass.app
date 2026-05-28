# Records of Processing Activities (RoPA)

**Controller:** Diksha Dutt (operating as KarmicCompass, sole proprietor, Panchkula, Haryana, India)
**Article:** GDPR Art. 30 (and equivalent obligations under UK GDPR, LGPD Art. 37, India DPDPA, UAE PDPL).
**Version:** v2.2
**Date:** 2026-05-28
**Maintainer:** privacy@karmiccompass.app

> One row per processing purpose. Cross-references to Privacy Policy section numbers in brackets.

| # | Purpose | Lawful basis | Data categories | Data subjects | Recipients (sub-processors) | Retention | Transfers / safeguards |
|---|---|---|---|---|---|---|---|
| 1 | **Account creation & authentication** [§1.A] | Art. 6(1)(b) contract | Name, email, DOB, gender, country, intention, Firebase UID, Google/Apple ID tokens | App users | Firebase Auth (Google LLC, us-central1) | Active account lifetime; deleted on account deletion | US — Google SCCs |
| 2 | **Journal & chat persistence** [§1.B] | Art. 6(1)(b) contract + Art. 9(2)(a) explicit consent | Journal text, chat messages, archived chat, commitments, personal notes, starred messages, daily intention | App users | Firestore (Google LLC, us-central1) | Active account lifetime; deleted on account deletion | US — Google SCCs |
| 3 | **AI inference generation (Arya chat, journal analysis, daily insight, memory)** [§1.C, §4] | Art. 6(1)(b) contract + Art. 9(2)(a) explicit consent | Profile + journal + chat context sent transiently to AI model (see §4 schema) | App users | Google Cloud Vertex AI (primary, us-central1), Google Gemini Developer API (fallback) via Cloud Run proxy | Transient; not persisted by Vertex AI per Google Cloud DPA; proxy does not persist | US — Google SCCs |
| 4 | **Voice transcription** [§1.F, §4] | Art. 6(1)(b) contract | Base64 audio (≤single recording), no profile data | App users | Vertex AI / Gemini Developer API via proxy | Transient; audio deleted from device immediately after request; never stored server-side | US — Google SCCs |
| 5 | **Image (Vision) analysis** [§1.G, §4] | Art. 6(1)(b) contract + Art. 9(2)(a) if image is health-context | Base64 image (resized ≤1024×1024) | App users | Vertex AI / Gemini Developer API via proxy | Transient; not persisted server-side | US — Google SCCs |
| 6 | **Crisis-keyword detection & safety follow-up** [§1.H, §3, §9] | Art. 9(2)(c) vital interests | First 100 chars of triggering message + timestamp (`crisisFlags`) | App users (non-Incognito) | Firestore (Google LLC) | 90-day auto-expiry; deleted with account; user-deletable; per-user opt-out | US — Google SCCs |
| 7 | **Wellness scoring & inference storage** (karma, dharma, life digest, narratives, reports) [§1.C, §1.D] | Art. 6(1)(b) contract + Art. 9(2)(a) | Numeric scores, narrative text, emotional themes | App users | Firestore (Google LLC) | Active account lifetime; deleted with account | US — Google SCCs |
| 8 | **Trial enforcement** [§1.I] | Art. 6(1)(f) legitimate interest (fraud prevention) | Stable pseudonymous device ID (Keychain/Keystore-backed); deviceTrials/{deviceId} document | App users | Firestore (Google LLC) | Active account lifetime; cleared on account deletion (device-side persists until OS reset) | US — Google SCCs |
| 9 | **Subscription management** [§1.O, Terms §4] | Art. 6(1)(b) contract + Art. 6(1)(c) legal obligation (tax) | Firebase UID, RevenueCat user mapping, receipt data, subscription status | Subscribed users | RevenueCat (RevenueCat, Inc., US); Apple App Store; Google Play | Active subscription + 7 years (financial / tax law) | US — RevenueCat DPA + SCCs; Apple/Google standard terms |
| 10 | **Push notifications (Compass)** [§1.M, §8] | Art. 6(1)(a) consent (notification permission) | Expo Push Token + historical token array; notification body (generic) | Opted-in users | Expo Push Service (Expo, Inc., US); APNs (Apple, US); FCM (Google, US) | Active account lifetime; deleted with account; opt-out via Settings | US — Expo Terms + SCCs |
| 11 | **Crash & error monitoring** [§8] | Art. 6(1)(f) legitimate interest (App stability) | SHA-256-pseudonymised UID (16 hex), stack traces (PII-key redacted), truncated messages (≤120 chars) | App users (errors only) | Sentry (Functional Software, Inc., US) | Per Sentry retention (typically 90 days) | US — Sentry DPA + SCCs |
| 12 | **Account-deletion OTP delivery** [§1.R, §11] | Art. 6(1)(c) legal obligation (right to erasure) + Art. 6(1)(b) | Email address, OTP, expiry timestamp; SHA-256 truncated IP-hash for rate-limit | Users requesting locked-out deletion | Gmail / Google Workspace SMTP (Google LLC, US); Firestore | OTP ≤15 min; IP-hash minutes-hours | US — Google Workspace DPA + SCCs |
| 13 | **In-app feedback** [§1.P] | Art. 6(1)(f) legitimate interest (product improvement) | Message text (≤1,000 chars), star rating, Firebase UID, timestamp | Users who submit feedback | Firestore (Google LLC) | Up to 2 years | US — Google SCCs |
| 14 | **AI usage quota enforcement** [§1.Q] | Art. 6(1)(b) contract + Art. 6(1)(f) (rate-limit / fraud) | Daily call counts per UID per date | App users | Firestore (Google LLC) | Active account lifetime; deleted with account | US — Google SCCs |
| 15 | **EU/UK 14-day withdrawal waiver consent** [Terms §6] | Art. 6(1)(a) consent + Art. 6(1)(c) (record-keeping under CRD) | Consent flag, timestamp, Terms version | EU/EEA/UK subscribers at first paid charge | Firestore (Google LLC) | 7 years (consumer law evidentiary period) | US — Google SCCs |
| 16 | **Mindfulness audio streaming** | Art. 6(1)(b) contract | No personal data (read-only public asset) | App users | Firebase Storage (Google LLC) | n/a | US — Google SCCs |
| 17 | **Support correspondence** [§9] | Art. 6(1)(b) + Art. 6(1)(f) | Email content, sender address | Users who contact support | Google Workspace (Google LLC) | Up to 2 years after resolution | US — Google Workspace DPA + SCCs |

---

## Controller details

- **Legal name:** Diksha Dutt (operating as KarmicCompass, sole proprietor — Pvt Ltd registration pending)
- **Address:** Panchkula, Haryana, India
- **Privacy contact:** privacy@karmiccompass.app
- **DPO / Privacy lead:** Diksha Dutt (function held by the controller; reassess if scale or risk increases)
- **Grievance Officer (India — DPDPA / SPDI Rules):** Diksha Dutt, app.karmiccompass@gmail.com (subject: GRIEVANCE)
- **EU Art. 27 representative:** Not applicable — KarmicCompass is not currently offered in the EU/EEA. To be appointed before any EU launch.
- **UK Art. 27 representative:** Not applicable — KarmicCompass is not currently offered in the UK. To be appointed before any UK launch.

## Joint controller / processor relationships

- We are a **controller** for all processing in this RoPA.
- **Google LLC** (Firebase, Vertex AI, Cloud Run, Cloud Functions, Workspace) acts as **processor** under the Google Cloud DPA.
- **RevenueCat, Sentry, Expo** act as **processors** under their respective DPAs.
- **Apple Inc.** and **Google LLC (Google Play)** act as **independent controllers** for billing transactions.

## Security measures (Art. 32 summary)

- TLS in transit; AES at rest (Google-managed).
- Firebase Authentication with email/password, Google Sign-In, Apple Sign-In.
- Firestore Security Rules restrict reads/writes to authenticated owner.
- App Check on callable Cloud Functions (ENFORCE_APP_CHECK = true on 3 callables).
- Secret rotation runbook at `docs/secret-rotation-runbook.md`.
- Sentry redacts ~25 sensitive key patterns before send; UIDs pseudonymised.
- Proxy-layer regex PII scrub before any Gemini call.
- Screen-capture blocked on Journal, Arya Chat, Arya Memory, Passcode.

---

*Generated: 2026-05-28 (v2.2). Update on every new processing activity, sub-processor, or data category.*
