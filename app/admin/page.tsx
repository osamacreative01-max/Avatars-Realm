import type { Metadata } from "next";
import Link from "next/link";
import { connection } from "next/server";

import { adminConfigured, isAdmin } from "@/lib/admin-auth";
import {
  ENQUIRY_STATUSES,
  listEnquiries,
  storageConfigured,
  type Enquiry,
  type EnquiryForm,
  type EnquiryStatus,
} from "@/lib/enquiries";

import { logout } from "./actions";
import LoginForm from "./LoginForm";
import StatusSelect from "./StatusSelect";

export const metadata: Metadata = {
  title: "Enquiries dashboard",
  robots: { index: false, follow: false },
};

const FORM_LABELS: Record<EnquiryForm, string> = {
  contact: "Contact form",
  interest: "I'm Interested",
};

const dateFormat = new Intl.DateTimeFormat("en-ZA", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Africa/Johannesburg",
});

function pick<T extends string>(value: unknown, allowed: readonly T[]) {
  return typeof value === "string" && (allowed as readonly string[]).includes(value)
    ? (value as T)
    : undefined;
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <section className="section">
      <div className="container-page">{children}</div>
    </section>
  );
}

function Notice({ title, body }: { title: string; body: React.ReactNode }) {
  return (
    <Shell>
      <div className="card card-pad mx-auto max-w-xl">
        <h1 className="display-3">{title}</h1>
        <div className="mt-4 text-[1rem] leading-relaxed text-paper-300">
          {body}
        </div>
      </div>
    </Shell>
  );
}

function Details({ enquiry }: { enquiry: Enquiry }) {
  const rows: [string, string | null][] =
    enquiry.form === "contact"
      ? [
          ["Subject", enquiry.subject],
          ["Message", enquiry.message],
        ]
      : [
          ["Programme", enquiry.programme],
          ["Games", enquiry.games],
        ];

  return (
    <dl className="space-y-1">
      {rows
        .filter(([, value]) => value)
        .map(([label, value]) => (
          <div key={label}>
            <dt className="inline text-paper-400">{label}: </dt>
            <dd className="inline whitespace-pre-line text-paper-200">
              {value}
            </dd>
          </div>
        ))}
    </dl>
  );
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  /* Always render per request: the environment variables and the sign-in
     cookie decide what this page shows, so it must never be prerendered. */
  await connection();

  if (!adminConfigured()) {
    return (
      <Notice
        title="Dashboard not set up"
        body={
          <p>
            Set <code>ADMIN_PASSWORD</code> in the hosting environment
            variables to enable this page.
          </p>
        }
      />
    );
  }

  if (!(await isAdmin())) {
    return (
      <Shell>
        <div className="card card-pad mx-auto max-w-md">
          <p className="eyebrow">Avatars Realm</p>
          <h1 className="display-3 mt-3">Enquiries dashboard</h1>
          <p className="mt-3 text-paper-300">
            Sign in to see form submissions.
          </p>
          <LoginForm />
        </div>
      </Shell>
    );
  }

  if (!storageConfigured()) {
    return (
      <Notice
        title="Database not connected"
        body={
          <p>
            Set <code>SUPABASE_URL</code> and{" "}
            <code>SUPABASE_SERVICE_ROLE_KEY</code> in the hosting environment
            variables, then run <code>supabase/enquiries.sql</code> in the
            Supabase SQL editor.
          </p>
        }
      />
    );
  }

  const params = await searchParams;
  const form = pick<EnquiryForm>(params.form, ["contact", "interest"]);
  const status = pick<EnquiryStatus>(params.status, ENQUIRY_STATUSES);
  const q = typeof params.q === "string" ? params.q.slice(0, 100) : "";

  let enquiries: Enquiry[] = [];
  let loadError = false;
  try {
    enquiries = await listEnquiries({ form, status, q });
  } catch (error) {
    console.error("[admin] could not load enquiries:", error);
    loadError = true;
  }

  const exportQuery = new URLSearchParams();
  if (form) exportQuery.set("form", form);
  if (status) exportQuery.set("status", status);
  if (q) exportQuery.set("q", q);
  const exportHref = `/admin/export/${exportQuery.size ? `?${exportQuery}` : ""}`;

  const counts = {
    total: enquiries.length,
    new: enquiries.filter((e) => e.status === "new").length,
    contact: enquiries.filter((e) => e.form === "contact").length,
    interest: enquiries.filter((e) => e.form === "interest").length,
  };

  return (
    <Shell>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow">Admin</p>
          <h1 className="display-2 mt-3">Enquiries</h1>
        </div>
        <div className="flex flex-wrap gap-3">
          {/* A plain link: the export route returns a file download. */}
          <a
            href={exportHref}
            className="rounded bg-flame-600 px-4 py-2.5 text-[0.9375rem] font-semibold text-white transition-colors hover:bg-flame-500"
          >
            Download spreadsheet (CSV)
          </a>
          <form action={logout}>
            <button
              type="submit"
              className="rounded border border-white/15 px-4 py-2.5 text-[0.9375rem] font-semibold text-paper-100 transition-colors hover:border-white/30"
            >
              Sign out
            </button>
          </form>
        </div>
      </div>

      <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.07] sm:grid-cols-4">
        {[
          ["Showing", counts.total],
          ["New", counts.new],
          ["Contact form", counts.contact],
          ["I'm Interested", counts.interest],
        ].map(([label, value]) => (
          <div key={label} className="bg-ink-900 px-5 py-4">
            <dt className="text-[0.75rem] font-semibold tracking-[0.14em] text-paper-400 uppercase">
              {label}
            </dt>
            <dd className="mt-1 text-[1.75rem] font-bold text-paper-50">
              {value}
            </dd>
          </div>
        ))}
      </dl>

      <form
        method="get"
        className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
      >
        <input
          type="search"
          name="q"
          defaultValue={q}
          placeholder="Search name, email, phone, message…"
          className="rounded border border-white/15 bg-ink-900 px-4 py-2.5 text-paper-50 outline-none focus:border-azure-500 sm:w-80"
        />
        <select
          name="form"
          defaultValue={form ?? ""}
          aria-label="Form"
          className="rounded border border-white/15 bg-ink-900 px-3 py-2.5 text-paper-100"
        >
          <option value="">All forms</option>
          <option value="contact">Contact form</option>
          <option value="interest">I&apos;m Interested</option>
        </select>
        <select
          name="status"
          defaultValue={status ?? ""}
          aria-label="Status"
          className="rounded border border-white/15 bg-ink-900 px-3 py-2.5 text-paper-100"
        >
          <option value="">All statuses</option>
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="closed">Closed</option>
        </select>
        <button
          type="submit"
          className="rounded border border-azure-500/60 px-4 py-2.5 font-semibold text-azure-400 transition-colors hover:bg-azure-500/10"
        >
          Filter
        </button>
        {form || status || q ? (
          <Link href="/admin/" className="text-[0.9375rem] text-paper-400 underline">
            Clear
          </Link>
        ) : null}
      </form>

      {loadError ? (
        <p role="alert" className="mt-8 text-flame-400">
          Could not load enquiries from the database. Check the Supabase
          settings and that <code>supabase/enquiries.sql</code> has been run.
        </p>
      ) : enquiries.length === 0 ? (
        <p className="mt-8 text-paper-300">No enquiries match.</p>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-lg border border-white/[0.08]">
          <table className="w-full min-w-[56rem] text-left text-[0.875rem]">
            <thead className="bg-ink-900 text-[0.75rem] tracking-[0.12em] text-paper-400 uppercase">
              <tr>
                <th className="px-4 py-3 font-semibold">Received</th>
                <th className="px-4 py-3 font-semibold">Form</th>
                <th className="px-4 py-3 font-semibold">Name</th>
                <th className="px-4 py-3 font-semibold">Contact</th>
                <th className="px-4 py-3 font-semibold">Details</th>
                <th className="px-4 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06]">
              {enquiries.map((enquiry) => (
                <tr key={enquiry.id} className="align-top hover:bg-white/[0.02]">
                  <td className="px-4 py-3 whitespace-nowrap text-paper-300">
                    {dateFormat.format(new Date(enquiry.created_at))}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-paper-300">
                    {FORM_LABELS[enquiry.form]}
                  </td>
                  <td className="px-4 py-3 font-semibold text-paper-50">
                    {enquiry.name}
                  </td>
                  <td className="px-4 py-3">
                    <a
                      href={`mailto:${enquiry.email}`}
                      className="block text-azure-400 hover:underline"
                    >
                      {enquiry.email}
                    </a>
                    {enquiry.phone ? (
                      <a
                        href={`tel:${enquiry.phone}`}
                        className="mt-1 block text-paper-300 hover:underline"
                      >
                        {enquiry.phone}
                      </a>
                    ) : null}
                  </td>
                  <td className="max-w-[28rem] px-4 py-3">
                    <Details enquiry={enquiry} />
                  </td>
                  <td className="px-4 py-3">
                    <StatusSelect id={enquiry.id} status={enquiry.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Shell>
  );
}
