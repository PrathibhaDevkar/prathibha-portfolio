"use client";
import { motion } from "framer-motion";
import { contactLinks } from "../data/contact";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

export default function HeroSection() {
  return (
    <motion.header className="mb-24" variants={container} initial="hidden" animate="show">
      <motion.div
        variants={item}
        className="rounded-xl border border-term-border bg-term-panel overflow-hidden shadow-2xl shadow-black/40"
      >
        <div className="flex items-center gap-2 px-4 py-3 border-b border-term-border bg-term-panel-2">
          <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
          <span className="ml-3 text-xs text-term-dim">prathibha@portfolio — zsh</span>
        </div>

        <div className="p-8 md:p-10">
          <p className="text-term-green text-sm mb-3">
            <span className="text-term-dim">$</span> whoami
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-term-text mb-5 tracking-tight">
            Rajendran Prathibha Devkar
          </h1>
          <p className="text-term-muted text-lg leading-relaxed mb-2 max-w-2xl">
            <span className="text-term-accent">&gt;</span> Software Engineer — 4+ years shipping production ML systems &amp; full-stack applications
          </p>
          <p className="text-term-muted text-lg leading-relaxed mb-8 max-w-2xl">
            <span className="text-term-accent">&gt;</span> MSCS, University of Texas at Arlington
          </p>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-term-green-dim border border-term-green/30 text-term-green text-xs mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-term-green animate-pulse" />
            available for full-time roles
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href={contactLinks.resumeLink}
              target="_blank"
              className="px-5 py-2.5 bg-term-accent hover:brightness-110 text-black font-bold rounded-md transition-all text-sm"
            >
              ./resume
            </a>
            <a
              href="#projects"
              className="px-5 py-2.5 border border-term-border hover:border-term-green/50 hover:text-term-green text-term-muted rounded-md transition-all text-sm"
            >
              cd ./projects
            </a>
            <a
              href={contactLinks.github}
              target="_blank"
              className="px-5 py-2.5 border border-term-border hover:border-term-text/50 hover:text-term-text text-term-muted rounded-md transition-all text-sm flex items-center gap-2"
            >
              <GitHubIcon />
              github
            </a>
          </div>
        </div>
      </motion.div>
    </motion.header>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}
