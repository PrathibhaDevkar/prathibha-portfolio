"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { skillCategories } from "../data/skills";
import SectionHeading from "./SectionHeading";

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="skills" className="my-20 scroll-mt-20" ref={ref}>
      <SectionHeading command="cat skills.json" title="Technical Skills" />

      <div className="rounded-xl border border-term-border bg-term-panel p-6 md:p-8">
        <p className="text-term-dim text-sm mb-5">{"{"}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pl-4">
          {skillCategories.map((cat, catIndex) => (
            <div key={cat.title}>
              <h3 className="text-term-accent font-bold mb-3 text-xs">
                &quot;{cat.title}&quot;:
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{
                      duration: 0.35,
                      delay: catIndex * 0.06 + skillIndex * 0.04,
                      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
                    }}
                    className="px-2.5 py-1 text-[11px] font-medium rounded-md bg-term-panel-2 text-term-muted border border-term-border hover:border-term-green/50 hover:text-term-green transition-all cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <p className="text-term-dim text-sm mt-5">{"}"}</p>
      </div>
    </section>
  );
}
