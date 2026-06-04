# Personal Data Breach Runbook — 72-Hour Decision Tree

**Controller:** Diksha Dutt (operating as KarmicCompass, sole proprietor, Panchkula, Haryana, India)
**Statutory basis:** GDPR Art. 33 (controller → supervisory authority, 72 hours), Art. 34 (controller → data subject, "without undue delay" where high risk). UK GDPR equivalents. India DPDPA 2023 §8(6). LGPD Art. 48. UAE PDPL Art. 9. Saudi PDPL Art. 20.
**Version:** v1.1
**Date:** 2026-05-28
**Owner:** privacy@karmiccompass.app

> **T0 = the moment any team member becomes aware of facts that could indicate a personal data breach.** The 72-hour Art. 33 clock starts at T0 (controller awareness), not at confirmation.

---

## 1. Roles (RACI)

| Role | Person | Responsibility |
|---|---|---|
| **Incident Lead** | Engineering lead on call | Coordinate response, single point of communication. **Accountable** for the runbook. |
| **Privacy Lead** | Founder / DPO once appointed | Triage law applicability, draft supervisory-authority notification, draft user notification. **Responsible** for Art. 33 / 34. |
| **Eng Responders** | On-call engineer(s) | Contain, investigate, evidence-preserve, remediate. |
| **Legal Counsel** | External counsel (TBC — appoint pre-EU-launch) | Review notification text; advise on jurisdictional triggers. **Consulted**. |
| **EU/UK Art. 27 reps** | [TBC — Prighter/VeraSafe] | Mirror notification to EU/UK DPAs as required. **Consulted**. |
| **Founder / CEO** | Founder | Sign-off on user-facing comms. **Informed**. |
| **Comms / Support** | Support inbox owner | Handle inbound user queries; deploy holding statement. **Informed**. |

24×7 escalation: page Engineering Lead → if no response in 15 min, page Founder.

---

## 2. Triage decision tree (T0 → T+24h)

```
T0  Awareness of potential breach
 │
 ├─ Step 1 (T0 → T+1h):  CONTAIN
 │     • Revoke compromised credentials / tokens.
 │     • Rotate affected Firebase service keys (see docs/secret-rotation-runbook.md).
 │     • Disable affected Cloud Function or proxy endpoint via deploy pipeline.
 │     • Lock down affected Firestore collections via temporary security rule.
 │     • Page Incident Lead + Privacy Lead.
 │
 ├─ Step 2 (T+1h → T+6h):  ASSESS
 │     Q1  Is personal data involved?            → No  →  Document and close (no Art. 33 trigger).
 │                                              → Yes →  continue.
 │     Q2  What categories?
 │           ☐ Account & identity (§1.A)
 │           ☐ Journal/chat content (§1.B)        ← health-adjacent / Art. 9
 │           ☐ AI inferences (§1.C)               ← health-adjacent / Art. 9
 │           ☐ Crisis flags (§1.H)                ← health data / Art. 9 — HIGH RISK
 │           ☐ Passcode / biometrics              ← HIGH RISK
 │           ☐ Push tokens (§1.M)                 ← LOW RISK
 │           ☐ IP-hash (§1.N)                     ← LOW RISK (irreversible)
 │           ☐ Subscription / billing             ← MEDIUM RISK
 │     Q3  How many data subjects affected?       → record count and jurisdictions.
 │     Q4  Is it confidentiality, integrity, or availability?
 │     Q5  Is data encrypted / pseudonymised in a way that meaningfully reduces risk?
 │     Q6  Is the breach contained, or ongoing?
 │
 ├─ Step 3 (T+6h → T+24h):  RISK CLASSIFY
 │     LOW    — unauthorised access without exfiltration; encrypted data with intact keys; pseudonymous-only data.
 │     MED    — limited exfiltration of non-special-category data of identifiable users.
 │     HIGH   — exfiltration of Art. 9 health data (journal/chat/crisis flags), credentials, large-scale
 │              identifiable data, or facts suggesting risk of fraud, identity theft, financial loss, reputational
 │              damage, discrimination, or psychological harm.
 │
 ├─ Step 4 (T+24h → T+48h):  NOTIFY DPAs (Art. 33)
 │     IF risk ≥ LOW (any "likely to result in a risk to rights and freedoms"):
 │       → Notify lead supervisory authority within 72h of T0.
 │       → Use the user-notification template in §4.
 │       → For EU residents: notify via Art. 27 representative; in absence, lead DPA in member state of most
 │         affected residents (typically the user's country DPA).
 │       → For UK residents: ICO (ico.org.uk) within 72h.
 │       → For India residents: Data Protection Board of India (once operational) per DPDPA §8(6).
 │       → For Brazil: ANPD (gov.br/anpd).
 │       → For UAE: UAE Data Office (dataoffice.ae).
 │       → For Saudi Arabia: NDMO (ndmo.gov.sa).
 │       → For Singapore: PDPC (pdpc.gov.sg) if "significant" breach (≥500 individuals or any sensitive data).
 │       → For Australia: OAIC (oaic.gov.au) if "likely to result in serious harm".
 │       → For Canada: OPC (priv.gc.ca) if "real risk of significant harm".
 │       → For California (CCPA breach notice law): notify AG if ≥500 California residents affected by
 │         unauthorised acquisition of personal information.
 │     IF unable to provide all info within 72h: send phased notification (initial → updates → final).
 │
 └─ Step 5 (T+24h → without undue delay):  NOTIFY USERS (Art. 34)
       IF risk = HIGH (likely to result in HIGH risk to rights and freedoms):
         → Email affected users at the registered address.
         → Use the user-notification template in §4.
         → Include: nature of breach, contact, likely consequences, measures taken, recommendations.
       IF risk < HIGH but DPAs require: comply.
       IF technical / organisational measures rendered data unintelligible (e.g. strong encryption with keys safe):
         Art. 34 user notification may not be required — document the analysis.
```

---

## 3. Supervisory-authority contacts

| Jurisdiction | Authority | Web | Notice channel |
|---|---|---|---|
| EU lead (TBC by user base) | National DPA — typically of member state of most affected residents | edpb.europa.eu | DPA online form |
| UK | Information Commissioner's Office | ico.org.uk | ico.org.uk/for-organisations/report-a-breach/ |
| India | Data Protection Board of India | (TBC — board not yet operational) | DPDPA §8(6) channel TBC |
| Brazil | ANPD | gov.br/anpd | comunicacao@anpd.gov.br + online form |
| UAE | UAE Data Office | dataoffice.ae | online form |
| Saudi Arabia | NDMO | ndmo.gov.sa | online form |
| Singapore | PDPC | pdpc.gov.sg | breach-notification form |
| Australia | OAIC | oaic.gov.au | NDB scheme form |
| Canada | OPC | priv.gc.ca | breach-report form |
| California | Office of the AG | oag.ca.gov | online breach notification |
| South Korea | PIPC | pipc.go.kr | online form |
| Japan | PPC | ppc.go.jp | online form |
| Turkey | KVKK | kvkk.gov.tr | online form |
| Thailand | PDPC TH | pdpc.or.th | online form |
| Mexico | INAI | inai.org.mx | online form |
| South Africa | Information Regulator | inforegulator.org.za | inforeg@justice.gov.za |

---

## 4. User-notification template (Art. 34)

> Subject: **Important: A security incident affecting your Karmic Compass account**
>
> Dear [first name],
>
> We are writing to inform you of a personal data breach that may have affected your Karmic Compass account on **[date]**.
>
> **What happened:** [Plain-language description of the incident — what occurred, when discovered, when contained.]
>
> **What data was involved:** [Specific categories — e.g. journal entries, email address, etc. Be precise.]
>
> **Likely consequences for you:** [Honest assessment — e.g. risk of unauthorised access to sensitive reflections, risk of phishing emails, etc.]
>
> **What we have done:**
> • Contained the incident on [date].
> • Notified [supervisory authority] on [date].
> • Rotated affected credentials and revoked tokens.
> • Engaged [external counsel / security firm] to assist with the investigation.
>
> **What you can do:**
> • Change your Karmic Compass password if you use email/password sign-in.
> • Review any third-party services where you reuse credentials.
> • Be alert for phishing emails that reference Karmic Compass.
> • Delete your account at any time via Settings → Account → Delete Account or by emailing app.karmiccompass@gmail.com.
>
> **Contact:** privacy@karmiccompass.app
> **Data protection rights:** see our Privacy Policy §13 (karmiccompass.app/privacy).
> **Supervisory authority:** you have the right to lodge a complaint with [user's local DPA].
>
> We are sorry. We will publish a full post-incident report at karmiccompass.app/privacy/incidents/[id].
>
> Diksha Dutt (operating as KarmicCompass)
> Panchkula, Haryana, India

---

## 5. Internal record (Art. 33(5))

Every incident — even ones that do not trigger DPA notification — must be logged at `private/breach-log/{YYYY}-{NN}.md` with:

- Incident ID, T0 timestamp, discovery channel.
- Data categories, subject count, jurisdictions.
- Risk classification + reasoning.
- Containment actions and timestamps.
- Notification decisions (DPA: which one, when; users: yes/no, when, count).
- Lessons learned and follow-up tickets.

Retention of internal records: minimum 5 years.

---

## 6. Tabletop exercise cadence

Run a tabletop exercise **at least every 6 months** with a synthetic incident drawn from R1–R8 in `DPIA.md`. Document the exercise outcome in `private/breach-log/exercise-{YYYY}-{NN}.md`.

---

*Generated: 2026-05-28 (v1.1). Linked from Privacy Policy §6 and §15.*
