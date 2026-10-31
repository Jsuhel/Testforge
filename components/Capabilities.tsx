"use client";

import { useState, type ReactNode } from "react";
import { Lock, MonitorPlay, History, Gauge, Bug, BarChart3 } from "lucide-react";
import Reveal from "./Reveal";

/* The thirteen workspace modules, §12 of the plan, as a quiet chip row. */
const MODULES = [
  "Dashboard",
  "Projects",
  "FSD Analysis",
  "AI QA Assistant",
  "Test Cases",
  "Automation Scripts",
  "Test Executions",
  "Regression",
  "Performance",
  "Database & Test Data",
  "Bugs & Assignments",
  "Reports & Analytics",
  "Settings & Access",
];

type Card = {
  tag: string;
  icon: ReactNode;
  title: string;
  lede: string;
  items: string[];
};

const CARDS: Card[] = [
  {
    tag: "Database & test data",
    icon: <Lock size={20} strokeWidth={1.8} aria-hidden="true" />,
    title: "Test data, sealed shut.",
    lede: "A read-only window into your system of record, opened by an administrator and never by the AI on its own.",
    items: [
      "Prerequisites fetched for the run: branch, customer and account IDs",
      "Records validated to exist before a case starts",
      "Approved queries and stored procedures only, never free-form SQL",
      "Customer data masked in every report; writes need explicit sign-off",
    ],
  },
  {
    tag: "Execution monitor",
    icon: <MonitorPlay size={20} strokeWidth={1.8} aria-hidden="true" />,
    title: "Watch every step.",
    lede: "Run the suite headed and see the browser work: each step, its status and the clock, live.",
    items: [
      "Step-by-step status with elapsed time per case",
      "Console and network errors surfaced the moment they happen",
      "Screenshots and state captured on any break",
    ],
  },
  {
    tag: "Regression",
    icon: <History size={20} strokeWidth={1.8} aria-hidden="true" />,
    title: "Regression that knows why.",
    lede: "Point it at what changed. It reads the change, the history and the dependencies, then proposes the impacted cases.",
    items: [
      "Module-level impact selection from updated requirements",
      "Reusable suites: re-run yesterday's greens in one click",
      "High-risk workflows prioritised first",
      "Run-over-run comparison and recurring-failure detection",
    ],
  },
  {
    tag: "Performance",
    icon: <Gauge size={20} strokeWidth={1.8} aria-hidden="true" />,
    title: "Load, measured.",
    lede: "Virtual users, ramp-up, duration and thresholds in plain numbers. k6 does the running, the AI reads the result.",
    items: [
      "p50, p95 and p99 response times, throughput and error rate",
      "Thresholds that fail the build when crossed",
      "Load limits and guards so production cannot be overloaded by accident",
    ],
  },
  {
    tag: "Defects",
    icon: <Bug size={20} strokeWidth={1.8} aria-hidden="true" />,
    title: "Failures, classified.",
    lede: "Every result filed as passed, failed, blocked or skipped. Suspected causes stay suspected until a person confirms.",
    items: [
      "Cause sorted: application defect, test data, environment or script",
      "Expected vs actual, with the evidence attached to the record",
      "Assign a developer with severity and priority; the defect keeps its trail",
      "Push to your issue tracker, but only after you approve it",
    ],
  },
  {
    tag: "Reports & analytics",
    icon: <BarChart3 size={20} strokeWidth={1.8} aria-hidden="true" />,
    title: "Reports, ready for sign-off.",
    lede: "The run finishes into a report people can act on, not a log people scroll.",
    items: [
      "Pass percentage grouped by module and by test type",
      "Step-level detail on every failure, evidence attached",
      "Regression comparison with the previous run",
      "Excel and PDF downloads; dashboard trends for the release meeting",
    ],
  },
];

/**
 * The wider workspace as a spec sheet: a module rail on the left, one open
 * panel on the right. No card grid, just hairlines and the module in focus.
 */
export default function Capabilities() {
  const [tab, setTab] = useState(0);

  return (
    <section
      id="capabilities"
      className="overflow-x-clip border-b border-line"
      data-testid="capabilities"
    >
      <div className="mx-auto max-w-page px-5 py-16 md:px-8 md:py-24">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="kicker mb-4">The wider workspace</p>
            <h2 className="max-w-xl font-display text-4xl font-medium leading-[1.05] tracking-[-0.015em] text-white md:text-5xl">
              Beyond the draft:
              <br />
              <span className="text-signal">data, load, regression, reports.</span>
            </h2>
          </div>
          <p className="max-w-sm leading-relaxed text-fog">
            Cases are the start. The workspace carries them through secure
            test data, a browser you can watch, change-driven regression,
            measured load, defects with owners, and reports that close the
            loop.
          </p>
        </Reveal>

        <Reveal className="mt-12">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,300px)_1fr] lg:gap-16">
            {/* Module rail */}
            <div
              role="tablist"
              aria-label="Workspace modules"
              aria-orientation="vertical"
              data-testid="capability-tabs"
              className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:gap-0 lg:overflow-visible lg:border-t lg:border-white/10 lg:pb-0"
            >
              {CARDS.map((card, i) => {
                const on = tab === i;
                return (
                  <button
                    key={card.tag}
                    type="button"
                    role="tab"
                    aria-selected={on}
                    aria-controls={`capability-panel-${i}`}
                    data-testid={`capability-tab-${i + 1}`}
                    onClick={() => setTab(i)}
                    className={`relative flex shrink-0 items-baseline gap-3 rounded-pill px-4 py-2.5 text-left text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet lg:rounded-none lg:border-b lg:border-white/10 lg:px-0 lg:py-4 ${
                      on ? "bg-white/10 text-white lg:bg-transparent" : "text-fog hover:text-white"
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`absolute left-0 top-1/2 hidden h-[calc(100%-14px)] w-0.5 -translate-y-1/2 rounded bg-plasma transition-opacity lg:block ${
                        on ? "opacity-100" : "opacity-0"
                      }`}
                    />
                    <span className="font-mono text-[10px] tracking-[0.14em] text-slate2">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="whitespace-nowrap font-medium">{card.tag}</span>
                  </button>
                );
              })}
            </div>

            {/* Spec panel */}
            <div className="min-w-0">
              {CARDS.map((card, i) => (
                <article
                  key={card.tag}
                  id={`capability-panel-${i}`}
                  role="tabpanel"
                  aria-labelledby={`capability-tab-${i + 1}`}
                  data-testid={`capability-card-${i + 1}`}
                  hidden={tab !== i}
                  className="min-w-0"
                >
                  <div className="flex items-start justify-between gap-6">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-violet/30 bg-violet/10 text-violet">
                      {card.icon}
                    </span>
                    <span aria-hidden="true" className="select-none font-mono text-6xl font-medium leading-none tracking-tight text-white/10">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-6 font-display text-2xl font-medium tracking-tight text-white md:text-3xl">
                    {card.title}
                  </h3>
                  <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-fog">{card.lede}</p>

                  <ul className="mt-8 grid gap-x-10 gap-y-3 border-t border-white/10 pt-6 md:grid-cols-2">
                    {card.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-[13px] leading-snug text-ash">
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          aria-hidden="true"
                          className="mt-0.5 shrink-0 text-violet"
                        >
                          <path d="M4 12l5 5L20 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Module strip, §12: the whole workspace at a glance */}
        <Reveal delay={0.1} className="mt-12 border-t border-line pt-8">
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-3">
            <p className="kicker shrink-0">Thirteen modules, one workspace</p>
            <div className="flex flex-wrap gap-2" data-testid="module-strip">
              {MODULES.map((m) => (
                <span
                  key={m}
                  className="chip chip-dark transition-colors hover:border-violet/60 hover:text-white"
                >
                  {m}
                </span>
              ))}
            </div>
          </div>
          <p className="mt-3 text-[13px] text-slate2">
            Role-based access for administrators, QA engineers, developers and
            viewers.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
