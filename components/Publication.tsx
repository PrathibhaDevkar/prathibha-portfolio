import { publications } from "../data/publication";

export default function Research() {
  return (
    <section id="publications" className="my-20 scroll-mt-20">
      <h2 className="text-3xl font-bold text-white mb-12 flex items-center gap-4">
        Publications & Research
        <div className="h-px bg-slate-800 grow" />
      </h2>
      <div className="space-y-8">
        {publications.map((pub, i) => (
          <div
            key={i}
            className="p-6 rounded-xl border border-blue-500/20 bg-blue-500/5 hover:bg-blue-500/10 transition-all"
          >
            <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
              <h3 className="text-lg font-bold text-white max-w-xl">{pub.title}</h3>
              <span className="text-xs font-mono text-blue-400 border border-blue-400/30 px-2 py-1 rounded">
                {pub.year}
              </span>
            </div>
            <p className="text-sm italic text-slate-400 mb-4">{pub.publisher}</p>
            <ul className="list-disc list-inside text-sm text-slate-300 space-y-2 mb-6">
              {pub.description.map((item, j) => (
                <li key={j}>{item}</li>
              ))}
            </ul>
            {pub.link && (
              <a
                href={pub.link}
                target="_blank"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 border border-blue-500/30 hover:border-blue-400/50 px-3 py-1.5 rounded-lg transition-all"
              >
                Read Paper
                <svg viewBox="0 0 24 24" className="w-3 h-3 stroke-current fill-none" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
