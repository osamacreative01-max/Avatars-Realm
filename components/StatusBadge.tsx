type Tone = "live" | "soon" | "neutral" | "proposed" | "coming";

/**
 * One tag style across the site, colour-coded by what the label means:
 * `proposed` (amber) not yet approved · `soon` (blue) planned · `coming`
 * (purple) to be announced · `neutral` (grey) published fact · `live` (red)
 * confirmed and running.
 */
const TONE: Record<Tone, string> = {
  live: "status-live",
  soon: "status-soon",
  neutral: "status-neutral",
  proposed: "status-proposed",
  coming: "status-coming",
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
