/**
 * DeleteAccountForm — interactive 2-step OTP flow.
 *
 * Step 1: enter email → POST /requestDeletionCode → emails 6-digit OTP.
 * Step 2: enter OTP   → POST /confirmDeletion    → wipes Firestore + Auth.
 *
 * Mirrors kc-mobile/src/screens/DeletionRequestScreen.js. Server endpoints
 * accept CORS from karmiccompass.app (per functions/index.js CORS allowlist).
 */
"use client";

import { useRef, useState } from "react";

const REQUEST_URL =
    process.env.NEXT_PUBLIC_DELETION_REQUEST_URL ||
    "https://us-central1-karmiccompass.cloudfunctions.net/requestDeletionCode";
const CONFIRM_URL =
    process.env.NEXT_PUBLIC_DELETION_CONFIRM_URL ||
    "https://us-central1-karmiccompass.cloudfunctions.net/confirmDeletion";

/** Minimum interval between submit attempts (client-side debounce). */
const SUBMIT_DEBOUNCE_MS = 2000;

type Step = "email" | "code" | "done";

const labelClass =
    "font-mono text-xs uppercase tracking-wider text-[#C9824A]";
const inputClass =
    "mt-2 w-full rounded-md border border-white/12 bg-white/[0.04] px-4 py-3 text-base text-white placeholder-white/25 transition focus:border-[#C9824A] focus:outline-none disabled:opacity-50";
const errorClass =
    "min-h-[1.25rem] text-sm text-red-400";

export default function DeleteAccountForm() {
    const [step, setStep] = useState<Step>("email");
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState("");
    const lastSubmit = useRef(0);

    /** Returns true if a submit is allowed; otherwise sets an error and returns false. */
    function debounceOk() {
        const now = Date.now();
        if (now - lastSubmit.current < SUBMIT_DEBOUNCE_MS) {
            setError("Please wait a moment before trying again.");
            return false;
        }
        lastSubmit.current = now;
        return true;
    }

    async function handleRequestCode(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        if (busy || !debounceOk()) return;
        const normalised = email.trim().toLowerCase();
        if (!normalised || !normalised.includes("@")) {
            setError("Please enter a valid email address.");
            return;
        }
        setBusy(true);
        try {
            const r = await fetch(REQUEST_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: normalised }),
            });
            if (r.status === 429) {
                const body = await r.json().catch(() => ({}));
                setError(body.error || "Too many requests — please wait a minute.");
                return;
            }
            if (!r.ok) {
                setError("Could not send code. Please try again.");
                return;
            }
            setStep("code");
        } catch {
            setError("Network error. Please check your connection and try again.");
        } finally {
            setBusy(false);
        }
    }

    async function handleConfirm(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        if (busy || !debounceOk()) return;
        const trimmedCode = code.trim();
        if (!/^\d{6}$/.test(trimmedCode)) {
            setError("The code is a 6-digit number.");
            return;
        }
        setBusy(true);
        try {
            const r = await fetch(CONFIRM_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: email.trim().toLowerCase(),
                    code: trimmedCode,
                }),
            });
            if (r.status === 429) {
                const body = await r.json().catch(() => ({}));
                setError(body.error || "Too many attempts — please request a new code.");
                return;
            }
            if (!r.ok) {
                const body = await r.json().catch(() => ({}));
                setError(body.error || "Invalid code. Please try again.");
                return;
            }
            setStep("done");
        } catch {
            setError("Network error. Please check your connection and try again.");
        } finally {
            setBusy(false);
        }
    }

    if (step === "done") {
        return (
            <div className="mt-10 space-y-3 rounded-lg border border-[#7a9a7a]/40 bg-[#7a9a7a]/[0.08] p-6">
                <h2 className="font-serif text-2xl font-light text-white">
                    Your account has been deleted.
                </h2>
                <p className="text-sm leading-relaxed text-white/55">
                    All of your data has been permanently erased from our
                    servers. Residual data in encrypted Google Cloud backups
                    may persist for up to 90 days. Subscription billing records
                    held by Apple, Google, or RevenueCat are retained per their
                    respective policies and applicable financial law.
                </p>
            </div>
        );
    }

    if (step === "code") {
        return (
            <form onSubmit={handleConfirm} className="mt-10 space-y-4">
                <label htmlFor="code" className="block">
                    <span className={labelClass}>
                        Step 2 of 2 — verification code sent to {email}
                    </span>
                    <input
                        id="code"
                        type="text"
                        inputMode="numeric"
                        pattern="\d{6}"
                        maxLength={6}
                        autoComplete="one-time-code"
                        required
                        value={code}
                        onChange={(e) =>
                            setCode(e.target.value.replace(/\D/g, "").slice(0, 6))
                        }
                        disabled={busy}
                        className="mt-2 w-full rounded-md border border-white/12 bg-white/[0.04] px-4 py-3 text-center font-mono text-2xl tracking-[0.4em] text-white placeholder-white/20 transition focus:border-[#C9824A] focus:outline-none disabled:opacity-50"
                        placeholder="------"
                    />
                </label>

                <p className={errorClass} role="alert" aria-live="assertive">
                    {error}
                </p>

                <button
                    type="submit"
                    disabled={busy || code.length !== 6}
                    className="w-full rounded-md bg-red-600 px-6 py-3 font-mono text-sm font-medium uppercase tracking-wider text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-40"
                >
                    {busy ? "Deleting…" : "Permanently delete my account"}
                </button>

                <button
                    type="button"
                    onClick={() => {
                        setStep("email");
                        setCode("");
                        setError("");
                    }}
                    disabled={busy}
                    className="w-full px-6 py-2 text-sm text-white/45 underline underline-offset-2 transition hover:text-white/70 disabled:opacity-50"
                >
                    Use a different email
                </button>
            </form>
        );
    }

    return (
        <form onSubmit={handleRequestCode} className="mt-10 space-y-4">
            <label htmlFor="email" className="block">
                <span className={labelClass}>
                    Step 1 of 2 — your account email
                </span>
                <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={busy}
                    className={inputClass}
                    placeholder="you@example.com"
                />
            </label>

            <p className={errorClass} role="alert" aria-live="assertive">
                {error}
            </p>

            <button
                type="submit"
                disabled={busy}
                className="w-full rounded-md bg-[#C9824A] px-6 py-3 font-mono text-sm font-medium uppercase tracking-wider text-[#0b0a0f] transition hover:bg-[#d9935b] disabled:cursor-not-allowed disabled:opacity-40"
            >
                {busy ? "Sending code…" : "Send verification code"}
            </button>

            <p className="text-xs leading-relaxed text-white/40">
                We will email a 6-digit code to this address. The code is
                valid for 15 minutes and can be used once. If you do not
                receive an email, check spam and try again after a minute.
            </p>
        </form>
    );
}
