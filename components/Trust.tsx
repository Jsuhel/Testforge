import Reveal from "./Reveal";

const OPTIONS = [
  {
    title: "Enter manually",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
        <path
          d="M7 9h6M7 13h10M17 9h.01"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
    body: "Type the URLs, roles and test data into a form you control. Nothing is inferred, nothing is connected. The right default when data is sensitive or lives behind a VPN.",
    tag: "default",
  },
  {
    title: "Connect your database",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <ellipse cx="12" cy="5.5" rx="8" ry="3" stroke="currentColor" strokeWidth="2" />
        <path
          d="M4 5.5v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6M4 11.5v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    ),
    body: "Point TestForge at a staging or masked database and it looks up its own test data: accounts, roles, boundary values. Read-only access, and you choose when.",
    tag: "faster",
  },
];

export default function Trust() {
  return (
    <section id="trust" className="border-b border-line bg-night text-paper">
      <div className="mx-auto max-w-page px-5 py-16 md:px-8 md:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <p className="kicker mb-4 flex items-center gap-3 text-fog">
              <span className="inline-block h-px w-8 bg-violet" aria-hidden="true" />
              Trust
            </p>
            <h2 className="font-display text-4xl font-medium leading-[1.05] tracking-[-0.015em] text-white md:text-5xl">
              You approve <span className="text-signal">every stage.</span>
            </h2>
            <p className="mt-5 max-w-md leading-relaxed text-fog">
              TestForge does the heavy work: reading, drafting, scripting,
              running. The decision to accept any of it stays with a person, at
              every one of the five stages.
            </p>
            <p className="mt-8 border-l-2 border-violet pl-4 text-sm leading-relaxed text-ash">
              Sensitive data is handled with care: documents and credentials
              stay in your workspace, database access is read-only and scoped,
              and you can revoke a connection at any time.
            </p>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {OPTIONS.map((o, i) => (
              <Reveal key={o.title} delay={0.08 * (i + 1)} className="h-full">
                <div className="flex h-full flex-col rounded-pill border border-white/10 bg-carbon p-7 transition-colors duration-200 hover:border-violet/40">
                  <div className="flex items-center justify-between">
                    <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-violet/30 bg-violet/10 text-violet">
                      {o.icon}
                    </span>
                    <span className="chip chip-dark">{o.tag}</span>
                  </div>
                  <h3 className="mt-5 font-display text-xl font-medium tracking-tight text-white">
                    {o.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-fog">
                    {o.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
