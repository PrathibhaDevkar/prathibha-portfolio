import {Project } from "../data/projects"; 

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group relative rounded-2xl border border-slate-800 bg-slate-900/40 p-8 transition-all duration-300 hover:border-blue-500/50 hover:bg-slate-900/60 hover:shadow-[0_0_30px_-10px_rgba(59,130,246,0.2)]">
      {/* Decorative Gradient Glow on Hover */}
      <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-6">
          <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
            {project.title}
          </h3>
          {project.stats && (
            <span className="text-[10px] font-mono font-bold tracking-wider bg-blue-500/10 text-blue-400 px-2.5 py-1 rounded-full border border-blue-500/20 uppercase">
              {project.stats}
            </span>
          )}
        </div>

        <p className="text-slate-400 text-sm leading-relaxed mb-8">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mt-auto">
          {project.tags.map((tag: string) => (
            <span 
              key={tag} 
              className="text-[9px] uppercase tracking-widest font-bold bg-slate-800/80 text-slate-400 px-2.5 py-1 rounded-md border border-slate-700/50 group-hover:border-slate-600 group-hover:text-slate-200 transition-all"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}