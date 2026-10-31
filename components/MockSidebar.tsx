import type { ReactNode } from "react";
import { LayoutDashboard, ListChecks, Code2, Play, BarChart3, UserPlus } from "lucide-react";

export const SIDEBAR_ITEMS: { label: string; icon: ReactNode }[] = [
  { label: "Dashboard", icon: <LayoutDashboard size={14} strokeWidth={2} aria-hidden="true" /> },
  { label: "Test Cases", icon: <ListChecks size={14} strokeWidth={2} aria-hidden="true" /> },
  { label: "Automation", icon: <Code2 size={14} strokeWidth={2} aria-hidden="true" /> },
  { label: "Execution", icon: <Play size={14} strokeWidth={2} aria-hidden="true" /> },
  { label: "Reports", icon: <BarChart3 size={14} strokeWidth={2} aria-hidden="true" /> },
  { label: "Assignments", icon: <UserPlus size={14} strokeWidth={2} aria-hidden="true" /> },
];

type MockSidebarProps = {
  /** How many icons the user has earned so far (0–6) */
  count: number;
  /** Index of the currently highlighted icon */
  activeIndex?: number;
};

/**
 * The product sidebar mock. Renders only the icons earned so far:
 * a module appears once its step is complete, never before.
 */
export default function MockSidebar({ count, activeIndex = -1 }: MockSidebarProps) {
  return (
    <div
      className="flex shrink-0 flex-col gap-3 border-r border-[#14181f1f] bg-[#eeebe2] p-2.5"
      aria-hidden="true"
    >
      {SIDEBAR_ITEMS.slice(0, count).map((item, i) => {
        const active = i === activeIndex;
        return (
          <div
            key={item.label}
            className={`flex h-8 w-8 items-center justify-center rounded-md ${
              active ? "bg-[#14181f] text-[#f4f1ea]" : "bg-[#14181f0d] text-[#14181f99]"
            }`}
            title={item.label}
          >
            {item.icon}
          </div>
        );
      })}
    </div>
  );
}
