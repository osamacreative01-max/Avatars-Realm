/**
 * Enquiry storage in Supabase, used by the form API routes (insert) and the
 * /admin dashboard (read, status updates, CSV export).
 *
 * Talks to Supabase's REST API directly with the service-role key, so it must
 * only ever run on the server. Needs SUPABASE_URL and
 * SUPABASE_SERVICE_ROLE_KEY; without them storage is skipped and the forms
 * still deliver by email.
 */

export type EnquiryForm = "contact" | "interest";
export type EnquiryStatus = "new" | "contacted" | "closed";

export const ENQUIRY_STATUSES: EnquiryStatus[] = ["new", "contacted", "closed"];

export type Enquiry = {
  id: number;
  created_at: string;
  form: EnquiryForm;
  status: EnquiryStatus;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  programme: string | null;
  games: string | null;
  message: string | null;
  page: string | null;
};

export type NewEnquiry = Omit<Enquiry, "id" | "created_at" | "status">;

function config() {
  const url = process.env.SUPABASE_URL?.replace(/\/+$/, "");
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  return url && key ? { url, key } : null;
}

export function storageConfigured(): boolean {
  return config() !== null;
}

async function rest(path: string, init: RequestInit = {}) {
  const cfg = config();
  if (!cfg) throw new Error("Supabase is not configured");
  /* New-style secret keys (sb_secret_…) are not JWTs and go in the apikey
     header only; a legacy service_role JWT is also sent as the bearer. */
  const auth: Record<string, string> = cfg.key.startsWith("sb_")
    ? {}
    : { Authorization: `Bearer ${cfg.key}` };
  const response = await fetch(`${cfg.url}/rest/v1/${path}`, {
    ...init,
    cache: "no-store",
    headers: {
      apikey: cfg.key,
      ...auth,
      "Content-Type": "application/json",
      ...init.headers,
    },
  });
  if (!response.ok) {
    throw new Error(
      `Supabase ${response.status}: ${(await response.text()).slice(0, 300)}`,
    );
  }
  return response;
}

/**
 * Stores one enquiry. Never throws: a storage failure is logged and the
 * visitor's submission carries on to email delivery.
 */
export async function saveEnquiry(enquiry: NewEnquiry): Promise<void> {
  if (!storageConfigured()) return;
  try {
    await rest("enquiries", {
      method: "POST",
      headers: { Prefer: "return=minimal" },
      body: JSON.stringify(enquiry),
    });
  } catch (error) {
    console.error("[enquiries] could not store the enquiry:", error);
  }
}

export type EnquiryFilters = {
  form?: EnquiryForm;
  status?: EnquiryStatus;
  q?: string;
};

/** Newest first, optionally filtered. */
export async function listEnquiries(
  filters: EnquiryFilters = {},
  limit = 1000,
): Promise<Enquiry[]> {
  const params = new URLSearchParams({
    select: "*",
    order: "created_at.desc",
    limit: String(limit),
  });
  if (filters.form) params.set("form", `eq.${filters.form}`);
  if (filters.status) params.set("status", `eq.${filters.status}`);
  const q = filters.q?.trim().replace(/[(),*%]/g, " ").trim();
  if (q) {
    const like = `*${q}*`;
    params.set(
      "or",
      `(name.ilike.${like},email.ilike.${like},phone.ilike.${like},message.ilike.${like},programme.ilike.${like},games.ilike.${like},subject.ilike.${like})`,
    );
  }
  const response = await rest(`enquiries?${params.toString()}`);
  return (await response.json()) as Enquiry[];
}

export async function setEnquiryStatus(
  id: number,
  status: EnquiryStatus,
): Promise<void> {
  await rest(`enquiries?id=eq.${id}`, {
    method: "PATCH",
    headers: { Prefer: "return=minimal" },
    body: JSON.stringify({ status }),
  });
}
