import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";

const ENTRIES = [
  {
    title: "Explore the docs.",
    tag: "Docs",
    body: "Prep your FSD, wire the suite into CI, read how the pipeline handles approval.",
    href: "#faq",
  },
  {
    title: "Walk the workflow.",
    tag: "How it works",
    body: "Six stages from FSD to assigned defect, one real product screen at a time.",
    href: "#how-it-works",
  },
  {
    title: "Star the repo.",
    tag: "Community",
    body: "Source, issues and the roadmap live in the open. Feedback shapes the next stage.",
    href: "https://github.com/Jsuhel/Testforge",
  },
];

/**
 * Resources as an editorial index: numbered rows on hairlines, no boxes.
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

        <Reveal className="mt-10">
          <ul data-testid="resource-index" className="border-t border-white/10">
            {ENTRIES.map((entry, i) => (
              <li key={entry.tag}>
                <a
                  href={entry.href}
                  target={entry.href.startsWith("http") ? "_blank" : undefined}
                  rel={entry.href.startsWith("http") ? "noreferrer" : undefined}
                  data-testid={`resource-row-${i + 1}`}
                  className="group grid grid-cols-[auto_1fr_auto] items-start gap-5 border-b border-white/10 py-7 transition-colors hover:bg-white/[0.025] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-violet md:gap-8 md:py-9"
                >
                  <span className="pt-1.5 font-mono text-[11px] tracking-[0.18em] text-violet">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0">
                    <h3 className="font-display text-2xl font-medium tracking-tight text-white transition-transform duration-200 ease-out group-hover:translate-x-1.5 md:text-[28px]">
                      {entry.title}
                    </h3>
                    <p className="mt-2 max-w-xl text-sm leading-relaxed text-fog">{entry.body}</p>
                  </span>
                  <span className="flex items-center gap-4 pt-1.5">
                    <span className="hidden font-mono text-[10px] uppercase tracking-[0.14em] text-slate2 sm:block">
                      {entry.tag}
                    </span>
                    <span
                      aria-hidden="true"
                      className="text-violet transition-transform duration-200 ease-out group-hover:translate-x-1.5"
                    >
                      <ArrowRight size={18} strokeWidth={2.2} aria-hidden="true" />
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
