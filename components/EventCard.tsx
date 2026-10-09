import Image from "next/image";
import Link from "next/link";

import StatusBadge from "@/components/StatusBadge";
import type { Status } from "@/lib/content";

type Props = {
  title: string;
  description: string;
  status: Status;
  href: string;
  image: string;
  alt: string;
  ctaLabel?: string;
};

export default function EventCard({
  title,
  description,
  status,
  href,
  image,
  alt,
  ctaLabel = "View Event",
}: Props) {
  return (
    <article className="card card-hover flex h-full flex-col overflow-hidden">
      <div className="card-media relative aspect-[16/10]">
        <Image src={image} alt={alt} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/25 to-transparent"
        />
        <div className="absolute top-3.5 left-3.5">
          <StatusBadge tone={status.tone}>{status.label}</StatusBadge>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="display-3">{title}</h3>
        <p className="mt-3 text-[0.9375rem] leading-relaxed text-paper-300">
          {description}
        </p>
        <Link href={href} className="arrow-link mt-6 pt-1 self-start">
          {ctaLabel}
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}
