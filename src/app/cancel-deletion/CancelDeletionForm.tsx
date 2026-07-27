/**
 * CancelDeletionForm — the confirm step for the cancellation link emailed when a
 * user requests account deletion.
 *
 * WHY THIS IS A CONFIRM PAGE AND NOT A ONE-CLICK LINK
 * `cancelPendingDeletion` is deliberately POST-only. Its own comment in
 * functions/index.js records the reason: a token in a URL leaks through Referer
 * headers, browser history, and the URL-preview prefetch that Gmail and Outlook
 * Safe Links perform on every link in an email. A GET endpoint would therefore be
 * silently "clicked" by the mail provider's scanner before the user ever saw the
 * message — cancelling a deletion the user may have actually wanted. So the email
 * link lands here, and the POST happens only on a real button press.
 *
 * Server accepts CORS from karmiccompass.app (functions/index.js allowlist).
 */
"use client";

import { useEffect, useRef, useState } from "react";

const CANCEL_URL =
    process.env.NEXT_PUBLIC_DELETION_CANCEL_URL ||
    "https://us-central1-karmiccompass.cloudfunctions.net/cancelPendingDeletion";

const SUBMIT_DEBOUNCE_MS = 2000;

type State = "ready" | "busy" | "done" | "invalid";

const errorClass = "min-h-[1.25rem] text-sm text-red-400";

export default function CancelDeletionForm() {
    const [state, setState] = useState<State>("ready");
    const [error, setError] = useState("");
    const [params, setParams] = useState<{ uid: string; token: string } | null>(null);
    const lastSubmit = useRef(0);

    // Read from the URL on the client only — these are credentials of a sort, and
    // keeping them out of any server-rendered payload keeps them out of logs.
    useEffect(() => {
        try {
            const q = new URLSearchParams(window.location.search);
            const uid = (q.get("uid") || "").trim();
            const token = (q.get("token") || "").trim();
            if (!uid || !token) {
                setState("invalid");
                return;
            }
            setParams({ uid, token });
        } catch {
            setState("invalid");
        }
    }, []);

    async function handleCancel() {
        const now = Date.now();
        if (now - lastSubmit.current < SUBMIT_DEBOUNCE_MS) return;
        lastSubmit.current = now;
        if (!params) return;

        setError("");
        setState("busy");
        try {
            const res = await fetch(CANCEL_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ uid: params.uid, token: params.token }),
            });
            const data = await res.json().catch(() => ({}));
            if (res.ok) {
                setState("done");
                return;
            }
            // The server distinguishes an invalid link (403) from an expired grace
            // window (410); say which, because the remedies are different.
            setError(
                data?.error ||
                (res.status === 410
                    ? "The cancellation window has closed."
                    : "This cancellation link is not valid.")
            );
            setState("ready");
        } catch {
            setError("Could not reach the server. Please check your connection and try again.");
            setState("ready");
        }
    }

    if (state === "invalid") {
        return (
            <p className="mt-6 text-base leading-relaxed text-white/70">
                This link is incomplete. Please open the cancellation link exactly as it
                appears in the email we sent you.
            </p>
        );
    }

    if (state === "done") {
        return (
            <div className="mt-6">
                <p className="text-base leading-relaxed text-white/80">
                    Your account deletion has been cancelled. Your account and your data
                    are intact, and you can sign in again as usual.
                </p>
                <p className="mt-4 text-sm leading-relaxed text-white/50">
                    If you did not request this cancellation, someone may have access to
                    your email. Change your password and contact us.
                </p>
            </div>
        );
    }

    return (
        <div className="mt-6">
            <p className="text-base leading-relaxed text-white/70">
                You asked us to delete your KarmicCompass account. If that was a mistake,
                or you have changed your mind, you can stop it here — but only until the
                grace period ends.
            </p>
            <button
                type="button"
                onClick={handleCancel}
                disabled={state === "busy" || !params}
                className="mt-6 w-full rounded-md bg-[#C9824A] px-4 py-3 text-base font-medium text-[#06060a] transition hover:bg-[#e0a06a] disabled:opacity-50"
            >
                {state === "busy" ? "Cancelling…" : "Keep my account"}
            </button>
            <p className={`mt-3 ${errorClass}`}>{error}</p>
        </div>
    );
}
