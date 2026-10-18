"use client";

import { motion, useReducedMotion } from "framer-motion";
import AppWindow from "./AppWindow";
import Reveal from "./Reveal";

const POINTS = [
  {
    title: "Answers cite the FSD",
    body: "Every reply points at the section it came from — §4.2, §7.1 — so you can verify, not trust.",
  },
  {
    title: "Gaps become questions",
    body: "Where the document is ambiguous, TestForge asks instead of guessing. The question is often the most valuable part of the review.",
  },
  {
    title: "Clarifications feed the suite",
    body: "Each answer you confirm becomes coverage — boundary values, negative paths, role checks — drafted while you chat.",
  },
];

/** Animated typing indicator for the pending reply (static under reduced motion). */
function TypingDots() {
  const reduce = useReducedMotion();
  return (
    <span className="inline-flex items-center gap-1 py-1" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-[#9aa3ad]"
          animate={reduce ? undefined : { opacity: [0.25, 1, 0.25] }}
          transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.18, ease: "easeInOut" }}
        />
      ))}
    </span>
  );
}

/** Extended chat excerpt — the conversation after the FSD is analysed. */
function ChatExcerpt() {
  return (
    <div className="flex h-full flex-col gap-3 p-4" aria-hidden="true">
      <div className="flex flex-wrap items-center gap-2 border-b border-[#14181f1f] pb-3">
        <span className="chip border-[#14181f2e] text-[#545b66]">
          FSD_Loan_Onboarding_v3.pdf
        </span>
        <span className="chip border-[#1f7a4d3d] text-[#1f7a4d]">analysed · 12 functions</span>
      </div>

      <div className="ml-auto max-w-[85%] rounded-lg rounded-br-sm border border-[#14181f2e] bg-white px-3 py-2 text-[12px] leading-snug text-[#14181f]">
        What happens if the same maker approves a payment twice?
      </div>

      <div className="max-w-[92%] rounded-lg rounded-bl-sm bg-[#14181f] px-3 py-2.5 text-[12px] leading-relaxed text-[#f4f1ea]">
        <span className="font-mono text-[10px] text-[#ffb59d]">§4.2 Maker-checker</span> — a
        second approval by the same maker is rejected; the checker&apos;s approval is
        what executes.
        <span className="mt-2 block">
          <span className="chip border-[#1f7a4d3d] text-[#1f7a4d]">
            +1 negative case drafted
          </span>
        </span>
      </div>

      <div className="ml-auto max-w-[85%] rounded-lg rounded-br-sm border border-[#14181f2e] bg-white px-3 py-2 text-[12px] leading-snug text-[#14181f]">
        And the daily transfer limits — what are the boundaries?
      </div>

      <div className="max-w-[92%] rounded-lg rounded-bl-sm bg-[#14181f] px-3 py-2.5 text-[12px] leading-relaxed text-[#f4f1ea]">
        <span className="font-mono text-[10px] text-[#ffb59d]">§7.1 Limits</span> — min ₹100,
        max ₹10,00,000 per day per customer.
        <span className="mt-2 flex flex-wrap gap-1.5">
          <span className="chip border-[#1f7a4d3d] text-[#1f7a4d]">₹100 exact</span>
          <span className="chip border-[#1f7a4d3d] text-[#1f7a4d]">₹99 rejected</span>
          <span className="chip border-[#1f7a4d3d] text-[#1f7a4d]">₹10,00,001 rejected</span>
        </span>
      </div>

      <div className="flex items-center gap-2 rounded-lg bg-[#14181f] px-3 py-2 text-[12px] text-[#9aa3ad]">
        <TypingDots />
        <span className="font-mono text-[10px]">drafting cases for §7.1…</span>
      </div>

      <div className="mt-auto flex items-center gap-2 rounded-lg border border-[#14181f2e] bg-white px-3 py-2">
        <span className="font-mono text-[11px] text-[#545b66]">
          Ask a follow-up…
        </span>
        <span className="ml-auto font-mono text-[10px] text-[#e4572e]">Send</span>
      </div>
    </div>
  );
}

export default function ChatSpotlight() {
  return (
    <section className="border-b border-line bg-surface2">
      <div className="mx-auto grid max-w-page items-center gap-12 px-5 py-16 md:px-8 md:py-24 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16">
        <Reveal>
          <p className="kicker mb-4 flex items-center gap-3">
            <span className="inline-block h-px w-8 bg-accent" aria-hidden="true" />
            Chat with the document
          </p>
          <h2 className="max-w-xl font-display text-4xl font-light leading-[1.05] tracking-[-0.015em] md:text-5xl">
            Don&apos;t just read the FSD. Interrogate it.
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
            Once TestForge has analysed the document, the conversation begins.
            Ask about flows, boundaries, roles or edge cases — and keep asking
            until every doubt is on the table.
          </p>
          <ul className="mt-8 grid gap-5">
            {POINTS.map((p) => (
              <li key={p.title} className="flex gap-3.5">
                <span
                  className="mt-1 inline-block h-2.5 w-2.5 shrink-0 rounded-full bg-accent"
                  aria-hidden="true"
                />
                <div>
                  <p className="font-medium">{p.title}</p>
                  <p className="mt-0.5 text-sm leading-relaxed text-muted">{p.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.12}>
          <AppWindow title="chat" sidebarCount={2} activeIndex={1}>
            <ChatExcerpt />
          </AppWindow>
        </Reveal>
      </div>
    </section>
  );
}
