"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skillCategories } from "../data/skills";
import SectionHeading from "./SectionHeading";
import SkillGraph from "./SkillGraph";

const allSkills = skillCategories.flatMap((c) => c.skills);
const half = Math.ceil(allSkills.length / 2);
const rowA = allSkills.slice(0, half);
const rowB = allSkills.slice(half);

function MarqueeRow({ items, reverse }: { items: string[]; reverse?: boolean }) {
  return (
    <div className="mask-fade-x flex overflow-hidden py-2 [&:hover>div]:[animation-play-state:paused]">
      <div className={`flex shrink-0 gap-3 pr-3 ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}>
        {[...items, ...items].map((s, i) => (
          <span
            key={`${s}-${i}`}
            aria-hidden={i >= items.length}
            className="whitespace-nowrap rounded-full border border-line bg-surface px-5 py-2.5 font-display text-lg text-muted transition-colors hover:border-violet/50 hover:text-fg"
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  const [active, setActive] = useState(0);
  const current = skillCategories[active];

  return (
    <section id="skills" className="scroll-mt-24 py-24 md:py-32">
      <SectionHeading index="03" eyebrow="Toolbox" title="The stack I" accent="reach for." />

      <div className="-mx-5 sm:-mx-8 mb-14 space-y-2">
        <MarqueeRow items={rowA} />
        <MarqueeRow items={rowB} reverse />
      </div>

      {/* Large screens: draggable graph. Smaller screens: tabs (dragging tiny nodes by finger is fiddly). */}
      <div className="relative hidden lg:block h-[620px] overflow-hidden rounded-3xl border border-line bg-surface/60 backdrop-blur-sm">
        <SkillGraph />
        <p className="pointer-events-none absolute left-6 top-5 font-mono text-[11px] text-dim">
          hover a cluster · drag any node
        </p>
        <ul className="sr-only">
          {skillCategories.map((cat) => (
            <li key={cat.title}>
              {cat.title}: {cat.skills.join(", ")}
            </li>
          ))}
        </ul>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[minmax(0,280px)_1fr] gap-4 lg:hidden">
        <div role="tablist" aria-label="Skill categories" className="flex md:flex-col gap-1 overflow-x-auto pb-2 md:pb-0 -mx-1 px-1">
          {skillCategories.map((cat, i) => (
            <button
              key={cat.title}
              role="tab"
              aria-selected={active === i}
              onClick={() => setActive(i)}
              onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}
              className={`relative shrink-0 flex items-center justify-between gap-4 rounded-2xl px-4 py-3 text-left text-sm transition-colors ${
                active === i ? "text-fg" : "text-muted hover:text-fg"
              }`}
            >
              {active === i && (
                <motion.span
                  layoutId="skill-tab"
                  className="absolute inset-0 -z-10 rounded-2xl border border-line-strong bg-surface-2"
                  transition={{ type: "spring", stiffness: 400, damping: 34 }}
                />
              )}
              <span className="whitespace-nowrap">{cat.title}</span>
              <span className="hidden md:inline font-mono text-xs text-dim">{String(cat.skills.length).padStart(2, "0")}</span>
            </button>
          ))}
        </div>

        <div role="tabpanel" className="relative min-h-[260px] overflow-hidden rounded-3xl border border-line bg-surface/80 p-7 md:p-10">
          <div aria-hidden="true" className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-violet/15 blur-3xl" />
          <AnimatePresence mode="wait">
            <motion.div
              key={current.title}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="relative"
            >
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-dim mb-6">{current.title}</p>
              <div className="flex flex-wrap gap-3">
                {current.skills.map((s, i) => (
                  <motion.span
                    key={s}
                    initial={{ opacity: 0, y: 14, scale: 0.92 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: i * 0.04, type: "spring", stiffness: 300, damping: 22 }}
                    whileHover={{ y: -3 }}
                    className="cursor-default rounded-2xl border border-line-strong bg-white/[0.03] px-5 py-3 font-display text-xl md:text-2xl text-fg hover:border-cyan/50 hover:text-cyan transition-colors"
                  >
                    {s}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
