import MockSidebar from "./MockSidebar";
import TypingPlaceholder from "./TypingPlaceholder";

/**
 * Mock of the real first screen: one search bar, full sidebar.
 */
export default function HeroMock() {
  return (
    <div className="mock mock-fixed w-full overflow-hidden" role="img" aria-label="TestForge first screen: a search bar with the product sidebar beside it">
      <div className="mock-titlebar">
        <span className="mock-dot" />
        <span className="mock-dot" />
        <span className="mock-dot" />
        <span className="ml-3 font-mono text-[11px] text-[#545b66]">
          testforge.app / new session
        </span>
      </div>
      <div className="flex min-h-[320px] sm:min-h-[360px]">
        <MockSidebar count={5} activeIndex={0} />
        <div className="flex min-w-0 flex-1 flex-col items-center justify-center gap-5 px-6 py-10">
          <p className="font-display text-lg font-semibold tracking-tight text-[#14181f]">
            Start with the document
          </p>
          <div className="w-full max-w-[30rem]">
            <label htmlFor="hero-search" className="sr-only">
              Upload FSD and chat with AI for explanation
            </label>
            <div className="flex w-full items-center gap-3.5 rounded-lg border border-[#14181f40] bg-white px-5 py-4 shadow-[0_1px_0_#14181f1a]">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                className="shrink-0 text-[#e4572e]"
                aria-hidden="true"
              >
                <path
                  d="M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8l-5-5Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <path d="M14 3v5h5" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
              </svg>
              <span className="min-w-0 flex-1 overflow-hidden font-mono text-[14px] leading-none text-[#545b66]">
                <TypingPlaceholder />
              </span>
              <span className="chip shrink-0 border-[#14181f2e] text-[#545b66]">
                ⌘K
              </span>
            </div>
            <p className="mt-3 text-center font-mono text-[10px] tracking-wide text-[#545b66]">
              PDF · DOCX · Markdown. Nothing leaves your workspace without approval
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="chip border-[#1f7a4d3d] text-[#1f7a4d]">Human approves each step</span>
          </div>
        </div>
      </div>
    </div>
  );
}
