"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Project } from "../data/projects";
import { useSpotlight } from "./ui/useSpotlight";
import { ArrowRightIcon, ExternalLinkIcon, GitHubIcon } from "./ui/icons";

export default function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: () => void;
}) {
  const spotlight = useSpotlight<HTMLElement>();
  // -0.5..0.5 across the card, springed so the tilt eases in and out
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [7, -7]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-7, 7]), { stiffness: 200, damping: 20 });

  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    spotlight(e);
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 1000 }}
    >
      <motion.article
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        onClick={onOpen}
        style={{ rotateX, rotateY }}
        className="spotlight group relative flex h-full cursor-pointer flex-col rounded-3xl border border-line bg-surface/80 p-7 backdrop-blur-sm transition-colors hover:border-line-strong"
      >
        <div className="flex items-start justify-between gap-4 mb-6">
          <span className="font-mono text-xs text-dim">{String(index + 1).padStart(2, "0")}</span>
          {project.stats && (
            <span className="rounded-full border border-amber/30 bg-amber/10 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-amber">
              {project.stats}
            </span>
          )}
        </div>

        <h3
          className="font-display text-2xl md:text-[1.7rem] font-semibold tracking-tight text-fg leading-tight mb-3"
        >
          {project.title}
        </h3>

        <p className="text-sm leading-relaxed text-muted line-clamp-3 mb-6 flex-grow">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.tags.map((tag) => (
            <span key={tag} className="rounded-full border border-line bg-white/[0.03] px-2.5 py-1 text-[11px] text-muted">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4 border-t border-line pt-5 text-xs">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpen();
            }}
            className="inline-flex items-center gap-1.5 font-medium text-fg"
          >
            Read the story
            <ArrowRightIcon className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </button>
          <span className="ml-auto flex items-center gap-3">
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                aria-label={`${project.title} source on GitHub`}
                className="text-muted transition-colors hover:text-fg"
              >
                <GitHubIcon className="w-4 h-4" />
              </a>
            )}
            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                aria-label={`${project.title} live demo`}
                className="text-muted transition-colors hover:text-fg"
              >
                <ExternalLinkIcon className="w-4 h-4" />
              </a>
            )}
          </span>
        </div>
      </motion.article>
    </motion.div>
  );
}
