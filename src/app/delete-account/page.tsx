/**
 * Public account-deletion page.
 *
 * Mandatory per App Store Review Guideline 5.1.1(v) and Google Play
 * "Account Deletion" policy: a publicly-discoverable URL where a user
 * who can no longer log in (lost password / lost device / deleted app)
 * can still request deletion of their account and personal data.
 *
 * Server component — exports metadata. The interactive OTP form lives in
 * DeleteAccountForm (client component).
 */
import type { Metadata } from "next";
import Link from "next/link";
import { APP_NAME, CONTACT_EMAIL, PRIVACY_URL, TERMS_URL } from "@/lib/constants";
import DeleteAccountForm from "./DeleteAccountForm";

export const metadata: Metadata = {
    title: `Delete account — ${APP_NAME}`,
    description:
        "Request permanent deletion of your Karmic Compass account and personal data.",
    robots: { index: true, follow: false },
};

export default function DeleteAccountPage() {
    return (
        <main className="min-h-screen bg-[#f5ede0] text-[#1a1a1a] flex flex-col items-center px-6 py-16">
            <div className="w-full max-w-xl">
                <Link
                    href="/"
                    className="text-sm font-mono uppercase tracking-wider text-[#6f5b3e] hover:underline"
                >
                    ← Back to {APP_NAME}
                </Link>

                <h1 className="mt-8 font-serif text-4xl font-light">
                    Delete your {APP_NAME} account
                </h1>

                <p className="mt-4 text-base leading-relaxed text-[#3a3a3a]">
                    This page is for users who can no longer access {APP_NAME}
                    on their device. If you can still sign in, the fastest way
                    to delete your account is from the app: open{" "}
                    <strong>Settings → Account → Delete Account</strong>.
                </p>

                <p className="mt-4 text-base leading-relaxed text-[#3a3a3a]">
                    Deletion is immediate and permanent. We erase all of your
                    journal entries, chat history with Arya, profile, karma
                    history, subscription record, push token, and Firebase
                    authentication account.{" "}
                    <Link href={PRIVACY_URL} className="underline">
                        See exactly what is deleted
                    </Link>
                    .
                </p>

                <DeleteAccountForm />

                <div className="mt-12 border-t border-[#cdb78d] pt-6 text-xs text-[#6f5b3e] leading-relaxed">
                    <p>
                        Trouble with the form? Email{" "}
                        <a href={`mailto:${CONTACT_EMAIL}`} className="underline">
                            {CONTACT_EMAIL}
                        </a>{" "}
                        and we will process your deletion request manually
                        within 30 days.
                    </p>
                    <p className="mt-3">
                        By using this form you agree to our{" "}
                        <Link href={TERMS_URL} className="underline">
                            Terms
                        </Link>{" "}
                        and{" "}
                        <Link href={PRIVACY_URL} className="underline">
                            Privacy Policy
                        </Link>
                        .
                    </p>
                </div>
            </div>
        </main>
    );
}
