const SEPARATOR = "◆";

/** How many times the item list repeats inside each half of the track.
 *  Keeps one half wider than the viewport so no gap ever shows on the right. */
const REPEAT = 3;

type Props = {
  items: string[];
  /** Seconds for one full loop (one half of the track). */
  speed?: number;
  className?: string;
};

/**
 * Decorative infinite status ticker. Pure CSS — the item list is rendered
 * twice and the track animates translateX(0 → -50%), so the loop is seamless.
 * Pauses on hover and stops entirely under prefers-reduced-motion.
 *
 * Usage:
 *   <Marquee
 *     items={["In Development", "Planned", "Subject to Confirmation"]}
 *     speed={16}
 *   />
 */
export default function Marquee({
  items,
  speed = 16,
  className = "",
}: Props) {
  const track = (duplicate: boolean) => (
    <div
      className="flex shrink-0 items-center"
      aria-hidden={duplicate || undefined}
    >
      {Array.from({ length: REPEAT }).flatMap((_, copy) =>
        items.map((item) => (
          <span
            key={`${duplicate ? "dup" : "main"}-${copy}-${item}`}
            className="flex items-center whitespace-nowrap"
          >
            <span className="text-xl font-medium whitespace-nowrap text-[#A3AABB] sm:text-2xl">
              {item}
            </span>
            <span
              aria-hidden="true"
              className="mx-6 text-xl text-[#FF2B55] sm:mx-8 sm:text-2xl"
            >
              {SEPARATOR}
            </span>
          </span>
        )),
      )}
    </div>
  );

  return (
    <div
      aria-hidden="true"
      className={`group relative w-full overflow-hidden border-y border-white/[0.12] bg-[#10121A] ${className}`.trim()}
    >
      <div
        className="flex w-max animate-[marquee_linear_infinite] py-4 group-hover:[animation-play-state:paused] motion-reduce:animate-none"
        style={{ animationDuration: `${speed}s` }}
      >
        {track(false)}
        {track(true)}
      </div>
    </div>
  );
}
