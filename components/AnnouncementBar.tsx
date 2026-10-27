"use client";

import { useState } from "react";

/**
 * Dismissible launch bar that sits above the floating nav pill.
 * Its height is part of the fixed header block, so the pill simply
 * slides up when it is dismissed.
 */
export default function AnnouncementBar() {
  const [open, setOpen] = useState(true);
  if (!open) return null;

  return (
    <div
      data-testid="announcement"
      className="mx-auto mb-2 flex max-w-[1140px] items-center justify-center gap-2 rounded-pill border border-white/10 bg-carbon px-4 py-2 text-center text-[13px] text-ash shadow-[0_4px_20px_rgba(0,0,0,0.45)]"
    >
      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-violet" aria-hidden="true" />
      <p className="min-w-0 truncate">
        <span className="font-semibold text-white">Early access:</span> Q1 pilot
        slots are open for banking QA teams.
      </p>
      <a
        href="#start"
        className="shrink-0 whitespace-nowrap font-semibold text-violet underline-offset-4 hover:text-white hover:underline"
      >
        Book a demo
      </a>
      <button
        type="button"
        aria-label="Dismiss announcement"
        onClick={() => setOpen(false)}
        className="ml-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-ash transition-colors hover:bg-white/10 hover:text-white"
      >
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}
