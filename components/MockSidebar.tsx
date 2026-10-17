import type { ReactNode } from "react";

export const SIDEBAR_ITEMS: { label: string; icon: ReactNode }[] = [
  {
    label: "Dashboard",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M6 3h9l4 4v14H6V3Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path d="M9 9h6M9 13h6M9 17h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Test Cases",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M4 6l2 2 3-3M4 13l2 2 3-3M12 6h8M12 14h8"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M5 20h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Automation",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M8 6 3 12l5 6M16 6l5 6-5 6M13 5l-2 14"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "Execution",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M6 4l13 8-13 8V4Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "Reports",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M4 20V10M10 20V4M16 20v-7M21 20H3"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

type MockSidebarProps = {
  /** How many icons the user has earned so far (0–5) */
  count: number;
  /** Index of the currently highlighted icon */
  activeIndex?: number;
};

/**
 * The product sidebar mock. Slots that are not earned yet render as
 * dashed placeholders so the "grows icon by icon" idea is visible.
 */
export default function MockSidebar({ count, activeIndex = -1 }: MockSidebarProps) {
  return (
    <div
      className="flex shrink-0 flex-col gap-3 border-r border-[#14181f1f] bg-[#eeebe2] p-2.5"
      aria-hidden="true"
    >
      {SIDEBAR_ITEMS.map((item, i) => {
        const earned = i < count;
        const active = i === activeIndex;
        return (
          <div
            key={item.label}
            className={`flex h-8 w-8 items-center justify-center rounded-md ${
              earned
                ? active
                  ? "bg-[#14181f] text-[#f4f1ea]"
                  : "text-[#14181f99] bg-[#14181f0d]"
                : "border border-dashed border-[#14181f2e]"
            }`}
            title={earned ? item.label : "Not unlocked yet"}
          >
            {earned ? item.icon : null}
          </div>
        );
      })}
    </div>
  );
}
