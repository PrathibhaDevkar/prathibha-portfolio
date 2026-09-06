import { contactLinks } from "../data/contact";

export default function Footer() {
  return (
    <footer className="mt-20 pb-10 border-t border-term-border pt-10">
      <div className="rounded-xl border border-term-border bg-term-panel p-6 md:p-8 text-center">
        <p className="text-term-green text-sm mb-4">
          <span className="text-term-dim">$</span> echo &quot;let&apos;s connect&quot;
        </p>
        <div className="flex flex-wrap justify-center gap-6 mb-6 text-sm">
          <a href={`mailto:${contactLinks.email}`} className="text-term-muted hover:text-term-accent transition-colors">
            email
          </a>
          <a href={contactLinks.linkedin} target="_blank" className="text-term-muted hover:text-term-accent transition-colors">
            linkedin
          </a>
          <a href={contactLinks.github} target="_blank" className="text-term-muted hover:text-term-accent transition-colors">
            github
          </a>
          <a href={contactLinks.resumeLink} target="_blank" className="text-term-accent font-bold hover:brightness-110 transition-all">
            resume
          </a>
        </div>
        <p className="text-xs text-term-dim font-mono">
          {contactLinks.location} <span className="text-term-border">•</span> MSCS, UT Arlington{" "}
          <span className="cursor-blink text-term-accent">_</span>
        </p>
      </div>
    </footer>
  );
}
