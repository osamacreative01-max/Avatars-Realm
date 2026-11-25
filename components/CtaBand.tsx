import Button from "@/components/Button";
import ContactForm from "@/components/ContactForm";
import { DragonWatermark, GridBackdrop, RedArc } from "@/components/Marks";
import Reveal from "@/components/Reveal";

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
        {/* The "General enquiries" side card was removed per the 18 November
            feedback — it repeated the body copy and contact action beside it. */}
        <Reveal className="max-w-3xl">
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
      </div>
    </section>
  );
}
