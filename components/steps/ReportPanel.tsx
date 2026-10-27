export default function ReportPanel() {
  return (
    <div className="flex h-full flex-col p-4" aria-hidden="true">
      <div className="mb-3 flex items-center gap-2">
        <span className="rounded-md bg-[#405bff] px-2 py-0.5 font-mono text-[9px] font-medium uppercase tracking-wider text-white">
          Report
        </span>
        <span className="font-mono text-[10px] text-[#405bff]">TC-021</span>
        <span className="ml-auto font-mono text-[9px] text-[#545b66]">
          RUN #48 · 00:03:41
        </span>
      </div>

      <div className="grid grid-cols-[7rem_1fr] gap-x-3 gap-y-1.5 text-[11px]">
        <span className="font-mono text-[9px] uppercase tracking-wider text-[#545b66]">
          Expected
        </span>
        <span className="text-[#14181f]">
          Transfer blocked with error &quot;Insufficient funds&quot;
        </span>

        <span className="font-mono text-[9px] uppercase tracking-wider text-[#545b66]">
          Actual
        </span>
        <span className="font-medium text-[#405bff]">
          Transfer went through: balance now −₹2,500
        </span>

        <span className="font-mono text-[9px] uppercase tracking-wider text-[#545b66]">
          Failed step
        </span>
        <span className="text-[#405bff]">
          Step 4 of 6 · Confirm transfer · DB row updated anyway
        </span>
      </div>

      {/* CSS-drawn screenshot placeholder, blue evidence frame */}
      <div className="mt-3 flex gap-3">
        <div className="relative h-32 w-40 shrink-0 overflow-hidden rounded-md border border-[#405bff4d] bg-white">
          <div className="flex items-center gap-1 border-b border-[#405bff1f] bg-[#405bff0d] px-2 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-[#405bff66]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#405bff33]" />
          </div>
          <div className="space-y-1.5 p-2">
            <div className="h-1.5 w-3/4 rounded bg-[#405bff24]" />
            <div className="h-1.5 w-1/2 rounded bg-[#405bff24]" />
            <div className="h-3 w-24 rounded border border-[#405bff66] bg-[#405bff14]" />
          </div>
          <span className="absolute right-1.5 top-7 h-4 w-4 rounded-full border-2 border-[#405bff]" />
        </div>
        <div className="min-w-0">
          <p className="font-mono text-[9px] uppercase tracking-wider text-[#545b66]">
            Verdict
          </p>
          <p className="mt-1 text-[11px] leading-snug text-[#14181f]">
            Likely cause: <span className="font-medium text-[#405bff]">test data</span>: an
            earlier test in this run topped up the account, so there was enough
            balance to send.
          </p>
        </div>
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-1.5">
        <span className="chip border-[#405bff40] text-[#405bff]">screenshot 04.png</span>
        <span className="chip border-[#405bff40] text-[#405bff]">run log</span>
        <span className="chip border-[#405bff40] text-[#405bff]">row diff · loans/8841</span>
      </div>

      <div className="mt-auto grid grid-cols-3 gap-2 border-t border-[#405bff1f] pt-3">
        {[
          ["Developer", "R. Iyer"],
          ["Tester", "You"],
          ["Severity", "Major"],
        ].map(([label, value]) => (
          <div key={label} className="rounded-md border border-[#405bff33] bg-white px-2 py-1.5">
            <p className="font-mono text-[8px] uppercase tracking-wider text-[#545b66]">
              {label}
            </p>
            <p className="truncate font-mono text-[10px] text-[#405bff]">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
