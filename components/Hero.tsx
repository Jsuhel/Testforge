"use client";

import { useState, type FormEvent } from "react";
import HeroMock from "./HeroMock";
import Reveal from "./Reveal";

const PROMISES = [
  ["01", "Read & explain the FSD"],
  ["02", "Cases you approve"],
  ["03", "Playwright + evidence"],
];

/**
 * Hero: centered block of type, a glowing console input, and the real
 * product shown as a bright white panel on the midnight canvas.
 */
export default function Hero() {
  const [carried, setCarried] = useState(false);

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

      <div className="relative mx-auto max-w-page px-5 pb-16 pt-32 md:px-8 md:pb-24 md:pt-40">
        <Reveal className="text-center">
          <p className="kicker mb-6 inline-flex items-center gap-3 rounded-pill border border-white/10 bg-carbon px-4 py-2">
            <span className="h-1.5 w-1.5 rounded-full bg-violet" aria-hidden="true" />
            Test authoring for banking QA teams
          </p>
          <h1 className="mx-auto max-w-4xl font-display text-[2.9rem] font-medium leading-[1.02] tracking-[-0.015em] text-white sm:text-6xl lg:text-[5.25rem]">
            Upload the FSD.
            <br />
            <span className="text-signal">Get tests you can&nbsp;trust.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-fog">
            TestForge reads your requirements, explains them, writes test cases
            for you to approve, automates them in Playwright, and reports every
            failure with a screenshot.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <form
            onSubmit={onStart}
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
              Get started
            </button>
          </form>
          <p className="mt-3 text-center font-mono text-xs text-slate2" aria-live="polite">
            {carried
              ? "Email added to the demo form below — finish it there."
              : "Bring a real FSD to the demo: PDF, DOCX or Markdown."}
          </p>
        </Reveal>

        <Reveal delay={0.16} className="relative mx-auto mt-14 max-w-3xl">
          <div
            aria-hidden="true"
            className="glow-wash left-1/2 top-1/2 h-[70%] w-[110%] -translate-x-1/2 -translate-y-1/2 opacity-60"
          />
          <div className="relative">
            <HeroMock />
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <dl className="mx-auto mt-12 grid max-w-2xl grid-cols-3 gap-6 border-t border-line pt-8 text-center">
            {PROMISES.map(([n, label]) => (
              <div key={n}>
                <dt className="font-mono text-xs text-violet">{n}</dt>
                <dd className="mt-1.5 text-sm leading-snug text-fog">{label}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
