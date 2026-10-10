import Image from "next/image";
import type { ReactNode } from "react";

import { DragonWatermark, GridBackdrop, RedArc } from "@/components/Marks";

type Props = {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  status?: { label: string; tone?: "live" | "soon" | "neutral" };
  image: { src: string; alt: string };
  children?: ReactNode;
};

/**
 * Shared hero for the five inner pages. Same skeleton everywhere so the site
 * reads as one system: eyebrow → title → lede → status, over a dark graded
 * image with the arc and dragon used as quiet brand signals.
 */
export default function PageHero({
  eyebrow,
  title,
  lede,
  status,
  image,
  children,
}: Props) {
  const tone = status?.tone ?? "neutral";

  return (
    <section className="relative isolate overflow-hidden border-b border-white/[0.07]">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center opacity-75"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/70 to-ink-950/20"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-ink-950/45"
      />
      <GridBackdrop className="opacity-60" />

      <DragonWatermark className="pointer-events-none absolute -right-16 -bottom-24 h-[26rem] w-[26rem] sm:-right-10 sm:-bottom-16" />
      <RedArc className="pointer-events-none absolute -top-24 -left-24 h-[30rem] w-[30rem] rotate-12 opacity-70" />

      <div className="container-page relative py-20 sm:py-24 lg:py-28">
        <div className="max-w-3xl">
          <p className="eyebrow">{eyebrow}</p>

          <h1 className="display-1 mt-5">{title}</h1>

          {lede ? <p className="lede mt-6 max-w-2xl">{lede}</p> : null}

          {status ? (
            <div className="mt-7">
              <span className={`status status-${tone}`}>{status.label}</span>
            </div>
          ) : null}

          {children ? <div className="mt-9 flex flex-wrap gap-3">{children}</div> : null}
        </div>
      </div>
    </section>
  );
}
