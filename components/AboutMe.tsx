// components/About.tsx
import { aboutMe } from "../data/aboutMe";
import SectionHeading from "./SectionHeading";

export default function About() {
  return (
    <section id="about" className="my-24 scroll-mt-20">
      <SectionHeading command="cat about.md" title="About Me" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        <div className="md:col-span-1 rounded-xl border border-term-border bg-term-panel p-6 text-center">
          <div className="text-5xl font-extrabold text-term-accent mb-2">4+</div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-term-dim mb-6">
            years in production
          </p>
          <div className="h-px bg-term-border mb-6" />
          <p className="text-xs text-term-muted italic leading-relaxed">
            &quot;Proven instincts for performance and scale&quot;
          </p>
        </div>

        <div className="md:col-span-2 space-y-5 rounded-xl border border-term-border bg-term-panel p-6 md:p-8">
          {aboutMe.description.map((paragraph, index) => (
            <p key={index} className="text-term-muted leading-relaxed">
              <span className="text-term-dim select-none">{String(index + 1).padStart(2, "0")}  </span>
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
