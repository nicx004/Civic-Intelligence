import { Network, Target } from "lucide-react";
import type { RoutingResult } from "@/lib/admin/types";

export function RoutingExplanation({ routing }: { routing: RoutingResult }) {
  return (
    <div className="rounded-2xl border border-teal-100 bg-teal-50/50 p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-teal-600 text-white">
            <Target className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-teal-700">
              Responsible department
            </p>
            <p className="text-lg font-bold text-slate-900">{routing.departmentName}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-teal-200 bg-white px-3 py-1.5 text-xs font-semibold text-teal-700">
          <Network className="h-3.5 w-3.5" aria-hidden="true" />
          {routing.routingSource} &middot; Score {routing.score}
        </div>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-slate-700">{routing.explanation}</p>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Matched assets
          </p>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {routing.matchedAssets.length ? (
              routing.matchedAssets.map((asset) => (
                <span
                  key={asset}
                  className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-700"
                >
                  {asset}
                </span>
              ))
            ) : (
              <span className="text-xs text-slate-400">None</span>
            )}
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Matched issue types
          </p>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {routing.matchedIssueTypes.length ? (
              routing.matchedIssueTypes.map((issue) => (
                <span
                  key={issue}
                  className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-700"
                >
                  {issue}
                </span>
              ))
            ) : (
              <span className="text-xs text-slate-400">None</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
