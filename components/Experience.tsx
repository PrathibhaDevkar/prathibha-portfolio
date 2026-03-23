// components/Experience.tsx
import { experiences } from "../data/experience";

export default function Experience() {
  return (
    <section id="experience" className="my-24">
      <h2 className="text-3xl font-bold text-white mb-12 flex items-center gap-4">
        Professional Experience
        <div className="h-px bg-slate-800 grow"></div>
      </h2>
      
      <div className="space-y-16">
        {experiences.map((exp, i) => (
          <div key={i} className="relative group">
            {/* Vertical Line Decoration */}
            <div className="absolute -left-4 top-0 bottom-0 w-1 bg-linear-to-br from-blue-500 to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                  {exp.company}
                </h3>
                <p className="text-blue-400 font-medium">{exp.role}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-mono text-slate-500">{exp.period}</p>
                <p className="text-xs text-slate-600">{exp.location}</p>
              </div>
            </div>

            <ul className="space-y-3">
              {exp.description.map((bullet, j) => (
                <li key={j} className="text-slate-400 text-sm leading-relaxed flex gap-3">
                  <span className="text-blue-500 mt-1.5 shrink-0">▹</span>
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