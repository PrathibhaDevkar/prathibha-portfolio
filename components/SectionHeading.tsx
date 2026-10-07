export default function SectionHeading({
  index,
  eyebrow,
  title,
  accent,
}: {
  index: string;
  eyebrow: string;
  title: string;
  accent?: string;
}) {
  return (
    <div className="mb-12 md:mb-16">
      <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-dim mb-4">
        <span className="text-cyan">{index}</span>
        <span className="h-px w-10 bg-gradient-to-r from-cyan/60 to-transparent" />
        {eyebrow}
      </p>
      <h2 className="font-display text-4xl md:text-6xl font-semibold tracking-tight text-fg leading-[1.02]">
        {title}{" "}
        {accent && <span className="font-serif italic font-normal text-gradient pr-2">{accent}</span>}
      </h2>
    </div>
  );
}
