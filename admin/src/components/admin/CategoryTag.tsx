import type { ComplaintCategory } from "@/lib/admin/types";
import { categoryLabel } from "@/lib/admin/format";
import { cn } from "@/lib/utils";

export function CategoryTag({
  category,
  className,
}: {
  category: ComplaintCategory | string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600",
        className,
      )}
    >
      {categoryLabel(category)}
    </span>
  );
}
