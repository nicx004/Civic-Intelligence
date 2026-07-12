import { formatNumber } from "@/lib/admin/format";

export function BarChart({
  data,
  valueLabel,
}: {
  data: { label: string; value: number }[];
  valueLabel?: (value: number) => string;
}) {
  const max = Math.max(...data.map((d) => d.value), 1);

  return (
    <div className="flex flex-col gap-3">
      {data.map((item) => (
        <div key={item.label} className="flex items-center gap-3">
          <span className="w-32 flex-none truncate text-sm text-slate-600" title={item.label}>
            {item.label}
          </span>
          <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-teal-600"
              style={{ width: `${Math.max((item.value / max) * 100, 3)}%` }}
            />
          </div>
          <span className="w-14 flex-none text-right text-sm font-semibold text-slate-900">
            {valueLabel ? valueLabel(item.value) : formatNumber(item.value)}
          </span>
        </div>
      ))}
    </div>
  );
}
