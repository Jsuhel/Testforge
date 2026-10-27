const FIELDS = [
  { label: "Developer", value: "R. Iyer" },
  { label: "Email", value: "r.iyer@bank.com" },
  { label: "Team / module", value: "Payments core" },
];

const META = [
  { label: "Severity", value: "Major" },
  { label: "Priority", value: "P1" },
  { label: "Status", value: "Open" },
];

export default function AssignPanel() {
  return (
    <div className="flex h-full flex-col p-4" aria-hidden="true">
      <div className="mb-3 flex items-center gap-2">
        <span className="rounded-md bg-[#c23a2b] px-2 py-0.5 font-mono text-[9px] font-medium uppercase tracking-wider text-white">
          Assign
        </span>
        <span className="font-mono text-[10px] text-[#14181f]">TC-021</span>
        <span className="truncate text-[11px] text-[#545b66]">
          Transfer above balance was not blocked
        </span>
        <span className="ml-auto shrink-0 font-mono text-[9px] text-[#545b66]">
          RUN #48
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {FIELDS.map((f) => (
          <div key={f.label} className="rounded-md border border-[#14181f2e] bg-white px-2 py-1.5">
            <p className="font-mono text-[8px] uppercase tracking-wider text-[#545b66]">
              {f.label}
            </p>
            <p className="mt-0.5 truncate font-mono text-[10px] text-[#14181f]">
              {f.value}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-2 flex-1 rounded-md border border-[#14181f2e] bg-white px-2.5 py-1.5">
        <p className="font-mono text-[8px] uppercase tracking-wider text-[#545b66]">
          Defect description
        </p>
        <p className="mt-0.5 text-[11px] leading-snug text-[#14181f]">
          Balance check missing on confirm: transfer of 2,500 over draft limit
          went through. Evidence: screenshot, run log, row diff.
        </p>
      </div>

      <div className="mt-auto grid grid-cols-3 gap-2 border-t border-[#14181f1f] pt-3">
        {META.map((m) => (
          <div key={m.label} className="rounded-md border border-[#14181f2e] bg-white px-2 py-1.5">
            <p className="font-mono text-[8px] uppercase tracking-wider text-[#545b66]">
              {m.label}
            </p>
            <p
              className={`mt-0.5 truncate font-mono text-[10px] ${
                m.value === "Major" || m.value === "P1"
                  ? "text-[#c23a2b]"
                  : "text-[#14181f]"
              }`}
            >
              {m.value}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-2.5 flex items-center gap-2">
        <span className="font-mono text-[9px] text-[#545b66]">
          evidence attached · ticket after your approval
        </span>
        <span className="ml-auto rounded-md bg-[#405bff] px-3 py-1.5 font-mono text-[10px] font-medium text-white">
          Assign developer
        </span>
      </div>
    </div>
  );
}
