# Data Retention & TTL Policy

**Version:** 1.0 — 2026-05-28
**Owner:** Data Protection lead
**Authority:** GDPR Art. 5(1)(e) — storage limitation; CCPA §1798.100(b);
DPDPA §8(5); EU AI Act Art. 10(5).

This document maps every Firestore collection / Cloud-side store to a
retention rule. The "Mechanism" column tells you HOW expiry is enforced
today; the "Action required" column flags anything that still needs an
ops step in the Firebase Console.

## Firestore collections

| Collection | Contents | Retention | Mechanism | Action required |
|---|---|---|---|---|
| `users/{uid}` | Profile, scores, prefs, soft-delete marker | Until account deletion or 7-day grace expiry | `cleanupPendingDeletions` scheduled function (functions/index.js) | None — runs hourly. |
| `users/{uid}/entries/*` | Journal entries | Same as user doc | Deleted by `deleteUserFootprint` | None. |
| `users/{uid}/chatArchive/*` | Trimmed chat history batches | Same as user doc | Deleted by `deleteUserFootprint` | None. |
| `users/{uid}/insights/*` | AI-derived insights | Same as user doc | Deleted by `deleteUserFootprint` | None. |
| `users/{uid}/reports/*` | Generated reports | Same as user doc | Deleted by `deleteUserFootprint` | None. |
| `users/{uid}.crisisFlags[]` | Crisis-keyword markers (GDPR Art. 9) | **90 days per entry** | Scheduled `pruneCrisisFlags` (functions/index.js) | None — runs daily. |
| `feedback/{doc}` | User-submitted feedback | 365 days | **TTL policy required** on `expireAt` (auto-set by client to createdAt + 365d) | **Action required:** enable Firestore TTL on `feedback.expireAt` in Firebase Console. |
| `deletionRequests/{uid}` | OTP hash, throttle counters | 7 days | TTL policy on `expireAt` | Verify Firestore TTL policy is active. |
| `processedWebhookEvents/{eventId}` | RC webhook dedupe markers | 30 days | TTL policy on `expireAt` | Verify Firestore TTL policy is active. |
| `chatReports/{doc}` | User reports of bad AI responses | 365 days | **TTL policy required** | **Action required:** enable Firestore TTL on `chatReports.expireAt`. |
| `aiUsage/{uid}` | Per-user daily AI call counters | 60 days rolling | In-doc field pruning (functions/index.js `checkAndIncrementUsage` prunes old day keys) | None. |
| `aiUsageByDevice/{deviceHash}` | Per-device daily AI counters | 60 days rolling | Same as `aiUsage` | None. |
| `ttsUsage/{uid}` | Per-user TTS counters | 60 days rolling | Same as `aiUsage` | None. |
| `rateLimits/{uid}` | Per-uid token bucket | 24 h | TTL via `expireAt` field | Verify TTL policy. |
| `rateLimitsByIp/{ipHash}` | Per-IP-hash deletion OTP throttle | 2 h | TTL via `expireAt` field | Verify TTL policy. |
| `deviceTrials/{deviceId}` | Trial-abuse "one trial per device" marker | Indefinite — security-relevant | None | Not subject to TTL — see DPIA §3. |
| `agent_runs/{doc}` `agent_alerts/{doc}` `supportInbox/{doc}` `sla_breaches/{doc}` `appReviews/{doc}` `agentRateLimits/*` | kc-admin operational data | Per kc-admin retention | kc-admin's responsibility | See kc-admin/docs/RETENTION.md. |

## Cloud-side / third-party

| System | Contents | Retention | Mechanism | Action required |
|---|---|---|---|---|
| Firebase Auth user records | Auth identity | Until `softDeleteUser` → `cleanupPendingDeletions` | `admin.auth().deleteUser` in scheduled function | None. |
| Sentry events | Crash & breadcrumb data, hashed uid | Per Sentry org plan (default 30 / 90d) | Sentry SaaS native | `purgeExternalPii` issues a DELETE to Sentry's user-deletion API on account deletion. Set `SENTRY_AUTH_TOKEN` secret. |
| RevenueCat subscribers | Receipt + entitlement history, Firebase UID | Per RC retention | RevenueCat SaaS native | `purgeExternalPii` calls RC `DELETE /v1/subscribers/{uid}`. Set `REVENUECAT_REST_KEY` secret. |
| Expo Push Service | Push token + delivery history | Per Expo retention | Expo SaaS native | Revocation on account deletion; historical delivery records persist per Expo's terms. |
| Gmail SMTP outbound | Deletion-OTP emails | Per Google Workspace retention | Google Workspace native | Document in `SUBPROCESSORS.md`. |
| Google Cloud Logging | Function logs (uid prefix + ipHash only) | 30 days default | Cloud Logging native | None — already configured per project. |
| Vertex AI / Gemini | Chat + journal payloads | Not retained (no model training) per Google Cloud DPA | Google Cloud DPA Art. 6 | Documented in Privacy §1, §8. |

## Right-to-erasure coverage matrix

| Data category | Erased by `deleteUserFootprint`? | Notes |
|---|---|---|
| `users/{uid}` doc | ✅ | Root profile. |
| All user subcollections (entries, chatArchive, insights, reports) | ✅ | Recursive delete. |
| `feedback` referencing uid | ✅ | Deleted by uid index. |
| `chatReports` referencing uid | ✅ | Deleted by uid index. |
| `deletionRequests/{uid}` | ✅ | Deleted before final hard delete. |
| Firebase Auth user record | ✅ | `admin.auth().deleteUser` in `cleanupPendingDeletions`. |
| Sentry events | ✅ (best-effort, non-blocking) | Via `purgeExternalPii`. |
| RevenueCat subscriber | ✅ (best-effort, non-blocking) | Via `purgeExternalPii`. |
| `aiUsageByDevice/{deviceHash}` | ❌ — device hash isn't known server-side | TTL-bounded (60 days). |
| `rateLimitsByIp/{ipHash}` | ❌ — IP hash isn't known server-side | TTL-bounded (2 h). |
| `processedWebhookEvents` keyed on uid | ❌ | TTL-bounded (30 days). |
| `deviceTrials/{deviceId}` | ❌ — security-relevant | Documented in DPIA §3 as legitimate-interest retention. |
| Google Cloud Logging entries | ❌ | TTL-bounded (30 days); only contains uid prefix + ipHash. |
| Expo Push delivery history | ❌ | Per Expo's terms. |

## TTL policies to configure in Firebase Console

Action items, in priority order:

1. **`feedback.expireAt`** — create TTL policy. Without this, feedback rows live forever despite the documented 365-day retention.
2. **`chatReports.expireAt`** — same.
3. **Verify** these existing TTL policies are still active:
   - `deletionRequests.expireAt` (7d)
   - `processedWebhookEvents.expireAt` (30d)
   - `rateLimits.expireAt` (24h)
   - `rateLimitsByIp.expireAt` (2h)
4. **Set EAS secrets** so the external-PII purges actually fire:
   - `SENTRY_AUTH_TOKEN`
   - `REVENUECAT_REST_KEY`
   - `DELETION_CANCEL_SECRET`

## Change log

- **v1.0** (2026-05-28) — Initial publication. Linked from Privacy Policy §9.
