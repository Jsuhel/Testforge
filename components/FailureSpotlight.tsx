import Reveal from "./Reveal";

function ScreenshotMock() {
  return (
    <div
      className="overflow-hidden rounded-lg border border-[#14181f2e] bg-[#eeebe2]"
      role="img"
      aria-label="Captured failure screenshot: the funds transfer page with the amount field highlighted and the available balance shown in red"
    >
      <div className="flex items-center gap-2 border-b border-[#14181f1f] bg-[#f4f1ea] px-3 py-2">
        <span className="mock-dot" />
        <span className="mock-dot" />
        <span className="ml-2 truncate font-mono text-[10px] text-[#545b66]">
          corebank.internal/transfers/new
        </span>
        <span className="ml-auto chip border-[#c23a2b4d] text-[#c23a2b]">
          00:03:41.208
        </span>
      </div>
      <div className="p-4">
        <div className="flex items-start gap-4">
          <div className="w-28 shrink-0 space-y-1.5">
            <div className="h-2 w-full rounded bg-[#14181f24]" />
            <div className="h-2 w-4/5 rounded bg-[#14181f24]" />
            <div className="h-2 w-3/5 rounded bg-[#14181f24]" />
          </div>
          <div className="min-w-0 flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <div className="h-3 w-24 rounded bg-[#14181f24]" />
              <span className="font-mono text-[9px] text-[#c23a2b]">
                balance ₹2,500
              </span>
            </div>
            <div className="space-y-2 pt-1">
              <div className="flex items-center gap-2">
                <div className="h-7 w-36 rounded border border-[#14181f24] bg-white" />
                <span className="font-mono text-[8px] text-[#545b66]">from</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-7 w-36 rounded border border-[#14181f24] bg-white" />
                <span className="font-mono text-[8px] text-[#545b66]">to</span>
              </div>
              <div className="relative h-7 w-36">
                <div className="h-7 w-36 rounded border-2 border-[#c23a2b] bg-[#c23a2b14]" />
                <span className="absolute left-2 top-1.5 font-mono text-[9px] text-[#14181f]">
                  ₹ 40,000
                </span>
                <span className="absolute -top-2 right-0 rounded bg-[#c23a2b] px-1 font-mono text-[8px] text-white">
                  should have been blocked
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FailureSpotlight() {
  return (
    <section className="border-b border-line">
      <div className="mx-auto max-w-page px-5 py-16 md:px-8 md:py-24">
        <Reveal>
          <p className="kicker mb-4 flex items-center gap-3">
            <span className="inline-block h-px w-8 bg-accent" aria-hidden="true" />
            Failure reports
          </p>
          <h2 className="max-w-3xl font-display text-4xl font-bold leading-[1.05] tracking-[-0.015em] md:text-5xl">
            A failure should reach the right person with the evidence attached.
          </h2>
          <p className="mt-4 max-w-2xl text-muted">
            Say a customer transfers ₹40,000 from an account holding ₹2,500.
            The app must refuse. In this run it didn&apos;t — and the report
            already knows why.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mock mock-fixed mt-10 overflow-hidden">
            <div className="mock-titlebar">
              <span className="mock-dot" />
              <span className="mock-dot" />
              <span className="mock-dot" />
              <span className="ml-3 font-mono text-[11px] text-[#545b66]">
                testforge.app / reports / D-112
              </span>
            </div>

            <div className="grid gap-0 md:grid-cols-[1.15fr_1fr]">
              <div className="border-b border-[#14181f1f] p-5 md:border-b-0 md:border-r">
                <div className="mb-4 flex items-center gap-2">
                  <span className="rounded-md bg-[#c23a2b] px-2 py-0.5 font-mono text-[9px] font-medium uppercase tracking-wider text-white">
                    Failed
                  </span>
                  <span className="font-mono text-[11px] text-[#14181f]">D-112</span>
                  <span className="truncate font-mono text-[11px] text-[#545b66]">
                    from TC-021 · Run #48
                  </span>
                </div>
                <ScreenshotMock />
              </div>

              <div className="p-5">
                <h3 className="text-sm font-semibold leading-snug text-[#14181f]">
                  Transfer above available balance was allowed
                </h3>

                <dl className="mt-4 space-y-3 text-[12px]">
                  <div className="grid grid-cols-[5.5rem_1fr] gap-x-3">
                    <dt className="font-mono text-[9px] uppercase tracking-wider text-[#545b66]">
                      Expected
                    </dt>
                    <dd className="text-[#14181f]">
                      Transfer blocked with the error &quot;Insufficient
                      funds&quot;
                    </dd>
                  </div>
                  <div className="grid grid-cols-[5.5rem_1fr] gap-x-3">
                    <dt className="font-mono text-[9px] uppercase tracking-wider text-[#545b66]">
                      Actual
                    </dt>
                    <dd className="text-[#c23a2b]">
                      Transfer went through — balance now −₹2,500
                    </dd>
                  </div>
                  <div className="grid grid-cols-[5.5rem_1fr] gap-x-3">
                    <dt className="font-mono text-[9px] uppercase tracking-wider text-[#545b66]">
                      Verdict
                    </dt>
                    <dd className="text-[#14181f]">
                      Likely cause:{" "}
                      <span className="font-semibold">test data</span> — an
                      earlier test in the same run topped up this account, so
                      the balance was high enough to allow it.
                    </dd>
                  </div>
                </dl>

                <div className="mt-5 border-t border-[#14181f1f] pt-4">
                  <p className="font-mono text-[9px] uppercase tracking-wider text-[#545b66]">
                    Assign to
                  </p>
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    {[
                      ["Developer", "S. Menon"],
                      ["Tester", "A. Fernandes"],
                      ["Severity", "Major"],
                    ].map(([label, value]) => (
                      <div
                        key={label}
                        className="rounded-md border border-[#14181f2e] bg-white px-2.5 py-2"
                      >
                        <p className="font-mono text-[8px] uppercase tracking-wider text-[#545b66]">
                          {label}
                        </p>
                        <p className="mt-0.5 truncate font-mono text-[10px] font-medium text-[#14181f]">
                          {value} ▾
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="font-mono text-[10px] text-[#545b66]">
                      evidence: screenshot · trace · step log
                    </span>
                    <span className="rounded-md bg-[#14181f] px-3 py-1.5 font-mono text-[10px] font-medium text-[#f4f1ea]">
                      Assign defect
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
