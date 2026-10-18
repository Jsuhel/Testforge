import Reveal from "./Reveal";

function LogicIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 6h5l3 6 3-6h5M4 18h5l3-6M17 14l3 3 3-3"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        transform="scale(0.86) translate(1 1)"
      />
    </svg>
  );
}

function RegressionIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 12a8 8 0 0 1 14-5M20 12a8 8 0 0 1-14 5M18 3v4h-4M6 21v-4h4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GaugeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 15a8 8 0 1 1 16 0M12 15l4-4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="15" r="1.4" fill="currentColor" />
    </svg>
  );
}

function DbCheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <ellipse cx="12" cy="5.5" rx="7" ry="2.5" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M5 5.5v6c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-6M5 11.5v6c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

const CARDS = [
  {
    icon: <LogicIcon />,
    title: "Logic & functional",
    body: "Every rule the FSD states becomes an asserted Playwright step — the happy paths, the negative paths and the combinations in between.",
  },
  {
    icon: <RegressionIcon />,
    title: "Regression",
    body: "The suite re-runs on every build. What still passes stays green; what broke arrives with a screenshot, the step and the diff.",
  },
  {
    icon: <GaugeIcon />,
    title: "Performance",
    body: "Page-load and API-latency budgets asserted in the same run, from the same traces — no separate tooling to wire up.",
  },
  {
    icon: <DbCheckIcon />,
    title: "Data integrity",
    body: "UI action, then the database check: the row exists, the balance moved, the audit trail wrote what it should have.",
  },
];

export default function Coverage() {
  return (
    <section className="border-b border-line">
      <div className="mx-auto max-w-page px-5 py-16 md:px-8 md:py-24">
        <Reveal>
          <p className="kicker mb-4 flex items-center gap-3">
            <span className="inline-block h-px w-8 bg-accent" aria-hidden="true" />
            One pipeline, every test type
          </p>
          <h2 className="max-w-2xl font-display text-4xl font-light leading-[1.05] tracking-[-0.015em] md:text-5xl">
            Not just functional. The whole regression.
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
            The same Playwright pipeline that drafts your functional suite
            carries the rest — logic, regression, performance and the data
            checks that prove the system did what the screen says it did.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CARDS.map((c, i) => (
            <Reveal key={c.title} delay={0.06 * i}>
              <div className="flex h-full flex-col rounded-lg border border-line p-5">
                <span className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-md border border-line-strong text-ink">
                  {c.icon}
                </span>
                <h3 className="font-display font-medium">{c.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{c.body}</p>
                <span className="mt-4 font-mono text-[10px] uppercase tracking-[0.1em] text-muted/70">
                  Playwright · TypeScript
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
