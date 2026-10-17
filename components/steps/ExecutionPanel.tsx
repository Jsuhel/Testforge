const RUNS = [
  { id: "TC-014", name: "Pre-close queued after cutoff", status: "pass" as const },
  { id: "TC-021", name: "Transfer above balance is rejected", status: "fail" as const },
  { id: "TC-016", name: "Maker rejects checker return", status: "pass" as const },
  { id: "TC-017", name: "Interest to previous business day", status: "running" as const },
];

export default function ExecutionPanel() {
  return (
    <div className="flex h-full flex-col p-4" aria-hidden="true">
      <div className="mb-3 flex items-center gap-2">
        <span className="font-mono text-[10px] tracking-wider text-[#545b66]">
          RUN #48 · CHROMIUM
        </span>
        <span className="ml-auto flex items-center gap-1.5 font-mono text-[10px] text-[#545b66]">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#e4572e]" />
          running
        </span>
      </div>

      <ul className="flex flex-col">
        {RUNS.map((r) => (
          <li
            key={r.id}
            className="flex items-center gap-3 border-b border-[#14181f14] py-2.5 last:border-0"
          >
            <span
              className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[9px] font-bold text-white ${
                r.status === "pass"
                  ? "bg-[#1f7a4d]"
                  : r.status === "fail"
                    ? "bg-[#c23a2b]"
                    : "border-2 border-[#e4572e] border-t-transparent animate-spin bg-transparent"
              }`}
              aria-hidden="true"
            />
            <span className="w-14 shrink-0 font-mono text-[10px] text-[#14181f]">
              {r.id}
            </span>
            <span className="min-w-0 flex-1 truncate text-[11px] text-[#14181f]">
              {r.name}
            </span>
            {r.status === "fail" && (
              <span className="chip shrink-0 gap-1.5 border-[#c23a2b4d] text-[#c23a2b]">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect x="3" y="7" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="2" />
                  <path d="M9 7l1.5-3h3L15 7" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                  <circle cx="12" cy="13.5" r="3" stroke="currentColor" strokeWidth="2" />
                </svg>
                screenshot
              </span>
            )}
            <span
              className={`shrink-0 font-mono text-[9px] uppercase ${
                r.status === "pass"
                  ? "text-[#1f7a4d]"
                  : r.status === "fail"
                    ? "text-[#c23a2b]"
                    : "text-[#545b66]"
              }`}
            >
              {r.status === "running" ? "…" : r.status}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-3">
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#14181f14]">
          <div className="h-full w-[78%] rounded-full bg-[#14181f]" />
        </div>
      </div>
    </div>
  );
}
