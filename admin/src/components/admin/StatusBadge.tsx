import type { ComplaintStatus } from "@/lib/admin/types";
import { statusLabel } from "@/lib/admin/format";
import { cn } from "@/lib/utils";

const STATUS_STYLES: Record<ComplaintStatus, string> = {
  PENDING: "bg-amber-50 text-amber-700 border-amber-200",
  VERIFIED: "bg-blue-50 text-blue-700 border-blue-200",
  REJECTED: "bg-rose-50 text-rose-700 border-rose-200",
  RESOLVED: "bg-emerald-50 text-emerald-700 border-emerald-200",
};

const STATUS_DOT: Record<ComplaintStatus, string> = {
  PENDING: "bg-amber-500",
  VERIFIED: "bg-blue-500",
  REJECTED: "bg-rose-500",
  RESOLVED: "bg-emerald-500",
};

export function StatusBadge({
  status,
  className,
}: {
  status: ComplaintStatus;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold",
        STATUS_STYLES[status],
        className,
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", STATUS_DOT[status])} aria-hidden="true" />
      {statusLabel(status)}
    </span>
  );
}
