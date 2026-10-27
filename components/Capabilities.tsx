import type { ReactNode } from "react";
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
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <ellipse cx="12" cy="6" rx="8" ry="3" stroke="currentColor" strokeWidth="1.8" />
        <path d="M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" stroke="currentColor" strokeWidth="1.8" />
        <path d="M8 9.5l1.5 1.5M16 9.5L14.5 11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
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
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="5" width="18" height="13" rx="3" stroke="currentColor" strokeWidth="1.8" />
        <path d="M10 9.5v4l4-2-4-2Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    ),
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
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 12a8 8 0 0 1 14-5M20 12a8 8 0 0 1-14 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M18 3v4h-4M6 21v-4h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
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
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 15a8 8 0 1 1 16 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M12 15l4.5-4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M2 19h20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
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
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 3l9 16H3l9-16Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M12 10v4M12 16.5v.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
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
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 20V10M10 20V4M16 20v-7M21 20H3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
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
 * The wider workspace: database test data, headed execution, regression,
 * performance, defect workflow and reporting, as six module cards.
 */
export default function Capabilities() {
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

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {CARDS.map((card, i) => (
            <Reveal key={card.tag} delay={0.06 * i} className="h-full">
              <article
                data-testid={`capability-card-${i + 1}`}
                className="group flex h-full flex-col rounded-[30px] border border-white/10 bg-carbon p-6 transition-all duration-200 hover:-translate-y-1 hover:border-violet/50 hover:shadow-[0_0_50px_rgba(64,91,255,0.15)]"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-violet/30 bg-violet/10 text-violet transition-colors group-hover:border-violet/60">
                    {card.icon}
                  </span>
                  <span className="text-right font-mono text-[10px] uppercase tracking-[0.14em] text-slate2">
                    {card.tag}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-xl font-medium tracking-tight text-white">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-fog">{card.lede}</p>

                <ul className="mt-6 grid gap-2.5 border-t border-white/10 pt-5">
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
            </Reveal>
          ))}
        </div>

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
