"use client";

import { useEffect, useId, useRef, useCallback } from "react";
import { useComingSoon } from "./ComingSoonContext";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { CONTACT_EMAIL, MAILTO_CONTACT } from "@/lib/constants";

export function ComingSoonModal() {
  const { open, setOpen } = useComingSoon();
  const reduce = useReducedMotion();
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const okBtnRef = useRef<HTMLButtonElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        setOpen(false);
        return;
      }
      if (e.key !== "Tab" || !open) return;
      const root = panelRef.current;
      if (!root) return;
      const focusables = root.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      const list = [...focusables].filter(
        (el) => !el.hasAttribute("disabled") && el.tabIndex !== -1,
      );
      if (list.length === 0) return;
      const first = list[0];
      const last = list[list.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    },
    [open, setOpen],
  );

  useEffect(() => {
    if (!open) {
      previouslyFocused.current?.focus?.();
      previouslyFocused.current = null;
      return;
    }
    previouslyFocused.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    okBtnRef.current?.focus();
    document.addEventListener("keydown", handleKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, handleKeyDown]);

  return (
    <AnimatePresence>
      {open && (
        <div
          className="fixed inset-0 z-[200] flex items-end justify-center p-4 sm:items-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
        >
          <motion.button
            type="button"
            tabIndex={-1}
            className="absolute inset-0 cursor-default bg-black/60"
            aria-label="Close dialog"
            onClick={() => setOpen(false)}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.2 }}
          />
          <motion.div
            ref={panelRef}
            className="relative w-full max-w-sm rounded-2xl border border-white/10 bg-[#12121a] p-6 text-[#f5f2ed] shadow-2xl"
            initial={reduce ? false : { opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? undefined : { opacity: 0, y: 8, scale: 0.98 }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
          >
            <h2 id={titleId} className="font-serif text-xl font-light tracking-tight">
              Link coming soon
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/55">
              We&rsquo;re finalising this destination. In the meantime, you can
              reach us at{" "}
              <a
                className="text-[#C9824A] underline decoration-[#C9824A]/40 underline-offset-2 transition hover:decoration-[#C9824A]"
                href={MAILTO_CONTACT}
              >
                {CONTACT_EMAIL}
              </a>
              .
            </p>
            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                className="rounded-lg border border-white/15 px-4 py-2 text-sm text-white/80 transition hover:bg-white/5"
                onClick={() => setOpen(false)}
              >
                Close
              </button>
              <button
                ref={okBtnRef}
                type="button"
                className="rounded-lg bg-[#C9824A] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#E8A97A]"
                onClick={() => setOpen(false)}
              >
                OK
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
