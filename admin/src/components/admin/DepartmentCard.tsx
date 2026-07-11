import Link from "next/link";
import { ArrowRight, Building2 } from "lucide-react";
import type { Department } from "@/lib/admin/types";
import { formatNumber } from "@/lib/admin/format";
import { cn } from "@/lib/utils";

function workloadLevel(active: number) {
  if (active >= 60) return { label: "High workload", className: "bg-rose-50 text-rose-700 border-rose-200" };
  if (active >= 20) return { label: "Moderate workload", className: "bg-amber-50 text-amber-700 border-amber-200" };
  return { label: "Light workload", className: "bg-emerald-50 text-emerald-700 border-emerald-200" };
}

export function DepartmentCard({ department }: { department: Department }) {
  const workload = workloadLevel(department.activeComplaints);
  const total =
    department.activeComplaints + department.pendingComplaints + department.resolvedComplaints;

  return (
    <Link
      href={`/admin/departments/${department.id}`}
      className="card group flex flex-col gap-4 p-6 transition hover:border-teal-200 hover:shadow-lg"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-slate-100 text-slate-600 group-hover:bg-teal-50 group-hover:text-teal-700">
            <Building2 className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <p className="font-semibold text-slate-900">{department.name}</p>
            <p className="text-xs text-slate-500">{formatNumber(total)} total complaints</p>
          </div>
        </div>
        <ArrowRight
          className="h-4 w-4 flex-none text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-teal-600"
          aria-hidden="true"
        />
      </div>

      <span
        className={cn(
          "inline-flex w-fit items-center rounded-full border px-2.5 py-1 text-xs font-semibold",
          workload.className,
        )}
      >
        {workload.label}
      </span>

      <div className="grid grid-cols-3 gap-2 border-t border-slate-100 pt-4 text-center">
        <div>
          <p className="text-lg font-bold text-slate-900">{department.pendingComplaints}</p>
          <p className="text-xs text-slate-500">Pending</p>
        </div>
        <div>
          <p className="text-lg font-bold text-slate-900">{department.activeComplaints}</p>
          <p className="text-xs text-slate-500">Active</p>
        </div>
        <div>
          <p className="text-lg font-bold text-slate-900">{department.resolvedComplaints}</p>
          <p className="text-xs text-slate-500">Resolved</p>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>Resolution rate</span>
          <span className="font-semibold text-slate-700">{department.resolutionRate}%</span>
        </div>
        <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-teal-600"
            style={{ width: `${department.resolutionRate}%` }}
          />
        </div>
      </div>
    </Link>
  );
}
