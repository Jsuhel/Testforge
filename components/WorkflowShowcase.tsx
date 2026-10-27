"use client";

import ProjectShowcase from "@/components/ui/project-showcase";
import Reveal from "./Reveal";

const STAGES = [
  {
    name: "FSD chat",
    designation: "Stage 01 · Read and discuss the FSD",
    quote:
      "Upload the functional spec. TestForge reads it, explains the functionality in plain language, and asks about the gaps instead of guessing over them.",
    src: "/workflow/stage-01.png",
    link: "#start",
  },
  {
    name: "Test cases",
    designation: "Stage 02 · Generate and verify",
    quote:
      "One click drafts the suite: boundaries, roles, edge cases, each with the FSD clause it came from. A person reviews and approves every case.",
    src: "/workflow/stage-02.png",
    link: "#start",
  },
  {
    name: "Automation",
    designation: "Stage 03 · Automate",
    quote:
      "TestForge asks for exactly what it needs: URLs, roles, test data. Then it writes standard Playwright you can read line by line, edit, or reject.",
    src: "/workflow/stage-03.png",
    link: "#start",
  },
  {
    name: "Execution",
    designation: "Stage 04 · Execute",
    quote:
      "Run the suite headed and watch the browser work: each step, its status, the clock. Runs stream into your environment and your CI, and every break is captured with a screenshot.",
    src: "/workflow/stage-04.png",
    link: "#start",
  },
  {
    name: "Report",
    designation: "Stage 05 · Report",
    quote:
      "The report already knows what failed and why it likely failed: expected against actual, evidence attached, sorted pass, fail, blocked, skipped.",
    src: "/workflow/stage-05.png",
    link: "#start",
  },
  {
    name: "Tester assigning",
    designation: "Stage 06 · Assign the defect",
    quote:
      "One click files the defect to the developer who owns it: severity, priority and the full evidence trail. The tracker ticket follows your approval.",
    src: "/workflow/stage-06.png",
    link: "#start",
  },
];

/**
 * The six-stage execution workflow on the ProjectShowcase deck: each card
 * is a real screenshot of the stage's product panel. A card turns itself
 * every five seconds (paused on hover, off under reduced motion) and
 * visitors can drag the deck to slide it themselves. The section isolates
 * its stacking context so the flipping cards can never rise above the
 * floating nav pill.
 */
export default function WorkflowShowcase() {
  return (
    <section
      id="how-it-works"
      className="isolate overflow-x-clip border-b border-line"
      data-testid="workflow-showcase"
    >
      <div className="mx-auto max-w-page px-5 py-16 md:px-8 md:py-24">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="kicker mb-4">The six stages, in order</p>
            <h2 className="max-w-xl font-display text-4xl font-medium leading-[1.05] tracking-[-0.015em] text-white md:text-5xl">
              Workflow of <span className="text-signal">execution.</span>
            </h2>
            <p className="mt-4 max-w-md leading-relaxed text-fog">
              A new stage every five seconds, or drag the deck. Every card is
              the real product screen for that stage.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="mt-12">
          <ProjectShowcase
            testimonials={STAGES}
            autoplay
            hideNavigationButtons
            colors={{
              name: "#ffffff",
              position: "#a7a9ac",
              testimony: "#d1d3d4",
            }}
            fontSizes={{ name: "26px", position: "13px", testimony: "17px" }}
            spacing={{
              top: "0",
              bottom: "0",
              lineHeight: "1.6",
              nameTop: "0",
              nameBottom: "0.4em",
              positionTop: "0",
              positionBottom: "0.75em",
              testimonyTop: "0",
              testimonyBottom: "0",
            }}
            imageAspectRatio={2.2}
            outerRounding="18.2px"
            innerRounding="18px"
            outlineColor="rgba(255,255,255,0.16)"
            hoverOutlineColor="rgba(255,255,255,0.16)"
            buttonInscriptions={{
              previousButton: "Previous",
              nextButton: "Next",
              openWebAppButton: "Request a demo",
            }}
            halomotButtonGradient="linear-gradient(135deg, #405bff, #7084ff)"
            halomotButtonBackground="#101010"
            halomotButtonTextColor="#ffffff"
            halomotButtonOuterBorderRadius="30px"
            halomotButtonInnerBorderRadius="30px"
            halomotButtonHoverTextColor="#c7d0ff"
            onItemClick={() => {
              document.getElementById("start")?.scrollIntoView({ behavior: "smooth" });
            }}
          />
        </Reveal>
      </div>
    </section>
  );
}
