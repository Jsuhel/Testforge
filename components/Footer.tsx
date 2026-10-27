import LogoMark from "./ui/Logo";

const TILES = [
  {
    eyebrow: "Next step",
    title: "Book a demo",
    href: "#start",
    glow: "rgba(64,91,255,0.35)",
  },
  {
    eyebrow: "Workflow",
    title: "Walk the stages",
    href: "#how-it-works",
    glow: "rgba(112,132,255,0.28)",
  },
  {
    eyebrow: "Open source",
    title: "Browse the repo",
    href: "https://github.com/Jsuhel/Testforge",
    glow: "rgba(61,214,245,0.2)",
  },
  {
    eyebrow: "Questions",
    title: "Straight answers",
    href: "#faq",
    glow: "rgba(64,91,255,0.25)",
  },
];

const COLUMNS: { heading: string; links: { label: string; href: string }[] }[] = [
  {
    heading: "Product",
    links: [
      { label: "How it works", href: "#how-it-works" },
      { label: "Platform", href: "#platform" },
      { label: "Coverage map", href: "#coverage" },
      { label: "Workspace modules", href: "#capabilities" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Docs and answers", href: "#faq" },
      { label: "Developer start", href: "#developers" },
      { label: "Get started", href: "#resources" },
      { label: "Request a demo", href: "#start" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "Source on GitHub", href: "https://github.com/Jsuhel/Testforge" },
      { label: "Email the team", href: "mailto:jsuhel122@gmail.com" },
      { label: "Back to top", href: "#top" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-carbon text-white">
      {/* CTA tiles */}
      <div className="mx-auto max-w-page px-5 pt-14 md:px-8 md:pt-20">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TILES.map((tile) => {
            const external = tile.href.startsWith("http");
            return (
              <a
                key={tile.title}
                href={tile.href}
                target={external ? "_blank" : undefined}
                rel={external ? "noreferrer" : undefined}
                className="group relative overflow-hidden rounded-[30px] border border-white/10 p-6 transition-all duration-200 hover:-translate-y-1 hover:border-violet/50 hover:shadow-[0_0_50px_rgba(64,91,255,0.15)]"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-80 transition-opacity duration-200 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(120% 90% at 20% 100%, ${tile.glow}, transparent 65%)`,
                  }}
                />
                <span className="relative flex h-full flex-col">
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-fog">
                    {tile.eyebrow}
                  </span>
                  <span className="mt-1 flex items-center gap-2 font-display text-lg font-medium text-white">
                    {tile.title}
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                      className="text-violet transition-transform duration-200 group-hover:translate-x-1"
                    >
                      <path d="M4 12h15M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </span>
              </a>
            );
          })}
        </div>
      </div>

      {/* Link columns */}
      <div className="mx-auto grid max-w-page gap-10 px-5 py-14 md:grid-cols-[1.2fr_repeat(3,minmax(0,1fr))] md:px-8">
        <div>
          <div className="flex items-center gap-2.5">
            <LogoMark className="h-9 w-9 shrink-0" />
            <span className="font-display text-lg font-medium leading-none tracking-[-0.01em]">
              TestForge
              <span className="font-semibold text-violet">.Ai</span>
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-fog">
            AI does the heavy work. People stay in control. Built for banking
            QA teams who sign off on quality.
          </p>
          <div className="mt-5 flex gap-2">
            <a
              href="https://github.com/Jsuhel/Testforge"
              target="_blank"
              rel="noreferrer"
              aria-label="TestForge on GitHub"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-ash transition-colors hover:border-violet hover:text-white"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.56 9.56 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85V21c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
              </svg>
            </a>
            <a
              href="mailto:jsuhel122@gmail.com"
              aria-label="Email the TestForge team"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-ash transition-colors hover:border-violet hover:text-white"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.8" />
                <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>

        {COLUMNS.map((col) => (
          <nav key={col.heading} aria-label={col.heading}>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-slate2">
              {col.heading}
            </p>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                    className="text-sm text-ash transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      {/* Legal */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-page flex-col gap-1.5 px-5 py-5 font-mono text-[11px] text-slate2 sm:flex-row sm:items-center sm:justify-between md:px-8">
          <p>© 2026 TestForge.Ai · built for banking QA teams</p>
          <p>Every stage approved by a human, on the record.</p>
        </div>
      </div>
    </footer>
  );
}
