"use client";

import { useState } from "react";
import { ArrowUpRight, ArrowRight } from "lucide-react";
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

/* The two directions a developer arrives from, as editorial link rows. */
const LINKS = [
  {
    title: "Read the source.",
    body: "The FSD reader, case generator and script writer are all on GitHub. Open an issue, follow the roadmap.",
    cta: "Browse the repo",
    href: "https://github.com/Jsuhel/Testforge",
    external: true,
  },
  {
    title: "Bring your own FSD.",
    body: "Attach a real requirements document to the demo request and watch it read, questioned and drafted live.",
    cta: "Request a demo",
    href: "#start",
    external: false,
  },
];

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
 * Built for developers: two link rows beside a real terminal window holding
 * the tabbed, copyable snippet.
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

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* Link rows */}
          <Reveal className="min-w-0">
            <ul className="border-t border-white/10">
              {LINKS.map((link, i) => (
                <li key={link.title}>
                  <a
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noreferrer" : undefined}
                    data-testid={`developer-link-${i + 1}`}
                    className="group grid grid-cols-[auto_1fr_auto] items-start gap-5 border-b border-white/10 py-7 transition-colors hover:bg-white/[0.025] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-violet"
                  >
                    <span className="pt-1.5 font-mono text-[11px] tracking-[0.18em] text-violet">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0">
                      <h3 className="font-display text-2xl font-medium tracking-tight text-white transition-transform duration-200 ease-out group-hover:translate-x-1.5">
                        {link.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-fog">{link.body}</p>
                      <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-violet transition-colors group-hover:text-white">
                        {link.cta}
                        <ArrowUpRight size={11} strokeWidth={2.4} aria-hidden="true" />
                      </span>
                    </span>
                    <span aria-hidden="true" className="pt-1.5 text-violet transition-transform duration-200 ease-out group-hover:translate-x-1.5">
                      <ArrowRight size={18} strokeWidth={2.2} aria-hidden="true" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Terminal */}
          <Reveal delay={0.08} className="min-w-0">
            <div className="flex h-full flex-col">
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                <h3 className="font-display text-2xl font-medium tracking-tight text-white">
                  Copy, paste, go.
                </h3>
                <p className="max-w-xs text-sm leading-relaxed text-fog">
                  Drop this into your coding assistant and scaffold the first
                  suite in seconds.
                </p>
              </div>

              <div className="mt-6 flex flex-1 flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b0b] shadow-[0_24px_70px_rgba(0,0,0,0.5)]">
                <div className="flex items-center gap-4 border-b border-white/10 px-4 py-2.5">
                  <span aria-hidden="true" className="flex shrink-0 gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                  </span>
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
                    className="ml-auto shrink-0 rounded-pill px-3.5 py-1.5 font-mono text-[11px] text-ash transition-colors hover:bg-white/10 hover:text-white"
                  >
                    {copied ? "copied ✓" : "copy"}
                  </button>
                </div>
                <pre
                  className="flex-1 overflow-x-auto p-4 sm:p-5"
                  data-testid="snippet-code"
                  aria-live="polite"
                >
                  {SNIPPETS[tab].map((line, i) => (
                    <div key={i} className="whitespace-pre-wrap break-words">
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
