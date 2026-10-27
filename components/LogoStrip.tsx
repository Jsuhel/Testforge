const PHRASES = [
  { name: "FSD in, Playwright out", style: "font-semibold tracking-[0.22em]" },
  { name: "Boundary values, every edge", style: "font-display font-bold tracking-tight" },
  { name: "Negative paths, covered", style: "font-medium tracking-[0.18em]" },
  { name: "Regression that knows why", style: "font-display font-semibold lowercase tracking-tight" },
  { name: "Screenshots on every failure", style: "font-bold tracking-[0.26em]" },
  { name: "Traceability to the clause", style: "font-display font-medium tracking-normal" },
  { name: "Smoke to performance", style: "font-semibold tracking-[0.2em]" },
  { name: "A human approves every case", style: "font-display font-bold lowercase tracking-tight" },
];

/**
 * Quiet lifecycle strip: what the QA pipeline actually does, drifting in a
 * slow marquee, fog-toned at reduced opacity, no boxes.
 */
export default function LogoStrip() {
  const doubled = [...PHRASES, ...PHRASES];
  return (
    <section
      aria-label="What TestForge does across the QA lifecycle: FSD to Playwright, boundary values, negative paths, change-driven regression, failure screenshots, traceability, smoke through performance, human approval"
      className="border-y border-line py-10"
      data-testid="logo-strip"
    >
      <p className="kicker mb-6 text-center">
        From FSD to fixed defect
      </p>
      <div className="marquee overflow-hidden" aria-hidden="true">
        <div className="marquee-track marquee-left items-center">
          {doubled.map((item, i) => (
            <span
              key={`${item.name}-${i}`}
              className={`mx-10 whitespace-nowrap text-lg text-fog opacity-70 ${item.style}`}
            >
              {item.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
