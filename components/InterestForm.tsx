"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { createPortal } from "react-dom";

/** Games listed in the Kayleen copy deck. "Other" reveals a free-text field. */
const GAMES = [
  "EA Sports FC 26",
  "Call of Duty",
  "Valorant",
  "PUBG Mobile",
  "League of Legends",
  "Other",
] as const;

/** Single-select programmes, in the order the cards present them. */
const PROGRAMMES = ["Beginner", "Intermediate", "Pro"] as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type Props = {
  label?: string;
  variant?: "primary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  /**
   * Pre-selects the "Programme of interest" chip — programme cards pass
   * their own programme so the modal opens with that choice made.
   */
  programme?: string;
  /**
   * Hides the programme field entirely. The Championship section has no
   * programme context, so its entry point opens without one.
   */
  hideProgramme?: boolean;
};

type FieldKey =
  | "name"
  | "email"
  | "phone"
  | "programme"
  | "games"
  | "otherText"
  | "consent";
type FieldErrors = Partial<Record<FieldKey, string>>;
type Status = "idle" | "sending" | "sent" | "failed";

const BTN_BASE = "btn";
const BTN_VARIANT = {
  primary: "btn-primary",
  outline: "btn-outline",
} as const;
const BTN_SIZE = { sm: "btn-sm", md: "", lg: "btn-lg" } as const;

const INPUT_CLASS =
  "mt-2 w-full rounded border border-white/12 bg-white/[0.04] px-3.5 py-2.5 text-[1rem] text-paper-50 placeholder:text-paper-500 focus:border-flame-500 focus:ring-1 focus:ring-flame-500 focus:outline-none";

const ERROR_CLASS =
  "mt-2 text-[0.8125rem] leading-snug text-flame-400";

/**
 * "I'm Interested, Game On!" enquiry. Opens an accessible modal with the
 * visitor's contact details, a multi-select of the championship game titles
 * (with a free-text option for "Other") and a consent tick. Submissions go to
 * the /api/interest route handler, which validates them again server-side and
 * emails the team; a failed send falls back to the published address.
 */
export default function InterestForm({
  label = "I'm Interested, Game On!",
  variant = "primary",
  size = "md",
  className = "",
  programme,
  hideProgramme = false,
}: Props) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [programmeChoice, setProgrammeChoice] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [otherText, setOtherText] = useState("");
  const [consent, setConsent] = useState(false);
  /* Honeypot — hidden from people, tempting to bots. */
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  /* The programme field is shown for every entry point except the
     Championship section, which has no programme context. */
  const programmeVisible = !hideProgramme;

  /* Modal behaviour: focus is moved in on open, trapped while open, Esc
     closes, and focus returns to the trigger on close. */
  useEffect(() => {
    if (!open) return;

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
        (element) => element.tagName === "INPUT" || element.tagName === "TEXTAREA",
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
  }, [open]);

  function openDialog() {
    setErrors({});
    setFormError(null);
    setStatus("idle");
    /* A programme card opens the modal with its own programme pre-selected. */
    setProgrammeChoice(programmeVisible ? (programme ?? "") : "");
    setOpen(true);
  }

  function toggleGame(game: string) {
    setErrors((current) => ({ ...current, games: undefined }));
    setSelected((current) =>
      current.includes(game)
        ? current.filter((item) => item !== game)
        : [...current, game],
    );
  }

  function validate(): FieldErrors {
    const next: FieldErrors = {};

    if (!name.trim()) next.name = "Please enter your full name.";

    if (!email.trim()) {
      next.email = "Please enter your email address.";
    } else if (!EMAIL_RE.test(email.trim())) {
      next.email = "Please enter a valid email address.";
    }

    if (!phone.trim()) {
      next.phone = "Please enter a phone or WhatsApp number.";
    }

    if (programmeVisible && !programmeChoice) {
      next.programme = "Select a programme of interest.";
    }

    if (selected.length === 0) {
      next.games = "Select at least one game.";
    } else if (selected.includes("Other") && !otherText.trim()) {
      next.otherText = "Tell us which game you mean.";
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
      const response = await fetch("/api/interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          /* The key is omitted when the field is hidden, so the server can
             tell "not asked" from "asked and left empty". */
          ...(programmeVisible ? { programme: programmeChoice.trim() } : {}),
          games: selected,
          otherText: otherText.trim(),
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
        setName("");
        setEmail("");
        setPhone("");
        setSelected([]);
        setOtherText("");
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

  const otherSelected = selected.includes("Other");
  const sending = status === "sending";

  return (
    <>
      <button
        type="button"
        onClick={openDialog}
        className={`${BTN_BASE} ${BTN_VARIANT[variant]} ${BTN_SIZE[size]} ${className}`.trim()}
      >
        {label}
      </button>

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
            aria-labelledby="interest-form-title"
            aria-describedby="interest-form-intro"
            style={{ background: "linear-gradient(160deg, #12223c, #08101e)" }}
            className="card max-h-[92vh] w-full max-w-xl overflow-y-auto card-pad"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="eyebrow">Register your interest</p>
                <h2
                  id="interest-form-title"
                  className="display-3 mt-3 text-[1.6rem]"
                >
                  I&apos;m Interested, Game On!
                </h2>
                <p
                  id="interest-form-intro"
                  className="mt-3 text-[0.9375rem] leading-relaxed text-paper-300"
                >
                  Tell the team which games you are into and how to reach you —
                  we reply within one business day.
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

            {status === "sent" ? (
              <div className="mt-6">
                <p
                  role="status"
                  aria-live="polite"
                  className="text-[1rem] leading-relaxed text-paper-200"
                >
                  Thanks — your interest is on its way to the team. They&apos;ll
                  reply using the contact details you gave us.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="btn btn-outline btn-md"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field
                    label="Full name"
                    id="if-name"
                    value={name}
                    onChange={(value) => {
                      setName(value);
                      setErrors((current) => ({ ...current, name: undefined }));
                    }}
                    autoComplete="name"
                    required
                    error={errors.name}
                  />
                  <Field
                    label="Email"
                    id="if-email"
                    type="email"
                    value={email}
                    onChange={(value) => {
                      setEmail(value);
                      setErrors((current) => ({
                        ...current,
                        email: undefined,
                      }));
                    }}
                    autoComplete="email"
                    required
                    error={errors.email}
                  />
                </div>
                <Field
                  label="Phone / WhatsApp"
                  id="if-phone"
                  type="tel"
                  value={phone}
                  onChange={(value) => {
                    setPhone(value);
                    setErrors((current) => ({
                      ...current,
                      phone: undefined,
                    }));
                  }}
                  autoComplete="tel"
                  required
                  error={errors.phone}
                />

                {programmeVisible ? (
                  <fieldset>
                    <legend className="text-[0.8125rem] font-semibold tracking-[0.06em] text-paper-400 uppercase">
                      Programme of interest
                      <span aria-hidden="true" className="ml-1 text-flame-400">
                        *
                      </span>
                    </legend>
                    <p
                      id="if-programme-hint"
                      className="mt-1 text-[0.8125rem] text-paper-400"
                    >
                      Select one.
                    </p>
                    <div
                      className="mt-3 flex flex-wrap gap-2"
                      aria-describedby="if-programme-hint"
                    >
                      {PROGRAMMES.map((option) => {
                        const active = programmeChoice === option;
                        return (
                          <label key={option} className="cursor-pointer">
                            <input
                              type="radio"
                              name="programme"
                              value={option}
                              checked={active}
                              onChange={() => {
                                setProgrammeChoice(option);
                                setErrors((current) => ({
                                  ...current,
                                  programme: undefined,
                                }));
                              }}
                              className="peer sr-only"
                            />
                            <span
                              className={`inline-flex items-center rounded border px-3.5 py-2 text-[0.875rem] font-medium transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-flame-500 ${
                                active
                                  ? "border-flame-500 bg-flame-600/15 text-paper-50"
                                  : "border-white/12 bg-white/[0.04] text-paper-200 hover:border-white/25"
                              }`}
                            >
                              {option}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                    {errors.programme ? (
                      <p role="alert" className={ERROR_CLASS}>
                        {errors.programme}
                      </p>
                    ) : null}
                  </fieldset>
                ) : null}

                <fieldset>
                  <legend className="text-[0.8125rem] font-semibold tracking-[0.06em] text-paper-400 uppercase">
                    Games of interest
                  </legend>
                  <p
                    id="if-games-hint"
                    className="mt-1 text-[0.8125rem] text-paper-400"
                  >
                    Select one or more.
                  </p>
                  {/* role="group" cannot carry aria-invalid — the group's
                      error is announced by the alert below it instead. */}
                  <div
                    className="mt-3 flex flex-wrap gap-2"
                    role="group"
                    aria-describedby="if-games-hint"
                  >
                    {GAMES.map((game) => {
                      const active = selected.includes(game);
                      return (
                        <label
                          key={game}
                          className="cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            name="games"
                            value={game}
                            checked={active}
                            onChange={() => toggleGame(game)}
                            className="peer sr-only"
                          />
                          <span
                            className={`inline-flex items-center rounded border px-3.5 py-2 text-[0.875rem] font-medium transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-flame-500 ${
                              active
                                ? "border-flame-500 bg-flame-600/15 text-paper-50"
                                : "border-white/12 bg-white/[0.04] text-paper-200 hover:border-white/25"
                            }`}
                          >
                            {game}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                  {errors.games ? (
                    <p role="alert" className={ERROR_CLASS}>
                      {errors.games}
                    </p>
                  ) : null}

                  {otherSelected ? (
                    <div className="mt-4">
                      <Field
                        label="Which game?"
                        id="if-other"
                        value={otherText}
                        onChange={(value) => {
                          setOtherText(value);
                          setErrors((current) => ({
                            ...current,
                            otherText: undefined,
                          }));
                        }}
                        placeholder="Add your game"
                        required
                        error={errors.otherText}
                      />
                    </div>
                  ) : null}
                </fieldset>

                <div>
                  <label
                    htmlFor="if-consent"
                    className="flex cursor-pointer items-start gap-3 text-[0.9375rem] leading-relaxed text-paper-200"
                  >
                    <input
                      id="if-consent"
                      type="checkbox"
                      checked={consent}
                      onChange={(event) => {
                        setConsent(event.target.checked);
                        setErrors((current) => ({
                          ...current,
                          consent: undefined,
                        }));
                      }}
                      aria-invalid={errors.consent ? true : undefined}
                      aria-describedby={
                        errors.consent ? "if-consent-error" : undefined
                      }
                      className="mt-1 h-4 w-4 flex-none accent-[#d9323b]"
                    />
                    <span>
                      I agree to Avatars Realm contacting me about my interest.
                    </span>
                  </label>
                  {errors.consent ? (
                    <p id="if-consent-error" role="alert" className={ERROR_CLASS}>
                      {errors.consent}
                    </p>
                  ) : null}
                </div>

                {/* Honeypot: off-screen and out of the tab order, so only
                    automated submissions ever fill it. */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -left-[9999px] h-px w-px overflow-hidden"
                >
                  <label htmlFor="if-website">Website</label>
                  <input
                    id="if-website"
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
                    ? "Sending your interest…"
                    : status === "failed"
                      ? formError ?? ""
                      : ""}
                </p>

                {formError ? (
                  <p role="alert" className="text-[0.875rem] leading-relaxed text-flame-400">
                    {formError}
                  </p>
                ) : null}

                <div className="flex flex-wrap gap-3 pt-1">
                  <button
                    type="submit"
                    disabled={sending}
                    className="btn btn-primary btn-lg disabled:opacity-60"
                  >
                    {sending ? "Sending…" : "Send my interest"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="btn btn-outline btn-lg"
                  >
                    Cancel
                  </button>
                </div>
                <p className="text-[0.8125rem] leading-relaxed text-paper-400">
                  This sends your details straight to the team.
                </p>
              </form>
            )}
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
