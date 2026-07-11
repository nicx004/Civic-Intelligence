import Link from "next/link";
import { AlertTriangle, CheckCircle2, ClipboardList, Clock3, MapPin, TrendingUp } from "lucide-react";
import { MetricCard } from "@/components/admin/MetricCard";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { CategoryTag } from "@/components/admin/CategoryTag";
import { BarChart } from "@/components/admin/BarChart";
import {
  categoryDistribution,
  dashboardMetrics,
  mockComplaints,
  mockDepartments,
} from "@/lib/admin/mock-data";
import { formatDate } from "@/lib/admin/format";

export default function AdminDashboardPage() {
  const recentComplaints = [...mockComplaints]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const needsAttention = mockComplaints
    .filter((c) => c.status === "PENDING")
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
    .slice(0, 4);

  const departmentWorkload = [...mockDepartments]
    .sort((a, b) => b.activeComplaints + b.pendingComplaints - (a.activeComplaints + a.pendingComplaints))
    .slice(0, 6)
    .map((dept) => ({ label: dept.name, value: dept.activeComplaints + dept.pendingComplaints }));

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Dashboard</h1>
          <p className="mt-1 text-sm text-slate-500">
            Operational summary across all municipal departments &middot; {today}
          </p>
        </div>
        <Link
          href="/admin/complaints"
          className="rounded-xl bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-teal-700"
        >
          View complaints
        </Link>
      </div>

      {/* Metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          label="Total complaints"
          value={dashboardMetrics.totalComplaints}
          changePct={dashboardMetrics.totalComplaintsChangePct}
          icon={ClipboardList}
          tone="primary"
        />
        <MetricCard
          label="Pending"
          value={dashboardMetrics.pendingComplaints}
          changePct={dashboardMetrics.pendingComplaintsChangePct}
          icon={Clock3}
        />
        <MetricCard
          label="Verified / in progress"
          value={dashboardMetrics.verifiedComplaints}
          changePct={dashboardMetrics.verifiedComplaintsChangePct}
          icon={TrendingUp}
        />
        <MetricCard
          label="Resolved"
          value={dashboardMetrics.resolvedComplaints}
          changePct={dashboardMetrics.resolvedComplaintsChangePct}
          icon={CheckCircle2}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent complaints */}
        <div className="card lg:col-span-2">
          <div className="flex items-center justify-between p-6 pb-4">
            <h2 className="text-base font-semibold text-slate-900">Recent complaints</h2>
            <Link
              href="/admin/complaints"
              className="text-xs font-semibold text-teal-700 hover:underline"
            >
              View all
            </Link>
          </div>
          <ul className="divide-y divide-slate-100">
            {recentComplaints.map((complaint) => (
              <li key={complaint.id} className="px-6 py-3">
                <Link
                  href={`/admin/complaints/${complaint.id}`}
                  className="flex items-center justify-between gap-4"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-900">
                      {complaint.title}
                    </p>
                    <p className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                      <MapPin className="h-3 w-3 flex-none" aria-hidden="true" />
                      {complaint.locality} &middot; {formatDate(complaint.createdAt)}
                    </p>
                  </div>
                  <StatusBadge status={complaint.status} className="flex-none" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Needs attention */}
        <div className="card">
          <div className="flex items-center gap-2 p-6 pb-4">
            <AlertTriangle className="h-4 w-4 text-amber-500" aria-hidden="true" />
            <h2 className="text-base font-semibold text-slate-900">Requires attention</h2>
          </div>
          <ul className="divide-y divide-slate-100">
            {needsAttention.map((complaint) => (
              <li key={complaint.id} className="px-6 py-3">
                <Link href={`/admin/complaints/${complaint.id}`} className="block">
                  <p className="truncate text-sm font-semibold text-slate-900">
                    {complaint.title}
                  </p>
                  <div className="mt-1.5 flex items-center gap-2">
                    <CategoryTag category={complaint.category} />
                    <span className="text-xs text-slate-400">
                      {formatDate(complaint.createdAt)}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Department workload */}
        <div className="card p-6">
          <h2 className="text-base font-semibold text-slate-900">Department workload</h2>
          <p className="mt-1 text-xs text-slate-500">Open complaints (active + pending) by department</p>
          <div className="mt-5">
            <BarChart data={departmentWorkload} />
          </div>
        </div>

        {/* Category distribution */}
        <div className="card p-6">
          <h2 className="text-base font-semibold text-slate-900">Complaints by category</h2>
          <p className="mt-1 text-xs text-slate-500">Distribution across all recorded complaints</p>
          <div className="mt-5">
            <BarChart data={categoryDistribution.map((c) => ({ label: c.category, value: c.count }))} />
          </div>
        </div>
      </div>
    </div>
  );
}
