import Button from "@/components/Button";
import ContactForm from "@/components/ContactForm";
import { DragonWatermark, GridBackdrop, RedArc } from "@/components/Marks";
import Reveal from "@/components/Reveal";
import StatusBadge from "@/components/StatusBadge";
import { SITE } from "@/lib/site";

type Action = {
  label: string;
  /** Standard link action. */
  href?: string;
  /** Opens the general contact form instead of navigating. */
  contact?: boolean;
  /** Pre-selects the contact form subject. */
  subject?: string;
};

type Props = {
  eyebrow?: string;
  title: string;
  body: string;
  primary?: Action;
  secondary?: Action;
};

function ActionButton({
  action,
  variant,
}: {
  action: Action;
  variant: "primary" | "outline";
}) {
  if (action.contact) {
    return (
      <ContactForm
        label={action.label}
        variant={variant}
        size="lg"
        defaultSubject={action.subject ?? "General enquiry"}
      />
    );
  }

  return (
    <Button href={action.href ?? "/contact/"} variant={variant} size="lg">
      {action.label}
    </Button>
  );
}

/** The single closing call-to-action repeated across the site. */
export default function CtaBand({
  eyebrow = "Get in Touch",
  title,
  body,
  primary = {
    label: "Contact us",
    contact: true,
    subject: "General enquiry",
  },
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
              <ActionButton action={primary} variant="primary" />
              {secondary ? (
                <ActionButton action={secondary} variant="outline" />
              ) : null}
            </div>
          </Reveal>

          <Reveal delay={90}>
            <div className="card card-pad">
              <p className="eyebrow eyebrow-blue">General enquiries</p>

              <p className="mt-4 text-[1rem] leading-relaxed text-paper-200">
                Send the team a message about programmes, memberships, school
                groups, league entry or event hosting. We reply within one
                business day.
              </p>

              <p className="mt-4 text-[0.875rem] text-paper-400">
                {SITE.email}
              </p>

              <p className="mt-2 text-[0.875rem] text-paper-400">
                {SITE.address}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                <StatusBadge tone="coming">Enrolment opening soon</StatusBadge>
                <StatusBadge tone="proposed">Proposed pilot pricing</StatusBadge>
                <StatusBadge tone="neutral">Championship 2026</StatusBadge>
              </div>

              <div className="mt-5">
                <ContactForm
                  label="Open the contact form"
                  variant="link"
                  defaultSubject="General enquiry"
                />
              </div>

              <p className="mt-5 text-[0.875rem] leading-relaxed text-paper-400">
                Programmes, memberships and lounge rates are published as
                proposed pilot pricing — use the contact form to register your
                interest before enrolment opens.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
