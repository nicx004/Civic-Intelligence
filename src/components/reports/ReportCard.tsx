import Link from "next/link";
import type { Report } from "@prisma/client";

import { StatusBadge } from "@/components/admin/StatusBadge";
import { formatDate } from "@/lib/admin/format";

type Props = {
  report: Report;
};

export default function ReportCard({ report }: Props) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            {report.title}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Submitted on {formatDate(report.createdAt.toISOString())}
          </p>

          {report.assignedDepartmentId && (
            <p className="mt-2 text-sm text-slate-600">
              Assigned Department:{" "}
              <span className="font-medium">
                {report.assignedDepartmentId}
              </span>
            </p>
          )}
        </div>

        <StatusBadge status={report.status as any} />
      </div>

      <div className="mt-6 flex justify-end">
        <Link
          href={`/my-reports/${report.id}`}
          className="font-medium text-blue-600 transition hover:text-blue-700"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
}