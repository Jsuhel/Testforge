"use client";

import { useState } from "react";
import {
  Flame,
  ClipboardCheck,
  Diff,
  Braces,
  Route,
  Network,
  History,
  Database,
  ShieldCheck,
  Gauge,
} from "lucide-react";
import Reveal from "./Reveal";

/* The ten coverage types the generator draws from the FSD. */
const TYPES = [
  {
    name: "Smoke",
    desc: "The build is alive and the critical paths open.",
    icon: <Flame size={18} strokeWidth={1.8} aria-hidden="true" />,
  },
  {
    name: "Functional",
    desc: "Every documented behaviour, exactly as specified.",
    icon: <ClipboardCheck size={18} strokeWidth={1.8} aria-hidden="true" />,
  },
  {
    name: "Positive & negative",
    desc: "The happy path, and every way to leave it.",
    icon: <Diff size={18} strokeWidth={1.8} aria-hidden="true" />,
  },
  {
    name: "Boundary & equivalence",
    desc: "Edges and partitions from the spec's own limits.",
    icon: <Braces size={18} strokeWidth={1.8} aria-hidden="true" />,
  },
  {
    name: "End-to-end",
    desc: "Whole workflows, from login to ledger entry.",
    icon: <Route size={18} strokeWidth={1.8} aria-hidden="true" />,
  },
  {
    name: "Integration",
    desc: "Hand-offs between modules and external systems.",
    icon: <Network size={18} strokeWidth={1.8} aria-hidden="true" />,
  },
  {
    name: "Regression",
    desc: "Yesterday's guarantees, re-earned on every build.",
    icon: <History size={18} strokeWidth={1.8} aria-hidden="true" />,
  },
  {
    name: "Database validation",
    desc: "Rows and balances checked after the UI says done.",
    icon: <Database size={18} strokeWidth={1.8} aria-hidden="true" />,
  },
  {
    name: "Security checks",
    desc: "Permissions, roles and input hardening, where they apply.",
    icon: <ShieldCheck size={18} strokeWidth={1.8} aria-hidden="true" />,
  },
  {
    name: "Performance",
    desc: "Response times under load, held to thresholds.",
    icon: <Gauge size={18} strokeWidth={1.8} aria-hidden="true" />,
  },
];

/* The traceability chain: requirement → case → script → execution result. */
const CHAIN = [
  { id: "REQ-042", label: "Requirement", note: "Cutoff queues to the next working day" },
  { id: "TC-014", label: "Test case", note: "Pre-close after cutoff, boundary at 15:30" },
  { id: "tc-014.spec.ts", label: "Playwright script", note: "Approved line by line before it ran" },
  { id: "RUN #48", label: "Execution result", note: "Pass, 1.2s, evidence attached" },
];

/*
 * Wheel geometry: ten nodes evenly on a ring of radius 38 (percent of the
 * wheel), the first at twelve o'clock. Node positions travel as CSS custom
 * properties so the same markup flows as a plain list below md.
 */
const RING = 38;
const NODES = TYPES.map((t, i) => {
  const a = (-90 + i * 36) * (Math.PI / 180);
  return { ...t, i, x: Math.cos(a) * RING, y: Math.sin(a) * RING, sx: 50 + Math.cos(a) * RING, sy: 50 + Math.sin(a) * RING };
});

/**
 * Coverage map: the ten test types as a radial wheel around the one read of
 * the spec that produces them, then the traceability thread that binds
 * requirement, case, script and result into one auditable chain.
 */
export default function Coverage() {
  const [active, setActive] = useState(0);
  const current = NODES[active];

  return (
    <section id="coverage" className="relative overflow-hidden border-b border-line">
      <div
        aria-hidden="true"
        className="glow-wash -top-24 left-1/4 h-[380px] w-[520px] opacity-25"
      />
      <div className="relative mx-auto max-w-page px-5 py-16 md:px-8 md:py-24">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="kicker mb-4">Coverage map</p>
            <h2 className="max-w-xl font-display text-4xl font-medium leading-[1.05] tracking-[-0.015em] text-white md:text-5xl">
              Ten kinds of cover.
              <br />
              <span className="text-signal">One read of the spec.</span>
            </h2>
          </div>
          <p className="max-w-sm leading-relaxed text-fog">
            Every case is typed, prioritised and traced to the clause it came
            from. Review, filter, search and download the suite before anything
            runs.
          </p>
        </Reveal>

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          {/* The wheel: nodes orbit the single spec read at the centre */}
          <Reveal className="min-w-0">
            <div data-testid="coverage-wheel" className="cov-wheel relative mx-auto w-full max-w-[560px]">
              <svg
                viewBox="0 0 100 100"
                aria-hidden="true"
                className="cov-wheel-svg absolute inset-0 h-full w-full"
              >
                <circle cx="50" cy="50" r={RING} className="cov-orbit" fill="none" stroke="rgba(255,255,255,0.16)" strokeWidth="0.3" strokeDasharray="1 2.2" />
                {NODES.map((n) => (
                  <line
                    key={n.name}
                    x1="50"
                    y1="50"
                    x2={n.sx}
                    y2={n.sy}
                    className={`cov-spoke ${n.i === active ? "cov-spoke-on" : ""}`}
                    style={{ animationDelay: `${0.25 + n.i * 0.06}s` }}
                  />
                ))}
                <circle cx="50" cy="50" r="8" fill="#191919" stroke="rgba(255,255,255,0.14)" strokeWidth="0.3" />
              </svg>

              <div className="cov-center pointer-events-none absolute left-1/2 top-1/2 z-[1] w-24 -translate-x-1/2 -translate-y-1/2 text-center">
                <p className="font-mono text-[11px] font-medium tracking-[0.18em] text-violet">FSD</p>
                <p className="mt-1 text-[10px] leading-tight text-slate2">one read, ten kinds of cover</p>
              </div>

              {NODES.map((n) => (
                <div
                  key={n.name}
                  data-testid={`coverage-tile-${n.i + 1}`}
                  className="cov-node"
                  style={{ ["--nx" as string]: `${n.x}%`, ["--ny" as string]: `${n.y}%` }}
                >
                  <span className="cov-node-icon flex h-9 w-9 items-center justify-center rounded-xl border border-violet/30 bg-violet/10 text-violet md:hidden">
                    {n.icon}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`mx-auto mb-1 hidden h-1.5 w-1.5 rounded-full transition-colors md:block ${
                      n.i === active ? "bg-plasma" : "bg-white/25"
                    }`}
                  />
                  <h3 className="font-display text-[15px] font-medium leading-tight tracking-tight md:text-center">
                    <button
                      type="button"
                      onMouseEnter={() => setActive(n.i)}
                      onFocus={() => setActive(n.i)}
                      onClick={() => setActive(n.i)}
                      className={`rounded px-1 py-0.5 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet ${
                        n.i === active ? "text-white" : "text-ash hover:text-white"
                      }`}
                    >
                      {n.name}
                    </button>
                  </h3>
                  <p className="mt-1 text-[13px] leading-snug text-fog md:hidden">{n.desc}</p>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Detail: the focused type, beside the wheel from lg up */}
          <Reveal delay={0.1} className="min-w-0">
            <div data-testid="coverage-detail" className="cov-detail border-t border-white/10 pt-6 lg:border-t-0 lg:pt-2">
              <p className="font-mono text-[11px] tracking-[0.18em] text-slate2">
                {String(active + 1).padStart(2, "0")} / 10
              </p>
              <div className="mt-4 flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-violet/30 bg-violet/10 text-violet">
                  {current.icon}
                </span>
                <div className="min-w-0">
                  <h3 className="font-display text-2xl font-medium tracking-tight text-white md:text-[28px] md:leading-tight">
                    {current.name}
                  </h3>
                  <p className="mt-2 max-w-sm text-sm leading-relaxed text-fog md:text-[15px]">
                    {current.desc}
                  </p>
                </div>
              </div>
              <p className="mt-6 max-w-sm text-[13px] leading-relaxed text-slate2">
                Hover or focus any node on the wheel to read its kind of cover.
              </p>
            </div>
          </Reveal>
        </div>

        {/* Traceability thread */}
        <Reveal delay={0.1} className="mt-14">
          <div data-testid="trace-chain" className="border-t border-white/10 pt-8">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <p className="kicker">Traceability, both directions</p>
              <p className="max-w-md text-[13px] leading-snug text-fog">
                Every artifact links back to the clause it came from, and
                forward to the evidence it produced.
              </p>
            </div>

            <ol className="mt-6 grid gap-x-8 gap-y-7 md:grid-cols-4">
              {CHAIN.map((node, i) => (
                <li key={node.id} className="relative min-w-0">
                  <span aria-hidden="true" className="absolute -left-px top-1 h-[calc(100%-4px)] w-px bg-gradient-to-b from-violet/60 to-transparent" />
                  <div className="pl-4">
                    <p className="font-mono text-[13px] font-medium text-violet">{node.id}</p>
                    <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-slate2">
                      {node.label}
                    </p>
                    <p className="mt-2 text-[13px] leading-snug text-ash">{node.note}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
