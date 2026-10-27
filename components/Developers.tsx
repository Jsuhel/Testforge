"use client";

import { useState } from "react";
import Reveal from "./Reveal";

const SNIPPETS: Record<string, { code: { text: string; kind: "cmd" | "str" | "flag" | "plain" }[] }[]> = {
  prompt: [
    {
      code: [
        { text: "Onboard me to TestForge.Ai. Read ./FSD.pdf, list every ambiguity", kind: "plain" },
        { text: "you find, then draft the test plan and generate Playwright specs", kind: "plain" },
        { text: "for the cases I approve: ", kind: "plain" },
        { text: "npx testforge init --from ./FSD.pdf", kind: "str" },
      ],
    },
  ],
  cli: [
    {
      code: [
        { text: "npx", kind: "cmd" },
        { text: " testforge init ", kind: "plain" },
        { text: "--from", kind: "flag" },
        { text: " ./FSD.pdf ", kind: "str" },
        { text: "--reviewer", kind: "flag" },
        { text: " you@bank.com", kind: "str" },
      ],
    },
  ],
};

function Syntax({ parts }: { parts: { text: string; kind: string }[] }) {
  return (
    <code className="font-mono text-[13.5px] leading-[1.65]">
      {parts.map((p, i) => (
        <span
          key={i}
          className={
            p.kind === "str"
              ? "text-[#a6e22e]"
              : p.kind === "cmd"
                ? "text-[#66d9ef]"
                : p.kind === "flag"
                  ? "text-[#f92672]"
                  : "text-ash"
          }
        >
          {p.text}
        </span>
      ))}
    </code>
  );
}

/**
 * LaunchDarkly's developer trio. The third card is the signature:
 * a tabbed, copyable snippet styled like a console.
 */
export default function Developers() {
  const [tab, setTab] = useState<"prompt" | "cli">("prompt");
  const [copied, setCopied] = useState(false);

  const plain = SNIPPETS[tab].map((l) => l.code.map((p) => p.text).join("")).join("\n");

  async function copy() {
    try {
      await navigator.clipboard.writeText(plain);
    } catch {
      // Clipboard permission denied: fall back to a hidden textarea
      const ta = document.createElement("textarea");
      ta.value = plain;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <section id="developers" className="border-b border-line">
      <div className="mx-auto max-w-page px-5 py-16 md:px-8 md:py-24">
        <Reveal>
          <p className="kicker mb-4">Built for developers</p>
          <h2 className="max-w-3xl font-display text-4xl font-medium leading-[1.05] tracking-[-0.015em] text-white md:text-5xl">
            Built for QA teams <span className="text-signal">and their developers.</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {/* Source */}
          <Reveal className="min-w-0">
            <a
              href="https://github.com/Jsuhel/Testforge"
              target="_blank"
              rel="noreferrer"
              className="group flex h-full flex-col rounded-[30px] border border-white/10 bg-carbon p-7 transition-all duration-200 hover:-translate-y-1 hover:border-violet/50 hover:shadow-[0_0_50px_rgba(64,91,255,0.15)]"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-violet/30 bg-violet/10 text-violet">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <h3 className="mt-5 font-display text-xl font-medium tracking-tight text-white">
                Read the source.
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-fog">
                The FSD reader, case generator and script writer are all on
                GitHub. Open an issue, follow the roadmap.
              </p>
              <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-violet transition-colors group-hover:text-white">
                Browse the repo
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </a>
          </Reveal>

          {/* Real FSD */}
          <Reveal delay={0.08} className="min-w-0">
            <a
              href="#start"
              className="group flex h-full flex-col rounded-[30px] border border-white/10 bg-carbon p-7 transition-all duration-200 hover:-translate-y-1 hover:border-violet/50 hover:shadow-[0_0_50px_rgba(64,91,255,0.15)]"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-violet/30 bg-violet/10 text-violet">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8l-5-5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                  <path d="M14 3v5h5" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                  <path d="M12 17v-5M9.5 14.5 12 12l2.5 2.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <h3 className="mt-5 font-display text-xl font-medium tracking-tight text-white">
                Bring your own FSD.
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-fog">
                Attach a real requirements document to the demo request and
                watch it read, questioned and drafted live.
              </p>
              <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-violet transition-colors group-hover:text-white">
                Request a demo
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M4 12h15M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </a>
          </Reveal>

          {/* Copy, paste, go */}
          <Reveal delay={0.16} className="min-w-0">
            <div className="flex h-full flex-col rounded-[30px] border border-white/10 bg-carbon p-7">
              <h3 className="font-display text-xl font-medium tracking-tight text-white">
                Copy, paste, go.
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-fog">
                Drop this into your coding assistant and scaffold the first
                suite in seconds.
              </p>

              <div className="mt-5 overflow-hidden rounded-2xl border border-white/10 bg-[#101010]">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 px-3 py-2">
                  <div className="flex min-w-0 gap-1" role="tablist" aria-label="Snippet language">
                    {(["prompt", "cli"] as const).map((t) => (
                      <button
                        key={t}
                        type="button"
                        role="tab"
                        aria-selected={tab === t}
                        data-testid={`snippet-tab-${t}`}
                        onClick={() => setTab(t)}
                        className={`rounded-pill px-3 py-1 font-mono text-[11px] transition-colors ${
                          tab === t ? "bg-white/10 text-white" : "text-ash hover:text-white"
                        }`}
                      >
                        {t === "prompt" ? "Assistant" : "CLI"}
                      </button>
                    ))}
                  </div>
                  <button
                    type="button"
                    data-testid="snippet-copy"
                    onClick={copy}
                    className="rounded-pill px-3 py-1 font-mono text-[11px] text-ash transition-colors hover:bg-white/10 hover:text-white"
                  >
                    {copied ? "copied ✓" : "copy"}
                  </button>
                </div>
                <pre
                  className="overflow-x-auto p-4"
                  data-testid="snippet-code"
                  aria-live="polite"
                >
                  {SNIPPETS[tab].map((line, i) => (
                    <div key={i}>
                      <Syntax parts={line.code} />
                    </div>
                  ))}
                </pre>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
