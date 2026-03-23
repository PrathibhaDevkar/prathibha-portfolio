// components/About.tsx
import { aboutMe } from "../data/aboutMe";

export default function About() {
  return (
    <section id="about" className="my-24 scroll-mt-20">
      <h2 className="text-3xl font-bold text-white mb-10 flex items-center gap-4">
        About Me
        <div className="h-px bg-slate-800 grow"></div>
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
        {/* Experience Badge */}
        <div className="md:col-span-1 rounded-2xl border border-blue-500/20 bg-blue-500/5 p-8 text-center shadow-[0_0_20px_-5px_rgba(59,130,246,0.1)]">
          <div className="text-5xl font-extrabold text-blue-400 mb-2">4+</div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 mb-6">
            Years in Production
          </p>
          <div className="h-px bg-slate-800/50 mb-6"></div>
          <p className="text-xs text-slate-500 font-mono italic leading-relaxed">
  &quot;Proven instincts for performance and scale&quot;
</p>
        </div>

        {/* Professional Summary */}
        <div className="md:col-span-2 space-y-6">
          {aboutMe.description.map((paragraph, index) => (
            <p key={index} className="text-slate-400 leading-relaxed text-lg font-light">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}