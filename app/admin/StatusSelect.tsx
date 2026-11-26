"use client";

import { useRef } from "react";

import type { EnquiryStatus } from "@/lib/enquiries";

import { updateStatus } from "./actions";

const LABELS: Record<EnquiryStatus, string> = {
  new: "New",
  contacted: "Contacted",
  closed: "Closed",
};

const TONES: Record<EnquiryStatus, string> = {
  new: "border-flame-600/60 text-flame-400",
  contacted: "border-azure-500/60 text-azure-400",
  closed: "border-white/15 text-paper-400",
};

/** Saves as soon as a new status is picked — no separate save button. */
export default function StatusSelect({
  id,
  status,
}: {
  id: number;
  status: EnquiryStatus;
}) {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form ref={formRef} action={updateStatus}>
      <input type="hidden" name="id" value={id} />
      <select
        name="status"
        defaultValue={status}
        aria-label="Enquiry status"
        onChange={() => formRef.current?.requestSubmit()}
        className={`rounded border bg-ink-900 px-2 py-1.5 text-[0.8125rem] font-semibold ${TONES[status]}`}
      >
        {(Object.keys(LABELS) as EnquiryStatus[]).map((value) => (
          <option key={value} value={value}>
            {LABELS[value]}
          </option>
        ))}
      </select>
    </form>
  );
}
