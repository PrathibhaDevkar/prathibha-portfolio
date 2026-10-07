"use client";
import { useEffect, useRef } from "react";
import { skillCategories } from "../data/skills";

type RGB = [number, number, number];
type Kind = "core" | "hub" | "skill";
type GNode = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  label: string;
  kind: Kind;
  cat: number; // -1 for the core
  r: number;
  ax: number; // resting spot the node is gently pulled back to
  ay: number;
  flash: number; // 0..1, lights up when a signal arrives
};
type LinkKind = "spoke" | "branch" | "ring";
type Link = { a: number; b: number; len: number; kind: LinkKind };
// A glowing dot travelling core → hub → skill, like a neuron firing.
type Signal = { path: number[]; seg: number; t: number };

const COLORS: RGB[] = [
  [167, 139, 250],
  [34, 211, 238],
  [242, 182, 50],
  [94, 234, 141],
];
const rgba = ([r, g, b]: RGB, a: number) => `rgba(${r},${g},${b},${a})`;
const TOTAL_SKILLS = skillCategories.reduce((n, c) => n + c.skills.length, 0);

/**
 * Skills drawn as a small force-directed graph in the same visual language as
 * the background network. A core node ("me") sits in the middle with each
 * category hub on a spoke and its skills on springs around it. Signals travel
 * outward along the links and light up the skill they reach. Hover a node to
 * light up its cluster; drag any node and the springs pull it back.
 */
export default function SkillGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !host || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const font = getComputedStyle(document.body).fontFamily;
    const displayFont =
      getComputedStyle(document.documentElement).getPropertyValue("--font-bricolage").trim() || font;
    let w = 0;
    let h = 0;
    let nodes: GNode[] = [];
    let links: Link[] = [];
    let hubOf: number[] = []; // category -> hub node index
    let skillsOf: number[][] = []; // category -> skill node indices
    let signals: Signal[] = [];
    let hover = -1;
    let drag = -1;
    let raf = 0;
    let visible = false;
    let frame = 0;

    const node = (n: Omit<GNode, "vx" | "vy" | "ax" | "ay" | "flash">): GNode => ({
      ...n,
      vx: 0,
      vy: 0,
      ax: n.x,
      ay: n.y,
      flash: 0,
    });

    const build = () => {
      nodes = [node({ x: w / 2, y: h / 2, label: "Prathibha", kind: "core", cat: -1, r: 18 })];
      links = [];
      hubOf = [];
      skillsOf = [];
      signals = [];
      const n = skillCategories.length;
      skillCategories.forEach((cat, i) => {
        const ang = (i / n) * Math.PI * 2 - Math.PI / 2;
        // Keep the hub far enough from the edge that its widest label still fits outside the fan.
        ctx.font = `400 12px ${font}`;
        const widest = Math.max(...cat.skills.map((sk) => ctx.measureText(sk).width));
        const margin = 30 + Math.abs(Math.cos(ang)) * (85 + 9 + widest);
        const ax = Math.max(margin, Math.min(w - margin, w / 2 + Math.cos(ang) * w * 0.33));
        const ay = h / 2 + Math.sin(ang) * h * 0.32;
        const hi = nodes.length;
        hubOf.push(hi);
        skillsOf.push([]);
        nodes.push(node({ x: ax, y: ay, label: cat.title, kind: "hub", cat: i, r: 7 }));
        links.push({ a: 0, b: hi, len: Math.hypot(ax - w / 2, ay - h / 2), kind: "spoke" });
        const spread = Math.min(0.6, 3.4 / cat.skills.length);
        cat.skills.forEach((s, j) => {
          const a2 = ang + (j - (cat.skills.length - 1) / 2) * spread;
          const si = nodes.length;
          skillsOf[i].push(si);
          nodes.push(node({ x: ax + Math.cos(a2) * 85, y: ay + Math.sin(a2) * 70, label: s, kind: "skill", cat: i, r: 3.5 }));
          links.push({ a: hi, b: si, len: 80, kind: "branch" });
        });
      });
      hubOf.forEach((hi, i) => {
        const next = hubOf[(i + 1) % hubOf.length];
        links.push({ a: hi, b: next, len: Math.hypot(nodes[hi].ax - nodes[next].ax, nodes[hi].ay - nodes[next].ay), kind: "ring" });
      });
    };

    const resize = () => {
      const r = host.getBoundingClientRect();
      if (r.width === w && r.height === h) return;
      w = r.width;
      h = r.height;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
    };

    const physics = () => {
      // repulsion keeps labels from piling up (the core is left out so it doesn't shove the hubs)
      for (let i = 1; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const d2 = dx * dx + dy * dy;
          if (d2 > 0 && d2 < 90 * 90) {
            const d = Math.sqrt(d2);
            const f = 120 / d2;
            a.vx -= (dx / d) * f;
            a.vy -= (dy / d) * f;
            b.vx += (dx / d) * f;
            b.vy += (dy / d) * f;
          }
        }
      }
      for (const l of links) {
        const a = nodes[l.a];
        const b = nodes[l.b];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const d = Math.hypot(dx, dy) || 1;
        const f = (d - l.len) * (l.kind === "branch" ? 0.012 : 0.002);
        a.vx += (dx / d) * f;
        a.vy += (dy / d) * f;
        b.vx -= (dx / d) * f;
        b.vy -= (dy / d) * f;
      }
      nodes.forEach((n, i) => {
        n.flash = Math.max(0, n.flash - 0.025);
        if (i === drag) {
          n.vx = n.vy = 0;
          return;
        }
        const k = n.kind === "skill" ? 0.015 : n.kind === "hub" ? 0.02 : 0.04;
        n.vx += (n.ax - n.x) * k;
        n.vy += (n.ay - n.y) * k;
        n.vx *= 0.82;
        n.vy *= 0.82;
        n.x = Math.max(16, Math.min(w - 16, n.x + n.vx));
        n.y = Math.max(16, Math.min(h - 16, n.y + n.vy));
      });
    };

    const activeCat = () => {
      const i = drag >= 0 ? drag : hover;
      return i >= 0 ? nodes[i].cat : -1;
    };

    const spawn = () => {
      const focus = activeCat();
      const cat = focus >= 0 && Math.random() < 0.75 ? focus : Math.floor(Math.random() * skillCategories.length);
      const skills = skillsOf[cat];
      signals.push({ path: [0, hubOf[cat], skills[Math.floor(Math.random() * skills.length)]], seg: 0, t: 0 });
    };

    const advanceSignals = () => {
      for (let i = signals.length - 1; i >= 0; i--) {
        const s = signals[i];
        const a = nodes[s.path[s.seg]];
        const b = nodes[s.path[s.seg + 1]];
        s.t += 3.2 / Math.max(20, Math.hypot(b.x - a.x, b.y - a.y)); // ~3px per frame
        if (s.t >= 1) {
          b.flash = 1;
          s.seg++;
          s.t = 0;
          if (s.seg >= s.path.length - 1) signals.splice(i, 1);
        }
      }
    };

    const lerp = (s: Signal, t: number) => {
      const a = nodes[s.path[s.seg]];
      const b = nodes[s.path[s.seg + 1]];
      return [a.x + (b.x - a.x) * t, a.y + (b.y - a.y) * t];
    };

    const drawCore = (core: GNode, highlighted: boolean) => {
      const t = frame / 60;
      // soft glow that fills the middle
      const glow = ctx.createRadialGradient(core.x, core.y, 0, core.x, core.y, 170);
      glow.addColorStop(0, "rgba(167,139,250,0.20)");
      glow.addColorStop(0.5, "rgba(34,211,238,0.06)");
      glow.addColorStop(1, "rgba(34,211,238,0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(core.x, core.y, 170, 0, Math.PI * 2);
      ctx.fill();

      // slowly counter-rotating orbit rings
      const rings: [number, number, RGB][] = [
        [38, t * 0.4, COLORS[0]],
        [56, -t * 0.25, COLORS[1]],
        [76, t * 0.15, COLORS[2]],
      ];
      for (const [radius, rot, col] of rings) {
        ctx.save();
        ctx.translate(core.x, core.y);
        ctx.rotate(rot);
        ctx.setLineDash([2, 7]);
        ctx.strokeStyle = rgba(col, highlighted ? 0.55 : 0.3);
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI * 2);
        ctx.stroke();
        // a small "moon" riding each ring
        ctx.setLineDash([]);
        ctx.fillStyle = rgba(col, 0.9);
        ctx.beginPath();
        ctx.arc(radius, 0, 2.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // the core itself, breathing slightly
      const pulse = 1 + Math.sin(t * 2) * 0.06;
      const r = core.r * pulse + (highlighted ? 2 : 0);
      const fill = ctx.createLinearGradient(core.x - r, core.y - r, core.x + r, core.y + r);
      fill.addColorStop(0, "rgb(167,139,250)");
      fill.addColorStop(0.55, "rgb(34,211,238)");
      fill.addColorStop(1, "rgb(242,182,50)");
      ctx.shadowColor = "rgba(167,139,250,0.9)";
      ctx.shadowBlur = 30;
      ctx.fillStyle = fill;
      ctx.beginPath();
      ctx.arc(core.x, core.y, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.fillStyle = "#07080c";
      ctx.font = `700 16px ${displayFont}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("P", core.x, core.y + 1);

      ctx.fillStyle = "rgba(161,166,186,0.8)";
      ctx.font = `400 11px ${font}`;
      ctx.textBaseline = "top";
      ctx.fillText(`${TOTAL_SKILLS} skills · ${skillCategories.length} domains`, core.x, core.y + 88);
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const focus = activeCat();
      const coreFocused = hover === 0 || drag === 0;

      drawCore(nodes[0], coreFocused);

      for (const l of links) {
        const a = nodes[l.a];
        const b = nodes[l.b];
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.lineWidth = 1;
        if (l.kind === "ring") {
          ctx.strokeStyle = "rgba(255,255,255,0.07)";
          ctx.setLineDash([3, 5]);
        } else if (l.kind === "spoke") {
          const col = COLORS[b.cat % 4];
          const on = coreFocused || focus === b.cat;
          const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
          grad.addColorStop(0, rgba(col, 0));
          grad.addColorStop(1, rgba(col, on ? 0.7 : focus === -1 ? 0.28 : 0.08));
          ctx.strokeStyle = grad;
          ctx.setLineDash([]);
        } else {
          const on = focus === -1 || focus === a.cat;
          ctx.strokeStyle = rgba(COLORS[a.cat % 4], focus === a.cat ? 0.8 : on ? 0.3 : 0.08);
          ctx.setLineDash([]);
        }
        ctx.stroke();
      }
      ctx.setLineDash([]);

      // signals with a short fading tail
      for (const s of signals) {
        const col = COLORS[nodes[s.path[2]].cat % 4];
        const [x, y] = lerp(s, s.t);
        const [tx, ty] = lerp(s, Math.max(0, s.t - 0.18));
        const tail = ctx.createLinearGradient(tx, ty, x, y);
        tail.addColorStop(0, rgba(col, 0));
        tail.addColorStop(1, rgba(col, 0.9));
        ctx.strokeStyle = tail;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.fillStyle = "#fff";
        ctx.shadowColor = rgba(col, 1);
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(x, y, 2.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      nodes.forEach((n, i) => {
        if (n.kind === "core") return;
        const col = COLORS[n.cat % 4];
        const on = focus === -1 || focus === n.cat;
        const isHover = i === hover || i === drag;
        const lit = Math.max(isHover ? 1 : 0, n.flash);
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r + lit * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = rgba(col, on ? 1 : 0.25);
        ctx.shadowColor = rgba(col, 0.9);
        ctx.shadowBlur = n.kind === "hub" ? 16 : lit * 18;
        ctx.fill();
        ctx.shadowBlur = 0;

        if (n.kind === "hub") {
          ctx.font = `600 13px ${font}`;
          ctx.textAlign = "center";
          ctx.textBaseline = "top";
          ctx.fillStyle = on ? "rgba(238,237,245,0.95)" : "rgba(238,237,245,0.3)";
          ctx.fillText(n.label, n.x, n.y + 12);
        } else {
          // put the label on the side facing away from its hub
          const right = n.x >= nodes[hubOf[n.cat]].x;
          ctx.font = `${isHover ? 600 : 400} 12px ${font}`;
          ctx.textAlign = right ? "left" : "right";
          ctx.textBaseline = "middle";
          const base = focus === n.cat ? 0.9 : on ? 0.6 : 0.2;
          const a = Math.min(1, base + lit * 0.5);
          ctx.fillStyle = lit > 0.3 ? `rgba(255,255,255,${a})` : `rgba(200,204,220,${a})`;
          ctx.fillText(n.label, n.x + (right ? 9 : -9), n.y);
        }
      });
    };

    const loop = () => {
      frame++;
      physics();
      if (frame % 16 === 0) spawn();
      advanceSignals();
      draw();
      raf = visible ? requestAnimationFrame(loop) : 0;
    };
    const wake = () => {
      if (reduce) {
        // settle instantly and draw one still frame instead of animating
        for (let i = 0; i < 200; i++) physics();
        draw();
        return;
      }
      if (!raf && visible) raf = requestAnimationFrame(loop);
    };

    const pos = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      return [e.clientX - r.left, e.clientY - r.top];
    };
    const pick = (x: number, y: number) => {
      let best = -1;
      let bestD = Infinity;
      nodes.forEach((n, i) => {
        const d = Math.hypot(n.x - x, n.y - y);
        const reach = n.kind === "core" ? 30 : n.kind === "hub" ? 22 : 16;
        if (d < reach && d < bestD) {
          best = i;
          bestD = d;
        }
      });
      return best;
    };

    const onMove = (e: PointerEvent) => {
      const [x, y] = pos(e);
      if (drag >= 0) {
        nodes[drag].x = Math.max(16, Math.min(w - 16, x));
        nodes[drag].y = Math.max(16, Math.min(h - 16, y));
      } else {
        const next = pick(x, y);
        if (next === hover) return;
        hover = next;
        canvas.style.cursor = hover >= 0 ? "grab" : "default";
      }
      if (reduce) wake();
    };
    const onDown = (e: PointerEvent) => {
      const [x, y] = pos(e);
      drag = pick(x, y);
      if (drag >= 0) {
        canvas.setPointerCapture(e.pointerId);
        canvas.style.cursor = "grabbing";
      }
    };
    const onUp = () => {
      if (drag < 0) return;
      drag = -1;
      canvas.style.cursor = hover >= 0 ? "grab" : "default";
      if (reduce) wake();
    };
    const onLeave = () => {
      if (drag >= 0) return;
      hover = -1;
      canvas.style.cursor = "default";
      if (reduce) wake();
    };

    resize();
    const ro = new ResizeObserver(() => {
      resize();
      wake();
    });
    ro.observe(host);
    // only animate while the graph is on screen
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) wake();
    });
    io.observe(host);

    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);
    canvas.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} data-interactive aria-hidden="true" className="absolute inset-0 touch-none" />;
}
