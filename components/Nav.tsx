"use client";

import Image from "next/image";
import { useState } from "react";

const LINKS = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#trust", label: "Trust" },
  { href: "#faq", label: "FAQ" },
];

/**
 * Floating nav pill — the pill IS the header. Fixed top center,
 * carbon fill, hairline border, Voltage Blue CTA.
 */
export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-3 top-3 z-50 mx-auto max-w-[1140px] rounded-pill2 border border-white/10 bg-carbon py-2 pl-5 pr-2 shadow-[0_4px_20px_rgba(0,0,0,0.45)] md:pl-6">
      <nav aria-label="Main" className="flex items-center justify-between gap-4">
        <a
          href="#top"
          aria-label="TestForge.Ai back to top"
          className="group flex min-w-0 shrink-0 items-center gap-2 rounded-lg"
        >
          <Image
            src="/logo-128.png"
            alt=""
            aria-hidden="true"
            width={40}
            height={40}
            priority
            unoptimized
            className="h-8 w-8 shrink-0 transition-transform duration-200 ease-out group-hover:scale-105 md:h-9 md:w-9"
          />
          <span className="whitespace-nowrap font-display text-[17px] font-medium leading-none tracking-[-0.01em] text-white sm:text-lg">
            TestForge
            <span className="font-semibold text-violet">.Ai</span>
          </span>
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-ash transition-colors hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a href="#start" className="btn btn-primary hidden px-4 py-2 text-sm md:inline-flex">
            Get a demo
          </a>
          <button
            type="button"
            className="btn h-10 w-10 rounded-full border border-white/10 p-0 text-ash hover:border-violet hover:text-white md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              {open ? (
                <path
                  d="M5 5l14 14M19 5L5 19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          className="absolute inset-x-0 top-[calc(100%+10px)] rounded-pill border border-white/10 bg-carbon p-3 shadow-[0_4px_20px_rgba(0,0,0,0.45)] md:hidden"
        >
          <div className="flex flex-col">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-3 text-sm font-medium text-ash transition-colors hover:bg-white/5 hover:text-white"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#start"
              onClick={() => setOpen(false)}
              className="btn btn-primary mt-2 text-sm"
            >
              Get a demo
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
