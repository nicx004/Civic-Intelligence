import type { ExtractedEntities as ExtractedEntitiesType } from "@/lib/admin/types";

function ChipGroup({ label, items, tone }: { label: string; items: string[]; tone: "slate" | "teal" }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
      <div className="mt-1.5 flex flex-wrap gap-1.5">
        {items.length ? (
          items.map((item) => (
            <span
              key={item}
              className={
                tone === "teal"
                  ? "rounded-full border border-teal-200 bg-teal-50 px-2.5 py-1 text-xs font-medium text-teal-700"
                  : "rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700"
              }
            >
              {item}
            </span>
          ))
        ) : (
          <span className="text-xs text-slate-400">None</span>
        )}
      </div>
    </div>
  );
}

export function ExtractedEntities({ entities }: { entities: ExtractedEntitiesType }) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <ChipGroup label="Assets" items={entities.assets} tone="slate" />
      <ChipGroup label="Issue types" items={entities.issueTypes} tone="teal" />
      <ChipGroup label="Keywords" items={entities.keywords} tone="slate" />
    </div>
  );
}
