"use client";
import { useEffect, useState } from "react";
import { contactLinks } from "../data/contact";

const navLinks = [
  { href: "#about", label: "about" },
  { href: "#projects", label: "projects" },
  { href: "#skills", label: "skills" },
  { href: "#experience", label: "experience" },
  { href: "#contact", label: "contact" },
];

const sectionIds = ["about", "projects", "skills", "publications", "experience", "contact"];

export default function Navbar() {
  const [active, setActive] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { threshold: 0.3 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-term-border bg-term-bg/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-8 h-16 flex items-center justify-between text-sm">
        <a href="#" className="font-bold tracking-tight text-term-text hover:text-term-accent transition-colors flex items-center gap-1.5">
          <span className="text-term-green">~/</span>
          <span>portfolio</span>
          <span className="text-term-accent cursor-blink">_</span>
        </a>
        <div className="flex items-center gap-1 text-term-muted">
          {navLinks.map(({ href, label }) => {
            const id = href.replace("#", "");
            const isActive = active === id;
            return (
              <a
                key={href}
                href={href}
                className={`px-3 py-1.5 rounded-md transition-colors hover:text-term-text hover:bg-term-panel ${
                  isActive ? "text-term-accent bg-term-panel" : ""
                }`}
              >
                <span className="text-term-dim">./</span>
                {label}
              </a>
            );
          })}
          <a
            href={contactLinks.github}
            target="_blank"
            aria-label="GitHub"
            className="ml-2 p-2 rounded-md text-term-muted hover:text-term-text hover:bg-term-panel transition-colors"
          >
            <GitHubIcon />
          </a>
        </div>
      </div>
    </nav>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}
