"use client";

import { useComingSoon } from "./ComingSoonContext";
import { isExternalUrlReady } from "@/lib/constants";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type SmartLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  label: string;
} & Omit<ComponentPropsWithoutRef<"a">, "href" | "children">;

/**
 * Renders a real anchor when `href` is set; otherwise a button that opens
 * the coming-soon modal (no dead links).
 */
export function SmartExternalLink({
  href,
  children,
  className,
  label,
  ...rest
}: SmartLinkProps) {
  const { openComingSoon } = useComingSoon();
  if (isExternalUrlReady(href)) {
    const openInNewTab = /^https?:\/\//i.test(href);
    return (
      <a
        href={href}
        className={className}
        {...(openInNewTab
          ? { target: "_blank" as const, rel: "noopener noreferrer" }
          : {})}
        {...rest}
      >
        {children}
      </a>
    );
  }
  return (
    <button
      type="button"
      className={[className, "cursor-pointer"].filter(Boolean).join(" ")}
      onClick={openComingSoon}
      aria-label={label}
    >
      {children}
    </button>
  );
}
