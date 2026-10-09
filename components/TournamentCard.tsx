type Props = {
  title: string;
  format: string;
  note: string;
  index: number;
};

export default function TournamentCard({ title, format, note, index }: Props) {
  return (
    <article className="card card-hover group relative overflow-hidden p-6">
      <div
        aria-hidden="true"
        className="absolute -top-10 -right-10 h-28 w-28 rounded-full bg-flame-600/10 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
      />

      <div className="relative flex items-start justify-between gap-4">
        <span className="font-mono text-[0.75rem] font-medium tracking-[0.2em] text-flame-400">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="rounded border border-white/15 bg-white/[0.04] px-2.5 py-1 text-[0.6875rem] font-semibold tracking-[0.1em] text-paper-200 uppercase">
          {format}
        </span>
      </div>

      <h3 className="relative mt-6 text-[1.25rem] leading-tight font-semibold tracking-[-0.01em] text-paper-50">
        {title}
      </h3>
      <p className="relative mt-2.5 text-[0.875rem] leading-relaxed text-paper-300">
        {note}
      </p>
    </article>
  );
}
