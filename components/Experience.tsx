"use client";
import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { experiences } from "../data/experience";
import SectionHeading from "./SectionHeading";
import { useSpotlight } from "./ui/useSpotlight";
import { certifications } from "../data/certifications";
import { CheckIcon } from "./ui/icons";

export default function Experience() {
  const listRef = useRef<HTMLOListElement>(null);
  const onMove = useSpotlight<HTMLDivElement>();
  // 0 when the list's top hits mid-screen, 1 when its bottom does — drives the line "drawing" itself.
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 60%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section id="experience" className="scroll-mt-24 py-24 md:py-32">
      <SectionHeading index="05" eyebrow="Experience" title="Where I've" accent="shipped." />

      <ol ref={listRef} className="relative space-y-10 pl-8 md:pl-12">
        <span aria-hidden="true" className="absolute left-[7px] md:left-[11px] top-2 bottom-2 w-px bg-line" />
        <motion.span
          aria-hidden="true"
          style={{ scaleY }}
          className="absolute left-[7px] md:left-[11px] top-2 bottom-2 w-px origin-top bg-gradient-to-b from-violet via-cyan to-amber"
        />

        {experiences.map((exp, i) => (
          <motion.li
            key={exp.company}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <motion.span
              aria-hidden="true"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, margin: "-40% 0px -40% 0px" }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="absolute -left-8 md:-left-12 top-7 grid h-4 w-4 md:h-6 md:w-6 place-items-center rounded-full border border-cyan/60 bg-ink"
            >
              <span className="h-1.5 w-1.5 md:h-2 md:w-2 rounded-full bg-cyan shadow-[0_0_12px_2px_rgba(34,211,238,0.7)]" />
            </motion.span>

            <div
              onPointerMove={onMove}
              className="spotlight group rounded-3xl border border-line bg-surface/80 p-7 md:p-9 backdrop-blur-sm transition-colors hover:border-line-strong"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-6">
                <div>
                  <p className="font-mono text-xs text-cyan mb-2">{exp.period}</p>
                  <h3 className="font-display text-2xl md:text-3xl font-semibold tracking-tight text-fg">{exp.role}</h3>
                  <p className="text-muted">
                    {exp.company} <span className="text-dim">· {exp.location}</span>
                  </p>
                </div>
                {i === 0 && (
                  <span className="self-start rounded-full border border-mint/30 bg-mint/10 px-3 py-1 text-[11px] text-mint">
                    Current
                  </span>
                )}
              </div>
              <ul className="space-y-3">
                {exp.description.map((b, j) => (
                  <li key={j} className="flex gap-3 text-sm leading-relaxed text-muted">
                    <span className="mt-2 h-1 w-3 shrink-0 rounded-full bg-gradient-to-r from-violet to-cyan" />
                    {b}
                  </li>
                ))}
              </ul>
              {"recognition" in exp && exp.recognition && (
                <p className="mt-6 flex items-start gap-3 rounded-2xl border border-amber/20 bg-amber/[0.06] px-4 py-3 text-sm leading-relaxed text-fg">
                  <span aria-hidden="true">🏆</span>
                  {exp.recognition}
                </p>
              )}
            </div>
          </motion.li>
        ))}
      </ol>

      <div className="mt-16 space-y-4 pl-8 md:pl-12">
        {certifications.map((c) => (
          <div
            key={c.title}
            onPointerMove={onMove}
            className="spotlight flex flex-col gap-4 rounded-3xl border border-line bg-surface/80 p-6 backdrop-blur-sm transition-colors hover:border-line-strong md:flex-row md:items-center"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-violet md:w-28 md:shrink-0">
              Certification
            </span>
            <div className="flex-1">
              <h3 className="font-display text-lg font-semibold text-fg">{c.title}</h3>
              <p className="text-sm text-muted">
                {c.issuer} · {c.date}
                {c.courses && <span className="text-dim"> · {c.courses.length} courses</span>}
              </p>
            </div>
            {c.link && (
              <a
                href={c.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 self-start rounded-full border border-line px-3 py-1.5 text-xs text-muted transition-colors hover:border-cyan/50 hover:text-cyan md:self-auto"
              >
                <CheckIcon className="w-3.5 h-3.5" />
                Verify
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
