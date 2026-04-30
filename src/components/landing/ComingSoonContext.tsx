"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type Ctx = {
  open: boolean;
  setOpen: (v: boolean) => void;
  openComingSoon: () => void;
};

const ComingSoonContext = createContext<Ctx | null>(null);

export function ComingSoonProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const openComingSoon = useCallback(() => setOpen(true), []);
  const value = useMemo(
    () => ({ open, setOpen, openComingSoon }),
    [open, openComingSoon],
  );
  return (
    <ComingSoonContext.Provider value={value}>
      {children}
    </ComingSoonContext.Provider>
  );
}

export function useComingSoon() {
  const ctx = useContext(ComingSoonContext);
  if (!ctx) {
    throw new Error("useComingSoon must be used within ComingSoonProvider");
  }
  return ctx;
}
