import Reveal from "./Reveal";

const COLUMNS = [
  {
    role: "QA engineers",
    body: "You stop copying requirements into test cases by hand. TestForge drafts the suite from the FSD — boundaries, roles, negative paths — and you spend your time on the judgment calls: reviewing cases, sharpening scripts, digging into the failures that matter. The boring bulk is done before you open the tab.",
  },
  {
    role: "QA leads in banking and finance",
    body: "You get a review trail, not a black box. Every generated case, script and report passed through a named person before it ran. Coverage is visible while the FSD is still being discussed, gaps surface as questions instead of production incidents, and defect assignment stops depending on who happens to be online.",
  },
];

export default function Audience() {
  return (
    <section className="border-b border-line bg-surface2">
      <div className="mx-auto max-w-page px-5 py-16 md:px-8 md:py-24">
        <Reveal>
          <p className="kicker mb-4 flex items-center gap-3">
            <span className="inline-block h-px w-8 bg-accent" aria-hidden="true" />
            Who it is for
          </p>
          <h2 className="max-w-2xl font-display text-4xl font-light leading-[1.05] tracking-[-0.015em] md:text-5xl">
            Built for the people who sign off on quality.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-0">
          {COLUMNS.map((c, i) => (
            <Reveal
              key={c.role}
              delay={0.08 * (i + 1)}
              className={
                i === 0
                  ? "md:border-r md:border-line md:pr-10"
                  : "md:pl-10"
              }
            >
              <h3 className="font-mono text-xs uppercase tracking-[0.14em] text-accent">
                {c.role}
              </h3>
              <p className="mt-4 leading-relaxed text-muted">{c.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
