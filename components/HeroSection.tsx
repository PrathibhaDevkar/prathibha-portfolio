"use client";
import { motion } from "framer-motion";
import { contactLinks } from "../data/contact";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

export default function HeroSection() {
  return (
    <motion.header
      className="mb-24"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {/* RPD Avatar */}
      <motion.div variants={item} className="mb-8">
        <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 text-white text-xl font-extrabold tracking-tight select-none shadow-[0_0_40px_-8px_rgba(59,130,246,0.6)]">
          RPD
          <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-slate-950 shadow" title="Available" />
        </div>
      </motion.div>

      <motion.div variants={item}>
        <div className="inline-block px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono mb-6">
          Available for Full-time Roles
        </div>
      </motion.div>

      <motion.h1
        variants={item}
        className="text-6xl font-extrabold text-white mb-6 tracking-tight"
      >
        Rajendran Prathibha Devkar
      </motion.h1>

      <motion.p
        variants={item}
        className="text-xl text-slate-400 max-w-2xl leading-relaxed mb-10"
      >
        Software Engineer with{" "}
        <span className="text-white font-medium">4+ years of production experience</span>.
        MSCS graduate from{" "}
        <span className="text-blue-400 font-semibold">UT Arlington</span>.
      </motion.p>

      <motion.div variants={item} className="flex flex-wrap gap-4">
        <a
          href={contactLinks.resumeLink}
          target="_blank"
          className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-all shadow-lg shadow-blue-500/20"
        >
          Download Resume
        </a>
        <a
          href="#projects"
          className="px-6 py-3 border border-slate-700 hover:border-slate-500 text-slate-300 rounded-lg transition-all"
        >
          View Projects
        </a>
        <a
          href={contactLinks.github}
          target="_blank"
          className="px-6 py-3 border border-slate-700 hover:border-blue-500/50 hover:text-blue-400 text-slate-300 rounded-lg transition-all flex items-center gap-2"
        >
          <GitHubIcon />
          GitHub
        </a>
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
