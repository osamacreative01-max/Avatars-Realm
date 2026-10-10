import Image from "next/image";

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
 * Brand dragon artwork, used only as a large, very low-opacity watermark.
 */
export function DragonWatermark({ className = "" }: Common) {
  return (
    <Image
      src="/images/Asset%207.svg"
      alt=""
      aria-hidden="true"
      width={441}
      height={337}
      unoptimized
      className={`opacity-30 ${className}`.trim()}
    />
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
