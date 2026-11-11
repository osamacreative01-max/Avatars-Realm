import type { NextRequest } from "next/server";

/**
 * General contact endpoint for every "Contact us" form on the site.
 *
 * Visitors complete the enquiry in the site — this route never sends them to
 * an external mail application. Server-side validation, a honeypot and a
 * simple per-IP rate limit live here; delivery reuses the provider already
 * configured in this repository (Web3Forms, tied to
 * info@avatarsrealm.co.za) rather than adding a second one.
 */

export const runtime = "nodejs";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const SUBJECTS = [
  "General enquiry",
  "Academy programmes",
  "Memberships & lounge",
  "League, tournaments & events",
  "Schools & groups",
  "Partnerships",
  "Other",
] as const;

/* Soft, in-memory rate limit: at most RATE_MAX submissions per IP inside a
   rolling window. Each serverless instance keeps its own map, so this slows
   scripted abuse without pretending to be a global quota. */
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter(
    (at) => now - at < RATE_WINDOW_MS,
  );
  const over = recent.length >= RATE_MAX;
  if (!over) recent.push(now);
  if (recent.length > RATE_MAX * 2) recent.splice(0, recent.length - RATE_MAX);
  hits.set(ip, recent);
  return over;
}

function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

type Body = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  consent: boolean;
  page: string;
  website: string;
};

function readBody(raw: unknown): Body {
  const data = (typeof raw === "object" && raw !== null ? raw : {}) as Record<
    string,
    unknown
  >;

  return {
    firstName: asString(data.firstName),
    lastName: asString(data.lastName),
    email: asString(data.email),
    phone: asString(data.phone),
    subject: asString(data.subject),
    message: asString(data.message),
    consent: data.consent === true,
    page: asString(data.page),
    website: asString(data.website),
  };
}

function validate(body: Body): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!body.firstName) errors.firstName = "Please enter your name.";
  if (!body.lastName) errors.lastName = "Please enter your surname.";

  if (!body.email) {
    errors.email = "Please enter your email address.";
  } else if (!EMAIL_RE.test(body.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!body.phone) errors.phone = "Please enter a contact number.";
  if (!body.message) errors.message = "Please type your message.";

  if (!body.consent) {
    errors.consent = "Please tick the box so the team can reply to you.";
  }

  return errors;
}

export async function POST(request: NextRequest) {
  const ip =
    request.headers
      .get("x-forwarded-for")
      ?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (rateLimited(ip)) {
    return Response.json(
      {
        ok: false,
        error:
          "Too many attempts from this connection. Please wait a few minutes and try again.",
      },
      { status: 429 },
    );
  }

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return Response.json(
      { ok: false, error: "That request could not be read." },
      { status: 400 },
    );
  }

  const body = readBody(raw);

  /* Honeypot: a filled "website" field means a bot. Answer with success so
     nothing learns which field gave it away, and send nothing. */
  if (body.website) {
    return Response.json({ ok: true });
  }

  const errors = validate(body);
  if (Object.keys(errors).length > 0) {
    return Response.json({ ok: false, errors }, { status: 400 });
  }

  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
  if (!accessKey) {
    console.error(
      "[contact] WEB3FORMS_ACCESS_KEY is not set — cannot deliver the enquiry.",
    );
    return Response.json(
      {
        ok: false,
        error:
          "Sending is temporarily unavailable. Please try again in a few minutes.",
      },
      { status: 500 },
    );
  }

  const submittedAt = new Date().toISOString();
  const subject = (SUBJECTS as readonly string[]).includes(body.subject)
    ? body.subject
    : body.subject || "General enquiry";
  const fullName = `${body.firstName} ${body.lastName}`.trim();

  const message = [
    `Name: ${body.firstName}`,
    `Surname: ${body.lastName}`,
    `Email: ${body.email}`,
    `Contact number: ${body.phone}`,
    `Subject: ${subject}`,
    "Consent given: yes",
    "",
    "Message:",
    body.message,
    "",
    `Page: ${body.page || "(not provided)"}`,
    `Submitted at: ${submittedAt}`,
  ].join("\n");

  try {
    const response = await fetch(WEB3FORMS_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `Contact form — ${subject} — Avatars Realm website`,
        from_name: "Avatars Realm website",
        /* Web3Forms sets the message Reply-To from the `email` field, so the
           team's reply goes back to the visitor. */
        name: fullName,
        email: body.email,
        phone: body.phone,
        message,
        page: body.page,
        submitted_at: submittedAt,
        /* Web3Forms' own honeypot field, kept empty. */
        botcheck: "",
      }),
    });

    if (!response.ok) {
      throw new Error(`Web3Forms responded ${response.status}`);
    }

    return Response.json({ ok: true });
  } catch (error) {
    console.error("[contact] delivery failed:", error);
    return Response.json(
      {
        ok: false,
        error:
          "We could not send that just now. Please try again in a moment.",
      },
      { status: 502 },
    );
  }
}
