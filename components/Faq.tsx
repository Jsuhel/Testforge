"use client";

import { useState } from "react";
import Reveal from "./Reveal";

const FAQS = [
  {
    q: "Does it replace testers?",
    a: "No. TestForge removes the typing, not the thinking. It drafts cases, scripts and reports; a tester reviews, corrects and approves every output before it counts. If the AI gets something wrong, nothing ships until a person fixes it.",
  },
  {
    q: "What FSD formats work?",
    a: "PDF, DOCX and Markdown are read directly. Scanned documents need to go through OCR first. When a section is ambiguous, TestForge asks a question instead of guessing; that question is often the most valuable part of the review.",
  },
  {
    q: "How are the scripts verified?",
    a: "Every generated Playwright script is shown in full before anything runs. You can read it line by line, edit it, or reject it. Scripts execute only after you approve them, and they stay standard Playwright: no proprietary runner, no lock-in.",
  },
  {
    q: "Where do tests run?",
    a: "In your environment: locally or wired into your own CI pipeline. TestForge generates and maintains the suites; it does not host the execution of your banking systems.",
  },
  {
    q: "Is my data safe?",
    a: "Documents and credentials stay in your workspace, database connections are read-only and revocable, and nothing is used for training. We handle sensitive financial data carefully and are happy to walk through the specifics on a call.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="border-b border-line">
      <div className="mx-auto max-w-page px-5 py-16 md:px-8 md:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
          <Reveal>
            <p className="kicker mb-4 flex items-center gap-3">
              <span className="inline-block h-px w-8 bg-accent" aria-hidden="true" />
              FAQ
            </p>
            <h2 className="font-display text-4xl font-light leading-[1.05] tracking-[-0.015em] md:text-5xl">
              Straight answers.
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <ul className="border-t border-line">
              {FAQS.map((item, i) => {
                const isOpen = open === i;
                return (
                  <li key={item.q} className="border-b border-line">
                    <h3>
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={`faq-panel-${i}`}
                        id={`faq-button-${i}`}
                        onClick={() => setOpen(isOpen ? null : i)}
                        className="flex w-full items-center justify-between gap-6 py-5 text-left"
                      >
                        <span className="font-medium">{item.q}</span>
                        <span
                          aria-hidden="true"
                          className={`shrink-0 font-mono text-lg leading-none transition-transform duration-200 ${
                            isOpen ? "rotate-45 text-accent" : "text-muted"
                          }`}
                        >
                          +
                        </span>
                      </button>
                    </h3>
                    <div
                      id={`faq-panel-${i}`}
                      role="region"
                      aria-labelledby={`faq-button-${i}`}
                      hidden={!isOpen}
                      className="pb-5 pr-10"
                    >
                      <p className="max-w-2xl leading-relaxed text-muted">
                        {item.a}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
