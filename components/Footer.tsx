import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-night text-paper">
      <div className="mx-auto flex max-w-page flex-col gap-6 px-5 py-10 md:flex-row md:items-center md:justify-between md:px-8">
        <div className="flex min-w-0 items-center gap-2.5">
          <Image
            src="/logo.png"
            alt=""
            aria-hidden="true"
            width={36}
            height={36}
            className="h-8 w-8 shrink-0 sm:h-9 sm:w-9"
          />
          <span className="whitespace-nowrap font-display text-base font-bold tracking-tight text-paper sm:text-lg">
            TestForge<span className="text-accent">.Ai</span>
          </span>
          <span className="ml-3 hidden font-mono text-[11px] text-[#9aa3ad] lg:inline">
            AI does the heavy work. People stay in control.
          </span>
        </div>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-[#9aa3ad]">
            <li>
              <a href="#how-it-works" className="transition-colors hover:text-paper">
                How it works
              </a>
            </li>
            <li>
              <a href="#trust" className="transition-colors hover:text-paper">
                Trust
              </a>
            </li>
            <li>
              <a href="#faq" className="transition-colors hover:text-paper">
                FAQ
              </a>
            </li>
            <li>
              <a href="#start" className="text-paper underline decoration-accent decoration-2 underline-offset-4">
                Try TestForge
              </a>
            </li>
          </ul>
        </nav>

        <p className="font-mono text-[11px] text-[#9aa3ad]">
          © 2026 TestForge
        </p>
      </div>
    </footer>
  );
}
