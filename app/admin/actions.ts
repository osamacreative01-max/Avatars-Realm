"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import {
  endAdminSession,
  isAdmin,
  passwordMatches,
  startAdminSession,
} from "@/lib/admin-auth";
import {
  ENQUIRY_STATUSES,
  setEnquiryStatus,
  type EnquiryStatus,
} from "@/lib/enquiries";

export type LoginState = { error?: string } | undefined;

export async function login(
  _previous: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const password = String(formData.get("password") ?? "");
  if (!passwordMatches(password)) {
    return { error: "That password is not correct." };
  }
  await startAdminSession();
  redirect("/admin/");
}

export async function logout(): Promise<void> {
  await endAdminSession();
  redirect("/admin/");
}

export async function updateStatus(formData: FormData): Promise<void> {
  if (!(await isAdmin())) redirect("/admin/");

  const id = Number(formData.get("id"));
  const status = String(formData.get("status")) as EnquiryStatus;
  if (!Number.isInteger(id) || !ENQUIRY_STATUSES.includes(status)) return;

  await setEnquiryStatus(id, status);
  revalidatePath("/admin/");
}
