import Reveal from "./Reveal";
import FeedbackForm from "./FeedbackForm";

export default function FinalCta() {
  return (
    <section id="start" className="border-b border-line bg-night text-paper">
      <div className="mx-auto max-w-page px-5 py-16 md:px-8 md:py-24">
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
        </Reveal>
        <div className="mt-12">
          <FeedbackForm />
        </div>
      </div>
    </section>
  );
}
