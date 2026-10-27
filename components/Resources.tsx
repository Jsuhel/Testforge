import Reveal from "./Reveal";

const CARDS = [
  {
    title: "Explore the docs.",
    tag: "Docs",
    body: "Prep your FSD, wire the suite into CI, read how the pipeline handles approval.",
    href: "#faq",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 19V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M8 8h8M8 12h8M8 16h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Walk the workflow.",
    tag: "How it works",
    body: "Six stages from FSD to assigned defect, one real product screen at a time.",
    href: "#how-it-works",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="5" width="18" height="14" rx="3" stroke="currentColor" strokeWidth="1.8" />
        <path d="M10 9.5v5l4.5-2.5L10 9.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Star the repo.",
    tag: "Community",
    body: "Source, issues and the roadmap live in the open. Feedback shapes the next stage.",
    href: "https://github.com/Jsuhel/Testforge",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 3l2.7 5.8 6.3.8-4.6 4.4 1.2 6.2L12 17.2 6.4 20.2l1.2-6.2L3 9.6l6.3-.8L12 3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    ),
  },
];

/**
 * LaunchDarkly's "Resources to get started" four-card grid.
 */
export default function Resources() {
  return (
    <section id="resources" className="border-b border-line">
      <div className="mx-auto max-w-page px-5 py-16 md:px-8 md:py-24">
        <Reveal>
          <h2 className="font-display text-3xl font-medium leading-[1.09] tracking-[-0.015em] text-white md:text-4xl">
            Resources to <span className="text-signal">get started.</span>
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CARDS.map((card, i) => (
            <Reveal key={card.tag} delay={0.06 * i} className="h-full">
              <a
                href={card.href}
                target={card.href.startsWith("http") ? "_blank" : undefined}
                rel={card.href.startsWith("http") ? "noreferrer" : undefined}
                className="group flex h-full flex-col rounded-[30px] border border-white/10 bg-carbon p-6 transition-all duration-200 hover:-translate-y-1 hover:border-violet/50 hover:shadow-[0_0_50px_rgba(64,91,255,0.15)]"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-violet/30 bg-violet/10 text-violet">
                  {card.icon}
                </span>
                <h3 className="mt-5 font-display text-lg font-medium tracking-tight text-white">
                  {card.title}
                </h3>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-slate2">
                  {card.tag}
                </p>
                <p className="mt-2.5 text-sm leading-relaxed text-fog">{card.body}</p>
                <span
                  aria-hidden="true"
                  className="mt-auto inline-flex pt-5 text-violet transition-transform duration-200 group-hover:translate-x-1"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M4 12h15M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
