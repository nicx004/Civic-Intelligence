"use client";

import { useMemo, useState } from "react";
import { FilterBar, type ComplaintFilters } from "@/components/admin/FilterBar";
import { ComplaintTable } from "@/components/admin/ComplaintTable";
import { mockComplaints, mockDepartments } from "@/lib/admin/mock-data";

const DEFAULT_FILTERS: ComplaintFilters = {
  search: "",
  category: "ALL",
  status: "ALL",
  department: "ALL",
  sort: "newest",
};

export default function ComplaintsPage() {
  const [filters, setFilters] = useState<ComplaintFilters>(DEFAULT_FILTERS);

  const departmentNames = useMemo(
    () => mockDepartments.map((department) => department.name),
    [],
  );

  const filteredComplaints = useMemo(() => {
    const query = filters.search.trim().toLowerCase();

    const filtered = mockComplaints.filter((complaint) => {
      const matchesQuery =
        query.length === 0 ||
        complaint.title.toLowerCase().includes(query) ||
        complaint.locality.toLowerCase().includes(query) ||
        complaint.id.toLowerCase().includes(query);

      const matchesCategory = filters.category === "ALL" || complaint.category === filters.category;
      const matchesStatus = filters.status === "ALL" || complaint.status === filters.status;
      const matchesDepartment =
        filters.department === "ALL" || complaint.routing.departmentName === filters.department;

      return matchesQuery && matchesCategory && matchesStatus && matchesDepartment;
    });

    return filtered.sort((a, b) => {
      const diff = new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      return filters.sort === "newest" ? diff : -diff;
    });
  }, [filters]);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Complaints</h1>
        <p className="mt-1 text-sm text-slate-500">
          {filteredComplaints.length} of {mockComplaints.length} complaints shown
        </p>
      </div>

      <FilterBar filters={filters} onChange={setFilters} departments={departmentNames} />

      <ComplaintTable complaints={filteredComplaints} />
    </div>
  );
}
