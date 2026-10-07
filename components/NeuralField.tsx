"use client";
import { useEffect, useRef } from "react";

type Node = { x: number; y: number; vx: number; vy: number; r: number; hue: number };
type Pulse = { x: number; y: number; t: number };
type RGB = [number, number, number];

const LINK_DIST = 130;
const MOUSE_DIST = 190;

const VIOLET: RGB = [167, 139, 250];
const CYAN: RGB = [34, 211, 238];
const AMBER: RGB = [242, 182, 50];
const MINT: RGB = [94, 234, 141];

// Each section tints the network with its own pair of colors.
const SECTION_TINTS: [string, RGB, RGB][] = [
  ["about", VIOLET, CYAN],
  ["projects", CYAN, MINT],
  ["skills", VIOLET, AMBER],
  ["publications", AMBER, VIOLET],
  ["experience", CYAN, VIOLET],
  ["contact", MINT, CYAN],
];

// Clicks on these shouldn't also fire a shockwave.
const INTERACTIVE = "a,button,input,textarea,label,[role=dialog],[data-interactive]";

/**
 * A page-wide canvas of drifting nodes that link up when close — a loose nod
 * to a neural net. It sits fixed behind all content: nodes lean toward the
 * cursor, clicking empty space sends out a shockwave, scrolling moves nodes at
 * different speeds for depth, and the colors shift to match the current section.
 * Pauses when the tab is hidden, and renders a single static frame for
 * prefers-reduced-motion.
 */
export default function NeuralField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let nodes: Node[] = [];
    const pulses: Pulse[] = [];
    const mouse = { x: -9999, y: -9999, active: false };
    let raf = 0;
    let running = false;
    let frame = 0;
    let lastScroll = window.scrollY;

    // current colors ease toward the active section's tint
    const colA: RGB = [...VIOLET];
    const colB: RGB = [...CYAN];
    let target: [RGB, RGB] = [VIOLET, CYAN];

    const seed = () => {
      const count = Math.round(Math.min(110, Math.max(40, (w * h) / 11000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.6 + 0.6,
        hue: Math.random(),
      }));
    };

    const resize = () => {
      const nw = window.innerWidth;
      const nh = window.innerHeight;
      // Mobile browsers resize the height as the address bar shows/hides;
      // only reseed on real layout changes so the field doesn't jump.
      const reseed = nw !== w || Math.abs(nh - h) > 150;
      w = nw;
      h = nh;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (reseed) seed();
    };

    const pickTint = () => {
      let next: [RGB, RGB] = [VIOLET, CYAN];
      const mid = h * 0.5;
      for (const [id, a, b] of SECTION_TINTS) {
        const r = document.getElementById(id)?.getBoundingClientRect();
        if (r && r.top <= mid && r.bottom >= mid) next = [a, b];
      }
      target = next;
    };

    const mix = (t: number, a: number) =>
      `rgba(${Math.round(colA[0] + (colB[0] - colA[0]) * t)},${Math.round(colA[1] + (colB[1] - colA[1]) * t)},${Math.round(colA[2] + (colB[2] - colA[2]) * t)},${a})`;

    const step = () => {
      frame++;
      if (frame % 15 === 1) pickTint();
      for (let i = 0; i < 3; i++) {
        colA[i] += (target[0][i] - colA[i]) * 0.04;
        colB[i] += (target[1][i] - colB[i]) * 0.04;
      }

      // Full strength over the hero, half strength once you're reading content.
      const fade = 1 - 0.5 * Math.min(1, window.scrollY / (h * 0.9));

      // Parallax: on scroll, bigger (closer) nodes move further than small ones.
      const dy = window.scrollY - lastScroll;
      lastScroll = window.scrollY;

      ctx.clearRect(0, 0, w, h);

      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.t += 1;
        const alpha = Math.max(0, 1 - p.t / 70);
        if (alpha <= 0) {
          pulses.splice(i, 1);
          continue;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.t * 7, 0, Math.PI * 2);
        ctx.strokeStyle = mix(1, alpha * 0.35);
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      for (const n of nodes) {
        if (!reduce) {
          if (mouse.active) {
            const dx = mouse.x - n.x;
            const dyM = mouse.y - n.y;
            const d = Math.hypot(dx, dyM);
            if (d < MOUSE_DIST && d > 1) {
              n.vx += (dx / d) * 0.012;
              n.vy += (dyM / d) * 0.012;
            }
          }
          for (const p of pulses) {
            const dx = n.x - p.x;
            const dyP = n.y - p.y;
            const d = Math.hypot(dx, dyP);
            if (Math.abs(d - p.t * 7) < 18 && d > 1) {
              n.vx += (dx / d) * 0.9;
              n.vy += (dyP / d) * 0.9;
            }
          }
          n.vx *= 0.985;
          n.vy *= 0.985;
          // keep a gentle minimum drift so the field never freezes
          if (Math.abs(n.vx) < 0.05) n.vx += (Math.random() - 0.5) * 0.04;
          if (Math.abs(n.vy) < 0.05) n.vy += (Math.random() - 0.5) * 0.04;
          n.x += n.vx;
          n.y += n.vy - dy * 0.12 * n.r;
          if (n.x < 0 || n.x > w) n.vx *= -1;
          n.x = Math.max(0, Math.min(w, n.x));
          // wrap vertically so scrolling feels like moving through the field
          if (n.y < -20) n.y = h + 20;
          else if (n.y > h + 20) n.y = -20;
        }
      }

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < LINK_DIST) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = mix((a.hue + b.hue) / 2, (1 - d / LINK_DIST) * 0.22 * fade);
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
        if (mouse.active) {
          const d = Math.hypot(a.x - mouse.x, a.y - mouse.y);
          if (d < MOUSE_DIST) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(242,182,50,${(1 - d / MOUSE_DIST) * 0.35 * fade})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      for (const n of nodes) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = mix(n.hue, 0.85 * fade);
        ctx.fill();
      }

      if (running) raf = requestAnimationFrame(step);
    };

    const start = () => {
      if (running || reduce || document.hidden) return;
      running = true;
      raf = requestAnimationFrame(step);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };
    const onLeave = () => {
      mouse.active = false;
    };
    const onDown = (e: PointerEvent) => {
      if ((e.target as HTMLElement).closest(INTERACTIVE)) return;
      pulses.push({ x: e.clientX, y: e.clientY, t: 0 });
    };
    const onResize = () => {
      resize();
      if (reduce) {
        pickTint();
        colA.splice(0, 3, ...target[0]);
        colB.splice(0, 3, ...target[1]);
        step();
      }
    };
    const onScroll = () => {
      // with reduced motion there is no loop, so repaint the static frame in the new tint
      if (reduce) onResize();
    };
    const onVis = () => (document.hidden ? stop() : start());

    resize();
    if (reduce) step();
    else start();

    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerdown", onDown);
    document.documentElement.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", onVis);

    return () => {
      stop();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-0" />;
}
