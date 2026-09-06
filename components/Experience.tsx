// components/Experience.tsx
import { experiences } from "../data/experience";
import SectionHeading from "./SectionHeading";

export default function Experience() {
  return (
    <section id="experience" className="my-24 scroll-mt-20">
      <SectionHeading command="git log --experience" title="Professional Experience" />

      <div className="space-y-6">
        {experiences.map((exp, i) => (
          <div
            key={i}
            className="relative rounded-xl border border-term-border bg-term-panel p-6 md:p-8 hover:border-term-accent/30 transition-colors group"
          >
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4 gap-2">
              <div>
                <h3 className="text-lg font-bold text-term-text group-hover:text-term-accent transition-colors">
                  {exp.company}
                </h3>
                <p className="text-term-green text-sm font-medium">{exp.role}</p>
              </div>
              <div className="text-left md:text-right shrink-0">
                <p className="text-xs font-mono text-term-dim">{exp.period}</p>
                <p className="text-xs text-term-dim">{exp.location}</p>
              </div>
            </div>

            <ul className="space-y-2.5">
              {exp.description.map((bullet, j) => (
                <li key={j} className="text-term-muted text-sm leading-relaxed flex gap-3">
                  <span className="text-term-accent mt-0.5 shrink-0">▸</span>
                  {bullet}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
