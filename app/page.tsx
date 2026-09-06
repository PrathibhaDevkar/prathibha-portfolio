import Navbar from "../components/Navbar";
import About from "../components/AboutMe";
import ProjectCard from "../components/ProjectCard";
import Skills from "../components/Skills";
import Experience from "../components/Experience";
import Publication from "../components/Publication";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import AnimatedSection from "../components/AnimatedSection";
import ContactForm from "../components/ContactForm";
import SectionHeading from "../components/SectionHeading";
import { project } from "../data/projects";

export default function Home() {
  return (
    <main className="min-h-screen bg-term-bg text-term-text selection:bg-term-accent-dim">
      <Navbar />

      <div className="max-w-7xl mx-auto px-8 pt-32">

        <HeroSection />

        <AnimatedSection>
          <About />
        </AnimatedSection>

        <AnimatedSection delay={0.05}>
          <section id="projects" className="my-24 scroll-mt-20">
            <SectionHeading command="ls -la projects/" title="Selected Projects" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.map((p) => (
                <ProjectCard key={p.title} project={p} />
              ))}
            </div>
          </section>
        </AnimatedSection>

        <AnimatedSection delay={0.05}>
          <Skills />
        </AnimatedSection>

        <AnimatedSection delay={0.05}>
          <Publication />
        </AnimatedSection>

        <AnimatedSection delay={0.05}>
          <Experience />
        </AnimatedSection>

        <AnimatedSection delay={0.05}>
          <ContactForm />
        </AnimatedSection>

        <Footer />
      </div>
    </main>
  );
}
