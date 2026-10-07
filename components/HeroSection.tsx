"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { contactLinks } from "../data/contact";
import Magnetic from "./ui/Magnetic";
import { ArrowRightIcon, DownloadIcon, GitHubIcon } from "./ui/icons";

const roles = ["a Software Engineer", "an AI / ML Engineer", "a Full-Stack Developer", "a Research Assistant"];

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease } },
};

export default function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setRoleIndex((i) => (i + 1) % roles.length), 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="relative min-h-[100svh] flex items-center overflow-hidden">
      {/* aurora blobs */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-1/4 -left-1/4 w-[70vw] h-[70vw] rounded-full bg-violet/20 blur-[120px] animate-aurora" />
        <div className="absolute top-1/3 -right-1/4 w-[55vw] h-[55vw] rounded-full bg-cyan/10 blur-[120px] animate-aurora [animation-delay:-6s]" />
        <div className="absolute -bottom-1/3 left-1/4 w-[45vw] h-[45vw] rounded-full bg-amber/10 blur-[140px] animate-aurora [animation-delay:-12s]" />
      </div>

      <motion.div
        className="relative max-w-7xl w-full mx-auto px-5 sm:px-8 pt-28 pb-20"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={item} className="mb-8">
          <span className="inline-flex items-center gap-2.5 rounded-full border border-mint/25 bg-mint/[0.07] px-3.5 py-1.5 text-xs text-mint backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-mint" />
            </span>
            Available for full-time roles · {contactLinks.location}
          </span>
        </motion.div>

        <motion.p variants={item} className="font-mono text-sm text-muted mb-4">
          Hi, I&apos;m
        </motion.p>

        <motion.h1
          variants={item}
          className="font-display font-bold tracking-[-0.035em] leading-[0.92] text-[clamp(3rem,10vw,8.5rem)] text-fg"
        >
          Prathibha
          <br />
          <span className="text-gradient">Devkar</span>
          <span className="text-amber">.</span>
        </motion.h1>

        <motion.div variants={item} className="mt-8 flex flex-wrap items-start gap-x-3 text-2xl md:text-4xl leading-[1.3] font-display text-muted">
          <span>I&apos;m</span>
          <span className="relative inline-flex h-[1.3em] overflow-hidden min-w-[12ch]">
            <AnimatePresence mode="wait">
              <motion.span
                key={roles[roleIndex]}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                transition={{ duration: 0.45, ease }}
                className="font-serif italic text-fg whitespace-nowrap"
              >
                {roles[roleIndex]}
              </motion.span>
            </AnimatePresence>
          </span>
        </motion.div>

        <motion.p variants={item} className="mt-6 max-w-2xl text-base md:text-lg leading-relaxed text-muted">
          4+ years shipping production ML systems &amp; full-stack applications. MSCS from UT Arlington. I like
          software that tells the truth about itself, from calibrated confidence scores to honest eval harnesses.
        </motion.p>

        <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-3">
          <Magnetic>
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-fg px-6 py-3 text-sm font-semibold text-ink transition-shadow hover:shadow-[0_0_40px_-6px_rgba(167,139,250,0.8)]"
            >
              See my work
              <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href={contactLinks.resumeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-white/[0.03] px-6 py-3 text-sm font-medium text-fg backdrop-blur transition-colors hover:border-violet/60 hover:bg-violet/10"
            >
              <DownloadIcon className="w-4 h-4" />
              Resume
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href={contactLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-white/[0.03] px-6 py-3 text-sm font-medium text-fg backdrop-blur transition-colors hover:border-cyan/60 hover:bg-cyan/10"
            >
              <GitHubIcon className="w-4 h-4" />
              GitHub
            </a>
          </Magnetic>
        </motion.div>

        <motion.p variants={item} className="mt-14 hidden md:flex [@media(max-height:820px)]:hidden items-center gap-2 font-mono text-xs text-dim">
          <span>tip: move your cursor over the network, click to send a pulse, or press</span>
          <kbd className="rounded border border-line-strong bg-white/5 px-1.5 py-0.5 text-muted">⌘K</kbd>
        </motion.p>
      </motion.div>

      <motion.a
        href="#about"
        aria-label="Scroll to about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden [@media(min-height:700px)]:flex flex-col items-center gap-2 text-dim hover:text-fg transition-colors"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em]">scroll</span>
        <span className="relative h-10 w-6 rounded-full border border-line-strong">
          <motion.span
            className="absolute left-1/2 top-2 h-2 w-1 -translate-x-1/2 rounded-full bg-fg"
            animate={{ y: [0, 14, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.a>
    </header>
  );
}
