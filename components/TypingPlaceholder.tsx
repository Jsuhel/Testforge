"use client";

import { useEffect, useRef, useState } from "react";

const TEXT = "Upload FSD and chat with AI for explanation...";

/**
 * Typewriter placeholder inside a rigid, fixed bounding box
 * (overflow hidden + nowrap — text length can never reflow the page).
 * Types the prompt, holds, deletes, pauses and types again — forever,
 * so the hero keeps moving for as long as a visitor watches. Once the
 * text passes the right edge the content slides left via transform
 * only — like a real input — so the caret stays visible; the exiting
 * characters fade at the left edge.
 */
export default function TypingPlaceholder() {
  const [len, setLen] = useState(0);
  const [offset, setOffset] = useState(0);
  const [animated, setAnimated] = useState(false);
  const boxRef = useRef<HTMLSpanElement>(null);
  const innerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      // static, unscrolled placeholder start
      setLen(TEXT.length);
      return;
    }

    setAnimated(true);
    let i = 0;
    let dir: 1 | -1 = 1;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      i += dir;
      setLen(i);
      if (dir === 1 && i < TEXT.length) {
        timer = setTimeout(tick, 45); // typing
      } else if (dir === 1) {
        dir = -1;
        timer = setTimeout(tick, 2200); // hold the full prompt
      } else if (i > 0) {
        timer = setTimeout(tick, 16); // deleting
      } else {
        dir = 1;
        timer = setTimeout(tick, 700); // breath before the next round
      }
    };
    timer = setTimeout(tick, 600);

    return () => clearTimeout(timer);
  }, []);

  // keep the caret pinned at the right edge once text overflows the box
  useEffect(() => {
    if (!animated) return;
    const box = boxRef.current;
    const inner = innerRef.current;
    if (!box || !inner) return;
    const overflow = inner.scrollWidth - box.clientWidth;
    setOffset(overflow > 0 ? overflow : 0);
  }, [len, animated]);

  return (
    <span
      ref={boxRef}
      data-typing-box
      className="block overflow-hidden whitespace-nowrap leading-none"
      style={
        offset > 0
          ? {
              maskImage: "linear-gradient(to right, transparent 0, #000 18px)",
              WebkitMaskImage: "linear-gradient(to right, transparent 0, #000 18px)",
            }
          : undefined
      }
    >
      <span
        ref={innerRef}
        data-typing-inner
        className="typing-scroll inline-block"
        style={{ transform: `translateX(-${offset}px)` }}
      >
        {TEXT.slice(0, len)}
        <span
          data-caret
          className="typing-caret ml-px inline-block h-[1.05em] w-[2px] translate-y-[2px] bg-[#e4572e]"
        />
      </span>
    </span>
  );
}
