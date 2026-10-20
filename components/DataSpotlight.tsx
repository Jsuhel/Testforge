import AppWindow from "./AppWindow";
import Reveal from "./Reveal";

const POINTS = [
  {
    title: "No more data hunting",
    body: "No exports, no copied CSVs, no asking which table holds the maker accounts. The suite fetches what it needs at execution time.",
  },
  {
    title: "Boundary values, pulled automatically",
    body: "Minimums, maximums and edge rows come straight from the source; the same limits the FSD declares are the ones tested.",
  },
  {
    title: "Read-only, and only when you say so",
    body: "SELECT-only access on staging or masked databases. The connection is yours to grant, watch and revoke.",
  },
];

/** Mock of the test-data panel: TestForge querying the database itself. */
function DataPanel() {
  return (
    <div className="flex h-full flex-col gap-3 p-4" aria-hidden="true">
      <div className="flex flex-wrap items-center gap-2 border-b border-[#14181f1f] pb-3">
        <span className="chip border-[#14181f2e] text-[#545b66]">
          staging-db · read-only
        </span>
        <span className="chip border-[#1f7a4d3d] text-[#1f7a4d]">masked data</span>
      </div>

      <div className="rounded-lg border border-[#14181f2e] bg-white px-3 py-2.5 font-mono text-[11px] leading-relaxed text-[#14181f]">
        <span className="text-[#545b66]">-- fetching its own fixtures</span>
        <br />
        <span className="text-[#e4572e]">SELECT</span> account_no, role,
        <br />
        <span className="pl-14">balance</span>
        <br />
        <span className="text-[#e4572e]">FROM</span> accounts
        <br />
        <span className="text-[#e4572e]">WHERE</span> role{" "}
        <span className="text-[#e4572e]">IN</span>{" "}
        (<span className="text-[#1f7a4d]">&apos;maker&apos;</span>,
        <br />
        <span className="pl-14 text-[#1f7a4d]">&apos;checker&apos;</span>)
      </div>

      <div className="overflow-hidden rounded-lg border border-[#14181f1f] font-mono text-[11px]">
        <div className="grid grid-cols-[1fr_1fr_1fr] gap-2 border-b border-[#14181f1f] bg-[#f6f4ef] px-3 py-1.5 text-[10px] uppercase tracking-[0.08em] text-[#545b66]">
          <span>account_no</span>
          <span>role</span>
          <span>balance</span>
        </div>
        {[
          ["••••4821", "maker", "₹ 2,40,000"],
          ["••••9034", "checker", "₹ 0.00"],
          ["••••7712", "maker", "₹ 100.00"],
        ].map((row) => (
          <div
            key={row[0]}
            className="grid grid-cols-[1fr_1fr_1fr] gap-2 border-b border-[#14181f14] px-3 py-1.5 text-[#14181f] last:border-0"
          >
            <span>{row[0]}</span>
            <span>{row[1]}</span>
            <span>{row[2]}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="chip border-[#1f7a4d3d] text-[#1f7a4d]">
          3 rows · 0.3s
        </span>
        <span className="chip border-[#1f7a4d3d] text-[#1f7a4d]">
          limits ₹100–₹10L
        </span>
      </div>

      <div className="mt-auto rounded-lg bg-[#14181f] px-3 py-2 font-mono text-[10px] text-[#9aa3ad]">
        queries are SELECT-only · connection approved by you
      </div>
    </div>
  );
}

export default function DataSpotlight() {
  return (
    <section className="border-b border-line">
      <div className="mx-auto grid max-w-page items-center gap-12 px-5 py-16 md:px-8 md:py-24 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
        <Reveal>
          <AppWindow title="test-data" sidebarCount={3} activeIndex={2}>
            <DataPanel />
          </AppWindow>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="kicker mb-4 flex items-center gap-3">
            <span className="inline-block h-px w-8 bg-accent" aria-hidden="true" />
            Straight from your database
          </p>
          <h2 className="max-w-xl font-display text-4xl font-light leading-[1.05] tracking-[-0.015em] md:text-5xl">
            Test data that finds itself.
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
            Point TestForge at a staging or masked database once. From then
            on it looks up its own accounts, roles and boundary values, and
            the automation proceeds with real data, not hand-me-down
            spreadsheets.
          </p>
          <ul className="mt-8 grid gap-5">
            {POINTS.map((p) => (
              <li key={p.title} className="flex gap-3.5">
                <span
                  className="mt-1 inline-block h-2.5 w-2.5 shrink-0 rounded-full bg-accent"
                  aria-hidden="true"
                />
                <div>
                  <p className="font-medium">{p.title}</p>
                  <p className="mt-0.5 text-sm leading-relaxed text-muted">{p.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
