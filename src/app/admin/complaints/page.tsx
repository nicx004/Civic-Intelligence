import { getAdminComplaints } from "@/lib/admin/admin.repository";
import ComplaintsClient from "./ComplaintsClient";

export default async function ComplaintsPage() {
  const complaints = await getAdminComplaints();

  return <ComplaintsClient complaints={complaints} />;
}