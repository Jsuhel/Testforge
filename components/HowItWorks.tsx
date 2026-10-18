"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import AppWindow from "./AppWindow";
import ChatPanel from "./steps/ChatPanel";
import TestCasesPanel from "./steps/TestCasesPanel";
import ScriptPanel from "./steps/ScriptPanel";
import ExecutionPanel from "./steps/ExecutionPanel";
import ReportPanel from "./steps/ReportPanel";

type Step = {
  num: string;
  title: string;
  lede: string;
  tab: string;
  sidebarCount: number;
  activeIndex: number;
  panel: ReactNode;
};

const STEPS: Step[] = [
  {
    num: "01",
    title: "Read and discuss the FSD",
    lede: "Upload the document. TestForge reads it and explains the functionality in plain language. Chat until every doubt and every gap is on the table.",
    tab: "FSD chat",
    sidebarCount: 1,
    activeIndex: 0,
    panel: <ChatPanel />,
  },
  {
    num: "02",
    title: "Generate and verify test cases",
    lede: "One click writes the suite — boundaries, roles, edge cases. A person reviews every case and approves it. Nothing moves on without a human yes.",
    tab: "Test Cases",
    sidebarCount: 2,
    activeIndex: 1,
    panel: <TestCasesPanel />,
  },
  {
    num: "03",
    title: "Automate",
    lede: "TestForge asks for exactly what it needs — URLs, roles, test data. Enter it manually, or connect the database if you prefer. Then verify the Playwright scripts it writes.",
    tab: "Automation",
    sidebarCount: 3,
    activeIndex: 2,
    panel: <ScriptPanel />,
  },
  {
    num: "04",
    title: "Execute",
    lede: "Run the suite. Passes and failures stream in live, and the moment something breaks, a screenshot is captured with the state that caused it.",
    tab: "Execution",
    sidebarCount: 4,
    activeIndex: 3,
    panel: <ExecutionPanel />,
  },
  {
    num: "05",
    title: "Report",
    lede: "The report already knows what failed and why it likely failed. It asks for the developer, the tester and the severity, so the defect lands with the right person, evidence attached.",
    tab: "Reports",
    sidebarCount: 5,
    activeIndex: 4,
    panel: <ReportPanel />,
  },
];

export default function HowItWorks() {
  const [active, setActive] = useState(0);
  const stepRefs = useRef<(HTMLElement | null)[]>([]);
  const reduce = useReducedMotion();

  useEffect(() => {
    const sections = stepRefs.current.filter(Boolean) as HTMLElement[];
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = sections.indexOf(entry.target as HTMLElement);
            if (idx !== -1) setActive(idx);
          }
        }
      },
      // fire when a step block crosses the middle band of the viewport
      { rootMargin: "-42% 0px -42% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const step = STEPS[active];

  return (
    <section id="how-it-works" className="border-b border-line">
      <div className="mx-auto max-w-page px-5 pb-8 pt-16 md:px-8 md:pt-24">
        <p className="kicker mb-4 flex items-center gap-3">
          <span className="inline-block h-px w-8 bg-accent" aria-hidden="true" />
          How it works
        </p>
        <h2 className="max-w-2xl font-display text-4xl font-light leading-[1.05] tracking-[-0.015em] md:text-5xl">
          Five steps. A human signs off on every one.
        </h2>
        <p className="mt-4 max-w-xl text-muted">
          The sidebar starts empty. Each stage you clear earns the next icon —
          Dashboard, Test Cases, Automation, Execution, Reports.
        </p>
      </div>

      {/* Desktop: sticky app window on the right */}
      <div className="mx-auto hidden max-w-page grid-cols-2 gap-16 px-8 pb-24 lg:grid">
        <div>
          {STEPS.map((s, i) => (
            <article
              key={s.num}
              ref={(el) => {
                stepRefs.current[i] = el;
              }}
              className="flex min-h-[62vh] flex-col justify-center border-l border-line py-8 pl-6 xl:pl-10"
              aria-label={`Step ${s.num}: ${s.title}`}
            >
              <span
                className={`font-mono text-xs transition-colors duration-300 ${
                  i === active ? "text-accent" : "text-muted"
                }`}
              >
                STEP {s.num}
              </span>
              <h3 className="mt-3 font-display text-2xl font-light leading-tight tracking-tight xl:text-3xl">
                {s.title}
              </h3>
              <p className="mt-4 max-w-md leading-relaxed text-muted">{s.lede}</p>
            </article>
          ))}
        </div>

        <div className="relative">
          <div className="sticky top-24">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active}
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <AppWindow
                  title={step.tab}
                  sidebarCount={step.sidebarCount}
                  activeIndex={step.activeIndex}
                  footer={`${step.sidebarCount} of 5 modules unlocked · awaiting your approval`}
                >
                  {step.panel}
                </AppWindow>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Mobile / tablet: stacked steps, each with its own window */}
      <div className="mx-auto flex max-w-page flex-col px-5 pb-20 lg:hidden">
        {STEPS.map((s) => (
          <article
            key={s.num}
            className="border-t border-line py-10 first:border-t-0"
            aria-label={`Step ${s.num}: ${s.title}`}
          >
            <span className="font-mono text-xs text-accent">STEP {s.num}</span>
            <h3 className="mt-2 font-display text-2xl font-light leading-tight tracking-tight">
              {s.title}
            </h3>
            <p className="mt-3 leading-relaxed text-muted">{s.lede}</p>
            <div className="mt-6">
              <AppWindow
                title={s.tab}
                sidebarCount={s.sidebarCount}
                activeIndex={s.activeIndex}
              >
                {s.panel}
              </AppWindow>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
