"use client";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { project as projects, Project } from "../data/projects";
import SectionHeading from "./SectionHeading";
import ProjectCard from "./ProjectCard";
import { CloseIcon, ExternalLinkIcon, GitHubIcon } from "./ui/icons";

export default function Projects() {
  const [filter, setFilter] = useState("All");
  const [openProject, setOpenProject] = useState<Project | null>(null);

  const categories = useMemo(() => {
    const all = projects.flatMap((p) => p.categories ?? []);
    return ["All", ...new Set(all)];
  }, []);

  const visible = filter === "All" ? projects : projects.filter((p) => p.categories?.includes(filter));
  const count = (c: string) => (c === "All" ? projects.length : projects.filter((p) => p.categories?.includes(c)).length);

  useEffect(() => {
    if (!openProject) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenProject(null);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [openProject]);

  return (
    <section id="projects" className="scroll-mt-24 py-24 md:py-32">
      <SectionHeading index="02" eyebrow="Selected work" title="Projects with" accent="honest numbers." />

      <LayoutGroup>
        <div className="relative z-20 mb-10 flex flex-wrap gap-2" role="group" aria-label="Filter projects by theme">
          {categories.map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              aria-pressed={filter === t}
              className={`relative rounded-full px-4 py-1.5 text-xs transition-colors ${
                filter === t ? "text-ink" : "text-muted hover:text-fg border border-line"
              }`}
            >
              {filter === t && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-fg"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              {t}
              <span className={`ml-1.5 font-mono text-[10px] ${filter === t ? "text-ink/60" : "text-dim"}`}>{count(t)}</span>
            </button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <AnimatePresence mode="popLayout">
            {visible.map((p) => (
              <ProjectCard
                key={p.title}
                project={p}
                index={projects.indexOf(p)}
                onOpen={() => setOpenProject(p)}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>

      <AnimatePresence>
        {openProject && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-end md:items-center justify-center p-0 md:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={() => setOpenProject(null)} />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-modal-title"
              initial={{ y: 60, opacity: 0, scale: 0.97 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 40, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl md:rounded-3xl border border-line-strong bg-surface p-7 md:p-10 shadow-2xl"
            >
              <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-violet via-cyan to-amber" />
              <button
                onClick={() => setOpenProject(null)}
                aria-label="Close"
                autoFocus
                className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full border border-line text-muted hover:text-fg hover:border-line-strong"
              >
                <CloseIcon className="w-4 h-4" />
              </button>

              {openProject.stats && (
                <span className="inline-block rounded-full border border-amber/30 bg-amber/10 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-amber mb-5">
                  {openProject.stats}
                </span>
              )}
              <h3 id="project-modal-title" className="font-display text-3xl md:text-4xl font-semibold tracking-tight text-fg pr-10 mb-6">
                {openProject.title}
              </h3>
              <p className="text-muted leading-relaxed mb-8">{openProject.description}</p>

              <div className="flex flex-wrap gap-2 mb-8">
                {openProject.tags.map((t) => (
                  <span key={t} className="rounded-full border border-line bg-white/[0.03] px-3 py-1 text-xs text-muted">
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                {openProject.githubLink && (
                  <a
                    href={openProject.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-fg px-5 py-2.5 text-sm font-semibold text-ink"
                  >
                    <GitHubIcon className="w-4 h-4" />
                    View source
                  </a>
                )}
                {openProject.liveLink && (
                  <a
                    href={openProject.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-2.5 text-sm font-medium text-fg hover:bg-white/5"
                  >
                    <ExternalLinkIcon className="w-4 h-4" />
                    Live demo
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
