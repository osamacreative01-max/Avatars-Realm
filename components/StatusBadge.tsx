type Tone = "dev" | "planned" | "neutral";

const TONE: Record<Tone, string> = {
  dev: "status-dev",
  planned: "status-planned",
  neutral: "status-neutral",
};

export default function StatusBadge({
  children,
  tone = "neutral",
  className = "",
}: {
  children: string;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span className={`status ${TONE[tone]} ${className}`.trim()}>{children}</span>
  );
}
