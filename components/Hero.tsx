import HeroMock from "./HeroMock";
import Reveal from "./Reveal";

export default function Hero() {
  return (
    <section id="top" className="border-b border-line">
      <div className="mx-auto grid max-w-page grid-cols-[minmax(0,1fr)] gap-12 px-5 pb-16 pt-14 md:px-8 md:pb-24 md:pt-20 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center lg:gap-16">
        <Reveal>
          <p className="kicker mb-6 flex items-center gap-3">
            <span className="inline-block h-px w-8 bg-accent" aria-hidden="true" />
            Test authoring for banking QA teams
          </p>
          <h1 className="font-display text-[2.6rem] font-bold leading-[1.02] tracking-[-0.02em] sm:text-6xl lg:text-[4.25rem]">
            Upload the FSD.
            <br />
            Get tests you can&nbsp;trust.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            TestForge reads your requirements, explains them, writes test cases
            for you to approve, automates them in Playwright, and reports every
            failure with a screenshot.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a href="#start" className="btn btn-primary">
              Start with an FSD
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M4 12h15M13 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <a href="#how-it-works" className="btn btn-ghost">
              See how it works
            </a>
          </div>
          <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-line pt-6">
            {[
              ["01", "Read & explain the FSD"],
              ["02", "Cases you approve"],
              ["03", "Playwright + evidence"],
            ].map(([n, label]) => (
              <div key={n}>
                <dt className="font-mono text-xs text-accent">{n}</dt>
                <dd className="mt-1 text-sm leading-snug text-muted">{label}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={0.12}>
          <HeroMock />
        </Reveal>
      </div>
    </section>
  );
}
