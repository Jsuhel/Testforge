import Reveal from "./Reveal";
import FeedbackForm from "./FeedbackForm";

const NEXT_STEPS = [
  {
    n: "01",
    title: "We reply within one working day",
    body: "A real person from the team — not an autoresponder.",
  },
  {
    n: "02",
    title: "A 20-minute walkthrough, your FSD",
    body: "Bring a real requirements document; watch the suite get drafted live.",
  },
  {
    n: "03",
    title: "Everything stays in your environment",
    body: "Scripts run on your infra. Nothing to install, nothing leaves it.",
  },
];

export default function FinalCta() {
  return (
    <section id="start" className="border-b border-[#eef0ee14] bg-night text-paper">
      <div className="mx-auto grid max-w-page gap-12 px-5 py-16 md:px-8 md:py-24 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-16">
        <Reveal>
          <p className="kicker mb-4 flex items-center gap-3 text-[#9aa3ad]">
            <span className="inline-block h-px w-8 bg-accent" aria-hidden="true" />
            Get started
          </p>
          <h2 className="max-w-2xl font-display text-3xl font-bold leading-[1.05] tracking-[-0.015em] sm:text-4xl md:text-[2.75rem]">
            Complete test coverage before the first coffee break.
          </h2>
          <blockquote className="mt-6 max-w-xl border-l-2 border-accent pl-4">
            <p className="font-display text-base italic leading-relaxed text-[#c8cdd4] sm:text-lg">
              &ldquo;It parsed our 40-page FSD in one pass and drafted the
              whole suite before lunch.&rdquo;
            </p>
            <cite className="mt-2 block font-mono text-[11px] not-italic uppercase tracking-[0.14em] text-[#9aa3ad]">
              — QA lead, early-access team
            </cite>
          </blockquote>

          <h3 className="mt-10 font-mono text-[11px] uppercase tracking-[0.14em] text-[#9aa3ad]">
            What happens after you hit send
          </h3>
          <ul className="mt-4 grid gap-5">
            {NEXT_STEPS.map((s) => (
              <li key={s.n} className="flex gap-4">
                <span className="font-mono text-xs leading-6 text-accent" aria-hidden="true">
                  {s.n}
                </span>
                <div>
                  <p className="text-sm font-semibold leading-6">{s.title}</p>
                  <p className="mt-0.5 text-sm leading-relaxed text-[#9aa3ad]">{s.body}</p>
                </div>
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
