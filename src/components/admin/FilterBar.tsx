"use client";

import { Search } from "lucide-react";
import type { ComplaintCategory, ComplaintStatus } from "@/lib/admin/types";
import { CATEGORY_LABELS, STATUS_LABELS } from "@/lib/admin/format";

export interface ComplaintFilters {
  search: string;
  category: ComplaintCategory | "ALL";
  status: ComplaintStatus | "ALL";
  department: string | "ALL";
  sort: "newest" | "oldest";
}

export function FilterBar({
  filters,
  onChange,
  departments,
}: {
  filters: ComplaintFilters;
  onChange: (filters: ComplaintFilters) => void;
  departments: string[];
}) {
  return (
    <div className="card p-4">
      <div className="grid gap-3 md:grid-cols-[1.6fr_1fr_1fr_1fr_1fr]">
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
            aria-hidden="true"
          />
          <label htmlFor="complaint-search" className="sr-only">
            Search complaints
          </label>
          <input
            id="complaint-search"
            type="search"
            placeholder="Search by title, locality, or ID"
            className="input pl-9"
            value={filters.search}
            onChange={(event) => onChange({ ...filters, search: event.target.value })}
          />
        </div>

        <div>
          <label htmlFor="category-filter" className="sr-only">
            Filter by category
          </label>
          <select
            id="category-filter"
            className="input select"
            value={filters.category}
            onChange={(event) =>
              onChange({ ...filters, category: event.target.value as ComplaintFilters["category"] })
            }
          >
            <option value="ALL">All categories</option>
            {Object.entries(CATEGORY_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="status-filter" className="sr-only">
            Filter by status
          </label>
          <select
            id="status-filter"
            className="input select"
            value={filters.status}
            onChange={(event) =>
              onChange({ ...filters, status: event.target.value as ComplaintFilters["status"] })
            }
          >
            <option value="ALL">All statuses</option>
            {Object.entries(STATUS_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="department-filter" className="sr-only">
            Filter by department
          </label>
          <select
            id="department-filter"
            className="input select"
            value={filters.department}
            onChange={(event) => onChange({ ...filters, department: event.target.value })}
          >
            <option value="ALL">All departments</option>
            {departments.map((department) => (
              <option key={department} value={department}>
                {department}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="sort-filter" className="sr-only">
            Sort complaints
          </label>
          <select
            id="sort-filter"
            className="input select"
            value={filters.sort}
            onChange={(event) =>
              onChange({ ...filters, sort: event.target.value as ComplaintFilters["sort"] })
            }
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
          </select>
        </div>
      </div>
    </div>
  );
}
