"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { createPortal } from "react-dom";

/** Subjects offered by the general contact form. */
const SUBJECTS = [
  "General enquiry",
  "Academy programmes",
  "Memberships & lounge",
  "League, tournaments & events",
  "Schools & groups",
  "Partnerships",
  "Other",
] as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type Variant = "primary" | "outline" | "link";
type Size = "sm" | "md" | "lg";

type Props = {
  /** Button label when the form opens as a dialog. */
  label?: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Pre-selects the subject (used by the contact-page enquiry cards). */
  defaultSubject?: string;
  /** Render the form on the page instead of behind a trigger button. */
  inline?: boolean;
  /** Anchor for the inline form. */
  id?: string;
};

type FieldKey =
  | "firstName"
  | "lastName"
  | "email"
  | "phone"
  | "subject"
  | "message"
  | "consent";
type FieldErrors = Partial<Record<FieldKey, string>>;
type Status = "idle" | "sending" | "sent" | "failed";

const BTN_BASE = "btn";
const BTN_VARIANT: Record<Variant, string> = {
  primary: "btn-primary",
  outline: "btn-outline",
  link: "arrow-link",
};
const BTN_SIZE: Record<Size, string> = { sm: "btn-sm", md: "", lg: "btn-lg" };

const INPUT_CLASS =
  "mt-2 w-full rounded border border-white/12 bg-white/[0.04] px-3.5 py-2.5 text-[1rem] text-paper-50 placeholder:text-paper-500 focus:border-flame-500 focus:ring-1 focus:ring-flame-500 focus:outline-none";

const ERROR_CLASS = "mt-2 text-[0.8125rem] leading-snug text-flame-400";

/**
 * General contact form — name, surname, email, contact number and a free-text
 * message. It posts to /api/contact, which validates again server-side and
 * emails the team. Nothing here opens an external mail application: visitors
 * complete the enquiry inside the site.
 *
 * The same component renders either as an accessible modal (from contact
 * buttons across the site) or inline on the Contact page.
 */
export default function ContactForm({
  label = "Contact us",
  variant = "primary",
  size = "md",
  className = "",
  defaultSubject = "General enquiry",
  inline = false,
  id,
}: Props) {
  const uid = useId().replace(/:/g, "");
  const [open, setOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState(defaultSubject);
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  /* Honeypot — hidden from people, tempting to bots. */
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  /* Modal behaviour: focus is moved in on open, trapped while open, Esc
     closes, and focus returns to the trigger on close. */
  useEffect(() => {
    if (!open || inline) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const dialog = dialogRef.current;
    document.body.style.overflow = "hidden";

    const focusables = () =>
      Array.from(
        dialog?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      ).filter((element) => element.tabIndex >= 0);

    const focusTimer = window.setTimeout(() => {
      const items = focusables();
      const firstField = items.find(
        (element) =>
          element.tagName === "INPUT" ||
          element.tagName === "TEXTAREA" ||
          element.tagName === "SELECT",
      );
      (firstField ?? items[0])?.focus();
    }, 0);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        return;
      }
      if (event.key !== "Tab") return;

      const items = focusables();
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;

      if (event.shiftKey) {
        if (active === first || !dialog?.contains(active)) {
          event.preventDefault();
          last.focus();
        }
      } else if (active === last || !dialog?.contains(active)) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      previouslyFocused?.focus?.();
    };
  }, [open, inline]);

  function openDialog() {
    setErrors({});
    setFormError(null);
    setStatus("idle");
    setOpen(true);
  }

  function validate(): FieldErrors {
    const next: FieldErrors = {};

    if (!firstName.trim()) next.firstName = "Please enter your name.";
    if (!lastName.trim()) next.lastName = "Please enter your surname.";

    if (!email.trim()) {
      next.email = "Please enter your email address.";
    } else if (!EMAIL_RE.test(email.trim())) {
      next.email = "Please enter a valid email address.";
    }

    if (!phone.trim()) {
      next.phone = "Please enter a contact number.";
    }

    if (!message.trim()) {
      next.message = "Please type your message.";
    }

    if (!consent) {
      next.consent = "Please tick the box so the team can reply to you.";
    }

    return next;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const clientErrors = validate();
    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      setFormError("Please check the highlighted fields and try again.");
      setStatus("idle");
      return;
    }

    setErrors({});
    setFormError(null);
    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          subject,
          message: message.trim(),
          consent,
          website,
          page: window.location.pathname,
        }),
      });

      const data = (await response.json().catch(() => ({}))) as {
        ok?: boolean;
        errors?: FieldErrors;
        error?: string;
      };

      if (response.ok && data.ok) {
        setStatus("sent");
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhone("");
        setSubject(defaultSubject);
        setMessage("");
        setConsent(false);
        return;
      }

      if (data.errors && Object.keys(data.errors).length > 0) {
        setErrors(data.errors);
        setFormError("Please check the highlighted fields and try again.");
        setStatus("idle");
        return;
      }

      setFormError(
        data.error ??
          "We could not send that just now. Please try again in a moment.",
      );
      setStatus("failed");
    } catch {
      setFormError(
        "We could not send that just now. Please try again in a moment.",
      );
      setStatus("failed");
    }
  }

  const sending = status === "sending";
  const subjectOptions = (SUBJECTS as readonly string[]).includes(defaultSubject)
    ? [...SUBJECTS]
    : [defaultSubject, ...SUBJECTS];

  const formBody =
    status === "sent" ? (
      <div className="mt-6">
        <p
          role="status"
          aria-live="polite"
          className="text-[1rem] leading-relaxed text-paper-200"
        >
          Thanks — your message is on its way to the team. We reply within one
          business day using the contact details you gave us.
        </p>
        {!inline ? (
          <div className="mt-6">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="btn btn-outline btn-md"
            >
              Close
            </button>
          </div>
        ) : null}
      </div>
    ) : (
      <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="Name"
            id={`${uid}-first-name`}
            value={firstName}
            onChange={(value) => {
              setFirstName(value);
              setErrors((current) => ({ ...current, firstName: undefined }));
            }}
            autoComplete="given-name"
            required
            error={errors.firstName}
          />
          <Field
            label="Surname"
            id={`${uid}-last-name`}
            value={lastName}
            onChange={(value) => {
              setLastName(value);
              setErrors((current) => ({ ...current, lastName: undefined }));
            }}
            autoComplete="family-name"
            required
            error={errors.lastName}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="Email"
            id={`${uid}-email`}
            type="email"
            value={email}
            onChange={(value) => {
              setEmail(value);
              setErrors((current) => ({ ...current, email: undefined }));
            }}
            autoComplete="email"
            required
            error={errors.email}
          />
          <Field
            label="Contact number"
            id={`${uid}-phone`}
            type="tel"
            value={phone}
            onChange={(value) => {
              setPhone(value);
              setErrors((current) => ({ ...current, phone: undefined }));
            }}
            autoComplete="tel"
            required
            error={errors.phone}
          />
        </div>

        <div>
          <label
            htmlFor={`${uid}-subject`}
            className="text-[0.8125rem] font-semibold tracking-[0.06em] text-paper-400 uppercase"
          >
            Subject
          </label>
          <select
            id={`${uid}-subject`}
            value={subject}
            onChange={(event) => setSubject(event.target.value)}
            className={INPUT_CLASS}
          >
            {subjectOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor={`${uid}-message`}
            className="text-[0.8125rem] font-semibold tracking-[0.06em] text-paper-400 uppercase"
          >
            Message
            <span aria-hidden="true" className="ml-1 text-flame-400">
              *
            </span>
          </label>
          <textarea
            id={`${uid}-message`}
            required
            rows={5}
            value={message}
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={
              errors.message ? `${uid}-message-error` : undefined
            }
            onChange={(event) => {
              setMessage(event.target.value);
              setErrors((current) => ({ ...current, message: undefined }));
            }}
            placeholder="Tell us what you need and the team will point you to the right way in."
            className={`${INPUT_CLASS} min-h-[8.5rem] resize-y ${
              errors.message ? "border-flame-500" : ""
            }`.trim()}
          />
          {errors.message ? (
            <p
              id={`${uid}-message-error`}
              role="alert"
              className={ERROR_CLASS}
            >
              {errors.message}
            </p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor={`${uid}-consent`}
            className="flex cursor-pointer items-start gap-3 text-[0.9375rem] leading-relaxed text-paper-200"
          >
            <input
              id={`${uid}-consent`}
              type="checkbox"
              checked={consent}
              onChange={(event) => {
                setConsent(event.target.checked);
                setErrors((current) => ({ ...current, consent: undefined }));
              }}
              aria-invalid={errors.consent ? true : undefined}
              aria-describedby={
                errors.consent ? `${uid}-consent-error` : undefined
              }
              className="mt-1 h-4 w-4 flex-none accent-[#d9323b]"
            />
            <span>
              I agree to Avatars Realm contacting me about this enquiry.
            </span>
          </label>
          {errors.consent ? (
            <p id={`${uid}-consent-error`} role="alert" className={ERROR_CLASS}>
              {errors.consent}
            </p>
          ) : null}
        </div>

        {/* Honeypot: off-screen and out of the tab order, so only automated
            submissions ever fill it. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-[9999px] h-px w-px overflow-hidden"
        >
          <label htmlFor={`${uid}-website`}>Website</label>
          <input
            id={`${uid}-website`}
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(event) => setWebsite(event.target.value)}
          />
        </div>

        <p role="status" aria-live="polite" className="sr-only">
          {sending
            ? "Sending your message…"
            : status === "failed"
              ? (formError ?? "")
              : ""}
        </p>

        {formError ? (
          <p
            role="alert"
            className="text-[0.875rem] leading-relaxed text-flame-400"
          >
            {formError}
          </p>
        ) : null}

        <div className="flex flex-wrap gap-3 pt-1">
          <button
            type="submit"
            disabled={sending}
            className="btn btn-primary btn-lg disabled:opacity-60"
          >
            {sending ? "Sending…" : "Send message"}
          </button>
          {!inline ? (
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="btn btn-outline btn-lg"
            >
              Cancel
            </button>
          ) : null}
        </div>
      </form>
    );

  if (inline) {
    return (
      <div id={id} className={`card card-pad ${className}`.trim()}>
        <p className="eyebrow">Contact form</p>
        <h2 className="display-3 mt-3 text-[1.6rem]">Send us a message.</h2>
        <p className="mt-3 text-[0.9375rem] leading-relaxed text-paper-300">
          Add your details and a message below. It comes straight to the team —
          no email application needed.
        </p>
        {formBody}
      </div>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={openDialog}
        className={
          variant === "link"
            ? `arrow-link ${className}`.trim()
            : `${BTN_BASE} ${BTN_VARIANT[variant]} ${BTN_SIZE[size]} ${className}`.trim()
        }
      >
        {label}
        {variant === "link" ? <span aria-hidden="true">→</span> : null}
      </button>

      {/* Portalled to <body> so the dialog escapes any ancestor stacking
          context (PageHero/CtaBand use `isolate`) and always paints above the
          page. */}
      {open
        ? createPortal(
            <div
              role="presentation"
              className="fixed inset-0 z-100 flex items-end justify-center bg-ink-950/80 p-0 backdrop-blur-sm sm:items-center sm:p-6"
              onMouseDown={(event) => {
                if (event.target === event.currentTarget) setOpen(false);
              }}
            >
              <div
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby={`${uid}-title`}
                aria-describedby={`${uid}-intro`}
                style={{
                  background: "linear-gradient(160deg, #12223c, #08101e)",
                }}
                className="card max-h-[92vh] w-full max-w-xl overflow-y-auto card-pad"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="eyebrow">Contact</p>
                    <h2
                      id={`${uid}-title`}
                      className="display-3 mt-3 text-[1.6rem]"
                    >
                      Contact Avatars Realm
                    </h2>
                    <p
                      id={`${uid}-intro`}
                      className="mt-3 text-[0.9375rem] leading-relaxed text-paper-300"
                    >
                      Send the team your details and a message. We reply within
                      one business day.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label="Close"
                    className="flex-none rounded border border-white/12 px-2.5 py-1 text-[1.1rem] leading-none text-paper-300 transition-colors hover:border-flame-500 hover:text-paper-50"
                  >
                    ×
                  </button>
                </div>

                {formBody}
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}

type FieldProps = {
  label: string;
  id: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
  error?: string;
};

function Field({
  label,
  id,
  value,
  onChange,
  type = "text",
  required,
  placeholder,
  autoComplete,
  error,
}: FieldProps) {
  const errorId = `${id}-error`;

  return (
    <div>
      <label
        htmlFor={id}
        className="text-[0.8125rem] font-semibold tracking-[0.06em] text-paper-400 uppercase"
      >
        {label}
        {required ? (
          <span aria-hidden="true" className="ml-1 text-flame-400">
            *
          </span>
        ) : null}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        value={value}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        onChange={(event) => onChange(event.target.value)}
        className={`${INPUT_CLASS} ${error ? "border-flame-500" : ""}`.trim()}
      />
      {error ? (
        <p id={errorId} role="alert" className={ERROR_CLASS}>
          {error}
        </p>
      ) : null}
    </div>
  );
}
