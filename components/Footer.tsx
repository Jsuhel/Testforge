import Image from "next/image";

const LINKS = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#trust", label: "Trust & control" },
  { href: "#faq", label: "FAQ" },
  { href: "#start", label: "Request a demo" },
  { href: "mailto:jsuhel122@gmail.com", label: "Email the team" },
];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-paper text-ink">
      <div className="mx-auto max-w-page px-5 py-8 md:px-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-center gap-2.5">
            <Image
              src="/logo-128.png"
              alt=""
              aria-hidden="true"
              width={32}
              height={32}
              unoptimized
              className="h-8 w-8 shrink-0"
            />
            <span className="whitespace-nowrap font-display text-[17px] font-bold leading-none tracking-[-0.01em]">
              TestForge
              <span className="font-semibold text-accent">.Ai</span>
            </span>
          </div>

          <nav aria-label="Footer">
            <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
              {LINKS.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-muted transition-colors hover:text-ink"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="https://github.com/Jsuhel/Testforge"
                  className="inline-flex items-center gap-1 text-muted transition-colors hover:text-ink"
                >
                  Source on GitHub
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M7 17 17 7M9 7h8v8"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-6 flex flex-col gap-1.5 border-t border-line pt-4 font-mono text-[11px] text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 TestForge.Ai · built for banking QA teams</p>
          <p>AI does the heavy work. People stay in control.</p>
        </div>
      </div>
    </footer>
  );
}
