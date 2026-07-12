import { mockDepartments } from "@/lib/admin/mock-data";
import { DepartmentCard } from "@/components/admin/DepartmentCard";

export default function DepartmentsPage() {
  const totalActive = mockDepartments.reduce((sum, d) => sum + d.activeComplaints, 0);
  const totalPending = mockDepartments.reduce((sum, d) => sum + d.pendingComplaints, 0);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Departments</h1>
        <p className="mt-1 text-sm text-slate-500">
          {mockDepartments.length} municipal departments &middot; {totalActive} active and{" "}
          {totalPending} pending complaints across Chandigarh
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {mockDepartments.map((department) => (
          <DepartmentCard key={department.id} department={department} />
        ))}
      </div>
    </div>
  );
}
