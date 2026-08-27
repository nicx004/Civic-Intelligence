import Link from "next/link";
import type { Report } from "@prisma/client";

import { StatusBadge } from "@/components/admin/StatusBadge";
import { formatDateTime } from "@/lib/admin/format";


type ReportDetailsProps = {
  report: {
    title: string;
    createdAt: Date;
    status: Report["status"];
    description: string;
    ward: string;
    locality: string | null;
    landmark: string | null;
    assignedDepartmentId: string | null;
  };
};

export default function ReportDetails({
  report,
}: ReportDetailsProps) {
  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <Link
        href="/my-reports"
        className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700"
      >
        ← Back to My Reports
      </Link>

      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              {report.title}
            </h1>

            <p className="mt-2 text-slate-500">
              Submitted {formatDateTime(report.createdAt.toISOString())}
            </p>
          </div>

          <StatusBadge status={report.status} />
        </div>
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">
          Description
        </h2>

        <p className="leading-7 text-slate-700">
          {report.description}
        </p>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">
          Location
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <p className="text-sm text-slate-500">Ward</p>
            <p>{report.ward}</p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Locality</p>
            <p>{report.locality}</p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Landmark</p>
            <p>{report.landmark}</p>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">
          Assigned Department
        </h2>

        <p className="text-lg font-medium">
          {report.assignedDepartmentId ?? "Unassigned"}
        </p>
      </section>
    </div>
  );
}