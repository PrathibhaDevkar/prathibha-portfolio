"use client";
import { motion } from "framer-motion";
import { publications } from "../data/publication";
import SectionHeading from "./SectionHeading";
import { useSpotlight } from "./ui/useSpotlight";
import { ArrowRightIcon } from "./ui/icons";

export default function Research() {
  const onMove = useSpotlight<HTMLElement>();

  return (
    <section id="publications" className="scroll-mt-24 py-24 md:py-32">
      <SectionHeading index="04" eyebrow="Research" title="Published" accent="work." />

      <div className="space-y-5">
        {publications.map((pub) => (
          <motion.article
            key={pub.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7 }}
            onPointerMove={onMove}
            className="spotlight relative overflow-hidden rounded-3xl border border-line bg-surface/80 p-7 md:p-12 transition-colors hover:border-line-strong"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -right-4 -top-10 font-display text-[10rem] md:text-[14rem] font-bold leading-none text-white/[0.03] select-none"
            >
              {pub.year}
            </span>

            <div className="relative grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-amber mb-4">
                  Springer · {pub.year}
                </p>
                <h3 className="font-display text-2xl md:text-4xl font-semibold tracking-tight text-fg leading-tight max-w-3xl mb-3">
                  {pub.title}
                </h3>
                <p className="font-serif italic text-lg text-dim mb-8">{pub.publisher}</p>
                <ul className="grid gap-3 md:grid-cols-3">
                  {pub.description.map((d, j) => (
                    <li key={j} className="rounded-2xl border border-line bg-white/[0.02] p-4 text-sm leading-relaxed text-muted">
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
              {pub.link && (
                <a
                  href={pub.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 self-start md:self-end rounded-full bg-fg px-5 py-2.5 text-sm font-semibold text-ink"
                >
                  Read paper
                  <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
              )}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
