import { contactLinks } from "../data/contact";
import { ArrowUpIcon } from "./ui/icons";

export default function Footer() {
  const links = [
    { href: `mailto:${contactLinks.email}`, label: "Email" },
    { href: contactLinks.linkedin, label: "LinkedIn", external: true },
    { href: contactLinks.github, label: "GitHub", external: true },
    { href: contactLinks.resumeLink, label: "Resume", external: true },
  ];

  return (
    <footer className="relative mt-10 overflow-hidden border-t border-line">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 pt-16 pb-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-dim mb-4">Thanks for scrolling</p>
            <ul className="flex flex-wrap gap-x-8 gap-y-3">
              {links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group relative text-lg text-muted transition-colors hover:text-fg"
                  >
                    {l.label}
                    <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-violet to-cyan transition-transform duration-300 group-hover:scale-x-100" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <a
            href="#"
            className="group inline-flex items-center gap-2 self-start rounded-full border border-line px-4 py-2 text-sm text-muted transition-colors hover:border-line-strong hover:text-fg"
          >
            Back to top
            <ArrowUpIcon className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
          </a>
        </div>

        <p
          aria-hidden="true"
          className="mt-16 select-none font-display font-bold leading-[0.8] tracking-[-0.05em] text-[clamp(4rem,17vw,15rem)] text-transparent bg-clip-text bg-gradient-to-b from-white/[0.14] to-transparent"
        >
          prathibha
        </p>

        <div className="mt-6 flex flex-col sm:flex-row justify-between gap-2 font-mono text-xs text-dim">
          <span>© {new Date().getFullYear()} Rajendran Prathibha Devkar</span>
          <span>
            {contactLinks.location} · MSCS, UT Arlington <span className="cursor-blink text-amber">_</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
