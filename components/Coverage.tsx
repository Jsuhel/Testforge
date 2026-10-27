import Reveal from "./Reveal";

/* The ten coverage types the generator draws from the FSD. */
const TYPES = [
  {
    name: "Smoke",
    desc: "The build is alive and the critical paths open.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M6 17h11a4 4 0 0 0 .8-7.9A6 6 0 0 0 6.2 9.5 3.5 3.5 0 0 0 6 17Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: "Functional",
    desc: "Every documented behaviour, exactly as specified.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M8 4h8a2 2 0 0 1 2 2v14l-6-3-6 3V6a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M9.5 10l1.8 1.8L14.5 8.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: "Positive & negative",
    desc: "The happy path, and every way to leave it.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M5 12h6M8 9v6M14 12h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M3 20h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "Boundary & equivalence",
    desc: "Edges and partitions from the spec's own limits.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M8 4H5v16h3M16 4h3v16h-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 8v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "End-to-end",
    desc: "Whole workflows, from login to ledger entry.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 18c6 0 4-12 10-12h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M15 3l3 3-3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: "Integration",
    desc: "Hand-offs between modules and external systems.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M10.5 13.5a4 4 0 0 0 6 0l3-3a4 4 0 0 0-6-6l-1 1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M13.5 10.5a4 4 0 0 0-6 0l-3 3a4 4 0 0 0 6 6l1-1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "Regression",
    desc: "Yesterday's guarantees, re-earned on every build.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 12a8 8 0 0 1 14-5M20 12a8 8 0 0 1-14 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M18 3v4h-4M6 21v-4h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: "Database validation",
    desc: "Rows and balances checked after the UI says done.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <ellipse cx="12" cy="6" rx="8" ry="3" stroke="currentColor" strokeWidth="1.8" />
        <path d="M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    ),
  },
  {
    name: "Security checks",
    desc: "Permissions, roles and input hardening, where they apply.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 3l7 4v5c0 4.4-3 8.4-7 9-4-.6-7-4.6-7-9V7l7-4Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: "Performance",
    desc: "Response times under load, held to thresholds.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 15a8 8 0 1 1 16 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M12 15l4.5-4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M2 19h20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
];

/* The traceability chain: requirement → case → script → execution result. */
const CHAIN = [
  {
    id: "REQ-042",
    label: "Requirement",
    note: "Cutoff queues to the next working day",
  },
  {
    id: "TC-014",
    label: "Test case",
    note: "Pre-close after cutoff, boundary at 15:30",
  },
  {
    id: "tc-014.spec.ts",
    label: "Playwright script",
    note: "Approved line by line before it ran",
  },
  {
    id: "RUN #48",
    label: "Execution result",
    note: "Pass, 1.2s, evidence attached",
  },
];

/**
 * Coverage map: the ten test types the generator drafts from the FSD,
 * then the traceability chain that binds requirement, case, script and
 * result into one auditable thread.
 */
export default function Coverage() {
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

        <div className="mt-12 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-5">
          {TYPES.map((t, i) => (
            <Reveal key={t.name} delay={0.04 * i} className="h-full">
              <div
                data-testid={`coverage-tile-${i + 1}`}
                className="group flex h-full flex-col rounded-[30px] border border-white/10 bg-carbon p-5 transition-all duration-200 hover:-translate-y-1 hover:border-violet/50 hover:shadow-[0_0_50px_rgba(64,91,255,0.15)]"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-violet/30 bg-violet/10 text-violet transition-colors group-hover:border-violet/60">
                  {t.icon}
                </span>
                <h3 className="mt-4 text-[15px] font-semibold leading-snug text-white">
                  {t.name}
                </h3>
                <p className="mt-1.5 text-[13px] leading-snug text-fog">{t.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Traceability chain */}
        <Reveal delay={0.1} className="mt-6">
          <div
            data-testid="trace-chain"
            className="rounded-[30px] border border-white/10 bg-carbon p-6 md:p-8"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <p className="kicker">Traceability, both directions</p>
              <p className="max-w-md text-[13px] leading-snug text-fog">
                Every artifact links back to the clause it came from, and
                forward to the evidence it produced.
              </p>
            </div>

            <div className="mt-6 flex flex-col items-stretch gap-0 lg:flex-row lg:items-center">
              {CHAIN.map((node, i) => (
                <div key={node.id} className="flex min-w-0 flex-col items-stretch lg:flex-row lg:items-center">
                  <div className="min-w-0 flex-1 rounded-2xl border border-white/10 bg-[#101010] p-4">
                    <p className="font-mono text-[13px] font-medium text-violet">
                      {node.id}
                    </p>
                    <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-slate2">
                      {node.label}
                    </p>
                    <p className="mt-2 text-[13px] leading-snug text-ash">
                      {node.note}
                    </p>
                  </div>
                  {i < CHAIN.length - 1 && (
                    <>
                      <span
                        aria-hidden="true"
                        className="trace-line-y mx-auto h-7 w-px shrink-0 lg:hidden"
                      />
                      <span
                        aria-hidden="true"
                        className="trace-line-x hidden h-px w-10 shrink-0 lg:block"
                      />
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
