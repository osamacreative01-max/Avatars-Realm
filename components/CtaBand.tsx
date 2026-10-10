import Button from "@/components/Button";
import { DragonWatermark, GridBackdrop, RedArc } from "@/components/Marks";
import Reveal from "@/components/Reveal";
import StatusBadge from "@/components/StatusBadge";
import { SITE } from "@/lib/site";

type Props = {
  eyebrow?: string;
  title: string;
  body: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
};

/** The single closing call-to-action repeated across the site. */
export default function CtaBand({
  eyebrow = "Get in Touch",
  title,
  body,
  primary,
  secondary,
}: Props) {
  return (
    <section className="relative isolate overflow-hidden border-y border-white/[0.07] bg-navy-950">
      <GridBackdrop className="opacity-50" />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(225,18,37,0.18),transparent_55%)]"
      />
      <RedArc className="pointer-events-none absolute -top-32 -right-24 h-[26rem] w-[26rem] -scale-x-100 opacity-70" />
      <DragonWatermark className="pointer-events-none absolute -bottom-28 -left-20 h-[24rem] w-[24rem]" />

      <div className="container-page relative py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-14">
          <Reveal>
            <p className="eyebrow">{eyebrow}</p>
            <h2 className="display-2 mt-4">{title}</h2>
            <p className="lede mt-5 max-w-2xl">{body}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              {primary ? (
                <Button href={primary.href} size="lg">
                  {primary.label}
                </Button>
              ) : null}
              {secondary ? (
                <Button href={secondary.href} variant="outline" size="lg">
                  {secondary.label}
                </Button>
              ) : null}
            </div>
          </Reveal>

          <Reveal delay={90}>
            <div className="card card-pad">
              <p className="eyebrow eyebrow-blue">General enquiries</p>

              <a
                href={`mailto:${SITE.email}`}
                className="mt-4 block text-[1.1rem] font-semibold break-words text-paper-50 transition-colors hover:text-flame-400"
              >
                {SITE.email}
              </a>

              <a
                href={SITE.phoneHref}
                className="mt-2 block text-[1rem] font-medium text-paper-200 transition-colors hover:text-flame-400"
              >
                {SITE.phone}
              </a>

              <p className="mt-3 text-[0.875rem] text-paper-400">
                {SITE.address}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                <StatusBadge tone="live">Open 7 days</StatusBadge>
                <StatusBadge tone="live">Walk-ins welcome</StatusBadge>
                <StatusBadge tone="soon">Championship 2026</StatusBadge>
              </div>

              <p className="mt-5 text-[0.875rem] leading-relaxed text-paper-400">
                Memberships start at R450 per month with no joining fee, and
                every new member gets a free coached intake session.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
