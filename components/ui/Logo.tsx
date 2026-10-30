/*
 * TestForge AI brand lockup: three test lines flow in from the left, merge
 * into one point and resolve as an amber checkmark ("many tests, one pass")
 * beside a lowercase wordmark. The art is fixed: same curves, stroke widths
 * and round caps in every size; only the palette moves between variants.
 * The site is a single dark theme, so "dark" is the default everywhere.
 */

const VARIANTS = {
  dark: { outer: "#6366F1", middle: "#E0E7FF", check: "#FBBF24", text: "#FFFFFF" },
  light: { outer: "#818CF8", middle: "#4F46E5", check: "#F59E0B", text: "#1E1B4B" },
} as const;

/* Icon geometry: viewBox 118x96, so at 1.8em tall the width is 2.2138em. */
export default function Logo({
  size = "md",
  variant = "dark",
  className = "",
}: {
  size?: "md" | "lg";
  variant?: keyof typeof VARIANTS;
  className?: string;
}) {
  const c = VARIANTS[variant];
  return (
    <a
      href="/"
      aria-label="TestForge home"
      className={`group flex shrink-0 items-center gap-[0.7em] rounded-lg font-medium leading-none tracking-[-0.02em] [font-family:var(--font-inter)] ${
        size === "lg" ? "text-[18px] sm:text-[20px]" : "text-[20px]"
      } ${className}`}
    >
      <svg
        viewBox="56 64 118 96"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="h-[1.8em] w-[2.2138em] shrink-0 transition-transform duration-200 ease-out group-hover:scale-105"
      >
        <path d="M64 72 C94 72 94 112 120 112" stroke={c.outer} strokeWidth="8" />
        <path d="M64 152 C94 152 94 112 120 112" stroke={c.outer} strokeWidth="8" />
        <path d="M64 112 L120 112" stroke={c.middle} strokeWidth="8" />
        <path d="M120 112 L136 128 L166 90" stroke={c.check} strokeWidth="9" />
      </svg>
      <span className="whitespace-nowrap" style={{ color: c.text }}>
        testforge<span style={{ color: "#6366F1" }}>ai</span>
      </span>
    </a>
  );
}
