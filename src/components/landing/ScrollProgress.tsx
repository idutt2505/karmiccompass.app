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
      className="pointer-events-none fixed top-0 left-0 z-[100] h-[2px] w-full"
      aria-hidden
    >
      <div
        className="h-full bg-gradient-to-r from-[#C9824A] to-[#E8A97A] shadow-[0_0_12px_0_rgba(201,130,74,0.5)] will-change-[width] transition-[width] duration-75"
        style={{ width: `${p}%` }}
      />
    </div>
  );
}
