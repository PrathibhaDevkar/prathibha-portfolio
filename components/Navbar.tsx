"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring, useMotionValueEvent } from "framer-motion";
import { contactLinks } from "../data/contact";
import { GitHubIcon, MenuIcon, CloseIcon, SearchIcon } from "./ui/icons";
import { OPEN_PALETTE_EVENT } from "./CommandPalette";

export const navLinks = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "publications", label: "Research" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [active, setActive] = useState("");
  const [hovered, setHovered] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 25, mass: 0.3 });
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 40));

  useEffect(() => {
    // A section is "active" when it crosses a thin band ~35% down the viewport.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-35% 0px -60% 0px" }
    );
    navLinks.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  const openPalette = () => window.dispatchEvent(new Event(OPEN_PALETTE_EVENT));
  const highlight = hovered ?? active;

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[60] bg-gradient-to-r from-violet via-cyan to-amber"
        style={{ scaleX: progress }}
      />

      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-4 inset-x-0 z-50 px-4"
      >
        <div
          className={`mx-auto flex max-w-5xl items-center justify-between gap-2 rounded-full border px-2 py-2 transition-all duration-500 ${
            scrolled
              ? "border-line-strong bg-ink/70 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.8)] backdrop-blur-xl"
              : "border-transparent bg-transparent"
          }`}
        >
          <a href="#" className="group flex items-center gap-2 pl-3 pr-2 font-display font-bold tracking-tight">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-violet via-cyan to-amber text-ink text-sm transition-transform duration-500 group-hover:rotate-[360deg]">
              P
            </span>
            <span className="hidden sm:inline text-fg">prathibha</span>
          </a>

          <ul className="hidden lg:flex items-center" onPointerLeave={() => setHovered(null)}>
            {navLinks.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onPointerEnter={() => setHovered(id)}
                  className={`relative block px-4 py-2 text-sm transition-colors ${
                    active === id ? "text-fg" : "text-muted hover:text-fg"
                  }`}
                >
                  {highlight === id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-white/[0.07] border border-line"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1">
            <button
              onClick={openPalette}
              className="flex items-center gap-2 rounded-full border border-line px-3 py-2 text-xs text-muted transition-colors hover:border-line-strong hover:text-fg"
              aria-label="Open command palette"
            >
              <SearchIcon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Search</span>
              <kbd className="hidden sm:inline font-mono text-[10px] text-dim">⌘K</kbd>
            </button>
            <a
              href={contactLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="hidden sm:grid h-9 w-9 place-items-center rounded-full text-muted transition-colors hover:bg-white/5 hover:text-fg"
            >
              <GitHubIcon className="w-[18px] h-[18px]" />
            </a>
            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="lg:hidden grid h-9 w-9 place-items-center rounded-full text-fg hover:bg-white/5"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <CloseIcon className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-ink/95 backdrop-blur-xl lg:hidden"
          >
            <motion.ul
              className="flex h-full flex-col justify-center gap-2 px-8"
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } } }}
            >
              {navLinks.map(({ id, label }, i) => (
                <motion.li
                  key={id}
                  variants={{ hidden: { opacity: 0, x: -24 }, show: { opacity: 1, x: 0 } }}
                >
                  <a
                    href={`#${id}`}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-baseline gap-4 py-2 font-display text-4xl font-semibold text-fg"
                  >
                    <span className="font-mono text-xs text-cyan">0{i + 1}</span>
                    <span className={active === id ? "text-gradient" : ""}>{label}</span>
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
