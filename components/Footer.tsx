import { contactLinks } from "../data/contact";

export default function Footer() {
  return (
    <footer className="mt-20 pb-10 border-t border-slate-800 pt-10 text-center">
      <h2 className="text-xl font-bold text-white mb-6">Let&apos;s Connect</h2>
      <div className="flex flex-wrap justify-center gap-6 mb-8">
        <a href={`mailto:${contactLinks.email}`} className="text-slate-400 hover:text-blue-400 transition-colors">
          Email
        </a>
        <a href={contactLinks.linkedin} target="_blank" className="text-slate-400 hover:text-blue-400 transition-colors">
          LinkedIn
        </a>
        <a href={contactLinks.github} target="_blank" className="text-slate-400 hover:text-blue-400 transition-colors">
          GitHub
        </a>
        <a href={contactLinks.resumeLink} target="_blank" className="text-slate-400 hover:text-blue-400 transition-colors font-bold">
          Download Resume
        </a>
      </div>
      <p className="text-xs text-slate-500 font-mono">
        Currently based in {contactLinks.location} • MSCS Graduate, UT Arlington
      </p>
    </footer>
  );
}
