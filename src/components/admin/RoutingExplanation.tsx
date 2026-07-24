import { Network, Target } from "lucide-react";
import type { RoutingResult } from "@/lib/admin/types";

export function RoutingExplanation({
  routing,
}: {
  routing: RoutingResult;
}) {
  return (
    <div className="rounded-2xl border border-teal-100 bg-teal-50/50 p-5">
      {/* Selected Department */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-teal-600 text-white">
            <Target className="h-5 w-5" />
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-teal-700">
              Responsible Department
            </p>

            <p className="text-lg font-bold text-slate-900">
              {routing.departmentName}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-full border border-teal-200 bg-white px-3 py-1.5 text-xs font-semibold text-teal-700">
          <Network className="h-3.5 w-3.5" />
          {routing.routingSource} · Score {routing.score.toFixed(1)}%
        </div>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-slate-700">
        {routing.explanation}
      </p>

      {/* Winning Department Evidence */}
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Matched Assets
          </p>

          <div className="mt-2 flex flex-wrap gap-2">
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
            Matched Issue Types
          </p>

          <div className="mt-2 flex flex-wrap gap-2">
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

      {/* Candidate Departments */}
      {routing.candidateDepartments.length > 0 && (
        <div className="mt-8 border-t border-teal-100 pt-6">
          <h3 className="text-base font-semibold text-slate-900">
            Candidate Departments
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Ranked by GraphRAG routing confidence.
          </p>

          <div className="mt-5 space-y-4">
            {[...routing.candidateDepartments]
              .sort((a, b) => b.confidence - a.confidence)
              .map((dept) => (
                <div
                  key={dept.departmentId}
                  className={`rounded-xl border p-4 transition ${
                    dept.departmentId === routing.departmentId
                      ? "border-teal-500 bg-white shadow-sm"
                      : "border-slate-200 bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-slate-900">
                        {dept.departmentName}
                      </h4>

                      <p className="text-xs text-slate-500">
                        Confidence Score
                      </p>
                    </div>

                    <span className="text-lg font-bold text-teal-700">
                      {dept.confidence.toFixed(1)}%
                    </span>
                  </div>

                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
                    <div
                      className="h-full rounded-full bg-teal-600 transition-all duration-500"
                      style={{
                        width: `${dept.confidence}%`,
                      }}
                    />
                  </div>

                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Matched Assets
                      </p>

                      <div className="mt-2 flex flex-wrap gap-2">
                        {dept.matchedAssets.length ? (
                          dept.matchedAssets.map((asset) => (
                            <span
                              key={asset}
                              className="rounded-full border border-slate-200 bg-slate-50 px-2 py-1 text-xs"
                            >
                              {asset}
                            </span>
                          ))
                        ) : (
                          <span className="text-xs text-slate-400">
                            None
                          </span>
                        )}
                      </div>
                    </div>

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Matched Issue Types
                      </p>

                      <div className="mt-2 flex flex-wrap gap-2">
                        {dept.matchedIssueTypes.length ? (
                          dept.matchedIssueTypes.map((issue) => (
                            <span
                              key={issue}
                              className="rounded-full border border-slate-200 bg-slate-50 px-2 py-1 text-xs"
                            >
                              {issue}
                            </span>
                          ))
                        ) : (
                          <span className="text-xs text-slate-400">
                            None
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}