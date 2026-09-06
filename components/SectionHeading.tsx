export default function SectionHeading({ command, title }: { command: string; title: string }) {
  return (
    <div className="mb-10">
      <p className="text-xs mb-2 font-mono text-term-dim">
        <span className="text-term-green">$</span> {command}
      </p>
      <h2 className="text-2xl md:text-3xl font-bold text-term-text flex items-center gap-4">
        {title}
        <span className="h-px bg-term-border grow" />
      </h2>
    </div>
  );
}
