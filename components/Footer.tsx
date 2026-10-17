import Image from "next/image";

const PRODUCT_LINKS = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#trust", label: "Trust & control" },
  { href: "#faq", label: "FAQ" },
];

const COMPANY_LINKS = [
  { href: "#start", label: "Book a walkthrough" },
  { href: "#start", label: "Give feedback" },
  { href: "mailto:jsuhel122@gmail.com", label: "Email the team" },
];

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div>
      <h3 className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#9aa3ad]">
        {title}
      </h3>
      <ul className="mt-4 grid gap-2.5">
        {links.map((l) => (
          <li key={l.label}>
            <a
              href={l.href}
              className="text-sm text-[#c8cdd4] transition-colors hover:text-paper"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-night text-paper">
      <div className="mx-auto max-w-page px-5 py-12 md:px-8 md:py-16">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)]">
          {/* Brand */}
          <div>
            <div className="flex min-w-0 items-center gap-2.5">
              <Image
                src="/logo.png"
                alt=""
                aria-hidden="true"
                width={36}
                height={36}
                className="h-9 w-9 shrink-0"
              />
              <span className="whitespace-nowrap font-display text-lg font-bold tracking-tight text-paper">
                TestForge<span className="text-accent">.Ai</span>
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#9aa3ad]">
              AI does the heavy work. People stay in control. Test cases from
              your FSD, approved by you, automated in Playwright.
            </p>
          </div>

          <FooterColumn title="Product" links={PRODUCT_LINKS} />
          <FooterColumn title="Company" links={COMPANY_LINKS} />
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-[#eef0ee14] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[11px] text-[#9aa3ad]">
            © 2026 TestForge.Ai — built for banking QA teams
          </p>
          <p className="font-mono text-[11px] text-[#9aa3ad]">
            Playwright · TypeScript · runs on your infrastructure
          </p>
        </div>
      </div>
    </footer>
  );
}
