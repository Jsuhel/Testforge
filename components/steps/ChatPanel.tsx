export default function ChatPanel() {
  return (
    <div className="flex h-full flex-col gap-3 p-4" aria-hidden="true">
      <div className="flex items-center gap-2 border-b border-[#14181f1f] pb-3">
        <span className="chip border-[#14181f2e] text-[#545b66]">
          FSD_Loan_Onboarding_v3.pdf
        </span>
        <span className="chip border-[#1f7a4d3d] text-[#1f7a4d]">12 functions read</span>
        <span className="chip border-[#c23a2b33] text-[#c23a2b]">1 gap flagged</span>
      </div>

      <div className="ml-auto max-w-[85%] rounded-lg rounded-br-sm border border-[#14181f2e] bg-white px-3 py-2 text-[12px] leading-snug text-[#14181f]">
        What happens when a pre-closure request lands on a holiday?
      </div>

      <div className="max-w-[92%] rounded-lg rounded-bl-sm bg-[#14181f] px-3 py-2.5 text-[12px] leading-relaxed text-[#f4f1ea]">
        Section 4.2 — requests after the EOD cutoff are queued to the next
        working day, and interest is charged to the previous business day.
        <span className="mt-2 block border-l-2 border-[#e4572e] pl-2 text-[#ffb59d]">
          Gap: the FSD doesn&apos;t say whether the penalty waiver applies to
          queued requests.
        </span>
      </div>

      <div className="mt-auto flex items-center gap-2 rounded-lg border border-[#14181f2e] bg-white px-3 py-2">
        <span className="font-mono text-[11px] text-[#545b66]">
          Ask a follow-up…
        </span>
        <span className="ml-auto font-mono text-[10px] text-[#e4572e]">Send</span>
      </div>
    </div>
  );
}
