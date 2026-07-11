import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, MapPin } from "lucide-react";
import { mockComplaints, mockDepartments } from "@/lib/admin/mock-data";
import { formatDate, formatNumber } from "@/lib/admin/format";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { CategoryTag } from "@/components/admin/CategoryTag";

export function generateStaticParams() {
  return mockDepartments.map((department) => ({ id: department.id }));
}

export default async function DepartmentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const department = mockDepartments.find((item) => item.id === id);

  if (!department) {
    notFound();
  }

  const assignedComplaints = mockComplaints
    .filter((complaint) => complaint.routing.departmentId === department.id)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const total = department.activeComplaints + department.pendingComplaints + department.resolvedComplaints;

  return (
    <div className="flex flex-col gap-6">
      <Link
        href="/admin/departments"
        className="inline-flex w-fit items-center gap-1 text-sm font-medium text-slate-500 hover:text-teal-700"
      >
        <ChevronLeft className="h-4 w-4" aria-hidden="true" />
        Back to departments
      </Link>

      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">{department.name}</h1>
        <p className="mt-1 text-sm text-slate-500">{formatNumber(total)} total complaints on record</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="card p-5">
          <p className="text-xs font-medium text-slate-500">Pending</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">{department.pendingComplaints}</p>
        </div>
        <div className="card p-5">
          <p className="text-xs font-medium text-slate-500">Active</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">{department.activeComplaints}</p>
        </div>
        <div className="card p-5">
          <p className="text-xs font-medium text-slate-500">Resolved</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">{department.resolvedComplaints}</p>
        </div>
        <div className="card p-5">
          <p className="text-xs font-medium text-slate-500">Resolution rate</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">{department.resolutionRate}%</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="card p-6 lg:col-span-2">
          <h2 className="text-base font-semibold text-slate-900">Recently assigned complaints</h2>
          {assignedComplaints.length === 0 ? (
            <p className="mt-3 text-sm text-slate-500">
              No complaints in the current mock dataset are assigned to this department.
            </p>
          ) : (
            <ul className="mt-3 divide-y divide-slate-100">
              {assignedComplaints.map((complaint) => (
                <li key={complaint.id} className="py-3">
                  <Link
                    href={`/admin/complaints/${complaint.id}`}
                    className="flex items-center justify-between gap-4"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-slate-900">
                        {complaint.title}
                      </p>
                      <p className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                        <MapPin className="h-3 w-3 flex-none" aria-hidden="true" />
                        {complaint.locality} &middot; {formatDate(complaint.createdAt)}
                      </p>
                    </div>
                    <StatusBadge status={complaint.status} className="flex-none" />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex flex-col gap-6">
          <div className="card p-6">
            <h2 className="text-sm font-semibold text-slate-900">Categories handled</h2>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {department.categoriesHandled.map((category) => (
                <CategoryTag key={category} category={category} />
              ))}
            </div>
          </div>
          <div className="card p-6">
            <h2 className="text-sm font-semibold text-slate-900">Assets maintained</h2>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {department.assetsHandled.map((asset) => (
                <span
                  key={asset}
                  className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700"
                >
                  {asset}
                </span>
              ))}
            </div>
          </div>
          <div className="card p-6">
            <h2 className="text-sm font-semibold text-slate-900">Issue types managed</h2>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {department.issueTypesHandled.map((issue) => (
                <span
                  key={issue}
                  className="rounded-full border border-teal-200 bg-teal-50 px-2.5 py-1 text-xs font-medium text-teal-700"
                >
                  {issue}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
