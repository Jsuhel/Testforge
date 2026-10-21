import Reveal from "./Reveal";
import FeedbackForm from "./FeedbackForm";

const NEXT_STEPS = [
  {
    n: "01",
    title: "Reply within one working day",
    body: "from a person, not an autoresponder",
  },
  {
    n: "02",
    title: "20-minute demo, your FSD",
    body: "watch it analysed, chatted through, drafted live",
  },
  {
    n: "03",
    title: "Your environment only",
    body: "nothing to install, nothing leaves it",
  },
];

export default function FinalCta() {
  return (
    <section id="start" className="relative overflow-hidden bg-night text-paper">
      <div
        aria-hidden="true"
        className="glow-wash -bottom-48 left-1/2 h-[560px] w-[900px] -translate-x-1/2 opacity-60"
      />
      <div className="relative mx-auto grid max-w-page gap-10 px-5 py-14 md:px-8 md:py-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-14">
        <Reveal>
          <p className="kicker mb-4 flex items-center gap-3 text-fog">
            <span className="inline-block h-px w-8 bg-violet" aria-hidden="true" />
            Request a demo
          </p>
          <h2 className="max-w-xl font-display text-3xl font-medium leading-[1.05] tracking-[-0.015em] text-white sm:text-4xl">
            Complete test coverage{" "}
            <span className="text-signal">before the first coffee break.</span>
          </h2>
          <blockquote className="mt-5 max-w-xl border-l-2 border-violet pl-4">
            <p className="font-display text-base italic leading-relaxed text-ash">
              &ldquo;It parsed our 40-page FSD in one pass and drafted the
              whole suite before lunch.&rdquo;
            </p>
            <cite className="mt-1.5 block font-mono text-[11px] not-italic uppercase tracking-[0.14em] text-fog">
              QA lead, early-access team
            </cite>
          </blockquote>

          <ul className="mt-8 grid gap-3.5">
            {NEXT_STEPS.map((s) => (
              <li key={s.n} className="flex items-baseline gap-3 text-sm">
                <span className="font-mono text-xs text-violet" aria-hidden="true">
                  {s.n}
                </span>
                <span>
                  <span className="font-semibold text-white">{s.title}</span>{" "}
                  <span className="text-fog">· {s.body}</span>
                </span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <FeedbackForm />
        </Reveal>
      </div>
    </section>
  );
}
