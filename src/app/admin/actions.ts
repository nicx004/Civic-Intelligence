"use server";

import { revalidatePath } from "next/cache";

import {
  updateComplaintStatus,
  reassignComplaint,
} from "@/lib/admin/admin.repository";

function revalidateAdmin(id: string) {
  revalidatePath("/admin");
  revalidatePath("/admin/complaints");
  revalidatePath(`/admin/complaints/${id}`);
  revalidatePath("/admin/departments");
  revalidatePath("/admin/analytics");
}

export async function verifyComplaint(id: string) {
  await updateComplaintStatus(id, "VERIFIED");
  revalidateAdmin(id);
}

export async function rejectComplaint(id: string) {
  await updateComplaintStatus(id, "REJECTED");
  revalidateAdmin(id);
}

export async function resolveComplaint(id: string) {
  await updateComplaintStatus(id, "RESOLVED");
  revalidateAdmin(id);
}

export async function moveComplaint(
  id: string,
  departmentId: string
) {
  await reassignComplaint(id, departmentId);
  revalidateAdmin(id);
}