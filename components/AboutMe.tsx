"use client";
import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView } from "framer-motion";
import { aboutMe } from "../data/aboutMe";
import { contactLinks } from "../data/contact";
import SectionHeading from "./SectionHeading";
import { useSpotlight } from "./ui/useSpotlight";
import { PinIcon } from "./ui/icons";

const stats = [
  { value: 4, suffix: "+", label: "years shipping production software" },
  { value: 45, suffix: "+", label: "production bugs resolved at Board" },
  { value: 96, suffix: "%", label: "gesture-recognition accuracy (Springer, 2021)" },
];

function CountUp({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const node = ref.current;
    const controls = animate(0, to, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => (node.textContent = `${Math.round(v)}${suffix}`),
    });
    return () => controls.stop();
  }, [inView, to, suffix]);

  return (
    <span ref={ref}>
      {to}
      {suffix}
    </span>
  );
}

function DallasClock() {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "America/Chicago",
    });
    const tick = () => setTime(fmt.format(new Date()));
    const first = setTimeout(tick, 0);
    const id = setInterval(tick, 1000);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, []);
  return <span className="tabular-nums">{time ?? "--:--:--"}</span>;
}

const card =
  "spotlight rounded-3xl border border-line bg-surface/80 backdrop-blur-sm transition-colors hover:border-line-strong";

export default function About() {
  const onMove = useSpotlight<HTMLDivElement>();
  const fade = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
  };

  return (
    <section id="about" className="scroll-mt-24 py-24 md:py-32">
      <SectionHeading index="01" eyebrow="About" title="Building things that" accent="just work." />

      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <motion.div
          {...fade}
          transition={{ duration: 0.7 }}
          onPointerMove={onMove}
          className={`${card} md:col-span-4 md:row-span-2 p-7 md:p-10`}
        >
          <p className="font-serif italic text-2xl md:text-3xl text-fg leading-snug mb-6">
            &ldquo;I find the most satisfaction in building something that just works, reliably and without
            drama.&rdquo;
          </p>
          <div className="space-y-4 text-muted leading-relaxed">
            {aboutMe.description.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </motion.div>

        <motion.div
          {...fade}
          transition={{ duration: 0.7, delay: 0.08 }}
          onPointerMove={onMove}
          className={`${card} md:col-span-2 p-7 overflow-hidden`}
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-dim mb-4">Currently</p>
          <div className="flex items-start gap-3">
            <span className="relative mt-1.5 flex h-2.5 w-2.5 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-mint" />
            </span>
            <div>
              <p className="font-display text-lg font-semibold text-fg">Research Assistant</p>
              <p className="text-sm text-muted">SEAR Lab, UT Arlington</p>
              <p className="mt-3 text-sm text-dim leading-relaxed">
                Real-time energy monitoring: live HVAC, water-heater and solar telemetry in one dashboard.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          {...fade}
          transition={{ duration: 0.7, delay: 0.14 }}
          onPointerMove={onMove}
          className={`${card} md:col-span-2 p-7 relative overflow-hidden`}
        >
          <div aria-hidden="true" className="absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-cyan/10 blur-2xl" />
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-dim mb-4">Based in</p>
          <p className="flex items-center gap-2 font-display text-lg font-semibold text-fg">
            <PinIcon className="w-4 h-4 text-cyan" />
            {contactLinks.location}
          </p>
          <p className="mt-2 font-mono text-2xl text-gradient">
            <DallasClock />
          </p>
          <p className="text-xs text-dim mt-1">local time · CT</p>
        </motion.div>

        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            {...fade}
            transition={{ duration: 0.7, delay: 0.2 + i * 0.06 }}
            onPointerMove={onMove}
            className={`${card} md:col-span-2 p-7`}
          >
            <p className="font-display text-5xl md:text-6xl font-bold tracking-tight text-fg">
              <CountUp to={s.value} suffix={s.suffix} />
            </p>
            <p className="mt-2 text-sm text-muted">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
