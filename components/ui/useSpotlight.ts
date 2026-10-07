"use client";
import { useCallback } from "react";

/**
 * Feeds the pointer position into --mx / --my on the hovered element so the
 * `.spotlight` CSS class can draw a glow + gradient border that follows it.
 * Writing CSS variables directly (instead of React state) avoids a re-render
 * on every mouse move.
 */
export function useSpotlight<T extends HTMLElement>() {
  return useCallback((e: React.PointerEvent<T>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  }, []);
}
