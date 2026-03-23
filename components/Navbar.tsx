export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
        <span className="font-bold tracking-tighter text-blue-400">RPD.DEV</span>
        <div className="flex gap-6 text-sm font-medium text-slate-400">
          <a href="#projects" className="hover:text-white transition-colors">Projects</a>
          <a href="#skills" className="hover:text-white transition-colors">Skills</a>
          <a href="#experience" className="hover:text-white transition-colors">Experience</a>
        </div>
      </div>
    </nav>
  );
}