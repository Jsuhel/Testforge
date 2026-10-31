"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  Activity,
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Boxes,
  CalendarCheck,
  Code2,
  HelpCircle,
  LayoutGrid,
  LineChart,
  ListChecks,
  MessageSquare,
  PackageCheck,
  Play,
  PlayCircle,
  RotateCcw,
  ShieldCheck,
  Terminal,
  UserCheck,
  Workflow,
  Zap,
  type LucideIcon,
} from "lucide-react";
import AnnouncementBar from "./AnnouncementBar";
import Logo from "./ui/Logo";

/* ---------------------------------------------------------------- icons */

function tileIcon(Icon: LucideIcon): ReactNode {
  return <Icon size={15} strokeWidth={1.8} aria-hidden="true" />;
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
            icon: tileIcon(Activity),
          },
          {
            title: "FSD chat",
            desc: "Upload the document, question it until gaps surface.",
            href: "#how-it-works",
            icon: tileIcon(MessageSquare),
          },
          {
            title: "Test cases",
            desc: "Drafts with gaps flagged, approved case by case.",
            href: "#how-it-works",
            icon: tileIcon(ListChecks),
          },
          {
            title: "Automation",
            desc: "Standard Playwright you can read and edit.",
            href: "#platform",
            icon: tileIcon(Code2),
          },
          {
            title: "Execution",
            desc: "Live runs with a screenshot on every break.",
            href: "#platform",
            icon: tileIcon(Play),
          },
          {
            title: "Reporting",
            desc: "Results sorted pass, fail, blocked, skipped.",
            href: "#platform",
            icon: tileIcon(BarChart3),
          },
          {
            title: "Tester assigning",
            desc: "Defects routed to the developer who owns them.",
            href: "#how-it-works",
            icon: tileIcon(UserCheck),
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
            icon: tileIcon(LayoutGrid),
          },
          {
            title: "Workspace modules",
            desc: "Test data, load, regression, defects, reports.",
            href: "#capabilities",
            icon: tileIcon(Boxes),
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
            icon: tileIcon(RotateCcw),
          },
          {
            title: "UAT sign-off",
            desc: "Business scenarios a reviewer can actually read.",
            href: "#how-it-works",
            icon: tileIcon(BadgeCheck),
          },
          {
            title: "Release evidence",
            desc: "Screenshots, state and likely cause for every failure.",
            href: "#platform",
            icon: tileIcon(PackageCheck),
          },
          {
            title: "Vendor testing",
            desc: "Hold a supplier's delivery to the spec it signed.",
            href: "#how-it-works",
            icon: tileIcon(CalendarCheck),
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
            icon: tileIcon(ShieldCheck),
          },
          {
            title: "Testers going automation-first",
            desc: "The typing is done; the judgment stays yours.",
            href: "#faq",
            icon: tileIcon(Zap),
          },
          {
            title: "Product managers",
            desc: "Spec contradictions surface before development.",
            href: "#faq",
            icon: tileIcon(LineChart),
          },
          {
            title: "Developers",
            desc: "Failures arrive reproducible, with the state attached.",
            href: "#developers",
            icon: tileIcon(Terminal),
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
            icon: tileIcon(HelpCircle),
          },
          {
            title: "Execution workflow",
            desc: "The six stages, one card each.",
            href: "#how-it-works",
            icon: tileIcon(Workflow),
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
            icon: tileIcon(ArrowRight),
          },
          {
            title: "How it works",
            desc: "The six stages, one pipeline.",
            href: "#how-it-works",
            icon: tileIcon(PlayCircle),
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
          <Logo size="lg" />

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
