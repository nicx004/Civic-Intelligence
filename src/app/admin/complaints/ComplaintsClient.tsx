"use client";

import { useMemo, useState } from "react";

import { FilterBar, type ComplaintFilters } from "@/components/admin/FilterBar";
import { ComplaintTable } from "@/components/admin/ComplaintTable";
import type { AdminComplaint } from "@/lib/admin/types";

const DEFAULT_FILTERS: ComplaintFilters = {
  search: "",
  category: "ALL",
  status: "ALL",
  department: "ALL",
  sort: "newest",
};

interface ComplaintsClientProps {
  complaints: AdminComplaint[];
}

export default function ComplaintsClient({
  complaints,
}: ComplaintsClientProps) {
  const [filters, setFilters] = useState<ComplaintFilters>(DEFAULT_FILTERS);

  const departmentNames = useMemo(
    () =>
      Array.from(
        new Set(
          complaints
            .map((complaint) => complaint.routing.departmentName)
            .filter(Boolean)
        )
      ),
    [complaints]
  );

  const filteredComplaints = useMemo(() => {
    const query = filters.search.trim().toLowerCase();

    const filtered = complaints.filter((complaint) => {
      const matchesQuery =
        query.length === 0 ||
        complaint.title.toLowerCase().includes(query) ||
        complaint.locality.toLowerCase().includes(query) ||
        complaint.id.toLowerCase().includes(query);

      const matchesCategory =
        filters.category === "ALL" ||
        complaint.category === filters.category;

      const matchesStatus =
        filters.status === "ALL" ||
        complaint.status === filters.status;

      const matchesDepartment =
        filters.department === "ALL" ||
        complaint.routing.departmentName === filters.department;

      return (
        matchesQuery &&
        matchesCategory &&
        matchesStatus &&
        matchesDepartment
      );
    });

    return filtered.sort((a, b) => {
      const diff =
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime();

      return filters.sort === "newest" ? diff : -diff;
    });
  }, [complaints, filters]);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Complaints
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          {filteredComplaints.length} of {complaints.length} complaints shown
        </p>
      </div>

      <FilterBar
        filters={filters}
        onChange={setFilters}
        departments={departmentNames}
      />

      <ComplaintTable complaints={filteredComplaints} />
    </div>
  );
}