import ChatPanel from "@/components/steps/ChatPanel";
import TestCasesPanel from "@/components/steps/TestCasesPanel";
import ScriptPanel from "@/components/steps/ScriptPanel";
import ExecutionPanel from "@/components/steps/ExecutionPanel";
import ReportPanel from "@/components/steps/ReportPanel";
import AssignPanel from "@/components/steps/AssignPanel";

/*
 * Offline harness that renders the six workflow-stage pages as clean white
 * panels at a fixed 2.2:1 frame (no window chrome: no traffic-light dots,
 * no sidebar icons) so `public/workflow/stage-0*.png` can be re-captured
 * with Playwright. Not linked anywhere; the route exists for regeneration
 * only. Keep the frame ratio in sync with imageAspectRatio in
 * WorkflowShowcase.
 */
const STAGES = [
  { Panel: ChatPanel },
  { Panel: TestCasesPanel },
  { Panel: ScriptPanel },
  { Panel: ExecutionPanel },
  { Panel: ReportPanel },
  { Panel: AssignPanel },
];

export default function CapturePage() {
  return (
    <main className="flex flex-col items-center gap-14 bg-[#0e0e0e] py-14">
      {STAGES.map(({ Panel }, i) => (
        <div
          key={i}
          id={`stage-0${i + 1}`}
          className="mock h-[320px] w-[704px] max-w-full"
        >
          <Panel />
        </div>
      ))}
    </main>
  );
}
