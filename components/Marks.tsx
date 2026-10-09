type Common = { className?: string };

/** The brand's red arc motif — used sparingly as a framing device. */
export function RedArc({ className = "" }: Common) {
  return (
    <svg
      viewBox="0 0 520 520"
      fill="none"
      aria-hidden="true"
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="ar-arc" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#E11225" stopOpacity="0" />
          <stop offset="45%" stopColor="#E11225" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#FF6B78" stopOpacity="0.15" />
        </linearGradient>
      </defs>
      <path
        d="M20 500 A480 480 0 0 0 500 20"
        stroke="url(#ar-arc)"
        strokeWidth="1.5"
      />
      <path
        d="M64 500 A436 436 0 0 0 500 64"
        stroke="url(#ar-arc)"
        strokeWidth="4"
        strokeOpacity="0.35"
      />
      <path
        d="M120 500 A380 380 0 0 0 500 120"
        stroke="url(#ar-arc)"
        strokeWidth="1"
        strokeOpacity="0.5"
      />
    </svg>
  );
}

/**
 * Stylised eastern dragon, drawn as a single coiling stroke.
 * Used only as a large, very low-opacity watermark.
 */
export function DragonWatermark({ className = "" }: Common) {
  return (
    <svg
      viewBox="0 0 300 300"
      fill="none"
      aria-hidden="true"
      className={`text-flame-600/25 ${className}`.trim()}
      stroke="currentColor"
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Coiling body */}
      <path d="M38 262 C38 188 92 152 152 164 C214 176 244 132 232 78" />
      <path
        d="M74 268 C74 210 116 188 162 198 C212 209 230 176 224 132"
        opacity="0.55"
      />
      {/* Head */}
      <path d="M232 78 C248 60 272 64 280 80 C287 96 277 113 261 115 C248 117 237 108 234 96" />
      {/* Horns */}
      <path d="M264 64 L276 38 M250 68 L250 40" />
      {/* Jaw */}
      <path d="M261 115 L250 131 M242 111 L235 127" />
      {/* Back spikes */}
      <path d="M152 164 L141 140 M186 176 L182 150 M114 186 L101 164 M224 132 L228 108" />
      {/* Eye */}
      <circle cx="261" cy="89" r="3.6" fill="currentColor" stroke="none" />
      {/* Whisker */}
      <path d="M280 80 C294 76 300 88 292 98" opacity="0.7" />
    </svg>
  );
}

/** Faint tactical grid used behind hero and CTA bands. */
export function GridBackdrop({ className = "" }: Common) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 grid-lines ${className}`.trim()}
    />
  );
}

/**
 * The logo dragon, reused as a section watermark. Alternate `side` down the
 * page — left sections sit bottom-left, right sections top-right and mirrored
 * so the head always faces into the content.
 */
export function SectionDragon({
  side = "right",
  className = "",
}: {
  side?: "left" | "right";
  className?: string;
}) {
  const position =
    side === "right" ? "-top-24 -right-20 -scale-x-100" : "-bottom-24 -left-20";

  return (
    <DragonWatermark
      className={`pointer-events-none absolute ${position} h-[26rem] w-[26rem] ${className}`.trim()}
    />
  );
}
