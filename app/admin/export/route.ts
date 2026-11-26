import type { NextRequest } from "next/server";

import { isAdmin } from "@/lib/admin-auth";
import {
  ENQUIRY_STATUSES,
  listEnquiries,
  type EnquiryForm,
  type EnquiryStatus,
} from "@/lib/enquiries";

export const runtime = "nodejs";

const COLUMNS = [
  ["Received", "created_at"],
  ["Form", "form"],
  ["Status", "status"],
  ["Name", "name"],
  ["Email", "email"],
  ["Phone", "phone"],
  ["Subject", "subject"],
  ["Programme", "programme"],
  ["Games", "games"],
  ["Message", "message"],
  ["Page", "page"],
] as const;

/* "2026-11-26 19:39" in South African time — sorts correctly and Excel
   reads it as a date. */
const receivedFormat = new Intl.DateTimeFormat("sv-SE", {
  dateStyle: "short",
  timeStyle: "short",
  timeZone: "Africa/Johannesburg",
});

/** Quotes a CSV cell, and defuses values Excel would run as a formula. */
function cell(value: unknown): string {
  let text = value == null ? "" : String(value);
  if (/^[=+\-@\t\r]/.test(text)) text = `'${text}`;
  return `"${text.replace(/"/g, '""')}"`;
}

/** Downloads the (optionally filtered) enquiries as a spreadsheet file. */
export async function GET(request: NextRequest) {
  if (!(await isAdmin())) {
    return new Response("Not signed in.", { status: 401 });
  }

  const params = request.nextUrl.searchParams;
  const formParam = params.get("form");
  const statusParam = params.get("status");
  const form =
    formParam === "contact" || formParam === "interest"
      ? (formParam as EnquiryForm)
      : undefined;
  const status = (ENQUIRY_STATUSES as string[]).includes(statusParam ?? "")
    ? (statusParam as EnquiryStatus)
    : undefined;
  const q = params.get("q")?.slice(0, 100) ?? "";

  const rows = await listEnquiries({ form, status, q }, 10000);

  const lines = [
    COLUMNS.map(([label]) => cell(label)).join(","),
    ...rows.map((row) =>
      COLUMNS.map(([, key]) =>
        cell(
          key === "created_at"
            ? receivedFormat.format(new Date(row.created_at))
            : row[key],
        ),
      ).join(","),
    ),
  ];
  const date = new Date().toISOString().slice(0, 10);

  /* The leading BOM makes Excel read the file as UTF-8 (names, em dashes). */
  return new Response(`﻿${lines.join("\r\n")}`, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="avatars-realm-enquiries-${date}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
