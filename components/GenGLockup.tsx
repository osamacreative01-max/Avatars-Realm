import Image from "next/image";

type Props = {
  /** "full" shows the tagline; "compact" is the small footer mark. */
  variant?: "full" | "compact";
  className?: string;
};

/**
 * Approved Gen.G partner lockup — the official gold monogram beside the
 * two-line "Powered by Gen.G / The GOLD standard in Esports" wording. Gen.G
 * is a supporting partner signal, deliberately secondary to the Avatars Realm
 * identity, so it is set small and restrained on a dark ground with gold
 * emphasis on "GOLD". The compact variant drops the tagline for the footer.
 */
export default function GenGLockup({ variant = "full", className = "" }: Props) {
  /* Full lockup stacks the logo above the wording on small screens and sits
     the two side by side from sm up, per the handoff's mobile direction. The
     compact footer mark always stays on one row. */
  const row =
    variant === "compact"
      ? "flex items-center gap-3"
      : "flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-5";

  return (
    <div className={`${row} ${className}`.trim()}>
      <Image
        src="/images/geng-logo.png"
        alt="Gen.G logo"
        width={600}
        height={600}
        sizes={
          variant === "compact" ? "36px" : "(max-width: 640px) 44px, 52px"
        }
        className={`h-auto w-auto flex-none ${
          variant === "compact" ? "w-9" : "w-11 sm:w-[3.25rem]"
        }`}
      />
      <div
        className={
          variant === "compact"
            ? "flex flex-col gap-0.5"
            : "flex flex-col gap-1 sm:border-l sm:border-white/10 sm:pl-5"
        }
      >
        <p
          className={`font-semibold tracking-[0.01em] text-paper-100 ${
            variant === "compact"
              ? "text-[0.8125rem]"
              : "text-[0.9375rem] sm:text-[1rem]"
          }`}
        >
          Powered by Gen.G
        </p>
        {variant === "full" ? (
          <p className="text-[0.8125rem] leading-snug text-paper-300 sm:text-[0.875rem]">
            The{" "}
            <span className="font-bold tracking-[0.02em] text-[#f0c419]">
              GOLD
            </span>{" "}
            standard in Esports
          </p>
        ) : null}
      </div>
    </div>
  );
}
