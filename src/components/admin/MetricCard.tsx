import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatNumber, formatSignedPercent } from "@/lib/admin/format";

export function MetricCard({
  label,
  value,
  changePct,
  icon: Icon,
  tone = "default",
}: {
  label: string;
  value: number;
  changePct?: number;
  icon: LucideIcon;
  tone?: "default" | "primary";
}) {
  const isPositive = (changePct ?? 0) >= 0;

  return (
    <div className="card">
      <div className="flex items-start justify-between gap-4 p-6">
        <div className="min-w-0">
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
            {formatNumber(value)}
          </p>
          {changePct !== undefined ? (
            <p
              className={cn(
                "mt-2 text-xs font-semibold",
                isPositive ? "text-emerald-600" : "text-rose-600",
              )}
            >
              {formatSignedPercent(changePct)}{" "}
              <span className="font-normal text-slate-400">vs last month</span>
            </p>
          ) : null}
        </div>
        <div
          className={cn(
            "flex h-11 w-11 flex-none items-center justify-center rounded-xl",
            tone === "primary" ? "bg-teal-600 text-white" : "bg-slate-100 text-slate-500",
          )}
        >
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
