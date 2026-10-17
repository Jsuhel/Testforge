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
    title: "20-minute walkthrough",
    body: "on your own requirements document",
  },
  {
    n: "03",
    title: "Your environment only",
    body: "nothing to install, nothing leaves it",
  },
];

export default function FinalCta() {
  return (
    <section id="start" className="bg-night text-paper">
      <div className="mx-auto grid max-w-page gap-10 px-5 py-14 md:px-8 md:py-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-14">
        <Reveal>
          <p className="kicker mb-4 flex items-center gap-3 text-[#9aa3ad]">
            <span className="inline-block h-px w-8 bg-accent" aria-hidden="true" />
            Get started
          </p>
          <h2 className="max-w-xl font-display text-3xl font-bold leading-[1.05] tracking-[-0.015em] sm:text-4xl">
            Complete test coverage before the first coffee break.
          </h2>
          <blockquote className="mt-5 max-w-xl border-l-2 border-accent pl-4">
            <p className="font-display text-base italic leading-relaxed text-[#c8cdd4]">
              &ldquo;It parsed our 40-page FSD in one pass and drafted the
              whole suite before lunch.&rdquo;
            </p>
            <cite className="mt-1.5 block font-mono text-[11px] not-italic uppercase tracking-[0.14em] text-[#9aa3ad]">
              — QA lead, early-access team
            </cite>
          </blockquote>

          <ul className="mt-8 grid gap-3.5">
            {NEXT_STEPS.map((s) => (
              <li key={s.n} className="flex items-baseline gap-3 text-sm">
                <span className="font-mono text-xs text-accent" aria-hidden="true">
                  {s.n}
                </span>
                <span>
                  <span className="font-semibold">{s.title}</span>{" "}
                  <span className="text-[#9aa3ad]">— {s.body}</span>
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
