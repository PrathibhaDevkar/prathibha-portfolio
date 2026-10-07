"use client";
import { MotionConfig } from "framer-motion";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import About from "../components/AboutMe";
import Projects from "../components/Projects";
import Skills from "../components/Skills";
import Publication from "../components/Publication";
import Experience from "../components/Experience";
import ContactForm from "../components/ContactForm";
import Footer from "../components/Footer";
import CommandPalette from "../components/CommandPalette";
import CursorGlow from "../components/CursorGlow";
import NeuralField from "../components/NeuralField";

export default function Home() {
  return (
    // reducedMotion="user" makes every Framer animation respect the OS "reduce motion" setting
    <MotionConfig reducedMotion="user">
      {/* no background here: body paints the ink color, so the hero's aurora (z -10) can show through */}
      <main className="relative min-h-screen overflow-x-clip text-fg">
        <NeuralField />
        <CursorGlow />
        <Navbar />
        <CommandPalette />

        <HeroSection />

        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
          <About />
          <Projects />
          <Skills />
          <Publication />
          <Experience />
          <ContactForm />
        </div>

        <Footer />
      </main>
    </MotionConfig>
  );
}
