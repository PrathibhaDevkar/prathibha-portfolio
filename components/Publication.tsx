import { publications } from "../data/publication";
import SectionHeading from "./SectionHeading";

export default function Research() {
  return (
    <section id="publications" className="my-20 scroll-mt-20">
      <SectionHeading command="cat publications.bib" title="Publications & Research" />
      <div className="space-y-6">
        {publications.map((pub, i) => (
          <div
            key={i}
            className="p-6 md:p-8 rounded-xl border border-term-border bg-term-panel hover:border-term-accent/30 transition-all"
          >
            <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
              <h3 className="text-lg font-bold text-term-text max-w-xl">{pub.title}</h3>
              <span className="text-xs font-mono text-term-accent border border-term-accent/30 px-2 py-1 rounded">
                {pub.year}
              </span>
            </div>
            <p className="text-sm italic text-term-dim mb-4">{pub.publisher}</p>
            <ul className="space-y-2 mb-6">
              {pub.description.map((item, j) => (
                <li key={j} className="text-term-muted text-sm flex gap-3">
                  <span className="text-term-green mt-1 shrink-0">▸</span>
                  {item}
                </li>
              ))}
            </ul>
            {pub.link && (
              <a
                href={pub.link}
                target="_blank"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-term-accent hover:brightness-110 border border-term-accent/30 px-3 py-1.5 rounded-md transition-all"
              >
                read paper
                <ExternalLinkIcon />
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function ExternalLinkIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-3 h-3 stroke-current fill-none" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
    </svg>
  );
}
