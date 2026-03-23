import Navbar from "../components/Navbar";
import About from "../components/AboutMe";
import ProjectCard from "../components/ProjectCard";
import Skills from "../components/Skills";
import Experience from "../components/Experience";
import Publication from "../components/Publication";
import Footer from "../components/Footer";
import { project } from "../data/projects";
import { contactLinks } from "../data/contact";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-200 selection:bg-blue-500/30">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-8 pt-32">
        
        {/* Refined Hero Section with CTA */}
        <header className="mb-24">
          <div className="inline-block px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono mb-6">
            Available for Full time Roles
          </div>
          <h1 className="text-6xl font-extrabold text-white mb-6 tracking-tight">
            Rajendran Prathibha Devkar
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl leading-relaxed mb-10">
            Software Engineer with <span className="text-white font-medium">4+ years of production experience</span>. 
            Currently pursuing an MSCS at <span className="text-blue-400 font-semibold">UT Arlington</span>.
          </p>
          
          <div className="flex flex-wrap gap-4">
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
          </div>
        </header>

        {/* Content Sections */}
        <About />
        
        <section id="projects" className="my-24 scroll-mt-20">
          <h2 className="text-3xl font-bold text-white mb-12 flex items-center gap-4">
            Selected Projects
            <div className="h-px bg-slate-800 grow"></div>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {project.map((p) => (
              <ProjectCard key={p.title} project={p} />
            ))}
          </div>
        </section>

        <section id="skills" className="scroll-mt-20">
          <Skills />
        </section>

        <Publication />
        
        <Experience />

        <Footer />
      </div>
    </main>
  );
}