import Reveal from "./Reveal";

/**
 * The LaunchDarkly hero trick: the product appears as a cluster of bright
 * widgets floating on the dark canvas. Four white cards, slight rotations
 * on desktop, a clean stacked grid on small screens. Purely decorative
 * product UI, so the whole cluster is one labelled figure.
 */
export default function HeroCollage() {
  return (
    <Reveal delay={0.16} className="relative mx-auto max-w-5xl px-5 pb-8 md:px-8">
      <div
        aria-hidden="true"
        className="glow-wash left-1/2 top-1/2 h-[70%] w-[110%] -translate-x-1/2 -translate-y-1/2 opacity-60"
      />

      <figure
        data-testid="hero-collage"
        className="relative grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:gap-5"
        aria-label="TestForge product widgets: a live regression run, drafted test cases awaiting approval, FSD chat, and a defect report"
      >
        {/* Live run, the anchor widget */}
        <div className="mock min-w-0 p-4 transition-transform duration-200 hover:-translate-y-1 sm:col-span-2 sm:p-5 lg:col-span-7 lg:-rotate-1 lg:hover:-translate-y-1.5">
          <div className="flex items-center justify-between gap-3">
            <span className="font-mono text-[10px] tracking-wider text-[#545b66]">
              REGRESSION RUN · EOD BATCH
            </span>
            <span className="chip border-[#1f7a4d3d] text-[#1f7a4d]">live</span>
          </div>
          <div className="mt-3 flex items-end justify-between gap-4">
            <p className="font-display text-3xl font-semibold tracking-tight text-[#14181f]">
              96.4%
              <span className="ml-2 align-middle font-mono text-[10px] font-normal tracking-wide text-[#545b66]">
                PASS · 128 CASES
              </span>
            </p>
          </div>
          <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-[#14181f14]">
            <div className="h-full w-[96.4%] rounded-full bg-gradient-to-r from-[#405bff] to-[#7084ff]" />
          </div>
          <ul className="mt-4 space-y-2 font-mono text-[11px] text-[#545b66]">
            <li className="flex items-center justify-between gap-3 border-b border-[#14181f14] pb-2">
              <span className="min-w-0 truncate">TC-112 · interest rounding to 2 decimals</span>
              <span className="shrink-0 text-[#1f7a4d]">pass 1.2s</span>
            </li>
            <li className="flex items-center justify-between gap-3 border-b border-[#14181f14] pb-2">
              <span className="min-w-0 truncate">TC-113 · maker rejects checker return</span>
              <span className="shrink-0 text-[#1f7a4d]">pass 0.8s</span>
            </li>
            <li className="flex items-center justify-between gap-3">
              <span className="min-w-0 truncate">TC-114 · duplicate payment stopped</span>
              <span className="flex shrink-0 items-center gap-1.5 text-[#d64541]">
                failed
                <span className="chip border-[#d6454140] text-[#d64541]">screenshot</span>
              </span>
            </li>
          </ul>
        </div>

        {/* FSD chat */}
        <div className="mock flex min-w-0 flex-col p-4 transition-transform duration-200 hover:-translate-y-1 sm:p-5 lg:col-span-5 lg:rotate-1 lg:hover:-translate-y-1.5">
          <span className="font-mono text-[10px] tracking-wider text-[#545b66]">
            FSD CHAT · SECTION 4.2
          </span>
          <div className="mt-3 rounded-2xl rounded-bl-md bg-[#14181f0d] px-3.5 py-2.5 text-[13px] leading-snug text-[#14181f]">
            Does the cutoff apply on holidays, or queue to the next working day?
          </div>
          <div className="mt-2.5 rounded-2xl rounded-br-md bg-[#405bff] px-3.5 py-2.5 text-[13px] leading-snug text-white">
            Ambiguous in the FSD. Queued scenario drafted as TC-014 and flagged
            to your reviewer.
          </div>
          <p className="mt-auto pt-3 font-mono text-[10px] tracking-wide text-[#545b66]">
            asking beats guessing · gaps become cases
          </p>
        </div>

        {/* Cases awaiting approval */}
        <div className="mock min-w-0 p-4 transition-transform duration-200 hover:-translate-y-1 sm:p-5 lg:col-span-5 lg:rotate-1 lg:hover:-translate-y-1.5">
          <div className="flex items-center justify-between gap-3">
            <span className="font-mono text-[10px] tracking-wider text-[#545b66]">
              TEST CASES · 41 DRAFTED
            </span>
            <span className="chip border-[#14181f2e] text-[#545b66]">1 of 41</span>
          </div>
          <ul className="mt-3 space-y-2 text-[12px] text-[#14181f]">
            <li className="flex items-center justify-between gap-3 border-b border-[#14181f14] pb-2">
              <span className="min-w-0 truncate">
                <span className="font-mono text-[10px] text-[#545b66]">TC-016</span>{" "}
                Maker can reject a checker return
              </span>
              <span className="shrink-0 font-mono text-[10px] text-[#1f7a4d]">approved</span>
            </li>
            <li className="flex items-center justify-between gap-3 border-b border-[#14181f14] pb-2">
              <span className="min-w-0 truncate">
                <span className="font-mono text-[10px] text-[#545b66]">TC-014</span>{" "}
                Pre-close after cutoff queues
              </span>
              <span className="shrink-0 font-mono text-[10px] text-[#545b66]">review</span>
            </li>
            <li className="flex items-center justify-between gap-3">
              <span className="min-w-0 truncate">
                <span className="font-mono text-[10px] text-[#545b66]">TC-015</span>{" "}
                Penalty waiver applies to queued
              </span>
              <span className="shrink-0 font-mono text-[10px] text-[#d64541]">gap</span>
            </li>
          </ul>
        </div>

        {/* Defect report */}
        <div className="mock min-w-0 p-4 transition-transform duration-200 hover:-translate-y-1 sm:col-span-2 sm:p-5 lg:col-span-7 lg:-rotate-1 lg:hover:-translate-y-1.5">
          <div className="flex items-center justify-between gap-3">
            <span className="font-mono text-[10px] tracking-wider text-[#545b66]">
              DEFECT REPORT · TC-114
            </span>
            <span className="chip border-[#d6454140] text-[#d64541]">failed</span>
          </div>
          <p className="mt-3 text-[13px] leading-snug text-[#14181f]">
            <span className="font-semibold">Likely cause:</span> rounding applied
            before netting, so the duplicate check compares the wrong totals.
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="chip border-[#14181f2e] text-[#545b66]">dev assigned</span>
            <span className="chip border-[#14181f2e] text-[#545b66]">severity: high</span>
            <span className="chip border-[#1f7a4d3d] text-[#1f7a4d]">screenshot attached</span>
          </div>
        </div>
      </figure>
    </Reveal>
  );
}
