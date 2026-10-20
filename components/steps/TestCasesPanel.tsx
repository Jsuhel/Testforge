const ROWS = [
  {
    id: "TC-014",
    scenario: "Pre-close after cutoff queues to next working day",
    type: "Edge",
    status: "review" as const,
  },
  {
    id: "TC-015",
    scenario: "Penalty waiver applies to queued request",
    type: "Gap",
    status: "flagged" as const,
  },
  {
    id: "TC-016",
    scenario: "Maker can reject a checker return",
    type: "Role",
    status: "approved" as const,
  },
  {
    id: "TC-017",
    scenario: "Interest charged to previous business day",
    type: "Calc",
    status: "review" as const,
  },
];

export default function TestCasesPanel() {
  return (
    <div className="flex h-full flex-col p-4" aria-hidden="true">
      <div className="mb-3 flex items-center justify-between">
        <span className="font-mono text-[10px] tracking-wider text-[#545b66]">
          41 CASES GENERATED · REVIEW EACH, THEN APPROVE
        </span>
        <span className="chip border-[#14181f2e] text-[#545b66]">1 of 41</span>
      </div>

      <div className="grid grid-cols-[3.4rem_1fr_2.6rem_4.4rem] gap-x-2 border-b border-[#14181f1f] pb-1.5 font-mono text-[9px] uppercase tracking-wider text-[#545b66]">
        <span>ID</span>
        <span>Scenario</span>
        <span>Type</span>
        <span className="text-right">Action</span>
      </div>

      {ROWS.map((r) => (
        <div
          key={r.id}
          className="grid grid-cols-[3.4rem_1fr_2.6rem_4.4rem] items-center gap-x-2 border-b border-[#14181f14] py-2 last:border-0"
        >
          <span className="font-mono text-[10px] text-[#14181f]">{r.id}</span>
          <span className="truncate text-[11px] leading-tight text-[#14181f]">
            {r.scenario}
          </span>
          <span
            className={`font-mono text-[9px] ${
              r.type === "Gap" ? "text-[#c23a2b]" : "text-[#545b66]"
            }`}
          >
            {r.type}
          </span>
          <span className="flex justify-end">
            {r.status === "review" && (
              <span className="rounded-md bg-[#e4572e] px-2 py-1 font-mono text-[9px] font-medium text-white">
                Approve
              </span>
            )}
            {r.status === "flagged" && (
              <span className="rounded-md border border-[#c23a2b4d] px-2 py-1 font-mono text-[9px] text-[#c23a2b]">
                Flagged
              </span>
            )}
            {r.status === "approved" && (
              <span className="rounded-md border border-[#1f7a4d4d] px-2 py-1 font-mono text-[9px] text-[#1f7a4d]">
                Approved
              </span>
            )}
          </span>
        </div>
      ))}
    </div>
  );
}
