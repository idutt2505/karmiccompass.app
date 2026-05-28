# Data Protection Impact Assessment (DPIA)

**Controller:** Diksha Dutt (operating as KarmicCompass, sole proprietor, Panchkula, Haryana, India)
**App:** Karmic Compass (iOS / Android)
**Version:** v2.2
**Date:** 2026-05-28
**DPO contact:** privacy@karmiccompass.app
**Template basis:** ICO DPIA template + GDPR Art. 35
**Status:** Living document — reviewed on each material processing change.

> **IMPORTANT:** This DPIA must be reviewed and signed off by counsel before EU launch. Re-execute the DPIA before flipping App Store / Google Play availability on for any EU/EEA/UK country, because the lawful-basis and Art. 27 representative analyses change at that point.

---

## 1. Purpose of the DPIA

We process **health-adjacent personal data** (journal entries, mood check-ins, AI-generated psychological inferences, crisis-keyword detection) at scale, route it through **third-country AI processors** (Google Vertex AI in us-central1), and produce **automated inferences** about the user's wellbeing. Under GDPR Art. 35(3)(a) and (b) this triggers mandatory DPIA. The Saudi PDPL, UAE PDPL, LGPD Art. 38, and India DPDPA 2023 §10 impose equivalent obligations.

This DPIA covers the three highest-risk processing activities:

1. **P1 — Vertex AI processing of journal & chat text.**
2. **P2 — Crisis-keyword detection (health data, GDPR Art. 9).**
3. **P3 — AI-driven karma/dharma scoring & life-digest profiling (Art. 22 automated processing).**

---

## 2. Description of processing

### P1 — Vertex AI text processing

| Element | Detail |
|---|---|
| Data categories | Journal text (up to ~30 entries × 600 chars per chat call), chat messages (≤40 turns), AI memory summaries, mood history, karma/dharma scores, profile (name, DOB, gender, country, intention), inline base64 audio (transcription), inline base64 images (vision). |
| Volume | Per user: tens to hundreds of API calls per day. Aggregate: pre-launch scale — design assumes 10k–100k MAU at GA. |
| Recipient | Google LLC via Google Cloud Vertex AI (us-central1). Fallback: Google Gemini Developer API. |
| Lawful basis | GDPR Art. 6(1)(b) contract + Art. 9(2)(a) explicit consent (for health-adjacent content). |
| Retention | Transient processing only. Vertex AI customer content excluded from Google model training per Google Cloud DPA. Proxy server (Cloud Run) does not persist content. |
| Transfer mechanism | Google Cloud Standard Contractual Clauses (SCCs). |

### P2 — Crisis-keyword detection

| Element | Detail |
|---|---|
| Data categories | First 100 characters of triggering message + timestamp, written to `users/{uid}.crisisFlags` array in Firestore. |
| Trigger | Keyword match in app code (client-side detection). Suppressed in Incognito Mode. |
| Lawful basis | GDPR Art. 9(2)(c) vital interests. |
| Retention | Auto-expire after 90 days. User-deletable via Settings → Privacy. Deleted with account. |
| User control | "Safety follow-up memory" toggle in Settings opts the user out of `crisisFlags` writes entirely (live in-session warnings remain). |

### P3 — AI-driven scoring & profiling

| Element | Detail |
|---|---|
| Inferences | Karma score, dharma score, life-digest themes, mood trajectory, unresolved emotional threads, weekly narrative, life report. |
| Generation | Automated by Vertex AI (Gemini) based on journal & chat history. |
| Effects | Personal reflection only. No legal or similarly significant effects (no impact on pricing, no third-party sharing, no employment/insurance consequences). |
| Art. 22 rights | Human review on request, plain-language explanation, contestation, deletion. Contact: privacy@karmiccompass.app. |

---

## 3. Necessity & proportionality

| Check | Assessment |
|---|---|
| Specified, explicit, legitimate purpose? | Yes — personal wellness and self-reflection are the contracted service. |
| Lawful basis identified? | Yes — Art. 6(1)(b) + Art. 9(2)(a) for P1/P3, Art. 9(2)(c) for P2. |
| Data minimisation? | Journal context capped: 30 entries × 600 chars in chat prompts, 40-message conversation window, 50 personal-note cap, 3 active commitments. Crisis flag capped at 100 chars. |
| Retention limited? | crisisFlags 90-day auto-expiry. AI usage quota cleared with account. Audio never persisted. Images never persisted. Incognito sessions never persisted. |
| Quality / accuracy? | Users can edit any journal entry, delete commitments, delete personal notes, delete crisis flags, request human review of AI inferences. |
| Information & rights? | Privacy Policy §§1, 3, 3a, 8, 9, 13, 14, 15, 17 (in-app + karmiccompass.app/privacy). |
| International transfers? | Google SCCs in place for all sub-processors. See `/privacy/SUBPROCESSORS`. |
| Processor controls? | Vertex AI customer-content exclusion from model training; Sentry redaction filter (PII keys); proxy-layer PII regex scrub before any Gemini call. |

---

## 4. Risks & mitigations

| ID | Risk | Likelihood | Severity | Residual after mitigation |
|---|---|---|---|---|
| R1 | Re-identification of journal content if a Vertex AI breach occurs. | Low | High | **Medium-Low** — proxy PII scrub for emails/phones/cards/SSNs; SCCs; Google's TLS + encryption-at-rest; no persistence at proxy or Google side per Vertex AI customer-content terms. |
| R2 | Crisis-keyword false positives stigmatise users. | Medium | Medium | **Low** — flag is stored only when not in Incognito; 100-char cap; 90-day auto-expiry; per-user opt-out toggle; never shared externally. |
| R3 | Automated profiling perceived as Art. 22(1) "significant" decision. | Low | Medium | **Low** — explicit §3a disclosure that outputs are personal-reflection-only; right to human review/explanation/contestation documented. |
| R4 | Children below local minimum age use the App and have sensitive data processed. | Medium | High | **Medium** — self-attestation at onboarding, COPPA-style deletion on report (§14). **TODO:** stronger age-gate (parental consent flow) for sub-13 users — track as separate audit. |
| R5 | Vertex AI fallback (Gemini Developer API) has weaker customer-content guarantees than Vertex AI. | Medium | Medium | **Low-Medium** — fallback used only when primary unavailable; same proxy PII scrub applies; documented in Privacy Policy §4 & §8. |
| R6 | Cross-border transfer to US challenged post-Schrems II. | Medium | Medium | **Medium** — Google SCCs + Google's published supplementary measures (encryption, restricted access, transparency reports). Monitor EDPB guidance. |
| R7 | Push token (Expo) used for tracking outside app. | Low | Low | **Low** — token is opaque per-install ID, cannot address user outside app, deleted with account. |
| R8 | IP-hash for OTP rate-limit re-identifies user. | Low | Low | **Very Low** — SHA-256 truncated to 32 hex chars, never paired with PII, retained only minutes-hours. |

---

## 5. Consultation

- **Internal:** Founder/CTO, engineering lead, this DPIA author (counsel TBC).
- **Data subjects:** Pre-launch beta cohort surveyed informally; in-app feedback channel open post-launch.
- **DPAs / supervisory authorities:** No prior consultation required (residual risk assessed as Medium, not High under GDPR Art. 36). Will consult ICO / lead supervisory authority if R6 or R4 residual moves to High.

---

## 6. Sign-off

| Role | Name | Date | Status |
|---|---|---|---|
| DPO / Privacy lead | [TBC — appoint before EU launch] | — | OPEN |
| Engineering lead | [Name] | 2026-05-28 | DRAFT |
| Legal counsel | [TBC] | — | OPEN |
| EU Art. 27 rep | Not applicable — EU/UK not served at launch | — | DEFERRED |

**Review cadence:** annually, and on any change to (a) sub-processors, (b) AI model provider, (c) crisis-keyword logic, (d) data categories collected.

---

*Generated: 2026-05-28 (v2.2). Linked from Privacy Policy §3.*
