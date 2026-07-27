/**
 * Cancel-deletion landing page.
 *
 * `functions/index.js` emails every deletion request a link to
 * https://karmiccompass.app/cancel-deletion?uid=…&token=… — and this route did not
 * exist, so that link returned 404. The grace period is the user's stated way to
 * undo an account deletion, so the only route out of an accidental erasure was a
 * dead page. Verified live before building this: /privacy, /terms, /delete and
 * /delete-account all returned 200; /cancel-deletion was the one 404.
 *
 * Server component — exports metadata. The interactive POST lives in the client
 * component, which also reads uid/token from the URL so they never appear in a
 * server-rendered payload.
 */
import type { Metadata } from "next";
import Link from "next/link";
import { APP_NAME, CONTACT_EMAIL, PRIVACY_URL, TERMS_URL } from "@/lib/constants";
import CancelDeletionForm from "./CancelDeletionForm";

export const metadata: Metadata = {
    title: `Cancel account deletion — ${APP_NAME}`,
    description: "Stop a pending KarmicCompass account deletion.",
    // Not indexable: it is only ever reached from a signed link in an email.
    robots: { index: false, follow: false },
};

export default function CancelDeletionPage() {
    return (
        <main className="flex min-h-screen flex-col items-center bg-[#06060a] px-6 py-16 text-white">
            <div className="w-full max-w-xl">
                <Link
                    href="/"
                    className="font-mono text-xs uppercase tracking-wider text-[#C9824A] transition hover:text-[#e0a06a]"
                >
                    ← {APP_NAME}
                </Link>

                <h1 className="mt-8 text-3xl font-semibold tracking-tight">
                    Cancel account deletion
                </h1>

                <CancelDeletionForm />

                <p className="mt-10 text-sm leading-relaxed text-white/40">
                    Need help? Email{" "}
                    <a
                        href={`mailto:${CONTACT_EMAIL}`}
                        className="text-[#C9824A] transition hover:text-[#e0a06a]"
                    >
                        {CONTACT_EMAIL}
                    </a>
                    . See our{" "}
                    <a href={PRIVACY_URL} className="text-[#C9824A] transition hover:text-[#e0a06a]">
                        Privacy Policy
                    </a>{" "}
                    and{" "}
                    <a href={TERMS_URL} className="text-[#C9824A] transition hover:text-[#e0a06a]">
                        Terms
                    </a>
                    .
                </p>
            </div>
        </main>
    );
}
