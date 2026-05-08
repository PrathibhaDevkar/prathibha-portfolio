"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { skillCategories } from "../data/skills";

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="skills" className="my-20 scroll-mt-20" ref={ref}>
      <h2 className="text-3xl font-bold text-white mb-12 flex items-center gap-4">
        Technical Skills
        <div className="h-px bg-slate-800 grow" />
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
        {skillCategories.map((cat, catIndex) => (
          <div key={cat.title}>
            <h3 className="text-blue-400 font-bold mb-5 uppercase text-xs tracking-widest">
              {cat.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              {cat.skills.map((skill, skillIndex) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{
                    duration: 0.4,
                    delay: catIndex * 0.08 + skillIndex * 0.05,
                    ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
                  }}
                  className="px-3 py-1.5 text-xs font-semibold rounded-full bg-slate-800 text-slate-300 border border-slate-700 hover:border-blue-500/50 hover:text-blue-300 hover:bg-blue-500/10 transition-all cursor-default"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
