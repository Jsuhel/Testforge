"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import AnnouncementBar from "./AnnouncementBar";
import LogoMark from "./ui/Logo";

/* ---------------------------------------------------------------- icons */

function tileIcon(d: string): ReactNode {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d={d}
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ------------------------------------------------------------ nav menus */

type NavItem = { title: string; desc: string; href: string; icon: ReactNode };
type NavGroup = { heading: string; items: NavItem[] };
type NavMenu = { label: string; groups: NavGroup[] };

const MENUS: NavMenu[] = [
  {
    label: "Platform",
    groups: [
      {
        heading: "The six stages",
        items: [
          {
            title: "Platform overview",
            desc: "One window, six stages, from FSD to assigned defect.",
            href: "#platform",
            icon: tileIcon("M3 12h4l3-8 4 16 3-8h4"),
          },
          {
            title: "FSD chat",
            desc: "Upload the document, question it until gaps surface.",
            href: "#how-it-works",
            icon: tileIcon("M21 12a8 8 0 0 1-8 8H4l2-3a8 8 0 1 1 15-5Z"),
          },
          {
            title: "Test cases",
            desc: "Drafts with gaps flagged, approved case by case.",
            href: "#how-it-works",
            icon: tileIcon("M4 6l2 2 3-3M4 13l2 2 3-3M12 6h8M12 14h8M5 20h14"),
          },
          {
            title: "Automation",
            desc: "Standard Playwright you can read and edit.",
            href: "#platform",
            icon: tileIcon("M8 6 3 12l5 6M16 6l5 6-5 6M13 5l-2 14"),
          },
          {
            title: "Execution",
            desc: "Live runs with a screenshot on every break.",
            href: "#platform",
            icon: tileIcon("M6 4l13 8-13 8V4Z"),
          },
          {
            title: "Reporting",
            desc: "Results sorted pass, fail, blocked, skipped.",
            href: "#platform",
            icon: tileIcon("M4 20V10M10 20V4M16 20v-7M21 20H3"),
          },
          {
            title: "Tester assigning",
            desc: "Defects routed to the developer who owns them.",
            href: "#how-it-works",
            icon: tileIcon("M15 20v-1a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v1M10 7a3 3 0 1 1 0 6 3 3 0 0 1 0-6ZM17.5 7.5v5M15 10h5"),
          },
        ],
      },
      {
        heading: "Coverage and modules",
        items: [
          {
            title: "Coverage map",
            desc: "Ten test types, one traceable suite.",
            href: "#coverage",
            icon: tileIcon("M4 5h16v6H4V5ZM4 13h6v6H4v-6ZM14 13h6v6h-6v-6Z"),
          },
          {
            title: "Workspace modules",
            desc: "Test data, load, regression, defects, reports.",
            href: "#capabilities",
            icon: tileIcon("M4 4h7v7H4V4ZM13 4h7v7h-7V4ZM4 13h7v7H4v-7ZM13 13h7v7h-7v-7Z"),
          },
        ],
      },
    ],
  },
  {
    label: "Solutions",
    groups: [
      {
        heading: "By use case",
        items: [
          {
            title: "Regression from FSDs",
            desc: "The suite re-runs on every build, not every panic.",
            href: "#capabilities",
            icon: tileIcon("M4 12a8 8 0 0 1 14-5M20 12a8 8 0 0 1-14 5M18 3v4h-4M6 21v-4h4"),
          },
          {
            title: "UAT sign-off",
            desc: "Business scenarios a reviewer can actually read.",
            href: "#how-it-works",
            icon: tileIcon("M9 12l2 2 4-4M12 3l7 4v5c0 4.4-3 8.4-7 9-4-.6-7-4.6-7-9V7l7-4Z"),
          },
          {
            title: "Release evidence",
            desc: "Screenshots, state and likely cause for every failure.",
            href: "#platform",
            icon: tileIcon("M4 7h16v13H4V7ZM8 7V4h8v3M9 13h6"),
          },
          {
            title: "Vendor testing",
            desc: "Hold a supplier's delivery to the spec it signed.",
            href: "#how-it-works",
            icon: tileIcon("M8 3v4M16 3v4M4 9h16M5 5h14v15H5V5Z"),
          },
        ],
      },
      {
        heading: "By team",
        items: [
          {
            title: "QA leads",
            desc: "A review trail, not a black box.",
            href: "#faq",
            icon: tileIcon("M12 3l7 4v5c0 4.4-3 8.4-7 9-4-.6-7-4.6-7-9V7l7-4ZM9 12l2 2 4-4"),
          },
          {
            title: "Testers going automation-first",
            desc: "The typing is done; the judgment stays yours.",
            href: "#faq",
            icon: tileIcon("M13 3 4 14h6l-1 7 9-11h-6l1-7Z"),
          },
          {
            title: "Product managers",
            desc: "Spec contradictions surface before development.",
            href: "#faq",
            icon: tileIcon("M4 19V5M4 19h16M8 15v-5M13 15V8M18 15v-3"),
          },
          {
            title: "Developers",
            desc: "Failures arrive reproducible, with the state attached.",
            href: "#developers",
            icon: tileIcon("M8 6 3 12l5 6M16 6l5 6-5 6"),
          },
        ],
      },
    ],
  },
  {
    label: "Resources",
    groups: [
      {
        heading: "Learn",
        items: [
          {
            title: "Straight answers",
            desc: "Formats, data safety, where tests run.",
            href: "#faq",
            icon: tileIcon("M12 17h.01M9.1 9a3 3 0 1 1 5.8 1c0 2-3 2.2-3 4"),
          },
          {
            title: "Execution workflow",
            desc: "The six stages, one card each.",
            href: "#how-it-works",
            icon: tileIcon("M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2M10 3a4 4 0 1 1 0 8 4 4 0 0 1 0-8ZM21 21v-2a4 4 0 0 0-3-3.87"),
          },
        ],
      },
      {
        heading: "Get started",
        items: [
          {
            title: "Request a demo",
            desc: "Bring a real FSD, watch it analysed live.",
            href: "#start",
            icon: tileIcon("M4 12h15M13 6l6 6-6 6"),
          },
          {
            title: "How it works",
            desc: "The six stages, one pipeline.",
            href: "#how-it-works",
            icon: tileIcon("M6 4l13 8-13 8V4Z"),
          },
        ],
      },
    ],
  },
];

/* ------------------------------------------------------------------ nav */

const MAIL = "mailto:jsuhel122@gmail.com";

export default function Nav() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<number | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    }
    function onPointerDown(e: PointerEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    }
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointerDown);
    };
  }, []);

  function scheduleClose() {
    closeTimer.current = window.setTimeout(() => setOpenMenu(null), 140);
  }

  function cancelClose() {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }

  const active = MENUS.find((m) => m.label === openMenu) ?? null;

  return (
    <div ref={rootRef} className="fixed inset-x-2 top-2 z-50">
      <AnnouncementBar />

      <header className="mx-auto max-w-[1140px] rounded-pill2 border border-white/10 bg-carbon py-2 pl-5 pr-2 shadow-[0_4px_20px_rgba(0,0,0,0.45)] md:pl-6">
        <nav aria-label="Main" className="flex items-center justify-between gap-4">
          <a
            href="#top"
            aria-label="TestForge.Ai back to top"
            className="group flex min-w-0 shrink-0 items-center gap-2 rounded-lg"
          >
            <LogoMark className="h-8 w-8 shrink-0 transition-transform duration-200 ease-out group-hover:scale-105 md:h-9 md:w-9" />
            <span className="whitespace-nowrap font-display text-[17px] font-medium leading-none tracking-[-0.01em] text-white sm:text-lg">
              TestForge
              <span className="font-semibold text-violet">.Ai</span>
            </span>
          </a>

          {/* Desktop dropdown triggers */}
          <div className="hidden items-center gap-1 lg:flex" onMouseLeave={scheduleClose}>
            {MENUS.map((menu) => {
              const open = openMenu === menu.label;
              return (
                <button
                  key={menu.label}
                  type="button"
                  aria-expanded={open}
                  aria-controls={`nav-panel-${menu.label}`}
                  onClick={() => setOpenMenu(open ? null : menu.label)}
                  onMouseEnter={() => {
                    cancelClose();
                    setOpenMenu(menu.label);
                  }}
                  className={`flex items-center gap-1.5 rounded-pill px-3.5 py-2 text-sm font-medium transition-colors ${
                    open ? "bg-white/10 text-white" : "text-ash hover:text-white"
                  }`}
                >
                  {menu.label}
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                    className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                  >
                    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <a href={MAIL} className="hidden px-3 text-sm font-medium text-ash transition-colors hover:text-white md:inline-flex">
              Contact
            </a>
            <a href="#start" className="btn btn-primary hidden px-4 py-2 text-sm sm:inline-flex">
              Book a demo
            </a>
            <button
              type="button"
              className="btn h-10 w-10 rounded-full border border-white/10 p-0 text-ash hover:border-violet hover:text-white lg:hidden"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileOpen((v) => !v)}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                {mobileOpen ? (
                  <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                ) : (
                  <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                )}
              </svg>
            </button>
          </div>
        </nav>

        {/* Desktop mega panel */}
        {active && (
          <div
            id={`nav-panel-${active.label}`}
            data-testid={`nav-panel-${active.label}`}
            onMouseEnter={cancelClose}
            onMouseLeave={scheduleClose}
            className="absolute left-1/2 top-[calc(100%+8px)] w-[min(56rem,calc(100vw-1.5rem))] -translate-x-1/2 rounded-[30px] border border-white/10 bg-carbon p-6 shadow-[0_4px_20px_rgba(0,0,0,0.45)] md:p-8"
          >
            <div
              className={`grid gap-8 ${
                active.groups.length > 1 ? "md:grid-cols-2" : "md:grid-cols-[repeat(2,minmax(0,1fr))]"
              }`}
            >
              {active.groups.map((group) => (
                <div key={group.heading}>
                  <p className="kicker mb-4">{group.heading}</p>
                  <ul
                    className={`grid gap-x-8 gap-y-1 ${
                      group.items.length > 1 ? "sm:grid-cols-2" : "grid-cols-1"
                    }`}
                  >
                    {group.items.map((item) => (
                      <li key={item.title}>
                        <a
                          href={item.href}
                          onClick={() => setOpenMenu(null)}
                          className="group flex items-start gap-3 rounded-2xl p-2.5 transition-colors hover:bg-white/5"
                        >
                          <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-violet/30 bg-violet/10 text-violet transition-colors group-hover:border-violet/60">
                            {item.icon}
                          </span>
                          <span className="min-w-0">
                            <span className="block text-sm font-medium text-white">
                              {item.title}
                            </span>
                            <span className="mt-0.5 block text-[13px] leading-snug text-fog">
                              {item.desc}
                            </span>
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Mobile menu */}
        {mobileOpen && (
          <div
            id="mobile-menu"
            data-testid="mobile-menu"
            className="absolute inset-x-0 top-[calc(100%+10px)] max-h-[70vh] overflow-y-auto rounded-[30px] border border-white/10 bg-carbon p-3 shadow-[0_4px_20px_rgba(0,0,0,0.45)] lg:hidden"
          >
            {MENUS.map((menu) => (
              <details key={menu.label} className="group border-b border-white/5 last:border-0">
                <summary className="flex cursor-pointer list-none items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium text-ash transition-colors hover:bg-white/5 hover:text-white [&::-webkit-details-marker]:hidden">
                  {menu.label}
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                    className="transition-transform duration-200 group-open:rotate-180"
                  >
                    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </summary>
                <div className="pb-2">
                  {menu.groups.map((group) => (
                    <div key={group.heading}>
                      <p className="kicker px-4 pb-1 pt-2">{group.heading}</p>
                      {group.items.map((item) => (
                        <a
                          key={item.title}
                          href={item.href}
                          onClick={() => setMobileOpen(false)}
                          className="block rounded-2xl px-4 py-2.5 text-sm text-ash transition-colors hover:bg-white/5 hover:text-white"
                        >
                          {item.title}
                          <span className="mt-0.5 block text-[12px] leading-snug text-slate2">
                            {item.desc}
                          </span>
                        </a>
                      ))}
                    </div>
                  ))}
                </div>
              </details>
            ))}
            <div className="mt-2 flex flex-col gap-2 p-1">
              <a href={MAIL} onClick={() => setMobileOpen(false)} className="btn btn-ghost text-sm">
                Contact the team
              </a>
              <a href="#start" onClick={() => setMobileOpen(false)} className="btn btn-primary text-sm">
                Book a demo
              </a>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}
