const ROW_A = [
  "Maker-checker approval",
  "Insufficient funds blocked",
  "Interest rounding to 2 decimals",
  "EOD batch run",
  "Amount boundary 0.00",
  "Net off reversal",
  "Duplicate payment stopped",
  "Audit trail entry",
];

const ROW_B = [
  "Duplicate member check",
  "Role permission denied",
  "Two-factor prompt at login",
  "Session timeout at 15:00",
  "Statement PDF matches ledger",
  "FX rate staleness check",
  "Negative balance prevented",
  "Backdated entry blocked",
];

function Row({ items, direction }: { items: string[]; direction: "left" | "right" }) {
  const doubled = [...items, ...items, ...items, ...items];
  return (
    <div className={`marquee-track marquee-${direction}`} aria-hidden="true">
      {doubled.map((item, i) => (
        <span key={`${item}-${i}`} className="flex shrink-0 items-center">
          <span
            className={`whitespace-nowrap font-mono text-[13px] text-muted ${
              i % 4 === 1
                ? "mx-6 rounded-md border border-line-strong px-3 py-1"
                : "mx-6"
            }`}
          >
            {item}
          </span>
          <span aria-hidden="true" className="text-accent">
            /
          </span>
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  return (
    <section
      aria-label="Banking scenarios TestForge covers: maker-checker approvals, insufficient funds, interest rounding, duplicate payments, audit trails and more"
      className="marquee overflow-hidden border-b border-line bg-surface2 py-7"
    >
      <div className="flex flex-col gap-4">
        <Row items={ROW_A} direction="left" />
        <Row items={ROW_B} direction="right" />
      </div>
    </section>
  );
}
