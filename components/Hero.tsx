"use client";

import { Fragment, useState, type FormEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Reveal from "./Reveal";
import HeroCollage from "./HeroCollage";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Word-by-word entrance: each word rises out of a blur with a stagger.
 * Real spaces between the spans keep the h1's textContent intact for
 * screen readers and the QA sweep. Disabled under reduced motion.
 */
function AnimatedWords({
  text,
  delayBase = 0,
  step = 0.09,
  distance = 26,
}: {
  text: string;
  delayBase?: number;
  step?: number;
  distance?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <>
      {text.split(" ").map((word, i) => (
        <Fragment key={i}>
          <motion.span
            className="inline-block will-change-transform"
            initial={reduce ? false : { opacity: 0, y: distance, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.65, delay: delayBase + i * step, ease: EASE }}
          >
            {word}
          </motion.span>{" "}
        </Fragment>
      ))}
    </>
  );
}

/**
 * Hero: LaunchDarkly-style stacked block. The headline arrives word by
 * word out of a blur, the second line carries a slowly flowing gradient,
 * then the glowing console input and the product widgets.
 */
export default function Hero() {
  const [carried, setCarried] = useState(false);
  const reduce = useReducedMotion();

  function onStart(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const email = String(new FormData(event.currentTarget).get("email") ?? "").trim();
    const target = document.querySelector<HTMLInputElement>("#fb-email");
    if (target && email) target.value = email;
    setCarried(true);
    document.getElementById("start")?.scrollIntoView({ behavior: "smooth" });
    window.setTimeout(() => {
      document.getElementById("fb-name")?.focus({ preventScroll: true });
    }, 650);
  }

  const LINE_1 = "Test at AI speed.";
  const LINE_2 = "You stay in control.";
  // line 1 words stagger, then line 2 follows as one flowing-gradient unit
  const line2Delay = 0.12 + LINE_1.split(" ").length * 0.09 + 0.05;

  return (
    <section id="top" className="relative overflow-hidden">
      {/* ambient violet washes behind the hero block */}
      <div
        aria-hidden="true"
        className="glow-wash -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 opacity-70"
      />
      <div
        aria-hidden="true"
        className="glow-wash bottom-0 left-8 h-[360px] w-[420px] opacity-30"
      />

      <div className="relative mx-auto max-w-page px-5 pb-16 pt-40 text-center md:px-8 md:pb-24 md:pt-48">
        <Reveal>
          <p className="kicker mb-6 inline-flex items-center gap-3 rounded-pill border border-white/10 bg-carbon px-4 py-2">
            <span className="h-1.5 w-1.5 rounded-full bg-violet" aria-hidden="true" />
            Test authoring for banking QA teams
          </p>
          <h1 className="mx-auto max-w-4xl font-display text-[2.9rem] font-medium leading-[1.04] tracking-[-0.015em] text-white [text-wrap:balance] sm:text-6xl lg:text-[5.25rem]">
            <AnimatedWords text={LINE_1} delayBase={0.12} />
            <br />
            <motion.span
              className="text-signal-flow inline-block"
              initial={reduce ? false : { opacity: 0, y: 26, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.7, delay: line2Delay, ease: EASE }}
            >
              {LINE_2}
            </motion.span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-ash">
            <AnimatedWords
              text="TestForge.Ai reads your FSD, explains it, drafts the test cases and writes the Playwright. A human approves every stage, and every failure arrives with a screenshot."
              delayBase={line2Delay + 0.35}
              step={0.045}
              distance={12}
            />
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <form
            onSubmit={onStart}
            data-testid="hero-form"
            className="mx-auto mt-9 flex w-full max-w-[600px] items-center gap-2 rounded-[10px] border border-white/10 bg-carbon p-2 pl-4 shadow-[0_0_40px_rgba(64,91,255,0.25)] transition-colors focus-within:border-violet/60"
          >
            <label htmlFor="hero-email" className="sr-only">
              Work email for the demo
            </label>
            <input
              id="hero-email"
              name="email"
              type="email"
              required
              placeholder="Work email"
              autoComplete="email"
              className="h-10 min-w-0 flex-1 bg-transparent text-[15px] text-white placeholder:text-steel focus:outline-none"
            />
            <button type="submit" className="btn btn-primary shrink-0 px-5 py-2.5 text-sm">
              Book a demo
            </button>
          </form>
          <p className="mt-3 font-mono text-xs text-slate2" aria-live="polite" data-testid="hero-form-note">
            {carried
              ? "Email added to the demo form below — finish it there."
              : "Bring a real FSD to the demo: PDF, DOCX or Markdown."}
          </p>
        </Reveal>
      </div>

      <HeroCollage />
    </section>
  );
}
