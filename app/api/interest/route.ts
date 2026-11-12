import type { NextRequest } from "next/server";

/**
 * Interest form endpoint for every "I'm Interested, Game On!" button.
 *
 * Server-side validation, a honeypot field and a simple per-IP rate limit
 * live here, so the browser only ever posts plain field values and no
 * credential ships in client code. Delivery reuses the provider already
 * configured in this repository (Web3Forms, tied to info@avatarsrealm.co.za)
 * rather than adding a second one.
 *
 * TODO(client-confirm): update 02 suggests Resend with RESEND_API_KEY,
 * INTEREST_TO_EMAIL and INTEREST_FROM_EMAIL. Web3Forms was already wired up,
 * so the handoff's "reuse an existing provider" clause applies — say the word
 * and this handler swaps to Resend without touching the client.
 */

export const runtime = "nodejs";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

/** Options offered by the form, in the order the copy deck lists them. */
const GAMES = [
  "EA Sports FC 26",
  "Call of Duty",
  "Valorant",
  "PUBG Mobile",
  "League of Legends",
  "Other",
] as const;

/** Single-select programmes offered by the academy entry points. */
const PROGRAMMES = ["Beginner", "Intermediate", "Pro"] as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/* ------------------------------------------------------------------ limits */
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

/* -------------------------------------------------------------- validation */
function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

type Body = {
  name: string;
  email: string;
  phone: string;
  /**
   * null = the field was never shown (the Championship entry point), so it
   * is not required. Any other value must be one of PROGRAMMES.
   */
  programme: string | null;
  games: string[];
  otherText: string;
  consent: boolean;
  page: string;
  website: string;
};

function readBody(raw: unknown): Body {
  const data = (typeof raw === "object" && raw !== null ? raw : {}) as Record<
    string,
    unknown
  >;
  const games = Array.isArray(data.games)
    ? data.games.filter((game): game is string => typeof game === "string")
    : [];

  return {
    name: asString(data.name),
    email: asString(data.email),
    phone: asString(data.phone),
    /* An absent key means the field was hidden for this submission. */
    programme: "programme" in data ? asString(data.programme) : null,
    games,
    otherText: asString(data.otherText),
    consent: data.consent === true,
    page: asString(data.page),
    website: asString(data.website),
  };
}

function validate(body: Body): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!body.name) errors.name = "Please enter your full name.";

  if (!body.email) {
    errors.email = "Please enter your email address.";
  } else if (!EMAIL_RE.test(body.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!body.phone) errors.phone = "Please enter a phone or WhatsApp number.";

  /* Only required when the field was actually shown for this entry point. */
  if (body.programme !== null) {
    if (!body.programme) {
      errors.programme = "Select a programme of interest.";
    } else if (!(PROGRAMMES as readonly string[]).includes(body.programme)) {
      errors.programme = "Select your programme from the list.";
    }
  }

  if (body.games.length === 0) {
    errors.games = "Select at least one game.";
  } else {
    const allowed = GAMES as readonly string[];
    if (body.games.some((game) => !allowed.includes(game))) {
      errors.games = "Select your games from the list.";
    }
    if (body.games.includes("Other") && !body.otherText) {
      errors.otherText = "Tell us which game you mean.";
    }
  }

  if (!body.consent) {
    errors.consent = "Please tick the box so the team can reply to you.";
  }

  return errors;
}

/* ------------------------------------------------------------------ handler */
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
     nothing learns which field gave it away, and store/send nothing. */
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
      "[interest] WEB3FORMS_ACCESS_KEY is not set — cannot deliver the enquiry.",
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
  const gamesLabel = body.games
    .map((game) =>
      game === "Other" && body.otherText ? `Other — ${body.otherText}` : game,
    )
    .join(", ");

  const message = [
    `Full name: ${body.name}`,
    `Email: ${body.email}`,
    `Phone / WhatsApp: ${body.phone}`,
    ...(body.programme !== null
      ? [`Programme of interest: ${body.programme}`]
      : []),
    `Games of interest: ${gamesLabel}`,
    "Consent given: yes",
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
        subject: "I'm Interested, Game On! — Avatars Realm website",
        from_name: "Avatars Realm website",
        /* Web3Forms sets the message Reply-To from the `email` field, so the
           team's reply goes back to the visitor. */
        name: body.name,
        email: body.email,
        phone: body.phone,
        programme: body.programme ?? "",
        games: gamesLabel,
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
    console.error("[interest] delivery failed:", error);
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
