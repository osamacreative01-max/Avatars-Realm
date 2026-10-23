"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

/** Games listed in the Kayleen copy deck. "Other" reveals a free-text field. */
const GAMES = [
  "EA Sports FC26",
  "Call of Duty",
  "Valorant",
  "PUBG Mobile",
  "League of Legends",
  "Other",
] as const;

/* Auto-send endpoint. Paste a free Web3Forms access key (tied to
   info@avatarsrealm.co.za — request one at https://web3forms.com) to send the
   form straight to the inbox. While it is empty, the form falls back to
   composing a pre-filled email in the visitor's mail app. */
const WEB3FORMS_ACCESS_KEY = "";
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

type Props = {
  label?: string;
  variant?: "primary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
};

const BTN_BASE = "btn";
const BTN_VARIANT = {
  primary: "btn-primary",
  outline: "btn-outline",
} as const;
const BTN_SIZE = { sm: "btn-sm", md: "", lg: "btn-lg" } as const;

/**
 * "I'm Interested, Game On!" enquiry. Opens a modal contact form with the
 * visitor's contact details plus a multi-select of the championship game
 * titles (with a free-text option for "Other"). Submitting composes the
 * details into an email addressed to info@avatarsrealm.co.za — the site is
 * static, so this hands off to the visitor's mail client with everything
 * pre-filled rather than silently posting to a backend that does not exist.
 */
export default function InterestForm({
  label = "I'm Interested, Game On!",
  variant = "primary",
  size = "md",
  className = "",
}: Props) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [otherText, setOtherText] = useState("");
  const [composed, setComposed] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  function toggleGame(game: string) {
    setSelected((current) =>
      current.includes(game)
        ? current.filter((item) => item !== game)
        : [...current, game],
    );
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const games = selected
      .map((game) =>
        game === "Other" && otherText.trim()
          ? `Other — ${otherText.trim()}`
          : game,
      )
      .join(", ");
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone || "—"}`,
      "",
      `Games of interest: ${games || "—"}`,
    ].join("\n");

    /* Auto-send when a Web3Forms key is configured; otherwise hand off to the
       visitor's mail app with everything pre-filled. */
    if (WEB3FORMS_ACCESS_KEY) {
      setSending(true);
      setError(false);
      try {
        const res = await fetch(WEB3FORMS_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            access_key: WEB3FORMS_ACCESS_KEY,
            subject: "I'm Interested, Game On!",
            from_name: "Avatars Realm website",
            name,
            email,
            phone,
            games,
            message: body,
          }),
        });
        if (!res.ok) throw new Error("Request failed");
        setComposed(true);
      } catch {
        setError(true);
      } finally {
        setSending(false);
      }
      return;
    }

    const mailto = `mailto:info@avatarsrealm.co.za?subject=${encodeURIComponent(
      "I'm Interested, Game On!",
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    setComposed(true);
  }

  const otherSelected = selected.includes("Other");

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setComposed(false);
          setError(false);
          setOpen(true);
        }}
        className={`${BTN_BASE} ${BTN_VARIANT[variant]} ${BTN_SIZE[size]} ${className}`.trim()}
      >
        {label}
      </button>

      {open ? (
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

            {composed ? (
              <div className="mt-6">
                <p className="text-[1rem] leading-relaxed text-paper-200">
                  {WEB3FORMS_ACCESS_KEY
                    ? "Thanks — your enquiry is on its way to the team. They'll reply at"
                    : "Your email app should now be open with the details filled in — press send and the team will reply at"}{" "}
                  <span className="font-semibold text-paper-50">
                    info@avatarsrealm.co.za
                  </span>
                  . If nothing opened, email us directly.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href="mailto:info@avatarsrealm.co.za"
                    className="btn btn-primary btn-md"
                  >
                    Email the team
                  </a>
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
              <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field
                    label="Name"
                    id="if-name"
                    value={name}
                    onChange={setName}
                    required
                  />
                  <Field
                    label="Email"
                    id="if-email"
                    type="email"
                    value={email}
                    onChange={setEmail}
                    required
                  />
                </div>
                <Field
                  label="Phone (optional)"
                  id="if-phone"
                  type="tel"
                  value={phone}
                  onChange={setPhone}
                />

                <fieldset>
                  <legend className="text-[0.8125rem] font-semibold tracking-[0.06em] text-paper-400 uppercase">
                    Games you&apos;re interested in
                  </legend>
                  <p className="mt-1 text-[0.8125rem] text-paper-400">
                    Select one or more.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {GAMES.map((game) => {
                      const active = selected.includes(game);
                      return (
                        <button
                          key={game}
                          type="button"
                          aria-pressed={active}
                          onClick={() => toggleGame(game)}
                          className={`rounded border px-3.5 py-2 text-[0.875rem] font-medium transition-colors ${
                            active
                              ? "border-flame-500 bg-flame-600/15 text-paper-50"
                              : "border-white/12 bg-white/[0.04] text-paper-200 hover:border-white/25"
                          }`}
                        >
                          {game}
                        </button>
                      );
                    })}
                  </div>
                  {otherSelected ? (
                    <div className="mt-4">
                      <Field
                        label="Which game?"
                        id="if-other"
                        value={otherText}
                        onChange={setOtherText}
                        placeholder="Add your game"
                      />
                    </div>
                  ) : null}
                </fieldset>

                {error ? (
                  <p className="text-[0.875rem] leading-relaxed text-flame-400">
                    Something went wrong sending that — please email{" "}
                    {`info@avatarsrealm.co.za`} directly and we&apos;ll take it
                    from there.
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
                  {WEB3FORMS_ACCESS_KEY
                    ? "This sends your details straight to the team's inbox."
                    : "This opens your email app addressed to " +
                      "info@avatarsrealm.co.za" +
                      " with your details filled in — no account required."}
                </p>
              </form>
            )}
          </div>
        </div>
      ) : null}
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
};

function Field({
  label,
  id,
  value,
  onChange,
  type = "text",
  required,
  placeholder,
}: FieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="text-[0.8125rem] font-semibold tracking-[0.06em] text-paper-400 uppercase"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded border border-white/12 bg-white/[0.04] px-3.5 py-2.5 text-[1rem] text-paper-50 placeholder:text-paper-500 focus:border-flame-500 focus:ring-1 focus:ring-flame-500 focus:outline-none"
      />
    </div>
  );
}
