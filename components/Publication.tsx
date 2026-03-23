// components/Research.tsx
import { publications } from "../data/publication";

export default function Research() {
  return (
    <section className="my-20">
      <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-4">
        Publications & Research
        <div className="h-px bg-slate-800 grow"></div>
      </h2>
      <div className="space-y-8">
        {publications.map((pub, i) => (
          <div key={i} className="p-6 rounded-xl border border-blue-500/20 bg-blue-500/5 hover:bg-blue-500/10 transition-all">
            <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
              <h3 className="text-lg font-bold text-white max-w-xl">{pub.title}</h3>
              <span className="text-xs font-mono text-blue-400 border border-blue-400/30 px-2 py-1 rounded">
                {pub.year}
              </span>
            </div>
            <p className="text-sm italic text-slate-400 mb-4">{pub.publisher}</p>
            <ul className="list-disc list-inside text-sm text-slate-300 space-y-2">
              {pub.description.map((item, j) => (
                <li key={j}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}