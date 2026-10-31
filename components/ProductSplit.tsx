import { PenLine, Play } from "lucide-react";
import Reveal from "./Reveal";

const HALVES = [
  {
    tag: "Author",
    icon: <PenLine size={20} strokeWidth={1.8} aria-hidden="true" />,
    title: "Draft the suite.",
    lede: "TestForge does the heavy work: reading the FSD, drafting the cases, writing the scripts. You review, correct and approve.",
    cta: { href: "#how-it-works", label: "See authoring" },
    items: [
      "FSD reading and chat, gaps flagged as questions",
      "Test case drafts with boundaries and edge cases",
      "Role, permission and negative-path coverage",
      "Maker-checker friendly approval on every case",
      "Standard Playwright scripts, no proprietary runner",
      "Line-by-line script verification before anything runs",
    ],
  },
  {
    tag: "Run",
    icon: <Play size={20} strokeWidth={1.8} aria-hidden="true" />,
    title: "Prove the release.",
    lede: "Execution and reporting with the evidence an auditor would ask for, captured the moment it happens.",
    cta: { href: "#platform", label: "See execution" },
    items: [
      "Live pass and fail streaming in your own environment",
      "Screenshot on every failure, automatically",
      "Application state captured at the moment of break",
      "Likely-cause analysis on every defect",
      "Developer, tester and severity tagged on the report",
      "Audit-ready history of who approved what, and when",
    ],
  },
];

/**
 * LaunchDarkly's CodeControl / AgentControl moment, TestForge edition:
 * two half cards with hairline borders, violet glow on hover, and the
 * feature checklist as the payload.
 */
export default function ProductSplit() {
  return (
    <section id="platform" className="relative overflow-hidden border-b border-line">
      <div
        aria-hidden="true"
        className="glow-wash -top-32 right-0 h-[420px] w-[560px] opacity-30"
      />
      <div className="relative mx-auto max-w-page px-5 py-16 md:px-8 md:py-24">
        <Reveal className="text-center">
          <p className="kicker mb-4">One pipeline, two halves</p>
          <h2 className="mx-auto max-w-3xl font-display text-4xl font-medium leading-[1.09] tracking-[-0.015em] text-white md:text-5xl">
            Ship with tests that hold up,
            <br />
            <span className="text-signal">however the FSD is written.</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {HALVES.map((half, i) => (
            <Reveal key={half.tag} delay={0.08 * (i + 1)}>
              <article className="group flex h-full flex-col rounded-[30px] border border-white/10 bg-carbon p-7 transition-all duration-200 hover:-translate-y-1 hover:border-violet/50 hover:shadow-[0_0_50px_rgba(64,91,255,0.15)] md:p-9">
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-violet/30 bg-violet/10 text-violet">
                    {half.icon}
                  </span>
                  <span className="font-mono text-xs uppercase tracking-[0.16em] text-slate2">
                    TestForge {half.tag}
                  </span>
                </div>
                <h3 className="mt-6 font-display text-2xl font-medium tracking-tight text-white md:text-3xl">
                  {half.title}
                </h3>
                <p className="mt-3 max-w-md leading-relaxed text-fog">{half.lede}</p>

                <ul className="mt-7 grid gap-3.5 border-t border-white/10 pt-7">
                  {half.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[15px] leading-snug text-ash">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden="true"
                        className="mt-0.5 shrink-0 text-violet"
                      >
                        <path d="M4 12l5 5L20 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>

                <a
                  href={half.cta.href}
                  className="mt-8 inline-flex w-fit items-center gap-2 rounded-pill border border-violet/60 px-5 py-2.5 text-sm font-semibold text-violet transition-colors hover:bg-violet/10 hover:text-white"
                >
                  {half.cta.label}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M4 12h15M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
