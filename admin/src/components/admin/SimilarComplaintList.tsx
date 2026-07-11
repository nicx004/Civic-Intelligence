import Link from "next/link";
import type { SimilarComplaint } from "@/lib/admin/types";
import { formatSimilarity } from "@/lib/admin/format";
import { StatusBadge } from "./StatusBadge";

export function SimilarComplaintList({
  items,
  knownIds = [],
}: {
  items: SimilarComplaint[];
  knownIds?: string[];
}) {
  if (items.length === 0) {
    return (
      <p className="text-sm text-slate-500">
        No closely related historical complaints were found for this submission.
      </p>
    );
  }

  return (
    <ul className="flex flex-col divide-y divide-slate-100">
      {items.map((item) => (
        <li key={item.complaintId} className="flex items-center justify-between gap-4 py-3">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-900">{item.title}</p>
            <div className="mt-1 flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-xs font-medium text-slate-600">
                {item.category}
              </span>
              {item.status ? <StatusBadge status={item.status} /> : null}
            </div>
          </div>
          <div className="flex flex-none items-center gap-3">
            <span className="text-sm font-semibold text-teal-700">
              {formatSimilarity(item.similarity)}
            </span>
            {knownIds.includes(item.complaintId) ? (
              <Link
                href={`/admin/complaints/${item.complaintId}`}
                className="text-xs font-semibold text-slate-500 underline-offset-2 hover:text-teal-700 hover:underline"
              >
                View
              </Link>
            ) : (
              <span className="text-xs font-medium text-slate-300">Archived</span>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
