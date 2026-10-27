"use client";

import { useState } from "react";

type HalomotButtonProps = {
  inscription: string;
  onClick?: () => void;
  /** Fixed CSS width, e.g. "172px" */
  fixedWidth?: string;
  /** Stretch to fill the flex row instead of using fixedWidth */
  fillWidth?: boolean;
  /** Gradient painted as the 1px outer border */
  gradient?: string;
  backgroundColor?: string;
  textColor?: string;
  innerBorderRadius?: string;
  outerBorderRadius?: string;
  /** Text color on hover (the gradient border stays lit) */
  hoverTextColor?: string;
  /** When set the button renders as an anchor */
  href?: string;
};

/**
 * Halomot-style button: a hairline gradient frame around a dark pill.
 * Shared by the project showcase carousel.
 */
export function HalomotButton({
  inscription,
  onClick,
  fixedWidth,
  fillWidth = false,
  gradient = "linear-gradient(to right, #a123f4, #603dec)",
  backgroundColor = "#111014",
  textColor = "#fff",
  innerBorderRadius = "6px",
  outerBorderRadius = "6.34px",
  hoverTextColor,
  href,
}: HalomotButtonProps) {
  const [hover, setHover] = useState(false);

  const frame = {
    background: gradient,
    padding: "1px",
    borderRadius: outerBorderRadius,
    width: fillWidth ? "100%" : fixedWidth,
    maxWidth: "100%",
    display: "inline-block",
  };

  const inner = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "44px",
    padding: "0 18px",
    borderRadius: innerBorderRadius,
    backgroundColor,
    color: hover && hoverTextColor ? hoverTextColor : textColor,
    fontSize: "14px",
    fontWeight: 600,
    lineHeight: 1,
    whiteSpace: "nowrap" as const,
    transition: "color 0.2s ease, background-color 0.2s ease",
    cursor: "pointer",
  };

  const handlers = {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    onFocus: () => setHover(true),
    onBlur: () => setHover(false),
  };

  if (href) {
    return (
      <a href={href} onClick={onClick} style={frame} {...handlers} data-halomot-button>
        <span style={inner}>{inscription}</span>
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} style={frame} {...handlers} data-halomot-button>
      <span style={inner}>{inscription}</span>
    </button>
  );
}

export default HalomotButton;
