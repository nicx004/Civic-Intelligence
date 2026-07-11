import Link from "next/link";
import { ChevronRight, MapPin } from "lucide-react";
import type { AdminComplaint } from "@/lib/admin/types";
import { formatDate } from "@/lib/admin/format";
import { CategoryTag } from "./CategoryTag";
import { StatusBadge } from "./StatusBadge";

export function ComplaintTable({ complaints }: { complaints: AdminComplaint[] }) {
  if (complaints.length === 0) {
    return (
      <div className="card p-10 text-center">
        <p className="text-sm font-medium text-slate-500">
          No complaints match the current filters.
        </p>
      </div>
    );
  }

  return (
    <div className="card overflow-hidden">
      {/* Desktop table */}
      <table className="hidden w-full text-left text-sm md:table">
        <thead className="border-b border-slate-100 bg-slate-50/60 text-xs uppercase tracking-wide text-slate-500">
          <tr>
            <th scope="col" className="px-5 py-3 font-semibold">
              Complaint
            </th>
            <th scope="col" className="px-5 py-3 font-semibold">
              Category
            </th>
            <th scope="col" className="px-5 py-3 font-semibold">
              Department
            </th>
            <th scope="col" className="px-5 py-3 font-semibold">
              Status
            </th>
            <th scope="col" className="px-5 py-3 font-semibold">
              Submitted
            </th>
            <th scope="col" className="px-5 py-3 text-right font-semibold">
              <span className="sr-only">View</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {complaints.map((complaint) => (
            <tr key={complaint.id} className="transition hover:bg-slate-50/70">
              <td className="max-w-xs px-5 py-4">
                <Link
                  href={`/admin/complaints/${complaint.id}`}
                  className="font-semibold text-slate-900 hover:text-teal-700"
                >
                  {complaint.title}
                </Link>
                <p className="mt-1 flex items-center gap-1 truncate text-xs text-slate-500">
                  <MapPin className="h-3 w-3 flex-none" aria-hidden="true" />
                  {complaint.locality}
                </p>
              </td>
              <td className="px-5 py-4">
                <CategoryTag category={complaint.category} />
              </td>
              <td className="px-5 py-4 text-slate-700">{complaint.routing.departmentName}</td>
              <td className="px-5 py-4">
                <StatusBadge status={complaint.status} />
              </td>
              <td className="px-5 py-4 text-slate-500">{formatDate(complaint.createdAt)}</td>
              <td className="px-5 py-4 text-right">
                <Link
                  href={`/admin/complaints/${complaint.id}`}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-teal-700 hover:underline"
                >
                  View
                  <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile cards */}
      <ul className="divide-y divide-slate-100 md:hidden">
        {complaints.map((complaint) => (
          <li key={complaint.id} className="p-4">
            <Link href={`/admin/complaints/${complaint.id}`} className="flex flex-col gap-2">
              <div className="flex items-start justify-between gap-3">
                <p className="font-semibold text-slate-900">{complaint.title}</p>
                <StatusBadge status={complaint.status} className="flex-none" />
              </div>
              <p className="flex items-center gap-1 text-xs text-slate-500">
                <MapPin className="h-3 w-3 flex-none" aria-hidden="true" />
                {complaint.locality}
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <CategoryTag category={complaint.category} />
                <span className="text-xs text-slate-400">&middot;</span>
                <span className="text-xs text-slate-600">{complaint.routing.departmentName}</span>
              </div>
              <p className="text-xs text-slate-400">Submitted {formatDate(complaint.createdAt)}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
