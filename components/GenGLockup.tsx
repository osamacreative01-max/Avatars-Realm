import Image from "next/image";

type Props = {
  /** "full" shows the tagline; "compact" is the small footer mark. */
  variant?: "full" | "compact";
  /**
   * "md" is the Home lockup; "sm" is the reduced Academy lockup. The Academy
   * placement keeps both lines of copy (logo + "Powered by Gen.G" + the
   * tagline) and only steps the sizing down — per the handoff, it is "a
   * smaller version of the homepage lockup".
   */
  size?: "md" | "sm";
  className?: string;
};

/**
 * Approved Gen.G partner lockup — the official gold monogram beside the
 * two-line "Powered by Gen.G / The GOLD standard in Esports" wording. Gen.G
 * is a supporting partner signal, deliberately secondary to the Avatars Realm
 * identity, so it is set small and restrained on a dark ground with gold
 * emphasis on "GOLD". The compact variant drops the tagline for the footer.
 */
export default function GenGLockup({
  variant = "full",
  size = "md",
  className = "",
}: Props) {
  /* Full lockup stacks the logo above the wording on small screens and sits
     the two side by side from sm up, per the handoff's mobile direction. The
     compact footer mark always stays on one row. */
  const row =
    variant === "compact"
      ? "flex items-center gap-3"
      : "flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-5";

  /* Logo proportions stay the same at both sizes — only the rendered width
     steps down for the Academy placement. */
  const logoWidth =
    variant === "compact" ? "w-9" : size === "sm" ? "w-10 sm:w-11" : "w-11 sm:w-[3.25rem]";
  const logoSizes =
    variant === "compact" ? "36px" : size === "sm" ? "40px" : "(max-width: 640px) 44px, 52px";

  return (
    <div className={`${row} ${className}`.trim()}>
      {/* Width comes only from the variant classes below — a `w-auto` here
          would override them in the cascade and render the 600px source at
          full size. */}
      <Image
        src="/images/geng-logo.png"
        alt="Gen.G logo"
        width={600}
        height={600}
        sizes={logoSizes}
        className={`h-auto flex-none ${logoWidth}`}
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
              : size === "sm"
                ? "text-[0.875rem] sm:text-[0.9375rem]"
                : "text-[0.9375rem] sm:text-[1rem]"
          }`}
        >
          Powered by Gen.G
        </p>
        {variant === "full" ? (
          <p
            className={`leading-snug text-paper-300 ${
              size === "sm"
                ? "text-[0.75rem] sm:text-[0.8125rem]"
                : "text-[0.8125rem] sm:text-[0.875rem]"
            }`}
          >
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
