/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  ADMIN_COOKIE,
  createAdminSession,
  isAdmin,
  sessionCookieOptions,
  verifyPassword,
} from "@/lib/admin-auth";
import { createProject, ProjectValidationError } from "@/lib/db/projects";
import { deleteContact, updateContactStatus } from "@/lib/db/contacts";
import { CONTACT_STATUSES, type ContactStatus } from "@/lib/db/schema";

export interface ActionResult {
  success: boolean;
  error?: string;
  fields?: Record<string, string>;
}

export async function loginAction(formData: FormData): Promise<void> {
  const password = String(formData.get("password") ?? "");
  if (!verifyPassword(password)) {
    redirect("/admin/login?error=1");
  }
  cookies().set(ADMIN_COOKIE, createAdminSession(), sessionCookieOptions());
  redirect("/admin/inquiries");
}

export async function logoutAction(): Promise<void> {
  cookies().delete(ADMIN_COOKIE);
}

export async function createProjectAction(formData: any): Promise<ActionResult> {
  if (!isAdmin()) {
    return { success: false, error: "Unauthorized." };
  }

  try {
    await createProject(formData);
    revalidatePath("/projects");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    if (error instanceof ProjectValidationError) {
      return { success: false, error: error.message, fields: error.fields };
    }
    console.error("[admin] create project failed:", error);
    return { success: false, error: "Could not save the project." };
  }
}

/** Form-action wrappers return void so they can be bound directly to <form action>. */
export async function setContactStatusAction(id: string, status: string): Promise<void> {
  if (!isAdmin()) return;
  if (!CONTACT_STATUSES.includes(status as ContactStatus)) return;
  try {
    await updateContactStatus(id, status as ContactStatus);
  } catch (error) {
    console.error("[admin] update contact failed:", error);
  }
  revalidatePath("/admin/inquiries");
}

export async function deleteContactAction(id: string): Promise<void> {
  if (!isAdmin()) return;
  try {
    await deleteContact(id);
  } catch (error) {
    console.error("[admin] delete contact failed:", error);
  }
  revalidatePath("/admin/inquiries");
}