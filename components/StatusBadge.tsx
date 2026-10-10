type Tone = "live" | "soon" | "neutral";

const TONE: Record<Tone, string> = {
  live: "status-live",
  soon: "status-soon",
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
