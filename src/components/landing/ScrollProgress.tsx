"use client";

import { useEffect, useState } from "react";

export function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const el = document.documentElement;
    const on = () => {
      const t = el.scrollTop;
      const h = el.scrollHeight - el.clientHeight;
      setP(h > 0 ? (t / h) * 100 : 0);
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <div
      className="pointer-events-none fixed top-0 left-0 z-[100] h-0.5 w-full bg-transparent"
      aria-hidden
    >
      <div
        className="h-full bg-[#C9824A] will-change-[width]"
        style={{ width: `${p}%` }}
      />
    </div>
  );
}
