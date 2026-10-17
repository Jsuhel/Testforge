import type { ReactNode } from "react";
import MockSidebar from "./MockSidebar";

type AppWindowProps = {
  /** Title shown in the window's tab bar */
  title: string;
  /** Icons earned in the sidebar mock (0–5) */
  sidebarCount: number;
  /** Highlighted sidebar icon */
  activeIndex?: number;
  /** Main panel content */
  children: ReactNode;
  /** Optional status strip under the main panel */
  footer?: ReactNode;
};

/**
 * Shared mock of the TestForge app window used across the page.
 * Fixed light chrome so it reads as "the product" in both themes.
 */
export default function AppWindow({
  title,
  sidebarCount,
  activeIndex = -1,
  children,
  footer,
}: AppWindowProps) {
  return (
    <div className="mock mock-fixed overflow-hidden" role="img" aria-label={`TestForge app window, ${title}`}>
      <div className="mock-titlebar">
        <span className="mock-dot" />
        <span className="mock-dot" />
        <span className="mock-dot" />
        <span className="ml-3 truncate font-mono text-[11px] text-[#545b66]">
          testforge.app / {title}
        </span>
      </div>
      <div className="flex min-h-[300px] sm:min-h-[340px]">
        <MockSidebar count={sidebarCount} activeIndex={activeIndex} />
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex-1 overflow-hidden">{children}</div>
          {footer ? (
            <div className="border-t border-[#14181f1f] px-3 py-2 font-mono text-[10px] text-[#545b66]">
              {footer}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
