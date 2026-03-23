import { skillCategories } from "../data/skills";

export default function Skills() {
  return (
    <section className="my-20">
      <h2 className="text-2xl font-bold text-white mb-8">Technical Skills</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        {skillCategories.map((cat) => (
          <div key={cat.title}>
            <h3 className="text-blue-400 font-bold mb-4 uppercase text-xs tracking-widest">{cat.title}</h3>
            <ul className="space-y-2 text-slate-400 text-sm">
              {cat.skills.map(s => <li key={s}>{s}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}