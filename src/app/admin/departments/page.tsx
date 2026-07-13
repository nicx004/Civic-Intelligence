import { getDepartments } from "@/lib/admin/admin.repository";
import { DepartmentCard } from "@/components/admin/DepartmentCard";

export default async function DepartmentsPage() {
  const departments = await getDepartments();
  const totalActive = departments.reduce((sum, d) => sum + d.activeComplaints, 0);
  const totalPending = departments.reduce((sum, d) => sum + d.pendingComplaints, 0);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Departments</h1>
        <p className="mt-1 text-sm text-slate-500">
          {departments.length} municipal departments &middot; {totalActive} active and{" "}
          {totalPending} pending complaints across Chandigarh
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {departments.map((department) => (
          <DepartmentCard key={department.id} department={department} />
        ))}
      </div>
    </div>
  );
}
